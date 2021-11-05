<template>
  <div>
    <model-full id="buy-detail" class="fixd-wrap" :title="title" v-if="symbol">
      <div class="content">
        <div class="header">
          <div class="header-left">
            {{ $t("buy.text4") }}： <span class="green">{{ lastPrice }}</span>
          </div>

          <div class="header-right">
            <base-radio
              v-if="$tradeType.tradeType != 'FUTURE'"
              :options="datalist"
              :selectOption="currentindex"
              @radioChange="changeOption"
            ></base-radio>
            <span v-if="$tradeType.tradeType != 'LEVER'"
              >( {{ $t("leverageTrading.deliverytips") }}：{{ expiredTimeCount
              }}{{ $t("leverageTrading.day") }} )</span
            >
          </div>
        </div>
        <div class="necromancer">
          <div
            :class="value == val.index ? 'active' : ''"
            v-for="(val, i) in commonList"
            :key="i"
            @click="tabclick(val.id, val.index)"
          >
            {{ val.name }}
          </div>
        </div>
        <!-- 委托价格 -->
        <div class="set-designated" v-show="value == 1">
          <div class="label">{{ $t("leverageTrading.commissionPrice2") }}</div>
          <div class="price-box">
            <add-btn
              @remove="remove"
              @add="add"
              @change="change"
              @blur="_blur"
              :num="buyingEntrustPrice"
              class="add-btn"
            ></add-btn>
            <div class="desc" v-if="params.type === 1">
              {{ $t("buy.text7") }}
            </div>
            <div class="desc" v-else>{{ $t("buy.text8") }}</div>
          </div>
        </div>
        <!-- 购买数量 -->
        <div class="set-designated next" v-if="currentindex == 1">
          <div class="label">{{ $t("buy.text9") }}</div>
          <div class="slider-box">
            <add-btn
              @remove="removebuynum"
              @add="addbuynum"
              @change="changebuynum"
              @blur="_blurbuy"
              :placeholder="getquantitytext"
              :num="totalQuantity"
              class="add-btn"
            ></add-btn>
          </div>
        </div>
        <!-- 购买数量 -->
        <div class="transaction-num" v-if="currentindex == 0">
          <div class="title">{{ $t("buy.text9") }}</div>
          <div class="num-box">
            <ul>
              <li
                class="Medium"
                :class="nowQuantity === index ? 'active' : ''"
                v-for="(item, index) in getvolumeList"
                :key="index"
                @click="quantityClick(item, index)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="transaction-num" v-if="currentindex == 1">
          <div class="title">{{ $t("dialog.trading.leverage") }}</div>
          <div class="num-box">
            <ul>
              <li
                :class="
                  item === getcurrentLeverage
                    ? 'active'
                    : dpSetDisabled
                    ? 'disabled'
                    : ''
                "
                v-for="(item, index) in leverageList"
                :key="index"
                @click="leverageClick(item, index)"
              >
                {{ item }}X
              </li>
            </ul>
          </div>
          <!-- 您目前有持仓或者挂单，不能切换杠杆。 -->
          <span class="bottom-tips" v-if="dpSetDisabled">{{
            $t("dialog.trading.text27")
          }}</span>
        </div>
      </div>
      <div class="line10"></div>
    </model-full>
    <popup v-show="successShow" position="top" class="number-popup">
      <div>
        <success
          @cancle="successCancle"
          @confrim="successConfrim"
          :data="successData"
        ></success>
      </div>
    </popup>
  </div>
</template>

<script>
import { OrderByArray } from "@/assets/js/utils";

import modelFull from "element/model-full";
import baseRadio from "element/base-radio";
import addBtn from "element/base-add-input";

import success from "../components/success";

import { Checklist, Popup, InlineXSwitch } from "vux";

import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

import busVue from "@js/bus";
import * as add from "@/assets/js/add-remove";

import {
  orderPriceTypeEnum,
  directEnum,
  offsetEnum
} from "@/assets/js/utils/constant";

