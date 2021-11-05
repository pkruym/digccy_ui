import { SocketAPI } from "@/assets/js/WsApi2";
import { getContractInfo } from "@/assets/js/utils";

const state = {
  // balance (number, optional): 用户余额 ,
  // currency (string, optional): 币种 ,
  // freezeCapital (number, optional): 冻结资金 ,
  // freezeDeposit 冻结保证金
  // id (integer, optional): 资金账户id ,
  // userId (integer, optional): 用户ID
  type: "actual",
  //账户余额  可用余额--计算 冻结保证金 持仓盈亏--计算 今平仓盈亏 累计平仓盈亏
  account: {
    balance: 0, // 用户余额 1.7 availableBalance
    currency: "", //币种
    freezeCapital: 0, //冻结资金
    freezeMargin: 0, //冻结保证金
    floatAvailableBalance: 0.0, //可用余额
    positionProfit: 0, //持仓盈亏
    todayProfit: 0, //今平仓盈亏
    totalProfit: 0, //累计平仓盈亏
    profitLuckyMoney: 0, //红包收益
    totalLuckyMoney: 0 // 红包卡券金额
  }
};
const getters = {
  accountInfo: state => {
    return state.account;
  },
  personalMsgKey: (state, getters, rootState, rootGetters) => {
    let arr = [
      {
        id: 0,
        til: "账户余额",
        value: 0
      },
      {
        id: 1,
        til: "可用余额",
        value: 0
      },
      {
        id: 2,
        til: "冻结保证金",
        value: 0
      },
      {
        id: 3,
        til: "持仓盈亏",
        value: 0
      },
      {
        id: 4,
        til: "今平仓盈亏",
        value: 0
      },
      {
        id: 5,
        til: "红包收益",
        value: 0
      },
      {
        id: 6,
        til: "红包卡券金额",
        value: 0
      }
      // {
      //     id: 5,
      //     til: "累计平仓盈亏",
      //     value: 0
      // }
    ];
    const toFixed2 = num => {
      let val = Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
      val = val || 0;
      let s = val.toString().split(".");
      if (s.length == 1) {
        val = val.toString() + ".00";
        return val;
      }
      if (s.length > 1) {
        if (s[1].length < 2) {
          val = val.toString() + "0";
        }
        return val;
      }
      return val;
    };
    arr[0].value = toFixed2(state.account.balance ? state.account.balance : 0); //用户余额
    arr[2].value = toFixed2(
      state.account.freezeMargin ? state.account.freezeMargin : 0
    ); //冻结保证金
    arr[4].value = rootGetters["actual/traderecord/getTodayProfit"]; //今平仓盈亏 /////1. Dave说去掉
    // arr[4].value = (state.account.totalProfit).toFixed(2); //累计平仓盈亏 //2.Dave说用今日
    let positionTotal = rootGetters["actual/position/getTotalPositionProfit"];
    arr[3].value = positionTotal; //持仓盈亏
    let yVal = //处理精度不准确的问题
      arr[0].value * 10000 - state.account.freezeCapital * 10000
        ? (arr[0].value * 10000 - state.account.freezeCapital * 10000) / 10000
        : 0; //2.0改成 账户余额- 冻结保证金
    //可用余额
    arr[1].value = toFixed2(yVal);
    arr[5].value = toFixed2(state.account.profitLuckyMoney);
    arr[6].value = toFixed2(state.account.totalLuckyMoney);
    return arr;
  }
};
const actions = {
  /**
     * 获取交易流水
     * @param {*} param0
     * @param {*} param1
     * 备注：
     * 入参的结构：
     * {
        creditDebit, 类型 CreditDebitEnum
        typeList, 类型 CreditTypeListEnum
        start, //时间格式 yyyy-MM-dd HH:mm:ss
        end, //时间格式 yyyy-MM-dd HH:mm:ss
        page,
        size,
    }
    返回参数
        amount (number, optional): 流水金额 ,
        balance (number, optional): 账户余额 ,
        creditDebit (string, optional): CreditDebitEnum
        freezeCapital (number, optional): 冻结资金 ,
        gmtCreate (string, optional): 时间 ,
        id (integer, optional): 流水id ,
        remark (string, optional): 备注信息(如交易品种合约等Json格式信息) ,
        transactionRefrence (integer, optional): 关联id ,
        type (string, optional): 流水类型 = CreditTypeListEnum
        typeDescription (string, optional),
        userId (integer, optional): 用户id
     */
  flowList({ commit, state, rootGetters }, arg) {
    return new Promise((resolve, reject) => {
      SocketAPI.request("/" + state.type + "/account/flow/list", arg)
        .then(res => {
          for (var i = 0; i < res.records.length; i++) {
            let node = res.records[i];
            if (res.records[i].remark) {
              res.records[i].remark = JSON.parse(res.records[i].remark);
              let act = res.records[i].remark;
              let info = getContractInfo(rootGetters, act.data);
              res.records[i].contractName = info.contractName;
              res.records[i].name = info.name;
              res.records[i].tradeType = info.tradeType;
              res.records[i].symbol = info.symbol;
            } else {
              res.records[i].contractName = "错误数据";
            }
          }
          resolve(res);
        })
        .catch(reason => {
          reject(reason);
        });
    });
    // return SocketAPI.request("/actual/account/flow/list", arg)
  },
  luckyList({ commit }, args) {
    return SocketAPI.request("/actual/account/flow/lucky/list", args);
  },
  /**
     *  // 资金明细
        返回值
    // totalPayAmount：入金
    // totalWithdrawAmount：出金
    // totalFee：交易综合费
    // totalProfit：平仓盈亏
    // totalProfitLossRate：平仓盈亏率
    // totalDeposit：交易保证金
    // totalOvernightFee：隔夜保证金
    // totalFreezeCapital：冻结资金
    // totalAvailableBalance：可用余额
    // totalBalance：账户余额
     * @param {*} param0
     */
  flowTotal({ commit, state }) {
    return SocketAPI.request("/" + state.type + "/account/flow/total");
  },
  flowCount({ commit, state }, param) {
    return SocketAPI.request("/" + state.type + "/account/flow/count", param);
  },

  /**
   * 获取用户资金账户
   * @param {*} param0
   */
  query({ commit, state }, param) {
    return SocketAPI.requestDefault("/" + state.type + "/account/query", param);
  },
  /**
   * 获取用户资金账户和红包收益账户
   * @param {*} param0
   */
  queryMulti({ commit, state }, param) {
    return SocketAPI.requestDefault(
      "/" + state.type + "/account/query/multi",
      param
    );
  },
  queryLucky({ commit, state }, param) {
    return SocketAPI.requestDefault("/luckyMoney/userLuckyMoney", param);
  },
  ////////////////////////////////////////////////////////Notice
  // /**
  //目前pc界面没有这个功能
  //  * 查询未读通知数量
  //  * @param {*} param0
  //  * return number
  //  */
  noticeCountUnread({ commit, state }) {
    return SocketAPI.request("/" + state.type + "/notice/count/unread");
  },

  /**
     * 查询通知列表
     * @param {*} param0
     * 返回值：[]
     * category (string, optional): 类型 NoticeCategoryEnum = ['ACCOUNT', 'POSITION', 'ORDER', 'DELETE', 'TRADERECORD']
        content (string, optional): 内容 ,
        id (integer, optional), 返回回来的是str
        time (string, optional): 时间 ,
        title (string, optional): 标题 ,
        unread (boolean, optional): 没有阅读
     */
  noticeList({ commit, state }) {
    return SocketAPI.request("/" + state.type + "/notice/list", {
      size: 1000,
      time: new Date().getTime()
    });
  }
  //pc 不提供该功能
  // /**
  //  * 阅读通知
  //  * @param {*} param0
  //  * @param {*} param1
  //  * {
  //         "idList": [
  //             ""
  //         ],
  //         "type": "ACTUAL"  // or SIMULATE
  //     }
  //  */
  // noticeRead({
  //     commit,
  //     state
  // }, arg) {
  //     return SocketAPI.request("/actual/notice/read", arg);
  // },
};
const mutations = {
  changeDiskStatus(state, { type }) {
    state.type = type;
  },
  clearQuery(state) {
    state.account = {
      balance: 0, // 用户余额 1.7 availableBalance
      currency: "", //币种
      freezeCapital: 0, //冻结资金
      freezeMargin: 0, //冻结保证金
      floatAvailableBalance: 0.0, //可用余额
      positionProfit: 0, //持仓盈亏
      todayProfit: 0, //今平仓盈亏
      totalProfit: 0, //累计平仓盈亏
      profitLuckyMoney: 0, //红包收益
      totalLuckyMoney: 0 // 红包卡券金额
    };
  },
  /**
   * 设置用户资金账户
   * @param {} state
   * @param {*} array
   */
  mutQuery(state, array) {
    let [result, query, cmd] = array;
    console.log("设置用户资金账户", cmd, query, result);
    // state.account = result;
    state.account.balance = result.balance; // 用户余额 1.7 availableBalance
    state.account.freezeMargin = result.freezeMargin; //冻结保证金
    state.account.freezeCapital = result.freezeCapital; //冻结金
    state.account.profitLuckyMoney = result.profitLuckyMoney
      ? result.profitLuckyMoney
      : 0; //红包账户
    state.account.totalLuckyMoney = result.totalLuckyMoney
      ? result.totalLuckyMoney
      : 0; //用户未使用的红包总和
  },
  // 设置用户资金账户
  // mutQueryMulti(state, array) {
  //   let [result] = array;
  //   let account = result.find(d => d.currency == "USDT");
  //   let redAccount = result.find(d => d.currency == "LUCKY_MONEY");
  //   // console.log("设置用户资金账户", cmd, query, result);
  //   // state.account = result;
  //   state.account.balance = account.balance; // 用户余额 1.7 availableBalance
  //   state.account.freezeMargin = account.freezeMargin; //冻结保证金
  //   state.account.freezeCapital = account.freezeCapital; //冻结金
  //   //红包账户
  //   state.account.redBalance = redAccount.balance;
  // },
  mutQueryLucky(state, array) {
    console.log("红包卡券总金额", array);
    let [result] = array;
    console.log("红包卡券总金额", result);
    // state.account.redToatal = redAccount.balance;
  },
  setTradeInfoQuery(state, info) {
    console.log("account 设置用户的今平仓盈亏 累计平仓盈亏", info);
    state.account.todayProfit = info.todayProfit; //今平仓盈亏
    state.account.totalProfit = info.totalProfit; //累计平仓盈亏
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
