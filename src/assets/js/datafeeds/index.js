"use strict";

import { MarketAPI } from "../MarketApi2";

import { EventEmitter } from "../websocket/eventemitter3";

const HistoryBarCountLimitation = 300;

function transDate(val) {
  let date = new Date(val * 1000);
  return date.Format("yyyy-MM-dd hh:mm:ss");
}

function fixTimestamp(ts, resolution) {
  let dt = new Date();
  dt.setTime(ts);
  if (resolution == "D") {
    // 日K
    dt.setMilliseconds(0);
    dt.setSeconds(0);
    dt.setMinutes(0);
    dt.setHours(0);
    return dt.getTime();
  } else {
    // 分K，找可用范围
    dt.setMilliseconds(0);
    dt.setSeconds(0);

    let h = dt.getHours(),
      m = dt.getMinutes();
    let tmp = h * 60 + m;
    tmp = tmp - (tmp % parseInt(resolution));
    h = Math.floor(tmp / 60);
    m = tmp % 60;

    dt.setMinutes(m);
    dt.setHours(h);
    return dt.getTime();
  }
}

// 计算一共多少根，from, to, resolution => count
function calcCounts(from, to, resolution,first) {
  if (from >= to) {
    return 0;
  }
  // if(first)
  // return 300
  let delta = (to - from) / 60;
  if (resolution == "D") {
    resolution = "1440";
  }
  let count = Math.floor(delta / parseInt(resolution)) + 1;
  return count;
}

// 计算to到最前面是多少, to, count, resolution => from
function calcTime(to, count, resolution) {
  if (resolution == "D") {
    resolution = "1440";
  }
  let delta = parseInt(resolution) * 60 * 1000 * count;

  return to - delta;
}

// return Array<params>
function splitParamsByCountLimit(params, limit = HistoryBarCountLimitation) {
  let resolution = params.resolution;

  let arr = [];

  let count = params.count;
  let nextTime = params.time;

  while (count > limit) {
    arr.push({
      symbol: params.symbol,
      resolution: resolution,
      time: nextTime,
      count: limit
    });

    nextTime = calcTime(nextTime, limit, resolution);
    count -= limit;
  }

  if (count > 0) {
    // 添加最后一个
    arr.push({
      symbol: params.symbol,
      resolution: resolution,
      time: nextTime,
      count: count
    });
  }
  return arr;
}

/*
    obj = {
        commodityNo,
        contractNo,
        resolution,
        time: 121552616,    // endtime， 0表示分时线
        count: 0,           // 0 表示分时线
    }
*/
function getHistory(params, callback) {
  // if (!params.time || params.time == 0 || !params.count || params.count == 0) {
  //     return MarketAPI.queryMiuteKlineList(params, callback)
  // } else {
  // 分割params里面的count，限制每次300根
  // let arr = splitParamsByCountLimit(params)
  // let promiseArr = []
  // for (let i = 0; i < arr.length; i++) {
  //     promiseArr.push(MarketAPI.queryKlinesimplifyList(arr[i]))
  // }

  return MarketAPI.queryKlinesimplifyList(params, callback);

}

export class TVDataFeed extends EventEmitter {
  constructor() {
    super();

    this._ws = MarketAPI; // 外部ws

    this.activeIndex = "0";
    // this.i = 0;

    this._subscribers = {};
    this._supported_resolutions = [
      "1",
      "3",
      "5",
      "15",
      "30",
      "60",
      "120",
      "240",
      "D"
    ];

    let errorcb = error => {
      return this.emit("error", error);
    };
    let closecb = (code, msg) => {
      return this.emit("close", code, msg);
    };
    let opencb = () => {
      return this.emit("open");
    };

    this._ws.on("error", errorcb);
    this._ws.on("close", closecb);
    this._ws.on("open", opencb);

    this.destory = () => {
      this.getNowSelection = () => {};
      this.setNowSelection = () => {};
      this.unsubscribeAllBars();

      this._ws.off("error", errorcb);
      this._ws.off("close", closecb);
      this._ws.off("open", opencb);

      this.removeAllListeners();
      this._ws = null;
    };

    this.noDataRetry = 0;
  }

  setNowSelection(index) {
    this.activeIndex = index;
  }

  getNowSelection() {
    return this.activeIndex;
  }

