<template>
  <div class="trend-box">
    <div class="header">
      <!-- 30日结算盈亏分布 -->
      <p>{{$t('assetanalysis.text9')}}</p>
      <div class="summary_type">
        <!-- 结算盈利 结算亏损 -->
        <div>{{$t('assetanalysis.text10')}}</div>
        <div>{{$t('assetanalysis.text11')}}</div>
      </div>
    </div>
    <div class="content">
      <div id="trend" style="width: 100%; height: 252px"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: null
    }
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  watch: {
    list() {
      if (this.list && this.list.length > 0) {
        this.$nextTick((res) => {
          this.time = setTimeout(() => {
            this.loaded();
          }, 500);
        });
      }
    },
  },
  //   beforeCreate() {
  //     //预备加载深度图
  //     if (!document.getElementById("trend")) {
  //       const script = document.createElement("script");
  //       script.type = "text/javascript";
  //       (script.id = "highcharts"),
  //         (script.src =
  //           "https://cdn-lalala.oss-cn-beijing.aliyuncs.com/bit-huobi/static/highcharts.js");
  //       const head = document.getElementsByTagName("head")[0];
  //       let ss = document.getElementsByTagName("head");
  //       (head || document.body).appendChild(script);
  //     }
  //   },
  methods: {
    loaded() {
      var chart = Highcharts.chart("trend", {
        chart: {
          type: "column",
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          categories: this.list.map((t) => t.profitTime),
          tickInterval: Number(this.list.length - 1),
          lineColor: "#E6ECF2",
          lineWidth: 1,
          labels: {
            style: {
              color: "#8c9fad",
            },
          },
        },
        yAxis: {
          gridLineColor: "#E6ECF2",
          gridLineWidth: 1,
          title: {
            text: "",
          },
          labels: {
            style: {
              color: "#8c9fad",
            },
          },
        },
        plotOptions: {
          line: {
            dataLabels: {
              // 开启数据标签
              enabled: true,
            },
            // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            enableMouseTracking: false,
          },
        },
        series: [
          {
            name: "盈亏",
            cropThreshold: 0,
            crisp: true,
            colors: ["#D04B64", "#03AD8F"],
            data: this.list.map((t) => {
              return {
                y: t.todayProfit,
                color: t.todayProfit > 0 ? "#03AD8F" : "#D04B64",
              };
            }),
          },
        ],
      });
    },
  },
  mounted() { },
};
</script>
<style lang="less" scoped>
/deep/.highcharts-credits {
  display: none;
}
.trend-box {
  padding: 0;
  .header {
    p {
      margin: 0.2rem 0;
      color: #14181f;
      padding-left: 10px;
    }
    & p:first-child {
      border-left: 3px solid #15d1aa;
      font-size: 16px;
    }
  }
  .summary_type {
    font-size: 12px;
    color: #14181f;
    line-height: 18px;
    display: flex;
    z-index: 90;
    margin-left: 5px;
    & > div {
      line-height: 24px;
      font-size: 12px;
      position: relative;
      margin-left: 24px;
      &::after {
        content: '';
        width: 6px;
        height: 6px;
        background: #30ac8a;
        top: 50%;
        margin-top: -4px;
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
  .content {
    height: 4.8rem;
  }
}
</style>
