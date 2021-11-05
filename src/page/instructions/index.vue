<template>
  <div class="instructions">
    <model-full :title="'USDT' + $t('page.text1')">
      <div class="content">
        <div class="bot30 top">
          <p>{{ $t("page.text2") }}</p>
        </div>
        <div class="bot30 info">
          <p class="title">{{ $t("page.text3") }}</p>
          <p>{{ $t("page.text4") }}</p>
        </div>
        <div class="bot30 info">
          <p class="title">{{ $t("page.text5") }}</p>
          <p>{{ $t("page.text6") }}</p>
        </div>
        <div class="bot30 info">
          <p class="title">{{ $t("page.text7") }}</p>
          <p>{{ $t("page.text8") }}</p>
        </div>
        <div class="bot30 remeber">
          <p @click="remeber">{{ $t("page.text9") }}</p>
        </div>
      </div>
      <div class="usdtbtn-box xieyi">
        <div class="btn" @click="next">{{ $t("page.text10") }}</div>
      </div>
      <div class="xieyi-box">
        <div class="radio-box" @click="checkagree">
          <div :class="isAgree ? 'agree' : 'noagree'"></div>
        </div>
        <p @click="checkagree" class="fuwu">
          {{ $t("register.text14") }}
          <router-link to="/fuwu?xieyi=2" tag="span">{{
            $t("register.text20")
          }}</router-link>
        </p>
      </div>
    </model-full>
  </div>
</template>
<script>
import ModelFull from "element/model-full";
export default {
  data() {
    return {
      isAgree: false
    };
  },
  components: {
    ModelFull
  },
  methods: {
    remeber() {
      localStorage.setItem("is_rember", 1);
      this.next();
    },
    showToastText(msg, position = "middle") {
      this.$vux.toast.text(msg, position);
    },
    checkagree() {
      this.isAgree = !this.isAgree;
    },
    next() {
      if (!this.isAgree) {
        this.showToastText(this.$t("register.text21"));
        return;
      }
      this.$router.push("/drawmoney/index");
    }
  }
};
</script>
<style lang="less">
@import "~@/assets/css/instructions.less";
</style>
