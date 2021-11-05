<template>
  <div id="deal-list">
    <div class="title">
      <div class="title-info">{{ $t("leverageTrading.time") }}</div>
      <div class="title-info">{{ $t("leverageTrading.direction") }}</div>
      <div class="title-info">{{ $t("leverageTrading.price1") }}(USDT)</div>
      <div class="title-info">{{ $t("leverageTrading.number") }}</div>
    </div>
    <div class="list-container">
      <div class="list-info" v-for="(item, index) in dealList" :key="index">
        <div>{{ item.time | dateFormat1 }}</div>
        <div :class="item.direct === 'BUY' ? 'red' : 'green'">
          {{ item.direct === "BUY" ? $t("stock.text27") : $t("stock.text28") }}
        </div>
        <div>{{ item.price.toFixed(symbolpricePrecision) }}</div>
        <div>{{ item.volume.toFixed(symbolvolumePrecision) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { dateFormat } from "vux";
import { mapGetters } from "vuex";

export default {
  props: {
    dealList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  filters: {
    dateFormat1(val) {
      return dateFormat(val, "HH:mm:ss");
    }
  },
  computed: {
    ...mapGetters({
      symbolpricePrecision: "trading/symbolpricePrecision",
      symbolvolumePrecision: "trading/symbolvolumePrecision"
    })
  },
  created() {
    console.log(
      "symbolvolumePrecision",
      this.symbolpricePrecision,
      this.symbolvolumePrecision
    );
  }
};
</script>
<style lang="less" scoped>
#deal-list {
  padding: 0.28rem 0.32rem 0.4rem 0.32rem;
  background: @bodyBg;

  .title {
    display: flex;
    margin-bottom: 0.36rem;
    .title-info {
      flex: 1;
      text-align: left;
      color: @txtColor;
      font-size: 0.2rem;
      &:nth-of-type(2) {
        text-align: center;
      }
      &:nth-of-type(3) {
        text-align: right;
      }
      &:nth-of-type(4) {
        text-align: right;
      }
    }
  }
  .list-container {
    .list-info {
      display: flex;
      margin-bottom: 0.26rem;
      & > div {
        font-size: 0.24rem;
        flex: 1;
        &:nth-of-type(1) {
          color: @lightBlueGreyTwo;
        }
        &:nth-of-type(2) {
          text-align: center;
        }
        &:nth-of-type(3) {
          text-align: right;
          color: @lightBlueGreyTwo;
        }
        &:nth-of-type(4) {
          text-align: right;
          color: @blueyGrey;
        }
      }
    }
  }
}
</style>
