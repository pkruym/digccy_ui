<template>
  <div class="buy">
    <div class="buy-container">
      <div class="buy-type">
        <div class="title">{{ $t("dialog.usdtBuy.text1") }}</div>
        <div class="buy-type-info">
          <base-radio
            :options="commonList"
            :selectOption="value"
            @radioChange="changeOption"
          ></base-radio>
        </div>
      </div>
      <div class="buy-top">
        <div class="title">{{ $t("dialog.usdtBuy.text2") }}</div>
        <div class="input">
          <input
            type="text"
            :placeholder="buytext"
            v-model="amount"
            @blur="blur"
          />
          <span>{{ currencySymbol }}</span>
        </div>
        <p style="color:rgb(251,84,56);margin-left:.2rem;height:.5rem">
          {{ msg }}
        </p>
      </div>
      <div class="buy-bottom">
        <div class="buy-bottom-info">
          <div class="buy-bottom-info-left">
            {{ $t("dialog.usdtBuy.price") }}
          </div>
          <div class="buy-bottom-info-left">
            {{ rate }}{{ currencySymbol }}/USDT
          </div>
        </div>
        <div class="buy-bottom-info">
          <div class="buy-bottom-info-left">
            {{ $t("dialog.usdtBuy.number") }}
          </div>
          <div class="buy-bottom-info-left">{{ usdtNum }}USDT</div>
        </div>
        <div class="buy-bottom-info">
          <div class="buy-bottom-info-left">
            {{ $t("dialog.usdtBuy.text3") }}
          </div>
          <div class="buy-bottom-info-left">
            {{ amount ? amount : 0 }}{{ currencySymbol }}
          </div>
        </div>
      </div>
    </div>
    <div class="btn" @click="buy">{{ $t("dialog.usdtBuy.submit") }}</div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import baseRadio from "element/base-radio";

export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  components: {
    baseRadio
  },
  computed: {
    msg() {
      if (
        (this.amount < this.miniLimit && this.amount != 0) ||
        this.amount > this.maxLimit
      ) {
        return this.buytext;
      } else {
        return "";
      }
    },
    usdtNum() {
      if (this.rate) {
        return (this.amount / this.rate).toFixed(2);
      }
    }
  },
  data() {
    return {
      amount: "",
      commonList: [],
      value: "1",
      payType: "",
      buytext: "",
      miniLimit: 0,
      maxLimit: 0,
      rate: 0,
      currencySymbol: "",
      loading: false,
      isIOS: false,
      isAndroid: false,
      merchantId: ""
    };
  },
  watch: {
    item(val) {
      this.item.tradeSetting.map(item => {
        let obj = {
          name: item.channelName,
          value: item.channelId,

          ...item
        };
        this.commonList.push(obj);
        this.buytext =
          this.$t("dialog.usdtBuy.placeholder1[0]") +
          val.tradeSetting[0].miniLimit +
          "--" +
          val.tradeSetting[0].maxLimit +
          this.$t("dialog.usdtBuy.placeholder1[1]");
        this.miniLimit = val.tradeSetting[0].miniLimit;
        this.maxLimit = val.tradeSetting[0].maxLimit;
        this.rate = val.price;
        this.value = val.tradeSetting[0].channelId;
        this.payType = val.tradeSetting[0].tradeTypeEnum;
        this.currencySymbol = val.currencySymbol;
        this.merchantId = val.merchantId;
      });
    }
  },
  created() {
    //miniLimit   ~ maxLimit
    var u = navigator.userAgent,
      app = navigator.appVersion;
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    this.isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
  },
  methods: {
    ...mapActions({
      otcPay: "user/otcPay" //usdt商家购买
    }),
    clickInput() {
      alert(11111);
    },
    clear() {
      Object.keys(this.item).forEach(key => (this.item[key] = ""));
      this.commonList = [];
      this.miniLimit = 0;
      this.maxLimit = 0;
      this.rate = 0;
      this.currencySymbol = "";

      this.amount = "";
      this.value = "";
      this.payType = "";
    },

    changeOption(val, label) {
      this.miniLimit = label.miniLimit;
      this.maxLimit = label.maxLimit;
      // this.rate = label.rate;
      // this.currencySymbol = label.currencySymbol;

      this.amount = "";
      this.value = val;
      this.payType = label.tradeTypeEnum;

      this.buytext =
        this.$t("dialog.usdtBuy.placeholder1[0]") +
        label.miniLimit +
        "--" +
        label.maxLimit +
        this.$t("dialog.usdtBuy.placeholder1[1]");
    },
    focus() {},
    blur() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    buy() {
      if (this.amount < this.miniLimit || this.amount > this.maxLimit) {
        this.$vux.toast.text(this.buytext, "middle");
        return;
      }
      let params = {
        usdtId: this.item.id,
        price: this.rate,
        channelId: this.value,
        id: this.merchantId,
        usdtNum: Number(this.usdtNum),
        currencyType: this.currencySymbol,
        amount: Number(this.amount)
      };

      this.$vux.loading.show({
        text: this.$t("my.setting.text68")
      });
      this.otcPay(params)
        .then(res => {
          this.$vux.loading.hide();
          if (res.code === 5017) {
            this.$router.push({
              path: "/setting/realname"
            });
            this.$vux.loading.hide();
            return;
          } else {
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

          // if (this.payType == "WEIXIN") {
          //   sessionStorage.setItem("pay", JSON.stringify(res));
          //   sessionStorage.setItem("money", this.amount);
          //   this.$router.push("/ercode");
          //   return;
          // } else if (this.payType == "ALIPAY") {
          //   if (window.appInterface) {
          //     window.appInterface.goToBrowser(payurl);
          //   } else if (window.webkit) {
          //     window.webkit.messageHandlers.OpenSafari.postMessage({
          //       url: payurl
          //     });
          //   } else {
          //     // window.open(payurl);
          //     window.location.href = payurl;
          //   }
          // } else {

          // }
        })
        .catch(res => {
          this.$vux.toast.text(res, "middle");

          this.$vux.loading.hide();
        });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/colorWrite.less";

.buy {
  margin-top: 0.76rem;

  .buy-container {
    .title {
      margin-left: 0.2rem;
      font-size: 0.28rem;
      color: @whiteTwo;
    }

    .buy-type {
      .buy-type-info {
        background: #28323c;
        padding: 0.5rem 0.3rem;
        margin: 0.1rem 0 0.3rem 0;
      }
    }

    .buy-top {
      .input {
        position: relative;
        margin-top: 0.24rem;

        input {
          width: 100%;
          padding-left: 0.3rem;
          height: 1rem;
          background: rgb(40, 50, 60);
          border-radius: 4px;
          font-size: 0.28rem;
          color: #fff;
        }

        span {
          position: absolute;
          right: 0.36rem;
          top: 0.3rem;
          color: @blueyGrey;
          font-size: 0.28rem;
        }
      }
    }

    .buy-bottom {
      margin-top: 0.3rem;
      padding: 0.2rem 0.3rem 0.6rem 0.3rem;
      background: @darkFour;
      border-radius: 4px;

      .buy-bottom-info {
        margin-bottom: 0.48rem;
        display: flex;

        & > div {
          flex: 1;
          font-weight: 700;
          color: @whiteTwo;
          font-size: 0.28rem;

          &:nth-of-type(2) {
            text-align: right;
          }
        }
      }
    }
  }

  .btn {
    width: 100%;
    height: 0.9rem;
    background: rgb(42, 204, 166);
    border-radius: 4px;
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.32rem;
    color: #fff;
    margin-top: 0.3rem;
  }
}
</style>
