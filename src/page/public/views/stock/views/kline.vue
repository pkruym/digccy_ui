<template>
  <div class="k-line" ref="chart">
    <div class="k-line-t flex line05">
      <!-- :indicatorsDisable="indicatorsDisable" -->
      <klineBtn
        :viceLabel="viceLabel"
        :indicatorsShow="indicatorsShow"
        :indicatorsDisable="indicatorsDisable"
        @viceClick="viceClick"
        @change="handleSelectKlineTime"
        @indicators="handleIndicators"
      ></klineBtn>
    </div>
    <div class="tv-box">
      <div class="TVChartContainer" :id="containerId"></div>
    </div>
  </div>
</template>

<script>
import { TVDataFeed } from "@/assets/js/datafeeds";
import { getDefaultOptions } from "@/assets/js/tradingview";
import busVue from "@/assets/js/bus";
import * as TradingView from "../../../../../../static/charting_library/charting_library.min.js";

import { mapGetters, mapMutations } from "vuex";
import klineBtn from "../components/klineUl";
export default {
  data() {
    return {
      symbol: "",
      containerId: "tv_chart_container",
      widget: null,
      datafeed: null,
      KLineInit: true,
      indicatorsDisable: false,
      changedDisable: false,
      klineTimer: null,
      btnfullscreen: "全屏",
      activeIndex: "0",
      viceLabel: "MACD",
      indicatorsShow: false,
      indicators: false,

      kLine: {
        kLineTimeMenuKeys: [
          { id: "0", name: this.$t("stock.text9") },
          { id: "1", name: this.$t("stock.text10") },
          { id: "3", name: this.$t("stock.text11") },
          { id: "5", name: this.$t("stock.text12") },
          { id: "15", name: this.$t("stock.text13") },
          { id: "30", name: this.$t("stock.text14") }
        ],
        kLineTimeMenuKeys2: [
          { id: "60", name: this.$t("stock.text15"), more: true },
          { id: "120", name: this.$t("stock.text16"), more: true },
          { id: "240", name: this.$t("stock.text17"), more: true },
          { id: "D", name: this.$t("stock.text19"), more: true }
        ]
      },
      fnChangeRouter: null,
      isMore: false
    };
  },

  props: {
    asideKeyIndex: {
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      contractInfo: "contractInfo/contractInfo"
    })
  },
  methods: {
    ...mapMutations({
      selectContract: "contractInfo/selectContract"
    }),

    viceClick(key) {
      this.viceLabel = key;
      sessionStorage.setItem("viceLabel", key);
      this.removeMACD();
      this.removeKDJ();
      this.removeRSI();
      this.removeWR();

      this.viceLabelCreate(key);
    },
    handleIndicators(isFalse = true) {
      if (this.indicatorsDisable) {
        return;
      }
      this.indicatorsShow = !this.indicatorsShow;
      if (!isFalse) this.indicatorsShow = false; // 当点击更多的时候，强制改成false
    },

    getSymbolFromContractInfo() {
      if (this.contractInfo.symbol != "" && this.contractInfo.symbol != "") {
        return this.contractInfo.symbol;
      }
      return "";
    },
    createAVL() {
      this.widget.chart().createStudy("成本均线", false, false);
    },
    createMA() {
      this.widget
        .chart()
        .createStudy("Moving Average", false, false, [5], null, {
          "plot.color": "rgba(114, 76, 154, 1)",
          "plot.linewidth": 3
        });
      this.widget
        .chart()
        .createStudy("Moving Average", false, false, [10], null, {
          "plot.color": "rgba(107, 177, 238, 1)",
          "plot.linewidth": 3
        });
      this.widget
        .chart()
        .createStudy("Moving Average", false, false, [20], null, {
          "plot.color": "rgba(14, 125, 173, 1)",
          "plot.linewidth": 3
        });
    },
    createMACD() {
      this.widget
        .chart()
        .createStudy("MACD", false, false, [12, 26, "close", 9], null, {
          "histogram.color": "#FF5959",
          "MACD.color": "#FF5959",
          "signal.color": "#7474FF",
          "plot.linewidth": 3
        });
    },
    viceLabelCreate(key) {
      if (key == "MACD") {
        this.createMACD();
      } else if (key == "Stochastic") {
        this.widget.chart().createStudy(key, false, false, [], null, {
          "%k.color": "#7474FF",
          "%d.color": "#FF5959",
          "hlines background.color": "rgba(14, 125, 173, .1)"
        });
      } else if (key == "Relative Vigor Index") {
        this.widget.chart().createStudy(key, false, false, [], null, {
          "RVGI.color": "#FF5959",
          "signal.color": "#7474FF"
        });
      } else if (key == "Williams %R") {
        this.widget.chart().createStudy(key, false, false, [], null, {
          "plot.color": "#FF5959",
          "hlines background.color": "rgba(14, 125, 173, .1)"
        });
      }
    },

    removeByName(name) {
      let arr = this.widget
        .chart()
        .getAllStudies()
        .filter(x => x.name == name);
      for (let i = 0; i < arr.length; i++) {
        //let st = this.widget.chart().getStudyById(arr[i].id)
        // st.setVisible(show)
        this.widget.chart().removeEntity(arr[i].id);
      }
    },
    removeAVL() {
      return this.removeByName("成本均线");
    },
    removeMA() {
      return this.removeByName("Moving Average");
    },
    removeMACD() {
      return this.removeByName("MACD");
    },
    removeKDJ() {
      return this.removeByName("Stochastic");
    },
    removeRSI() {
      return this.removeByName("Relative Vigor Index");
    },
    removeWR() {
      return this.removeByName("Williams %R");
    },
    removeALL() {
      this.removeAVL();
      this.removeMA();
      this.removeMACD();
      this.removeKDJ();
      this.removeRSI();
      this.removeWR();
    },

    widgetActionByEvent(event) {
      try {
        this.widget.closePopupsAndDialogs();
      } catch (e) {}
      switch (event) {
        case "indicators":
          {
            this.widget.chart().executeActionById("insertIndicator");
            this.indicators = !this.indicators;
          }
          break;
        case "settings":
          {
            this.widget.chart().executeActionById("chartProperties");
          }
          break;
      }
    },
    changeVisualRange() {
      if (!this.widget) {
        return;
      }
      let chart = this.widget.chart();
      if (this.activeIndex != "0") {
        // 正常视野
        chart.executeActionById("timeScaleReset");
        return;
      }

      let now = new Date();
      let from = new Date();
      from.setHours(0);
      from.setMinutes(0);
      from.setSeconds(0);
      from.setMilliseconds(0);

      // 过0 点测试

      let endTime = new Date();
      endTime.setTime(from.getTime() + 24 * 60 * 60 * 1000);

      let range = {
        from: Math.floor(from.getTime() / 1000),
        to: Math.floor(now.getTime() / 1000)
      };

      // 分时只显示当日
      chart.setVisibleRange(range);
    },
    handleSelectKlineTime(to) {
      this.indicatorsDisable = true;
      this.activeIndex = to;
      this.indicatorsShow = false;
      let chart = this.widget.chart();
      if (to == "indicators" || to == "settings" || to == "fullscreen") {
        this.widgetActionByEvent(to);
      } else {
        this.datafeed.setNowSelection(to);
        if (to == "0") {
          chart.setResolution("1"); // line = 2  // STYLE_BASELINE = 10;
          chart.setChartType(3); //STYLE_AREA = 3;

          this.removeALL();
        } else {
          chart.setResolution(to);
          chart.setChartType(1); // candles = 1 // STYLE_HOLLOW_CANDLES = 9
          this.removeALL();
          let viceLabel = sessionStorage.getItem("viceLabel");
          if (viceLabel) {
            this.viceLabelCreate(viceLabel);
          } else {
            this.createMACD();
          }
          this.createMA();

          // this.datafeed.resetData();
          // chart.resetData();
        }
        setTimeout(() => {
          this.datafeed.resetData();
          chart.resetData();
        }, 50);
        // 第一次getBars后，才能改显示区域，否则会显示不全
        // this.$once("historyRequest", this.changeVisualRange.bind(this));
      }
    },
    getInterval() {
      // return this.activeIndex
      if (this.activeIndex == "0") {
        return "1";
      } else {
        return this.activeIndex;
      }
    },
    // 创建k线
    createKline() {
      let widgetOptions = getDefaultOptions();

      widgetOptions.datafeed = this.datafeed;
      widgetOptions.symbol = this.symbol;
      widgetOptions.interval = this.getInterval();
      widgetOptions.container_id = this.containerId;
      widgetOptions.locale =
        localStorage.getItem("language") == "en" ? "en" : "zh";
      widgetOptions.overrides = {
        MACDPaneSize: "tiny",

        "symbolWatermarkProperties.color": "rgba(0, 0, 0, 0.0)",
        // "symbolWatermarkProperties.transparency": 0,

        // 面积图
        "mainSeriesProperties.areaStyle.color1": "rgba(0, 102, 237, 0.2)", // 渐变色上
        "mainSeriesProperties.areaStyle.color2": "rgba(0, 102, 237, 0)", // 渐变色下
        "mainSeriesProperties.areaStyle.linecolor": "#0066ED", // 面积图线条颜色
        "mainSeriesProperties.areaStyle.linestyle": 0, //LINESTYLE_SOLID,
        "mainSeriesProperties.areaStyle.linewidth": 2,
        "mainSeriesProperties.areaStyle.transparency": 50,
        "mainSeriesProperties.areaStyle.priceSource": "close",

        // 线状图
        "mainSeriesProperties.lineStyle.linewidth": 2, // 线条粗细
        "mainSeriesProperties.lineStyle.linestyle": 0,

        // K线图
        "mainSeriesProperties.candleStyle.borderColor": "#4e5b85", //不涨不跌颜色？？
        "mainSeriesProperties.candleStyle.borderDownColor": "#FF5353",
        "mainSeriesProperties.candleStyle.borderUpColor": "#01A777",
        "mainSeriesProperties.candleStyle.downColor": "#FF5353",
        "mainSeriesProperties.candleStyle.drawBorder": false,
        "mainSeriesProperties.candleStyle.drawWick": true,
        "mainSeriesProperties.candleStyle.upColor": "#01A777",
        "mainSeriesProperties.candleStyle.wickDownColor": "#FF5353",
        "mainSeriesProperties.candleStyle.wickUpColor": "#01A777", // 涨的k线的竖线颜色
        "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !1,

        // 面板
        "paneProperties.legendProperties.showLegend": true,
        "paneProperties.legendProperties.showStudyTitles": true,
        " paneProperties.legendProperties.showStudyValues": true,
        "paneProperties.legendProperties.showSeriesTitle": true,
        "paneProperties.legendProperties.showSeriesOHLC": true,
        "paneProperties.legendProperties.showLegend": true,
        // "paneProperties.background": "#141625", // 黑色
        "paneProperties.background": "#fefffe", // 白色

        // "paneProperties.horzGridProperties.color": "#1e273c",
        "paneProperties.horzGridProperties.style": 2,
        // "paneProperties.vertGridProperties.color": "#1e273c",
        "paneProperties.vertGridProperties.style": 2,

        //
        "scalesProperties.lineColor": "#E7EBEE",
        // "scalesProperties.lineColor": "#fff",
        "scalesProperties.showLeftScale": false, // 左边栏
        // "scalesProperties.showLeftScale": true, // 左边栏
        // "scalesProperties.textColor": "#cbd7f0",
        // "scalesProperties.textColor": "#687284",
        "scalesProperties.textColor": "#8c9fad",
        volumePaneSize: "large"
      };

      widgetOptions.studies_overrides = {
        // "volume.volume.color.0": "rgba(88,144,101,0.7)",    // 跌
        // "volume.volume.color.1": "rgba(174,78,84,0.7)"      // 涨
        "volume.volume.color.0": "rgba(174,78,84,0.7)", // 跌
        "volume.volume.color.1": "rgba(1,167,119,0.4)" // 涨
      };

      widgetOptions.loading_screen = {
        backgroundColor: "#fefffe", //加载背景色
        foregroundColor: "#fefffe"
      };

      // widgetOptions.theme = "dark";
      widgetOptions.theme = "white";

      // 如果存在，先删掉
      if (this.widget) {
        try {
          this.widget.remove();
        } catch (e) {}
      }

      this.widget = new TradingView.widget(widgetOptions);
      this.widget.onChartReady(
        (() => {
          console.log("TradingView 加载完毕...");
          this.KLineInit = true;
          this.widget.chart().setResolution("1"); // line = 2  // STYLE_BASELINE = 10;
          this.widget.chart().setChartType(3); //STYLE_AREA = 3;
          // this.handleSelectKlineTime(this.activeIndex); // 取内部的参数。。。外部绑定的无效
        }).bind(this)
      );
    },
    initKline() {
      this.KLineInit = false;
      const startKline = (() => {
        if (this.KLineInit == false) {
          this.indicatorsDisable = true;
          console.log("TradingView 开始加载...");
          this.createKline();
          // this.klineTimer = setTimeout(startKline, 30 * 1000); // 30秒后重新启动
          this.klineTimer = setTimeout(startKline, 60 * 1000); // 60秒后重新启动 //jacky说60秒后重新刷新
        } else {
          this.klineTimer = null;
        }
      }).bind(this);

      if (this.klineTimer) {
        clearTimeout(this.klineTimer);
      }
      this.klineTimer = setTimeout(startKline, 1);
    },
    more() {
      this.isMore = !this.isMore;
      // let arr = this.kLine.kLineTimeMenuKeys;
      // for (let i = 0; i < arr.length; i++) {
      //   if (arr[i].hasOwnProperty('more')) {
      //     arr[i].more = !arr[i].more;
      //   }
      // }
    }
  },
  created() {
    // 这里是强制切换
    const changeRouter = (({ symbol }, force) => {
      // 非K线状态不处理
      console.log("合约k线合约k线合约k线合约k线合约k线合约k线合约k线", symbol);

      if (this.$route.path.indexOf("/stock-line") == -1 && !force) return;
      // 当前合约不切换

      this.$router.replace({
        name: "stock-line",
        query: {
          symbol: symbol
        }
      });
      this.symbol = symbol;
      this.initKline();
    }).bind(this);

    this.fnChangeRouter = changeRouter;
    // busVue.$on("selectOrder", changeRouter);
    // busVue.$on("selectPosition", changeRouter);
    busVue.$on("selectContract", changeRouter);
  },
  mounted() {
    if (sessionStorage.getItem("viceLabel")) {
      this.viceLabel = sessionStorage.getItem("viceLabel");
    } else {
      this.viceLabel = "MACD";
    }
    const restart = (() => {
      let symbol = this.getSymbolFromContractInfo();
      if (symbol != "") {
        this.symbol = symbol;
        this.initKline();
      }
    }).bind(this);

    const resetDatafeed = (() => {
      if (this.datafeed) {
        this.datafeed.destory();
      }
      this.datafeed = new TVDataFeed();
      this.datafeed.on("historyRequest", () => {
        this.changeVisualRange();
      });
      this.datafeed.on("onHistoryCallback", () => {
        this.indicatorsDisable = false;
      });

      // if (this.widget && this.activeIndex != "0") {
      //   let chart = this.widget.chart();
      //   chart.executeActionById("timeScaleReset");
      // }

      this.datafeed.on("open", restart);
      this.datafeed.on("error", resetDatafeed);

      restart();
    }).bind(this);

    resetDatafeed();
  },
  components: {
    klineBtn
  },
  beforeDestroy() {
    if (this.datafeed) {
      this.datafeed.destory();
    }
    // if (this.widget) {
    //   this.widget.remove();
    // }
    busVue.$off("selectOrder", this.fnChangeRouter);
    busVue.$off("selectPosition", this.fnChangeRouter);
    busVue.$off("selectContract", this.fnChangeRouter);
  }
};
</script>

