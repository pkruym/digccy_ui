import i18n from "./../../../lang";

export const NoticeCategoryEnum = {
  in: {
    ACCOUNT: "ACCOUNT",
    POSITION: "POSITION",
    ORDER: "ORDER",
    DELETE: "DELETE",
    TRADERECORD: "TRADERECORD"
  },
  out: {
    ACCOUNT: "资金",
    POSITION: "持仓",
    ORDER: "挂单",
    DELETE: "撤单",
    TRADERECORD: "结算"
  }
};

// 市场类型
export const marketTypeEnum = {
  out: {
    INNER: "外盘期货",
    OUTER: "内盘期货",
    DIGICCY: "数字货币"
  },
  in: {
    INNER: "INNER",
    OUTER: "OUTER",
    DIGICCY: "DIGICCY"
  }
};

// 充值状态枚举类
export const rechargeStatusEnum = {
  out: {
    PENDING: "待支付",
    SUCCESS: "支付成功",
    FAIL: "支付失败",
    CLOSE: "支付关闭"
  },
  in: {
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    FAIL: "FAIL",
    CLOSE: "CLOSE"
  }
};

//订单状态枚举类
export const statusEnum = {
  out: {
    FAIL: i18n.tc("tableFilter.Instructionfailed"),
    ACCEPT: i18n.tc("tableFilter.Accepted"),
    QUEUED: i18n.tc("tableFilter.Queued"),
    MODIFYING: i18n.tc("tableFilter.Tobemodified"),
    DELETING: i18n.tc("tableFilter.Pendingrevocation"),
    PARTDELETED: i18n.tc("tableFilter.Partialcancellation"),
    DELETED: i18n.tc("tableFilter.Completecancellation"),
    PARTFINISHED: i18n.tc("tableFilter.Partialdeal"),
    FINISHED: i18n.tc("tableFilter.Completed")
  },
  in: {
    FAIL: "FAIL",
    ACCEPT: "ACCEPT",
    QUEUED: "QUEUED",
    MODIFYING: "MODIFYING",
    DELETING: "DELETING",
    PARTDELETED: "PARTDELETED",
    DELETED: "DELETED",
    PARTFINISHED: "PARTFINISHED",
    FINISHED: "FINISHED"
  }
};

