<template>
  <div class="buy">
    <div class="buy-container">
      <div class="buy-yu">
        <div class="title">{{ personalMsgKey[1].value }}</div>
        <div class="title_msg">({{ $t("buy.text50") }}USDT)</div>
      </div>
      <div class="buy-top">
        <div class="title">{{ $t("dialog.usdtSell.number1") }}</div>
        <div class="input">
          <input type="text" :placeholder="buytext" v-model="amount" />
          <span>USDT</span>
        </div>
        <p style="color:rgb(251,84,56);margin-left:.2rem;height:.5rem">
          {{ msg }}
        </p>
      </div>
      <div class="buy-bottom">
        <div class="buy-bottom-info">
          <div class="buy-bottom-info-left">
            {{ $t("dialog.usdtSell.price") }}
          </div>
          <div class="buy-bottom-info-left">
            {{ rate }}{{ currencySymbol }}/USDT
          </div>
        </div>
        <div class="buy-bottom-info">
          <div class="buy-bottom-info-left">
            {{ $t("dialog.usdtSell.number") }}
          </div>
          <div class="buy-bottom-info-left">
            {{ amount ? amount : "0" }}USDT
          </div>
        </div>
        <div class="buy-bottom-info">
          <div class="buy-bottom-info-left">
            {{ $t("dialog.usdtBuy.text3") }}
          </div>
          <div class="buy-bottom-info-left">
            {{ (amount * rate).toFixed(2) }}{{ currencySymbol }}
          </div>
        </div>
      </div>
      <div class="buy-top">
        <div class="title">{{ $t("personalCenter.payPassworad") }}</div>
        <div class="input">
          <input
            type="password"
            :placeholder="$t('dialog.usdtSell.placeholder2')"
            v-model="fundPassword"
            @blur="blur"
          />
        </div>
      </div>
    </div>
    <div class="btn" @click="sell">{{ $t("dialog.usdtSell.submit") }}</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  },

  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      personalMsgKey: "actual/account/personalMsgKey"
    }),
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

  watch: {
    item(val) {
      this.buytext =
        this.$t("dialog.usdtSell.placeholder1[0]") +
        (
          Math.ceil((val.tradeSetting[0].miniLimit / val.price) * 100) / 100
        ).toFixed(2) +
        "-" +
        (
          parseInt((val.tradeSetting[0].maxLimit / val.price) * 100) / 100
        ).toFixed(2) +
        this.$t("dialog.usdtSell.placeholder1[1]");
      this.miniLimit = val.tradeSetting[0].miniLimit;
      this.maxLimit = val.tradeSetting[0].maxLimit;
      this.rate = val.price;
      this.value = val.tradeSetting[0].tradeTypeEnum;
      this.currencySymbol = val.currencySymbol;
    }
  },
  data() {
    return {
      amount: "",
      fundPassword: "",
      bindId: "",
      buytext: "",
      miniLimit: 0,
      maxLimit: 0,
      rate: 0,
      currencySymbol: ""
    };
  },
  created() {
    this.getBankList();
  },
  methods: {
    ...mapActions({
      otcApply: "user/otcApply", //usdt出售
      bankCardQueryUser: "user/bankCardQueryUser" //获取已绑定的银行卡
    }),
    clear() {
      Object.keys(this.item).forEach(key => (this.item[key] = ""));
      this.miniLimit = 0;
      this.maxLimit = 0;
      this.rate = 0;
      this.currencySymbol = "";
      this.amount = "";
      this.fundPassword = "";
    },
    //获取银行卡
    getBankList() {
      this.bankCardQueryUser()
        .then(res => {
          if (res && res.length != 0) {
            this.bindId = res[0].id;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    blur() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    sell() {
      let vm = this;
      if (!this.fundPassword) {
        this.$vux.toast.text(this.$t("personalCenter.payPassworad"), "bottom");
        return;
      }

      if (this.userInfo.fundPasswdBlank) {
        this.$vux.confirm.show({
          title: this.$t("setText.title"),
          content: this.$t("page.text53"),
          confirmText: this.$t("common.text18"),
          cancelText: this.$t("common.text3"),
          onCancel() {
            console.log("plugin cancel");
          },
          onConfirm() {
            vm.$router.push("/setting/firstpaypass");
          }
        });
        return;
      }
      if (
        Number(this.amount) < (this.miniLimit / this.rate).toFixed(2) ||
        Number(this.amount) > (this.maxLimit / this.rate).toFixed(2)
      ) {
        this.$vux.toast.text(this.buytext, "bottom");

        return;
      }
      let params = {
        merchantId: this.item.id,
        price: this.rate,
        channelId: 3,
        id: 12,
        usdtNum: Number(this.amount),
        amount: Number(this.amount * this.rate),
        bindId: this.bindId,
        fundPassword: this.fundPassword
      };
      this.otcApply(params)
        .then(res => {
          console.log("res", res);
          this.$router.push({
            path: "/sellDetail",
            query: {
              id: res.id,
              amount: res.amount,
              usdtNum: res.usdtNum,
              price: res.price,
              name: res.name,
              bankCardId: res.bankCardId,
              bankName: res.bankName,
              branchName: res.branchName,
              currencySymbol: this.currencySymbol
            }
          });
        })
        .catch(res => {
          this.$vux.toast.text(res, "bottom");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.buy {
  margin-top: 0.76rem;

  .buy-container {
    .buy-yu {
      .title {
        text-align: center;
        font-size: 0.28rem;
        color: @whiteTwo;
      }

      .title_msg {
        text-align: center;
        font-size: 0.24rem;
        margin: 0.1rem;
        color: @whiteTwo;
      }
    }

    .buy-top {
      .title {
        margin-left: 0.2rem;
        font-size: 0.28rem;
        color: @whiteTwo;
      }

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
          color: #e0ecf7;
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
      margin: 0.3rem 0;
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
    color: #e0ecf7;
    margin-top: 0.3rem;
  }
}
</style>
