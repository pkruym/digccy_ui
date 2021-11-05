"use strict";

require("./polyfix");

import { Currency } from "@/assets/js/config";
import {
  toFixedStr
} from "@/assets/js/add-remove";
let currencySymbol = Currency.Symbol;

export let SimplePromise = require("./promise");

import * as constant from "./constant";

// 计算合约的key
export let computeKey = contract => {
  if (contract["symbol"] && contract["contractNo"]) {
    return contract["symbol"] + "" + contract["contractNo"];
  } else if (contract["commodityNo"] && contract["contractNo"]) {
    return contract["commodityNo"] + "" + contract["contractNo"];
  }
  return "";
};

export let OrderByArray = array => {
  var Arr = array;
  var min;
  for (var i = 0; i < Arr.length; i++) {
    for (var j = i; j < Arr.length; j++) {
      if (Number(Arr[i]) > Number(Arr[j])) {
        min = Arr[j];
        Arr[j] = Arr[i];
        Arr[i] = min;
      }
    }
  }
  // console.log(1111,Arr,array);
  return Arr;
};
export let OrderByArray1 = array => {
  var Arr = array;
  var min;
  for (var i = 0; i < Arr.length; i++) {
    for (var j = i; j < Arr.length; j++) {
      if (Number(Arr[i]) < Number(Arr[j])) {
        min = Arr[j];
        Arr[j] = Arr[i];
        Arr[i] = min;
      }
    }
  }
  // console.log(1111,Arr,array);
  return Arr;
};


/**
 * 格式化盈亏 -$11(¥1)
 * @param {*} data 的结构里必须包含 publisherProfitOrLoss currencySign rate
 *
 * * 浮动盈亏 公式
     * 用户买涨结算公式
        （卖空价—买入价）/最小波动点*波动一次盈亏金额*汇率 *手数
       用户买跌结算公式
        （买入价—卖入价）/最小波动点*波动一次盈亏金额*汇率*手数

        {
            orderType,
            lastPrice,
            avgFillPrice
            minWave
            perWaveMoney
            quantity
            rate
            currencySign
        }
 */
export let formatPriceByProfitLoss = index => {
  let profit = 0;
  if (index.orderType == "BUY") {
    var tmp =
      (parseFloat(index.lastPrice) - index.avgFillPrice) * index.quantity;
    if (index.tradeType === "FUTURE") tmp = tmp * index.perContractValue;
    profit = tmp;

    index.floatingProfitAndLoss =
    (profit < 0 ? "" : "+") + (profit ? toFixedStr(profit,2) : 0);

  } else {
    var tmp =
      (index.avgFillPrice - parseFloat(index.lastPrice)) * index.quantity;
    if (index.tradeType === "FUTURE") tmp = tmp * index.perContractValue;
    profit = tmp;
    // profit = tmp;

    index.floatingProfitAndLoss =
    (profit < 0 ? "" : "+") +(profit ? toFixedStr(profit,2) : 0);


  }
  return {
    floatingProfitAndLoss: index.lastPrice==0?'--':index.floatingProfitAndLoss,
    profit: index.lastPrice==0?0: profit,
    perContractValue: index.perContractValue
  };
};

export const minus2head = n => {
  let i = n.indexOf("-");
  let j = n.indexOf("+");
  // console.log(n);
  if (i != -1) {
    return `-${n.substring(0, i)}${n.substring(i + 1)}`;
  } else if (j != -1) {
    return `+${n.substring(0, j)}${n.substring(j + 1)}`;
  } else {
    return n;
  }

  // return n
};


export const _cellClass = data => {
  let property = data.column.property;
  let row = data.row;
  if (property === "FPAL") {
    if (row[property]) {
      if (row[property].indexOf("-") != -1) {
        return "green";
      } else {
        return "red";
      }
    }
  } else if (property === "direct") {
    if (data.row[property] === "SELL") {
      return "green-right";
    } else if (data.row[property] === "BUY") {
      return "red";
    }
  } else if (property === "offset") {
    if (data.row[property] === "OPEN") {
      return "red";
    } else if (data.row[property] === "CLOSE") {
      return "green-right";
    }
  } else if (property === "profit") {
    if ((row[property] + "").indexOf("-") != -1) {
      return "green";
    } else if (row[property] != 0) {
      return "red";
    }
    // console.log(row[property]);
  } else if (property === "totalProfit") {
    if ((row[property] + "").indexOf("-") != -1) {
      return "green";
    } else if (row[property] != 0) {
      return "red";
    }
    // console.log(row[property]);
  } else if (property === "amount") {
    if ((row[property] + "").indexOf("-") != -1) {
      return "green";
    } else if (row[property] != 0) {
      return "red";
    }
    // console.log(row[property]);
  } else {
    return "";
  }
};

///////////////////////////
//

export const getContractInfo = (rootGetters, { symbol }) => {
  return rootGetters["contractInfo/getContractInfo"]({
    symbol: symbol
  });
};

