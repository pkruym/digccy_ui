import { SocketAPI } from "@/assets/js/WsApi2";

import { getContractInfo } from "@/assets/js/utils";

import { ContractInfo } from "@/assets/js/Object/ContractInfo";

//此接口只有撤单和委托订单
//平仓,
const state = {
  orderList: {}, //订单
  orderNameFilter: [], // 委托订单合约名称过滤表，不重复
  transactionDynamics: [], //交易动态
  type: "actual"
};
const getters = {
  getorderList: state => {
    return state.orderList ? state.orderList.records : [];
  },
  orderCount: state => {
    return symbol => {
      return state.orderList && state.orderList.records
        ? state.orderList.records.filter(o => o.symbol == symbol).length
        : 0;
    };
  },
  getOrders: state => {
    return symbol => {
      let list =
        state.orderList && state.orderList.records
          ? state.orderList.records.filter(o => o.symbol == symbol)
          : null;
      let order = {
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
          order.leverage = obj.leverage;
        }
        if (obj.direct == "SELL") {
          order.leverage = obj.leverage;
        }
      }
      return order;
    };
  },
  orderNameFilter: state => {
    return state.orderNameFilter;
  },
  transactionDynamics: state => {
    return state.transactionDynamics;
  },
  getOrderInfo: state => {
    console.log("sssssssssssss");
    return id => {
      for (let i = 0; i < state.orderList.records.length; i++) {
        let obj = state.orderList.records[i];
        if (obj.id == id) {
          return obj;
        }
      }
      return null;
    };
  }
};

