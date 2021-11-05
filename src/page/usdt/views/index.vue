<template>
  <div class="fast-body">
    <model-full-usdt>
      <!-- <div class="header" slot="header">
      <router-link tag="div" to="/usdt/purchase" replace class="header-info"
        >USDT{{ $t("dialog.usdtBuy.title") }}</router-link
      >
      <router-link tag="div" to="/usdt/sell" replace class="header-info"
        >USDT{{ $t("dialog.usdtSell.title") }}</router-link
      >
    </div> -->
      <!-- <router-link
      tag="div"
      slot="right"
      to="/usdtList"
      replace
      class="samll-header"
      >{{ $t("dialog.usdtBuy.records") }}</router-link
    > -->
      <div class="right-box" slot="right">
        <div
          class="box-btns"
          :class="{ active: tab == 1 }"
          @click="tabClick(1)"
        >
          <!-- 快捷区 -->
          {{ $t("buy.text61") }}
        </div>
        <div
          class="box-btns"
          :class="{ active: tab == 2 }"
          @click="tabClick(2)"
        >
          <!-- 自选区 -->
          {{ $t("buy.text62") }}
        </div>
      </div>
      <!-- <router-view></router-view> -->
      <fast v-show="tab == 1"></fast> <otc v-show="tab == 2"></otc>
    </model-full-usdt>
  </div>
</template>
<script>
import modelFullUsdt from "element/model-full-usdt";
import Fast from "./fast";
import Otc from "./otc";
export default {
  data() {
    return {
      tab: 1
    };
  },
  components: {
    modelFullUsdt,
    Fast,
    Otc
  },
  methods: {
    tabClick(tab) {
      this.tab = tab;
    }
  }
};
</script>
<style lang="less" scoped>
@blueyGrey: #4a747b;
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
.samll-header {
  position: absolute;
  right: 0.3rem;
  font-size: 0.28rem;
  color: rgb(148, 159, 172);
  top: 0.28rem;
  width: 0.8rem;
  text-align: right;
  top: 0;
}
.vux-header-right {
  .right-box {
    display: flex;
    border-radius: 16px;
    height: 32px;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 110px;
    border: 1px solid #7a848e;
    border-radius: 16px;

    > div {
      font-size: 12px;
      width: 58px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 16px;
      z-index: 2;
      left: 0;
      position: absolute;

      &:last-child {
        left: 50px;
        border-left-width: 0;
      }
      &.active {
        z-index: 3;
        border: 1px solid #2acca6;
        background-color: #21303d;
        border-radius: 16px;
        color: #2acca6;
        // transition: all 0.2s;
        height: 32px;
      }
    }
  }
}
// .fast-body{
//   padding-top: constant(safe-area-inset-top);
//   padding-top: env(safe-area-inset-top);
// }
</style>