//收入支出类型枚举类
export const CreditDebitEnum = {
  out: {
    CREDIT: "收入",
    DEBIT: "支出",
    FREEZE: "资金冻结",
    UNFREEZE: "资金解冻"
  },
  in: {
    CREDIT: "CREDIT",
    DEBIT: "DEBIT",
    FREEZE: "FREEZE",
    UNFREEZE: "UNFREEZE"
  }
};
//资金流水查询的typeList
export const CreditTypeListEnum = {
  xui: [
    {
      val: null,
      lable: i18n.tc("select.text1")
    },
    {
      val: [
        "DEBIT_FEE",
        "FREEZE_FEE",
        "UNFREEZE_FEE",
        "DEBIT_FEE",
        "CREDIT_REBATE_FEE"
      ],
      lable: i18n.tc("select.text2")
    },
    {
      val: ["FREEZE_DEPOSIT", "UNFREEZE_DEPOSIT"],
      lable: i18n.tc("select.text3")
    },
    // {
    //     val: ["UNFREEZE_OVERNIGHT_DEPOSIT", "FREEZE_OVERNIGHT_DEPOSIT"],
    //     lable: '隔夜保证金'
    // },
    {
      val: ["CREDIT_DAY_PROFIT_RANK_AWARD"],
      lable: i18n.tc("leverageTrading.CREDIT_DAY_PROFIT_RANK_AWARD")
    },
    {
      val: ["CREDIT_PROFIT", "CREDIT_DAY_PROFIT_RANK_AWARD"],
      lable: i18n.tc("select.text4")
    },
    {
      val: ["DEBIT_LOSS"],
      lable: i18n.tc("select.text5")
    },
    {
      val: ["CREDIT_PAYMENT"],
      lable: i18n.tc("select.text6")
    },
    {
      val: ["DEBIT_WITHDRAW", "FREEZE_WITHDRAW", "UNFREEZE_WITHDRAW"],
      lable: i18n.tc("select.text7")
    },
    {
      val: ["CREDIT_UP"],
      lable: i18n.tc("select.text8")
    },
    {
      val: ["DEBIT_DOWN"],
      lable: i18n.tc("select.text9")
    }
  ],
  ui: [
    "手续费",
    "交易保证金",
    "隔夜保证金",
    "隔夜延期费",
    "盈利",
    "亏损",
    "充值",
    "提现"
  ],
  in: {
    transactionComprehensiveFee: [
      "DEBIT_FEE",
      "FREEZE_FEE",
      "UNFREEZE_FEE",
      "DEBIT_FEE",
      "CREDIT_REBATE_FEE"
    ], //"手续费"
    tradingMargin: ["FREEZE_DEPOSIT", "UNFREEZE_DEPOSIT"], //交易保证金
    overnightDeposit: [
      "UNFREEZE_OVERNIGHT_DEPOSIT",
      "FREEZE_OVERNIGHT_DEPOSIT"
    ], //隔夜保证金
    "overnightDeferral fee": ["DEBIT_OVERNIGHT_FEE"], //隔夜延期费
    profit: ["CREDIT_PROFIT", "CREDIT_DAY_PROFIT_RANK_AWARD"], //盈利
    loss: ["DEBIT_LOSS"], //亏损
    charge: ["CREDIT_PAYMENT", " CREDIT_PAYMENT_MONEY", " CREDIT_PAYMENT_COIN"], //充值
    cash: [
      "DEBIT_WITHDRAW",
      "FREEZE_WITHDRAW",
      "UNFREEZE_WITHDRAW",
      "DEBIT_WITHDRAW_MONEY",
      "DEBIT_WITHDRAW_COIN",
      "FREEZE_WITHDRAW_MONEY",
      "FREEZE_WITHDRAW_COIN",
      "UNFREEZE_WITHDRAW_MONEY",
      "UNFREEZE_WITHDRAW_COIN"
    ] //提现
  },
  out: {
    CREDIT: i18n.tc("leverageTrading.income"),
    CREDIT_PAYMENT: i18n.tc("leverageTrading.recharge"),
    CREDIT_PAYMENT_MONEY: "OTC充值",
    CREDIT_PAYMENT_COIN: "钱包充币",
    DEBIT_WITHDRAW_MONEY: "OTC出售成功",
    DEBIT_WITHDRAW_COIN: "钱包提币成功",
    FREEZE_WITHDRAW_MONEY: "OTC出售冻结",
    FREEZE_WITHDRAW_COIN: "钱包提币冻结",
    UNFREEZE_WITHDRAW_MONEY: "OTC出售解冻",
    UNFREEZE_WITHDRAW_COIN: "钱包提币解冻",

    CREDIT_PROFIT: i18n.tc("leverageTrading.profit"),
    CREDIT_SIGNUP: i18n.tc("leverageTrading.simulation"),
    CREDIT_UP: i18n.tc("leverageTrading.simulation"),
    CREDIT_REBATE_OVERNIGHT_FEE: i18n.tc("leverageTrading.overnightfee"),
    CREDIT_REBATE_FEE: i18n.tc("leverageTrading.commissionrebate"),
    DEBIT: i18n.tc("leverageTrading.expenditure"),
    DEBIT_WITHDRAW: i18n.tc("leverageTrading.withdraw"),
    DEBIT_LOSS: i18n.tc("leverageTrading.loss"),
    DEBIT_FEE: i18n.tc("leverageTrading.deductionhandling"),
    CREDIT_DAY_PROFIT_RANK_AWARD: i18n.tc(
      "leverageTrading.CREDIT_DAY_PROFIT_RANK_AWARD"
    ),
    DEBIT_OVERNIGHT_FEE: i18n.tc("leverageTrading.overnightDeduction"),
    DEBIT_DOWN: i18n.tc("leverageTrading.subsetting"),
    FREEZE: i18n.tc("leverageTrading.fundsfrozen"),
    FREEZE_FEE: i18n.tc("leverageTrading.feefreeze"),
    FREEZE_DEPOSIT: i18n.tc("leverageTrading.marginfreeze"),
    FREEZE_DEPOSIT_FEE: i18n.tc("leverageTrading.freezemargin"),
    FREEZE_DOWN_FREEZE: i18n.tc("leverageTrading.freezedown"),
    FREEZE_WITHDRAW: i18n.tc("leverageTrading.freezewithdrawal"),
    UNFREEZE: i18n.tc("leverageTrading.thawfunds"),
    UNFREEZE_FEE: i18n.tc("leverageTrading.thawingfee"),
    UNFREEZE_DEPOSIT: i18n.tc("leverageTrading.unfreezing"),
    UNFREEZE_DEPOSIT_FEE: i18n.tc("leverageTrading.marginandfees"),
    UNFREEZE_OVERNIGHT_DEPOSIT: i18n.tc("leverageTrading.overnightthawing"),
    UNFREEZE_DOWN_THAW: i18n.tc("leverageTrading.thaw"),
    UNFREEZE_WITHDRAW: i18n.tc("leverageTrading.thawingwithdrawal")
  }
};

