<template>
  <model-full title="活动规则" class="fixd-wrap">
    <div class="activity-banner">
      <img src="@img/2_8/img_1_2x.png" alt />
      <img src="@img/2_8/img_2_2x.png" alt />
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import busVue from "@/assets/js/bus";
import { mapGetters } from "vuex";

export default {
  components: {
    ModelFull
  },
  computed: {
    ...mapGetters({
      isLogin: "user/isLogin",
      queryContractInfo: "contractInfo/queryContractInfo"
    })
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    bgo(item) {
      let _this = this;
      _this.symbol = item.symbol;
      if (!_this.symbol.includes("USDT")) {
        _this.symbol = this.queryContractInfo({ symbol: _this.symbol }).symbol;
      }
      if (!_this.symbol) return;
      busVue.$emit("selectContract", {
        symbol: _this.symbol
      });
      this.$router.push({
        name: "stock-line",
        query: { symbol: _this.symbol }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .flex-full__body {
  background-color: #b6362f;
}

.activity-banner {
  width: 100%;
  margin: 0.1rem 0 0.3rem 0;
  img {
    width: 7.5rem;
  }
}
</style>
