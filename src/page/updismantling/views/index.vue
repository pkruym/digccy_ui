<template>
  <model-full class="router fixd-wrap" :preventGoBack="true" @prev="setAuto">
    <div class="header" slot="header"></div>
    <div class="header" slot="header">
      <div class="header-info">{{ $t("futures.position.text9") }}</div>
    </div>
    <div slot="right" class="tip-btn" @click="tip">
      {{ $t("common.title1") }}
    </div>

    <div class="auto">
      <!-- <Head></Head> -->
      <list
        @hands="hands"
        @loss="loss"
        @profit="profit"
        v-for="(item, index) in PALOrderListData"
        :data="item"
        :zIndex="index"
        :key="index"
      ></list>
      <flex-btn @reset="reset" @save="save"></flex-btn>

      <popup v-if="show" v-model="show" class="number-popup">
        <div class="number-container">
          <div class="title">{{ title }}</div>
          <inputNum
            v-model="PALInputValue"
            class="mid input-num"
            :min="
              _min(
                isLoss ? 'stopLossPrice' : 'stopProfitPrice',
                index,
                PALOrderListData[index]
              )
            "
            :max="
              _max(
                isLoss ? 'stopLossPrice' : 'stopProfitPrice',
                index,
                PALOrderListData[index]
              )
            "
            :step="minWave"
            :precision="2"
            :validateOnInput="true"
            @increaseChange="increaseChange"
            @decreaseChange="decreaseChange"
          ></inputNum>
          <btn @cancle="cancle" @confrim="confrim"></btn>
        </div>
      </popup>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";

import {
  SaveParam,
  RemoveParam,
  CheckAndGetParam
} from "@/assets/js/dismantling";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

import Head from "./../components/head";
import List from "./../components/list";
import FlexBtn from "./../components/flex-btn";
import btn from "element/base-confrim-button";
import addBtn from "element/base-add-input";
// import { protoInit, close } from "@/assets/js/probuf";
import { compare } from "@/assets/js/add-remove";

import { Popup, dateFormat } from "vux";

import UUID from "uuid";

import {
  orderPriceTypeEnum,
  directEnum,
  offsetEnum
} from "@/assets/js/utils/constant";

