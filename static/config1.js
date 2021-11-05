(function(win) {
  // 192.168.3.46:8082
  var host = window.location.host; //线上地址
  var quoteUrl = "huobi51.bitmoken.com";
  var SocketUri = "";
  if (host.indexOf("huobi") < 0 && host.indexOf("binance") < 0) {
    //本地环境or测试环境配置
    host = quoteUrl;
    SocketUri = "ws://47.56.88.172:8502/ws";
  } else {
    // 线上地址配置
    host = host.indexOf("binance") > -1 ? quoteUrl : host;
    SocketUri = "wss://" + host + "/wss-trade/ws";
  }
  var MarketWsUri = "wss://" + host + "/wss-quote/ws";
  var config = {
    host: host,
    SocketUri: SocketUri,
    MarketWsUri: MarketWsUri
  };
  win.bitconfig = config;
})(window);
