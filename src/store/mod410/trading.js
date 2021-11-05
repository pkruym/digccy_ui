const state = {
  // 映射contractInfo里面的
  // commodityNo: "",
  // contractNo: "",
  pal: "", // 'contract', 'position', 'order'
  // direct: '', // '', 'BUY', 'SELL'
  id: "", // id
  symbol: "",
  // fee: 0, //交易综合费
  // deposit: 0, //保证金
  // currency: '',
  // rate: 0, //转换倍率
  leverage: 1, //当前杠杆倍数
  type: "ACTUAL" // ACTUAL，SIMULATE
};

const getCurrentContractInfo = rootGetters => {
  return rootGetters["contractInfo/contractInfo"];
};

const getPositionInfo = (rootGetters, state) => {
  if (state.pal != "position") return null;

  let path = state.type.toLowerCase() + "/position/getPositionInfo";

  let obj = rootGetters[path](state.id);

  if (!obj || obj.id != state.id) return null;

  return obj;
};
const getOrdersBySymbol = (rootGetters, state) => {
  let path = state.type.toLowerCase() + "/order/getOrders";

  let obj = rootGetters[path](state.symbol);

  if (!obj) return null;

  return obj;
};
const getCloseList = (rootGetters, state) => {
  let path = state.type.toLowerCase() + "/position/getPositions";
  let obj = rootGetters[path](state.symbol);

  if (!obj) return null;
  return obj;
};
const getOrderInfo = (rootGetters, state) => {
  console.log("ssssssssssssssssssssssss");

  if (state.pal != "order") return null;

  let path = state.type.toLowerCase() + "/order/getOrderInfo";

  let obj = rootGetters[path](state.id);

  if (!obj || obj.id != state.id) return null;

  return obj;
};

const getTradingInfo = (rootGetters, state) => {
  let path = "";
  if (state.pal == "contract") {
    return null;
  } else if (state.pal == "position") {
    path = state.type.toLowerCase() + "/position/getPositionInfo";
  } else if (state.pal == "order") {
    path = state.type.toLowerCase() + "/order/getOrderInfo";
  } else {
    return null;
  }

  let obj = rootGetters[path](state.id);

  if (!obj || obj.id != state.id) return null;

  return obj;
};

const getTradingParam = rootGetters => {
  let obj = getCurrentContractInfo(rootGetters);
  return {
    name: obj.name,
    symbol: obj.symbol,
    // commodityNo: obj.commodityNo,
    // contractNo: obj.contractNo,
    openFee: obj.openFee,
    closeFee: obj.closeFee,
    close: obj.close,
    contractName: obj.contractName,
    nameEnglish: obj.nameEnglish,
    fee: obj.fee,
    minBuyVolume: obj.minBuyVolume,
    maxBuyVolume: obj.maxBuyVolume,
    deposit: obj.deposit,
    currency: obj.currency,
    margin: obj.margin,
    currencyFlag: obj.currencyFlag,
    leverageList: obj.leverageList,
    volumeList: obj.volumeList,
    volumePrecision: obj.volumePrecision,
    pricePrecision: obj.pricePrecision,
    symbolpricePrecision: obj.symbolpricePrecision,
    symbolvolumePrecision: obj.symbolvolumePrecision,
    perContractValue: obj.perContractValue,
    maxLoss: obj.maxLoss,
    maxProfit: obj.maxProfit,
    volume24: obj.volume24,
    expiredTime: obj.expiredTime,
    leverageOvernightList: obj.leverageOvernightList
    // rate: obj.currencyTradeRate, // 交易汇率
  };
};

