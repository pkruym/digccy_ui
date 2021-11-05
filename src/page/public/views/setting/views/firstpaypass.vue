<template>
  <ModelFull :title="$t('my.setting.text26')" class="fixd-wrap">
    <div class="firstpay-box">
      <base-input v-model="paypass" :placeholder="$t('login.text2')" type="password">
        <span class="width">{{ $t("my.setting.text26") }}</span>
      </base-input>
      <base-input v-model="paypass1" :placeholder="$t('my.setting.text50')" type="password">
        <span class="width">{{ $t("my.setting.text26") }}</span>
      </base-input>
      <p class="prompt">{{ $t("my.setting.text51") }}</p>
      <div class="query">
        <base-button :disabled="false" @clickEvent="query">{{
          $t("my.setting.text42")
        }}</base-button>
      </div>
    </div>
  </ModelFull>
</template>
<script>
import ModelFull from "element/model-full";
import BaseInput from "@/components/element/base-input";
import BaseButton from "@/components/element/base-button";
import mobie from "@/assets/img/phone-mobie.png";
import qs from "qs";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ModelFull,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      paypass: "",
      paypass1: "",
      icon: {
        mobie: mobie
      }
    };
  },
  computed: {
    ...mapGetters({
      mobilephone: "user/mobilephone"
    })
  },
  methods: {
    ...mapActions({
      fund1: "user/fund1", //第一次设置支付密码
      userquery: "user/query" //重置
    }),

    query() {
      if (!/\d{6}/.test(this.paypass)) {
        this.$vux.toast.text(this.$t("my.setting.text53"), "middle");
        return;
      }
      if (this.paypass != this.paypass1) {
        this.$vux.toast.text(this.$t("my.setting.text54"), "middle");
        return;
      }
      const _this = this;
      let params = {
        newPassword: this.paypass,
        username: this.mobilephone,
        oldPassword: ""
      };
      this.fund1(params)
        .then(res => {
          _this.$vux.toast.text(_this.$t("my.myInfo.text23"), "middle");
          _this.userquery();
          _this.$router.go(-1);
          // _this.$router.push("/ower");
        })
        .catch(err => {
          _this.$vux.toast.text(err, "middle");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.firstpay-box {
  padding: 0 0.4rem;
  padding-top: 0.1rem;
  .input-box .input-inbox__left {
    width: auto !important;
  }
  .input-inbox__main {
    font-size: 0.3rem !important;
  }
  .query {
    margin-top: 0.3rem;
  }
  .width {
    width: 1.2rem;
    display: inline-block;
    color: @blueyGrey;
  }

  .input-box {
    margin-bottom: 0.2rem;
  }
  .prompt {
    font-size: 0.24rem;
    color: @blueyGrey;
  }
}
</style>
