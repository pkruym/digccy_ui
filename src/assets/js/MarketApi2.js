"use strict";

import { MarketUri } from "./config";

import { WebSocketClient } from "./websocket";

import { SimplePromise } from "./utils";

import pako from "pako";

function uniq(array) {
  var temp = {},
    r = [],
    len = array.length,
    val,
    type;
  for (var i = 0; i < len; i++) {
    val = array[i];
    type = typeof val;
    if (!temp[val]) {
      temp[val] = [type];
      r.push(val);
    } else if (temp[val].indexOf(type) < 0) {
      temp[val].push(type);
      r.push(val);
    }
  }
  return r;
}

class SubscribeManager {
  constructor(fnCalcKey_, fnSub_, fnUnSub_) {
    this.fnCalcKey_ =
      fnCalcKey_ ||
      function(obj) {
        let key = "";
        if (typeof obj == "object") {
          let arr = Object.keys(obj);
          let a = [];
          for (let i in arr) {
            a.push(arr[i]);
          }
          key = a.join("|");
        } else if (typeof obj == "function") {
          key = obj.toString();
        } else if (typeof obj == "number") {
          key = obj.toString();
        } else if (typeof obj == "string") {
          key = obj;
        }
        return key;
      };
    this.fnSub_ = fnSub_ || function() {};
    this.fnUnSub_ = fnUnSub_ || function() {};
    this.callbackList_ = {};
    this.subList_ = {};
  }
  reSubscribeAll() {
    for (let i in this.subList_) {
      let obj = this.subList_[i];
      obj._isSub = false;
      this.doSubscribe(obj);
    }
  }
  doSubscribe(obj) {
    if (obj._isSub) {
      return;
    }
    obj._isSub = true;
    return this.fnSub_(obj);
  }
  doUnSubscribe(obj) {
    if (obj._isSub == false) {
      return;
    }
    obj._isSub = false;
    return this.fnUnSub_(obj);
  }
  addSubscribe(obj, callback) {
    let key = this.fnCalcKey_(obj);
    if (!this.callbackList_[key]) {
      this.callbackList_[key] = [];
    }
    if (this.callbackList_[key].indexOf(callback) == -1) {
      this.callbackList_[key].push(callback);
    }
    if (!this.subList_[key]) {
      this.subList_[key] = obj;
      this.subList_[key]._isSub = false;
    }
  }
  delSubscribe(obj, callback) {
    let key = this.fnCalcKey_(obj);
    if (this.callbackList_[key] && this.callbackList_[key].length > 0) {
      if (callback) {
        this.callbackList_[key] = this.callbackList_[key].filter(v => {
          return v !== callback;
        });
      } else {
        this.callbackList_[key] = [];
      }
      if (this.callbackList_[key].length <= 0) {
        delete this.callbackList_[key];
        if (this.subList_[key]) {
          delete this.subList_[key];
        }
        this.doUnSubscribe(obj);
      }
    }
  }
  getCallbackArray(key) {
    if (this.callbackList_[key]) {
      return this.callbackList_[key];
    }
    return [];
  }
}