const getters = {
  currentLeverage: (state, commit, getters, rootState, rootGetters) => {
    return state.leverage;
  },
  pal: state => {
    return state.pal;
  },

  tradingId: (state, getters, rootState, rootGetters) => {
    return state.id;
  },

  contractName: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.contractName;
  },
  getName: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.name;
  },
  getNameEnglish: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.nameEnglish;
  },
  getcontractName: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.symbol;
  },
  symbol: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.symbol;
  },
  openFee: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.openFee;
  },
  maxLoss: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.maxLoss;
  },
  maxProfit: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.maxProfit;
  },

  closeFee: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.closeFee;
  },
  minBuyVolume: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.minBuyVolume;
  },
  maxBuyVolume: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.maxBuyVolume;
  },
  volumePrecision: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.volumePrecision;
  },
  pricePrecision: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.pricePrecision;
  },
  symbolpricePrecision: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.symbolpricePrecision;
  },
  symbolvolumePrecision: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.symbolvolumePrecision;
  },
  perContractValue: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.perContractValue;
  },
  volume24: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.volume24;
  },
  margin: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.margin;
  },
  commodityNo: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.commodityNo;
  },

  contractNo: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.contractNo;
  },

  leverageList: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    let leverageList = obj.leverageOvernightList;
    // leverageList.sort(function(a, b){return a - b});
    return leverageList.map(d => d.leverage);
  },

  volumeList: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    let volumeList = obj.volumeList;
    // volumeList.sort(function(a, b){return a - b});
    // console.log('obj.volumeList',obj.volumeList);

    return volumeList;
  },
  fee: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.fee;
  },

  deposit: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.deposit;
  },

  currency: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.currency;
  },

  currencyFlag: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.currencyFlag;
  },

  rate: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.rate;
  },
  expiredTime: (state, getters, rootState, rootGetters) => {
    let obj = getTradingParam(rootGetters);
    return obj.expiredTime;
  },
  minWave: (state, getters, rootState, rootGetters) => {
    let obj = getCurrentContractInfo(rootGetters);
    if (obj.commodityNo) {
      return obj.tickSize;
    }
    return 0;
  },

  lastPrice: (state, getters, rootState, rootGetters) => {
    let obj = getCurrentContractInfo(rootGetters);
    if (obj.symbol) {
      return obj.close.toFixed(obj.symbolpricePrecision);
    }
    return 0;
  },

  askPrice: (state, getters, rootState, rootGetters) => {
    let obj = getCurrentContractInfo(rootGetters);
    if (obj.commodityNo) {
      return obj.sp1;
    }
    return 0;
  },

  bidPrice: (state, getters, rootState, rootGetters) => {
    let obj = getCurrentContractInfo(rootGetters);
    if (obj.commodityNo) {
      return obj.bp1;
    }
    return 0;
  },

  lastPriceStr: (state, getters, rootState, rootGetters) => {
    let obj = getCurrentContractInfo(rootGetters);
    if (obj.symbol) {
      return obj.close;
    }
    return 0;
  },

  askPriceStr: (state, getters, rootState, rootGetters) => {
    let obj = getCurrentContractInfo(rootGetters);
    if (obj.symbol) {
      return obj.sp1;
    }
    return 0;
  },

  offset: (state, getters, rootState, rootGetters) => {
    let obj = getTradingInfo(rootGetters, state);
    if (!obj) return "";
    return obj.offset; // position里面的
  },

  positionId: (state, getters, rootState, rootGetters) => {
    let obj = getPositionInfo(rootGetters, state);
    if (!obj) return "";
    return obj.id; // position里面的id
  },

  positionInfo: (state, getters, rootState, rootGetters) => {
    let obj = getPositionInfo(rootGetters, state);
    if (!obj) return null;
    return obj;
  },

  positionDirect: (state, getters, rootState, rootGetters) => {
    let obj = getPositionInfo(rootGetters, state);
    if (!obj) return "";
    return obj.direct;
  },

  orderPrice: (state, getters, rootState, rootGetters) => {
    let obj = getOrderInfo(rootGetters, state);
    if (!obj) return 0;
    return obj.price;
  },

  direct: (state, getters, rootState, rootGetters) => {
    let obj = getTradingInfo(rootGetters, state);
    if (!obj) return "";
    return obj.direct;
  },

  volume: (state, getters, rootState, rootGetters) => {
    let obj = getTradingInfo(rootGetters, state);
    if (!obj) return 0;
    return obj.volume;
  },
  tradeVolume: (state, getters, rootState, rootGetters) => {
    let obj = getTradingInfo(rootGetters, state);
    if (!obj) return 0;
    return obj.tradeVolume;
  },
  freezeVolume: (state, getters, rootState, rootGetters) => {
    let obj = getTradingInfo(rootGetters, state);
    if (!obj) return 0;
    return obj.freezeVolume;
  },
  remainVolume: (state, getters, rootState, rootGetters) => {
    let obj = getTradingInfo(rootGetters, state);
    if (!obj) return 0;
    return obj.remainVolume;
  },
  forCloseRemainVolume: (state, getters, rootState, rootGetters) => {
    let obj = getTradingInfo(rootGetters, state);
    if (!obj) return 0;
    return obj.forCloseRemainVolume;
  },

  forBuyRemainVolume: (state, getters, rootState, rootGetters) => {
    //买多可卖空
    let obj = getCloseList(rootGetters, state);
    if (!obj) return null;
    return obj.forBUYRemainVolume;
  },
  buyPositionId: (state, getters, rootState, rootGetters) => {
    //买多id
    let obj = getCloseList(rootGetters, state);
    if (!obj) return null;
    return obj.buyPositionId;
  },
  forSellRemainVolume: (state, getters, rootState, rootGetters) => {
    //卖空可卖平
    let obj = getCloseList(rootGetters, state);
    if (!obj) return null;
    return obj.forSELLRemainVolume;
  },
  sellPositionId: (state, getters, rootState, rootGetters) => {
    //卖空id
    let obj = getCloseList(rootGetters, state);
    if (!obj) return null;
    return obj.sellPositionId;
  },
  orderLeverage: (state, getters, rootState, rootGetters) => {
    //委托订单杠杆
    let obj = getOrdersBySymbol(rootGetters, state);
    if (!obj) return null;
    return obj.leverage;
  },
  positionLeverage: (state, getters, rootState, rootGetters) => {
    //持仓订单杠杆
    let obj = getCloseList(rootGetters, state);
    if (!obj) return null;
    return obj.leverage;
  },

  //止损止盈
  riskPriceList: (state, getters, rootState, rootGetters) => {
    let obj = getTradingInfo(rootGetters, state);
    if (!obj) return "";
    return obj.riskPriceList;
  }
};

const actions = {};

const mutations = {
  changeLeverage(state, { leverage }) {
    state.leverage = leverage;
  },
  changeContract(state, { pal, id, symbol }) {
    if (!id) {
      id = "";
    }
    state.id = id;
    state.pal = pal;
    state.symbol = symbol;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
