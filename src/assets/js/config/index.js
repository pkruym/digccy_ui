"use strict";

export * from "./rules";
export * from "./rules_en";

// ws地址
// export const SocketUri = 'wss://front3.eanovi.com/wss-trade/ws'//process.env.SocketUri
export let SocketUri = bitconfig.SocketUri;

// export let MarketWsUri = "wss://quoter.bitmoken.com/ws-quote/ws";
export let MarketWsUri = bitconfig.MarketWsUri; // "wss://huobi1.bitmoken.com/wss-quote/ws";

// export const SocketUri = process.env.SocketUri   //https://front3.eanovi.com/wss-quote
// 充值地址
export let HttpUri = "";
export let HttpIPUri = "https://pv.sohu.com";

export let changeHttpUri = key => {
  HttpUri = key;
};

// 行情地址
export const MarketUri = process.env.MarketUri; //;//

// 货币
let Currency = {
  Symbol: "",
  Money: ""
};

if (process.env.currency == 1) {
  Currency = {
    Symbol: "¥",
    Money: "元"
  };
} else if (process.env.currency == 2) {
  Currency = {
    Symbol: "$",
    Money: "美元"
  };
} else if (process.env.currency == 3) {
  Currency = {
    Symbol: "USDT",
    Money: "USDT"
  };
}

export { Currency };
