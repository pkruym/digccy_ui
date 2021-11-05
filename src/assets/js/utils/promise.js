'use strict';

var asap = require('./asap');

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};

function getThen(obj) {
    try {
        return obj.then;
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

function tryCallOne(fn, a) {
    try {
        return fn(a);
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

function tryCallTwo(fn, a, b) {
    try {
        fn(a, b);
    } catch (ex) {
        LAST_ERROR = ex;
        return IS_ERROR;
    }
}

module.exports = Promise;

function Promise(fn) {
    if (typeof this !== 'object') {
        throw new TypeError('Promises must be constructed via new');
    }
    if (typeof fn !== 'function') {
        throw new TypeError('Promise constructor\'s argument is not a function');
    }
    this._deferredState = 0;
    this._deferreds = null;
    this._finalDeferredsState = 0;
    this._finalDeferreds = null;

    this._callNum = 0;              // 后面then或者catch的次数

    this._state = 0;
    this._value = null;
    if (fn === noop) return;
    doResolve(fn, this);
}
Promise._onHandle = null;
Promise._onReject = null;
Promise._noop = noop;

Promise.prototype.then = function (onFulfilled, onRejected) {
    if (this.constructor !== Promise) {
        return safeThen(this, onFulfilled, onRejected);
    }
    var res = new Promise(noop);
    handle(this, new Handler(onFulfilled, onRejected, res));
    return res;
};

Promise.prototype.last = function (onFulfilled, onRejected) {
    if (this.constructor !== Promise) {
        return safeThen(this, onFulfilled, onRejected, true);
    }
    var res = new Promise(noop);
    handle(this, new Handler(onFulfilled, onRejected, res, true));
    return res;
};

function safeThen(self, onFulfilled, onRejected, final) {
    return new self.constructor(function (resolve, reject) {
        var res = new Promise(noop);
        res.then(resolve, reject);
        handle(self, new Handler(onFulfilled, onRejected, res, final));
    });
}

function handle(self, deferred) {
    while (self._state === 3) {
        self = self._value;
    }
    if (Promise._onHandle) {
        Promise._onHandle(self);
    }
    if (self._state === 0) {
        if(deferred._final == false) {
            if (self._deferredState === 0) {
                self._deferredState = 1;
                self._deferreds = deferred;
                return;
            }
            if (self._deferredState === 1) {
                self._deferredState = 2;
                self._deferreds = [self._deferreds, deferred];
                return;
            }
            self._deferreds.push(deferred);

        } else if(deferred._final == true) {
            if (self._finalDeferredsState === 0) {
                self._finalDeferredsState = 1;
                self._finalDeferreds = deferred;
                return;
            }
            if (self._finalDeferredsState === 1) {
                self._finalDeferredsState = 2;
                self._finalDeferreds = [self._finalDeferreds, deferred];
                return;
            }
            self._finalDeferreds.push(deferred);

        }
        return;
    }
    handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
    asap(function () {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
            if (self._state === 1) {
                resolve(deferred.promise, self._value);
            } else {
                reject(deferred.promise, self._value);
            }
            return;
        }
        var ret = tryCallOne(cb, self._value);
        if (ret === IS_ERROR) {
            reject(deferred.promise, LAST_ERROR);
        } else {
            self._callNum ++;
            resolve(deferred.promise, ret);
        }
    });
}

function resolve(self, newValue) {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self) {
        return reject(
            self,
            new TypeError('A promise cannot be resolved with itself.')
        );
    }
    if (
        newValue &&
        (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
        var then = getThen(newValue);
        if (then === IS_ERROR) {
            return reject(self, LAST_ERROR);
        }
        if (
            then === self.then &&
            newValue instanceof Promise
        ) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
        } else if (typeof then === 'function') {
            doResolve(then.bind(newValue), self);
            return;
        }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
}

function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    if (Promise._onReject) {
        Promise._onReject(self, newValue);
    }
    finale(self);
}

function finale(self) {
    // then
    if (self._deferredState === 1) {
        handle(self, self._deferreds);
    } else if (self._deferredState === 2) {
        for (var i = 0; i < self._deferreds.length; i++) {
            handle(self, self._deferreds[i]);
        }
    }
    self._deferreds = null;

    // final
    if (self._finalDeferredsState === 1) {
        handle(self, self._finalDeferreds);
        self._finalDeferreds = null;
    }else if (self._finalDeferredsState === 2) {
        for (var i = 0; i < self._finalDeferreds.length; i++) {
            handle(self, self._finalDeferreds[i]);
        }
    }
    self._finalDeferreds = null;
}

function Handler(onFulfilled, onRejected, promise, final) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
    this._final = final || false
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
    var done = false;
    var res = tryCallTwo(fn, function (value) {
        if (done) return;
        done = true;
        resolve(promise, value);
    }, function (reason) {
        if (done) return;
        done = true;
        reject(promise, reason);
    });
    if (!done && res === IS_ERROR) {
        done = true;
        reject(promise, LAST_ERROR);
    }
}


////////////////////////////////////////

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._noop);
  p._state = 1;
  p._value = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._state === 3) {
            val = val._value;
          }
          if (val._state === 1) return res(i, val._value);
          if (val._state === 2) reject(val._value);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
};
// 这里是真正的最后
Promise.prototype.finally = function (f) {
    this.last(function (value) {
        return Promise.resolve(f()).then(function () {
            return value;
        });
    }, function (err) {
        return Promise.resolve(f()).then(function () {
            throw err;
        });
    });
    return this // 这里需要返回this才能正确处理调用链
};
Promise.prototype.getCallNum = function() {
    return this._callNum || 0
}
