<template>
  <!-- <div class="transList clearfix flex"  @click="bgo(item)">
      <div class="left flex">
          <p><span class="name">{{item.stockName}}</span> <span class="code">{{item.stockCode}}</span></p>
          <p class="flex user-info">
            <img src="@/assets/img/tag-xingquan.png" alt="" v-if="item.tradeType===1">
            <img src="@/assets/img/tag-shengou.png" alt="" v-else>
            <span class="ip">{{item.phone}}</span></p>
      </div>
      <div class="middle" :class="{red: item.tradeType!==1}"  >{{item.profit?"+"+item.profit+"元":item.nominalAmount/10000+'万元'}}</div>
      <div class="right">
          <button class="query"  @click.stop="go(item,$event)">期权申购</button>
      </div>
  </div> -->
  <div class="transList" @click="bgo(item)">
    <div class="left">
      <p>
        {{ item.contractName }}
        <span>{{ item.contractSymbol }}{{ item.contractNo }}</span>
      </p>
      <p>
        {{ item.phone }}
        <span :class="[item.orderType === 'BuyUp' ? 'green' : 'red']">{{
          item.orderType === "BuyUp"
            ? "买涨"
            : item.orderType === "BuyFall"
            ? "买跌"
            : "--"
        }}</span>
      </p>
    </div>
    <div class="middle">
      {{ item.orderType === '"BuyUp"' ? "买涨" : "买跌"
      }}{{ item.totalQuantity }}手
    </div>
    <div class="right">跟买</div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    go(item, event) {
      // event
      // console.log(item)
      // sessionStorage.setItem(
      //   "codeInfo",
      //   JSON.stringify({
      //     title: this.item.stockName + "(" + this.item.stockCode + ")",
      //     code: this.item.stockCode,
      //     name: this.item.stockName
      //     // favorite: this.item.favorite
      //   })
      // );
      // this.$router.push({
      //   name: "qiquan"
      // });
    },
    bgo(item) {
      this.$router.push({
        name: "stock-line",
        query: {
          symbol: item.contractSymbol,
          contractNo: item.contractNo,
          id: item.contractId
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.mint-button--danger {
  background: @Orange;
}
.transList {
  display: flex;
  padding: 0.18rem 0.4rem 0.18rem 0.22rem;
  align-items: center;
  justify-content: space-between;
  .left {
    width: 2.2rem;

    p:nth-of-type(1) {
      span {
        color: @battleshipGrey;
        font-size: 10px;
      }
    }
    p:nth-of-type(2) {
      font-size: 12px;
      color: @dark !important;
      span {
        display: inline-block;
        margin-left: 0.1rem;
        font-size: 12px;
      }
    }
  }
  .middle {
    text-align: center;
    color: @battleshipGrey;
  }
  .right {
    flex: 0 0 1.26rem;
    width: 1.26rem;
    height: 0.52rem;
    border: 1px solid @lightBlue;
    border-radius: 0.08rem;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.52rem;
    color: @lightBlue;
  }
}
</style>