export class MarketSocket extends WebSocketClient {
  constructor(uri, opts) {
    super(uri, {
      binaryType: "arraybuffer",
      autoconnect: false
    });

    this.requestId = 0;

    // kline
    // this.subarr = {}
    // this.sublist = []

    let fnComputeKey = this.computeKey.bind(this);

    this.klineSub = new SubscribeManager(
      fnComputeKey,
      obj => {
        let key = fnComputeKey(obj);
        console.log(
          "MarketAPI 订阅Kline[" + key + "]：",
          JSON.parse(JSON.stringify(obj))
        );
        return this.request("/kline/subscribe", {
          symbol: obj.symbol,
          type: obj.type
        });
      },
      obj => {
        let key = fnComputeKey(obj);
        console.log(
          "MarketAPI 取消订阅Kline[" + key + "]：",
          JSON.parse(JSON.stringify(obj))
        );
        return this.request("/kline/unsubscribe", {
          symbol: obj.symbol,
          type: obj.type
        });
      }
    );

    this.quoteSub = new SubscribeManager(
      fnComputeKey,
      obj => {
        let key = fnComputeKey(obj);
        console.log(
          "MarketAPI 订阅Quote[" + key + "]：",
          JSON.parse(JSON.stringify(obj))
        );
      },
      obj => {
        let key = fnComputeKey(obj);
        console.log(
          "MarketAPI 取消订阅Quote[" + key + "]：",
          JSON.parse(JSON.stringify(obj))
        );
      }
    );

    this.TradeSub = new SubscribeManager(
      fnComputeKey,
      obj => {
        let key = fnComputeKey(obj);
        console.log(
          "MarketAPI 订阅Trade[" + key + "]：",
          JSON.parse(JSON.stringify(obj))
        );
      },
      obj => {
        let key = fnComputeKey(obj);
        console.log(
          "MarketAPI 取消订阅Trade[" + key + "]：",
          JSON.parse(JSON.stringify(obj))
        );
      }
    );

    this.DepthSub = new SubscribeManager(
      fnComputeKey,
      obj => {
        let key = fnComputeKey(obj);
        console.log(
          "MarketAPI 订阅DepthSub[" + key + "]：",
          JSON.parse(JSON.stringify(obj))
        );
      },
      obj => {
        let key = fnComputeKey(obj);
        console.log(
          "MarketAPI 取消订阅DepthSub[" + key + "]：",
          JSON.parse(JSON.stringify(obj))
        );
      }
    );
    this.symbol='';
    this.queue = [];
    this.queueNeedAuth = [];
    this.sendingObject = {};

    this.on("open", () => {
      console.log("MarketAPI 连接成功：" + this.address);
      this._init();
      this.klineSub.reSubscribeAll();
      // this.quoteSub.reSubscribeAll()
    });

    this.on("message", msg => {
      let message = "";
      if (msg instanceof ArrayBuffer) {
        try {
          let buf = pako.ungzip(Buffer.from(msg));
          message = Buffer.from(buf).toString("utf-8");
        } catch (e) {
          console.error("解压出错1: ", e.toString())
          message = Buffer.from(msg).toString("utf-8");
        }
      } else if (typeof msg == "string") {
        message = msg;
      }
      this.onmessage(message);
      if (this.ready) {
        this.flushPending();
      }
    });

    this.on("error", error => {
      this.logined = false;
      // this.token = ""
      console.log("MarketAPI 出错: " + this.address + ", " + error);
    });

    this.on("close", (code, msg) => {
      this.logined = false;
      // this.token = ""
      console.log("MarketAPI 关闭: " + this.address + ", " + code);
    });

    this.on("timeout", () => {
      // console.log("MarketAPI 收包超时: " + this.address)
    });

    this.on("heartbeat", () => {
      if (this.ready) {
        let now = new Date();
        // console.log(`[${now.Format('yyyy-MM-dd hh:mm:ss.SSS')}] MarketAPI 发送心跳: ${this.address}`)
        this.sendInternal({
          cmd: "/heartbeat"
        });
      }
    });
  }

  computeKey({ symbol, resolution }) {
    let type = this.resolution2Type(resolution);
    return [symbol, type].join("|");
  }

  calcKeyArray({ symbol, type }) {
    return [
      [symbol, type].join("|"),
      [symbol, null].join("|"),
      [null, null].join("|"),
      [null].join("|")
    ];
  }

  isOnline() {
    return this.ready;
  }

