<template>
  <div class="close-position">
    <div class="box">
      <div class="close-box">
        <div class="info">
          <div class="close-left flex">
            <p v-show="!isSettlement">{{ $t("futures.text1") }}(USDT)</p>
            <p v-show="isSettlement">{{ $t("futures.text2") }}(USDT)</p>
          </div>
          <div class="flex">
            <p v-show="!isSettlement" class="float-income din-Medium" :class="[
                personalMsgKey[3].value > 0
                  ? 'green'
                  : personalMsgKey[3].value < 0
                  ? 'red'
                  : ''
              ]">
              {{ personalMsgKey[3].value > 0 ? "+" : "" }}{{ num() }}
            </p>

            <div class="float-income total-income din-bold" :class="[personalMsgKey[4].value >= 0 ? 'green' : 'red']" v-show="isSettlement">
              {{ token ? (personalMsgKey[4].value > 0 ? "+" : "") : ""
              }}{{ token ? personalMsgKey[4].value || "--" : "--" }}
            </div>
          </div>
        </div>
        <div class="close-right" @click="setAll" v-show="!isSettlement">
          {{ $t("leverageTrading.allClose") }}
        </div>
      </div>
      <div class="close-bottom">
        <div>
          <p class="din-medium">
            {{ token ? personalMsgKey[2].value || 0 : "--" }}
          </p>
          <p>{{ $t("futures.text5") }}(USDT)</p>
        </div>
        <div>
          <!-- <p>{{token?floatProfitOrLoss > 0?(price.availableBalance||0).toFixed(2): (floatAvailableBalance > 0?floatAvailableBalance:0).toFixed(2):'--'}}</p> -->
          <p class="din-medium">
            {{ token ? personalMsgKey[1].value || 0 : "--" }}
          </p>
          <!--<p class="din-medium">{{token?(personalMsgKey[1].value||0).toFixed(2):'&#45;&#45;'}}</p>-->
          <p>{{ $t("futures.text4") }}(USDT)</p>
        </div>
        <div>
          <p class="din-medium">
            {{ token ? personalMsgKey[0].value || 0 : "--" }}
          </p>
          <p>{{ $t("futures.text6") }}(USDT)</p>
        </div>
      </div>
    </div>
    <div class="line6"></div>
  </div>
</template>
<script>
import Bus from "@/assets/js/bus";
import { mapState, mapGetters, mapActions } from "vuex";
// // import { protoInit, close } from "@/assets/js/probuf";
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      isSettlement: false,
      index: 0,
      dingshiqi: function () { }
    };
  },
  props: {
    profit: {
      default: 0
    }
  },

  computed: {
    ...mapState([
      "price",
      "floatProfitOrLoss",
      "floatAvailableBalance",
      "totalprofit"
    ]),
    ...mapGetters({
      accountInfo: "actual/account/accountInfo",
      personalMsgKey: "actual/account/personalMsgKey",
      positionList: "actual/position/positionList",
      userInfo: "user/userInfo"
    })
  },
  mounted() {
    this.getMoney();
    // if (!this.price.id) {
    //   this.getMoney();
    // }
    if (
      this.$route.fullPath === "/settlement?type=FUTURE" ||
      this.$route.fullPath === "/settlement?type=LEVER"
    ) {
      this.isSettlement = true;
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        let isSettpath = val.path === "/settlement";
        if (isSettpath) {
          this.traderecordSumProfit();
          this.isSettlement = true;
        } else {
          this.isSettlement = false;
        }
      }
      // 深度观察监听
    }
  },
  created() {
    this.traderecordSumProfit();
  },
  methods: {
    ...mapActions({
      close: "actual/order/close",
      // traderecordSumProfit: "actual/traderecord/sumProfit"
      traderecordSumProfit: "actual/traderecord/getTodayProfit"
    }),
    getMoney() {
      const _this = this;
      this.scoketApi.sendSock(
        {
          moduleId: 1,
          cmdId: 7
        },
        function (res) {
          // _this.callBack(res);
        }
      );
    },
    num() {
      /*let num =
        this.floatProfitOrLoss > 0
          ? this.floatProfitOrLoss.toFixed(2)
          : this.floatProfitOrLoss < 0
          ? this.floatProfitOrLoss.toFixed(2)
          : this.floatProfitOrLoss.toFixed(2);
      console.log(666)*/
      let num = this.personalMsgKey[3].value;
      if (isNaN(num)) {
        return "0.00";
      } else {
        return num;
      }
    },
    getProfit() {
      const _this = this;
      this.scoketApi.sendSock(
        {
          moduleId: 7,
          cmdId: 9
        },
        function (res) {
          if (res.code == "200") {
            _this.profit = res.result.totalIncome;
          } else {
            _this.$vux.toast.text(res.message, "middle");
          }
        }
      );
    },
    allClose() {
      let positions = this.positionList;
      if (positions.length == 0) {
        this.$vux.toast.text(this.$t("futures.text27"), "middle");
        return;
      }

      for (let index = 0; index < positions.length; index++) {
        const element = positions[index];
        let params = {
          userId: this.userInfo.id,
          positionId: element.id,
          marketPriceType: "NORMAL",
          orderPriceType: "MARKET",
          volume: element.forCloseRemainVolume
        };
        console.log("this.positionList", this.positionList, params);
        console.log("paramsparamsparamsparams", params);
        this.close(params)
          .then(res => { })
          .catch(e => {
            this.$vux.toast.text(`${e}`, "middle");
            return;
          });
      }
      this.$vux.toast.text(this.$t("futures.text9"), "middle");
    },
    setAll() {
      console.log(this.positionList);

      var _this = this;
      this.$vux.confirm.show({
        title: this.$t("setText.title"),
        content: this.$t("futures.text7"),
        cancelText: this.$t("common.text3"),
        confirmText: this.$t("personalCenter.text15"),
        onCancel() {
          console.log("plugin cancel");
        },
        onConfirm() {
          this.index = 0;
          _this.allClose();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