<style>
/* @import "~/assets/css/components/Kline/Kline.css"; */
</style>

<style lang="less" scoped>
// @import "@/assets/css/components/Kline/Kline.css";

.k-line {
  display: flex;
  flex-direction: column;
  flex: 2;
  height: 8rem;
  // height: 100%;
  position: relative;
  .menu-btn-zhibiao,
  .menu-btn-quanping {
    position: relative;
    &:hover {
      &::after {
        position: absolute;
        content: "";
        padding: 8px;
        top: 120%;
        border: solid 1px #ffffff;
        background-color: #262b3e;
      }
    }
    i {
      height: 20px;
      width: 36px;
      display: block;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .menu-btn-quanping {
    i {
      background-image: url("~@/assets/img/1_9/ico-full-nor.svg");
    }
    p {
      position: absolute;
      padding: 8px;
      top: 120%;
      border: solid 1px #ffffff;
      background-color: #262b3e;
      left: 50%;
      transform: translateX(-50%);
      z-index: -1;
    }
    &:hover {
      i {
        background-image: url("~@/assets/img/1_9/ico-full-hover.svg");
      }
      i::after {
        content: "";
        position: absolute;
        top: 105%;
        width: 0;
        left: 50%;
        transform: translate(-50%);
        z-index: 9999;
        border-bottom: 8px solid #262b3e;
        border-left: 8px solid rgba(0, 0, 0, 0);
        border-right: 8px solid rgba(0, 0, 0, 0);
      }
      &::before {
        content: "";
        position: absolute;
        width: 0;
        top: 100%;
        border-bottom: 8px solid #fff;
        border-left: 8px solid rgba(0, 0, 0, 0);
        border-right: 8px solid rgba(0, 0, 0, 0);
        left: 50%;
        transform: translate(-50%);
        z-index: 9999;
      }
      p {
        z-index: 998;
      }
    }
  }
  .menu-btn-zhibiao {
    i {
      background-image: url("~@/assets/img/1_9/ico-index-nor.svg");
    }
    &:hover {
      i {
        background-image: url("~@/assets/img/1_9/ico-index-hover.svg");
      }
      i::after {
        content: "";
        position: absolute;
        top: 105%;
        width: 0;
        left: 50%;
        transform: translate(-50%);
        z-index: 9999;
        border-bottom: 8px solid #262b3e;
        border-left: 8px solid rgba(0, 0, 0, 0);
        border-right: 8px solid rgba(0, 0, 0, 0);
      }
      &::before {
        content: "";
        position: absolute;
        width: 0;
        top: 100%;
        border-bottom: 8px solid #fff;
        border-left: 8px solid rgba(0, 0, 0, 0);
        border-right: 8px solid rgba(0, 0, 0, 0);
        left: 50%;
        transform: translate(-50%);
        z-index: 9999;
      }
      &::after {
        position: absolute;
        content: "指标";
        padding: 8px;
        top: 120%;
        border: solid 1px #ffffff;
        background-color: #262b3e;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9998;
      }
    }
  }
  .menu-btn {
    width: 38px;
    padding: 0;
    border: 1px solid transparent;
    background-color: transparent;
    margin-right: 15px;
    &:hover {
      border: solid 1px #cbd7f0;
      background-color: #4e5b85 !important;
      color: #cbd7f0;
    }
  }
  .tv-box {
    flex: 2;
    position: relative;
    /deep/.TVChartContainer {
      height: 100%;
      &.redbg {
        background-color: red;
        position: absolute;
        width: 100%;
        top: 0;
      }
      /deep/iframe {
        html {
          display: none;
        }
      }
    }
  }

  .more_btn {
    color: #606266;
    font-size: 0.28rem;
    line-height: 0.6rem;
    width: 1.2rem;
    height: 0.6rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      display: block;
      height: 0.2rem;
      width: 0.2rem;
      background: url("~@/assets/img/1_9/gengduo@2x.png") no-repeat center;
      // align-self: flex-end;
      transform: scale(0.6, 0.6);
      margin-top: 0.2rem;
    }
  }

  .bcolor {
    background-color: @paleGrey;
  }
}
</style>
