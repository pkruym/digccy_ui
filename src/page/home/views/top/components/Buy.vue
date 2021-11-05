<template>
  <div class="buy">
    <div class="buy-top">
      <div class="icon">
        <img src="@/assets/img/2_6/icon_home_usdt_nor.svg" alt />
      </div>
      <div class="buy-title">{{ $t("index.text22") }}</div>
      <div class="company">≈0.12USDT</div>
    </div>
    <div class="buy-input">
      <div class="input">
        <input type="text" v-model="value" :placeholder="buyText" />
        <span>CNY</span>
      </div>
      <div class="buy-btn" @click="buy">{{ $t("index.text24") }}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      purchase: false,
      list: {},
      miniLimit: 0,
      maxLimit: 0,
      buyText: this.$t("index.text23"),
      value: "",
      rate: 0,
      currencySymbol: "",
      merchantId: ""
    };
  },

  mounted() {
    this.getList();
  },
  computed: {
    ...mapGetters({
      // 2.0新增
      isLogin: "user/isLogin"
    }),
    usdtNum() {
      if (this.rate) {
        return (this.value / this.rate).toFixed(2);
      }
    }
  },
  methods: {
    ...mapActions({
      merchantList: "user/merchantList",
      otcPay: "user/otcPay" //usdt商家购买

      // paymentlist: "user/paymentlist",
      // withdraw_otc: "user/withdraw_otc",
      // changeShow: "dialog/changeShow",
      // bankCardQueryUser: "user/bankCardQueryUser" //获取已绑定的银行卡
    }),
    close() {
      this.$refs.buy.clear();
      Object.keys(this.item).forEach(key => (this.item[key] = ""));
      this.purchase = false;
    },
    buy() {
      if (!this.isLogin) {
        this.$vux.toast.text("请先登录", "middle");
        return;
      }
      if (this.value < this.miniLimit || this.value > this.maxLimit) {
        this.$vux.toast.text(this.buyText, "middle");
        return;
      }

      let params = {
        usdtId: this.list.id,
        price: this.rate,
        channelId: this.list.tradeSetting[0].channelId,
        id: this.merchantId,
        usdtNum: Number(this.usdtNum),
        currencyType: this.currencySymbol,
        amount: Number(this.value)
      };

      this.$vux.loading.show({
        text: this.$t("my.setting.text68")
      });
      this.otcPay(params)
        .then(res => {
          this.$vux.loading.hide();
          let payurl = res.pay_url ? res.pay_url : res.payUrl;

          if (this.merchantId === "24") {
            sessionStorage.setItem("payData", JSON.stringify(res));
            this.$router.push({
              path: "/payDetail"
            });
            return;
          } else {
            sessionStorage.setItem("payurl", payurl);
            this.$router.push("/payPage");
          }
        })
        .catch(res => {
          this.$vux.toast.text(res, "middle");

          this.$vux.loading.hide();
        });
    },
    getList() {
      let params = {
        status: true,
        type: "BUY",
        page: 1,
        size: 1
      };
      this.merchantList(params).then(res => {
        console.log(res);
        console.log("4343434");
        this.list = res.records[0];
        this.rate = res.records[0].price;
        this.miniLimit = res.records[0].tradeSetting[0].miniLimit;
        this.maxLimit = res.records[0].tradeSetting[0].maxLimit;
        this.payType = res.records[0].tradeSetting[0].tradeTypeEnum;
        this.currencySymbol = res.records[0].currencySymbol;
        this.merchantId = res.records[0].merchantId;

        //   this.miniLimit = val.tradeSetting[0].miniLimit;
        // this.maxLimit = val.tradeSetting[0].maxLimit;
        // this.rate = val.price;
        // this.value = val.tradeSetting[0].channelId;
        // this.payType = val.tradeSetting[0].tradeTypeEnum;
        // this.currencySymbol = val.currencySymbol;
        // this.merchantId = val.merchantId;
        this.buyText =
          this.$t("buy.text59") + `${this.miniLimit}-${this.maxLimit}CNY`;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.buy {
  margin: 0 0.3rem;

  .buy-top {
    display: flex;
    align-items: center;
    .buy-title {
      color: #e0ecf7;
      font-size: 0.24rem;
      margin: 0 1.8rem 0 0.1rem;
    }
    .company {
      color: #e0ecf7;
      font-size: 0.22rem;
    }
  }
  .buy-input {
    margin-top: 0.1rem;
    display: flex;
    .input {
      flex: 1;
      margin-right: 0.1rem;
      position: relative;

      input {
        width: 100%;
        height: 0.68rem;
        background: #fff;
        border-radius: 2px;
        font-size: 14px;
        padding-left: 0.2rem;
      }
      span {
        position: absolute;
        right: 0.2rem;
        top: 0.16rem;
        color: #151e26;
        font-size: 0.28rem;
        border-left: 1px solid #c1c6cd;
        padding-left: 0.1rem;
      }
    }
    .buy-btn {
      flex: 0 0 1.76rem;
      width: 1.76rem;
      height: 0.68rem;
      text-align: center;
      line-height: 0.68rem;
      font-size: 0.28rem;
      color: #fff;
      background: #2acca6;
      border-radius: 2px;
    }
  }
}
</style>
