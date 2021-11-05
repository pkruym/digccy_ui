"use strict";

import { WebSocketClient } from "./websocket";

import { SocketUri } from "./config";

import { Storage } from "./localstorage";
import { SimplePromise } from "./utils";

import pako from "pako";
import i18n from "./../../lang";

const language = localStorage.getItem("language");

/*
/heartbeat         心跳
/login             登录
/user/register     注册
/public/auth_img   获取图形验证码
/sms/send          发送短信
/user/update/password/login2 忘记密码
/commodity/list     品种列表
/contract/list      合约列表
/currency/list      汇率列表
/quote/list         行情列表
/system/notice/list     公告
/system/telecast/list   直播
*/
const UnauthList = [
  "/heartbeat", //         心跳
  "/login", //             登录
  "/user/register", //     注册
  "/code/image", //   获取图形验证码
  "/code/sms/send", //          发送短信

  "/user/query/profile/list", //查询龙虎榜用户信息
  "/user/update/password/login2", // 忘记密码
  "/user/update/password/login1", // 忘记密码
  "/commodity/list", //     品种列表
  "/contract/list", //      合约列表
  "/instrument/list",
  "/tick/list", //K行情
  "/symbol/list", //行情精度列表

  "/currency/list", //      汇率列表
  "/system/helpImageGuide", //      汇率列表
  "/system/helpProblem", //      汇率列表
  "/quote/list", //         行情列表
  "/system/notice/list", //     公告
  "/system/telecast/list", //   直播
  "/system/vestApp",
  "/system/banner/list", //首页banner图
  "/system/info/news_flash/list", //快讯
  "/system/info/strategy/list", //策略
  "/system/info/strategy/count", //策略次数
  "/system/url/image", //轮播图
  "/system/system/infotradelist", //查询交易公告
  "/system/info/trade/list", //查询交易公告
  "/contract/queryAppRecommend", //热门期货
  "/system/customer/list", //微信客服
  "/news/list", //咨讯
  "/system/info/news/list", //咨询新闻
  "/actual/tradeRecord/queryProfitRank", //龙虎榜日榜
  "/actual/tradeRecord/queryVolumeRank", //龙虎榜手数榜
  "/actual/tradeRecord/queryUserDetail", //龙虎榜详情
  "/actual/tradeRecord/queryTradeRevenue", //龙虎榜交易收益
  "/actual/tradeRecord/queryTradeAccount", //龙虎榜交易占比
  "/luckyMoney/queryActivity", //
  "/user/lottery/queryUserLorrerySummer", //
  "/user/lottery/queryList",
  "/system/notice/listIndexAlert"
];
const checkNeedAuth = cmd => {
  if (UnauthList.indexOf(cmd) == -1) {
    return true;
  }
  return false;
};