  // 收包
  onmessage(msg) {
    let data = {};

    try {
      data = JSON.parse(msg);
    } catch (e) {
      console.log("json出错", msg);
      return;
    }
    if (
      data.cmd != "/push/tick" &&
      data.cmd != "/push/kline" &&
      data.cmd != "/push/trade" &&
      data.cmd != "/push/depth"
    )
      console.log("收到的数据为", JSON.parse(JSON.stringify(data)));
    // if (process.env.VERSION_NAME != "正式版" && data.cmd != "/heartbeat" && data.cmd != "/push/quote")
    //     console.log("收到的数据为", JSON.parse(JSON.stringify(data)));

    // 处理登录
    if (data.code == 0) {
    } else if (data.code == 1007 || data.code == 1008 || data.code == 1014) {
      // token失效，过期，认证失败
      return; // 这里直接返回，不处理回调
    }

    if (data.requestId && this.sendingObject[data.requestId]) {
      let obj = this.sendingObject[data.requestId];
      let cb = obj.cb;
      delete this.sendingObject[data.requestId];
      if (cb && typeof cb == "function") {
        cb(data);
      }
    }

    // // 处理推送
    if (data.requestId == null || data.requestId == undefined) {
      // /push/quote
      let cmd = data.cmd;
      // console.log('推送',cmd,data);
      if (cmd == "/push/tick") {
        let key_arr = uniq(this.calcKeyArray(data.data));
        // console.log('推送',cmd,this.callbackList_,this.fnCalcKey_);

        for (let j = 0; j < key_arr.length; j++) {
          let key = key_arr[j];
          let cbarr = this.quoteSub.getCallbackArray(key);
          if (cbarr && cbarr.length > 0) {
            for (let i = 0; i < cbarr.length; i++) {
              let fn = cbarr[i];
              if (fn && typeof fn == "function") {
                fn(data.data);
              }
            }
          }
        }
      } else if (cmd == "/push/kline") {
        let key_arr = uniq(this.calcKeyArray(data.data));
        for (let j = 0; j < key_arr.length; j++) {
          let key = key_arr[j];
          let cbarr = this.klineSub.getCallbackArray(key);
          if (cbarr && cbarr.length > 0) {
            for (let i = 0; i < cbarr.length; i++) {
              let fn = cbarr[i];
              if (fn && typeof fn == "function") {
                fn(data.data);
              }
            }
          }
        }
      } else if (cmd == "/push/depth") {
        let key_arr = uniq(this.calcKeyArray(data.data));
        // console.log('推送',cmd,this.callbackList_,this.fnCalcKey_);

        for (let j = 0; j < key_arr.length; j++) {
          let key = key_arr[j];
          let cbarr = this.DepthSub.getCallbackArray(key);
          if (cbarr && cbarr.length > 0) {
            for (let i = 0; i < cbarr.length; i++) {
              let fn = cbarr[i];
              if (fn && typeof fn == "function") {
                fn(data.data);
              }
            }
          }
        }
      } else if (cmd == "/push/trade") {
        let key_arr = uniq(this.calcKeyArray(data.data));
        // console.log('推送',cmd,this.callbackList_);

        for (let j = 0; j < key_arr.length; j++) {
          let key = key_arr[j];
          let cbarr = this.TradeSub.getCallbackArray(key);
          if (cbarr && cbarr.length > 0) {
            for (let i = 0; i < cbarr.length; i++) {
              let fn = cbarr[i];
              if (fn && typeof fn == "function") {
                fn(data.data);
              }
            }
          }
        }
      }
    }
  }

  flushPending() {
    let tmparr = this.queue;
    this.queue = [];
    for (let i = 0; i < tmparr.length; i++) {
      let obj = tmparr[i];
      console.log("发送的参数", obj.message);
      this.sendInternal(obj.message, obj.cb);
    }
  }

  // send message
  request(cmd, param, cb, emitDefault) {
    let message = {
      cmd: cmd,
      param: param
    };
    // console.log("发送的参数 market",message);
    return this.reqInternal(message, cb, emitDefault || false);
  }

  requestDefault(cmd, param, cb) {
    return this.request(cmd, param, cb, true);
  }

  // promise, private
  reqInternal(message, cb, emitDefault) {
    let promise = null;
    let obj = {
      message: message,
      retValue: null
    };

    let makeCallBack = (resolve, reject) => {
      return res => {
        obj.retValue = res;

        if (res.code == 0) {
          return resolve(res.data);
        } else {
          // 格式化一下message
          let orgmsg = JSON.parse(JSON.stringify(message));
          // 失败：
          console.error(
            `MarketAPI error: requestId = ${res.requestId}, cmd = ${
              res.cmd
            }, message`,
            orgmsg,
            ` code = ${res.code}, reason = ${res.msg}`
          );
          if (reject) {
            return reject(res.msg);
          } else {
            return resolve(res.msg);
          }
        }
      };
    };
    if (!cb && typeof cb !== "function") {
      promise = new SimplePromise((resolve, reject) => {
        obj.cb = makeCallBack(resolve, reject);
      });

      promise.finally(() => {

        // console.log("请求完成...", promise)
        // 获取是否调用过then
        if (emitDefault || promise.getCallNum() <= 0) {
          let res = obj.retValue;
          let msg = JSON.parse(JSON.stringify(obj.message));
          let code = res.code;
          let cmd = res.cmd;
          let data = res.data;
          if (code == 0) {
            // 没调用过then，抛一下消息
            this.emit("defaultCallback", cmd, data, msg);
          }
        }
        obj.retValue = null;
        obj.cb = null;
      });
    } else {
      obj.cb = makeCallBack(cb);
    }

    this.queue.push(obj);

    if (this.ready) {
      this.flushPending();
    }
    return promise;
  }

