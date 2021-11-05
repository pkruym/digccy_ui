<template>
  <div id="me" class="myWrap">
    <div class="yindao" v-if="isShowyin && isshowyindao">
      <img v-if="lang == 'en'" src="@/assets/img/img_yindao_me_en@2x.png" />
      <img v-else src="@/assets/img/img_yindao_me_cn@2x.png" />
      <div class="closeyin" @click="closeyin">{{ $t("page.text48") }}</div>
    </div>
    <div class="me-top">
      <ul>
        <li class="flex facebox">
          <div class="face flex" @click="chargeinfo">
            <img v-lazy="{
                src: headPortrait + userInfo.headImg,
                error: require('@/assets/img/2_3/icon_me_avatar@2x.png'),
                loading: require('@/assets/img/2_3/icon_me_avatar@2x.png')
              }" class="face" v-if="isLogin && userInfo.headImg && userInfo.headImg != 'null'" />
            <img src="@/assets/img/2_3/icon_me_avatar@2x.png" v-else class="face" />
            <div class="facemsg">
              <span class="medium">{{
                isLogin
                  ? mobilephone.replace(/^(\d{4})\d{4}(\d+)/, "$1****$2")
                  : $t("my.text1")
              }}</span>
              <span v-if="isLogin">{{
                $diskinfo.type == "actual"
                  ? $t("my.myInfo.text7")
                  : $t("my.myInfo.text8")
              }}</span>
            </div>
          </div>
          <!-- <div class="regsiter-tip" v-if="!isLogin">
            <div id="demoCanvas" class="svga" ref="canvas"></div>
            新用户注册送58USDT
          </div> -->
          <div class="switch-box" @click="Switck" :class="$diskinfo.type == 'actual' ? 'switch-btn' : 'switch-btn2'" v-if="!isshowyindao">
            <img class="jt" v-if="$diskinfo.type == 'actual'" src="@/assets/img/2_3/icon_bbdh@2x.png" alt="" />
            <div class="icon-pan" v-if="$diskinfo.type == 'actual'">
              {{ $t("my.myInfo.text10") }}
            </div>
            <div class="icon-pan" v-else>{{ $t("my.myInfo.text9") }}</div>
            <img class="jt" v-if="$diskinfo.type != 'actual'" src="@/assets/img/2_3/icon_bbdh2@2x.png" alt="" />
          </div>
        </li>
        <li class="totalmoney">
          <div>
            <div class="money-box">
              <div class="left">
                <div class="lert-bg">
                  <img src="@/assets/img/2_3/fill_bg@2x.png" alt />
                </div>
                <div class="pbox flex see">
                  <span>{{ $t("my.text2") }}(USDT)</span>
                  <span v-show="eyes" @click="clickEyes">
                    <img width="16" height="13" src="@/assets/img/icon_eye_nor@2x.png" alt />
                  </span>
                  <span v-show="!eyes" @click="clickEyes">
                    <img width="16" height="13" src="@/assets/img/icon_eye_sel@2x.png" alt />
                  </span>
                </div>
                <div class="keyong flex line05">
                  <div class="flex jine">
                    <div v-show="eyes" class="num din-medium">
                      {{ isLogin ? personalMsgKey[1].value : "--" }}
                    </div>
                    <p v-show="!eyes" class="num din-medium">{{ "****" }}</p>
                  </div>
                </div>
              </div>
              <div class="right" @click="assetanalysis">
                <img @click="assetanalysis" src="@/assets/img/2_8/icon_me_fenxi@2x.png" alt="" />
                <!-- 资产盈亏分析 -->
                <span @click="assetanalysis">{{
                  $t("assetanalysis.title")
                }}</span>
                <img @click="assetanalysis" class="arrow" src="@/assets/img/right@2x.png" />
              </div>
            </div>

            <div class="flex kaquan line05" v-if="$diskinfo.type == 'actual'">
              <div class="box" @click="$router.push('/coupons')">
                <div class="top">
                  <div class="title">
                    <img src="@/assets/img/2_7/icon_me_hb@2x.png" alt="" />
                    <!-- 红包卡券 -->
                    {{ $t("common.redCard") }}
                  </div>
                  <div class="arrow"></div>
                </div>
                <div v-show="eyes" class="money">
                  {{ isLogin ? personalMsgKey[6].value : "--" }}
                </div>
                <div v-show="!eyes" class="money">{{ "****" }}</div>
              </div>
              <div class="box" @click="$router.push('/income')">
                <div class="top">
                  <div class="title">
                    <img src="@/assets/img/2_7/icon_me_sy@2x.png" alt="" />
                    <!-- 红包收益 -->
                    {{ $t("common.reward") }}
                  </div>
                  <div class="arrow"></div>
                </div>
                <div v-show="eyes" class="money">
                  {{ isLogin ? personalMsgKey[5].value : "--" }}
                </div>
                <div v-show="!eyes" class="money">{{ "****" }}</div>
              </div>
            </div>

            <div class="flex login-box">
              <!-- <div v-show="isLogin && $diskinfo.type == 'actual'" class="registered-tips">
                <p class="text">{{ $t("common.send58u") }}</p>
              </div> -->
              <div class="register" @click="clickHandle">
                {{ isLogin ? $t("navbar.coinCharging") : $t("my.text4") }}
              </div>

              <router-link tag="div" :to="{
                  path: isLogin
                    ? '/drawmoney/sell?' + 'realAuth=' + userInfo.realAuth
                    : '/login'
                }" class="charge">
                {{ isLogin ? $t("navbar.withdrawmoney") : $t("login.login") }}
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="my-footer">
      <div class="me-middle">
        <ul>
          <router-link tag="li" to="/record" class="flex">
            <div class="flex">
              <img src="@/assets/img/2_3/icon_me_zjmx@2x.png" alt />
              <span>{{ $t("my.text9") }}</span>
            </div>
            <img class="arrow" src="@/assets/img/right@2x.png" />
          </router-link>
          <router-link tag="li" to="/transactionsettings" class="flex">
            <div class="flex">
              <img src="@img/2_3/icon_me_jysetting@2x.png" alt />
              <span>{{ $t("my.text27") }}</span>
            </div>
            <img class="arrow" src="@/assets/img/right@2x.png" />
          </router-link>
        </ul>
        <ul>
          <router-link tag="li" to="/notice" class="flex">
            <div class="flex">
              <img src="@/assets/img/2_3/icon_me_gg@2x.png" alt />
              <span :class="hasOutsideMessage ? 'inside' : ''" style="position: relative">{{ $t("my.text14") }}</span>
            </div>
            <img class="arrow" src="@/assets/img/right@2x.png" />
          </router-link>
          <li class="flex" @click="showVx">
            <div class="flex">
              <img src="@/assets/img/2_3/icon_me_kefu@2x.png" alt />
              <span>{{ $t("my.text15") }}</span>
            </div>
            <div class="flex">
              <span class="tip"></span>
              <img class="arrow" src="@/assets/img/right@2x.png" />
            </div>
          </li>
          <li class="flex" @click="doShare">
            <div class="flex">
              <img src="@/assets/img/icon_me_share@2x.png" alt />
              <span>{{ $t("common.share") }}</span>
            </div>
            <div class="flex">
              <span class="tip"></span>
              <img class="arrow" src="@/assets/img/right@2x.png" />
            </div>
          </li>
        </ul>
        <ul>
          <router-link tag="li" to="/setting" class="flex">
            <div class="flex">
              <img src="@img/2_3/icon_me_setting@2x.png" alt />
              <span>{{ $t("my.text18") }}</span>
            </div>
            <img class="arrow" src="@/assets/img/right@2x.png" />
          </router-link>
        </ul>
      </div>
    </div>
    <div class="share-img" v-if="showShare">
      <img v-if="lang=='en'" class="arrow" id="shareimg" src="@/assets/img/2_8/share@2x.png" />
      <img v-else class="arrow" id="shareimg" src="@/assets/img/share@2x.png" />
    </div>
    <popup v-model="show" class="vx-popup" :show-mask="true">
      <div class="wechat">
        <div class="content">
          <div class="top">
            <!-- <p>Hi~欢迎加入官方微信群</p>
            <h2>为你准备了更多福利优惠</h2> -->
            <p>{{ $t("my.text23") }}</p>
            <h2>{{ $t("my.text24") }}</h2>
          </div>
          <div class="mid">
            <p>{{ $t("my.text25") }}</p>
            <div class="wximg"><img :src="headPortrait + wxUrl" alt="" /></div>
            <textarea id="textareainput"></textarea>
            <div class="copy-btn" v-clipboard:copy="wxcode" v-clipboard:success="copy">
              {{ $t("my.text21") }}
            </div>
          </div>
        </div>
        <div class="bot">
          <img src="@/assets/img/2_3/icon_me_close_circle@2x.png" alt="" @click="onHide" />
        </div>
      </div>
    </popup>
    <yd-popup v-model="showShare" class="pc-popup" position="bottom">
      <div class="share-content">
        <div class="share-head">
          <p>{{$t('common.shareTo')}}</p>
        </div>
        <div class="share-box">
          <div class="box-item" @click="shareSave">
            <img class="arrow" src="@/assets/img/icon_share_img@2x.png" />
            <p>{{$t('common.saved')}}</p>
          </div>
        </div>
        <div class="share-btn">
          <div @click="showShare = false">{{ $t("common.cancle") }}</div>
        </div>
      </div>
    </yd-popup>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { Diskinfo } from "@/assets/js/localstorage";
