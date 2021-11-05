import { SocketAPI } from "@/assets/js/WsApi2";

import { getContractInfo, formatPriceByProfitLoss } from "@/assets/js/utils";
import { toFixedStr } from "@/assets/js/add-remove";
//持仓
const state = {
  positions: [],
  positionNameFilter: [], // 持仓订单合约名称过滤表，不重复
  totalPositionProfit: 0, //总持仓盈亏
  type: "actual"
};
const getters = {
  positionList: state => {
    // console.log('持仓订单合约名称',state)
    return state.positions;
  },
  positionCount: state => {
    return symbol => {
      return state.positions
        ? state.positions.filter(o => o.symbol == symbol).length
        : 0;
    };
  },
  getPositions: state => {
    return symbol => {
      let list = state.positions.filter(o => o.symbol == symbol);
      let position = {
        forBUYRemainVolume: 0,
        forSELLRemainVolume: 0,
        buyPositionId: "",
        sellPositionId: "",
        leverage: ""
      };
      if (!list || list.length == 0) return;
      for (let i = 0; i < list.length; i++) {
        let obj = list[i];

        if (obj.direct == "BUY") {
          position.forBUYRemainVolume = obj.forCloseRemainVolume;
          position.buyPositionId = obj.id;
          position.leverage = obj.leverage;
        }
        if (obj.direct == "SELL") {
          position.forSELLRemainVolume = obj.forCloseRemainVolume;
          position.sellPositionId = obj.id;
          position.leverage = obj.leverage;
        }
        console.log("getPositions", obj, "position", position);
      }
      return position;
    };
  },
  getTotalPositionProfit: state => {
    return state.totalPositionProfit;
  },
  getPositionInfo: state => {
    return id => {
      for (let i = 0; i < state.positions.length; i++) {
        let obj = state.positions[i];
        if (obj.id == id) {
          return obj;
        }
      }
      return null;
    };
  },
  positionNameFilter: state => {
    return state.positionNameFilter;
  }
};
const actions = {
  /**
     *
     * @param {*} param0
     * @param {
     * commodityNo : 品种
     * contractNo : 合约
     * direct : 买/卖
     * page : 品种
     * size : size
     * } arg
     *
     * 返回值：
     *  {
            commodityNo (string, optional): 品种代码 ,
            contractNo (string, optional): 合约代码 ,
            direct (string, optional): 买卖方向
            fee (number, optional): 手续费 ,
            freezeVolume (integer, optional): 冻结数量 ,
            id (integer, optional),
            overnightFee (number, optional): 隔夜费 ,F
            price (number, optional): 均价 ,
            riskPriceList (Array[RiskPriceDTO], optional): 止盈止损列表 ,
            settleDate (string, optional): 结算日期 ,
            settleDay (integer, optional): 结算天数 ,
            todayPrice (number, optional): 今日均价 ,
            todayVolume (integer, optional): 今日总量 ,
            volume (integer, optional): 持仓数量
            }RiskPriceDTO {
            gmtCreate (string, optional): 创建时间 ,
            gmtUpdate (string, optional): 修改时间 ,
            id (integer, optional),
            positionId (integer, optional): 持仓Id ,
            stopLossPrice (number, optional): 止损价 ,
            stopProfitPrice (number, optional): 止盈价 ,
            userId (integer, optional): 用户id ,
            volume (integer, optional): 数量
}
     */
  list({ commit, rootState }, arg) {
    if (arg == null) {
      arg = {
        size: 100000,
        tradeType: rootState.tradeType,
        page: 0
      };
    }
    // console.log("!!!!!!!!!!!!!!!!!!!!");
    return SocketAPI.requestDefault("/" + state.type + "/position/list", arg);
  },

  actList({ commit, rootGetters }, [result, query, cmd]) {
    console.log("持仓列表返回结果333333333333", result);
    let array = [];
    let total = 0;
    for (var i = 0; i < result.records.length; i++) {
      let node = result.records[i];
      let info = getContractInfo(rootGetters, node);
      console.log(info);
      if (info) {
        // let currency = rootGetters['currency/getCurrency'](info.currency);
        let tmp = formatPriceByProfitLoss({
          orderType: result.records[i].direct,
          lastPrice: info.close,
          avgFillPrice: result.records[i].price,
          perContractValue: info.perContractValue,
          tradeType: result.records[i].tradeType,
          quantity: result.records[i].volume
        });
        let FPAL = tmp.floatingProfitAndLoss;
        total += tmp.profit;
        let now = new Date(new Date());
        let date = info.expiredTime.substring(0, 19);
        let sdate = new Date(date.replace(/-/g, "/"));
        let days = sdate.getTime() - now.getTime();
        let day = Math.floor(days / (1000 * 60 * 60 * 24));
        let o = {
          contractName: result.records[i].symbol + "*" + info.name,
          name: info.name,
          actualFee: result.records[i].actualFee,
          nameEnglish: info.nameEnglish,
          expiredTime: info.expiredTime,
          expiredDay: (day ? (isNaN(day) ? 0 : day) : 0) + 1,
          symbol: result.records[i].symbol, // 品种代码
          direct: result.records[i].direct, //买卖方向
          fee: result.records[i].fee, //手续费 ,
          freezeVolume: result.records[i].freezeVolume, //冻结数量 ,
          id: result.records[i].id, //
          price: result.records[i].price, //均价 ,
          leverage: result.records[i].leverage,
          FPAL: FPAL, //浮动盈亏
          // riskPriceList: result.records[i].riskPriceList, // 止盈止损列表  []

          volume: result.records[i].volume, //持仓数量
          //以下需要计算
          profit: tmp.profit, //add by hengda
          newPrice: info.close, //最新价
          close: info.close, //最新价

          margin: result.records[i].margin, //保证金
          remainVolume:
            result.records[i].volume - result.records[i].freezeVolume,
          tradeType: result.records[i].tradeType,

          forCloseRemainVolume: (
            result.records[i].volume - result.records[i].freezeVolume
          ).toFixed(info.volumePrecision),
          stopLossPrice: result.records[i].stopLossPrice,
          stopProfitPrice: result.records[i].stopProfitPrice,
          state: "已成交",
          insure: "投机",
          volumePrecision: info.volumePrecision, //成交量精度
          pricePrecision: info.pricePrecision, //价格精度
          symbolvolumePrecision: info.symbolvolumePrecision,
          perContractValue: tmp.perContractValue,
          profitForcedPrice: node.profitForcedPrice, //止盈强平价格
          lossForcedPrice: node.lossForcedPrice, //止损强平价格
          defaultLoss: info.defaultLoss, //默认止损比例
          defaultProfit: info.defaultProfit, //默认止盈比例
          gmtCreate: node.gmtCreate, //保证金券抵扣
          settleDay: node.settleDay, //隔夜时间
          feeDiscountValue: node.feeDiscountValue, //折扣值
          actualMargin: node.actualMargin, //保证金券抵扣
          overnightFee: node.overnightFee, //隔夜手续费
          balanceAccountFee: node.balanceAccountFee, //平仓手续费实际支付
          luckyMoneyOvernightFee: node.luckyMoneyOvernightFee, // 隔夜手续费红包收益抵扣
          marginLuckyMoneyAmount: node.marginLuckyMoneyAmount, // 保证金券面额
          marginLuckyMoneyId: node.marginLuckyMoneyId, // 保证金券面额
          luckyMoneyAccountFee: node.luckyMoneyAccountFee // 开仓手续费红包收益抵扣
        };
        array.push(o);
      }
    }
    console.log("=====666666========", array);

    console.log("================当前持仓订单数据为", array, result);
    // console.log('totaltotaltotal111111',total)

    commit("setList", {
      info: array,
      total: total
    });
  },

  /**
     * 持仓订单的止盈止损设置
     * @param {*} param0
     * @param {*} arg
     *  {
            list (Array[UpsetRiskPriceElement], optional),
            positionId (integer, optional): 持仓id ,
            userId (integer, optional): 用户id
            }
            UpsetRiskPriceElement {
            id (integer, optional): 止盈止损id ,
            stopLossPrice (number, optional): 止损价 ,
            stopProfitPrice (number, optional): 止盈价 ,
            volume (integer, optional): 数量
            }
     */
  riskPrice({ commit }, arg) {
    return SocketAPI.request(
      "/" + state.type + "/position/update/stopPrice",
      arg
    );
  }
};
const mutations = {
  changeDiskStatus(state, { type }) {
    state.type = type;
  },

  clearPositionList(state) {
    state.totalPositionProfit = 0;
    state.positions = [];
  },
  setList(state, data) {
    state.positions = data.info;
    state.totalPositionProfit = data.total.toFixed(2);
  },

  updatePositionList(state, arg) {
    let info = arg.contractInfo;
    // let currency = arg.currency; //add by hengda 2019年11月24日21:49:54
    // let currency = rootGetters['currency/getCurrency']("CNY");
    let positions = state.positions;
    let total = 0;
    for (var i = 0; i < positions.length; i++) {
      if (positions[i].symbol == info.symbol) {
        let profitRes = formatPriceByProfitLoss({
          orderType: positions[i].direct,
          lastPrice: info.close,
          perContractValue: info.perContractValue,
          tradeType: positions[i].tradeType,
          avgFillPrice: positions[i].price,
          quantity: positions[i].volume
        });

        total += profitRes.profit;
        positions[i].profit = profitRes.profit;
        positions[i].FPAL = profitRes.floatingProfitAndLoss;
        positions[i].close = info.close;
        positions[i].newPrice = info.close; //最新价
      } else {
        total += positions[i].profit ? positions[i].profit : 0;
      }
    }
    state.totalPositionProfit = toFixedStr(total, 2);
  },
  updateStoplossPrice(state, data) {
    let positions = state.positions;
    positions.forEach(item => {
      if (item.id == data.id) {
        item[data.key] = parseFloat(data.value);
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
