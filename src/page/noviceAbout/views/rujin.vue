<template>
  <modelFull :title="$t('my.setting.text72')" class="fixd-wrap">
    <div v-if="$lang == 'en'" class="runjin">
      <img src="@/assets/img/2_4/encaozuo01.png" alt />
      <img src="@/assets/img/2_4/encaozuo02.png" alt />
      <img src="@/assets/img/2_4/encaozuo03.png" alt />
      <img src="@/assets/img/2_4/encaozuo04.png" alt />
      <img src="@/assets/img/2_4/encaozuo05.png" alt />
      <img src="@/assets/img/2_4/encaozuo06.png" alt />
      <img src="@/assets/img/2_4/encaozuo07.png" alt />
    </div>
    <div v-else class="runjin">
      <img src="@/assets/img/2_4/caozuo01.png" alt />
      <img src="@/assets/img/2_4/caozuo02.png" alt />
      <img src="@/assets/img/2_4/caozuo03.png" alt />
      <img src="@/assets/img/2_4/caozuo04.png" alt />
      <img src="@/assets/img/2_4/caozuo05.png" alt />
      <img src="@/assets/img/2_4/caozuo06.png" alt />
      <img src="@/assets/img/2_4/caozuo07.png" alt />
    </div>
    <div class="usdtbtn-box">
      <div class="btn" @click="openWin">{{ $t("page.text66") }}</div>
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
      getListByMarketType: "contractInfo/getListByMarketType"
    })
  },
  created() {},
  methods: {
    openWin() {
      let first = this.getListByMarketType(this.$tradeType.tradeType)[0];
      this.$router.push({
        path: `/stock/stock-line?symbol=${first.symbol}`
      });
    }
  }
};
</script>
<style lang="less" scoped>
.usdtbtn-box {
  background-color: @bodyBg;
}
.runjin {
  width: 100%;
}
img {
  width: 100%;
  display: block;
  margin-top: -1px;
  overflow: hidden;
}
</style>
