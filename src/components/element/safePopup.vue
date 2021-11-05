<template>
  <yd-popup v-model="showvalidPhone" class="pc-popup" position="bottom">
    <div class="bank-content">
      <div class="valid-head line05">
        <span> 安全验证</span>
        <span @click="showvalidPhone = false"> {{ $t("common.cancle") }}</span>
      </div>
      <div class="mobilphone">
        {{
          getuserInfo.mobilephone
            ? getuserInfo.mobilephone.substring(0, 3) +
              "****" +
              getuserInfo.mobilephone.substring(7, 11)
            : ""
        }}
      </div>
      <div class="valid-box">
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
      </div>
      <div class="valid-box">
        <base-input
          v-model="userinfo.code"
          :placeholder="$t('dialog.bandCard.placeholder6')"
        >
          <div slot="right-txt" class="code">
            <base-button
              v-if="pcsBindCard.showContent"
              type="time"
              :size="'mini'"
              @clickEvent="getcode"
              >{{ pcsBindCard.content }}</base-button
            >
            <div class="daojishi" v-else>
              {{ $t("send.resetCode") }}({{ pcsBindCard.countDown }}s)
            </div>
          </div>
        </base-input>
      </div>
      <div class="confrim-btn">
        <div @click="sure">{{ $t("common.confrim") }}</div>
      </div>
    </div>
  </yd-popup>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { pcsBindCard } from "@/assets/componentsJs/phoneCodeShow";
import BaseInput from "@/components/element/base-input";
import BaseButton from "@/components/element/base-button";
export default {
  components: {
    BaseInput,
    BaseButton
  },
  data() {
    return {
      showvalidPhone: false,
      imgTimer: null,
      userinfo: {
        mobilePhone: "",
        smsCode: "",
        imgCode: "",
        code: ""
      },
      pcsBindCard: pcsBindCard
    };
  },
  computed: {
    ...mapGetters({
      imageData: "user/imageData",
      imgSessionId: "user/imgSessionId",
      getuserInfo: "user/userInfo"
    })
  },
  watch: {
    showvalidPhone() {
      if (this.showvalidPhone) {
        this.getImgCode();
      } else {
        pcsBindCard.clear();
        this.clickImageCode();
      }
    }
  },
  methods: {
    ...mapActions({
      getImgCode: "user/codeImage",
      getPhoneCode: "user/codeSMSSend"
    }),
    getcode() {
      if (this.userinfo.imgCode.length < 1) {
        this.$vux.toast.text(this.$t("my.setting.text17"), "middle");
        return;
      }
      let imgCode = this.userinfo.imgCode;
      let parmas = {
        mobilephone: this.getuserInfo.mobilephone,
        sessionId: this.imgSessionId, //
        verifyCode: imgCode,
        areaCode: "86"
      };
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
          pcsBindCard.click();
        })
        .catch(err => {
          this.$dialog.loading.close();
          this.showToastText(err);
          this.clickImageCode();
        });
    },
    clickImageCode() {
      if (this.imgTimer) {
        clearTimeout(this.imgTimer);
      }
      this.getImgCode();
    },
    sure() {
      if (this.userinfo.imgCode == "") {
        this.$vux.toast.text("图形验证码不能为空", "middle");
        return;
      }
      if (this.userinfo.code == "") {
        this.$vux.toast.text("短信验证码不能为空", "middle");
        return;
      }
      this.showvalidPhone = false;
      this.$emit("save", this.userinfo.code);
    },
    showToastText(msg, position = "middle") {
      this.$vux.toast.text(msg, position);
    }
  }
};
</script>
