<template>
  <!-- v-if="data.contractName" -->
  <div>
    <model-full
      id="stock-line"
      class="stock-line fixd-wrap"
      :preventGoBack="true"
      @prev="goback"
      isFixed
    >
      <span
        slot="right"
        class="header-rule"
        @click="seeRule"
        v-if="asideKeyIndex != 2"
        >{{ $t("stock.text4") }}</span
      >
      <!-- <a :href="
        config.host +
          '/buy/rules/' +
          (this.$lang == 'en' ? 'en/' : '') +
          ($tradeType.tradeType !== 'FUTURE'
            ? contractName.split('/')[0]
            : 'Contractrules') +
          '.html?isH5=true'
      " slot="right" class="header-rule" v-if="asideKeyIndex != 2">{{ $t("stock.text4") }}</a> -->

      <div slot="header" class="header" v-if="contractName">
        <img
          class="headerimg"
          src="@/assets/img/2_3/ico_hyxq_down@2x.png"
          alt
          @click="SelectQuate"
        />
        <!-- <img
          class="headerimg"
          v-else
          src="@/assets/img/2_3/ico_hyxq_up@2x.png"
          alt
          @click="SelectQuate"
        /> -->

        <div class="titlecontent" @click="SelectQuate">
          <div class="medium">{{ title }}</div>
        </div>
        <p class="qiehuan" v-if="!currentStatus">
          <!-- <img
            class="headerico"
            @click="Switck"
            src="@/assets/img/2_3/icon_bbdh2@2x.png"
          /> -->

          <img
            class="monipan"
            v-if="lang == 'en'"
            @click="Switck"
            src="@/assets/img/2_3/ico_wd_shipan@2x_en.png"
          />
          <img
            class="monipan"
            v-else
            @click="Switck"
            src="@/assets/img/2_3/ico_wd_shipan@2x.png"
          />
        </p>
      </div>
      <div class="stock-content">
        <div class="order-show" ref="orderBtn">
          <div class="present-price-box">
            <div
              class="present-price"
              :class="[contractInfo.upDropSpeed < 0 ? 'red' : 'green']"
            >
              <div class="pricebig Medium">{{ lastPrice }}</div>
              <div class="Medium">
                <span
                  v-if="contractInfo.upDropPrice"
                  :class="[contractInfo.upDropSpeed < 0 ? 'red' : 'green']"
                  >{{ Number(contractInfo.upDropPrice) }}</span
                >
                <span v-else>0</span>&nbsp;
                <span
                  v-if="contractInfo.upDropSpeed"
                  :class="[contractInfo.upDropSpeed < 0 ? 'red' : 'green']"
                  >{{ contractInfo.upDropSpeed }}%</span
                >
                <span v-else>0.00%</span>
              </div>
            </div>

            <div class="price-container">
              <div class="price-container-line" v-if="asideKeyIndex != 2">
                <div class="price-container-line-item line-left">
                  <div>{{ $t("stock.text1") }}</div>
                  <div class="Medium">
                    {{
                      contractInfo.high.toFixed(
                        contractInfo.symbolpricePrecision
                      )
                    }}
                  </div>
                </div>
              </div>
              <div class="price-container-line">
                <div class="price-container-line-item line-left">
                  <div>{{ $t("stock.text2") }}</div>
                  <div class="Medium">
                    {{
                      contractInfo.low.toFixed(
                        contractInfo.symbolpricePrecision
                      )
                    }}
                  </div>
                </div>
              </div>
              <div class="price-container-line">
                <div class="price-container-line-item line-left">
                  <div>{{ $t("stock.text3") }}</div>
                  <div class="Medium">
                    {{
                      Number(volume24).toFixed(
                        contractInfo.symbolvolumePrecision
                      )
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <kline
          :style="{ height: '473px' }"
          :asideKeyIndex="asideKeyIndex"
        ></kline>
        <div class="line10"></div>
        <!-- 切换深度 成交-->
        <Tab @change="tabChange"></Tab>
        <!-- <h2>深度图</h2> -->
        <div class="depth-map" v-show="tabType === 0">
          <div class="depth_type">
            <div>{{ $t("leverageTrading.bid") }}</div>
            <div>{{ $t("leverageTrading.selling") }}</div>
          </div>
          <div id="container" style="width: 100%; height: 180px"></div>

          <!-- <canvas id="depth-chart" width="370" height="260"></canvas> -->
          <DepthList :asksList="asks" :bidsList="bids"></DepthList>
        </div>
        <div class="deal-list" v-if="tabType === 1">
          <DealList :dealList="dealList"></DealList>
        </div>
      </div>

      <div class="flex-btn-copy"></div>
      <div class="flex-btn">
        <div class="buy-box">
          <div @click="buyUp">
            <span class="Medium">{{ $t("stock.text31") }}</span>
            <!-- <span class="iconfont icon-xiangshang"></span> -->
          </div>
          <div @click="buyFall">
            <span class="Medium">{{ $t("stock.text32") }}</span>
            <!-- <span class="iconfont icon-xiangshang"></span> -->
          </div>
        </div>
      </div>
      <!-- 买涨 or 买跌 -->
      <buyDetail
        ref="buyDetails"
        :buySymbol="$route.query.symbol"
        :buyType="buyType"
        @openSuccess="openSuccess"
        @openCoupons="openCoupons"
      ></buyDetail>
      <!-- <yd-popup
        v-model="showBuy"
        class="pc-popup radius"
        position="bottom"
        width="100%"
        :close-on-masker="false"
        @closeBuy="showBuy = false"
        masker-opacity="0"
      >
        <div class="content buy">
          <buyDetail
            :buySymbol="$route.query.symbol"
            :buyType="buyType"
          ></buyDetail>
        </div>
      </yd-popup> -->
      <!-- <popup
        height="70%"
        v-model="isQuotation"
        position="top"
        class="quotation-popup"
        :show-mask="false"
      >
        <quotation-list @close="close" ref="quotation"></quotation-list>
      </popup> -->
      <div class="mask" v-show="isQuotation" @click="isQuotation = false"></div>
      <!-- 下单成功 -->
      <yd-popup
        id="orderPropup"
        class="pc-popup"
        v-model="successShow"
        position="center"
      >
        <div>
          <success
            :buyType="buyType"
            @cancle="successCancle"
            @confrim="successConfrim"
            :data="successData"
          ></success>
        </div>
      </yd-popup>
    </model-full>

    <TranslistLeft
      ref="Translist"
      @closeLeft="closeLeft"
      :list="cptList"
      :tradeType="$tradeType.tradeType"
    ></TranslistLeft>
    <!-- 红包弹出 -->
    <popup
      v-model="showCoupons"
      id="buyDetailCoupons"
      class="pc-popup"
      :popup-style="{ 'z-index': 1508 }"
      position="right"
      @on-show="onshowCoupons"
      width="100%"
    >
      <coupons
        v-if="showCoupons"
        :layType="layType"
        @hidenCoupons="closeCoupons"
        :deposit="$refs.buyDetails.getDeposit"
      ></coupons>
    </popup>
  </div>
</template>

<script>
// <remote-script src="https://cdn-lalala.oss-cn-beijing.aliyuncs.com/bit-huobi/static/highcharts.js" />;
import coupons from "@/page/coupons/index-pop";
import kline from "./kline";
import TranslistLeft from "@/components/homeHot/transaListLeft";
import modelFull from "element/model-full";
import Tab from "./../components/Tab";
import DepthList from "./../components/DepthList";
import DealList from "./../components/DealList";
import { MarketAPI } from "@/assets/js/MarketApi2";
import buyDetail from "./../../buy/views/buy-detail-pop";
import success from "./../../buy/components/success";
// import * as Highcharts from "../../../../../../static/highcharts.js";
import * as TradingView from "../../../../../../static/charting_library/charting_library.min.js";
import { Popup, TransferDomDirective as TransferDom } from "vux";
import { Storage, Diskinfo } from "@/assets/js/localstorage";
import { SocketAPI } from "@/assets/js/WsApi2";
import { mapGetters, mapActions, mapMutations } from "vuex";
import busVue from "@js/bus";

export default {
  directives: {
    TransferDom
  },
  components: {
    modelFull,
    Popup,
    first: true,
    kline,
    TranslistLeft,
    Tab,
    DepthList,
    DealList,
    buyDetail,
    success,
    coupons
  },
  data() {
    return {
      config,
      showLeft: false,
      showCoupons: false,
      layType: 0, // 0 是保证金券，1是手续费折扣券
      buyType: 1,
      tabType: 0,
      successShow: false,
      successData: null, //下单成功弹出层内容
      dataset: {
        bids: [
          ["0.00283330", "95.18000000"],
          ["0.00283300", "5.56000000"],
          ["0.00282410", "3.74000000"],
          ["0.00282400", "1.15000000"]
        ],
        asks: [
          ["0.00283480", "4.95000000"],
          ["0.00283490", "5.19000000"],
          ["0.00284400", "79.01000000"],
          ["0.00284410", "15.53000000"]
        ]
      },
      checkquote: false,
      type: 3,
      currentStatus: true,
      isQuotation: true,
      data: {},
      priceData: {},
      minWave: {
        minWave: 0
      },
      isLightning: false,
      token: localStorage.token,
      lossOption: false,
      quantityOption: false,
      pricePrecision: 5,
      totalQuantity: 1,
      nowLossOrProfit: 4,
      lossOrProfitArray: [],
      perUnitLimitLossAmount: 0,
      perUnitLimitProfitAmount: 0,
      stopLossOrProfitId: "",
      orderType: "",
      subsymbol: "",
      showToast: false,
      profit: {},
      fnSubCallBack: {},
      timer: null,
      pofTop: 0,
      minWave: 0, //临时加的
      dealList: [],
      asks: [],
      bids: [],
      fnChangeRouter: null,
      lang: localStorage.getItem("language")
    };
  },
  computed: {
    cptList() {
      let a = this.getListByMarketType(this.$tradeType.tradeType);
      return a;
    },
    title() {
      return this.$tradeType.tradeType !== "FUTURE"
        ? `${this.contractInfo.symbol}`
        : this.$lang == "en"
        ? `${this.contractInfo.nameEnglish}`
        : `${this.contractInfo.name}`;
    },
    ...mapGetters({
      asideKeyIndex: "aside/asideKeyIndex",
      contractName: "trading/getcontractName",
      lastPrice: "trading/lastPrice",

      askPrice: "trading/askPrice",
      bidPrice: "trading/bidPrice",

      isLogin: "user/isLogin",
      commodityNo: "trading/commodityNo",
      contractNo: "trading/contractNo",
      deposit: "trading/deposit", // 保证金
      volume24: "trading/volume24",
      contractInfo: "contractInfo/contractInfo",
      symbolpricePrecision: "trading/symbolpricePrecision",
      symbolvolumePrecision: "trading/symbolvolumePrecision",

      asideKeyIndex: "aside/asideKeyIndex",
      getListByMarketType: "contractInfo/getListByMarketType"
    })
  },
  // watch: {
  //   $route: "closequate"
  // },
  beforeRouteEnter(to, from, next) {
    to.meta.keepAlive = false;
    next(vm => {
      if (from.path === "/coupons") vm.$refs.buyDetails.showBuy = true;
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/coupons") {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next(vm => {
      if (to.path === "/coupons") vm.$refs.buyDetails.showBuy = true;
    });
  },
  methods: {
    onshowCoupons() {},
    openCoupons({ type = 0 }) {
      this.layType = type;
      this.showCoupons = true;
    },
    closeCoupons() {
      this.showCoupons = false;
    },
    closeLeft() {},
    // closequate() {
    //   this.checkquote = false;
    // },
    seeRule() {
      this.$router.push({
        path: "/rules"
      });
    },
    tabChange(item) {
      this.tabType = item.type;
      if (item.type == 0) {
        MarketAPI.request("/trade/unsubscribe", { symbol: this.contractName });
        MarketAPI.request("/depth/subscribe", { symbol: this.contractName });
      } else {
        MarketAPI.request("/depth/unsubscribe", { symbol: this.contractName });
        MarketAPI.request("/trade/subscribe", { symbol: this.contractName });
      }
    },
    ...mapActions({
      symbolSubscribe: "contractInfo/symbolSubscribe" //修改状态
    }),
    ...mapMutations({
      accountchangeDisk: "actual/account/changeDiskStatus", //修改状态
      orderchangeDisk: "actual/order/changeDiskStatus", //修改状态
      positionchangeDisk: "actual/position/changeDiskStatus", //修改状态
      stoplossorprofitchangeDisk: "actual/stoplossorprofit/changeDiskStatus", //修改状态
      tradeinfochangeDisk: "actual/tradeinfo/changeDiskStatus", //修改状态
      traderecordchangeDisk: "actual/traderecord/changeDiskStatus", //修改状态
      clearCurrentLucky: "user/clearCurrentLucky"
    }),
    SelectQuate() {
      // this.checkquote = !this.checkquote;
      // this.showLeft = true;
      this.$refs.Translist.showLeft = true;
      this.$refs.buyDetails.showBuy = false;
      // 处理左边出现滚动条
      // document.body.style.overflow = "hidden";
      this.clearCurrentLucky();
    },
    Switck() {
      let _this = this;
      if (this.$refs.buyDetails) {
        this.$refs.buyDetails.showBuy = false;
      }
      this.$vux.confirm.show({
        title: this.$t("setText.title"),
        content: _this.currentStatus
          ? this.$t("common.text1")
          : this.$t("common.text2"),
        confirmText: this.$t("personalCenter.text15"),
        onCancel() {
          // console.log("nossss");
        },
        onConfirm() {
          // console.log("ssss");
          _this.currentStatus = !_this.currentStatus;
          _this.$diskinfo.type = _this.currentStatus ? "actual" : "simulate";
          Diskinfo.save(_this.currentStatus ? "actual" : "simulate");

          _this.orderchangeDisk({ type: _this.$diskinfo.type });
          _this.accountchangeDisk({ type: _this.$diskinfo.type });
          _this.positionchangeDisk({ type: _this.$diskinfo.type });
          _this.stoplossorprofitchangeDisk({ type: _this.$diskinfo.type });
          _this.tradeinfochangeDisk({ type: _this.$diskinfo.type });
          _this.traderecordchangeDisk({ type: _this.$diskinfo.type });
          SocketAPI.emit("login", this.currentStatus); //切换模拟盘广播重新获取数据
        }
      });
    },
    goback() {
      if (window.history.length > 2) {
        // console.log(this.$router);
        this.$router.back(-1);
      } else {
        this.$router.push({ path: "/quotation" });
      }
    },

    buyUp() {
      if (!this.isCheckLogin()) return;
      this.buyType = 1;
      this.$refs.buyDetails.showBuy = true;
    },
    buyFall() {
      if (!this.isCheckLogin()) return;
      this.buyType = 2;
      this.$refs.buyDetails.showBuy = true;
    },
    isCheckLogin() {
      let vm = this;
      if (!this.isLogin) {
        this.$vux.confirm.show({
          title: this.$t("message.login.title"),
          content: this.$t("message.login.message2"),
          confirmText: this.$t("setText.login"),
          cancelText: this.$t("personalCenter.text16"),
          onCancel() {
            console.log("plugin cancel");
          },
          onConfirm() {
            vm.$router.push("/login");
          }
        });
        return false;
      }
      return true;
    },
    openSuccess(data) {
      this.successData = data;
      this.successShow = true;
      this.$nextTick(() => {
        let orderPoppupDom = document.querySelector("#orderPropup > .yd-mask");
        if (orderPoppupDom) {
          orderPoppupDom.style.zIndex = "1501";
        }
      });
    },
    successConfrim() {
      let { status } = this.successData;
      if (status == "FINISHED" || status == "ACCEPT") {
        this.$router.push({
          path: "/position?type=" + this.$tradeType.tradeType
        });
      } else {
        this.$router.push({
          path: "/entrust?type=" + this.$tradeType.tradeType
        });
      }
      this.successShow = false;
    },
    successCancle() {
      this.successShow = false;
    },
    checkArray(arr, sortnum) {
      var result = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        if (result.indexOf(arr[i]) == -1) {
          result.push(arr[i]);
        }
      }
      return result.sort(function(a, b) {
        if (sortnum) {
          return a - b;
        } else {
          return b - a;
        }
      });
    },
    processData(desc, arr) {
      var res = [];
      var list = [];
      for (var i = 0; i < arr.length; i++) {
        list.push({
          value: Number(arr[i][0]),
          volume: Number(arr[i][1])
        });
      }
      for (var i = 0; i < list.length; i++) {
        if (i > 0) {
          list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
        } else {
          list[i].totalvolume = list[i].volume;
        }
        var dp = [list[i].value, list[i].totalvolume];
        if (desc) {
          res.unshift(dp);
        } else {
          res.push(dp);
        }
      }
      return res;
    },
    drawDepth(depth) {
      // console.log("this.pricePrecision", this.pricePrecision);
      let symbolpricePrecision = this.symbolpricePrecision;
      let symbolvolumePrecision = this.symbolvolumePrecision;

      if (
        depth.bids[0][0] != depth.asks[0][0] &&
        depth.bids[0][1] > depth.asks[0][1]
      ) {
        depth.bids[0][1] = depth.asks[0][1];
      }
      var bids = this.processData(true, depth.bids);
      var asks = this.processData(false, depth.asks);
      if (
        bids[bids.length - 1][0] != asks[0][0] &&
        bids[bids.length - 1][1] > asks[0][1]
      ) {
        // bids[bids.length - 1][1] = asks[0][1];
      }
      var data = {
        buy: bids,
        sell: asks
      };
      var buy = data.buy;
      var sell = data.sell;
      var dataX = [];
      var dataY = [];
      buy.forEach(ele => {
        dataX.push(ele[0]);
        dataY.push(ele[1]);
      });
      sell.forEach(ele => {
        dataX.push(ele[0]);
        dataY.push(ele[1]);
      });
      var chart = Highcharts.chart("container", {
        chart: {
          backgroundColor: "#fefffe",
          type: "area",
          spacingLeft: -6,
          spacingBottom: 5,
          spacingRight: 0,
          style: {
            fontSize: "12px",
            color: "#8c9fad"
          }
        },
        title: {
          text: null
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        xAxis: {
          title: {
            enabled: false
          },
          tickWidth: 1,
          tickColor: "#8c9fad",
          tickLength: 5,
          lineWidth: 1,
          lineColor: "#8c9fad",
          labels: {
            style: {
              color: "#8c9fad"
            },
            formatter: function() {
              if (this.value == 0) {
                return "";
              } else {
                return dataX[this.value];
              }
            }
          },
          tickmarkPlacement: "on",
          tickPixelInterval: 110
        },
        yAxis: {
          offset: -5,
          title: {
            enabled: false
          },
          opposite: true,
          minPadding: 0,
          startOnTick: false,
          tickWidth: 1,
          tickColor: "#8c9fad",
          tickLength: 5,
          lineWidth: 1,
          lineColor: "#8c9fad",
          gridLineWidth: 0,
          labels: {
            style: {
              color: "#8c9fad"
            },
            formatter: function() {
              this.value =
                this.value >= 1000 ? this.value / 1000 + "k" : this.value;
              return this.value;
            }
          }
        },
        tooltip: {
          headerFormat: "",
          borderWidth: 0,
          pointFormatter: function() {
            var className = "bid-labels";
            if (this.zone.color) {
              className = "ask-labels";
            }
            var pointText =
              '<div class="area-labels ' +
              className +
              '"><b>委托价</b><br/>' +
              dataX[this.x].toFixed(symbolpricePrecision);
            pointText += "<br/>";
            pointText +=
              "<b>累计</b><br/>" +
              this.y.toFixed(symbolvolumePrecision) +
              "</div>";
            return pointText;
          },
          shadow: false,
          useHTML: true,
          padding: 0
        },
        plotOptions: {
          series: { animation: false },
          area: {
            lineWidth: 1,
            states: {
              // hover: {
              //   lineWidth: 2
              // }
            },
            marker: {
              enabled: false,
              symbol: "circle",
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        series: [
          {
            zoneAxis: "x",
            color: "#d04b64",
            fillOpacity: 0.1,
            zones: [
              {
                value: dataY.length / 2 - 1,
                color: "#03ad8f",
                fillOpacity: 0.1
              }
            ],
            data: dataY
          }
        ]
      });
    }
  },
  beforeCreate() {
    //预备加载深度图
    if (!document.getElementById("highcharts")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      (script.id = "highcharts"),
        (script.src =
          "https://cdn-lalala.oss-cn-beijing.aliyuncs.com/bit-huobi/static/highcharts.js");
      const head = document.getElementsByTagName("head")[0];
      let ss = document.getElementsByTagName("head");
      (head || document.body).appendChild(script);
    }
  },
  created() {
    this.pricePrecision = this.symbolpricePrecision;
    this.currentStatus = this.$diskinfo.type == "actual" ? true : false;
    this.first = true;
    let _this = this;
    this.fnChangeRouter = ({ symbol }) => {
      _this.asks = [];
      _this.bids = [];
      if (symbol && symbol != _this.subsymbol) {
        _this.symbolSubscribe({ symbol: symbol });
        MarketAPI.request("/depth/subscribe", { symbol: symbol });
        MarketAPI.request("/trade/subscribe", { symbol: symbol });
        _this.subsymbol = symbol;
      }
    };
    busVue.$on("initover", this.fnChangeRouter);
    busVue.$on("selectContract", this.fnChangeRouter);
  },
  mounted() {
    let _this = this;
    const fnSubAll = res => {
      // console.log("订阅返回书库", res);
      if (res) {
        if (_this.dealList.length >= 20) {
          _this.dealList.splice(19, 1);
        }
        _this.dealList.splice(0, 0, res);
      }
    };
    this.cbSubAll = fnSubAll.bind(this);

    MarketAPI.unsubscribeAllTrade(this.cbSubAll);
    MarketAPI.subscribeAllTrade(this.cbSubAll);

    const fnSubAll2 = res => {
      // console.log("订阅返回书库2", res);
      if (res) {
        this.dataset = res;
        if (this.first) {
          this.first = false;
          this.drawDepth(this.dataset);
        }
        this.asks = res.asks;
        this.bids = res.bids;
      }
    };
    this.timer = setInterval(() => {
      this.drawDepth(this.dataset);
    }, 5000);
    this.cbSubAll2 = fnSubAll2.bind(this);

    MarketAPI.unsubscribeAlldepth(this.cbSubAll2);
    MarketAPI.subscribeAlldepth(this.cbSubAll2);
    if (this.contractName) {
      this.symbolSubscribe({ symbol: this.contractName });
      MarketAPI.request("/trade/subscribe", { symbol: this.contractName });
      MarketAPI.request("/depth/subscribe", { symbol: this.contractName });
    }
  },

  beforeDestroy() {
    this.timer && clearInterval(this.timer);
    busVue.$off("selectContract", this.fnChangeRouter);
    this.symbolSubscribe({ symbol: null });

    MarketAPI.request("/trade/unsubscribe", { symbol: this.contractName });
    MarketAPI.request("/depth/unsubscribe", { symbol: this.contractName });
  }
};
</script>
<style lang="less" scoped>
/deep/.vux-header {
  .vux-header-title {
    margin: 0 40px;
  }
}
/deep/.area-labels {
  width: 150px;
  padding: 5px 8px;
  background: rgba(255, 255, 255, 0.1);
  color: @txtColor;
  font-size: 12px;
  overflow: hidden;
}
/deep/.bid-labels {
  border-left: 2px solid @fontRedColor;
}
/deep/.ask-labels {
  border-left: 2px solid @fontColor;
}
.depth-map {
  background: @bodyBg;
  position: relative;
  .depth_type {
    position: absolute;
    left: 35%;
    font-size: 14px;
    color: #687284;
    display: flex;
    z-index: 90;
    & > div {
      line-height: 24px;
      font-size: 12px;
      position: relative;
      margin-left: 24px;
      &::after {
        content: "";
        width: 8px;
        height: 8px;
        background: #30ac8a;
        top: 50%;
        margin-top: -3px;
        left: -15px;
        position: absolute;
      }
      &:nth-of-type(2) {
        &::after {
          background: #e14654;
        }
      }
    }
  }
}
/deep/ .deepth-chart-layout {
  .chart {
    background-color: #141f1f;
  }
}
.kline {
  // height: 74%;
  // background-color: red;
  flex: 2;
}
// @media screen and (max-width: 413px) {
//   .kline {
//     height: 78%;
//   }
// }
.stock-line {
  overflow: scroll;
  .header-rule {
    font-size: 0.28rem;
    color: @txtColor;
  }
  .headerimg {
    margin: 8px 10px 8px 10px;
    height: 0.3rem;
    width: 0.32rem;
  }
  .wudang {
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid @paleGrey;
    background: #fff;
    .left {
      padding: 0.3rem 0.1rem;
      p {
        font-size: 0.2rem;
        color: @battleshipGrey;
      }
    }
    .right {
      border-left: 1px solid rgb(247, 247, 247);
      flex: 1;
      .flex {
        justify-content: space-around;
        span {
          font-size: 0.2rem;
          &:nth-child(2) {
            margin: 0 0.3rem;
            width: 1rem;
            display: inline-block;
            text-align: center;
          }
          &:nth-child(3) {
            width: 0.5rem;
            display: inline-block;
            text-align: center;
          }
        }
        .buy {
          color: @battleshipGrey;
        }
        .num {
          color: @darkSkyBlue;
        }
      }
    }
  }
  .header {
    display: flex;
    align-items: center;

    .titlecontent {
      width: 100%;
      display: flex;
      margin: 0 0px 0px auto;
      align-items: center;
      justify-content: flex-start;
      > div {
        font-size: 18px;
      }
      .title-type {
        flex: 0 0 1rem;
        width: 1rem;
        height: 0.4rem;
        border: 1px solid rgb(3, 173, 143);

        font-size: 0.24rem;
        text-align: center;
        line-height: 0.4rem;
        color: rgb(42, 204, 166);
        border-radius: 4px;
        margin-left: 0.4rem;
        position: relative;
        &::after {
          width: 0.3rem;
          height: 0.3rem;
          content: "";
          position: absolute;
          left: -0.36rem;
          top: 0;
          background: url("~@/assets/img/2_4/icoWdQiehuan@2x.png") no-repeat
            center center;
          background-size: 0.3rem 0.3rem;
        }
      }
    }
    .qiehuan {
      display: flex;
      margin: auto 10px auto 0;
      .headerico {
        margin: auto 0.1rem;
        width: 0.3rem;
        height: 0.3rem;
      }
      .monipan {
        text-align: left;
        width: 1rem;
        height: 0.4rem;
      }
    }
    /deep/ span {
      width: 0;
      height: 0;
      margin: auto 0px;
      display: inline-block;
      border-top: 0.2rem solid @midnight;
      border-left: 0.1rem solid transparent;
      border-right: 0.1rem solid transparent;
      transition: transform 0.2s ease-in;
      &.jihuo {
        transform: rotate(180deg);
      }
    }
  }
  .stock-content {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  //   // background: #151e25;
  //   // flex: 3;
  //   // height: calc(~"100% - 1.06rem");
  //   // padding-bottom: 2rem;
  //   // flex-direction: column;
  //   .capital-box {
  //     display: flex;
  //     background: @white;
  //     padding: 0.24rem 0.3rem 0.24rem 0.3rem;
  //     align-items: center;
  //     .capital {
  //       flex: 1;
  //       font-size: 0.28rem;
  //       color: @darkBlueGrey;

  //       span {
  //         font-size: 0.36rem;
  //         color: rgb(255, 47, 13);
  //       }
  //     }
  //     .recharge-btn {
  //       flex: 0 0 1.6rem;
  //       width: 1.6rem;
  //       height: 0.56rem;
  //       background: @darkSkyBlue;
  //       border-radius: 4px;
  //       text-align: center;
  //       line-height: 0.56rem;
  //       font-size: 0.28rem;
  //       color: #e0ecf7;
  //     }
  //   }
  // }
  .order-show {
    // position: fixed;
    // left: 0;
    // bottom: 0.96rem;
    // width: 100%;
    // margin-bottom: 2rem;
    .time {
      display: flex;
      align-items: center;
      padding: 0.16rem 0.3rem 0.22rem 0.3rem;
      border-bottom: 1px solid @white;
      .time-name {
        font-size: 0.36rem;
        span {
          font-size: 0.28rem;
        }
      }
      .time-desc {
        flex: 1;
        font-size: 0.24rem;
        text-align: right;
        span {
          color: @Red;
        }
      }
    }
    .present-price-box {
      display: flex;
      justify-content: space-between;
      // align-items: center;
      padding: 0.28rem 0.3rem 0 0.3rem;
      background: @bodyBg;
      .present-price {
        flex: 1;
        align-items: center;
        .pricebig {
          font-size: 0.6rem;
        }
        span {
          font-family: "DIN-Medium";
        }
      }
      .price-container {
        // flex: 1;
        .price-container-line {
          // margin-right: 0.44rem;
          margin-bottom: 0.12rem;
          .price-container-line-item {
            display: flex;
            align-items: center;

            & > div {
              font-size: 0.24rem;
              // flex: 1;
              &:first-child {
                flex: 0 0 1rem;
                width: 1rem;
                color: @txt2Color;
                text-align: left;
                // min-width: 1rem;
              }
              &:last-child {
                color: @txtColor;
                // flex: 2;
                text-align: right;
              }
            }
          }
        }
      }
      .present-price-num {
        text-align: right;
        & > div:nth-of-type(1) {
          .line {
            display: inline-block;
            width: 2rem;
            height: 0.2rem;
            position: relative;
            span {
              display: block;
              width: 50%;
              height: 100%;
              background: @Red;
              position: absolute;
              right: 0;
            }
          }
          span {
            color: @Red;
            font-size: 0.24rem;
            &:nth-of-type(3) {
              color: @battleshipGrey;
            }
          }
        }
        & > div:nth-of-type(2) {
          .line {
            display: inline-block;
            width: 2rem;
            height: 0.2rem;
            position: relative;
            span {
              display: block;
              width: 70%;
              height: 100%;
              background: @Green;
              position: absolute;
              right: 0;
            }
          }
          span {
            color: @Green;
            font-size: 0.24rem;

            &:nth-of-type(3) {
              color: @battleshipGrey;
            }
          }
        }
      }
    }
  }

  .flex-btn-copy {
    height: 1rem;
    width: 100%;
    // flex: 1;
    // background: #ff9111;
    margin: auto;
  }

  .flex-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.46rem;
    text-align: center;
    background: @bodyBg;
    z-index: 1490;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 -3px 15px rgba(80, 95, 107, 0.15);
    box-sizing: content-box;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .buy-box {
      width: 100%;
      display: flex;
      height: 0.88rem;
      justify-content: space-around;
      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        width: 3.44rem;
        .jiag {
          font-size: 0.48rem;
        }
        color: @bodyBg;
        span {
          font-size: 0.32rem;
          letter-spacing: 0.4em;
          text-align: center;
          &:nth-of-type(2) {
            margin-left: 0.08rem;
            margin-right: 0.04rem;
          }
        }
        &:nth-of-type(1) {
          background: @fontColor;
          // margin-right: 0.26rem;
        }
        &:nth-of-type(2) {
          background: @fontRedColor;

          // span {
          //   &::before {
          //     background: url(./../../../../../assets/img/down@2x.png) no-repeat
          //       center center;
          //     background-size: 0.24rem 0.3rem;
          //   }
          // }
        }
        // span {
        //   font-size: 0.32rem;
        //   position: relative;
        //   &::before {
        //     position: absolute;
        //     content: "";
        //     width: 0.24rem;
        //     height: 0.3rem;
        //     background: url(./../../../../../assets/img/up@2x.png) no-repeat
        //       center center;
        //     background-size: 0.24rem 0.3rem;
        //     right: -0.3rem;
        //     top: 50%;
        //     margin-top: -0.16rem;
        //   }
        // }
      }
    }
    .error-box {
      background: @battleshipGrey;
      color: #e0ecf7;
      font-size: 0.32rem;
      height: 100%;
      line-height: 0.96rem;
      span {
        font-size: 0.24rem;
      }
    }
  }
  /deep/ .quotation-popup {
    top: 40px;
    background: #fff;
  }
  /deep/ .vux-popup-mask {
    top: 0.8rem;
  }

  .order-popup {
    position: fixed;
    right: 0;
    bottom: 0.96rem;
    background: #fff;
    width: 100%;
    min-height: 108px;
    z-index: 999999;
    padding: 0.4rem 0.3rem;
    .order-top {
      display: flex;
      & > div {
        flex: 0 0 2.8rem;
        width: 2.8rem;
        height: 0.48rem;
        line-height: 0.48rem;
        background: #ff9111;
        border-radius: 2px;
        font-size: 0.28rem;
        text-align: center;
        color: #e0ecf7;
        position: relative;

        &:nth-of-type(1) {
          margin-right: 1.3rem;
        }
        .list {
          position: absolute;
          top: -2.5rem;
          left: 0;
          width: 100%;
          & > li {
            border: 1px solid #dcdee3;
            border-top: none;
            background: #fff;
            font-size: 0.28rem;
            color: @battleshipGrey;
            &:nth-of-type(1) {
              border-top: 1px solid #dcdee3;
            }
          }
        }
      }
    }
    .order-content {
      display: flex;
      margin-top: 0.4rem;
      p {
        flex: 0 0 33.3333%;
        width: 33.333%;
        font-size: 0.28rem;
        color: @battleshipGrey;
        &:nth-of-type(3) {
          text-align: right;
        }
      }
    }
  }
  .dialog {
    .weui-dialog {
      width: 80%;
      .title {
        padding: 0.2rem 0 0.1rem 0;
        font-size: 0.36rem;
        border-bottom: 1px solid @white;
      }
      .btn-box {
        display: flex;
        margin: 0.46rem 0 0.44rem 0;
        & > div {
          flex: 1;
          height: 0.8rem;
          line-height: 0.8rem;
          border-radius: 4px;
          border: 1px solid @redOrange;
          margin-right: 0.44rem;
          color: @redOrange;
          font-size: 0.32rem;
          &:nth-of-type(2) {
            margin-right: 0;
          }
        }
      }
    }
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.4s;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
}
.line10 {
  height: 10px;
  background-color: #f7f7fa;
  width: 100%;
}
</style>
