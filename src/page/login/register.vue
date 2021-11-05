<template>
  <model-full
    :showBack="showBack"
    :preventGoBack="second"
    @prev="prev"
    :isLine="false"
    class="full fixd-wrap"
  >
    <model-title :title="title" :desc="desc"></model-title>
    <div class="register">
      <div class="first">
        <telInput
          v-model="userInfo.phone"
          ref="telInput"
          :src="icon.mobie"
        ></telInput>
        <base-input
          :placeholder="$t('register.text2')"
          v-model="userInfo.imgCode"
        >
          <div slot="right" class="img">
            <img
              :src="'data:image/png;base64,' + imageData"
              @click="clickImageCode"
              class="imgCode"
            />
          </div>
        </base-input>
        <base-input :placeholder="$t('register.text3')" v-model="userInfo.code">
          <div slot="right-txt" class="code">
            <base-button
              v-if="pcsRegister.showContent"
              type="time"
              :size="'mini'"
              @clickEvent="sendPhoneCode"
              >{{ pcsRegister.content }}</base-button
            >
            <div class="daojishi" v-else>
              {{ $t("send.resetCode") }}({{ pcsRegister.countDown }}s)
            </div>
          </div>
        </base-input>
      </div>
      <div class="second">
        <base-input
          :placeholder="$t('register.text4')"
          v-model="userInfo.pass"
          type="password"
        >
        </base-input>
        <base-input
          :placeholder="$t('register.text5')"
          :disabled="dis"
          v-model="userInfo.Invitation"
        ></base-input>
        <div class="l-center">
          <base-radiu-button @clickEvent="registerIn">{{
            $t("register.text18")
          }}</base-radiu-button>
        </div>
      </div>
      <div class="login-xieyi-box">
        <div @click="checkagree" :class="isAgree ? 'agree' : 'noagree'"></div>
        <p @click="checkagree" class="fuwu">
          {{ $t("register.text14") }}
          <router-link to="/fuwu?xieyi=1" tag="span">{{
            $t("register.text15")
          }}</router-link>
        </p>
      </div>
      <div class="activity-bg">
        <img src="@/assets/img/2_7/img_login_hd@2x.png" alt />
      </div>
      <p class="gologin">
        {{ $t("register.text16") }}
        <router-link to="/login">{{ $t("register.text17") }}</router-link>
      </p>
    </div>
  </model-full>
</template>
<script>
import BaseInput from "@/components/element/base-input";
import BaseButton from "@/components/element/base-button";
import BaseRadiuButton from "@/components/element/base-radiu-button";

