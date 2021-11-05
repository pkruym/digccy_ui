<template>
  <!-- <popup v-model="show" class="number-popup" :show-mask="true">
    <div class="number-container">
      <div class="content">
        平仓
        <div class="title">{{ $t("futures.position.text12") }}</div>
        <div class="desc-title" v-if="data.symbol">
          {{
            $tradeType.tradeType == "LEVER" ? $t("leverageTrading.symbol") : ""
          }}
          <span :class="data.direct === 'BUY' ? 'red' : 'green'"></span>
          <span>{{ data.symbol.split("/")[0] }}</span>
          <div class="leverageleft">{{ data.leverage }}X</div>
        </div>
        <div class="desc-title" v-if="data.symbol">
          {{
            $tradeType.tradeType == "LEVER" ? $t("leverageTrading.symbol") : ""
          }}
          <span :class="data.direct === 'BUY' ? 'red' : 'green'">{{
            data.direct === "BUY" ? $t("index.text41") : $t("index.text40")
          }}</span>
          <span
          数量
            >{{ data.volume
            }}{{
              $tradeType.tradeType == "LEVER"
                ? data.symbol.split("/")[0]
                : $t("leverageTrading.bow")
            }}</span
          >
        </div>
        <div class="number-info">
          类型
          <div class="label">{{ $t("common.type") }}:</div>
          <div
            class="main flex"
            v-if="
              this.$route.path == '/position'
                ? true
                : this.traderState == 4
                ? true
                : false
            "
          >
            <base-radio
              :options="commonList"
              :selectOption="value"
              @radioChange="changeOption"
            ></base-radio>
          </div>
          <div v-else class="main flex">
            市价
            {{ $t("futures.position.text20") }}
          </div>
        </div>
        <div class="commission-price">
          <div class="number-info" v-show="value == 1">
            价格
            <div class="label">{{ $t("futures.position.text21") }}:</div>
            <div class="main">
              <add-btn
                @remove="removePrice"
                @add="addPrice"
                @change="entrustPriceChange"
                :num="entrustPrice"
                class="add-btn"
              ></add-btn>
            </div>
          </div>
          <div class="number-info">
            <div class="label">
              数量 张数
              {{
                $tradeType.tradeType == "LEVER"
                  ? $t("futures.position.text22")
                  : $t("futures.position.text38")
              }}:
            </div>
            <div class="main">
              <add-btn
                @remove="remove"
                @add="add"
                @change="quantityChange"
                :num="quantity"
                class="add-btn"
                v-if="this.$route.path == '/position'"
              ></add-btn>
              <div v-else class="kuang main">{{ quantity }}</div>
            </div>
          </div>
          <p v-show="value == 1">
             text2: ["提示:委托价格若", "高", "低", "于最新市场价可能按最优价成交"]
            {{ $t("dialog.trading.text2[0]")
            }}{{
              data.direct === "BUY"
                ? $t("dialog.trading.text2[2]")
                : $t("dialog.trading.text2[1]")
            }}{{ $t("dialog.trading.text2[3]") }}
          </p>
        </div>
      </div>
      <btn @cancle="cancle" @confrim="confrim"></btn>
    </div>
  </popup> -->

  <yd-popup v-model="show" class="pc-popup" position="center">
    <div class="content" :class="{ large: radioType == 1 }">
      <!-- 确认平仓 -->
      <h1>{{ $t("dialog.trading.text3") }}</h1>
      <div class="cell-box line05">
        <span>
          {{
            $tradeType.tradeType == "LEVER"
              ? $t("leverageTrading.symbol")
              : $t("dialog.trading.contract")
          }}</span
        >
        <div class="value">
          {{ orderData && orderData.symbol ? orderData.symbol : "--" }}·
          <span class="green">{{ orderData.leverage + "X" }}</span>
        </div>
      </div>
      <div class="cell-box line05">
        <!-- 交易方向 -->
        <span>{{ $t("buy.text43") }}</span>
        <div class="value">
          <span :class="orderData.direct === 'BUY' ? 'green' : 'red'">{{
            orderData.direct === "BUY" ? $t("index.text41") : $t("index.text40")
          }}</span>
        </div>
      </div>
      <div class="cell-box line05">
        <!-- 数量 -->
        <span>{{ $t("dialog.coincharging.text7") }}</span>
        <div class="value">
          {{ orderData.volume
          }}{{
            orderData && orderData.symbol
              ? $tradeType.tradeType == "LEVER"
                ? orderData.symbol.split("/")[0]
                : $t("leverageTrading.bow")
              : "--"
          }}
        </div>
      </div>
      <div class="cell-box line05">
        <span>{{ $t("dialog.coincharging.text6") }}</span>
        <div class="value">{{ $t("dialog.trading.marketPrice") }}</div>
      </div>
      <!-- <div class="cell-box type">
        
        <span>{{ $t("dialog.coincharging.text6") }}</span>
        <div class="radio">
          <yd-radio-group v-model="radioType" color="#3D7FFF" size="18">
            <yd-radio val="0" @click.native="changeOption(0)">{{
              $t("dialog.trading.marketPrice")
            }}</yd-radio>
            <yd-radio val="1" @click.native="changeOption(1)">{{
              $t("dialog.trading.commissionPrice")
            }}</yd-radio>
          </yd-radio-group>
        </div>
      </div> -->
      <template v-if="radioType == 1">
        <div class="cell-box">
          <span>{{ $t("futures.position.text21") }}</span>
          <div class="input-add sim">
            <input
              class="input"
              v-model="entrustPrice"
              @blur="blurNumber($event)"
              type="number"
            />
            <span class="dw">USDT</span>
            <div class="action">
              <span @click="removePrice">-</span>
              <span @click="addPrice">+</span>
            </div>
          </div>
        </div>
        <div class="cell-box" style="margin-top:0.2rem;">
          <p>{{ $t("futures.position.text50") }}</p>
        </div>
      </template>

      <div class="popup-btn">
        <div class="btn" @click="show = false">{{ $t("common.cancle") }}</div>
        <div class="btn active" @click="confrim">
          {{ $t("common.confrim") }}
        </div>
      </div>
    </div>
  </yd-popup>
