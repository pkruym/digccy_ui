<template>
  <div>
    <yd-popup v-model="showBuy" id="buyDetail" class="pc-popup radius" position="bottom" width="100%" :close-on-masker="false" @closeBuy="showBuy = false" masker-opacity="0">
      <div class="content buy" :class="{ moni: !currentStatus }" @click="showPriceType = false">
        <div class="buy-detail">
          <div class="coupons-main">
            <div class="pop-head">
              <div class="pop-left">
                <div class="new-price">
                  <!-- 最新价 -->
                  <div>{{ $t("leverageTrading.newPrice") }}</div>
                  <p class="green">
                    <span class="medium">{{ lastPrice }}</span>
                    <!-- <span>+16.2% </span> -->
                  </p>
                </div>
                <div class="bz-zy" v-if="$tradeType.tradeType != 'FUTURE'">
                  <div class="radio">
                    <yd-radio-group v-model="currentindex" color="#3D7FFF" size="14">
                      <!-- 标准 专业 -->
                      <yd-radio val="0" @click.native="changeOption($event, 0)">{{ $t("leverageTrading.basic") }}</yd-radio>
                      <yd-radio val="1" @click.native="changeOption($event, 1)">{{ $t("leverageTrading.pro") }}</yd-radio>
                    </yd-radio-group>
                  </div>
                </div>
              </div>
              <div class="pop-cancel" @click="closeBuy">
                <i class="tanchuang_cancel"></i>
              </div>
            </div>
            <!-- 距离交割还剩 -->
            <p class="jiaoge" v-if="$tradeType.tradeType == 'FUTURE'">
              {{ $t("leverageTrading.deliverytips") }}{{ expiredTimeCount }}
              {{ $t("leverageTrading.day") }}
            </p>
            <div class="wrap-box marbot">
              <div class="left-label">
                <div class="selectoption" @click.stop="showPriceType = true">
                  <span>{{ placePriceText }}</span>
                  <span class="arrow down"></span>
                </div>
                <div class="select" v-if="showPriceType">
                  <!-- 市价 委托价 -->
                  <span @click="selectPriceType(0)">{{
                    $t("leverageTrading.marketPrice")
                  }}</span>
                  <span @click="selectPriceType(1)">{{
                    $t("leverageTrading.commissionPrice1")
                  }}</span>
                </div>
              </div>
              <div class="right-box">
                <div class="input-add middle">
                  <input class="input" v-if="buyingPriceType != 'MARKET'" @blur="blurChange" v-model="buyingEntrustPrice" :placeholder="placePriceText" type="number" />
                  <input class="input" v-else :value="placePriceText" readonly />
                  <span class="dw">USDT</span>
                  <div class="action">
                    <span @click="remove()">-</span>
                    <span @click="add()">+</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="wrap-box marbot line05" v-if="currentindex == 1">
              <div class="left-label">
                <!-- 购买数量 -->
                <span>{{ $t("buy.text9") }}</span>
                <span v-if="$tradeType.tradeType !== 'FUTURE'" class="small">({{ symbol.split("/")[0] }}{{ $t("buy.text66") }})</span>
              </div>
              <div class="right-box ">
                <div class="input-add middle">
                  <input class="input" type="number" :placeholder="getquantitytext" v-model="totalQuantity" />
                  <span class="dw">{{
                    $tradeType.tradeType == "FUTURE"
                      ? $t("leverageTrading.bow")
                      : symbol.split("/")[0]
                  }}</span>
                  <div class="action">
                    <span @click="removebuynum()">-</span>
                    <span @click="addbuynum()">+</span>
                  </div>
                </div>
                <div class="leages silder">
                  <template v-for="pos in positionList">
                    <div :class="{ active: pos.check }">
                      <span @click="checkPosition(pos)">{{ pos.name }}{{ $t("buy.text67") }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <div class="wrap-box line05 btc geshu" v-if="currentindex == 0">
              <div class="left-label">
                <span>{{ $t("buy.text9") }}</span>
                <span class="small">({{ symbol.split("/")[0] }}{{ $t("buy.text66") }})</span>
              </div>
              <div class="right-box leages">
                <div class="shuliang">
                  <template v-for="(item, index) in getvolumeList">
                    <span :key="index" :class="nowQuantity === index ? 'active' : ''" @click="quantityClick(item, index)">
                      {{ item }}</span>
                  </template>
                </div>
              </div>
            </div>
            <div class="label-box line05 btc" v-if="currentindex == 1">
              <div class="box">
                <!-- 杠杆倍数 -->
                <div class="label">{{ $t("buy.text68") }}</div>
                <div class="right">
                  <div class="leages">
                    <div class="shuliang">
                      <template v-for="(item, index) in leverageList">
                        <span :class="item === currentLeverage ? 'active' : ''" :key="index" @click="leverageClick(item, index)">
                          {{ item }}X</span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="label-box line05 zhisun">
              <div class="box">
                <!-- 止损止盈 -->
                <div class="label">
                  {{ $t("leverageTrading.profitLossMargin") }}
                </div>
                <div class="right">
                  <p>
                    <!-- 杠杆 止盈 止损 -->
                    <span>{{ $t("buy.text69") }}≈{{ currentLeverage }}X</span> /
                    <span>{{ $t("buy.text70") }}+{{ cptmaxProfit }}</span> /
                    <span>{{ $t("buy.text71") }}-{{ cptmaxLoss }}</span>
                  </p>
                </div>
              </div>
            </div>

            <div class="label-box line05">
              <div class="box">
                <!-- 保证金 -->
                <div class="label" @click.stop="alertTips(4)">
                  {{ $t("buy.text72") }} <i class="icon-wenhao"></i>
                </div>
                <div class="right">
                  <p class="default">{{ '≈'+ getDeposit }} USDT</p>
                </div>
              </div>
            </div>
            <div class="label-box line05">
              <div class="box">
                <div class="label">
                  <!-- 开仓手续费 -->
                  {{ $t("common.text19") }}
                  <i class="icon-wenhao" @click.stop="alertTips(0)"></i>
                </div>
                <div class="right">
                  <p :class="[openFee == 0 ? '' : 'default']">
                    {{
                      openFee == 0 && getCurrentLucky
                        ? $t("buy.text73")
                        : '≈'+ toFixedStr(openFee) + "USDT"
                    }}
                  </p>
                </div>
              </div>
              <!-- <div class="tips">由于价格波动手续费以实际成交价为主！</div> -->
            </div>
            <div class="label-box line05" v-if="buyingPriceType == 'MARKET' && currentStatus">
              <div class="box" @click="goToLucky(0)">
                <!-- 保证金券 -->
                <div class="label icon" @click.stop="alertTips(1)">
                  {{ $t("buy.text74") }} <i class="icon-wenhao"></i>
                </div>
                <div class="right">
                  <p class="danger right-arrow" v-if="luckyDataCount > 0 && !getCurrentLucky">
                    {{ luckyDataCount }}{{ $t("buy.text75") }}
                  </p>
                  <p class="danger right-arrow" v-else-if="getCurrentLucky">
                    -{{ getCurrentLucky.luckyMoney }} USDT
                  </p>
                  <!-- 暂无可用 -->
                  <p class="gray" v-else>{{ $t("buy.text76") }}</p>
                </div>
              </div>
              <!-- <div class="tips">可抵扣保证金</div> -->
            </div>
            <div class="label-box line05" v-if="buyingPriceType == 'MARKET' && currentStatus">
              <div class="box" @click="goToLucky(1)">
                <!-- 手续费折扣券 -->
                <div class="label icon discount" @click.stop="alertTips(3)">
                  {{ $t("common.alertTitle4") }}<i class="icon-wenhao"></i>
                </div>
                <div class="right">
                  <p class="danger right-arrow" v-if="handluckyCount > 0 && !getHandLucky && openFee != 0">
                    {{ handluckyCount }}{{ $t("buy.text75") }}
                  </p>
                  <p class="danger right-arrow" v-else-if="getHandLucky">
                    -{{ calcHandMoney }} USDT
                  </p>
                  <!-- 暂无可用 -->
                  <p class="gray" v-else>{{ $t("buy.text76") }}</p>
                </div>
              </div>
              <!-- <div class="tips">可抵扣保证金</div> -->
            </div>
            <!-- <div class="label-box line05" v-if="currentStatus">
              <div class="box">
                <div class="label icon income" @click.stop="alertTips(2)">
                  {{ $t("buy.text77") }}<i class="icon-wenhao"></i>
                </div>
                <div class="right">
                  <p
                    class="danger"
                    v-if="personalMsgKey[5].value > 0 && isOpenIncome"
                  >
                    -{{ luckyLossMoney }} USDT
                  </p>
                  <p class="gray" v-else>{{ $t("buy.text76") }}</p>
                  <div class="switch">
                    <inline-x-switch
                      v-model="isOpenIncome"
                      @on-change="changeIncome"
                      :disabled="personalMsgKey[5].value <= 0"
                    ></inline-x-switch>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
          <!-- <div class="Availablefunds">
      <span
        >{{ $t("buy.text50") }}：{{
          token ? personalMsgKey[1].value || 0 : "--"
        }}USDT</span
      >
    </div> -->
          <div class="flex-box">
            <div class="buy-btn">
              <div>
                <div class="total-top">
                  <div @click.stop="alertTips(5)">
                    {{ $t("buy.text23") }} <i class="icon-wenhao"></i>
                  </div>
                  <div class="medium" v-if="$currency == 3">
                    {{ conversion1 }} <span>USDT</span>
                  </div>
                  <div class="medium" v-else>
                    {{ conversion1 }} <span>USDT</span>
                  </div>
                </div>
              </div>
              <div @click="buyApi" :class="[buyType == 1 ? 'bGreen' : 'bRed']">
                {{ btnText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import { OrderByArray } from "@/assets/js/utils";

import modelFull from "element/model-full";
import baseRadio from "element/base-radio";
import addBtn from "element/base-add-input";

import { Checklist, Popup, InlineXSwitch } from "vux";
import { mapGetters, mapActions, mapMutations } from "vuex";
import * as add from "@/assets/js/add-remove";

import {
  orderPriceTypeEnum,
  directEnum,
  offsetEnum
} from "@/assets/js/utils/constant";
import mixinsBuyPop from "./buy-pop";
export default {
  mixins: [mixinsBuyPop],
  props: {
    buyType: {
      type: Number,
      default: 1
    },
    buySymbol: {
      type: String,
      default: ""
    }
  },
  components: {
    modelFull,
    addBtn,
    Checklist,
    baseRadio,
    Popup,
    InlineXSwitch
  },
  data() {
    return {
      data: {
        preQuantitySet: [
          { quantity: 50 },
          { quantity: 100 },
          { quantity: 150 },
          { quantity: 200 },
          { quantity: 250 },
          { quantity: 350 },
          { quantity: 400 },
          { quantity: 500 }
        ]
      },

      buyingPriceType: "MARKET",
      params: {},
      totalQuantity: "",
      maxtotalQuantity: 100,
      leverage: 1,
      quantityNumber: "",
      nowQuantity: 0,
      nowmargin: 0,
      template: [],
      nowLoss: 0,
      SetProfitText: "设置",
      SetLossText: "设置",
      buyingEntrustPrice: 0,
      showToast: false,
      showArray: [
        {
          title: "履约保证金",
          msg:
            "履约保证金是平台冻结在第三方支付公司,用于亏损时的赔付义务费用,根据平仓实际盈亏结算。"
        },
        {
          title: "交易综合费",
          msg: "交易综合费指交易时需要收取的手续费,一经交易将不予退回。"
        },
        {
          title: "延期费",
          msg:
            "持仓订单触发隔夜条件系统将自动收取延期费用于过夜,未触发隔夜条件则不收取"
        },
        {
          title: "隔夜保证金",
          msg:
            "持仓订单触发隔夜条件,会冻结隔夜保证金,没有触发隔夜条件,则不会冻结"
        }
      ],
      value: "0",
      token: localStorage.getItem("token"),
      isUp: false,
      isFull: false,
      currentindex: "0",
      marginvalue: 0,
      successData: {
        volume: 0
      },
      isOpenIncome: true // 是否开启红包收益账户，默认开启
    };
  },
  computed: {
    ...mapGetters({
      personalMsgKey: "actual/account/personalMsgKey",
      lastPrice: "trading/lastPrice",
      getSOPSetting: "actual/stoplossorprofit/getSOPSetting", // 止损止盈点数，可能为null
      symbol: "trading/symbol",
      currency: "trading/currency", // 汇率名称“USD”
      fee: "trading/openFee", // 交易综合费
      deposit: "trading/margin", // 保证金
      isLogin: "user/isLogin",
      userInfo: "user/userInfo",
      volumeList: "trading/volumeList", // 购买个数
      leverageList: "trading/leverageList", // 杠杆倍数
      minBuyVolume: "trading/minBuyVolume", // 最小购买量
      pricePrecision: "trading/pricePrecision", // 价格精度
      volumePrecision: "trading/volumePrecision", // 购买量精度
      contractInfo: "contractInfo/contractInfo",
      perContractValue: "trading/perContractValue", // 合约面值
      expiredTime: "trading/expiredTime", // 交割时间
      currentLeverage: "trading/currentLeverage" //杠杆
    }),

    expiredTimeCount() {
      let now = new Date(new Date());
      let date = this.expiredTime.substring(0, 19);
      let sdate = new Date(date.replace(/-/g, "/"));
      let days = sdate.getTime() - now.getTime();
      let day = Math.floor(days / (1000 * 60 * 60 * 24));

      return (day ? (isNaN(day) ? 0 : day) : 0) + 1;
    },
    getvolumeList() {
      return OrderByArray(this.volumeList);
    },
    getleverageList() {
      return OrderByArray(this.leverageList);
    },
    cptbuysum() {
      return parseFloat(
        (
          (this.personalMsgKey[1].value /
            this.lastPrice /
            this.perContractValue) *
          this.currentLeverage
        ).toFixed(this.volumePrecision)
      );
    },
    usdtBuysum() {
      // 杠杆仓位
      let all =
        Number(this.personalMsgKey[1].value * this.currentLeverage) /
        this.lastPrice;
      return this.toFixedStr(all, this.volumePrecision);
    },
    getquantitytext() {
      if (this.$tradeType.tradeType == "FUTURE") {
        return (
          this.$t("buy.text11") +
          " " +
          this.cptbuysum +
          " " +
          this.$t("leverageTrading.bow")
        );
      } else {
        return this.$t("buy.text11") + " " + this.usdtBuysum + " 个";
      }
    },
    getDeposit() {
      let totalQuantity = this.totalQuantity || 0;
      let val = 0;
      let num = 0;
      if (this.currentindex == 0) {
        num =
          ((this.buyingPriceType == "MARKET"
            ? this.lastPrice
            : this.buyingEntrustPrice) *
            totalQuantity *
            (this.$tradeType.tradeType != "LEVER"
              ? this.perContractValue
              : 1)) /
          (this.currentLeverage || 0);
        num = num || 0;
      } else {
        num =
          ((this.buyingPriceType == "MARKET"
            ? this.lastPrice
            : this.buyingEntrustPrice) *
            totalQuantity *
            (this.$tradeType.tradeType != "LEVER"
              ? this.perContractValue
              : 1)) /
          (this.currentLeverage || 0);
        num = num || 0;
      }
      val = Number(Number(num).toFixed(2));
      return val;
    },
    getMarginList() {
      let total = this.accAdd(this.getDeposit, this.openFee);
      return parseFloat(total).toFixed(2);
    },
    btnText() {
      if (this.buyType == 1) {
        return this.value == 0 ? this.$t("buy.text51") : this.$t("buy.text53");
      }
      if (this.buyType == 2) {
        return this.value == 0 ? this.$t("buy.text52") : this.$t("buy.text54");
      }
    },
    cptmaxLoss() {
      // 止损金额=   保证金*止损比例
      // console.log("止损金额", this.contractInfo);
      return (this.getDeposit * this.contractInfo.defaultLoss).toFixed(2);
    },
    cptmaxProfit() {
      // 止盈金额 = 保证金*止盈比例
      return (this.getDeposit * this.contractInfo.defaultProfit).toFixed(2);
    },

    conversion1() {
      let _totalQuantity = +this.totalQuantity;
      let _getDeposit = +this.getDeposit;
      // let val = (+this.getMarginList).toFixed(2);
      let redAccount = +this.personalMsgKey[5].value;
      let _openFee = +this.openFee;
      let val = (_getDeposit + _openFee).toFixed(2); // 保证金 + 手续费
      if (_totalQuantity > 0) {
        //todo:luckyLossMoney 红包收益减免
        // 有红包减去红包
        if (this.getCurrentLucky) {
          let {
            minLimitValue,
            luckyMoney,
            luckyMoneyType
          } = this.getCurrentLucky;
          if (luckyMoneyType == 1) {
            if (luckyMoney == 1 && _getDeposit > 1) {
              val = val - luckyMoney;
            } else if (luckyMoney == 2 && _getDeposit > 2) {
              val = val - luckyMoney;
            } else if (luckyMoney == 4 && _getDeposit >= 10) {
              val = val - luckyMoney;
            } else if (luckyMoney == 10 && _getDeposit >= 20) {
              val = val - luckyMoney;
            }
            if (
              (luckyMoney == 1 && _getDeposit <= 1) ||
              (luckyMoney == 2 && _getDeposit <= 2)
            ) {
              val = 0;
            }
          } else {
            val = val - luckyMoney;
          }
        }
        if (this.isOpenIncome && redAccount > 0 && val > 0) {
          if (redAccount >= _openFee) {
            val = val - _openFee;
          } else {
            //红包收益小于手续费,抵扣完
            val = val - redAccount;
          }
        }
      }
      if (this.calcHandMoney > 0) {
        val = this.accSub(val, this.calcHandMoney);
      }
      if (Number(val) <= 0) {
        return 0;
      }
      return this.toFixedStr(val);
    },
    cptDeposit() {
      // 杠杆： 最新价*购买数量/100X (默认最大杠杆倍数)
      // return (
      //   parseFloat(this.deposit) * parseFloat(this.totalQuantity)
      // ).toFixed(2);
    },
    cptGetSOPSetting() {
      let { type } = this.$route.query;
      let info = this.getSOPSetting({
        symbol: this.symbol,
        direct: type == 1 ? "BUY" : "SELL"
      });
      return info;
    }
  },

  methods: {
    ...mapActions({
      open: "actual/order/open",
      // userTemplatequery: "user/userTemplatequery",
      // templateRulequery: "user/templateRulequery",
      changeBuyDetail: "actual/stoplossorprofit/changeBuyDetail", //存储跳转止盈止损之前已经设置过的数据
      changeContent: "dialog/changeContent" // Trading dialog 传内容
    }),
    ...mapMutations({
      changeLeverage: "trading/changeLeverage"
    }),

    changeIncome(value) {
      console.log(value);
    },
    getState() {
      this.scoketApi.sendSock(
        {
          moduleId: 14,
          cmdId: 5
        },
        res => { }
      );
    },
    // changebuynum(val) {
    //   this.totalQuantity = val;
    //   console.log(val);
    // },
    removebuynum() {
      let num = 1 / Math.pow(10, this.volumePrecision);

      if (this.$tradeType.tradeType == "LEVER") {
        this.totalQuantity = Number(this.subtr(this.totalQuantity, num));
      } else {
        if (this.totalQuantity == 0) return;
        this.totalQuantity--;
      }
    },
    //委托价 加减
    add() {
      if (this.buyingPriceType == "MARKET") return;
      let num = 1 / Math.pow(10, this.pricePrecision);
      this.buyingEntrustPrice = this.addNum(this.buyingEntrustPrice, num);
    },
    remove() {
      if (this.buyingPriceType == "MARKET") return;
      let num = 1 / Math.pow(10, this.pricePrecision);
      this.buyingEntrustPrice = this.subtr(this.buyingEntrustPrice, num);
    },
    addbuynum() {
      let num = 1 / Math.pow(10, this.volumePrecision);
      if (this.$tradeType.tradeType === "LEVER") {
        this.totalQuantity = Number(
          this.addNum(this.totalQuantity == "" ? 0 : this.totalQuantity, num)
        );
      } else {
        this.totalQuantity =
          isNaN(this.totalQuantity) || this.totalQuantity == ""
            ? 0
            : this.totalQuantity;
        this.totalQuantity++;
      }
    },
    // change(val) {
    //   this.buyingEntrustPrice = val;
    //   this.marginvalue = this.getMarginList[this.nowmargin];
    // },
    _blur() {
      this.buyingEntrustPrice = this.buyingEntrustPrice;
    },
    _blurbuy() {
      this.totalQuantity = this.totalQuantity;
    },

    showQuse(index) {
      this.$vux.alert.show({
        title: this.showArray[index].title,
        content: this.showArray[index].msg,

        buttonText: this.$t("navbar.Gotit"),
        onShow() {
          console.log("Plugin: I'm showing");
        },
        onHide() {
          console.log("Plugin: I'm hiding");
        }
      });
    },
    quantityClick(item, index) {
      this.nowQuantity = index;
      this.totalQuantity = item;
      // this.quantityNumber = item;
    },
    leverageClick(item, index) {
      this.leverage = item;
      this.changeLeverage({ leverage: item });
    },
    SetLoss() {
      if (this.SetLossText == "设置") {
        this.nowLoss = this.lastPrice.toFixed(this.pricePrecision);
        this.SetLossText = "复位";
      } else {
        this.SetLossText = "设置";
        this.nowLoss = 0;
      }
    },
    SetProfit() {
      if (this.SetProfitText == "设置") {
        this.nowProfit = this.lastPrice.toFixed(this.pricePrecision);
        this.SetProfitText = "复位";
      } else {
        this.SetProfitText = "设置";
        this.nowProfit = 0;
      }
    },
    setting() {
      let { type } = this.$route.query;
      this.$router.push({
        name: "buy-upfull",
        query: { commodityNo: this.commodityNo, direct: type }
      });
    },
    fullCancle() {
      this.isFull = false;
    },
    fullConfrim() {
      this.isFull = false;
    },
    upCancle() {
      this.isUp = false;
    },
    upConfrim() {
      this.isUp = false;
    },
    buyClick() {
      if (
        this.totalQuantity === 0 ||
        this.totalQuantity > this.data.perOrderLimit
      ) {
        this.$vux.toast.text(this.$t("buy.text40"), "middle");
        return;
      }

      if (!/^[0-9]*[1-9][0-9]*$/.test(this.totalQuantity)) {
        this.$vux.toast.text(this.$t("buy.text40"), "middle");
        return;
      }
      this.$vux.loading.show({
        text: this.$t("common.loading")
      });
      let that = this;
    },

    checkPrice() {
      let _this = this;
      let price = Number(_this.conversion1);
      if (this.value == 1 && price <= 0) {
        this.$vux.toast.text(this.$t("buy.text55"), "middle");
        return false;
      } else if (price > Number(this.personalMsgKey[1].value)) {
        let _this = this;
        _this.$vux.confirm.show({
          title: this.$t("setText.title"),
          content: this.$t("buy.text56"),
          cancelText: this.$t("common.text3"),
          confirmText: this.$t("dialog.trading.gorecharge"),
          onCancel() {
            return false;
          },
          onConfirm() {
            _this.$router.push({
              path: "/drawmoney/index"
            });
          }
        });
        return false;
      }
      return true;
    },
    buyApi() {
      const _this = this;
      console.log(this.totalQuantity);
      if (this.totalQuantity == 0) {
        this.$vux.toast.text(this.$t("buy.text57"), "middle");
        return false;
      }
      let direct = this.buyType == 1 ? directEnum.in.BUY : directEnum.in.SELL;
      // 获取止损止盈点数
      // 确定
      let params = {
        symbol: this.contractInfo.symbol,
        direct: direct,
        leverage: this.currentLeverage,
        volume: this.totalQuantity,
        useLuckMoneyAccount: this.isOpenIncome
      };
      if (!this.currentStatus) {
        params.useLuckMoneyAccount = false;
      }
      if (this.value == 1) {
        params.orderPriceType = orderPriceTypeEnum.in.LIMIT;
        params.price = this.buyingEntrustPrice;
      } else {
        params.orderPriceType = orderPriceTypeEnum.in.MARKET;
      }
      if (this.currentindex == 1) {
        params.stopLossAmount = this.nowLoss ? this.nowLoss : null;
        params.stopProfitAmount = this.nowProfit ? this.nowProfit : null;
      } else {
        params.stopLossAmount = this.cptmaxLoss;
        params.stopProfitAmount = this.cptmaxProfit;
      }
      // 有红包使用红包
      if (this.getCurrentLucky) {
        params.marginLuckyMoneyId = this.getCurrentLucky.id;
      }
      // 手续费抵扣券TODO
      if (this.getHandLucky) {
        params.feeDiscountId = this.getHandLucky.id;
      }
      console.log("红包下单发送参数", params);
      this.open(params)
        .then(res => {
          this.clearCurrentLucky();
          this.clearHandLucky();
          this.changeContent(params);
          this.successData = res;
          //下单成功弹出成功弹出层
          this.$emit("openSuccess", res);
        })
        .catch(err => {
          console.log("error", err);
          if (err.code == 4002) {
            _this.$vux.confirm.show({
              title: this.$t("setText.title"),
              content: this.$t("buy.text56"),
              cancelText: this.$t("common.text3"),
              confirmText: this.$t("dialog.trading.gorecharge"),
              onCancel() {
                return false;
              },
              onConfirm() {
                _this.$router.push({
                  path: "/drawmoney/index"
                });
              }
            });
            return false;
          } else {
            this.$vux.toast.text(`${err.msg}`, "middle");
          }
        });
    },
    // changeOption(val, label) {
    //   this.currentindex = label.value;
    //   this.totalQuantity =
    //     this.currentindex == 0 ? this.volumeList[0] : this.minBuyVolume;
    //   this.nowQuantity = 0;
    //   this.maxtotalQuantity = Number(
    //     this.currentindex == 0
    //       ? 0
    //       : (
    //           (this.personalMsgKey[1].value > 0
    //             ? this.personalMsgKey[1].value
    //             : 0) / this.lastPrice
    //         ).toFixed(0)
    //   );
    // },
    dialogCancle() {
      this.buyingEntrustPrice = "";
      this.showToast = false;
    }
  }
};
</script>

<style lang="less" scoped>
.number-popup {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  width: 100%;
  height: 100% !important;
  top: 0;
  left: 0;

  & > div {
    top: 30% !important;

    // width: 5.2rem;
    width: 75%;
    margin: 0 auto;
    border-radius: 6px;
    background: @bodyBg;
    position: relative;
    overflow: hidden;
    &:after {
      content: '';
      display: block;
      background: @blueColor;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.08rem;
    }
  }
}

.buy-detail {
  position: relative;
  .loss-box {
    background: rgb(28, 38, 48);
    padding: 0 0.3rem;
    margin-bottom: 0.2rem;
    & > div {
      display: flex;
      padding: 0.26rem 0 0.1rem 0;
      border-bottom: 1px solid rgb(21, 30, 38);
      .loss-box-name {
        flex: 1;
        font-size: 0.28rem;
        color: rgb(224, 236, 247);
      }
      .loss-box-price {
        color: rgb(104, 114, 132);
        font-size: 0.28rem;
        input {
          width: 1.5rem;
          color: #e0ecf7;
          background: #19222a;
          padding-left: 0.1rem;
          border-radius: 0;
        }
      }
      .loss-box-btn {
        margin-left: 0.28rem;
        font-size: 0.28rem;
        color: rgb(3, 173, 143);
        border-bottom: 1px solid rgb(3, 173, 143);
      }
    }
  }
  .slider-box {
    .slider {
      margin-top: 0.4rem;
      margin-bottom: 0.32rem;
      /deep/ .el-slider {
        .el-slider__runway {
          height: 0.01rem;
          background: @battleshipGrey;
        }
        .el-slider__marks {
          .el-slider__marks-text {
            font-size: 0.2rem;
            color: rgb(224, 236, 247);
          }
        }
        .el-slider__bar {
          // background: inherit;
          // display: none;
          height: 0.01rem;
          background: @battleshipGrey;
        }
        .el-slider__button-wrapper {
          top: -0.36rem;
        }
        .el-slider__button {
          width: 0.28rem;
          height: 0.28rem;
          border: none;
          background: rgb(3, 173, 143);
        }
        .el-slider__stop {
          background: @battleshipGrey;
          width: 0.16rem;
          height: 0.16rem;
          top: -0.06rem;
        }
      }
    }
  }
  .flex-box {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 1rem;
    box-sizing: content-box;
    background: @bodyBg;
    box-shadow: 0 -3px 16px 0 rgba(169, 178, 185, 0.2);
    // padding-bottom: constant(safe-area-inset-top);
    // padding-bottom: env(safe-area-inset-top);

    .buy-btn {
      display: flex;
      & > div {
        color: @txtColor;
        &:nth-of-type(1) {
          box-sizing: border-box;
          padding: 0 0.24rem 0 0.32rem;
          height: 1rem;
          line-height: 1rem;
          flex: 1;
          .total-top {
            display: flex;
            align-items: center;
            .icon-wenhao {
              margin-left: 0;
            }
            & > div {
              font-size: 0.28rem;
              font-weight: bold;
              &:nth-of-type(2) {
                margin-left: 0.1rem;
                text-align: right;
                font-size: 0.4rem;
                margin-left: auto;
                span {
                  font-size: 0.28rem;
                  font-weight: bold;
                }
              }
            }
          }
          .total-bottom {
            text-align: right;
            font-size: 0.2rem;
          }
        }
        &:nth-of-type(2) {
          color: @writeColor;
          justify-content: center;
          font-size: 0.32rem;
          border-radius: 0.04rem;
          display: flex;
          align-items: center;
          width: 2.62rem;
          &.bRed {
            background: @fontRedColor;
          }
          &.bGreen {
            background: @fontColor;
          }
        }
      }
    }
  }

  .dialog {
    .weui-dialog {
      width: 80%;
      .title {
        padding: 0.2rem 0 0.1rem 0;
        font-size: 0.36rem;
        border-bottom: 1px solid @white;
      }
      .last-price {
        margin: 0.3rem 0 0.2rem 0;
        font-size: 0.28rem;
        padding-left: 0.8rem;
        text-align: left;
        color: @battleshipGrey;
      }
      .last-price-input {
        padding: 0 0.8rem;

        input {
          display: block;
          width: 100%;
          height: 0.72rem;
          background: @white;
          border-radius: 4px;
          color: #adb3c1;
          padding-left: 0.16rem;
          box-sizing: border-box;
          font-size: 0.28rem;
          text-align: center;
        }
      }
      .desc {
        font-size: 0.2rem;
        text-align: left;
        margin-top: 0.24rem;
      }
      .btn-box {
        display: flex;
        margin: 0.4rem 0 0.2rem;
        & > div {
          flex: 1;
          text-align: center;
          font-size: 0.28rem;
          color: @darkSkyBlue;
          &.cancle {
            div {
              height: 0.7rem;
              border-radius: 4px;
              line-height: 0.7rem;
              background: #fff;
              border: 1px solid @darkSkyBlue;
              box-sizing: border-box;
              width: 2rem;
            }
          }
          &.confirm {
            color: #e0ecf7;
            text-align: right;
            div {
              height: 0.7rem;
              border-radius: 4px;
              line-height: 0.7rem;
              background: @darkSkyBlue;
              width: 2rem;
              text-align: center;
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .coupons-main .label-box .box .right .switch /deep/ .weui-switch,
  .coupons-main .label-box .box .right .switch /deep/ .weui-switch-cp__box,
  .coupons-main .label-box .box .right .switch /deep/ .weui-switch:before,
  .coupons-main
    .label-box
    .box
    .right
    .switch
    /deep/
    .weui-switch-cp__box:before {
    height: 0.34rem;
    width: 0.72rem;
  }
  .coupons-main .label-box .box .right .switch /deep/ .weui-switch:after,
  .coupons-main
    .label-box
    .box
    .right
    .switch
    /deep/
    .weui-switch-cp__box:after {
    height: 0.3rem;
    width: 0.3rem;
  }
}
</style>
