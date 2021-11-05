(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.uikit = {}));
}(this, function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var Dataset = function Dataset() {
    _classCallCheck(this, Dataset);
  };

  var ArrayDataset =
  /*#__PURE__*/
  function (_Dataset) {
    _inherits(ArrayDataset, _Dataset);

    function ArrayDataset(data) {
      var _this;

      var scalable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _classCallCheck(this, ArrayDataset);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ArrayDataset).call(this));
      _this.bids = data.bids;
      _this.asks = data.asks;
      _this.scalable = scalable;
      _this.zoomFactor = 1.0;

      _this.accumulate();

      _this.findSpread();

      _this.findCenter();

      _this.findArm();

      _this.update(_this.zoomFactor);

      return _this;
    }

    _createClass(ArrayDataset, [{
      key: "accumulate",
      value: function accumulate() {
        function reducer(ac, item) {
          item[0] = +item[0];
          item[1] = +item[1];
          ac += +item[1];
          item[2] = ac;
          return ac;
        }

        this.bids.reduce(reducer, 0);
        this.asks.reduce(reducer, 0);
      }
    }, {
      key: "findSpread",
      value: function findSpread() {
        this.spread = this.asks[0][0] - this.bids[0][0];
      }
    }, {
      key: "findCenter",
      value: function findCenter() {
        this.center = this.bids[0][0] + this.spread / 2;
      }
    }, {
      key: "findArm",
      value: function findArm() {
        var bidsArm = this.bids[0][0] - this.bids[this.bids.length - 1][0];
        var asksArm = this.asks[this.asks.length - 1][0] - this.asks[0][0];
        this.arm = bidsArm > asksArm ? bidsArm : asksArm;
      }
    }, {
      key: "findPriceRange",
      value: function findPriceRange() {
        if (this.scalable == false) {
          var min = this.bids[this.bids.length - 1][0];
          var max = this.asks[this.asks.length - 1][0];
          this.priceRange = [min, max];
        } else {
          var _min = this.center - this.arm / this.zoomFactor;

          var _max = this.center + this.arm / this.zoomFactor;

          this.priceRange = [_min, _max];
        }
      }
    }, {
      key: "findVolumeRange",
      value: function findVolumeRange() {
        if (this.scalable == false) {
          var minVolume = 0;
          var maxBidsVolume = this.bids[this.bids.length - 1][2];
          var maxAsksVolume = this.asks[this.bids.length - 1][2];
          var maxVolume = maxBidsVolume > maxAsksVolume ? maxBidsVolume : maxAsksVolume;
          this.volumeRange = [minVolume, maxVolume];
        } else {
          var _minVolume = 0;
          var _maxBidsVolume = 0;

          for (var i = this.bids.length - 1; i >= 0; i--) {
            var bid = this.bids[i];
            if (bid[0] < this.center - this.arm / this.zoomFactor) continue;
            _maxBidsVolume = bid[2];
            break;
          }

          var _maxAsksVolume = 0;

          for (var _i = this.asks.length - 1; _i > -0; _i--) {
            var ask = this.asks[_i];
            if (ask[0] > this.center + this.arm / this.zoomFactor) continue;
            _maxAsksVolume = ask[2];
            break;
          }

          var _maxVolume = _maxBidsVolume > _maxAsksVolume ? _maxBidsVolume : _maxAsksVolume;

          this.volumeRange = [_minVolume, _maxVolume];
        }
      }
    }, {
      key: "update",
      value: function update(zoomFactor) {
        this.zoomFactor = zoomFactor;
        this.findPriceRange();
        this.findVolumeRange();
      }
    }]);

    return ArrayDataset;
  }(Dataset);

  var Scale =
  /*#__PURE__*/
  function () {
    function Scale(domain, range) {
      _classCallCheck(this, Scale);

      this.domain = domain;
      this.range = range;
    }

    _createClass(Scale, [{
      key: "transform",
      value: function transform() {}
    }, {
      key: "invert",
      value: function invert() {}
    }]);

    return Scale;
  }(); // Vout = k * Vin + b


  var LinearScale =
  /*#__PURE__*/
  function (_Scale) {
    _inherits(LinearScale, _Scale);

    function LinearScale(domain, range) {
      var _this;

      _classCallCheck(this, LinearScale);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(LinearScale).call(this, domain, range));
      _this.k = (range[1] - range[0]) / (domain[1] - domain[0]);
      _this.b = range[1] - _this.k * domain[1];
      return _this;
    }

    _createClass(LinearScale, [{
      key: "transform",
      value: function transform(vin) {
        return this.k * vin + this.b;
      }
    }, {
      key: "invert",
      value: function invert(vout) {
        return (vout - this.b) / this.k;
      }
    }]);

    return LinearScale;
  }(Scale);

  var Renderer = function Renderer() {
    _classCallCheck(this, Renderer);
  };

  var CanvasRenderer =
  /*#__PURE__*/
  function (_Renderer) {
    _inherits(CanvasRenderer, _Renderer);

    function CanvasRenderer(canvas) {
      var _this;

      _classCallCheck(this, CanvasRenderer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CanvasRenderer).call(this));
      _this.canvas = canvas;
      _this.width = _this.canvas.width;
      _this.height = _this.canvas.height;
      _this.context = _this.canvas.getContext('2d');
      return _this;
    }

    _createClass(CanvasRenderer, [{
      key: "clear",
      value: function clear() {
        var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#000000';
        this.context.save();
        this.context.fillStyle = style;
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.restore();
      }
    }, {
      key: "apply",
      value: function apply(format) {
        for (var key in format) {
          this.context[key] = format[key];
        }
      }
    }, {
      key: "circle",
      value: function circle(x, y, r) {
        var format = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        this.context.save();
        this.context.beginPath();
        this.apply(format);
        this.context.arc(x, y, r, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.restore();
      }
    }, {
      key: "line",
      value: function line(pts) {
        var _this2 = this;

        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this.context.save();
        /*
        this.context.beginPath()
        this.context.rect(20,20,860,360)
        this.context.clip()
        */

        this.context.beginPath();
        this.apply(format);
        pts.reduce(function (ac, pt) {
          if (ac == 0) {
            _this2.context.moveTo(pt[0], pt[1]);
          } else {
            if (format.manhatton) {
              _this2.context.lineTo(pt[0], ac[1]);

              _this2.context.lineTo(pt[0], pt[1]);
            } else {
              _this2.context.lineTo(pt[0], pt[1]);
            }
          }

          return pt;
        }, 0);
        this.context.stroke();
        this.context.restore();
      }
    }, {
      key: "region",
      value: function region(pts) {
        var _this3 = this;

        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this.context.save();
        this.context.beginPath();
        this.apply(format);
        pts.reduce(function (ac, pt) {
          if (ac == 0) {
            _this3.context.moveTo(pt[0], pt[1]);
          } else {
            if (format.manhatton) {
              _this3.context.lineTo(pt[0], ac[1]);

              _this3.context.lineTo(pt[0], pt[1]);
            } else {
              _this3.context.lineTo(pt[0], pt[1]);
            }
          }

          return pt;
        }, 0);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
      }
    }, {
      key: "text",
      value: function text(txt, x, y) {
        var format = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        this.context.save();
        this.apply(format);

        if (format.strokeStyle) {
          this.context.strokeText(txt, x, y);
        } else {
          this.context.fillText(txt, x, y);
        }

        this.context.restore();
      }
    }]);

    return CanvasRenderer;
  }(Renderer);

  var _dark = {
    background: '#1e2b34',
    bidsLineStyle: {
      strokeStyle: '#84f766',
      lineWidth: 1,
      manhatton: true
    },
    asksLineStyle: {
      strokeStyle: '#ff6939',
      lineWidth: 1,
      manhatton: true
    },
    bidsRegionStyle: {
      fillStyle: '#2e4a3bcc',
      manhatton: true
    },
    asksRegionStyle: {
      fillStyle: '#4b3735cc',
      manhatton: true
    },
    xgridStyle: {
      strokeStyle: '#444'
    },
    ygridStyle: {
      strokeStyle: '#444'
    },
    xtickStyle: {
      strokeStyle: '#aaa'
    },
    ytickStyle: {
      strokeStyle: '#aaa'
    },
    xtickTextStyle: {
      fillStyle: '#aaa',
      textAlign: 'center'
    },
    ytickTextStyle: {
      fillStyle: '#aaa',
      textAlign: 'end',
      textBaseline: 'middle'
    },
    focusCircleStyle: {
      strokeStyle: '#fff'
    },
    focusLineStyle: {
      strokeStyle: '#777'
    },
    focusTextXStyle: {
      fillStyle: '#fff',
      textAlign: 'center'
    },
    focusTextYStyle: {
      fillStyle: '#fff',
      textAlign: 'start'
    },
    indicatorLineStyle: {
      strokeStyle: '#fff'
    },
    indicatorTextStyle: {
      fillStyle: '#fff',
      textAlign: 'center'
    },
    scalable: true,
    ticks: {
      xspan: 150,
      yspan: 50
    },
    padding: [0, 0, 20, 0]
  };
  var _light = {
    background: '#fff',
    bidsLineStyle: {
      strokeStyle: '#4da060',
      lineWidth: 1,
      manhatton: true
    },
    asksLineStyle: {
      strokeStyle: '#ff0000',
      lineWidth: 1,
      manhatton: true
    },
    bidsRegionStyle: {
      fillStyle: '#c2dfc977',
      manhatton: true
    },
    asksRegionStyle: {
      fillStyle: '#e4bdb977',
      manhatton: true
    },
    xgridStyle: {
      strokeStyle: '#e8eded'
    },
    ygridStyle: {
      strokeStyle: '#e8eded'
    },
    xtickStyle: {
      strokeStyle: '#e8eded'
    },
    ytickStyle: {
      strokeStyle: '#e8eded'
    },
    xtickTextStyle: {
      fillStyle: '#777',
      textAlign: 'center'
    },
    ytickTextStyle: {
      fillStyle: '#777',
      textAlign: 'end',
      textBaseline: 'middle'
    },
    focusCircleStyle: {
      strokeStyle: '#777'
    },
    focusLineStyle: {
      strokeStyle: '#aaa'
    },
    focusTextXStyle: {
      fillStyle: '#000',
      textAlign: 'center'
    },
    focusTextYStyle: {
      fillStyle: '#000',
      textAlign: 'start'
    },
    indicatorLineStyle: {
      strokeStyle: '#000'
    },
    indicatorTextStyle: {
      fillStyle: '#000',
      textAlign: 'center'
    },
    scalable: true,
    ticks: {
      xspan: 150,
      yspan: 50
    },
    padding: [0, 0, 20, 0] //top,right,bottom,left

  };

  var Theme =
  /*#__PURE__*/
  function () {
    function Theme() {
      _classCallCheck(this, Theme);
    }

    _createClass(Theme, null, [{
      key: "light",
      value: function light() {
        return _light;
      }
    }, {
      key: "dark",
      value: function dark() {
        return _dark;
      }
    }]);

    return Theme;
  }();

  var DepthChart =
  /*#__PURE__*/
  function () {
    function DepthChart(config) {
      _classCallCheck(this, DepthChart);

      var defaults = {
        el: 'canvas',
        zoomFactor: 1.0,
        focus: null,
        dataset: null,
        priceDecimal: 8,
        volumeDecimal: 3,
        spreadPercentDecimal: 2,
        theme: {
          background: '#000',
          bidsLineStyle: {
            strokeStyle: '#00ff00',
            lineWidth: 3,
            manhatton: true
          },
          asksLineStyle: {
            strokeStyle: '#ff0000',
            lineWidth: 3,
            manhatton: true
          },
          bidsRegionStyle: {
            fillStyle: '#00ff0077',
            manhatton: true
          },
          asksRegionStyle: {
            fillStyle: '#ff000077',
            manhatton: true
          },
          xgridStyle: {
            strokeStyle: '#222'
          },
          ygridStyle: {
            strokeStyle: '#222'
          },
          xtickStyle: {
            strokeStyle: '#aaa'
          },
          ytickStyle: {
            strokeStyle: '#aaa'
          },
          xtickTextStyle: {
            fillStyle: '#aaa',
            textAlign: 'center'
          },
          ytickTextStyle: {
            fillStyle: '#aaa',
            textAlign: 'end',
            textBaseline: 'middle'
          },
          focusCircleStyle: {
            strokeStyle: '#fff'
          },
          focusLineStyle: {
            strokeStyle: '#777'
          },
          focusTextXStyle: {
            fillStyle: '#fff',
            textAlign: 'center'
          },
          focusTextYStyle: {
            fillStyle: '#fff',
            textAlign: 'start'
          },
          indicatorLineStyle: {
            strokeStyle: '#fff'
          },
          indicatorTextStyle: {
            fillStyle: '#fff',
            textAlign: 'center'
          },
          scalable: true,
          ticks: {
            xspan: 150,
            yspan: 50
          },
          padding: [0, 0, 20, 0] //top,right,bottom,left

        }
      };
      var opts = this.opts = Object.assign({}, defaults, config);
      if (typeof opts.el == 'string') opts.el = document.querySelector(opts.el);
      if (!(opts.dataset instanceof Dataset)) opts.dataset = new ArrayDataset(opts.dataset, opts.theme.scalable);
      var renderer = this.renderer = new CanvasRenderer(opts.el);
      this.hookEvents(opts.el);
      var padding = opts.theme.padding;
      opts.xrange = [padding[3], renderer.width - padding[1]];
      opts.yrange = [renderer.height - padding[2], padding[0]];
      this.render();
    }

    _createClass(DepthChart, [{
      key: "hookEvents",
      value: function hookEvents(canvas) {
        var _this = this;

        canvas.addEventListener('wheel', function (evt) {
          var delta = evt.deltaY > 0 ? 0.05 : -0.05;
          _this.opts.zoomFactor *= 1 + delta; //console.log(this.opts.zoomFactor)

          _this.render();

          evt.preventDefault();
        });
        canvas.addEventListener('mousemove', function (evt) {
          var x = evt.offsetX;
          var y = evt.offsetY;
          var regions = _this.regions;
          var focus = null;

          for (var i = 0; i < regions.length; i++) {
            var region = regions[i];

            if (x > region.xrange[0] && x < region.xrange[1]) {
              focus = [x, region.last[1], region.last.item[0], region.last.item[2]]; //          console.log('region->',region,y,focus)

              break;
            }
          }

          _this.opts.focus = focus;

          _this.render();
        });
        canvas.addEventListener('mouseout', function (evt) {
          _this.opts.focus = null;

          _this.render();
        });
      }
    }, {
      key: "udpate",
      value: function udpate(data) {}
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        //console.log('render...')
        this.prepare();
        this.renderer.clear(this.opts.theme.background);
        this.xgrids.forEach(function (gline) {
          _this2.renderer.line(gline, _this2.opts.theme.xgridStyle);
        });
        this.ygrids.forEach(function (gline) {
          _this2.renderer.line(gline, _this2.opts.theme.ygridStyle);
        });
        this.renderer.line(this.points['bids'], this.opts.theme.bidsLineStyle);
        this.renderer.line(this.points['asks'], this.opts.theme.asksLineStyle);
        this.renderer.region(this.regionPoints['bids'], this.opts.theme.bidsRegionStyle);
        this.renderer.region(this.regionPoints['asks'], this.opts.theme.asksRegionStyle);
        this.xticks.forEach(function (tick) {
          _this2.renderer.line(tick.line, _this2.opts.theme.xtickStyle);

          _this2.renderer.text(tick.label, tick.line[0][0], tick.line[0][1] + 10, _this2.opts.theme.xtickTextStyle);
        });
        this.yticks.forEach(function (tick) {
          _this2.renderer.line(tick.line, _this2.opts.theme.ytickStyle);

          _this2.renderer.text(tick.label, tick.line[0][0] - 10, tick.line[0][1], _this2.opts.theme.ytickTextStyle);
        });

        if (this.opts.focus) {
          var focus = this.opts.focus;
          this.renderer.circle(focus[0], focus[1], 4, this.opts.theme.focusCircleStyle);
          var xline = [[0, focus[1]], [this.renderer.width, focus[1]]];
          var yline = [[focus[0], 0], [focus[0], this.renderer.height]];
          this.renderer.line(xline, this.opts.theme.focusLineStyle);
          this.renderer.line(yline, this.opts.theme.focusLineStyle);
          this.renderer.text(focus[2].toFixed(this.opts.priceDecimal), focus[0], 20, this.opts.theme.focusTextXStyle);
          this.renderer.text(focus[3].toFixed(this.opts.volumeDecimal), 0, focus[1], this.opts.theme.focusTextYStyle);
        }

        this.renderer.line(this.spreadIndicator.line, this.opts.theme.indicatorLineStyle);
        this.renderer.text(this.spreadIndicator.label, this.spreadIndicator.anchor[0], this.spreadIndicator.anchor[1] - 10, this.opts.theme.indicatorTextStyle);
      }
    }, {
      key: "prepare",
      value: function prepare() {
        this.opts.dataset.update(this.opts.zoomFactor);
        var sx = this.sx = new LinearScale(this.opts.dataset.priceRange, this.opts.xrange);
        var sy = this.sy = new LinearScale(this.opts.dataset.volumeRange, this.opts.yrange);
        var regions = this.regions = [];
        var points = this.points = {
          bids: [],
          asks: []
        };

        function reducer(side) {
          return function (last, item) {
            var pt = [sx.transform(item[0]), sy.transform(item[2])];
            pt.item = item;
            points[side].push([pt[0], pt[1]]);

            if (last == 0) ; else {
              var xrange = last[0] < pt[0] ? [last[0], pt[0]] : [pt[0], last[0]];
              var region = {
                xrange: xrange,
                last: last
              };
              regions.push(region);
            }

            return pt;
          };
        }

        this.opts.dataset.bids.reduce(reducer('bids'), 0);
        this.opts.dataset.asks.reduce(reducer('asks'), 0); //region points

        var padding = this.opts.theme.padding;
        var regionPoints = this.regionPoints = {
          bids: points.bids.slice(0),
          asks: points.asks.slice(0)
        };
        regionPoints['bids'].push([points['bids'][points['bids'].length - 1][0], this.renderer.height - padding[2]]);
        regionPoints['bids'].push([points['bids'][0][0], this.renderer.height - padding[2]]);
        regionPoints['asks'].push([points['asks'][points['asks'].length - 1][0], this.renderer.height - padding[2]]);
        regionPoints['asks'].push([points['asks'][0][0], this.renderer.height - padding[2]]); //ticks

        var xspan = this.opts.theme.ticks.xspan;
        var yspan = this.opts.theme.ticks.yspan;
        var nyt = Math.floor(this.renderer.height / yspan);
        var nxt = Math.floor(this.renderer.width / xspan);
        var xticks = this.xticks = [];
        var xgrids = this.xgrids = [];

        for (var i = 0; i < nxt; i++) {
          var x = i * xspan + xspan / 2;
          var y = this.renderer.height - 10;
          var label = this.sx.invert(x).toFixed(this.opts.priceDecimal);
          var tick = {
            line: [[x, y], [x, y - 10]],
            label: label
          };
          xticks.push(tick);
          var gline = [[x, 0], [x, y]];
          xgrids.push(gline);
        }

        var yticks = this.yticks = [];
        var ygrids = this.ygrids = [];

        for (var _i = 0; _i < nyt; _i++) {
          var _y = _i * yspan + yspan / 2;

          var _x = this.renderer.width;

          var _label = this.sy.invert(_y).toFixed(this.opts.volumeDecimal);

          var _tick = {
            line: [[_x, _y], [_x - 10, _y]],
            label: _label
          };
          yticks.push(_tick);
          var _gline = [[0, _y], [_x, _y]];
          ygrids.push(_gline);
        } //console.log(yticks)
        //spread


        var vv = 40;
        var ds = this.opts.dataset;
        var s0 = this.sx.transform(ds.center - ds.spread / 2);
        var s1 = this.sx.transform(ds.center + ds.spread / 2);
        this.spreadIndicator = {
          line: [[s0, vv + 10], [s0, vv], [s1, vv], [s1, vv + 10]],
          anchor: [(s0 + s1) / 2, vv],
          label: (ds.spread * 100 / ds.center).toFixed(this.opts.spreadPercentDecimal) + '%'
        };
      }
    }]);

    return DepthChart;
  }();

  exports.ArrayDataset = ArrayDataset;
  exports.CanvasRenderer = CanvasRenderer;
  exports.Dataset = Dataset;
  exports.DepthChart = DepthChart;
  exports.LinearScale = LinearScale;
  exports.Renderer = Renderer;
  exports.Scale = Scale;
  exports.Theme = Theme;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
