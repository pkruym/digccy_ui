<template>
  <div id="app" :class="{ is_app_class: isAppClass }">
    <div class="top-meng"></div>
    <ServerPush></ServerPush>
    <peace class="peaceqq" ref="peace" :orderData="peaceData"></peace>
    <Popup v-model="dialogShow" :hide-on-blur="true" :show-mask="false" position="top" class="mainnumber-popup">
      <ContentBox :propsData="AppDialogData" @close="dialogShow = !dialogShow"></ContentBox>
    </Popup>
    <yd-popup id="alertPropup" v-model="showAlert" class="pc-popup" position="center">
      <div class="content alert-content">
        <div class="popup-head">
          <h1>{{ alertTitle }}</h1>
          <p class="info">{{ alertContent }}</p>
        </div>
        <div class="alert-btn">
          <div class="btn large active" @click="showAlert = false">
            {{ $t("my.setting.text14") }}
          </div>
        </div>
      </div>
    </yd-popup>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import peace from "../src/page/home/views/futures/components/peace";
import ServerPush from "@/components/ServerPush";
import ContentBox from "@/components/Appdialog/ContentBox";
import { Popup } from "vux";

import busVue from "@js/bus";
export default {
  name: "App",
  // components: {
  //   Nav
  // },
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    trybtn() {
      this.tryflag = !this.tryflag;
    },
    reload() {
      this.isRouterAlive = false;
      this.$nexTick((_) => {
        this.isRouterAlive = true;
      });
    },
  },
  watch: {
    showAlert() {
      if (this.showAlert) {
        let alertMaskDom = document.querySelector("#alertPropup > .yd-mask");
        if (alertMaskDom) {
          alertMaskDom.style.zIndex = "1501";
        }
      }
    },
  },
  data() {
    return {
      showAlert: false,
      alertTitle: "提示",
      alertContent: "",
      isRouterAlive: false,
      peaceData: {},
      tryflag: true,
      trylist2: [],
      appinit: false,
      dialogShow: false,
      isHomeTip: false,
      AppDialogData: {
        title: "我是标题",
        data: {},
        btnTxt: "知道了",
        path: "",
      },
      isAppClass: false,
    };
  },
  created() {
    const _this = this;
    busVue.$on("appinit", () => {
      _this.appinit = true;
    });
    busVue.$on("AppDialog", (res) => {
      this.AppDialogData = res;
      this.dialogShow = true;
    });
    busVue.$on("peaceData", (parame) => {
      this.$refs.peace.show = parame.show;
      this.peaceData = parame.peaceData;
    });
    busVue.$on("alert", (param) => {
      this.showAlert = true;
      this.alertTitle = param.title;
      this.alertContent = param.content;
    });
    // 判断是否是原生App打开
    // const u = navigator.userAgent;
    // const app = navigator.appVersion;
    // const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    // const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // let isApp = null;
    // if (isAndroid && window.isApp) {
    //   isApp = window.isApp.javaFunction();
    // } else if (isiOS && window.webkit && window.webkit.messageHandlers) {
    //   isApp = window.webkit.messageHandlers.isApp.postMessage("");
    // }
    // if (isApp) {
    //   this.isAppClass = true;
    // }
  },
  beforeDestroy() {
    this.dialogShow = false;
  },
  components: {
    ServerPush,
    Popup,
    ContentBox,
    peace,
  },
};
</script>

<style lang="less">
@import './assets/css/all.less';
#app {
  height: 100vh;
  position: relative;
}
.fixd-wrap,
.main_page {
  padding-top: 0.85rem;
  height: 100%;
}
.is_app_class {
  padding-top: 28px;
  .full-header.vux-header {
    top: 28px !important;
  }
}
.try {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  overflow-y: scroll;
  color: skyblue;
}
.try2 {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 25px;
  z-index: 99;
  background-color: #000;
  color: #e0ecf7;
}
button {
  outline: none;
}
.mainnumber-popup {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  width: 100%;
  height: 100% !important;
  top: 0;
  left: 0;

  & > div {
    top: 30% !important;

    width: 5.2rem;
    // width: 80%;
    margin: 0 auto;
    border-radius: 6px;
    background: #28323c;
    position: relative;
    overflow: hidden;
    &:after {
      content: '';
      display: block;
      background: url('~@/assets/img/2_0/im_tanchuang_top@2x.png') no-repeat
        100% 100%;
      position: absolute;
      // left: 0;
      top: 0;
      width: 100%;
      height: 0.08rem;
    }
  }
}
</style>
