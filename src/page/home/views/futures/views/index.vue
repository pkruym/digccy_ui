<template>
  <div class="futures" ref="close">
    <div class="futures-top">
      <div class="fixed-head line05">
        <div
          class="btn"
          :class="{ active: currentIndex === 0 }"
          @click="changeOrder(0)"
        >
          {{ $t("leverageTrading.lever") }}
        </div>
        <div
          class="btn"
          :class="{ active: currentIndex === 1 }"
          @click="changeOrder(1)"
        >
          {{ $t("leverageTrading.contract") }}
        </div>
      </div>
      <close-position
        :profit="totalprofit"
        class="close"
        :tradeType="$tradeType.tradeType"
      ></close-position>

      <div class="header">
        <router-link
          tag="div"
          :to="'/position?type=' + $tradeType.tradeType"
          replace
          class="header-info"
        >
          <span> {{ $t("futures.text10") }} </span>
        </router-link>
        <router-link
          tag="div"
          :to="'/entrust?type=' + $tradeType.tradeType"
          replace
          class="header-info"
        >
          <span>{{ $t("futures.text11") }}</span>
        </router-link>
        <router-link
          tag="div"
          :to="'/cancel?type=' + $tradeType.tradeType"
          replace
          class="header-info"
        >
          <span>{{ $t("futures.text12") }}</span>
        </router-link>
        <router-link
          tag="div"
          :to="'/settlement?type=' + $tradeType.tradeType"
          replace
          class="header-info"
        >
          <span>{{ $t("futures.text13") }}</span>
        </router-link>
        <router-link
          tag="div"
          :to="'/history?type=' + $tradeType.tradeType"
          replace
          class="header-info"
        >
          <img class="icon" src="@/assets/img/2_3/ico_hyxq_down@2x.png" alt />
        </router-link>
      </div>
      <div class="line6"></div>
    </div>
    <router-view class="view"></router-view>
  </div>
</template>
<script>
import ModelFull from "element/model-full";
import ClosePosition from "../components/close-position";
import { mapState, mapActions, mapMutations } from "vuex";
import { Storage } from "@/assets/js/localstorage";

// import { close } from "@/assets/js/probuf";
import busVue from "@/assets/js/bus";

export default {
  components: {
    ModelFull,
    ClosePosition
  },
  data() {
    return {
      jiaoyiyuanFlag: 4,
      oHeight: 0,
      currentIndex: this.$tradeType.tradeType == "LEVER" ? 0 : 1
    };
  },
  computed: {
    ...mapState(["totalprofit"])
  },

  created() {
    this.jiaoyiyuanFlag = localStorage.getItem("traderState");
    this.reload();
  },
  mounted() {
    this.$nextTick(res => {
      document.getElementsByClassName(
        "main-content"
      )[0].style.overflow = document.getElementsByClassName(
        "home-layout"
      )[0].style.overflow = "hidden";
    });
    this.jiaoyiyuanFlag = localStorage.getItem("traderState");
    const changeTradingForm = ({ id, direct, remainVolume, symbol }, pal) => {
      if (remainVolume == undefined && direct !== undefined) {
        // 点击委托订单
        direct = undefined;
      }
      this.changeContract({
        pal: pal,
        id: id,
        symbol: symbol
      });

      if (direct) {
        // 选择持仓订单
        this.quantity = remainVolume <= 0 ? 1 : remainVolume;
        // this.targetProfit = perUnitLimitProfitAmount;
        // this.stopLoss = perUnitLimitLossAmount;
        this.targetProfit = 0;
        this.stopLoss = 0;
        this.nowPrice = this.lastPrice;
      } else {
        // 选择行情
        this.quantity = 1;
        this.targetProfit = 0;
        this.stopLoss = 0;
        this.nowPrice = this.lastPrice;
      }
    };

    const makeCb = pal => {
      return obj => {
        return changeTradingForm(obj, pal);
      };
    };

    busVue.$on("selectContract", makeCb("contract"));
    // busVue.$on("selectPosition", makeCb("position"));
    // busVue.$on("selectOrder", makeCb("order"));
  },
  methods: {
    ...mapMutations({
      changetradeType: "changetradeType",
      changeContract: "trading/changeContract",
      setTabIndex: "contractInfo/setTabIndex"
    }),
    changeOrder(index) {
      this.currentIndex = index;
      this.$tradeType.tradeType = index === 0 ? "LEVER" : "FUTURE";
      this.setTabIndex(this.$tradeType.tradeType == "LEVER" ? 1 : 2);

      this.reload();
    },
    reload() {
      let path = this.$route.path + "?type=" + this.$tradeType.tradeType;
      this.changetradeType({ tradeType: this.$tradeType.tradeType }); // 修改状态
      Storage.setString("tradeType", this.$tradeType.tradeType);
      this.$router.replace(path);
    }
  },
  beforeDestroy() {
    this.$nextTick(res => {
      let dom = document.getElementsByClassName("main-content");
      if (dom) {
        dom[0].style.overflow = document.getElementsByClassName(
          "home-layout"
        )[0].style.overflow = "";
      }
    });
  }
};
</script>
<style lang="less" scoped>
.view {
  overflow: auto;
  // position: fixed;
  // top: 250px;
  // bottom: 72px;
  // left: 0;
  // right: 0;
}
.futures {
  background: @bodyBg;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 3.9rem;

  .rule {
    font-size: 0.32rem;
    color: @darkSkyBlue;
    text-align: right;
    padding: 0.22rem 0.3rem;
  }
  .futures-top {
    z-index: 2;
    background: @bodyBg;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    top: constant(safe-area-inset-top);
    top: env(safe-area-inset-top);
    /deep/.router {
      .full-header.vux-header {
        background: @headBgColor;
        position: relative;
      }
      .vux-header-title {
        padding: 0 0.54rem;
        width: 100%;
        margin: 0;
      }
    }
    .fixed-head {
      display: flex;
      justify-content: center;
      align-items: center;
      // min-height: 40px;
      height: 0.88rem;
      background: @bodyBg;
      position: relative;
      .btn {
        min-width: 1.4rem;
        width: auto;
        height: 0.56rem;
        line-height: 0.56rem;
        text-align: center;
        border: 1px solid @blueColor;
        color: @blueColor;
        font-size: 0.28rem;
        padding: 0 0.1rem;
        &.active {
          color: @writeColor;
          border-color: @blueColor;
          background: @blueColor;
        }
      }
    }
    .header {
      display: flex;
      height: 0.68rem;
      justify-content: center;
      align-items: center;
      .header-info {
        flex: 1;
        height: 0.68rem;
        font-size: 0.28rem;
        color: @txtColor;
        position: relative;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        &:last-child {
          //  margin-left: auto
          flex: 0.5;
          img {
            width: 0.32rem;
            height: 0.3rem;
          }
        }
        &.router-link-active {
          color: @blueColor;
          &::after {
            position: absolute;
            content: "";
            height: 2px;
            background: @blueColor;
            bottom: 0;
            left: 0;
            width: 100%;
            // transform: translateX(-50%);
          }
        }
      }
    }
  }
}
</style>
