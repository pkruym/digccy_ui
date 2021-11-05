<template>
  <div class="analysis-box">
    <div class="header">
      <!-- 30日结算盈亏走势 -->
      <p>{{$t('assetanalysis.text8')}}</p>
    </div>
    <div class="content">
      <div id="analysis" style="width: 100%; height: 252px"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datasource: [],
      times: []
    };
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  watch: {
    list() {
      if (this.list && this.list.length > 0) {
        this.$nextTick(res => {
          this.time = setTimeout(() => {
            this.loaded();
          }, 500);
        });
      }
    }
  },
  methods: {
    //     profitTime: "2020-11-16"
    // todayProfit: -298.5569
    loaded() {
      var chart = Highcharts.chart("analysis", {
        chart: {
          type: "line"
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        legend: {
          enabled: false
        },
        tooltip: {
          enabled: true
          //   pointFormatter: function () {
          //       console.log(this.y)
          //  <span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>.
          //   }
        },
        xAxis: {
          categories: this.list.map((t) => t.profitTime),
          tickInterval: Number(this.list.length - 1),
          lineColor: "#E6ECF2",
          lineWidth: 1,
          labels: {
            style: {
              color: "#8c9fad"
            }
          }
        },
        yAxis: {
          gridLineColor: "#E6ECF2",
          gridLineWidth: 1,
          title: {
            text: ""
          },
          labels: {
            style: {
              color: "#8c9fad"
            }
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              // 开启数据标签
              enabled: false
            },
            // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            enableMouseTracking: true
          }
        },
        series: [
          {
            name: "盈亏",
            color: "#0066ED",
            data: this.list.map(t => {
              return {
                y: t.todayProfit,
                color: t.todayProfit > 0 ? "#03AD8F" : "#D04B64"
              };
            }),
            marker: {
              fillColor: "white",
              lineWidth: 0.5,
              height: 2,
              radius: 2,
              width: 2,
              lineColor: "#0066ED"
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.highcharts-credits {
  display: none;
}
.analysis-box {
  padding: 0.24rem 0;
  .header {
    p {
      margin: 0.2rem 0;
      color: #14181f;
      padding-left: 10px;
    }
    & p:first-child {
      border-left: 3px solid #f46273;
      font-size: 16px;
    }
  }
  .content {
    height: 4.8rem;
  }
}
</style>