export default {
  components: {
    modelFull,
    addBtn,
    Checklist,
    baseRadio,
    success,
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
      nowleverage: 0,
      lossOrProfitArray: [],
      nowLoss: 0,
      nowProfit: 0,
      stopProfitFeeArray: [],
      nowStopProfitFee: 0,
      SetProfitText: "设置",
      SetLossText: "设置",
      perUnitLimitLossAmount: 0,
      stopLossOrProfitId: 0,
      perUnitLimitProfitAmount: 0,
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
      datalist: [
        { id: "0", name: this.$t("leverageTrading.basic"), value: 0 },
        { id: "1", name: this.$t("leverageTrading.pro"), value: 1 }
      ],
      commonList: [
        {
          id: "0",
          name: this.$t("buy.text29"), //市价
          index: 0
        },
        {
          id: "1",
          name: this.$t("buy.text30"), //委托价
          index: 1
        }
      ],
      token: localStorage.getItem("token"),
      isUp: false,
      isFull: false,
      lossNum: "--",
      profitNum: "--",
      successShow: false,
      isSuccess: false,
      currentindex: 0,
      marginvalue: 0,
      successData: {
        volume: 0
      },
      isOpenIncome: true // 是否开启红包收益账户，默认开启
    };
  },

  computed: {
    ...mapGetters({
      contractName: "trading/contractName",
      commodityList: "commodity/commodityList",
      getCommodity: "commodity/getCommodity",
      personalMsgKey: "actual/account/personalMsgKey",

      getCurrency: "currency/getCurrency",
      minWave: "trading/minWave",
      lastPrice: "trading/lastPrice",

      askPrice: "trading/askPrice",
      bidPrice: "trading/bidPrice",
      remainVolume: "trading/remainVolume", // 平仓最大手数

      accountInfo: "actual/account/accountInfo",
      getSOPSetting: "actual/stoplossorprofit/getSOPSetting", // 止损止盈点数，可能为null

      isLogin: "user/isLogin",
      userInfo: "user/userInfo",
      symbol: "trading/symbol",
      // contractNo: "trading/contractNo",
      currency: "trading/currency", // 汇率名称“USD”
      currencyFlag: "trading/currencyFlag", // 汇率标记 “¥”
      fee: "trading/openFee", // 交易综合费
      deposit: "trading/margin", // 保证金
      volumeList: "trading/volumeList", // 购买个数
      leverageList: "trading/leverageList", // 杠杆倍数
      maxBuyVolume: "trading/maxBuyVolume", // 最大购买量
      minBuyVolume: "trading/minBuyVolume", // 最小购买量
      pricePrecision: "trading/pricePrecision", // 价格精度
      volumePrecision: "trading/volumePrecision", // 购买量精度
      contractInfo: "contractInfo/contractInfo",
      perContractValue: "trading/perContractValue", // 合约面值
      maxLoss: "trading/maxLoss", // 购买量精度
      maxProfit: "trading/maxProfit", // 购买量精度
      expiredTime: "trading/expiredTime", // 交割时间
      positionLeverage: "trading/positionLeverage",
      orderLeverage: "trading/orderLeverage",
      currentLeverage: "trading/currentLeverage", //杠杆
      orderCount: "actual/order/orderCount",
      positionCount: "actual/position/positionCount"
    }),
    title() {
      if (this.$route.query.type == 1) {
        return this.$tradeType.tradeType !== "FUTURE"
          ? `${this.contractInfo.symbol}-` + this.$t("index.text41")
          : this.$lang == "en"
          ? `${this.contractInfo.nameEnglish}-` + this.$t("index.text41")
          : `${this.contractInfo.name}-` + this.$t("index.text41");
      }
      if (this.$route.query.type == 2) {
        return this.$tradeType.tradeType !== "FUTURE"
          ? `${this.contractInfo.symbol}-` + this.$t("index.text40")
          : this.$lang == "en"
          ? `${this.contractInfo.nameEnglish}-` + this.$t("index.text40")
          : `${this.contractInfo.name}-` + this.$t("index.text40");
      }
    },
    dpSetDisabled() {
      return (
        this.orderCount(this.symbol) > 0 || this.positionCount(this.symbol) > 0
      );
    },
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
    getcurrentLeverage() {
      if (this.orderLeverage == null && this.positionLeverage == null) {
        if (
          this.currentLeverage == 1 ||
          this.currentLeverage == "" ||
          this.currentLeverage == undefined
        )
          this.changeLeverage({ leverage: this.leverageList[0] });
      } else {
        this.changeLeverage({
          leverage:
            this.positionLeverage != null
              ? this.positionLeverage
              : this.orderLeverage
        });
      }
      return this.currentLeverage;
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
    getquantitytext() {
      if (this.$tradeType.tradeType == "FUTURE") {
        return (
          this.$t("buy.text11") +
          this.cptbuysum +
          this.$t("leverageTrading.bow")
        );
      } else {
        return "";
      }
    },
    getMarginList() {
      if (this.currentindex == 0) {
        const marginitem = (
          ((this.buyingPriceType == "MARKET"
            ? this.lastPrice
            : this.buyingEntrustPrice) *
            this.totalQuantity *
            (this.$tradeType.tradeType != "LEVER"
              ? this.perContractValue
              : 1)) /
          this.currentLeverage
        ).toFixed(2);
        return marginitem;
      } else {
        return (
          ((this.buyingPriceType == "MARKET"
            ? this.lastPrice
            : this.buyingEntrustPrice) *
            this.totalQuantity *
            (this.$tradeType.tradeType != "LEVER"
              ? this.perContractValue
              : 1)) /
          this.currentLeverage
        ).toFixed(2);
      }
    },
    btnText() {
      if (this.$route.query.type == 1) {
        return this.value === "0"
          ? this.$t("buy.text51")
          : this.$t("buy.text53");
      }
      if (this.$route.query.type == 2) {
        return this.value === "0"
          ? this.$t("buy.text52")
          : this.$t("buy.text54");
      }
    },
    getmarginvalue() {
      return this.getMarginList[this.nowmargin];
    },
    cptmaxLoss() {
      return (this.getMarginList * this.maxLoss).toFixed(2);
    },
    cptmaxProfit() {
      return (this.getMarginList * this.maxProfit).toFixed(2);
    },
    cptFee() {
      if (!this.totalQuantity) {
        this.totalQuantity = 0;
      }
      if (this.totalQuantity >= 0) {
        let newfee = this.fee;
        // if (this.template.length > 0) {
        //   newfee = this.template.filter(
        //     t => t.symbol == this.contractInfo.symbol
        //   )[0].fee;
        // }

        return (
          newfee *
          parseFloat(this.totalQuantity) *
          (this.buyingPriceType == "MARKET"
            ? this.lastPrice
            : this.buyingEntrustPrice)
        ).toFixed(2);
      }
    },
    conversion1() {
      if (this.totalQuantity > 0) {
        if (this.$tradeType.tradeType == "LEVER" && this.currentindex == 0) {
          return parseFloat(this.getMarginList).toFixed(2);
        } else {
          return parseFloat(this.getMarginList).toFixed(2);
        }
      } else {
        return 0;
      }
    },
    cptDeposit() {
      return (
        parseFloat(this.deposit) * parseFloat(this.totalQuantity)
      ).toFixed(2);
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
        res => {}
      );
    },
    changebuynum(val) {
      this.totalQuantity = val;
    },
    remove() {
      let num = 1 / Math.pow(10, this.pricePrecision);
      this.buyingEntrustPrice = this.subtr(this.buyingEntrustPrice, num);
    },
    removebuynum() {
      let num = 1 / Math.pow(10, this.volumePrecision);

      if (this.$tradeType.tradeType == "LEVER") {
        this.totalQuantity = Number(this.subtr(this.totalQuantity, num));
      } else {
        if (this.totalQuantity == 0) return;
        this.totalQuantity--;
      }
    },
    add() {
      let num = 1 / Math.pow(10, this.pricePrecision);
      this.buyingEntrustPrice = this.addNum(this.buyingEntrustPrice, num);
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
    change(val) {
      this.buyingEntrustPrice = val;
      this.marginvalue = this.getMarginList[this.nowmargin];
    },
    _blur() {
      this.buyingEntrustPrice = this.buyingEntrustPrice;
    },
    _blurbuy() {
      this.totalQuantity = this.totalQuantity;
    },

    checkPrice() {
      let _this = this;
      let price = Number(_this.conversion1);
      if (this.value == 1) {
        if (price <= 0) {
          this.$vux.toast.text(this.$t("buy.text55"), "middle");
          return false;
        }
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
      }
      return true;
    },

    getParams() {
      this.params = this.$route.query;
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
      this.quantityNumber = item;
    },
    leverageClick(item, index) {
      if (!this.dpSetDisabled) {
        this.leverage = item;
        this.changeLeverage({ leverage: item });
      }
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
    successConfrim() {
      if (this.successData.status != "FINISHED") {
        this.$router.push({
          path: "/entrust?type=" + this.$tradeType.tradeType
        });
      } else {
        this.$router.push({
          path: "/position?type=" + this.$tradeType.tradeType
        });
      }

      this.isSuccess = false;
    },
    successCancle() {
      this.isSuccess = false;
      this.successShow = false;
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
    // getuserTemp() {
    //   let params = {
    //     userId: 11111
    //   };
    //   this.userTemplatequery(params).then(res => {
    //     if (res) {
    //       this.templateRulequery({
    //         templateId: res.templateId,
    //         page: 1,
    //         size: 100
    //       }).then(res1 => {
    //         console.log("resuserTemplatequery", res1, res1.records);
    //         this.template = [];
    //         if (res1 && res1.records.length > 0) {
    //           let result = [];
    //           result = res1.records;

    //           result = result.filter(t => t.type == "FEESET");
    //           let temp = JSON.parse(result[0].templateJson);

    //           for (let index = 0; index < temp.commodityNo.length; index++) {
    //             const element = temp.commodityNo[index];
    //             if (element == this.contractInfo.symbol)
    //               this.template.push({
    //                 fee: temp.fee,
    //                 symbol: element
    //               });
    //           }
    //         }
    //       });
    //     }
    //   });
    // },
    buyApi() {
      const _this = this;

      // 价格校验
      if (!this.checkPrice()) return false;
      // 手数校验
      if (
        this.$tradeType.tradeType !== "LEVER" &&
        this.totalQuantity > this.cptbuysum
      ) {
        this.$vux.toast.text(
          this.$t("leverageTrading.buytip10") +
            this.cptbuysum +
            this.$t("leverageTrading.bow"),
          "top"
        );
        return false;
      }
      if (this.totalQuantity > this.maxBuyVolume) {
        this.$vux.toast.text(
          this.$t("leverageTrading.buytip10") +
            this.maxBuyVolume +
            (this.$tradeType.tradeType !== "LEVER"
              ? this.$t("leverageTrading.bow")
              : this.contractInfo.symbol.split("/")[0]),
          "top"
        );
        return false;
      }
      if (this.totalQuantity < this.minBuyVolume) {
        this.$vux.toast.text(
          this.$t("leverageTrading.buytip11") +
            this.minBuyVolume +
            (this.$tradeType.tradeType !== "LEVER"
              ? this.$t("leverageTrading.bow")
              : this.contractInfo.symbol.split("/")[0]),
          "top"
        );
        return false;
      }
      console.log(this.totalQuantity);
      if (this.totalQuantity == 0) {
        this.$vux.toast.text(this.$t("buy.text57"), "middle");
        return false;
      }
      if (!this.conversion1 || this.conversion1 == 0) {
        this.$vux.toast.text(this.$t("buy.text58"), "middle");
        return false;
      }
      let direct =
        this.$route.query.type == "1" ? directEnum.in.BUY : directEnum.in.SELL;

      // 获取止损止盈点数
      // 确定
      let params = {
        symbol: this.contractInfo.symbol,
        direct: direct,
        leverage: this.currentLeverage,
        volume: this.totalQuantity
      };

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

      this.open(params)
        .then(res => {
          _this.successShow = !_this.successShow;
          this.changeContent(params);
          this.successData = res;
        })
        .catch(error => {
          console.log("error", error);
          this.$vux.toast.text(`${error}`, "middle");
        });
    },
    tabclick(key, index) {
      // debugger
      this.value = key;
      if (key === "1") {
        this.buyingPriceType = "LIMIT";
        //暂时注释
        this.buyingEntrustPrice = Number(this.lastPrice).toFixed(
          this.pricePrecision
        );
      } else {
        this.buyingPriceType = "MARKET";
      }
    },
    changeOption(val, label) {
      this.currentindex = label.value;
      this.totalQuantity =
        this.currentindex == 0 ? this.volumeList[0] : this.minBuyVolume;
      this.nowQuantity = 0;
      this.maxtotalQuantity = Number(
        this.currentindex == 0
          ? 0
          : (
              (this.personalMsgKey[1].value > 0
                ? this.personalMsgKey[1].value
                : 0) / this.lastPrice
            ).toFixed(0)
      );
    },
    dialogCancle() {
      this.buyingEntrustPrice = "";
      this.showToast = false;
    }
  },
  created() {
    this.getParams();
  },
  mounted() {
    if (this.$tradeType.tradeType == "FUTURE") {
      this.currentindex = 1;
      this.totalQuantity = "";
    } else {
      this.currentindex = 0;
      this.totalQuantity = this.currentindex == 0 ? this.getvolumeList[0] : 1;
    }
    this.marginvalue = this.getMarginList[0];
    // this.getuserTemp();
    const _this = this;
    busVue.$on("initover", res => {
      if (this.$tradeType.tradeType == "FUTURE") {
        this.currentindex = 1;
        _this.totalQuantity = "";
      } else {
        this.currentindex = 0;
        _this.totalQuantity =
          _this.currentindex == 0 ? _this.getvolumeList[0] : 1;
      }
      _this.marginvalue = _this.getMarginList[0];
      // _this.getuserTemp();
    });
    busVue.$on("orderPushData", res => {
      if (_this.successData.id && _this.successData.id == res.id) {
        _this.successData = res;
      }
    });
  },

  beforeDestroy() {
    busVue.$off("orderPushData");
    this.changeLeverage({ leverage: 1 });
  }
};
</script>

<style lang="less" scoped></style>
