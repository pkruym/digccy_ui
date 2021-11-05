(function(win) {
  // 192.168.3.46:8082
  var host = "127.0.0.1"; //线上地址
  var quoteUrl = "127.0.0.1";
  var SocketUri = "";
  if (host.indexOf("huobi") < 0 && host.indexOf("binance") < 0) {
    //本地环境or测试环境配置
    host = quoteUrl;
    SocketUri = "ws://3.34.30.72:8502/ws";
    // SocketUri = "ws://192.168.3.44:8502/ws";
  } else {
    // 线上地址配置
    host = host.indexOf("binance") > -1 ? quoteUrl : host;
    SocketUri = "wss://" + host + "/wss-trade/ws";
  }
  var MarketWsUri = "ws://3.34.30.72:7102/ws";

  // var MarketWsUri = "ws://orcoinex.com/ws-quote1/ws"; //测试地址

  // var MarketWsUri = "ws://quote.orcoinex.com/ws-quote/ws"; //测试地址
  // var SocketUri = "wss://" + 'h1.ihuobi.cc' + "/wss-trade/ws"; //测试地址
  var config = {
    host: host,
    SocketUri: SocketUri,
    MarketWsUri: MarketWsUri,
    imgurl: "https://cdn-lalala.oss-cn-beijing.aliyuncs.com/icons/"
  };
  console.log(config);
  win.bitconfig = config;
})(window);
