export class ContractInfo {
  // 本地添加部分
  key = ""; // commodityNo + contractNo
  contractName = "";
  userFlag = false;
  scale = 0;
  pricePrecision = 0; //价格精度
  volumePrecision = 0; //成交量精度
  perContractValue = 0; //合约面值
  descriptionEnglish = "";
  nameEnglish = "";
  expiredTime = ""; //交割日期
  symbolpricePrecision = 0; //行情价格精度
  symbolvolumePrecision = 0; //行情成交量精度.
  updateTime = "";
  upDropPrice = 0;
  upDropSpeed = 0;
  leverageList = [];
  openFee = 0;
  minBuyVolume = 0;
  maxBuyVolume = 0;
  maxLoss = 0;
  maxProfit = 0;
  closeFee = 0;
  volumeList = [];
  margin = 0;
  actualMargin = 0; //保证金实际支付
  volume24 = 0; //24小时量
  // 服务器下发部分
  name = "";
  icon = ""; //合约icon
  logoName = "";
  contractNo = "";
  commodityNo = "";
  symbol = "";

  marketType = ""; // 市场类型 = ['INNER', 'OUTER', 'DIGICCY']stringEnum:"INNER", "OUTER", "DIGICCY",
  tradeType = "";
  status = ""; // 状态
  offerUnitDesc = ""; // 报价单位描述
  tradeUnit = ""; // 交易单位
  tradeUnitDesc = ""; // 交易单位描述

  currency = ""; // 汇率标记 “USD”
  currencyFlag = ""; // 汇率标记符号 “¥”
  currencyTradeRate = 0; // 交易汇率
  currencyPayRate = 0; // 入金汇率
  currencyWithdrawRate = 0; // 出金汇率

  exchangeNo = ""; // 交易所代码

  description = ""; //品种文案描述
  hot = false;
  fee = 0; // 综合手续费
  deposit = 0; // 保证金
  settleDay = 0; // 隔夜天数

  overnightDeposit = 0; // 隔夜保证金
  overnightFee = 0; // 隔夜手续费
  luckyMoneyOvernightFee = 0; // 隔夜手续费红包收益抵扣
  luckyMoneyAccountFee = 0; // 开仓手续费红包收益抵扣

  tickSize = 0; // 以前的minWave，最小波动点
  tickProfit = 0; // 波动一次的盈亏金额

  enable = false; // 是否有效
  main = false; // 主力合约

  appRecommend = false; //是否推荐
  feeDiscountValue = 0; //是否推荐
  // 动态部分
  time = 0;

  bp1 = 0; // 买一价
  bp2 = 0;
  bp3 = 0;
  bp4 = 0;
  bp5 = 0;

  bv1 = 0; // 买一量
  bv2 = 0;
  bv3 = 0;
  bv4 = 0;
  bv5 = 0;

  sp1 = 0; // 卖一价
  sp2 = 0;
  sp3 = 0;
  sp4 = 0;
  sp5 = 0;

  sv1 = 0; // 卖一量
  sv2 = 0;
  sv3 = 0;
  sv4 = 0;
  sv5 = 0;

  open = 0;
  close = 0;
  low = 0;
  high = 0;

  newPrice = 0; // 最新价
  settle = 0; // 结算价
  preClose = 0; // 昨收盘
  preSettle = 0; // 昨结算价

  totalAmount = 0; // 总金额
  totalVolume = 0; //  前最后一次的手数

  lastTotalVolume = 0; // 上一次的总手数
  volume = 0; // 总手数
  nickname = "";
  defaultLoss = 0; //默认止损比例
  defaultProfit = 0; //默认止盈比例
  profitForcedPrice = 0; //止盈强平价格
  lossForcedPrice = 0; //止损强平价格
  gmtCreate = "";
  leverageOvernightList = null; //新杠杆倍数
  // lastVolume = 0              // 上次显示过的volume

  //行情图标价格推送
  p = 0; //最新价

  constructor(symbol, name) {
    this.symbol = symbol || "";
    this.name = name || "";
    this.key = this.symbol + this.name;
    this.contractName = this.symbol + this.name;
  }
  setsymbolPrice(p) {
    this.p = p; //行情最新价
  }
  setsymbolPrecision(symbol, symbolpricePrecision, symbolvolumePrecision) {
    this.symbolpricePrecision = symbolpricePrecision; //行情价格精度
    this.symbolvolumePrecision = symbolvolumePrecision; //行情成交量精度
  }
  showDigiccyContractName() {
    if (this.marketType == "DIGICCY") {
      // this.contractName = this.name + this.commodityNo + "*" + this.contractNo
      this.contractName = this.commodityNo + "*" + this.contractNo; //dave 说不要name
    } else {
      this.contractName = this.commodityNo + "*" + this.contractNo; //dave 说不要name
    }
  }
  merge(node) {
    if (node) {
      let keys = Object.keys(node);
      let needUpdate = false;
      for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        if (this.hasOwnProperty(k)) {
          if (node[k] && this[k] != node[k]) {
            // 这两个需要更新 upDropPrice 和 upDropSpeed
            if (k == "close") {
              needUpdate = true;
            }

            // vue带了setter的钩子，不相同再赋值
            this[k] = node[k];

            // 处理一下总手数
            if (k == "volume") {
              if (this["lastTotalVolume"] == 0) {
                this["lastTotalVolume"] = this["volume"];
              } else {
                this["totalVolume"] = this["volume"] - this["lastTotalVolume"];
                this["lastTotalVolume"] = this["volume"];
              }
            }
          }
        }
      }
      if (needUpdate) {
        let scale = this.pricePrecision;

        let close = parseFloat(this.close ? this.close : this.open);
        let open = parseFloat(this.open);

        this.upDropPrice = (close - open).toFixed(scale);
        this.upDropSpeed = (((close - open) / open) * 100).toFixed(2);
      }
    }
  }
}