import ModelFull from "element/model-full";
import ModelTitle from "@/components/element/model-title";
import mobie from "@/assets/img/phone-mobie.png";
import { mapGetters, mapActions } from "vuex";
import { pcsRegister } from "@/assets/componentsJs/phoneCodeShow";
export default {
  data() {
    return {
      pcsRegister: pcsRegister,
      imgTimer: "",
      img: "",
      showBack: true,
      icon: {
        mobie: mobie
      },
      isAgree: false,
      dis: sessionStorage.getItem("orgCode") ? true : false,
      userInfo: {
        phone: "",
        code: "",
        pass: "",
        Invitation: sessionStorage.getItem("orgCode")
          ? sessionStorage.getItem("orgCode")
          : "",
        imgCode: ""
      },
      sessionId: "",
      second: false,
      title: this.$t("register.title"),
      desc: "",
      registerDisabled: false
    };
  },
  computed: {
    ...mapGetters({
      imageData: "user/imageData",
      imgSessionId: "user/imgSessionId"
    })
  },
  methods: {
    ...mapActions({
      getImgCode: "user/codeImage",
      getPhoneCode: "user/codeSMSSend",
      doRegister: "user/register",
      login: "user/login"
    }),

    prev() {
      this.second = false;
      this.title = this.$t("register.title");
      this.desc = this.$t("register.text7");
    },
    checkagree() {
      this.isAgree = !this.isAgree;
    },
    // 请求手机验证码
    sendPhoneCode() {
      if (!this.validPhone()) return;
      if (this.userInfo.imgCode.length != 4) {
        this.$vux.toast.text(this.$t("register.text9"), "middle");
        return;
      }
      this.$dialog.loading.open(this.$t("send.loading"));
      this.getPhoneCode({
        mobilephone: this.userInfo.phone,
        sessionId: this.imgSessionId, //
        // sessionId: 2,
        verifyCode: this.userInfo.imgCode,
        areaCode: this.$refs.telInput.cptAreaCode,
        sendCode: "REGISTER"
      })
        .then(res => {
          console.log(res);
          this.$dialog.loading.close();
          this.showToastText(
            this.$t("setText.text21") +
              "****" +
              this.userInfo.phone.substring(7),
            "middle"
          );
          pcsRegister.click();
          // this.startTimer();
        })
        .catch(error => {
          this.$dialog.loading.close();
          this.showToastText(error);
          this.clickImageCode();
        });
    },
    //收到手机验证码后开启倒计时结束刷新图片验证码
    startTimer() {
      this.imgTimer = setTimeout(() => {
        this.requestImgCode();
      }, 60 * 1000);
    },
    showToastText(msg, position = "middle") {
      this.$vux.toast.text(msg, position);
    },
    validPhone() {
      if (this.userInfo.phone == "") {
        this.showToastText(this.$t("forget.text1"));
        return false;
      }

      // if (!/^1[3456789]\d{9}$/.test(this.userInfo.phone)) {
      //   this.showToastText(this.$t("forget.text9"));
      //   return false;
      // }
      if (!/[\d.]/.test(this.userInfo.phone)) {
        this.showToastText(this.$t("forget.text9"));
        return false;
      }
      return true;
    },
    // 注册并登录
    registerIn() {
      if (!this.validPhone()) return;
      if (
        !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(this.userInfo.pass)
      ) {
        this.showToastText(this.$t("register.text11"));
        return;
      }
      const _this = this;

      this.registerDisabled = true;
      let params = {
        //参数不能包括图片验证码
        mobilephone: this.userInfo.phone,
        password: this.userInfo.pass,
        verifyCode: this.userInfo.code,
        userId: sessionStorage.getItem("userId"),
        brokerCode: this.userInfo.Invitation
          ? this.userInfo.Invitation
          : sessionStorage.getItem("orgCode")
      };
      if (!this.isAgree) {
        this.showToastText(this.$t("register.text19"));
        return false;
      }
      //注册请求
      this.doRegister(params)
        .then(res => {
          _this.$vux.toast.show({
            text: this.$t("register.text12"),
            time: "1500",
            onShow() {
              // console.log("Plugin: I'm showing");
            },
            onHide() {
              // 自动登录
              _this
                .login({
                  username: params.mobilephone,
                  password: params.password
                })
                .then(_ => {
                  _this.$router.push({
                    path: "/ower"
                  });
                });
            }
          });
        })
        .catch(e => {
          this.showToastText(e);
        })
        .finally(() => {
          this.registerDisabled = false;
        });
    },
    clearImgTimer() {
      if (this.imgTimer) {
        clearTimeout(this.imgTimer);
      }
    },
    clickImageCode() {
      this.clearImgTimer();
      this.requestImgCode();
    },
    requestImgCode() {
      this.getImgCode();
    }
  },
  mounted() {
    if (this.$route.query.userId) {
      sessionStorage.userId = this.$route.query.userId;
    }
    this.requestImgCode();
  },
  beforeDestroy() {
    this.clearImgTimer();
    this.pcsRegister.content = this.$t("register.text13");
  },
  components: {
    BaseInput,
    BaseButton,
    ModelFull,
    ModelTitle,
    BaseRadiuButton
  }
};
</script>
<style lang="less" scoped>
@blueyGrey: #adb3c1;
@paleGreyThree: #3e4757;

.full {
  position: relative;
  height: 100%;
}
.register {
  background: @bodyBg;
  padding: 0.2rem 0.4rem 0 0.4rem;
  .tel {
    display: flex;
    .quhao {
      line-height: 0.8rem;
    }
  }
  .l-center {
    margin: 0 auto;
    text-align: center;
  }
  .code {
    margin-left: 0.2rem;
  }
  .tip {
    position: relative;
    top: -0.25rem;
    text-align: right;
    span {
      font-size: 0.24rem;
      color: @blueyGrey;
    }
  }

  .activity-bg {
    display: flex;
    justify-content: center;
    img {
      margin: 0.4rem 0 0.52rem 0;
      width: 4.46rem;
      height: 3.12rem;
    }
  }
  .login-xieyi-box {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    @blueColor: #0066ed;
    .fuwu {
      color: @blueyGrey;
      font-size: 0.24rem;
      text-align: center;
      span {
        color: @blueColor;
        text-decoration: underline;
        font-size: 0.24rem;
        display: inline-block;
      }
    }
    .agree {
      margin-right: 0.1rem;
      height: 14px;
      width: 14px;
      background: url("~@/assets/img/2_8/icon_selected_circle@2x.png") no-repeat;
      background-size: cover;
    }
    .noagree {
      margin-right: 0.1rem;
      height: 14px;
      width: 14px;
      background: url("~@/assets/img/2_8/icon_nor_circle@2x.png") no-repeat;
      background-size: cover;
    }
  }
  .gologin {
    font-size: 0.28rem;
    color: @blueyGrey;
    text-align: center;
    margin-top: 0rem;
    margin-bottom: 0.5rem;

    a {
      color: @darkSkyBlue;
    }
  }
}
</style>