  sendInternal(message, cb) {
    let obj = {
      token: this.token,
      requestId: ++this.requestId,
      ...message
    };
    // if (process.env.VERSION_NAME != "正式版" && obj.cmd != "/heartbeat")
    console.log("发送的参数", JSON.parse(JSON.stringify(obj)))

    let no = obj.requestId;
    if (cb && typeof cb == "function") {
      this.sendingObject[no] = {
        message: message,
        cb: cb
      };
    }
    this.send(JSON.stringify(obj));
  }

  destroy() {
    this.subarr = {};
    this.sublist = [];
    this.close(1000);
    this.removeAllListeners();
  }

  resolution2Type(resolution) {
    if (!resolution) {
      return "";
    }
    let type = "MINUTE";
    switch (resolution) {
      case "1":
        type = "MINUTE";
        break;
      case "3":
        type = "MINUTE3";
        break;
      case "5":
        type = "MINUTE5";
        break;
      case "15":
        type = "MINUTE15";
        break;
      case "30":
        type = "MINUTE30";
        break;
      case "60":
        type = "HOUR";
        break;
      case "120":
        type = "HOUR2";
        break;
      case "240":
        type = "HOUR4";
        break;
      case "D":
        type = "DAY";
        break;
      default:
        break;
    }
    return type;
  }

  ////
  // GET /kline/minute queryMiuteKlineList
  // commodityNo, contractNo
  queryMiuteKlineList(params, callback) {
    let obj = {
      symbol: params.symbol
    };
    return this.request("/kline/minute", obj, callback);
  }

  // GET /kline/list queryKlineList
  queryKlineList(params, callback) {
    let obj = {
      symbol: params.symbol,
      time: params.time,
      count: params.count
    };

    obj.type = this.resolution2Type(params.resolution);

    return this.request("/kline/list", obj, callback);
  }
  queryKlinesimplifyList(params, callback) {
    let obj = {
      symbol: params.symbol,
      time: params.time,
      count: params.count
    };

    obj.type = this.resolution2Type(params.resolution);

    return this.request("/kline/list/simplify", obj, callback);
  }

  // 初始化订阅所有
  _init(symbol) {
    //行情多 暂不订阅所有行情
    // console.log('推送','tick/subscribe/all');
    // this.request("/tick/unsubscribe/all");
    // this.request("/tick/subscribe/all");
    // debugger
    if(this.symbol)
   {
    this.request("/tick/unsubscribe",{"symbol":this.symbol});
   }
   if(symbol)
   {
       this.request("/tick/subscribe",{"symbol":symbol});
      }
      this.symbol=symbol
  }

  subscribeAllQuote(callback) {
    // console.log('返回回调',callback);

    this.quoteSub.addSubscribe(
      {
        symbol: null,
        type: null
      },
      callback
    );
  }

  subscribeAllTrade(callback) {
    // console.log('返回回调',callback);
    this.TradeSub.addSubscribe(
      {
        symbol: null
      },
      callback
    );
  }
  unsubscribeAllTrade(callback) {
    this.TradeSub.delSubscribe(
      {
        symbol: null
      },
      callback
    );
  }

  subscribeAlldepth(callback) {
    // console.log('返回回调',callback);

    this.DepthSub.addSubscribe(
      {
        symbol: null
      },
      callback
    );
  }
  unsubscribeAlldepth(callback) {
    this.DepthSub.delSubscribe(
      {
        symbol: null
      },
      callback
    );
  }
  unsubscribeAllQuote(callback) {
    this.quoteSub.delSubscribe(
      {
        symbol: null,
        type: null
      },
      callback
    );
  }

  // kline
  doSubscribe(obj, callback) {
    console.log('dingyue',obj,obj.resolution)
    obj.type = this.resolution2Type(obj.resolution);

    this.klineSub.addSubscribe(obj, callback);

    if (this.ready) {
      this.klineSub.doSubscribe(obj, callback);
    }
  }

  doUnSubscribe(obj, callback) {
    this.klineSub.delSubscribe(obj, callback);
  }

  doClose() {
    this.destroy();
  }
}

export var MarketAPI = new MarketSocket(MarketUri);
