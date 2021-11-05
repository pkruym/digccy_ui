import { SocketAPI } from "@/assets/js/WsApi2";

import { getContractInfo } from "@/assets/js/utils";
import { toFixedStr } from "@/assets/js/add-remove";
//此文件包含成交和平仓
const state = {
  todayProfit: 0,
  todayBalanceFee: 0,
  todayProfitBalance: 0,
  type: "actual"
};
const getters = {
  getTodayProfit(state) {
    return state.todayProfit;
  },
  getTodayProfitBalance(state) {
    return state.todayProfitBalance;
  },
  todayBalanceFee(state) {
    return state.todayBalanceFee;
  }
};
const actions = {
  /**
     * 平仓，成交记录
     * @param {*} param0
     * @param {
     * commodityNo:品种
     * contractNo:合约
     * direct:买/卖
     * offset:开/平,
     * priceType：市价单/限价单
     * closeList 平仓类型
     * start 开始时间
     * end 结束时间
     * page:
     * size
     * } arg
     * 返回值
     *  {
            close (string, optional): 平仓类型 = ['STOP_PROFIT', 'STOP_LOSS', 'MANUAL_MARKET', 'MANUAL_LIMIT', 'MANUAL_REVERSE', 'FORCE_SYSTEM', 'FORCE_MANUAL', 'FORCE_LIMIT', 'NOT_ENOUGH_DELAYFEE', 'NOT_ENOUGH_DEPOSIT', 'CONTRACT_EXPIRED']stringEnum:"STOP_PROFIT", "STOP_LOSS", "MANUAL_MARKET", "MANUAL_LIMIT", "MANUAL_REVERSE", "FORCE_SYSTEM", "FORCE_MANUAL", "FORCE_LIMIT", "NOT_ENOUGH_DELAYFEE", "NOT_ENOUGH_DEPOSIT", "CONTRACT_EXPIRED",
            commodityNo (string, optional): 品种代码 ,
            contractNo (string, optional): 合约代码 ,
            deposit (number, optional): 保证金 ,
            direct (string, optional): 买/卖 = ['BUY', 'SELL']stringEnum:"BUY", "SELL",
            fee (number, optional): 手续费 ,
            id (integer, optional): 记录id ,
            offset (string, optional): 开/平 = ['OPEN', 'CLOSE']stringEnum:"OPEN", "CLOSE",
            openPrice (number, optional): 开仓均价 ,
            orderId (integer, optional): 订单id ,
            orderPrice (number, optional): 订单委托价 ,
            orderPriceType (string, optional): 订单价格类型（市价/限价） = ['LIMIT', 'MARKET']stringEnum:"LIMIT", "MARKET",
            overnightFee (number, optional): 隔夜费 ,
            price (number, optional): 成交价 ,
            profit (number, optional): 盈亏 ,
            profitPrice (number, optional): 盈亏价位 ,
            stopLossPrice (number, optional): 止损价 ,
            stopProfitPrice (number, optional): 止盈价 ,
            time (string, optional): 成交时间 ,
            userId (integer, optional): 用户id ,
            volume (integer, optional): 成交数量 ,
            warehouseAmount (number, optional): 穿仓金额
}
     */
  list({ commit, rootState, rootGetters }, { param }) {
    return new Promise((resolve, reject) => {
      (param.tradeType = rootState.tradeType),
        SocketAPI.request("/" + state.type + "/tradeRecord/list", param)
          .then(res => {
            console.log("展示commodity", res);
            for (var i = 0; i < res.records.length; i++) {
              let node = res.records[i];
              res.records[i].insure = "投机";
              let info = getContractInfo(rootGetters, node);
              // res[i]._status = "全部成交";
              res.records[i].contractName = node.symbol + "*" + info.name;
              res.records[i].nameEnglish = info.nameEnglish;
              res.records[i].name = info.name;
            }
            resolve(res);
          })
          .catch(reason => {
            reject(reason);
          });
    });
  },
  //当日盈亏（个人分析用）
  sumProfit({ commit, state, rootState }) {
    let args = {};
    // if (parames) {
    //   args = {
    //     tradeType: rootState.tradeType
    //   };
    // }
    return SocketAPI.request("/" + state.type + "/tradeRecord/sumProfit", args)
      .then(res => {
        commit("setTodayProfit", res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  //获取结算列表今日平仓盈亏数据
  getTodayProfit({ commit, state, rootState }) {
    let args = {};
    args = {
      tradeType: rootState.tradeType
    };
    return SocketAPI.request(
      "/" + state.type + "/tradeRecord/todayProfit",
      args
    )
      .then(res => {
        commit("setTodayProfitSinger", res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  queryTradeCount({ commit, state }, param) {
    return SocketAPI.requestDefault(
      "/" + state.type + "/tradeRecord/queryTradeCount",
      param
    );
  },
  //总盈亏
  totalProfitFee({ commit, state }, param) {
    return SocketAPI.request(
      "/" + state.type + "/tradeRecord/totalProfitFee",
      param
    );
  },
  //盈亏走势报表
  quertProfitSummery({ commit, state }, param) {
    return SocketAPI.request(
      "/" + state.type + "/tradeRecord/quertProfitSummery",
      param
    );
  },
  //龙虎榜盈利
  queryProfitRank({ commit, state }, param) {
    return SocketAPI.requestDefault(
      "/" + state.type + "/tradeRecord/queryProfitRank",
      param
    );
  },

  //龙虎榜手数
  queryVolumeRank({ commit, state }, param) {
    return SocketAPI.requestDefault(
      "/" + state.type + "/tradeRecord/queryVolumeRank",
      param
    );
  },

  //龙虎榜详情
  queryUserDetail({ commit, state }, param) {
    return SocketAPI.requestDefault(
      "/" + state.type + "/tradeRecord/queryUserDetail",
      param
    );
  },
  //龙虎榜交易收益
  queryTradeRevenue({ commit, state }, param) {
    return SocketAPI.requestDefault(
      "/" + state.type + "/tradeRecord/queryTradeRevenue",
      param
    );
  },
  //龙虎榜交易占比
  queryTradeAccount({ commit, state }, param) {
    return SocketAPI.requestDefault(
      "/" + state.type + "/tradeRecord/queryTradeAccount",
      param
    );
  }
};
const mutations = {
  changeDiskStatus(state, { type }) {
    state.type = type;
  },
  setTodayProfit(state, res) {
    console.log("今日平仓盈亏", res);
    state.todayProfitBalance= 0;
    state.todayBalanceFee= 0;
    if (res) {
      state.todayProfitBalance = toFixedStr(res.todayProfit);
      state.todayBalanceFee = toFixedStr(res.todayBalanceFee, 2);
    }
  },
  setTodayProfitSinger(state, data) {
    state.todayProfit = data ? toFixedStr(data, 2) : "--";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
