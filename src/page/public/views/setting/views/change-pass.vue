<template>
  <model-full :title="$t('my.setting.text38')" class="fixd-wrap">
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
        v-model="userinfo.code"
        :placeholder="$t('my.setting.text20')"
      >
        <div slot="right-txt" class="code">
          <base-button
            v-if="pcsPwd.showContent"
            type="time"
            :size="'mini'"
            @clickEvent="_getPhoneCode"
            >{{ pcsPwd.content }}</base-button
          >
          <div class="daojishi" v-else>
            {{ $t("send.resetCode") }}({{ pcsPwd.countDown }}s)
          </div>
        </div>
      </base-input>
      <base-input
        v-model="userinfo.pass"
        :placeholder="$t('my.setting.text40')"
        type="password"
      >
        <img :src="icon.lock" alt="密码" />
      </base-input>
      <div class="tip">
        <span>{{ $t("my.setting.text41") }}</span>
      </div>
      <div class="l-center">
        <base-button :disabled="false" @clickEvent="change">{{
          $t("my.setting.text42")
        }}</base-button>
      </div>
    </div>
  </model-full>
</template>
<script>
import BaseInput from "@/components/element/base-input";
import BaseButton from "@/components/element/base-button";
import ModelFull from "element/model-full";
import mobie from "@/assets/img/phone-mobie.png";
import lock from "@/assets/img/phone-lock.png";
import card from "@/assets/img/phone-card.png";

import { mapGetters, mapActions, mapMutations } from "vuex";

import { pcsPwd } from "@/assets/componentsJs/phoneCodeShow";

export default {
  data() {
    return {
      pcsPwd: pcsPwd,
      img: "",
      imgTimer: "",
      icon: {
        mobie: mobie,
        lock: lock,
        card: card
      },
      userinfo: {
        phone: localStorage.phone || "",
        code: "",
        pass: "",
        imgCode: ""
      },
      time2: 60,
      start: false,
      canpush: false,
      sessionId: "",
      canbtn: true
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      imageData: "user/imageData",
      imgSessionId: "user/imgSessionId"
    })
  },
  methods: {
    ...mapActions({
      getPhoneCode: "user/codeSMSSend",
      getImgCode: "user/codeImage",
      login2: "user/login2", //重置密码
      logout: "user/logout" // 登出
    }),

    change() {
      const _this = this;
      if (!this.validPhone()) return;
      if (this.userinfo.code == "") {
        this.showToastText(this.$t("forget.text3"));
        return;
      }
      if (
        !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(this.userinfo.pass)
      ) {
        _this.showToastText(_this.$t("my.setting.text42"));
        return;
      }

      this.login2({
        username: this.userinfo.phone,
        newPassword: this.userinfo.pass,
        verifyCode: this.userinfo.code
      })
        .then(res => {
          _this.$vux.toast.show({
            text: _this.$t("my.setting.text44"),
            type: "success",
            time: "1500",
            onHide() {
              _this.logout();
              _this.$router.replace({ path: "/login" });
            }
          });
        })
        .catch(e => {
          this.showToastText(e);
        });
    },
    finish2() {
      this.start = false;
      this.canpush = false;
      this.time2 = 60;
    },
    getcode() {
      // if (!/^1[34578]\d{9}$/.test(this.userinfo.phone)) {
      //   this.$vux.toast.text(this.$t("forget.text9"), "middle");
      //   return;
      // }
      if (this.userinfo.imgCode.length != 4) {
        this.$vux.toast.text(this.$t("forget.text10"), "middle");
        this.changeImg();
        return;
      }
      const _this = this;
      if (this.canpush) return;

      _this.canpush = true;
      _this.start = true;

      this.scoketApi.sendSock(
        {
          moduleId: 1,
          cmdId: 3,
          data: {
            phone: this.userinfo.phone,
            imgCode: this.userinfo.imgCode,
            sessionId: this.sessionId,
            type: 2
          }
        },
        function(res) {
          if (res.code === "200" && res.moduleId == 1 && res.cmdId == 3) {
            _this.$vux.toast.show({
              text: this.$t("my.setting.text45"),
              type: "success"
            });
          } else if (
            res.code === "2027" &&
            res.moduleId == 1 &&
            res.cmdId == 3
          ) {
            _this.canpush = false;
            _this.start = false;
            _this.showToastText(res.message);
            _this.changeImg();
          } else if (res.code != "200" && res.moduleId == 1 && res.cmdId == 3) {
            _this.showToastText(res.message);
            _this.changeImg();
          } else {
            _this.changeImg();
          }
        }
      );
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
        this.showToastText(this.$t("forget.text10"));
        return;
      }
      let mobilePhone = this.userinfo.phone;
      let imgCode = this.userinfo.imgCode;
      let parmas = {
        mobilephone: mobilePhone,
        sessionId: this.imgSessionId, // 修改支付密码
        verifyCode: imgCode,
        areaCode: this.$refs.telInput.cptAreaCode
      };
      // console.log(this.getPhoneCode);
      this.$dialog.loading.open(this.$t("send.loading"));
      this.getPhoneCode(parmas)
        .then(res => {
          this.$dialog.loading.close();
          this.showToastText(
            this.$t("setText.text21") +
              "****" +
              parmas.mobilephone.substring(7),
            "middle"
          );
          pcsPwd.click();
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
    this.userinfo.phone = this.userInfo.mobilephone;
  },
  beforeDestroy() {
    this.clickImageCode();
    this.pcsPwd.content = this.$t("send.sendCode");
  },
  components: {
    BaseInput,
    BaseButton,
    ModelFull
  }
};
</script>

<style lang="less" scoped>
@blueyGrey: #ea523b;
.register {
  padding: 0.6rem 0.42rem;
  .l-center {
    text-align: center;
  }
  .code {
    margin-left: 0.2rem;
    .width {
      width: 2rem;
    }
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
}
</style>