import { SocketAPI } from "@/assets/js/WsApi2";
export default {
  data() {
    return {
      currentStatus: true, //当前盘符状态
      headPortrait: localStorage.getItem("imageUrl") || "",
      token: localStorage.getItem("token"),
      // phone: localStorage.getItem("phone"),
      // userInfo: {},
      hasInsideMessage: false,
      hasOutsideMessage: false,
      profit: "",
      showShare: false,
      show: false,
      hastrue: false,
      eyes: true,
      wxcode: "",
      wxUrl: "",
      isshowyindao: false,
      lang: localStorage.getItem("language") || 'zh'
    };
  },
  computed: {
    ...mapState([
      "price",
      "settingPaymentPassword",
      "frozenCapital",
      "floatAvailableBalance"
    ]),
    ...mapGetters({
      userInfo: "user/userInfo",
      isLogin: "user/isLogin",
      mobilephone: "user/mobilephone",
      personalMsgKey: "actual/account/personalMsgKey"
    }),
    isShowyin() {
      let show = localStorage.getItem("ydtop") || "";
      if (!show && this.isLogin) {
        this.isshowyindao = true;
        return true;
      } else {
        this.isshowyindao = false;
        return false;
      }
    }
  },
  watch: {
    $route() {
      this.currentStatus = this.$diskinfo.type == "actual" ? true : false;
    }
  },
  mounted() { },
  methods: {
    ...mapMutations({
      accountchangeDisk: "actual/account/changeDiskStatus", //修改状态
      orderchangeDisk: "actual/order/changeDiskStatus", //修改状态
      positionchangeDisk: "actual/position/changeDiskStatus", //修改状态
      stoplossorprofitchangeDisk: "actual/stoplossorprofit/changeDiskStatus", //修改状态
      tradeinfochangeDisk: "actual/tradeinfo/changeDiskStatus", //修改状态
      traderecordchangeDisk: "actual/traderecord/changeDiskStatus" //修改状态
    }),
    setting() {
      this.$router.push("/setting");
    },
    doShare() {
      this.showShare = true;
    },

    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
    },
    shareSave() {
      let picurl = document.getElementById("shareimg");
      let image = new Image();
      image.src = picurl.src;
      this.$vux.toast.text(this.$t("common.saveImg"), "middle");
      let _this = this;
      image.onload = function () {
        let base64 = _this.getBase64Image(image);
        setTimeout(_ => {
          let data = {
            img: base64
          };
          if (window.webkit) {
            window.webkit.messageHandlers.SaveImage.postMessage(data);
          }
          if (window.appInterface) {
            window.appInterface.SaveImage(data);
          }
        }, 300);
      };
    },

    closeyin() {
      this.isshowyindao = false;
      localStorage.setItem("ydtop", 1);
    },
    clickHandle() {
      let path = "";
      if (this.isLogin) {
        // todo:缓存第一次点击
        const is_rember = localStorage.getItem("is_rember");
        if (is_rember && is_rember == 1) {
          path = "/drawmoney/index";
        } else {
          path = "/instructions"; // 跳到充值须知页面
        }
      } else {
        path = "/register";
      }
      // path: isLogin ? '/drawmoney/reversal' : '/register'
      this.$router.push(path);
    },
    Switck() {
      let _this = this;
      if (!this.isLogin) {
        this.$vux.confirm.show({
          title: this.$t("message.login.title"),
          content: this.$t("message.login.message2"),
          confirmText: this.$t("setText.login"),
          cancelText: this.$t("common.text3"),
          onCancel() { },
          onConfirm() {
            _this.$router.push("/login");
          }
        });
        return;
      }
      this.$vux.confirm.show({
        title: this.$t("setText.title"),
        content:
          _this.$diskinfo.type == "actual"
            ? this.$t("common.text1")
            : this.$t("common.text2"),
        confirmText: this.$t("personalCenter.text15"),
        cancelText: this.$t("common.text3"),
        onCancel() { },
        onConfirm() {
          // console.log("ssss");
          _this.currentStatus = !(_this.$diskinfo.type == "actual");
          _this.$diskinfo.type = _this.currentStatus ? "actual" : "simulate";
          Diskinfo.save(_this.currentStatus ? "actual" : "simulate");
          _this.orderchangeDisk({ type: _this.$diskinfo.type });
          _this.accountchangeDisk({ type: _this.$diskinfo.type });
          _this.positionchangeDisk({ type: _this.$diskinfo.type });
          _this.stoplossorprofitchangeDisk({ type: _this.$diskinfo.type });
          _this.tradeinfochangeDisk({ type: _this.$diskinfo.type });
          _this.traderecordchangeDisk({ type: _this.$diskinfo.type });
          SocketAPI.emit("login", this.currentStatus); //切换模拟盘广播重新获取数据
        }
      });
    },
    copy() {
      this.$vux.toast.text(this.$t("common.copy"), "top");
      this.show = false;
    },
    clickEyes() {
      this.eyes = !this.eyes;
    },
    assetanalysis() {
      let _this = this;
      if (!this.isLogin) {
        this.$vux.confirm.show({
          title: this.$t("message.login.title"),
          content: this.$t("message.login.message2"),
          confirmText: this.$t("setText.login"),
          cancelText: this.$t("common.text3"),
          onCancel() { },
          onConfirm() {
            _this.$router.push("/login");
          }
        });
        return;
      }
      this.$router.push({
        path: "/assetanalysis"
      });
    },
    showVx() {
      this.$router.push({
        path: "/service"
      });
      // window.location.href =
      //   "http://47.244.79.168/chat/front/#/index?platform=1002";
    },
    onHide() {
      this.show = false;
    },
    // showWeChat() {
    //   this.getWX();
    // },
    // getWX() {
    //   const _this = this;
    //   this.getWxcode()
    //     .then(res => {
    //       console.log(res);
    //       _this.wxcode = res.wxCode;
    //       _this.wxUrl = res.headLink;
    //       _this.show = true;
    //     })
    //     .catch(err => {});
    // },
    getnoticeCountUnread() { },
    chargeinfo() {
      this.$router.push("/my");
    }
  },
  beforeCreate() {
    //预备加载深度图
    if (!document.getElementById("highcharts")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      (script.id = "highcharts"),
        (script.src =
          "https://cdn-lalala.oss-cn-beijing.aliyuncs.com/bit-huobi/static/highcharts.js");
      const head = document.getElementsByTagName("head")[0];
      let ss = document.getElementsByTagName("head");
      (head || document.body).appendChild(script);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/#app .top-meng {
  background: red;
}
#textareainput {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -10;
}