export const orderPriceTypeEnum = {
  in: {
    LIMIT: "LIMIT", //限价
    MARKET: "MARKET" //市价
  },
  out: {
    LIMIT: i18n.tc("tableFilter.limit"),
    MARKET: i18n.tc("tableFilter.market")
  }
};

// 平仓市价单类型
export const MarketPriceEnum = {
  NORMAL: "拆分平仓",
  ALL: "全部平仓",
  FAST: "快捷平仓",
  REVERSE: "市价反手"
};

// 平仓类型枚举
export const closeEnum = {
  in: {
    STOP_PROFIT: "STOP_PROFIT",
    STOP_LOSS: "STOP_LOSS",
    OVERNIGHT_SETTLE_EXPIRED: "OVERNIGHT_SETTLE_EXPIRED",
    FORCE_PROFIT_SYSTEM: "FORCE_PROFIT_SYSTEM",
    FORCE_LOSS_SYSTEM: "FORCE_LOSS_SYSTEM",
    MANUAL_MARKET: "MANUAL_MARKET",
    MANUAL_LIMIT: "MANUAL_LIMIT",
    MANUAL_REVERSE: "MANUAL_REVERSE",
    FORCE_SYSTEM: "FORCE_SYSTEM",
    FORCE_MANUAL: "FORCE_MANUAL",
    FORCE_LIMIT: "FORCE_LIMIT",
    NOT_ENOUGH_DELAYFEE: "NOT_ENOUGH_DELAYFEE",
    NOT_ENOUGH_DEPOSIT: "NOT_ENOUGH_DEPOSIT",
    CONTRACT_EXPIRED: "CONTRACT_EXPIRED",
    TRANSACTION_EXPIRED: "TRANSACTION_EXPIRED"
  },
  out: {
    STOP_PROFIT: i18n.tc("leverageTrading.STOP_PROFIT"),
    STOP_LOSS: i18n.tc("leverageTrading.STOP_LOSS"),
    OVERNIGHT_SETTLE_EXPIRED: i18n.tc(
      "leverageTrading.OVERNIGHT_SETTLE_EXPIRED"
    ),
    FORCE_PROFIT_SYSTEM: i18n.tc("leverageTrading.FORCE_PROFIT_SYSTEM"),
    FORCE_LOSS_SYSTEM: i18n.tc("leverageTrading.FORCE_LOSS_SYSTEM"),
    MANUAL_MARKET: i18n.tc("leverageTrading.MANUAL_MARKET"),
    MANUAL_LIMIT: i18n.tc("leverageTrading.MANUAL_LIMIT"),
    MANUAL_REVERSE: i18n.tc("leverageTrading.MANUAL_REVERSE"),
    FORCE_SYSTEM: i18n.tc("leverageTrading.FORCE_SYSTEM"),
    FORCE_MANUAL: i18n.tc("leverageTrading.FORCE_MANUAL"),
    FORCE_LIMIT: i18n.tc("leverageTrading.FORCE_LIMIT"),
    NOT_ENOUGH_DELAYFEE: i18n.tc("leverageTrading.NOT_ENOUGH_DELAYFEE"),
    NOT_ENOUGH_DEPOSIT: i18n.tc("leverageTrading.NOT_ENOUGH_DEPOSIT"),
    CONTRACT_EXPIRED: i18n.tc("leverageTrading.CONTRACT_EXPIRED"),
    TRANSACTION_EXPIRED: i18n.tc("leverageTrading.TRANSACTION_EXPIRED")
  }
};

// 平仓类型枚举
export const deleteEnum = {
  in: {
    MANUAL: "MANUAL",
    SYSTEM: "SYSTEM"
  },
  out: {
    MANUAL: i18n.tc("leverageTrading.MANUAL"),
    SYSTEM: i18n.tc("leverageTrading.SYSTEM")
  }
};

// 买卖枚举类
export const directEnum = {
  out: {
    BUY: i18n.tc("leverageTrading.buyUp"),
    SELL: i18n.tc("leverageTrading.buyDown")
  },
  in: {
    BUY: "BUY",
    SELL: "SELL"
  }
};
// 开平枚举类
export const offsetEnum = {
  in: {
    OPEN: "OPEN",
    CLOSE: "CLOSE"
  },
  out: {
    OPEN: i18n.tc("leverageTrading.open"),
    CLOSE: i18n.tc("leverageTrading.close")
  }
};

// 提现枚举类
export const withdrawStatusEnum = {
  in: {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6"
  },
  out: {
    1: "待审核",
    2: "审核不通过",
    3: "审核通过",
    4: "提现处理中",
    5: "提现成功",
    6: "提现失败"
  }
};

// 点数状态类

export const enableEnum = {
  in: {
    INVALID: "INVALID",
    VALID: "VALID"
  },
  out: {
    VALID: "有效",
    INVALID: "无效"
  }
};
