"use strict";
require("../build/utils");

const now = new Date();
const times = 1;
var timestr = ("00" + times).toString().slice(-2);

var VERSION_HEADER = "H5";
var VERSION_NAME = "";
// const VERSION_STRING = `${now.Format("yyyyMMdd")}-${timestr}`
var VERSION_STRING = `${now.Format("yyyyMMdd")}`;
var PACK_TIME = `${now.Format("yyyy-MM-dd hh:mm:ss")}`;

// const info = `WebPC启动，版本号: ${now.Format("yyyyMMdd")}-${timestr}，打包时间：${now.Format("yyyy-MM-dd hh:mm:ss")}`
var tag = "";
var SocketUri = "";
var MarketUri = "";

var GatewayUri = "";
var GatewayKey = "";
var GatewayIV = "";
var HttpUri = "";
var currency = "";
const env = process.env.NODE_ENV
if (env == 'development') {
    // 人民币测试
    VERSION_NAME = "开发版";

    // BitMoken测试 网关接口加密
    tag = "BitMoken测试服";
    GatewayUri = "https://front3.eanovi.com/Gateway/V2/Bitmoken";
    GatewayKey = "ic3o5gkg9axcd0wz";
    GatewayIV = "vm2nc5o7s9agcdnl";
    currency = "3"; //“2” 美元  “1” 人名币 3USDT
} else if (env === "uat") {
    let ver = 7;
    if (ver === 7) {
        VERSION_NAME = "172测试服";
        tag = "BitMoken测试服";
        GatewayUri = "https://front3.eanovi.com/Gateway/V2/Bitmoken";
        GatewayKey = "ic3o5gkg9axcd0wz";
        GatewayIV = "vm2nc5o7s9agcdnl";
        currency = "3"; //“2” 美元  “1” 人名币  '3'数字币 4 LTK
    }
} else {
    process.env.NODE_ENV = "production";
    // 存在肯定是 production，所以有 process.argv
    let ver = 7; // 默认美元测试
    if (process.argv.length >= 3) {
        ver = parseInt(process.argv[2]);
        if (isNaN(ver) || ver < 1 || ver > 7) {
            ver = 2;
        }
    }
    if (ver == 1) {
        // 人民币测试
        VERSION_NAME = "测试版";

        // BitMoken测试 网关接口加密
        tag = "BitMoken测试服";
        GatewayUri = "http://65.52.173.5/Test/YingTou";
        GatewayKey = "1Q345g789abcdEwX";
        GatewayIV = "012n45g789abcdEk";
        HttpUri = "http://40.83.114.97";
        currency = "1"; //“2” 美元  “1” 人名币
    } else if (ver == 2) {
        // 美元测试
        VERSION_NAME = "测试版";

        // 施罗德测试 网关接口加密
        tag = "施罗德测试服";
        GatewayUri = "http://3.34.30.72:8500";
        GatewayKey = "01d34u678pABCyEF";
        GatewayIV = "01x34d678pA9CzEb";
        HttpUri = "http://3.34.30.72:8500";
        currency = "1"; //“2” 美元  “1” 人名币
    } else if (ver == 3) {
        // BitMoken
        VERSION_NAME = "正式版";

        tag = "BitMoken正式服";
        GatewayUri = "http://47.100.55.66/Gateway/V2/YingTou";
        GatewayKey = "1Q345g789abcdEwX";
        GatewayIV = "012n45g789abcdEk";

        HttpUri = "http://applicate.wintonefutures.com";

        currency = "1"; //“2” 美元  “1” 人名币
    } else if (ver == 4) {
        // 施罗德
        VERSION_NAME = "正式版";

        tag = "施罗德正式服";
        GatewayUri = "http://47.100.52.205/Gateway/V2/Schroder";
        GatewayKey = "01d34u678pABCyEF";
        GatewayIV = "01x34d678pA9CzEb";
        HttpUri = "https://SHILUODE66.COM";
        currency = "2"; //“2” 美元  “1” 人名币
    } else if (ver == 5) {
        // 数字币
        VERSION_NAME = "正式版";

        tag = "数字币正式服";
        GatewayUri = "http://47.101.139.95/Gateway/V2/Ethereum";
        GatewayKey = "iQ3o5g7g9abcd0wX";
        GatewayIV = "v12nc5g7s9abcdnk";
        HttpUri = "http://23.97.79.103";
        currency = "3"; //“2” 美元  “1” 人名币  '3'数字币
    } else if (ver == 6) {
        // 永丰
        VERSION_NAME = "正式版";

        tag = "永丰正式服";
        GatewayUri = "http://106.14.9.56/Gateway/V2/YongFeng";
        GatewayKey = "ic3o5gkg9axcd0wz";
        GatewayIV = "vm2nc5o7s9agcdnl";
        HttpUri = "https://yongfeng66.com";
        currency = "2"; //“2” 美元  “1” 人名币  '3'数字币
    } else if (ver === 7) {
        VERSION_NAME = "正式版";
        tag = "BitMoken正式服";
        GatewayUri = "https://front3.eanovi.com/Gateway/V2/Bitmoken";
        GatewayKey = "ic3o5gkg9axcd0wz";
        GatewayIV = "vm2nc5o7s9agcdnl";
        currency = "3"; //“2” 美元  “1” 人名币  '3'数字币 4 LTK
    }
}

console.log("运行参数", VERSION_NAME);
console.log("版本信息", tag);
console.log("系统地址", SocketUri)
console.log("行情地址", MarketUri)
console.log("网关地址", GatewayUri);
console.log("充值地址", HttpUri);
console.log(`网关key = ${GatewayKey}, 网关iv = ${GatewayIV}`);
console.log(
    "计价单位",
    currency == "1" ? "人民币" : currency == "2" ? "美元" : "数字币"
);
console.log("");

module.exports = {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    VERSION_HEADER: JSON.stringify(VERSION_HEADER),
    VERSION_NAME: JSON.stringify(VERSION_NAME),
    VERSION_STRING: JSON.stringify(VERSION_STRING),
    PACK_TIME: JSON.stringify(PACK_TIME),

    // 硬编码url
    SocketUri: JSON.stringify(SocketUri),
    HttpUri: JSON.stringify(HttpUri),
    MarketUri: JSON.stringify(MarketUri),

    // 网关
    GatewayUri: JSON.stringify(GatewayUri),
    GatewayKey: JSON.stringify(GatewayKey),
    GatewayIV: JSON.stringify(GatewayIV),

    currency: JSON.stringify(currency) // 1 人民币，2 美元，3 USDT
};
