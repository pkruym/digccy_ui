<template>
  <model-full :title="$t('dialog.changePayPass.title')" class="fixd-wrap">
    <div class="register">
      <telInput
        v-model="userinfo.phone"
        ref="telInput"
        :src="icon.mobie"
      ></telInput>
      <base-input
        :placeholder="$t('register.text2')"
        v-model="userinfo.imgCode"
      >
        <div slot="right" class="img">
          <img
            :src="'data:image/png;base64,' + imageData"
            @click="clickImageCode"
            class="imgCode"
          />
        </div>
      </base-input>
      <base-input
        :placeholder="$t('dialog.changePayPass.placeholder3')"
        v-model="userinfo.code"
      >
        <div slot="right-txt" class="code">
          <base-button
            v-if="pcsPayPwd.showContent"
            type="time"
            :size="'mini'"
            @clickEvent="_getPhoneCode"
            >{{ pcsPayPwd.content }}</base-button
          >
          <!-- <base-button v-else type="time" :size="'mini'">{{ pcsPayPwd.countDown }}(s)</base-button> -->
          <div class="daojishi" v-else>
            {{ $t("send.resetCode") }}({{ pcsPayPwd.countDown }}s)
          </div>
        </div>
      </base-input>
      <base-input
        v-model="userinfo.oldpass"
        :placeholder="$t('dialog.changePayPass.placeholder1')"
        type="password"
      >
        <img :src="icon.lock" alt="密码" />
      </base-input>
      <base-input
        v-model="userinfo.newpass"
        :placeholder="$t('my.setting.text50')"
        type="password"
      >
        <img :src="icon.lock" alt="密码" />
      </base-input>
      <div class="tip">
        <span>{{ $t("my.setting.text51") }}</span>
      </div>
      <div class="l-center">
        <base-button :disabled="false" @clickEvent="query">{{
          $t("my.setting.text42")
        }}</base-button>
      </div>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import BaseInput from "@/components/element/base-input";
import BaseButton from "@/components/element/base-button";
import mobie from "@/assets/img/phone-mobie.png";
import lock from "@/assets/img/phone-lock.png";
import card from "@/assets/img/phone-card.png";
import { Countdown } from "vux";
import { pcsPayPwd } from "@/assets/componentsJs/phoneCodeShow";
import { mapGetters, mapActions } from "vuex";
// import { tel_input_props } from "@/assets/componentsJs/tel_input";

export default {
  data() {
    return {
      img: "",
      pcsPayPwd: pcsPayPwd,
      imgTimer: "",
      time2: 60,
      start: false,
      icon: {
        mobie: mobie,
        lock: lock,
        card: card
      },
      userinfo: {
        phone: localStorage.phone || "",
        oldpass: "",
        newpass: "",
        code: "",
        imgCode: ""
      },
      canbtn: false,
      sessionId: ""
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      imageData: "user/imageData",
      imgSessionId: "user/imgSessionId"
    }),
    inputStatus() {
      return this.userinfo.phone ? true : false;
    }
  },

  methods: {
    ...mapActions({
      getPhoneCode: "user/codeSMSSend",
      getImgCode: "user/codeImage",
      fund2: "user/fund2" //修改支付密码
    }),

    query() {
      const _this = this;
      if (!this.validPhone()) return;
      if (this.userinfo.code == "") {
        this.showToastText(this.$t("forget.text3"));
        return;
      }
      if (!/\d{6}/.test(this.userinfo.oldpass)) {
        this.showToastText(this.$t("my.setting.text53"));
        return;
      }
      if (this.userinfo.oldpass != this.userinfo.newpass) {
        this.showToastText(this.$t("my.setting.text54"));
        return;
      }

      let params = {
        username: this.userinfo.phone,
        newPassword: this.userinfo.newpass,
        verifyCode: this.userinfo.code
      };
      this.fund2(params)
        .then(res => {
          _this.showToastText(this.$t("my.setting.text55"));
          if (window.history.length > 2) {
            _this.$router.go(-1);
          } else {
            _this.$router.push({ path: "/ower" });
          }
        })
        .catch(err => {
          _this.showToastText(err);
        });
    },
    showToastText(msg, position = "middle") {
      this.$vux.toast.text(msg, position);
    },
    validPhone() {
      if (this.userinfo.phone == "") {
        this.showToastText(this.$t("forget.text1"));
        return false;
      }
      // if (!/^1[3456789]\d{9}$/.test(this.userinfo.phone)) {
      //   this.showToastText(this.$t("forget.text9"));
      //   return false;
      // }
      return true;
    },
    _getPhoneCode() {
      if (!this.validPhone()) return;
      if (this.userinfo.imgCode.length != 4) {
        this.showToastText(this.$t("register.text9"));
        return;
      }
      this.$dialog.loading.open(this.$t("send.loading"));
      let mobilePhone = this.userinfo.phone;
      let imgCode = this.userinfo.imgCode;
      let parmas = {
        mobilephone: mobilePhone,
        sessionId: this.imgSessionId, // 修改支付密码
        verifyCode: imgCode,
        areaCode: this.$refs.telInput.cptAreaCode
      };
      this.getPhoneCode(parmas)
        .then(res => {
          this.$dialog.loading.close();
          this.showToastText(
            this.$t("setText.text21") +
              "****" +
              parmas.mobilephone.substring(7),
            "middle"
          );
          pcsPayPwd.click();
          // this.startTimer();
        })
        .catch(err => {
          this.$dialog.loading.close();
          this.showToastText(err);
          this.clickImageCode();
        });
    },
    //收到手机验证码后开启倒计时结束刷新图片验证码
    startTimer() {
      this.imgTimer = setTimeout(() => {
        this.requestImgCode();
      }, 60 * 1000);
    },
    clickImageCode() {
      if (this.imgTimer) {
        clearTimeout(this.imgTimer);
      }
      this.requestImgCode();
    },
    requestImgCode() {
      this.getImgCode();
    }
  },
  mounted() {
    this.clickImageCode();
    // this.userinfo.phone = this.userInfo.mobilephone;
  },
  beforeDestroy() {
    this.clickImageCode();
    this.pcsPayPwd.content = this.$t("register.text13");
  },
  components: {
    ModelFull,
    BaseInput,
    BaseButton,
    Countdown
  }
};
</script>

<style lang="less" scoped>
@blueyGrey: #adb3c1;
.register {
  padding: 0.6rem 0.42rem;
  .l-center {
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
      color: #ea523b;
    }
  }
}
</style>