</template>
<script>
// import baseRadio from "element/base-radio";
// import { Popup } from "vux";
// import btn from "element/base-confrim-button";
// import addBtn from "element/base-add-input";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

import {
  orderPriceTypeEnum,
  directEnum,
  offsetEnum
} from "@/assets/js/utils/constant";

export default {
  components: {
    // Popup,
    // baseRadio,
    // btn,
    // addBtn
  },
  props: {
    orderData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      radioType: 0,
      traderState: "",
      show: false,
      num: "",
      quantity: "",
      commonList: [
        {
          name: this.$t("buy.text29"),
          value: 0
        },
        {
          name: this.$t("buy.text30"),
          value: 1
        }
      ],
      entrustPrice: "0"
    };
  },
  watch: {
    "data.forCloseRemainVolume": {
      handler(to) {
        this.quantity = to;
      },
      immediate: true,
      deep: true
    },
    show() {
      if (this.show) {
        console.log(this.orderData);
        // this.$nextTick(() => {
        //   let propDom = document.getElementsByClassName("vux-popup-mask")[0];
        // });
      } else {
        this.clear();
      }
    }
  },
  computed: {
    ...mapGetters({
      minWave: "trading/minWave",
      accountInfo: "actual/account/accountInfo",
      positionId: "trading/positionId",
      isLogin: "user/isLogin",
      userInfo: "user/userInfo",
      pricePrecision: "trading/pricePrecision",
      volumePrecision: "trading/volumePrecision"
    })
  },
  methods: {
    ...mapActions({
      close: "actual/order/close" // 平仓
    }),
    clear() {
      this.radioType = 0;
      Object.keys(this.orderData).forEach(key => (this.orderData[key] = ""));
    },
    blurNumber(e) {
      let val = e.target.value;
      let type = 0;
      if (val == "") {
        this.changeOption(1);
      }
    },
    addPrice() {
      let num = 1 / Math.pow(10, this.pricePrecision);
      this.entrustPrice = this.addNum(this.entrustPrice, num);
    },
    removePrice() {
      let num = 1 / Math.pow(10, this.pricePrecision);
      this.entrustPrice = this.subtr(this.entrustPrice, num);
    },
    // entrustPriceChange(val) {
    //   this.entrustPrice = val;
    // },

    remove() {
      let num = 1 / Math.pow(10, this.pricePrecision);
      this.entrustPrice = this.subtr(this.entrustPrice, num);
    },
    // quantityChange(val) {
    //   this.quantity = val;
    // },
    // 切换市价委托价
    changeOption(val) {
      this.radioType = val;
      if (val == 1) {
        this.entrustPrice = Number(this.orderData.newPrice).toFixed(
          this.pricePrecision
        );
      }
    },
    cancle() {
      this.show = false;
      this.clear();
    },
    //新加的方法
    // clickRadio(e, val) {
    //   this.radioType = val;
    // },
    //获取精度
    // getPrecision(isAdd = true) {
    //   let val = Number(this.entrustPrice);
    //   if (val != 0) {
    //     let len = String(this.entrustPrice).split(".")[1].length;
    //     let str = "000000000".substring(0, len - 1);
    //     let str2 = "0." + str + "1";
    //     if (isAdd) {
    //       return (parseFloat(val) + parseFloat(str2)).toFixed(len);
    //     } else {
    //       return (parseFloat(val) - parseFloat(str2)).toFixed(len);
    //     }
    //   } else {
    //     return 0;
    //   }
    // },
    confrim() {
      const _this = this;
      // if (this.orderData.direct === "BUY") {
      //   if (this.quantity * 1 > this.orderData.volume) {
      //     this.$vux.toast.text("手数不能大于最大手数", "middle");
      //     return;
      //   }
      // } else {
      //   if (_this.quantity * 1 > this.orderData.volume) {
      //     return;
      //   }
      // }
      // if (_this.quantity * 1 <= 0) {
      //   this.$vux.toast.text("手数必须大于0", "middle");
      //   return;
      // }
      console.log(this.userInfo);
      let params = {
        // close: "STOP_PROFIT",
        userId: this.userInfo.id,
        positionId: this.orderData.id,
        marketPriceType: "NORMAL"
        // volume: this.quantity
      };
      console.log("paramsparams:params:params:params::", params);
      if (this.radioType == 1) {
        params.orderPriceType = orderPriceTypeEnum.in.LIMIT;
        params.price = this.entrustPrice;
      } else {
        params.orderPriceType = orderPriceTypeEnum.in.MARKET;
      }
      this.close(params)
        .then(res => {
          _this.$vux.toast.text(this.$t("futures.text9"), "middle");
        })
        .catch(e => {
          _this.$vux.toast.text(`${e}`, "middle");
        });

      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.number-popup {
  background: none;
  top: 70%;
  margin: 0 auto;
  margin-top: -4rem;
  overflow: initial !important;
  .number-container {
    overflow: hidden;
    &::before {
      position: absolute;
      content: "";
      display: block;
      height: 0.08rem;
      width: 5.2rem;
      top: 0;
      background: @blueColor;
      left: 50%;
      transform: translateX(-50%);
    }
    width: 5.2rem;
    margin: 0 auto;
    background: @bodyBg;
    border-radius: 6px;
    // padding: 0.2rem 0.5rem 0.42rem 0.5rem;
    font-size: 0.28rem;
    color: @darkBlueGrey;

    .content {
      padding: 0 0.4rem 0;
    }
    .title {
      text-align: center;
      // border-bottom: 1px solid rgb(220, 222, 227);
      font-size: 0.32rem;
      color: @txtColor;
      padding: 20px 0;
    }
    .desc-title {
      font-size: 0.28rem;
      margin-top: 0.16rem;
      color: @txtColor;
      span {
        &:nth-of-type(2) {
          color: @blueyGrey;
        }
      }
    }
    .number-info {
      margin-top: 0.2rem;
      // padding-right: 0.5rem;
      display: flex;
      align-items: center;
      .label {
        // flex: 0 0 0.84rem;
        color: @darkBlueGrey;
        font-size: 0.28rem;
        margin-right: 0.14rem;
      }
      /deep/.add-input {
        width: 3.04rem;
        /deep/.din-medium {
          font-size: 0.32rem;
        }
      }
    }
    .desc {
      font-size: 0.2rem;
      margin-top: 0.2rem;
      color: @grey2Standard;
    }
    // .last-price {
    //   margin: 0.26rem 0 0.3rem 0;
    // }
    // .radio{
    //   display: inline-block;
    // }
    // .add-input {
    // display: inline-block;
    // }
  }
}
.commission-price {
  p {
    margin-top: 0.4rem;
    font-size: 0.2rem;
    color: #687284;
  }
}
.kuang {
  text-align: center;
  width: 3.4rem;
  height: 0.52rem;
  background-color: rgb(220, 222, 227);
  line-height: 0.52rem;
  font-size: 0.4rem;
  color: rgb(104, 114, 132);
}
</style>
