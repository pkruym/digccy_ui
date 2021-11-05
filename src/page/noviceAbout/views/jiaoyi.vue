<template>
  <modelFull :title="$t('my.setting.text71')" class="fixd-wrap">
    <div v-if="$lang == 'en'">
      <img src="@/assets/img/2_4/enjiaoyi01.png" alt />
      <img src="@/assets/img/2_4/enjiaoyi02.png" alt />
      <img src="@/assets/img/2_4/enjiaoyi03.png" alt />
      <img src="@/assets/img/2_4/enjiaoyi04.png" alt />
      <img src="@/assets/img/2_4/enjiaoyi05.png" alt />
      <img src="@/assets/img/2_4/enjiaoyi06.png" alt />
      <img src="@/assets/img/2_4/enjiaoyi07.png" alt />
      <img src="@/assets/img/2_4/enjiaoyi08.png" alt />
      <div class="usdtbtn-box">
        <div class="btn" @click="openWin">Deposit now</div>
      </div>
      <!-- <div class="fiexd" @click="openWin">Deposit now</div> -->
    </div>
    <div v-else>
      <img src="@/assets/img/2_4/jiaoyi01.png" alt />
      <img src="@/assets/img/2_4/jiaoyi02.png" alt />
      <img src="@/assets/img/2_4/jiaoyi03.png" alt />
      <img src="@/assets/img/2_4/jiaoyi04.png" alt />
      <img src="@/assets/img/2_4/jiaoyi05.png" alt />
      <img src="@/assets/img/2_4/jiaoyi06.png" alt />
      <img src="@/assets/img/2_4/jiaoyi07.png" alt />
      <img src="@/assets/img/2_4/jiaoyi08.png" alt />
      <div class="usdtbtn-box">
        <div class="btn" @click="openWin">{{ $t("page.text64") }}</div>
      </div>
      <!-- <div class="fiexd" @click="openWin">马上充值</div> -->
    </div>
  </modelFull>
</template>
<script>
import modelFull from "element/model-full";
import { mapGetters } from "vuex";

export default {
  components: {
    modelFull
  },
  computed: {
    ...mapGetters({
      isLogin: "user/isLogin"
    })
  },
  methods: {
    openWin() {
      if (this.isLogin) {
        this.$router.push("/ower");
      } else {
        this.$router.push("/register");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.usdtbtn-box {
  background-color: @bodyBg;
}
img {
  width: 100%;
}
.fiexd {
  position: fixed;
  width: 100%;
  text-align: center;
  height: 46px;
  line-height: 46px;
  background: #a95a01;
  color: #fff;
  z-index: 9999;
  bottom: 0;
}
</style>
