<template>
  <div class="fast">
    <div class="tabs"><span>USDT</span></div>
    <div class="content">
      <div class="top">
        <!-- <span>购买金额</span> -->
        <span>{{ $t("buy.text60") }}</span> <span>≈{{ usdtNum }}USDT</span>
      </div>
      <div class="form-box">
        <span>￥</span>
        <input type="number" :placeholder="buyText" v-model="value" />
      </div>
      <div class="btn" @click="buy">{{ $t("index.text24") }}</div>
      <p class="tip-yellow">{{ $t("dialog.usdtBuy.text4") }}</p>
      <div class="tip-box">
        <span>{{ $t("dialog.usdtBuy.text5") }}</span>
        <div>{{ $t("dialog.usdtBuy.text6") }}</div>
      </div>
      <div class="tip-box">
        <span>{{ $t("dialog.usdtBuy.text7") }}</span>
        <div>{{ $t("dialog.usdtBuy.text8") }}</div>
      </div>
      <div class="tip-box">
        <span>{{ $t("dialog.usdtBuy.text9") }}</span>
        <div>{{ $t("dialog.usdtBuy.text10") }}</div>
      </div>
      <div class="tip-box">
        <span>{{ $t("dialog.usdtBuy.text11") }}</span>
        <div>{{ $t("dialog.usdtBuy.text12") }}</div>
      </div>
      <div class="tip-box">
        <span>{{ $t("dialog.usdtBuy.text13") }}</span>
        <div>
          {{ $t("dialog.usdtBuy.text14")
          }}<span @click="$router.push('/drawmoney/reversal')">{{
            $t("navbar.coinCharging")
          }}</span
          >{{ $t("dialog.usdtBuy.text15")
          }}<span
            @click="
              $router.push(
                '/drawmoney/withdrawal?' + 'realAuth=' + userInfo.realAuth
              )
            "
            >{{ $t("navbar.withdrawmoney") }}</span
          >
        </div>
      </div>
      <div class="tip-box">
        <span>{{ $t("dialog.usdtBuy.text16") }}</span>
        <div>
          {{ $t("dialog.usdtBuy.text17")
          }}<span @click="$router.push('/service')">{{ $t("my.text15") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      number: "",
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

  computed: {
    ...mapGetters({
      // 2.0新增
      userInfo: "user/userInfo",
      isLogin: "user/isLogin"
    }),
    usdtNum() {
      if (this.rate) {
        return (this.value / this.rate).toFixed(2);
      }
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    ...mapActions({
      merchantList: "user/merchantList",
      otcPay: "user/otcPay" //usdt商家购买
    }),
    buy() {
      // if (!this.isLogin) {
      //   this.$vux.toast.text("请先登录", "middle");
      //   return
      // }
      // if (this.value == '') {
      //   this.$vux.toast.text('请输入购买金额', "middle")
      //   return
      // }
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
          console.log("resresres", res);
          if (res.code === 5017) {
            this.$router.push({
              path: "/setting/realname"
            });
            this.$vux.loading.hide();
            return;
          } else {
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
  },
  beforeDestroy() {
    this.$vux.loading && this.$vux.loading.hide();
  }
};
</script>
<style lang="less" scoped>
.fast {
  display: flex;
  flex-direction: column;
  height: 100%;
  .tabs {
    padding: 0.4rem 0.3rem 0.16rem;
    font-size: 20px;
    color: #e0ecf7;
  }
  .content {
    height: calc(~"100% - 102px");
    background: #151e26;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    overflow: hidden;
    padding: 0.4rem 0.3rem;
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #949fac;
      margin-bottom: 8px;
    }
    .form-box {
      padding: 0.4rem 0;
      border-bottom: 1px solid #3e4757;
      display: flex;
      span {
        font-size: 26px;
        color: #e0ecf7;
        margin-right: 5px;
      }
      input {
        font-size: 16px;
        color: #949fac;
        flex: 1;
        background: none;
      }
    }
    .btn {
      background: #2acca6;
      border-radius: 4px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fefefe;
      font-size: 14px;
      margin-top: 30px;
    }
  }
  .tip-yellow {
    text-align: center;
    width: 100%;
    margin-top: 10px;
    font-size: 10px;
    // transform: scale(0.8);
    color: #f7931a;
    line-height: 18px;
    margin-bottom: 32px;
  }
  .tip-box {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    > span {
      font-size: 12px;
      color: #fefffe;
      line-height: 18px;
    }
    > div {
      font-size: 10px;
      color: #cfd3e9;
      line-height: 18px;
      padding-left: 18px;
      width: 100%;
      span {
        color: #2acca6;
        line-height: 18px;
        position: relative;
        text-decoration: underline;
      }
    }
  }
}
</style>