  onReady(callback) {
    setTimeout(() => {
      callback({
        supports_search: false,
        supports_group_request: true,
        supported_resolutions: this._supported_resolutions,
        supports_marks: false,
        supports_time: false,
        supports_timescale_marks: false
      });
    }, 0);
  }
  searchSymbols(userInput, exchange, symbolType, onResultReadyCallBack) {
    // 没实现
    return;
  }
  resolveSymbol(symbolName, onSymbolResolvedCallBack, onResolveErrorCallBack) {
    let symbol = symbolName.replace(/[^a-zA-Z]/g, "");
    let contractList = JSON.parse(sessionStorage.getItem("contractList"));
    let contract = contractList.filter(v => v.symbol == symbolName);

    // let name = obj.name + strCommodityNo + contractNo
    if (contract) {
      let pricescale = Math.pow(10, contract[0].symbolpricePrecision);
      console.log("pricescale", pricescale);
      setTimeout(() => {
        onSymbolResolvedCallBack({
          name: symbolName,
          timezone: "Asia/Shanghai",
          pricescale: pricescale, //精度，100是2位小数
          minmov: 1,
          minmov2: 0,
          ticker: symbolName,
          description: contract[0].symbol, // 这里会覆盖掉标题
          // "session": obj.session,         // 交易时间
          session: "24x7",
          // "regular_session": obj.session,
          type: "futures", // 期货
          "exchange-traded": "Huobi Lite",
          "exchange-listed": "", // 这个会加到SymbolName里面
          has_intraday: true, //
          intraday_multipliers: this._supported_resolutions,
          has_daily: true,
          has_weekly_and_monthly: false,
          has_no_volume: false,
          data_status: "streaming"
          // "force_session_build": false,
          // expired: true,
          // expiration_date: new Date().getTime() / 1000,
        });
      }, 0);
    } else {
      setTimeout(() => {
        onResolveErrorCallBack("没有这个Symbol: " + symbolName);
      }, 0);
    }
  }
  getBars(
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    let interval = this.getNowSelection();
    let isTimeMinute = resolution == "1" && interval == "0"; // 分时线，只有一天
    console.log(
      "getBars: ",
      symbolInfo,
      resolution,
      isTimeMinute,
      transDate(from),
      transDate(to),
      "first = " + firstDataRequest
    );
    let symbol = symbolInfo.base_name[0];

    // 新版本
    let params = {
      symbol: symbol, //CL
      resolution: resolution,
      time: to * 1000,

      count: calcCounts(from, to, resolution) // 根据from，to，resolution，反算出需要多少根K线
    };

    // if (isTimeMinute) {
    //     // 分时，固定参数
    //     // params.count = 0
    //     // params.time = 0
    //     if (firstDataRequest == false) {
    //         // 返回缓存
    //         return onHistoryCallback([], {
    //             noData: true
    //         })
    //     }
    // }

    let t1 = new Date();
    return getHistory(params, res => {
      let data = res;
      let bars = [];
      let noData = false;

      let delta = new Date().getTime() - t1.getTime();
      console.log(
        "请求历史数据成功：",
        params,
        JSON.parse(JSON.stringify(res)),
        ", 请求时长：",
        delta,
        "ms"
      );

      if (!data || data.length <= 0) {
        noData = true;
      } else {
        for (let i in data) {
          let barValue = {
            time: data[i].datas[1],
            close: data[i].datas[5],
            open: data[i].datas[4],
            high: data[i].datas[6],
            low: data[i].datas[7],
            volume: data[i].datas[9]
          };
          // if (isTimeMinute) {
          // bars.push(barValue)
          // } else {
          bars.unshift(barValue);
          // }
        }
        // console.log('sssssssss', bars);
        if (isTimeMinute && bars.length <= 0) {
          noData = true;
        }
      }

      onHistoryCallback(bars, {
        noData: noData
      });
      this.emit("onHistoryCallback");

      // if (firstDataRequest) {
      //   this.emit("historyRequest");
      // }
    });
  }
  _onSubscriberDataReceived(subscriberUID, result) {
    if (!this._subscribers.hasOwnProperty(subscriberUID)) {
      // console.log('this._subscribers', this._subscribers)
      // logMessage("DataPulseProvider: Data comes for already unsubscribed subscription #" + listenerGuid);
      return;
    }
    // means the subscription was cancelled while waiting for data

    var bars = result.bars;
    if (bars.length === 0) {
      return;
    }

    var lastBar = bars[bars.length - 1];
    var subscriptionRecord = this._subscribers[subscriberUID];

    subscriptionRecord.lastBarTime = lastBar.time;
    subscriptionRecord.onRealtimeCallBack(lastBar);
  }