const actions = {
  /**
     * 查询订单列表
     * @param {*} param0
     * {
     * commodityNo:品种
     * contractNo:合约
     * direct:买/卖
     * offset:开/平,
     * status:status
     *      ["ACCEPT","QUEUED","MODIFYING","PARTFINISHED","DELETING"] --表示委托订单
     *      [ "PARTDELETED","DELETED"] --撤单
     * priceType 市价单/限价单
     * deleteType 手动撤单/系统撤单 DeleteEnum
     * start 开始时间
     * end 结束时间
     * page:
     * size
     * }
     *
     * 返回参数：
     *  {
            averagePrice (number, optional): 成交均价 ,
            brokerSymbol (string, optional),
            close (string, optional): 平仓类型 = CloseEnum
            commodityNo (string, optional): 品种代码 ,
            contractNo (string, optional): 合约代码 ,
            delete (string, optional): 撤单类型 DeleteEnum,
            deleteTime (string, optional): 撤单时间 ,
            direct (string, optional): 买/卖 =DirectEnum,
            exchangeCustomId (string, optional): 请求交易所自定义唯一id ,
            exchangeOrderId (string, optional): 交易所订单号 ,
            fee (number, optional): 手续费 ,
            id (integer, optional),
            marketPriceType (string, optional): 市价类型 = MarketPriceEnum,
            offset (string, optional): 开/平 = OffsetEnum,
            operatorId (integer, optional): 操作员id ,
            orderPriceType (string, optional): 订单价格类型（市价/限价） = OrderPriceEnum,
            price (number, optional): 下单价 ,
            riskPriceTime (string, optional): 止盈止损时间 ,
            status (string, optional): 订单状态 = OrderStatusEnum
            stopLossPrice (number, optional): 止损价 ,
            stopProfitPrice (number, optional): 止盈价 ,
            time (string, optional): 委托时间 ,
            tradeVolume (integer, optional): 成交数量 ,
            userId (integer, optional): 用户id ,
            volume (integer, optional): 下单数量
}
     */
  list({ commit, rootState, rootGetters }, arg) {
    if (arg == null) {
      console.log("委托挂单状态", rootState);
      arg = {
        status: ["ACCEPT", "QUEUED", "MODIFYING", "PARTFINISHED", "DELETING"],
        size: 100000,
        tradeType: rootState.tradeType,
        page: 0
      };
    }
    console.log("发送委托请求", arg);
    return SocketAPI.requestDefault("/" + state.type + "/order/list", arg);
  },

  actList({ commit, rootGetters }, [result, query, cmd]) {
    for (var i = 0; i < result.records.length; i++) {
      let node = result.records[i];
      let info = getContractInfo(rootGetters, node);
      result.records[i].contractName = node.symbol + "*" + node.name;
      result.records[i].newPrice = info.newPrice;
      result.records[i].margin = result.records[i].margin; //保证金
      result.records[i].remainVolume =
        result.records[i].volume - result.records[i].tradeVolume; //剩余手数
      result.records[i].name = info.name;
      result.records[i].nameEnglish = info.nameEnglish;
      result.records[i].stopLossAmount = result.records[i].stopLossAmount; // 止损价
      result.records[i].stopProfitAmount = result.records[i].stopProfitAmount; // 止盈价
      result.records[i].volumePrecision = info.volumePrecision; //成交量精度
      result.records[i].pricePrecision = info.pricePrecision; //价格精度
      result.records[i].profitForcedPrice = info.profitForcedPrice; //止盈强平价格
      result.records[i].lossForcedPrice = info.lossForcedPrice; //止损强平价格
      result.records[i].defaultLoss = info.defaultLoss; //默认止损比例
      result.records[i].defaultProfit = info.defaultProfit; //默认止盈比例
    }
    console.log("测试数据库", result);
    commit("setList", result);
  },

  // 撤单记录
  getCancelList({ commit, rootGetters }, arg) {
    console.log("撤单请求", arg);
    arg.status = ["FAIL", "DELETED"];
    return new Promise((resolve, reject) => {
      SocketAPI.request("/" + state.type + "/order/list", arg)
        .then(res => {
          for (var i = 0; i < res.records.length; i++) {
            let node = res.records[i];
            let info = getContractInfo(rootGetters, node);
            res.records[i].margin = node.margin; //保证金
            res.records[i].contractName = node.symbol + "*" + info.name;
            res.records[i].name = info.name;
            res.records[i].nameEnglish = info.nameEnglish;
          }
          resolve(res);
        })
        .catch(reason => {
          reject(reason);
        });
    });
    // return SocketAPI.request(state.type+"/order/list", arg);
  },
  // 撤单记录
  queryOrderCount({ commit, rootGetters }, arg) {
    // arg.status = ["PARTDELETED", "DELETED"];
    return SocketAPI.request("/" + state.type + "/order/queryOrderCount", arg);
  },

  //平仓
  // close (string, optional) = ['STOP_PROFIT', 'STOP_LOSS', 'MANUAL_MARKET', 'MANUAL_LIMIT', 'MANUAL_REVERSE', 'FORCE_SYSTEM', 'FORCE_MANUAL', 'FORCE_LIMIT', 'NOT_ENOUGH_DELAYFEE', 'NOT_ENOUGH_DEPOSIT', 'CONTRACT_EXPIRED']stringEnum:"STOP_PROFIT", "STOP_LOSS", "MANUAL_MARKET", "MANUAL_LIMIT", "MANUAL_REVERSE", "FORCE_SYSTEM", "FORCE_MANUAL", "FORCE_LIMIT", "NOT_ENOUGH_DELAYFEE", "NOT_ENOUGH_DEPOSIT", "CONTRACT_EXPIRED",
  // marketPriceType (string, optional): 平仓市价单类型（市价单生效） = ['NORMAL', 'ALL', 'FAST', 'REVERSE']stringEnum:"NORMAL", "ALL", "FAST", "REVERSE",
  // marketPriceType (string, optional): 平仓市价单类型（jacky说都传） = ['NORMAL', 'ALL', 'FAST', 'REVERSE']stringEnum:"NORMAL", "ALL", "FAST", "REVERSE",
  // orderPriceType (string, optional): 价格类型 = ['LIMIT', 'MARKET']stringEnum:"LIMIT", "MARKET",
  // positionId (integer, optional): 持仓id ,
  // price (number, optional): 价格（限价单生效）,
  // userId (integer, optional): 用户id ,
  // volume (integer, optional): 数量（限价单、市价拆分平仓单生效）
  // }

  //全部平仓
  //{
  // orderPriceType： "MARKET"
  // marketPriceType：“ALL”
  // }

  //市价反手：
  //{
  //  "marketPriceType":"REVERSE",
  //  "orderPriceType":"MARKET",
  //  "positionId":"1117632829035905024",
  //  "volume":"5"
  // }
  close({ commit }, arg) {
    console.log(arg);
    return SocketAPI.request("/" + state.type + "/order/close", arg);
  },

  //开仓
  // {
  //     commodityNo (string, optional): 品种编号 ,
  //     contractNo (string, optional): 合约编号 ,
  //     direct (string, optional): 买/卖 = ['BUY', 'SELL']stringEnum:"BUY", "SELL",
  //     marketType (integer, optional): 市价单类型（市价单生效） , 开仓的时候为0 锁仓是1
  //     orderPriceType (string, optional): 价格类型 = ['LIMIT', 'MARKET']stringEnum:"LIMIT", "MARKET",
  //     price (number, optional): 价格（限价单生效） ,
  //     stopLossPoint (integer, optional): 止损点位 ,
  //     stopProfitPoint (integer, optional): 止盈点位 ,
  //     userId (integer, optional): 用户id ,
  //     volume (integer, optional): 数量
  //     }

  // 快捷锁仓：
  // {
  // "commodityNo":"CL",
  // "contractNo":"1905",
  // "direct":"SELL",（与持仓反方向）
  // "marketType":"1",
  // "orderPriceType":"MARKET",
  // "price":"63.66",
  // "volume":"5"
  // }
  open({ commit }, arg) {
    return SocketAPI.request("/" + state.type + "/order/open", arg);
  },

  /**
     * 委托列表的止盈止损
     * @param {*} param0
     * @param {*} arg
     *  {
            orderId (integer, optional): 订单id ,
            stopLossPrice (number, optional): 止损价 ,
            stopProfitPrice (number, optional): 止盈价
        }
     */
  riskPrice({ commit }, arg) {
    return SocketAPI.request("/" + state.type + "/order/update/riskPrice", arg);
  },

  /**
     * 撤单
     * @param {*} param0
     * @param {*} arg
     * {
            orderId (integer, optional): 订单编号
        }
     */
  delete({ commit, state }, arg) {
    if (arg.orderId == null) {
      let list = state.orderList.records;
      let ids = [];
      for (var i = 0; i < list.length; i++) {
        ids.push({
          orderId: list[i].id
        });
      }
      const promises = ids.map(function(id) {
        return SocketAPI.request("/" + state.type + "/order/delete", id);
      });
      return Promise.all(promises);
    }
    return SocketAPI.request("/" + state.type + "/order/delete", arg);
  }
};
const mutations = {
  changeDiskStatus(state, { type }) {
    state.type = type;
  },
  clearEntrustList(state) {
    state.orderList = null;
  },
  setList(state, array) {
    console.log("赋值对象那个", array);
    state.orderList = array;
    console.log("委托回来的数据", state.orderList.records);
  },

  updateEntrustListNewPrice(state, info) {
    if (!state.orderList || !state.orderList.records) return;
    for (var i = 0; i < state.orderList.records.length; i++) {
      if (
        state.orderList.records[i].symbol == info.symbol &&
        state.orderList.records[i].close != info.close
      ) {
        state.orderList.records[i].close = info.close; //最新价
        state.orderList.records[i].newPrice = info.close; //最新价
      }
    }
  },
  setTransactionDynamics(state, transaction) {
    state.transactionDynamics.push(transaction);

    let maxL = 2;
    let l = state.transactionDynamics.length;

    if (l > maxL) {
      state.transactionDynamics = state.transactionDynamics.slice(l - maxL, l);
    }
    console.log(state.transactionDynamics, "当前交易动态");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
