<template>
  <div class="content order-success" v-if="pushData">
    <h1>{{ $t("buy.text44") }}</h1>
    <div class="cell-box line05">
      <span>
        {{
          $tradeType.tradeType == "LEVER"
            ? $t("leverageTrading.symbol")
            : $t("buy.text1")
        }}</span
      >
      <div class="value medium">
        {{ pushData.symbol ? pushData.symbol : "--" }}
        <span class="green" v-if="pushData.leverage"
          >·{{ pushData.leverage + "X" }}</span
        >
      </div>
    </div>
    <div class="cell-box line05">
      <span>{{ $t("buy.text43") }}</span>
      <div class="value">
        <span :class="buyType == 1 ? 'green' : 'red'">{{
          buyType == 1 ? $t("index.text41") : $t("index.text40")
        }}</span>
      </div>
    </div>
    <div class="cell-box line05" v-if="pushData.symbol">
      <span>{{ $t("leverageTrading.number") }}</span>
      <div class="value medium">
        {{ pushData.volume
        }}{{
          $tradeType.tradeType == "LEVER"
            ? pushData.symbol
              ? pushData.symbol.split("/")[0]
              : ""
            : $t("leverageTrading.bow")
        }}
      </div>
    </div>
    <div class="cell-box line05">
      <span>
        {{
          pushData.orderPriceType == "MARKET"
            ? $t("futures.entrust.text9")
            : $t("futures.entrust.text10")
        }}</span
      >
      <div class="value">
        {{
          pushData.orderPriceType != "MARKET"
            ? pushData.price
            : $t("leverageTrading.marketPriceSheet")
        }}
      </div>
    </div>
    <div class="cell-box line05">
      <span>{{ $t("leverageTrading.state") }}</span>
      <div class="value">
        {{
          pushData.status != "FINISHED"
            ? $t("futures.entrust.text4")
            : $t("buy.text79")
        }}
      </div>
    </div>
    <div class="popup-btn">
      <div class="btn" @click="$emit('cancle')">{{ $t("buy.text78") }}</div>
      <div class="btn active" @click="$emit('confrim')">
        {{ $t("buy.text49") }}
      </div>
    </div>
  </div>
  <!-- <div class="success-box" v-if="pushData">
    <div class="content order">
      <div class="title">{{ $t("buy.text44") }}</div>
      <div class="success-text">
        <p>
          {{ pushData.symbol }}
          <span :class="[buyType == 1 ? 'green' : 'red']"
            >{{ $t("leverageTrading.direction") }}：{{
              buyType == 1 ? $t("index.text41") : $t("index.text40")
            }}</span
          >
          <span class="din-medium" v-if="pushData.symbol"
            >{{ $t("leverageTrading.number") }}：{{ pushData.volume
            }}{{
              $tradeType.tradeType == "LEVER"
                ? pushData.symbol
                  ? pushData.symbol.split("/")[0]
                  : ""
                : $t("leverageTrading.bow")
            }}</span
          >
        </p>
        <div v-if="pushData.status != 'FINISHED'" class="flex real">
          {{ $t("futures.entrust.text4") }}
        </div>

        <p v-else>
          {{
            pushData.orderPriceType == "MARKET"
              ? $t("futures.entrust.text9")
              : $t("futures.entrust.text10")
          }}{{ pushData.orderPriceType != "MARKET" ? pushData.price : "" }}
        </p>
      </div>
      <div class="popup-btn">
        <div class="btn" @click="$emit('cancle')">继续下单</div>
        <div class="btn active" @click="$emit('confrim')">
          {{ $t("buy.text49") }}
        </div>
      </div>
    </div>
  </div> -->
</template>
<script>
import btn from "element/base-confrim-button";
import { mapState, mapGetters } from "vuex";
import busVue from "@js/bus";

export default {
  components: {
    btn
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    buyType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      name: "",
      averagePrice: 0,
      pushData: null
    };
  },
  computed: {
    ...mapState(["orderState", "orderPrice"]),
    ...mapGetters({
      // getBuyDetail: "actual/stoplossorprofit/getBuyDetail",
      tradingContent: "dialog/getTradingContent",
      contractInfo: "contractInfo/contractInfo",
      orderList: "actual/order/orderList",
      positionList: "actual/position/positionList",
      remainVolume: "trading/remainVolume",
      tradeVolume: "trading/tradeVolume"
    }),

    quantity() {
      let obj = this.data;
      return obj;
      // return obj.quantity + '手';
    },

    title() {
      if (this.buyType == 1) {
        return `${this.contractInfo.name}买涨:`;
      }
      if (this.buyType == 2) {
        return `${this.contractInfo.name}买跌:`;
      }
    }
  },

  mounted() {
    // console.log("????????????????????????", this.data);
  },
  created() {
    this.pushData = this.data;
    const _this = this;
    busVue.$on("orderPushData", res => {
      if (_this.pushData.id && res && _this.pushData.id == res.id) {
        _this.pushData = Object.assign(_this.pushData, res);
        console.log(
          "orderPushDataorderPushDataorderPushDataorderPushData",
          _this.pushData
        );
      }
    });
  },
  beforeDestroy() {
    busVue.$off("orderPushData");
  },
  watch: {
    data: {
      handler(to) {
        this.pushData = to;
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.success-box {
  // padding: 0.2rem 0.5rem 0.4rem 0.5rem;
  .title {
    font-size: 0.32rem;
    text-align: center;
    color: @txtColor;
    // padding-bottom: 0.08rem;
    // border-bottom: 1px solid @silver;
  }
  .content {
    padding: 0.4rem 0.4rem 0;
  }

  .tips {
    font-size: 0.2rem;
    color: @battleshipGrey;
  }
  .success-text {
    margin-top: 0.2rem;

    p {
      color: @battleshipGrey;
      font-size: 0.28rem;
      // padding-left: 0.8rem;
      text-align: center;

      &:nth-of-type(2) {
        margin-top: 0.3rem;
        margin-bottom: 0.12rem;
      }
    }
    .real {
      margin-top: 0.08rem;
      justify-content: center;
      align-items: center;
      font-size: 0.28rem;
      color: @battleshipGrey;
    }
  }
}
</style>