  resetData() {
    let arr = Object.keys(this._subscribers);
    for (let i = 0; i < arr.length; i++) {
      let k = arr[i];
      let subscriptionRecord = this._subscribers[k];
      if (subscriptionRecord.onResetCacheNeededCallback) {
        subscriptionRecord.onResetCacheNeededCallback();
      }
    }
  }

  subscribeBars(
    symbolInfo,
    resolution,
    onRealtimeCallBack,
    subscriberUID,
    onResetCacheNeededCallback
  ) {
    console.log("subscribeBars: ", symbolInfo, resolution, subscriberUID);
    // let symbol = symbolInfo
    let symbol = symbolInfo.base_name[0];
    let obj = {
      resolution: resolution,
      symbol: symbol
    };
   let _this=this;
    let makeCB = subscriberUID => {
      return res => {
        let subInfo = _this._subscribers[subscriberUID];
        if (subInfo) {
          // debugger
          // let contract=  getContractInfo(store.rootGetters,{symbol:res.symbol})
          // console.log('tu',res)
          let value = {
            time: fixTimestamp(res.time, resolution),
            open: res.open,
            high: res.high,
            low: res.low,
            close: res.close,
            volume: res.volume
          };

          let result = {
            bars: [value],
            meta: {
              nodata: false
            }
          };
          _this._onSubscriberDataReceived(subscriberUID, result);
        }
      };
    };
    console.log("subscriberUID", subscriberUID, resolution, obj);

    let cb = makeCB(subscriberUID);

    this._subscribers[subscriberUID] = {
      lastBarTime: null,
      onRealtimeCallBack: onRealtimeCallBack,
      onResetCacheNeededCallback: onResetCacheNeededCallback,
      resolution: resolution,

      // for ws
      obj: obj,
      cb: cb
    };
    if (this._ws) this._ws.doSubscribe(obj, cb);
  }

  unsubscribeBars(subscriberUID) {
    if (this._subscribers.hasOwnProperty(subscriberUID)) {
      let x = this._subscribers[subscriberUID];
      if (x) {
        delete this._subscribers[subscriberUID];
        if (this._ws) this._ws.doUnSubscribe(x.obj, x.cb);
      }
    }
  }

  unsubscribeAllBars() {
    let arr = Object.keys(this._subscribers);
    for (let i = 0; i < arr.length; i++) {
      let k = arr[i];
      let x = this._subscribers[k];
      if (x) {
        delete this._subscribers[k];
        if (this._ws) this._ws.doUnSubscribe(x.obj, x.cb);
      }
    }
  }

  calculateHistoryDepth(resolution, resolutionBack, intervalBack) {
    // if(resolution == "1") {
    //     return {
    //         resolutionBack: "D",
    //         intervalBack: 1,
    //     }
    // } else
    // if (resolution == "1") {
    //     return {
    //         resolutionBack: "D",
    //         intervalBack: 1,
    //     }
    // } else if (resolution == "15") {
    //     return {
    //         resolutionBack: "D",
    //         intervalBack: 6,
    //     }
    // } else if (resolution == "30") {
    //     return {
    //         resolutionBack: "D",
    //         intervalBack: 6,
    //     }
    // } else if (resolution == "60") {
    //     return {
    //         resolutionBack: "D",
    //         intervalBack: 15,
    //     }
    // } else if (resolution == "120") {
    //     return {
    //         resolutionBack: "D",
    //         intervalBack: 25,
    //     }
    // } else if (resolution == "240") {
    //     return {
    //         resolutionBack: "D",
    //         intervalBack: 30,
    //     }
    //     // } else if (resolution == "D") {
    //     //     return {
    //     //         resolutionBack: "D",
    //     //         intervalBack: 356,
    //     //     }
    // }
    return undefined;
  }
  getMarks(symbolInfo, from, to, onDataCallback, resolution) {
    return;
  }
  getTimescaleMarks(symbolInfo, from, to, onDataCallback, resolution) {
    return;
  }
  getServerTime(callback) {
    // return callback(new Date().getCurrentUTCTime() / 1e3)
  }
}