class myWs2 extends WebSocketClient {
  constructor(uri, opts) {
    super(uri, {
      binaryType: "arraybuffer",
      autoconnect: false
    });

    console.log(uri);


    this.uri = uri;
    this.token = "";
    this.requestId = 0;

    this.queue = [];
    this.queueNeedAuth = [];
    this.sendingObject = {};

    // this.cbonpush = [] // 推送列表

    this.logining = false; // 正在登录
    this.logined = false;

    this.on("open", () => {
      console.log("SocketAPI 连接成功：" + this.address);
      this.token = Storage.getString("token") || "";
      if (this.token && this.token.length > 0) {
        // console.error("对不起，还不能自动重连，没有token登录接口")
        this.logining = false;
        this.logined = true;

        this.request("/reconnect", {});
      }
      this.flushUnreached();
      this.flushPending();
    });

    this.on("message", msg => {
      let message = "";
      if (msg instanceof ArrayBuffer) {
        try {
          let buf = pako.ungzip(Buffer.from(msg));
          message = Buffer.from(buf).toString("utf-8");
        } catch (e) {
          // console.error("解压出错1: ", e.toString())
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
      console.log("SocketAPI 出错: " + this.address + ", " + error);
    });

    this.on("close", (code, msg) => {
      this.logined = false;
      // this.token = ""
      console.log("SocketAPI 关闭: " + this.address + ", " + code);
    });

    this.on("timeout", () => {
      // console.log("ws 收包超时: " + this.address)
    });

    this.on("heartbeat", () => {
      if (this.ready) {
        let now = new Date();
        // console.log(`[${now.Format('yyyy-MM-dd hh:mm:ss.SSS')}] SocketApi 发送心跳: ${this.address}`)
        this.sendInternal({
          cmd: "/heartbeat"
        });
      }
    });
  }

  isOnline() {
    return this.ready;
  }
  isLogined() {
    return this.logined;
  }
  isLogin() {
    return this.token && this.token != "";
  }

  // 设置退出
  logout() {
    this.logined = false;
    this.token = "";
    Storage.delString("token");
    this.emit("logout");
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
    // if (process.env.VERSION_NAME != "正式版" && data.cmd != "/heartbeat")
    console.log("收到的数据为", data);
    //  debugger
    // 处理登录
    if (data.code == 0) {
      // if (data.cmd == '/login' || data.cmd == '/user/register') {
      if (data.cmd == "/login") {
        // 登录成功
        this.logined = true;
        this.logining = false;

        this.flushNeedAuthed(); // 重发需要登录的消息

        if (data.data && data.data.token) {
          Storage.setString("token", data.data.token);
          this.token = data.data.token;
        }
        if (data.data && !data.data.token) {
          data.data.token = Storage.getString("token");
        }
        this.emit("login", data.result); // 广播登录上去的消息

        this.request("/reconnect", {});
      } else if (data.cmd == "/logout") {
        // 退出登录
        this.logout();
      } else if (data.cmd == "/user/query") {
        this.emit("setToken", this.token);
      }
    } else if (data.code == 1007 || data.code == 1008 || data.code == 1014) {
      // token失效，过期，认证失败
      this.logout();
      this.emit("tokenError", data.code);
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

    // 处理推送
    if (data.requestId == null || data.requestId == undefined) {
      let cmd = data.cmd;

      if (data.cmd == "/push/logout") {
        // 被踢下线，推送
        this.logout();
      }

      // let router = cmd.split('/')[2]
      let router = cmd.substring(6);
      let accountType = data.accountType;

      /*
            /push/tradeRecord
            /push/account
            /push/commodity
            /push/contract
            /push/logout
            */
      this.emit("onPush", router, accountType, data.data);
    }
  }

  flushPending() {
    let tmparr = this.queue;
    this.queue = [];
    for (let i = 0; i < tmparr.length; i++) {
      let obj = tmparr[i];
      console.log("发送的参数", obj.message)
      if (!this.logined && checkNeedAuth(obj.message.cmd)) {
        if (this.logining) {
          this.queueNeedAuth.push(obj);
        } else {
          // 没鉴权，没登录，直接报错
          obj.cb({
            code: 1001,
            requestId: -1,
            cmd: obj.message.cmd,
            msg: i18n.tc("message.login.message2")
          });
        }
      } else {
        this.sendInternal(obj.message, obj.cb);
      }
    }
  }

  flushUnreached() {
    let tmpobj = this.sendingObject;
    this.sendingObject = {};
    let keys = Object.keys(tmpobj);
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let obj = tmpobj[k];
      this.sendInternal(obj.message, obj.cb);
    }
  }

  flushNeedAuthed() {
    if (this.logined) {
      let tmparr = this.queueNeedAuth;
      this.queueNeedAuth = [];
      for (let i = 0; i < tmparr.length; i++) {
        let obj = tmparr[i];
        this.sendInternal(obj.message, obj.cb);
      }
    }
  }

  // send message
  request(cmd, param, cb, emitDefault) {
    let message = {
      cmd: cmd,
      param: param,
      language: language === "en" ? "english" : "chinese"
    };
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
        if (res.code == 0 && res.cmd !== "/thirdparty/payment/pay") {
          return resolve(res.data);
        } else if (
          res.cmd == "/thirdparty/payment/pay" ||
          res.cmd == "/lottery/count/query" ||
          res.cmd == "/lottery"
        ) {
          return resolve(res);
        } else if (
          res.code == 1013 &&
          (res.cmd == "/withdraw/apply" || res.cmd == "/actual/order/open")
        ) {
          // 格式化一下message
          // let orgmsg = JSON.parse(JSON.stringify(message))
          // 失败：
          console.error(
            `SocketAPI error: requestId = ${res.requestId}, cmd = ${
              res.cmd
            }, message`,
            ` code = ${res.code}, reason = ${res.msg}`
          );
          if (reject) {
            return reject("因异常操作,该账户资金已被冻结,请联系客服处理");
          } else {
            return resolve("因异常操作,该账户资金已被冻结,请联系客服处理");
          }
        } else {
          // 格式化一下messag

          // let orgmsg = JSON.parse(JSON.stringify(message))
          // 失败：
          console.error(
            `SocketAPI error: requestId = ${res.requestId}, cmd = ${
              res.cmd
            }, message`,
            ` code = ${res.code}, reason = ${res.msg}`
          );
          if (reject) {
            if (
              res.cmd == "/withdraw_otc/apply" ||
              res.cmd == "/withdraw/apply/burse" ||
              res.cmd == "/actual/order/open" ||
              res.cmd == "/simulate/order/open"
            ) {
              return reject(res);
            }
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

    if (message.cmd == "/login") {
      this.logining = true;
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
    console.log("发送的参数", obj)
    let no = obj.requestId;
    if (cb && typeof cb == "function") {
      this.sendingObject[no] = {
        message: message,
        cb: cb
      };
    }
    this.send(JSON.stringify(obj));
  }
}

export let SocketAPI = new myWs2(SocketUri);
