<template>
  <modelFull :title="$t('my.setting.text70')" class="fixd-wrap">
    <div v-if="$lang == 'en'">
      <img src="@/assets/img/2_4/enfast01.png" />
      <img src="@/assets/img/2_4/enfast02.png" />
      <img src="@/assets/img/2_4/enfast03.png" />
      <img src="@/assets/img/2_4/enfast04.png" />
    </div>
    <div v-else>
      <img src="@/assets/img/2_4/fast01.png" />
      <img src="@/assets/img/2_4/fast02.png" />
      <img src="@/assets/img/2_4/fast03.png" />
      <img src="@/assets/img/2_4/fast04.png" />
    </div>
    <div class="usdtbtn-box">
      <div class="btn" @click="openWin">{{ $t("page.text65") }}</div>
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
  created() {
    document.title = "快速开户";
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
  margin-top: -1px;
}
</style>
