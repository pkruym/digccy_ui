<template>
  <div class="ServerPush"></div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

import { SocketAPI } from "@/assets/js/WsApi2";
import { MarketAPI } from "@/assets/js/MarketApi2";
import { SocketUri, MarketWsUri } from "@/assets/js/config/index";

// import { marketWebSocket } from "@/assets/js/futuresdata";
// import { subscribe, unsubscribe } from "@/assets/js/futuresdata";
import {
  FuturesQuoteData2Quote,
  Quote2Quote
} from "@/assets/js/Object/objectConvert";

import busVue from "@/assets/js/bus";

export default {
  name: "",
  computed: {
    ...mapGetters({
      isLogin: "user/isLogin",
      contractInfo: "contractInfo/contractInfo",
      getContractInfo: "contractInfo/getContractInfo",
      getContractInfoList: "contractInfo/getContractInfoList",
      getCommodity: "commodity/getCommodity",
      getCurrency: "currency/getCurrency",
      getMainForceList: "contractInfo/getMainForceList",
      getListByMarketType: "contractInfo/getListByMarketType"
    })
  },
  data() {
    return {
      ticktimer: null,
      config,
      fnSubCallBack: {},
      wait: 0,
      maxWait: 500,
      fnChangeRouter: null,
      symbols: [],
      i: 0,
      ii: 0
    };
  },
  methods: {
    ...mapActions({
      userQuery: "user/query",
      traderecordSumProfit: "actual/traderecord/sumProfit",
      accountQuery: "actual/account/query",
      contractInit: "contractInfo/init",
      contractgetTick: "contractInfo/getTick",
      updateCommodity: "contractInfo/updateCommodity",
      getPositionList: "actual/position/list",
      getOrderList: "actual/order/list",
      getUrlImage: "system/system/getUrlImage"
    }),
    ...mapMutations({
      selectContract: "contractInfo/selectContract",
      changeContract: "trading/changeContract",

      updateContract: "contractInfo/updateContract",
      updatePositionList: "actual/position/updatePositionList",
      updateEntrustListNewPrice: "actual/order/updateEntrustListNewPrice",
      clearEntrustList: "actual/order/clearEntrustList",
      clearPositionList: "actual/position/clearPositionList",
      clearQuery: "actual/account/clearQuery",
      setIsLogin: "user/setIsLogin",

      setNetState: "system/system/setNetState",
      setTransactionDynamics: "actual/order/setTransactionDynamics",

      accountchangeDisk: "actual/account/changeDiskStatus", //修改状态
      orderchangeDisk: "actual/order/changeDiskStatus", //修改状态
      positionchangeDisk: "actual/position/changeDiskStatus", //修改状态
      stoplossorprofitchangeDisk: "actual/stoplossorprofit/changeDiskStatus", //修改状态
      tradeinfochangeDisk: "actual/tradeinfo/changeDiskStatus", //修改状态
      traderecordchangeDisk: "actual/traderecord/changeDiskStatus", //修改状态
      changetradeType: "changetradeType"
    }),
    setdisk() {
      this.orderchangeDisk({ type: this.$diskinfo.type });
      this.accountchangeDisk({ type: this.$diskinfo.type });
      this.positionchangeDisk({ type: this.$diskinfo.type });
      this.stoplossorprofitchangeDisk({ type: this.$diskinfo.type });
      this.tradeinfochangeDisk({ type: this.$diskinfo.type });
      this.traderecordchangeDisk({ type: this.$diskinfo.type });
      this.changetradeType({ tradeType: this.$tradeType.tradeType });
    },
    startTimer() {
      clearInterval(this.ticktimer);
      this.ticktimer = setInterval(res => {
        this.contractgetTick().then(res => {
          for (let i = 0; i < res.length; i++) {
            let newnode = res[i];
            if (newnode) {
              let node = Quote2Quote(newnode);
              let symbol = node.symbol;
              // console.log('symbol',symbol);

              if (symbol != "") {
                // 更新数据
                this.updateContract({
                  symbol: symbol,
                  node: node
                });

                // 更新持仓列表
                let info = this.getContractInfo({
                  symbol: symbol
                });
                this.updatePositionList({
                  contractInfo: info
                }); //更新持仓列表的浮动盈亏，最新价及用户持仓浮动盈亏
                this.updateEntrustListNewPrice(info); //更新委托列表的最新价
              }
            }
          }
        });
      }, 2000);
    }
  },
  created() {
    //如果存在token
    let { token } = this.$route.query;
    if (token) {
      localStorage.setItem("token", token);
    }
    this.setdisk();

    const _fnSubCallBack = (res => {
      let node = Quote2Quote(res);
      let symbol = node.symbol;

      if (symbol != "") {
        // 更新数据
        this.updateContract({
          symbol: symbol,
          node: node
        });

        // 更新持仓列表
        let info = this.getContractInfo({
          symbol: symbol
        });
        this.updatePositionList({
          contractInfo: info
        }); //更新持仓列表的浮动盈亏，最新价及用户持仓浮动盈亏
        this.updateEntrustListNewPrice(info); //更新委托列表的最新价
      }
    }).bind(this);

    const fnSubAll = res => {
      // if (!this.symbols.includes(res.symbol)) {
      //   this.symbols.push(res.symbol);
      //   console.log("nodenodenode", this.symbols, this.fnSubCallBack);
      // }
      // if (res.symbol == "BTC/USDT") console.log("nodenodenode", res.close);
      // console.log("nodenodenode2222222", this._fnSubCallBack);

      if (!this.fnSubCallBack[res.symbol]) {
        this.fnSubCallBack[res.symbol] = _fnSubCallBack;
      }
      this.fnSubCallBack[res.symbol](res);
    };
    this.cbSubAll = fnSubAll.bind(this);

    const changeRouter = (({ symbol, id }, force) => {
      if (force) {
        this.$router.push({
          name: "stock-line",
          query: { symbol: symbol }
        });
      }
      console.log("symbolsymbol", symbol);
      this.selectContract({
        symbol: symbol
      });
      this.changeContract({
        pal: force,
        symbol: symbol,
        id: id
      });
    }).bind(this);

    this.fnChangeRouter = changeRouter;

    // busVue.$on("selectOrder", changeRouter);
    // busVue.$on("selectPosition", changeRouter);
    busVue.$on("selectContract", changeRouter);

    SocketAPI.connect(SocketUri);
    MarketAPI.connect(MarketWsUri);
  },
  mounted() {
    let _this = this;
    _this.getUrlImage().then(res => {
      localStorage.setItem("imageUrl", res);
    });
    const appInit = (() => {
      Promise.all([this.userQuery(), this.accountQuery()]).finally(() => {
        _this.contractInit().then(() => {
          // 初始化
          MarketAPI.unsubscribeAllQuote(_this.cbSubAll);
          MarketAPI.subscribeAllQuote(_this.cbSubAll);
          this.startTimer();

          // this.traderecordSumProfit();
          this.getPositionList();
          this.getOrderList();
          // 查询query字段，设置默认
          if (Object.keys(_this.$route.query).length !== 0) {
            let symbol = _this.$route.query.symbol;
            busVue.$emit("selectContract", {
              symbol: symbol
            });
            busVue.$emit("initover", {
              symbol: symbol
            });
          }
          busVue.$emit("initover", {});
          busVue.$emit("appinit");
        });
      });
    }).bind(this);

    SocketAPI.on("onPush", (router, type, data) => {
      console.log("推送", router, type, data);
      if (router == "account") {
        Promise.all([this.accountQuery()]).finally(() => {
          this.getPositionList();
          this.getOrderList();
        });
      } else if (router == "contract") {
        Promise.all([this.contractInit(), this.updateCommodity()])
          .then(() => {
            this.getPositionList();
            this.getOrderList();
          })
          .finally(() => {
            if (this.getContractInfoList.indexOf(this.contractInfo) == -1) {
              busVue.$emit("selectContract", this.getMainForceList("OUTER")[0]);
            }
          });
      } else if (router == "order") {
        this.getPositionList();
        this.getOrderList();
        this.accountQuery(), busVue.$emit("orderPushData", data);
        this.traderecordSumProfit({ parames: true });
      } else if (router == "system/message") {
        let params = {
          title: "消息通知",
          data,
          btnTxt: "查看更多",
          path: "/notice/news"
        };
        busVue.$emit("AppDialog", params);
      } else if (router == "system/notice") {
        busVue.$emit("announcement");
      } else if (router == "logout") {
        //被踢下线通知
        if (this.$route.query.phone) {
          if (window.webkit) {
            window.webkit.messageHandlers.toLogin.postMessage({});
          } else if (window.appInterface) {
            window.appInterface.toLogin({});
          }
          return;
        }
        this.$vux.confirm.show({
          title: this.$t("setText.title"),
          content: this.$t("common.text13"),
          cancelText: this.$t("common.text3"),
          confirmText: this.$t("personalCenter.text15"),
          onCancel() {
            const phone = localStorage.phone;
            localStorage.clear();
            localStorage.phone = phone;
            localStorage.setItem("isactive", 1);
            _this.$router.push({
              path: "/home"
            });
            // location.reload();
          },
          onConfirm() {
            _this.$router.push({
              path: "/login"
            });
          }
        });
      } else if (router == "trade/simple") {
        //交易动态
        let params = {
          mobilephone: data.mobilephone, //：手机号码
          commodityNo: data.commodityNo, //品种名
          contractNo: data.contractNo, //合约号
          direct: data.direct, //买卖方向
          volume: data.volume, //成交量
          price: data.price, //成交价
          profit: data.profit, //盈亏
          time: data.time //时间
        };
        this.setTransactionDynamics(params);
      } else if (router == "deposit/warn") {
        let params = {
          title: "警戒线通知",
          data,
          btnTxt: "知道了",
          path: ""
        };
        busVue.$emit("AppDialog", params);
      }
    });
    SocketAPI.on("login", token => {
      appInit();
    });

    SocketAPI.on("logout", () => {
      if (this.$route.query.phone) {
        if (window.webkit) {
          window.webkit.messageHandlers.toLogin.postMessage({});
        } else if (window.appInterface) {
          window.appInterface.toLogin({});
        }
        return;
      }
      this.clearEntrustList();
      this.clearQuery();
      this.clearPositionList();
      this.setIsLogin(false);
      appInit();
    });

    // token错误
    SocketAPI.on("tokenError", code => {
      // 这里回调，会先调用上面的logout，所以只需要处理界面即可
      /*
        1007 非法token   无登录情况，直接跳转到登录页面
        1008token过期   提示：账号长时间未在线，已退出
        1014认证失效    提示：您的账号在另外一台设备登录，请重新登录
      */
      //处理ios token 过期
      if (this.$route.query.phone) {
        if (window.webkit) {
          window.webkit.messageHandlers.toLogin.postMessage(code);
        } else if (window.appInterface) {
          window.appInterface.toLogin(code);
        }
        return;
      }

      if (code == 1007) {
        // token 出错
        _this.$router.push({
          path: "/login"
        });
      } else if (code == 1008) {
        // token 过期
        this.$vux.confirm.show({
          title: this.$t("setText.title"),
          content: this.$t("common.text14"),
          cancelText: this.$t("common.text3"),
          confirmText: this.$t("personalCenter.text15"),
          onCancel() {
            const phone = localStorage.phone;
            const pass = localStorage.pass;
            localStorage.clear();
            localStorage.setItem("isactive", 1);
            localStorage.phone = phone;
            localStorage.pass = pass;

            _this.$router.push({
              path: "/"
            });
            // location.reload();
          },
          onConfirm() {
            _this.$router.push({
              path: "/login"
            });
          }
        });
      } else if (code == 1014) {
        // token 认证失败，可能是被踢下线了
        this.$vux.confirm.show({
          title: this.$t("setText.title"),
          content: this.$t("message.login.logintip"),
          onCancel() {
            const phone = localStorage.phone;
            const pass = localStorage.pass;
            localStorage.clear();
            localStorage.setItem("isactive", 1);
            localStorage.phone = phone;
            localStorage.pass = pass;
            _this.$router.push({
              path: "/"
            });
            // location.reload();
          },
          onConfirm() {
            _this.$router.push({
              path: "/login"
            });
          }
        });
      }
    });

    const netWorkChange = (() => {
      if (SocketAPI.isOnline() && MarketAPI.isOnline()) {
        this.setNetState(1);
      } else {
        this.setNetState(0);
      }
    }).bind(this);
    const netWorkChangeisOnline = (() => {
      if (MarketAPI.isOnline()) {
        appInit();
        this.setNetState(1);
      }
    }).bind(this);
    // SocketAPI.on("open", netWorkChangeisOnline);
    SocketAPI.on("open", netWorkChange);
    SocketAPI.on("close", netWorkChange);
    SocketAPI.on("error", netWorkChange);
    MarketAPI.on("open", netWorkChangeisOnline);
    MarketAPI.on("open", netWorkChange);
    MarketAPI.on("close", netWorkChange);
    MarketAPI.on("error", netWorkChange);

    // appInit();
  },
  beforeDestroy() {
    // busVue.$off("selectOrder", this.fnChangeRouter);
    // busVue.$off("selectPosition", this.fnChangeRouter);
    busVue.$off("selectContract", this.fnChangeRouter);
  }
};
</script>