.inside::before {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: 0;
  right: -8px;
  background: @coral;
}
.myWrap {
  height: 100%;
  background-color: @myBgColor;
  padding-bottom: 60px;
  // padding-bottom: 1rem !important;
  overflow: hidden;
  // -webkit-overflow-scrolling: touch;
  // background-color: @myBgColor;
  .yindao {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(18, 22, 28, 0.7);
    z-index: 200;
    .closeyin {
      margin: 2rem auto;
      height: 0.72rem;
      width: 2.02rem;
      font-size: 16px;
      line-height: 0.72rem;
      color: @bodyBg;
      background: @blueColor;
      text-align: center;
      border-radius: 0.36rem;
      // background-image: linear-gradient(90deg, #1dcba2 0%, #00a981 100%);
      box-shadow: 0 6px 9px 0 rgba(0, 102, 237, 0.36);
    }
    img {
      margin-top: 0.2rem;
      margin-right: 0.16rem;
      height: 3.32rem;
      width: 7.5rem;
    }
  }
  .vx-popup {
    background: none;
    top: 50%;
    margin: 0 auto;
    margin-top: -4rem;
    overflow: initial !important;
    .wechat {
      width: 6.1rem;
      margin: 0 auto;
      position: relative;
      .content {
        width: 100%;
        height: 7.2rem;
        background: url('~@/assets/img/2_3/img_me_wechat_bai_bg@2x.png')
          no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        color: @writeColor;
        .top {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: @writeColor;
          height: 1.8rem;
          p {
            font-size: 14px;
          }
          h2 {
            font-size: 20px;
            margin-top: 4px;
          }
        }
        .mid {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          p {
            font-size: 12px;
            color: #8a869d;
            padding: 0 30px;
            text-align: center;
          }
          .wximg {
            height: 3.2rem;
            width: 3.2rem;
            padding: 0.1rem;
            margin-top: 10px;
            img {
              width: 3rem;
              height: 3rem;
            }
          }
          .copy-btn {
            width: 3.46rem;
            height: 0.72rem;
            line-height: 0.72rem;
            text-align: center;
            color: @writeColor;
            background: #0066ed;
            border-radius: 5px;
            font-size: 12px;
            margin-top: 12px;
          }
        }
      }
      .bot {
        margin-top: 16px;
        display: flex;
        justify-content: center;
        img {
          width: 0.72rem;
          height: 0.72rem;
        }
      }
    }
  }
  .me-top {
    // height: 5.96rem;
    // background-image: linear-gradient(90deg, #368cff 0%, #0066ed 100%);
    background: url('~@/assets/img/2_7/img_me_bg@2x.png') no-repeat center
      center;
    margin-bottom: 0.2rem;
    ul {
      padding: 0.3rem 0.3rem 0;
      position: relative;
      .totalmoney {
        padding: 0.4rem 0.28rem 0.3rem;
        // background: url('~@/assets/img/beijing2x.png') no-repeat center center;
        // background-image: linear-gradient(180deg, #2f404f 0%, #212c37 100%);
        box-shadow: 0 6px 12px 0 rgba(234, 234, 234, 0.6);
        border-radius: 0.16rem;
        background-size: cover;
        background-color: @writeColor;
        position: relative;
        .lert-bg {
          position: absolute;
          right: 15px;
          top: 0;
          img {
            width: 1.36rem;
            height: 1.92rem;
          }
        }
        .keyong {
          justify-content: space-between;
          font-family: 'DIN-Medium';
          position: relative;
          padding-bottom: 0.2rem;
          .jine {
            align-items: center;
          }
          .num {
            font-size: 0.52rem;
            color: @txtColor;
          }
        }
        .balance {
          width: 50%;
        }
        div {
          .see {
            align-items: center;
            margin-bottom: 0.04rem;
            font-size: 0.24rem;
          }
          .balanceDel {
            font-size: 0.24rem;
          }
          div.pbox {
            color: @txtColor;
            span {
              font-size: 0.24rem;
              &:nth-of-type(1) {
                margin-right: 0.2rem;
              }
            }
            .iconfont {
              margin-left: 0.2rem;
              font-size: 0.34rem;
            }
          }
          .money-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-right: -0.28rem;
            .left {
              flex: 55%;
            }
            .right {
              background: #f0f5fe;
              border-radius: 100px 0 0 100px;
              display: flex;
              align-items: center;
              line-height: 0.56rem;
              text-align: center;
              height: 0.56rem;
              font-size: 12px;
              color: #0066ed;
              cursor: pointer;
              z-index: 20;
              & > img:nth-of-type(1) {
                height: 0.36rem;
                width: 0.36rem;
                margin: 0 0.1rem;
              }
              & > img:nth-of-type(2) {
                height: 0.36rem;
                width: 0.36rem;
                margin: 0 0.1rem;
              }
            }
          }
        }
      }
      .facebox {
        display: flex;
        justify-self: center;
        justify-items: center;
        justify-content: space-between;
        margin-bottom: 0.3rem;
        .face {
          justify-content: space-between;
          align-items: center;
          color: @txtColor;
          height: 44px;
          background: @writeColor;
          border-radius: 22px;
          img {
            margin-left: 0.14rem;
            width: 0.6rem;
            height: 0.6rem;
          }
          .facemsg {
            display: flex;
            flex-direction: column;
            justify-content: center;
            justify-items: left;
            padding-left: 0.1rem;
            padding-right: 0.2rem;
            font-size: 16px;
            span {
              &:nth-of-type(1) {
                color: @txtColor;
                font-size: 0.28rem;
              }
              &:nth-of-type(2) {
                margin-top: 2px;
                color: @blueColor;
                font-size: 0.2rem;
              }
            }
          }
        }
        .regsiter-tip {
          color: @writeColor;
          font-size: 14px;
          display: flex;
          align-items: center;
          .svga {
            width: 22px;
            height: 24px;
            margin-right: 5px;
          }
        }
        .switch-box {
          margin-top: 0.1rem;
          display: flex;
          align-self: flex-start;
          align-items: center;
          justify-items: center;
          justify-content: center;
          border-radius: 0.26rem;
          height: 0.52rem;
          background-color: @writeColor;

          .icon-pan {
            text-align: center;
            line-height: 0.44rem;
            color: @blueColor;
            font-size: 0.24rem;
            padding: 0.08rem;
            padding-left: 0.04rem;
          }
          .jt {
            margin: auto 0.05rem;
            width: 0.36rem;
            height: 0.36rem;
          }
          &.switch-btn2 {
            .jt {
              margin: auto 0.1rem auto 0.05rem;
            }
            .icon-pan {
              color: @txtColor;
              padding-left: 0.1rem;
            }
          }
        }
      }
    }
  }
  .kaquan {
    height: 1.55rem;
    position: relative;
    align-items: center;

    .box {
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: 12px;
      color: @txtColor;
      padding: 0.3rem 0;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
          display: flex;
          align-items: center;
          img {
            width: 14px;
            height: 14px;
            margin-right: 0.1rem;
          }
        }
        .arrow {
          width: 16px;
          height: 16px;
          background: url('~@/assets/img/2_7/r-arrow.png') no-repeat;
          background-size: cover;
        }
      }
      .money {
        font-size: 20px;
        margin-top: 0.12rem;
        font-family: 'DIN-Medium';
      }
      &:first-child {
        padding-right: 0.4rem;
        position: relative;
        &::after {
          content: ' ';
          position: absolute;
          right: 0;
          bottom: 0;
          width: 1px;
          height: 100%;
          border-right: 1px solid @lineColor;
          transform-origin: 0 0;
          transform: scaleX(0.5);
        }
      }
      &:last-child {
        padding-left: 0.4rem;
      }
    }
  }

  .login-box {
    position: static;
    margin-top: 0.3rem;
    > div {
      height: 0.8rem;
      width: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &.register {
        border-radius: 2px;
        margin-right: 0.3rem;
        font-size: 14px;
        color: #ffffff;
        background-image: linear-gradient(90deg, #368cff 0%, #0066ed 100%);
        box-shadow: 0 6px 9px 0 rgba(0, 53, 100, 0.16);
      }
      &.charge {
        border: 1px solid @blueColor;
        font-size: 14px;
        color: @blueColor;
        border-radius: 2px;
      }
      > div {
        font-size: 0.28rem;
        line-height: 0.32rem;
        color: @txtColor;
        display: flex;
        font-weight: 700;
        align-items: center;
        i {
          display: block;
          width: 0.32rem;
          height: 0.32rem;
          margin-right: 0.16rem;
          &.tixian {
            .backgroundImage('~img/2_4/icoWdCb2x.png');
            width: 0.36rem;
            height: 0.36rem;
            font-weight: 700;
          }
          &.register {
            .backgroundImage('~img/2_1img/ico_me_registered3x.png');
          }
          &.recharge {
            .backgroundImage('~img/2_4/icoWdTb2x.png');
            width: 0.36rem;
            height: 0.36rem;
          }
          &.login {
            .backgroundImage('~img/2_1img/ico_me_login3x.png');
          }
        }
      }
    }

    .registered-tips {
      position: absolute;
      left: 29.5%;
      top: 71%;
      z-index: 500;
      height: 19px;
      width: 75px;
      background: url('~@/assets/img/img_xiaobg@2x.png') no-repeat;
      background-size: cover;
      .text {
        position: relative;
        font-family: PingFangSC-Regular;
        color: #ffffff;
        font-size: 12px;
        transform: scale(0.75, 0.75);
        *font-size: 10px;
        white-space: nowrap;
      }
    }

    /*添加白光*/
    .registered-tips:before {
      display: block;
      left: -2%;
      top: -20%;
      height: 0px;
      width: 0px;
      border-radius: 15px 15px 0 0;
      -webkit-transform: rotate(35deg);
      -moz-transform: rotate(35deg);
      -o-transform: rotate(35deg);
      -ms-transform: rotate(35deg);
      transform: rotate(35deg);
      background-image: -moz-linear-gradient(
        top,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0)
      );
      background-image: -webkit-linear-gradient(
        top,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0)
      );
      background: -ms-linear-gradient(
        top,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0)
      );
      background: -o-linear-gradient(
        top,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0)
      );
      background: linear-gradient(
        top,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0)
      );
      z-index: 999; /*在最上层*/
      position: absolute;
      content: '';

      animation-name: crossed;
      -webkit-animation: crossed 0.8s ease-in-out;
      -ms-animation: crossed 0.8s ease-in-out;
      -moz-animation: crossed 0.8s ease-in-out;
      -o-animation: crossed 0.8s ease-in-out;
      animation: crossed 0.8s ease-in-out;
      animation-duration: 3s;
      animation-iteration-count: infinite;
    }

    @-webkit-keyframes crossed {
      0% {
        /* 或者写成这样:  from {} */
        width: 0px;
        height: 0px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      70% {
        /* 或者写成这样:  from {} */
        height: 8px;
        width: 5px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      75% {
        /* 或者写成这样:  from {} */
        height: 30px;
        width: 20px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      99% {
        /* 或者写成这样:  to {} */
        height: 32px;
        width: 20px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: 85%;
      }
      100% {
        /* 或者写成这样:  to {} */
        height: 0px;
        width: 0px;
        top: -25%;
        left: 100%;
      }
    }
    @-o-keyframes crossed {
      0% {
        /* 或者写成这样:  from {} */
        width: 0px;
        height: 0px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      70% {
        /* 或者写成这样:  from {} */
        height: 8px;
        width: 5px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      75% {
        /* 或者写成这样:  from {} */
        height: 30px;
        width: 20px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      99% {
        /* 或者写成这样:  to {} */
        height: 32px;
        width: 20px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: 85%;
      }
      100% {
        /* 或者写成这样:  to {} */
        height: 0px;
        width: 0px;
        top: -25%;
        left: 100%;
      }
    }
    @-moz-keyframes crossed {
      0% {
        /* 或者写成这样:  from {} */
        width: 0px;
        height: 0px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      70% {
        /* 或者写成这样:  from {} */
        height: 8px;
        width: 5px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      75% {
        /* 或者写成这样:  from {} */
        height: 30px;
        width: 20px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      99% {
        /* 或者写成这样:  to {} */
        height: 32px;
        width: 20px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: 85%;
      }
      100% {
        /* 或者写成这样:  to {} */
        height: 0px;
        width: 0px;
        top: -25%;
        left: 100%;
      }
    }
    @-ms-keyframes crossed {
      0% {
        /* 或者写成这样:  from {} */
        width: 0px;
        height: 0px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      75% {
        /* 或者写成这样:  from {} */
        height: 30px;
        width: 5px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      99% {
        /* 或者写成这样:  to {} */
        height: 32px;
        width: 20px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: 85%;
      }
      100% {
        /* 或者写成这样:  to {} */
        height: 0px;
        width: 0px;
        top: -25%;
        left: 95%;
      }
    }
    @keyframes crossed {
      0% {
        /* 或者写成这样:  from {} */
        width: 0px;
        height: 0px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      75% {
        /* 或者写成这样:  from {} */
        height: 8px;
        width: 5px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: -2%;
      }
      99% {
        /* 或者写成这样:  to {} */
        height: 30px;
        width: 20px; /* 多个属性相当于多组动画一起执行 */
        top: -25%;
        left: 85%;
      }
      100% {
        /* 或者写成这样:  to {} */
        height: 32px;
        width: 0px;
        top: -25%;
        left: 95%;
      }
    }
  }
  .share-img {
    position: fixed;

    left: 9%;
    bottom: 30%;
    z-index: 4000;
    img {
      width: 6.3rem;
      height: 7.26rem;
    }
  }
  .my-footer {
    margin: 0 0.32rem;
    padding-top: 0rem;
    box-shadow: 0 6px 12px 0 rgba(234, 234, 234, 0.6);
    .me-middle {
      ul {
        background: @writeColor;
        padding: 0 0.24rem 0 0.24rem;
        border-radius: 0.16rem;
        margin: 0.2rem 0;
        li {
          height: 1rem;
          justify-content: space-between;
          align-items: center;
          font-size: 0.28rem;

          &:last-child {
            border: none;
          }
          .arrow {
            width: 0.24rem;
            height: 0.24rem;
          }
          .tip {
            color: @blueyGrey;
            font-size: 0.28rem;
            margin-right: 0.16rem;
          }
          .had {
            color: @blueyGrey;
            font-size: 0.28rem;
            flex: 1;
            text-align: right;
            margin-right: 0.16rem;
          }
          div {
            align-items: center;
            span {
              color: @txtColor;
              margin-left: 0.2rem;
              font-size: 0.28rem;
              font-weight: 500;
            }
            img {
              width: 0.4rem;
              height: 0.4rem;
              object-fit: contain;
            }
          }
          &:nth-of-type(4),
          &:nth-of-type(7) {
            margin-top: 0.1rem !important;
          }
        }
      }
    }
  }
}
</style>
