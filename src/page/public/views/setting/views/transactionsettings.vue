<template>
  <model-full :title="$t('my.text27')" class="set fixd-wrap">
    <div class="line10"></div>
    <div class="jiaoyi-box">
      <div class="jiaoty-left">
        <p>{{ $t("common.text32") }}</p>
        <p>{{ $t("common.text33") }}</p>
      </div>
      <div class="jiaoty-right">
        <inline-x-switch
          v-model="userInfo.overnight"
          @on-change="changeovernight"
        ></inline-x-switch>
      </div>
    </div>
  </model-full>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { InlineXSwitch } from "vux";

export default {
  components: {
    InlineXSwitch
  },
  data() {
    return {
      overnight: true,
      login: localStorage.token
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      isLogin: "user/isLogin",
      fundPasswdBlank: "user/fundPasswdBlank"
    }),
    getovernight() {
      return this.userInfo.overnight;
    }
  },

  methods: {
    ...mapActions({
      logout: "user/logout",
      setovernight: "user/setovernight"
    }),
    changeovernight(model) {
      let params = {
        overnight: model
      };
      this.setovernight(params);
    }
  },
  mounted() {
    if (this.isLogin) {
      console.log(this.userInfo);
    }
  }
};
</script>

<style lang="less" scoped>
.set {
  height: 100%;
  background: @whiteBg;
  position: relative;

  .jiaoyi-box {
    background: @bodyBg;
    height: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .jiaoty-left {
      display: flex;
      flex-direction: column;
      align-items: left;
      justify-content: left;
      margin-left: 20px;

      & > p:nth-of-type(1) {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #14181f;
        font-weight: 900;
        margin-bottom: 0.1rem;
      }
      & > p:nth-of-type(2) {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ff8f1f;
        text-align: right;
      }
    }
    .jiaoty-right {
      margin-right: 20px;
    }
  }
}
</style>
