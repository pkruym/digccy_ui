const Vue = require("vue");
const axios = require("axios");

import "./assets/js/rem";

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);
import i18n from "./lang";
import { Storage } from "@/assets/js/localstorage";

Vue.prototype.$lang = localStorage.getItem("language")
  ? localStorage.getItem("language") == "en"
    ? "en"
    : localStorage.getItem("language") == "undefined"
    ? "zh"
    : localStorage.getItem("language")
  : "zh";
// 注册全局指令
import Directive from "./directives/index.js";
Directive(Vue);
//
// import "@/assets/css/elementUIchange.css";
// 懒加载列表数据
import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);
import FastClick from "fastclick";
import { Currency } from "@/assets/js/config";
import YDUI from "vue-ydui"; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import "vue-ydui/dist/ydui.rem.css";
import {
  Confirm,
  Alert,
  Toast,
  Notify,
  Loading
} from "vue-ydui/dist/lib.rem/dialog";
Vue.prototype.$dialog = {
  confirm: Confirm,
  alert: Alert,
  toast: Toast,
  notify: Notify,
  loading: Loading
};
Vue.use(YDUI);
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("@/assets/img/2_3/ico_touxiang_zhanwei@2x.png"),
  loading: require("@/assets/img/2_3/ico_touxiang_zhanwei@2x.png"),
  attempt: 1
});
import {
  addNum,
  subtr,
  isPositiveIntegerTimes,
  accDiv,
  accAdd,
  accSub,
  toFixedStr
} from "./assets/js/add-remove";

import "swiper/dist/css/swiper.css";
Vue.prototype.$axios = axios;
import router from "./router";
import store from "./store";
import App from "./App";
import noData from "@/components/element/noData";
import ModelFull from "@/components/element/model-full";
Vue.component("no-data", noData);
Vue.component("ModelFull", ModelFull);
FastClick.attach(document.body);

//模拟盘
Vue.prototype.$diskinfo = { type: "" };
if (!Storage.getString("t_diskinfo")) {
  Storage.setString("t_diskinfo", "actual");
}
if (!Storage.getString("token")) {
  Storage.setString("t_diskinfo", "actual");
}
if (!Storage.getString("tradeType")) {
  Storage.setString("tradeType", "LEVER");
}
Vue.prototype.$diskinfo = { type: Storage.getString("t_diskinfo") || "actual" };
Vue.prototype.$tradeType = { tradeType: Storage.getString("tradeType") };
//end

import {
  ConfirmPlugin,
  AlertPlugin,
  LoadingPlugin,
  ToastPlugin,
  Popup,
  TransferDom,
  Tab,
  TabItem
} from "vux";

Vue.directive("transfer-dom", TransferDom);
Vue.component("popup", Popup);
Vue.component("tab", Tab);
Vue.component("tab-item", TabItem);

import { baseElement } from "@/components/element";

Object.keys(baseElement).forEach(key => Vue.component(key, baseElement[key]));

import filters from "./filters";
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Vue.filter("toFixedFil", function(value, item) {
  if (value === null) {
    return "--";
  }

  if (value || value == "0") {
    const num =
      (item.minWave || "").toString().split(".")[1] != null
        ? (item.minWave || "").toString().split(".")[1].length
        : 0;

    return (value * 1).toFixed(num);
  }
});
Vue.directive("enterNumber", {
  inserted: function(el) {
    el.addEventListener("keypress", function(e) {
      e = e || window.event;
      let charcode = typeof e.charCode == "number" ? e.charCode : e.keyCode;
      let re = /\d/;
      if (charcode == 46) {
        if (el.value.includes(".")) {
          e.preventDefault();
        }
        return;
      } else if (
        !re.test(String.fromCharCode(charcode)) &&
        charcode > 9 &&
        !e.ctrlKey
      ) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    });
  }
});
Vue.use(ToastPlugin, {
  time: 3000
});
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(AlertPlugin);
Vue.prototype.toFixed2 = function(num) {
  let val = Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
  val = val || 0;
  let s = val.toString().split(".");
  if (s.length == 1) {
    val = val.toString() + ".00";
    return val;
  }
  if (s.length > 1) {
    if (s[1].length < 2) {
      val = val.toString() + "0";
    }
    return val;
  }
  return val;
};
Vue.prototype.scoketApi = { sendSock: function() {} };
Vue.prototype.addNum = addNum;
Vue.prototype.subtr = subtr;
Vue.prototype.accDiv = accDiv;
Vue.prototype.toFixedStr = toFixedStr;
Vue.prototype.accAdd = accAdd;
Vue.prototype.accSub = accSub;
Vue.prototype.isPositiveIntegerTimes = isPositiveIntegerTimes;

Vue.prototype.AloginNotic = function() {
  if (socketApi.isLogin()) {
    return true;
  }
  Notification.info({
    title: "登录提示",
    message: "您未登录，请先登录",
    position: "bottom-right",
    duration: 2000
  });
  return false;
};

Vue.prototype.Currency = Currency;
Vue.prototype.$imgUrl = "";

Vue.prototype.$currency = process.env.currency;

// var vConsole = new VConsole()

Vue.prototype.$devicePixelRatio = 2;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  components: {
    App
  },
  template: "<App/>"
});

if (PACKTIME) {
  console.log(
    `WebH5启动，版本号：${process.env.VERSION_STRING}，打包时间：${PACKTIME}`
  );
}
