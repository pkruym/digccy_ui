<template>
  <div class="list">
    <!-- <div class="list-time">设置时间
      <span>{{data.settingDate||'--/--/-- --:--:--'}}</span>
    </div>-->
    <div class="list-container">
      <div class="list-info1">
        <div class="list-hands">
          {{
            $tradeType.tradeType !== "FUTURE"
              ? cptData.symbol.split("/")[0]
              : $lang == "en"
              ? cptData.nameEnglish
              : cptData.name
          }}
        </div>
        <div class="list-text">
          <span :class="cptData.direct == 'BUY' ? 'red' : 'green'">
            {{
              cptData.direct == "BUY" ? $t("index.text41") : $t("index.text40")
            }}
            {{ cptData.volume
            }}{{
              $tradeType.tradeType == "LEVER"
                ? cptData.symbol.split("/")[0]
                : $t("leverageTrading.bow")
            }}</span
          >
        </div>
      </div>
      <div class="list-info">
        <!-- 最新价 -->
        <div class="list-hands">{{ $t("futures.position.text3") }}</div>
        <div class="list-number">{{ lastPrice || "0" }}</div>
        <div class="list-set"></div>
      </div>
      <div class="list-info" v-if="$route.query.pal == 'position'">
        <!-- 止损价 -->
        <div class="list-hands">{{ $t("futures.position.text7") }}</div>
        <div class="list-number">{{ data.stopLossPrice || "0" }}</div>
        <div class="list-set" @click="$emit('loss', zIndex)">
          {{ $t("common.setting") }}
        </div>
      </div>
      <div class="list-info" v-if="$route.query.pal == 'position'">
        <!-- 止盈价 -->
        <div class="list-hands">{{ $t("futures.position.text8") }}</div>
        <div class="list-number">{{ data.stopProfitPrice || "0" }}</div>
        <div class="list-set" @click="$emit('profit', zIndex)">
          {{ $t("common.setting") }}
        </div>
      </div>
      <div class="list-info" v-if="$route.query.pal == 'order'">
        <!-- 止损价 -->
        <div class="list-hands">{{ $t("futures.position.text7") }}</div>
        <div class="list-number">{{ data.stopLossAmount || "0" }}</div>
        <div class="list-set" @click="$emit('loss', zIndex)">
          {{ $t("common.setting") }}
        </div>
      </div>
      <div class="list-info" v-if="$route.query.pal == 'order'">
        <!-- 止盈价 -->
        <div class="list-hands">{{ $t("futures.position.text8") }}</div>
        <div class="list-number">{{ data.stopProfitAmount || "0" }}</div>
        <div class="list-set" @click="$emit('profit', zIndex)">
          {{ $t("common.setting") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    zIndex: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapGetters({
      positionList: "actual/position/positionList",
      orderList: "actual/order/orderList",
      lastPrice: "trading/lastPrice"
    }),
    cptData() {
      console.log(11111);
      let obj = {
        contractName: "",
        direct: "",
        volume: 0,
        symbol: "",
        stopLossAmount: 0,
        stopProfitAmount: 0,
        stopLossPrice: 0,
        stopProfitPrice: 0
      };
      let arr = [];
      let { i, pal } = this.$route.query;
      i = parseInt(i);
      if (pal == "order") {
        arr = this.orderList;
      } else if (pal == "position") {
        arr = this.positionList;
      }
      if (arr.length > 0) {
        obj = arr[i];
      }
      obj = arr[i];
      this.data.stopLossPrice = obj.stopLossPrice;
      this.data.stopProfitPrice = obj.stopProfitPrice;

      console.log("aaaa", obj);
      return obj;
    }
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
.list {
  margin-top: 0.1rem;
  background: @bodyBg;
  padding: 0.2rem 0.32rem 0.2rem 0.32rem;

  .list-time {
    font-size: 0.24rem;
    color: @darkBlueGrey;
    border-bottom: 1px dashed @lineColor;
    padding-bottom: 0.12rem;
    span {
      display: inline-block;
      margin-left: 0.4rem;
      font-size: 0.24rem;
    }
  }
  .list-info1 {
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    color: @battleshipGrey;
    border-bottom: 1px dotted @lineColor;
    justify-content: space-between;
    padding-top: 0.2rem;
    padding-bottom: 0.22rem;

    .list-hands {
      flex: 2;
      color: @txtColor;
    }
    .list-number {
      flex: 3;
      color: @txtColor;
    }
    .list-text {
      flex: 1;
      text-align: right;
      color: @darkSkyBlue;
    }
    .list-set {
      flex: 1;
      text-align: right;
      color: @darkSkyBlue;
      text-decoration: underline;
      &.no {
        color: @blueyGrey;
      }
    }
  }
  .list-info {
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    color: @battleshipGrey;
    padding-top: 0.11rem;
    padding-bottom: 0.22rem;
    .list-hands {
      flex: 2;
      color: @txtColor;
    }
    .list-number {
      flex: 3;
      color: @txtColor;
    }
    .list-text {
      flex: 1;
      text-align: right;
      color: @darkSkyBlue;
    }
    .list-set {
      flex: 1;
      text-align: right;
      color: @darkSkyBlue;
      text-decoration: underline;
      &.no {
        color: @blueyGrey;
      }
    }
  }
}
</style>
