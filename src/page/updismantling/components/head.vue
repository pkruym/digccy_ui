<template>
  <div>
    <div class="head">
      <div class="name">
        {{ cptData.symbol }}
        <!-- <span
        :class="cptData.direct==='BUY'?'green':'red'"
      >
      {{cptData.direct==='BUY'?'买涨':'买跌'}}
      {{cptData.volume}} 手</span> -->
        <!--<span>{{data.direct==='BUY'?'买涨':'买跌'}} {{data.isNormal?data.buyUpQuantity:data.quantity}} 手</span>-->
      </div>
      <span :class="cptData.direct === 'BUY' ? 'red' : 'green'">
        {{
          cptData.direct === "BUY" ? $t("index.text41") : $t("index.text40")
        }}
        {{ cptData.volume }}{{ cptData.symbol.split("/")[0] }}</span
      >
    </div>
    <!-- <div
      class="tip red"
    >   提示 ：{{cptData.direct==='BUY'?'买涨':'买跌'}} {{cptData.volume}} 手,已挂{{cptData.freezeVolume}} 手,可设置{{cptData.volume-cptData.freezeVolume}} 手</div> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      positionList: "actual/position/positionList",
      orderList: "actual/order/orderList"
    }),
    cptData() {
      let obj = {
        name: "",
        direct: "",
        volume: 0,
        newPrice: 0,
        commodityNo: ""
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

      return obj;
    }
  },
  mounted() {
    console.log("cptData", this.cptData);
  }
};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  background: #151e26;
  line-height: 0.88rem;
  padding: 0 0.36rem 0 0.3rem;
  & > div {
    &.name {
      font-size: 0.32rem;
      color: #e0ecf7;
      flex: 2;
      &.red {
        color: @coral;
      }
      &.green {
        color: @blueColor;
      }
    }
    &.price {
      text-align: right;
      font-size: 0.28rem;
      color: @fontRedColor;
    }
  }
}
.tip {
  padding: 0 0.36rem 0 0.3rem;
}
</style>