export default {
  components: {
    ModelFull,
    Head,
    Popup,
    List,
    FlexBtn,
    btn,
    addBtn
  },
  data() {
    return {
      params: {},
      SELL: directEnum.in.SELL,
      BUY: directEnum.in.BUY,
      show: false,
      num: "",
      list: [],
      handlesNum: false,

      perUnitLimitLossAmount: 0,
      perUnitLimitProfitAmount: 0,

      isQuantity: false,
      isLoss: false,
      isProfit: false,

      inputValue: "",
      PALInputValue: "",
      index: 0,
      nowNum: 0,
      isError: false,
      mave: 0,
      radio: "auto",
      PALOrderListData: [],
      OldPALOrderListData: [],

      tabIndex: 0,
      tabList: [
        {
          name: "自动拆分",
          value: "auto"
        },
        {
          name: "按1手拆分",
          value: "handle"
        }
      ]
    };
  },
  created() {},
  computed: {
    ...mapState(["autoList", "isReset"]),
    ...mapGetters({
      positionList: "actual/position/positionList",
      orderList: "actual/order/orderList",
      commodityNo: "trading/symbol",
      contractNo: "trading/contractNo",
      tradingId: "trading/tradingId",
      contractName: "trading/contractName",
      minWave: "trading/minWave",

      lastPrice: "trading/lastPrice",
      orderPrice: "trading/orderPrice",

      lastPriceStr: "trading/lastPriceStr",

      riskPriceList: "trading/riskPriceList",

      askPrice: "trading/askPrice",
      bidPrice: "trading/bidPrice",

      pal: "trading/pal",
      direct: "trading/direct", // 可能为''
      remainVolume: "trading/remainVolume",
      userInfo: "user/userInfo",
      volume: "trading/volume",
      freezeVolume: "trading/freezeVolume",
      pricePrecision: "trading/pricePrecision"
    }),
    cptData() {
      let obj = {
        name: "",
        direct: "",
        volume: 0,
        close: 0,
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
    },

    title() {
      if (this.isQuantity) {
        return "设置手数";
      }
      if (this.isLoss) {
        return this.$t("common.text16");
      }
      if (this.isProfit) {
        return this.$t("common.text15");
      }
    },
    basePrice() {
      // 为了兼容两个止损止盈，计算基准价
      if (this.$route.query.pal == "order") {
        return this.orderPrice;
      } else if (this.$route.query.pal == "position") {
        return this.lastPrice;
      }
      return 0;
    },
    cptAddInputValueSum() {
      let arr = this.PALOrderListData;
      let newNum = 0;
      for (let i = 0; i < arr.length; i++) {
        if (this.show && i == this.index) {
          newNum += this.inputValue;
        } else {
          newNum += arr[i].volume;
        }
      }
      return newNum;
    },
    cptNumSum() {
      let arr = this.PALOrderListData;
      let num = 0;
      for (let i = 0; i < arr.length; i++) {
        num += arr[i].volume;
      }
      return num;
    }
  },
  mounted() {
    this.open();
    // console.log("定点回来哦:", this.riskPriceList);
  },
  methods: {
    open() {
      console.log("定点回来哦定点回来哦定点回来哦", this.$route.params);
      let item = this.$route.params;
      let arr = [];
      if (this.$route.query.pal == "position") {
        arr.push({
          id: item.id,
          volume: item.volume,
          direct: item.direct,
          symbol: item.symbol,
          newPrice: item.newPrice,
          stopProfitPrice: item.stopProfitPrice,
          stopLossPrice: item.stopLossPrice
        });
      } else {
        arr.push({
          id: item.id,
          volume: item.volume,
          direct: item.direct,
          symbol: item.symbol,

          newPrice: item.newPrice,
          stopLossAmount: item.stopLossAmount,
          stopProfitAmount: item.stopProfitAmount
        });
      }

      this.setPALOrderList(arr);
    },
    // 点按钮
    changeRadio(item, index) {
      // if(this.tabIndex === index );return;
      this.tabIndex = index;
      this.radio = item.value;
    },
    tip() {
      this.$router.push("/rules/zhiying");
    },

    setAuto() {
      if (window.history.length > 2) {
        this.$router.back(-1);
      } else {
        this.$router.push({ path: "/position" });
      }
    },
    ...mapActions({
      setpositionProSetting: "actual/position/riskPrice", //设置持仓止盈止损
      setOrderProSetting: "actual/order/riskPrice", //设置委托止盈止损
      getContractOrderList: "actual/position/list", // 刷新持仓订单
      getEntrustOrderList: "actual/order/list" // 刷新委托订单
    }),
    ...mapMutations({
      changeContract: "trading/changeContract"
    }),

    // 设置数组
    setPALOrderList(arr) {
      this.PALOrderListData = arr;
      this.OldPALOrderListData = this.cloneDeep(arr);
    },

    cloneDeep(arr) {
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        if (this.$route.query.pal == "position") {
          let o = {
            stopLossPrice: val.stopLossPrice,
            stopProfitPrice: val.stopProfitPrice,
            direct: val.direct,
            newPrice: val.newPrice,
            volume: val.volume,
            id: val.id
          };
          newArr.push(o);
        } else {
          let o = {
            direct: val.direct,
            newPrice: val.newPrice,
            stopLossAmount: val.stopLossAmount,
            stopProfitAmount: val.stopProfitAmount,
            volume: val.volume,
            id: val.id
          };
          newArr.push(o);
        }
      }
      return newArr;
    },

    reset() {
      if (this.$route.query.pal === "position") {
        this.setPALOrderList([
          {
            minWave: this.minWave,
            stopLossPrice: 0,
            stopProfitPrice: 0,
            volume: this.remainVolume
            // volume: this.data.volume
          }
        ]);
      } else {
        this.setPALOrderList([
          {
            minWave: this.minWave,
            stopProfitAmount: 0,
            stopLossAmount: 0,
            volume: this.remainVolume
            // volume: this.data.volume
          }
        ]);
      }
    },
    cancle() {
      this.show = false;
      this.isProfit = false;
      this.isQuantity = false;
      this.isLoss = false;
    },

    save() {
      let params;
      let _this = this;
      if (this.$route.query.pal == "position") {
        params = {
          stopProfitPrice: this.PALOrderListData[0].stopProfitPrice,
          stopLossPrice: this.PALOrderListData[0].stopLossPrice,
          positionId: this.tradingId
        };

        this.setpositionProSetting(params)
          .then(res => {
            this.$emit("closeBox", { show: false, sure: true });
            this.getContractOrderList();
            _this.$vux.toast.text(
              this.$t("message.operation.message14"),
              "top"
            );
            this.$router.push("/position");
          })
          .catch(e => {
            _this.$vux.toast.text(e, "middle");
          });
      } else if (this.$route.query.pal == "order") {
        params = {
          orderId: this.tradingId,
          stopLossAmount: this.PALOrderListData[0].stopLossAmount,
          stopProfitAmount: this.PALOrderListData[0].stopProfitAmount
        };
        this.setOrderProSetting(params)
          .then(res => {
            this.$emit("closeBox", { show: false, sure: true });
            this.getEntrustOrderList();
            _this.$vux.toast.text(
              this.$t("message.operation.message14"),
              "top"
            );
            this.$router.push("/entrust");
          })
          .catch(e => {
            _this.$vux.toast.text(e, "middle");
          });
      }
    },
    decreaseChange(val, i, row) {
      let num = 1 / Math.pow(10, this.pricePrecision);
      let pal = this.$route.query.pal;
      if (this.PALOrderListData[0].direct == "BUY") {
        if (this.isLoss) {
          if (this.PALInputValue == 0) return;
          this.PALInputValue = this.subtr(this.PALInputValue, num);
        } else {
          //判断持仓订单
          if (this.$route.query.pal === "position") {
            if (
              this.subtr(this.PALInputValue, num) <
              this.PALOrderListData[0].newPrice
            )
              return;
          } else {
            if (this.subtr(this.PALInputValue, num) < this.orderPrice) return;
          }

          this.PALInputValue = this.subtr(this.PALInputValue, num);
        }
      } else {
        if (this.isLoss) {
          //判断持仓订单
          if (this.$route.query.pal === "position") {
            if (
              this.subtr(this.PALInputValue, num) <
              this.PALOrderListData[0].newPrice
            )
              return;
          } else {
            if (this.subtr(this.PALInputValue, num) < this.orderPrice) return;
          }
          this.PALInputValue = this.subtr(this.PALInputValue, num);
        } else {
          if (this.PALInputValue > this.PALOrderListData[0].newPrice) return;
          this.PALInputValue = this.subtr(this.PALInputValue, num);
        }
      }
    },
    increaseChange(val, i, row) {
      let num = 1 / Math.pow(10, this.pricePrecision);
      if (this.PALOrderListData[0].direct == "BUY") {
        if (this.isLoss) {
          //判断持仓订单
          if (this.$route.query.pal === "position") {
            if (
              this.addNum(this.PALInputValue, num) >
              this.PALOrderListData[0].newPrice
            )
              return;
          } else {
            if (this.addNum(this.PALInputValue, num) > this.orderPrice) return;
          }
          this.PALInputValue = this.addNum(this.PALInputValue, num);
          // console.log('止损价买涨加法');
        } else {
          // if (this.PALInputValue < this.PALOrderListData[0].newPrice) return;
          this.PALInputValue = this.addNum(this.PALInputValue, num);
        }
      } else {
        if (this.isLoss) {
          // if (this.PALInputValue < this.PALOrderListData[0].newPrice) return;
          this.PALInputValue = this.addNum(this.PALInputValue, num);
        } else {
          //判断持仓订单
          if (this.$route.query.pal === "position") {
            if (
              this.addNum(this.PALInputValue, num) >
              this.PALOrderListData[0].newPrice
            )
              return;
          } else {
            if (this.addNum(this.PALInputValue, num) > this.orderPrice) return;
          }
          this.PALInputValue = this.addNum(this.PALInputValue, num);
        }
      }
    },

    _focus(val, i, row) {
      this.$nextTick(
        (() => {
          let data = this.PALOrderListData[i];
          if (this.$route.query.pal == "position") {
            this.PALOrderListData[0].newPrice = Number(this.lastPrice).toFixed(
              this.pricePrecision
            );
            if (val == "stopLossPrice") {
              // console.log(data,this.lastPrice);

              this.PALInputValue = data.stopLossPrice
                ? data.stopLossPrice
                : Number(this.lastPrice).toFixed(this.pricePrecision);
            } else if (val == "stopProfitPrice") {
              this.PALInputValue = data.stopProfitPrice
                ? data.stopProfitPrice
                : Number(this.lastPrice).toFixed(this.pricePrecision);
            }
          } else {
            if (val == "stopLossPrice") {
              // console.log(data,this.lastPrice);
              this.PALInputValue = data.stopLossAmount
                ? data.stopLossAmount
                : this.orderPrice;
            } else if (val == "stopProfitPrice") {
              this.PALInputValue = data.stopProfitAmount
                ? data.stopProfitAmount
                : this.orderPrice;
            }
          }
          // 止损å
        }).bind(this)
      );
    },

    _min(val, i, row) {},
    _max(val, i, row) {},
    hands(index) {
      this.inputValue = 0;
      this.handlesNum = true;
      this.index = index;
      this.isQuantity = true;
      this.show = true;
      this.inputValue = this.PALOrderListData[0].volume;
    },
    loss(index) {
      this.handlesNum = false;
      this.isLoss = true;
      this.show = true;
      this._focus(
        this.isLoss ? "stopLossPrice" : "stopProfitPrice",
        this.index,
        this.PALOrderListData[0]
      );
    },
    profit(index) {
      this.isProfit = true;
      this.handlesNum = false;
      this.show = true;
      this._focus(
        this.isLoss ? "stopLossPrice" : "stopProfitPrice",
        this.index,
        this.PALOrderListData[0]
      );
    },

    cancle() {
      this.show = false;
      this.isProfit = false;
      this.isQuantity = false;
      this.isLoss = false;
    },
    confrim() {
      let index = this.index;
      let _point = "";
      if (this.PALInputValue.toString().split(".")[1]) {
        _point = this.PALInputValue.toString().split(".")[1];
        if (_point.length >= this.pricePrecision) {
          this.PALInputValue = Number(this.PALInputValue).toFixed(
            this.pricePrecision
          );
        }
      } else {
        this.PALInputValue = Number(this.PALInputValue).toFixed(
          this.pricePrecision
        );
      }
      // if(_point === this.pricePrecision)
      if (this.$route.query.pal == "position") {
        if (this.isLoss) {
          //买涨的止损价计算输入框范围
          if (this.PALOrderListData[0].direct == "BUY") {
            if (this.PALInputValue > this.PALOrderListData[0].newPrice) {
              this.$vux.toast.text("止损价不能高于最新价", "middle");
              return;
            }
          } else {
            //买跌的止损价计算输入框范围
            if (this.PALInputValue < this.PALOrderListData[0].newPrice) {
              this.$vux.toast.text("止损价不能低于最新价", "middle");
              return;
            }
          }
          this.PALOrderListData[index].stopLossPrice = this.PALInputValue;
        } else {
          //买涨的止盈价计算输入框范围
          if (this.PALOrderListData[0].direct == "BUY") {
            if (this.PALInputValue < this.PALOrderListData[0].newPrice) {
              this.$vux.toast.text("止盈价不能低于最新价", "middle");
              return;
            }
          } else {
            //买跌的止盈价计算输入框范围
            if (this.PALInputValue > this.PALOrderListData[0].newPrice) {
              this.$vux.toast.text("止盈价不能高于最新价", "middle");
              return;
            }
          }
          this.PALOrderListData[index].stopProfitPrice = this.PALInputValue;
        }
      } else {
        if (this.isLoss) {
          //买涨的止损价计算输入框范围
          if (this.PALOrderListData[0].direct == "BUY") {
            if (this.PALInputValue > this.orderPrice) {
              this.$vux.toast.text("止损价不能高于委托价", "middle");
              return;
            }
          } else {
            //买跌的止损价计算输入框范围
            if (this.PALInputValue < this.orderPrice) {
              this.$vux.toast.text("止损价不能低于委托价", "middle");
              return;
            }
          }
          this.PALOrderListData[index].stopLossAmount = this.PALInputValue;
        } else {
          //买涨的止盈价计算输入框范围
          if (this.PALOrderListData[0].direct == "BUY") {
            if (this.PALInputValue < this.orderPrice) {
              this.$vux.toast.text("止盈价不能低于委托价", "middle");
              return;
            }
          } else {
            //买跌的止盈价计算输入框范围
            if (this.PALInputValue > this.orderPrice) {
              this.$vux.toast.text("止盈价不能高于委托价", "middle");
              return;
            }
          }
          this.PALOrderListData[index].stopProfitAmount = this.PALInputValue;
        }
      }
      this.show = false;
      this.isProfit = false;
      this.isQuantity = false;
      this.isLoss = false;
    }
  }
};
</script>
<style lang="less" scoped>
.router {
  height: 100%;
}
.header {
  // background: #151E26;
  position: relative;
}
.tip-btn {
  font-size: 0.28rem;
  color: @darkSkyBlue;
  position: absolute;
  right: 0.3rem;
  top: 0;
  width: 0.8rem;
  text-align: right;
}
.router {
  background: @bodyBg !important;
}
.tab {
  display: flex;
  width: 80%;
  top: 0.24rem;
  left: 0.2rem;
  position: absolute;
  & > div {
    text-align: center;
    flex: 1;
    color: rgb(148, 159, 172);
    font-size: 0.32rem;
    position: relative;
    z-index: 999999;
    &:nth-of-type(1) {
      margin-right: 0.2rem;
    }
    &.active {
      color: rgb(42, 204, 166);
      &::after {
        position: absolute;
        content: "";
        width: 0.5rem;
        height: 3px;
        background: rgb(42, 204, 166);
        bottom: -4px;
        left: 50%;
        margin-left: -0.26rem;
      }
    }
  }
}
.auto {
  padding-bottom: 2rem;
  .number-popup {
    background: none;
    top: 70%;
    margin: 0 auto;
    margin-top: -4rem;
    overflow: initial !important;
    .number-container {
      width: 5.2rem;
      margin: 0 auto;
      background: @bodyBg;
      border-radius: 6px;
      // padding: 0.2rem 0.5rem 0.42rem 0.5rem;
      overflow: hidden;
      &::before {
        position: absolute;
        content: "";
        display: block;
        height: 0.08rem;
        width: 5.2rem;
        top: 0;
        // z-index: 5000;
        // background: url(~@/assets/img/2_0/im_tanchuang_top@2x.png) no-repeat
        //   100% 100% / cover;
        background: @blueColor;
        left: 50%;
        transform: translateX(-50%);
      }
      .title {
        text-align: center;
        font-size: 0.36rem;
        color: @darkBlueGrey;
        padding: 20px 0;
      }
      .add-btn {
        margin-top: 0.4rem;
        padding: 0 0.8rem;
      }
      .btn {
        display: flex;
        margin-top: 0.48rem;
        & > div {
          flex: 1;
          text-align: center;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.32rem;
          border-radius: 4px;
          &.cancle {
            margin-right: 0.44rem;
            color: @darkSkyBlue;
            border: 1px solid @darkSkyBlue;
          }
          &.confrim {
            color: #e0ecf7;
            background: @darkSkyBlue;
          }
        }
      }
    }
  }
}
</style>
