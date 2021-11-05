import { mapGetters, mapActions, mapMutations } from "vuex";
import busVue from "@js/bus";
export default {
  data() {
    return {
      showBuy: false,
      showPriceType: false,
      placePriceText: this.$t("leverageTrading.marketPrice"),
      positionList: [
        {
          value: 4,
          name: "1/4",
          check: false
        },
        {
          value: 3,
          name: "1/3",
          check: false
        },
        {
          value: 2,
          name: "1/2",
          check: false
        },
        {
          value: 1,
          name: "全",
          check: false
        }
      ],
      currentPosition: -1, //当前仓位
      feeRate: 0,
      // luckyDataAll: null,
      handluckyDataAll: null,
      luckyData: null, //可用红包个数
      userNumber: 0,
      currentStatus: false,
      luckyDataCount: 0, //保证金红包券
      handluckyCount: 0 //保证金折扣券
    };
  },
  computed: {
    ...mapGetters({
      getCurrentLucky: "user/getCurrentLucky",
      getHandLucky: "user/getHandLucky"
    }),
    openFee() {
      let num = 0;
      // 开仓手续费 = 开仓成交价*成交数量*开仓手续费率
      if (this.totalQuantity != "" && this.totalQuantity > 0) {
        if (this.$tradeType.tradeType !== "FUTURE") {
          num = Number(this.lastPrice * this.totalQuantity * this.feeRate);
        } else {
          num = Number(
            this.lastPrice *
              this.totalQuantity *
              this.feeRate *
              this.perContractValue
          );
        }
        if (this.getCurrentLucky) {
          let { luckyMoney, luckyMoneyType } = this.getCurrentLucky;
          // luckyMoneyType 1注册 2充值
          if (luckyMoneyType == 1) {
            if (this.getDeposit <= 1) {
              num = 0;
            }
            if (
              luckyMoney == 2 &&
              this.getDeposit > 1 &&
              this.getDeposit <= 2
            ) {
              num = 0;
            }
          }
        }
        if (num == 0 && this.getHandLucky) {
          this.clearHandLucky();
        }
      }
      return num;
    },
    luckyLossMoney() {
      // 红包收益减免金额
      let luckyAcount = this.personalMsgKey[5].value || 0;
      let resault = 0;
      if (Number(luckyAcount) >= Number(this.openFee)) {
        resault = this.openFee;
      } else {
        resault = luckyAcount;
      }
      return this.toFixedStr(resault);
    },
    calcHandMoney() {
      if (this.getHandLucky && this.openFee > 0 && this.getDeposit > 0) {
        let fee = (1 - this.getHandLucky.discountValue) * this.openFee;
        return this.toFixedStr(fee, 2);
      }
      return 0;
    }
  },
  watch: {
    showBuy() {
      if (!this.showBuy) {
        this.showPriceType = false;
      } else {
        this.currentStatus = this.$diskinfo.type == "actual" ? true : false;
        // 初始化数据
        this.initData();
        // 获取交易综合费
        this.getSymbolFee();
        this.getUserLuckyQuery();
        this.getDiscountLuckyQuery();
        this.$nextTick(() => {
          let msak = document.querySelector("#buyDetail >.yd-mask");
          msak && msak.remove();
          //根据红包收益判断是否选择启用不启用
          if (this.personalMsgKey[5].value <= 0) {
            this.isOpenIncome = false;
          }
        });
        //打开时给默认杠杆
        this.changeLeverage({ leverage: this.leverageList[0] });
        setTimeout(() => {
          // 根据保证金，计算多少个可用红包券
          this.getUserLuckyQuery();
        }, 500);
      }
    },
    getDeposit() {
      if (this.showBuy) {
        // 根据保证金，计算多少个可用红包券
        this.getUserLuckyQuery();
      }
    },
    currentindex() {
      if (this.currentindex == 0) {
        // 切换标准时，重新更新状态
        this.totalQuantity = this.getvolumeList[this.nowQuantity];
      }
    }
  },
  async mounted() {},
  methods: {
    ...mapActions({
      contractQuery: "contract/query",
      userLuckyQuery: "user/luckyQuery",
      handLuckyQuery: "user/handLuckyQuery"
    }),
    ...mapMutations({
      clearCurrentLucky: "user/clearCurrentLucky",
      clearHandLucky: "user/clearHandLucky"
    }),

    initData() {
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
    // 根据保证金，获取可用红包数量
    getUserLuckyQuery() {
      this.userLuckyQuery({ type: 1, checkAmount: this.getDeposit }).then(
        res => {
          // 获取可用红包
          console.log("获取可用红包", res);
          if (res.records && res.records.length) {
            // this.luckyDataAll = res.records;
            this.luckyData = res.records;
            this.luckyDataCount = res.total;
          }
        }
      );
    },
    // 获取可用手续费抵扣券数量
    getDiscountLuckyQuery() {
      this.handLuckyQuery({ type: 1 }).then(res => {
        // 获取可用红包
        console.log("可用手续费抵扣券数量", res);
        this.handluckyCount = res.total || 0;
      });
    },
    // 获取可用红包个数
    // checkLucky() {
    //   let newData = [];
    //   if (this.luckyDataAll && this.luckyDataAll.length > 0) {
    //     newData = this.luckyDataAll.filter(
    //       d => d.minLimitValue <= this.getDeposit || d.minLimitValue <= 0.01
    //     );
    //     newData = this.luckyDataAll;
    //     this.luckyData = newData;
    //   }
    // },
    // 打开选择红包券或折扣券页面
    goToLucky(type = 0) {
      //选红包前，要缓存所有数据
      if (
        (type == 0 && this.luckyData && this.luckyData.length > 0) ||
        (type == 1 && this.handluckyCount > 0 && this.openFee > 0)
      ) {
        this.$emit("openCoupons", { type });
      }
      // this.$router.push({
      //   path: "/coupons",
      //   query: {
      //     isShowTab: 1,
      //     deposit: this.getDeposit
      //   }
      // });
    },
    clearData() {
      this.currentLeverage = "";
      this.positionList.forEach(d => {
        d.check = true;
      });
    },
    async getSymbolFee() {
      console.log(this.userInfo, this.symbol);
      let res = await this.contractQuery({
        userId: this.userInfo.id,
        symbol: this.symbol
      });
      console.log("单个品种信息", res);
      this.feeRate = res.openFee || 0;
    },
    closeBuy() {
      this.showBuy = false;
      this.clearCurrentLucky();
      this.clearHandLucky();
    },
    selectPriceType(value) {
      this.value = value;
      // this.placePriceText = value == 0 ? "市价" : "委托价";
      this.placePriceText =
        value == 0
          ? this.$t("leverageTrading.marketPrice")
          : this.$t("leverageTrading.commissionPrice1");
      this.showPriceType = false;
      //委托加LIMIT 市价：MARKET
      this.buyingPriceType = value == 0 ? "MARKET" : "LIMIT";
      if (value == 1) {
        this.clearCurrentLucky(); //清除已经选保证券红包
        this.clearHandLucky(); //清除已经选红包折扣券
        this.buyingEntrustPrice = Number(this.lastPrice).toFixed(
          this.pricePrecision
        );
      }
    },
    checkPosition(item) {
      this.positionList.forEach(d => {
        if (this.currentPosition == item.value) {
          d.check = false;
        } else {
          d.check = d.value == item.value;
        }
      });
      if (this.currentPosition == item.value) {
        this.currentPosition = -1;
        this.totalQuantity = 0;
      } else {
        this.currentPosition = item.value; //当前仓位
      }
      let all = 0;
      if (this.currentPosition != -1) {
        if (this.$tradeType.tradeType !== "FUTURE") {
          // 杠杆仓位
          all =
            Number(this.personalMsgKey[1].value * this.currentLeverage) /
            this.lastPrice;
        } else {
          // 可用余额*杠杆/（开仓价格*面值）
          all =
            Number(this.personalMsgKey[1].value * this.currentLeverage) /
            (this.lastPrice * this.perContractValue);
        }
        if (this.currentPosition == 1) {
          //全仓
          this.totalQuantity = this.toFixedStr(all, this.volumePrecision);
        } else {
          this.totalQuantity = this.toFixedStr(
            all / this.currentPosition,
            this.volumePrecision
          );
        }
      }
    },
    changeOption(e, type) {
      this.currentindex = Number(type);
    },
    alertTips(tipType) {
      console.log("tipType", tipType);
      let content = "";
      let title = "";
      switch (tipType) {
        // case 0:
        //   title = "开仓手续费";
        //   content = "由于价格波动，手续费以实际成交价为主！";
        //   break;
        // case 1:
        //   title = "保证金券";
        //   content = "可抵扣保证金";
        //   break;
        // case 2:
        //   title = "红包收益账户";
        //   content = "可抵扣手续费";
        //   break;
        case 0:
          title = this.$t("common.alertTitle1");
          content = this.$t("common.alertContent1");
          break;
        case 1:
          title = this.$t("common.alertTitle2");
          content = this.$t("common.alertContent2");
          break;
        case 2: //红包收益弹框
          title = this.$t("common.alertTitle3");
          content = this.$t("common.alertContent3");
          break;
        case 3:
          title = this.$t("common.alertTitle4");
          content = this.$t("common.alertContent4");
          break;
        case 4:
          title = this.$t("common.alertTitle5");
          content = this.$t("common.alertContent5");
          break;
        case 5:
          title = this.$t("common.alertTitle6");
          content = this.$t("common.alertContent6");
          break;
      }
      busVue.$emit("alert", {
        title,
        content
      });
    },
    blurChange(e) {
      if (this.buyingEntrustPrice == "" && this.value == 1) {
        this.selectPriceType(1);
      }
    }
  },
  beforeDestroy() {
    this.currentindex = 0;
    this.showBuy = false;
    this.showPriceType = false;
    this.clearCurrentLucky();
    this.clearHandLucky();
  }
};
