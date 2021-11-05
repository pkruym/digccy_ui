<template>
  <model-full
    :preventGoBack="true"
    class="fixd-wrap"
    @prev="goback"
    title="USDT出售"
  >
    <div class="sell-detail">
      <p class="order">订单编号：{{ sellItem.id }}</p>
      <div class="main">
        <div class="main-top">
          <p>{{ sellItem.amount }}{{ sellItem.currencySymbol }}</p>
          <p>等待对方付款中</p>
        </div>
        <div class="container">
          <div class="container-info">
            <div class="container-info-left">数量</div>
            <div class="container-info-right">{{ sellItem.usdtNum }}USDT</div>
          </div>
          <div class="container-info">
            <div class="container-info-left">单价</div>
            <div class="container-info-right">
              {{ sellItem.price }}{{ sellItem.currencySymbol }}/USDT
            </div>
          </div>
        </div>
        <div class="container">
          <div class="container-title">
            <div class="icon">
              <img src="@/assets/img/2_3/ico_wd_cb_yhk@2x.png" alt />
            </div>
            <div class="text">收款方式1 <span>(银行卡)</span></div>
          </div>
          <div class="container-info">
            <div class="container-info-left">姓名</div>
            <div class="container-info-right">{{ sellItem.name }}</div>
          </div>
          <div class="container-info">
            <div class="container-info-left">账号</div>
            <div class="container-info-right">{{ sellItem.bankCardId }}</div>
          </div>
          <div class="container-info">
            <div class="container-info-left">开户银行</div>
            <div class="container-info-right">{{ sellItem.bankName }}</div>
          </div>
          <div class="container-info">
            <div class="container-info-left">银行支行</div>
            <div class="container-info-right">{{ sellItem.branchName }}</div>
          </div>
        </div>
      </div>
    </div>
  </model-full>
</template>
<script>
import { mapActions } from "vuex";
import ModelFull from "element/model-full";

export default {
  components: {
    ModelFull
  },
  data() {
    return {
      sellItem: {
        id: "",
        amount: "",
        usdtNum: "",
        price: "",
        name: "",
        bankCardId: "",
        bankName: "",
        branchName: "",
        currencySymbol: ""
      }
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      queryUserDetail: "actual/traderecord/queryUserDetail", //查询龙虎榜详细信息
      queryTradeRevenue: "actual/traderecord/queryTradeRevenue", //龙虎榜交易收益
      profileList: "user/profileList" //查询龙虎榜用户信息
    }),
    goback() {
      this.$router.push({ path: "/ower" });
    }
  },
  mounted() {
    this.sellItem.id = this.$route.query.id;
    this.sellItem.amount = this.$route.query.amount;
    this.sellItem.usdtNum = this.$route.query.usdtNum;
    this.sellItem.price = this.$route.query.price;
    this.sellItem.name = this.$route.query.name;
    this.sellItem.bankCardId = this.$route.query.bankCardId;
    this.sellItem.bankName = this.$route.query.bankName;
    this.sellItem.currencySymbol = this.$route.query.currencySymbol;
    this.sellItem.branchName = this.$route.query.branchName;
  }
};
</script>
<style lang="less" scoped>
.sell-detail {
  padding: 0.3rem 0.2rem;
  .order {
    font-size: 0.24rem;
    margin-left: 0.1rem;
    color: @blueyGrey;
  }
  .main {
    margin-top: 0.34rem;
    .main-top {
      text-align: center;
      p {
        font-size: 0.32rem;
        color: rgb(42, 204, 166);
        &:nth-of-type(2) {
          font-size: 0.28rem;
          margin-top: 0.24rem;
          color: rgb(104, 114, 132);
        }
      }
    }
    .container {
      margin-top: 0.32rem;
      background: @markBg;
      padding: 0.04rem 0.34rem 0.36rem 0.3rem;
      .container-title {
        display: flex;
        align-items: center;
        padding: 0.36rem 0 0 0;
        .icon {
          flex: 0 0 0.32rem;
          width: 0.32rem;
          height: 0.32rem;
          margin-right: 0.2rem;
          img {
            width: 0.32rem;
            height: 0.32rem;
          }
        }
        .text {
          font-size: 0.28rem;
          color: @whiteTwo;
          span {
            color: @whiteTwo;
            font-size: 0.24rem;
          }
        }
      }
      .container-info {
        display: flex;
        margin-top: 0.36rem;
        & > div {
          flex: 1;
          font-size: 0.28rem;
          color: rgb(156, 163, 185);
          &:nth-of-type(2) {
            color: @whiteTwo;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
