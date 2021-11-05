<template>
  <model-full>
    <div class="header" slot="header">
      <router-link
        v-if="!$route.query.isLuckyProfit"
        tag="div"
        to="/usdtList/purchase"
        replace
        class="header-info"
        >{{ $t("legalTransaction.purchaseRecord") }}</router-link
      >
      <router-link tag="div" to="/usdtList/sell" replace class="header-info">{{
        $t("legalTransaction.sellRecord")
      }}</router-link>
    </div>
    <router-view></router-view>
  </model-full>
</template>
<script>
import modelFull from "element/model-full";

export default {
  components: {
    modelFull
  }
};
</script>
<style lang="less" scoped>
@blueyGrey: #4a747b;
@blueColor: #0066ed;
.header {
  display: flex;
  .header-info {
    flex: 1;
    font-size: 0.32rem;
    color: @blueyGrey;
    position: relative;
    &.router-link-active {
      color: @blueColor;
      &::after {
        position: absolute;
        content: "";
        width: 0.5rem;
        height: 3px;
        background: @blueColor;
        bottom: 0;
        left: 50%;
        margin-left: -0.26rem;
      }
    }
  }
}
</style>
