<template>
  <div class="assetAnalysis">
    <model-full :showheader="!($route.query.phone)" :title="$t('assetanalysis.title')" class="full fixd-wrap">
      <div class="assetAnalysis-box">
        <div class="summary" v-if="false">
          <div>
            <span>{{todaytext}}</span>
            <div>
              <span v-show="eyes" @click="clickEyes">
                <img width="16" height="13" src="@/assets/img/icon_eye_nor@2x.png" alt />
              </span>
              <span v-show="!eyes" @click="clickEyes">
                <img width="16" height="13" src="@/assets/img/icon_eye_sel@2x.png" alt />
              </span>
            </div>
          </div>
          <div>
            <!-- 总结算盈亏 今结算盈亏 -->
            <span class="title">{{$t('assetanalysis.text1')}}(USDT)</span>
            <span class="title">{{$t('assetanalysis.text2')}}(USDT)</span>
          </div>
          <div>
            <span v-show="eyes" class="value">{{
              total
                ? total.totalBalanceProfit
                  ? toFixedStr(total.totalBalanceProfit)
                  : "0.00"
                : "0.00"
            }}</span>
            <p v-show="!eyes" class="value">{{ "****" }}</p>
            <span v-show="eyes" class="value">{{
              getTodayProfit ? getTodayProfit : "0.00"
            }}</span>
            <p v-show="!eyes" class="value">{{ "****" }}</p>
          </div>
          <div>
            <!-- 总手续费 今手续费 -->
            <span class="title">{{$t('assetanalysis.text3')}}(USDT)</span>
            <span class="title">{{$t('assetanalysis.text4')}}(USDT)</span>
          </div>
          <div>
            <span v-show="eyes" class="value">{{
              total
                ? total.totalBalanceAccountFee
                  ? toFixedStr(total.totalBalanceAccountFee)
                  : "0.00"
                : "0.00"
            }}</span>
            <p v-show="!eyes" class="value">{{ "****" }}</p>

            <span v-show="eyes" class="value">{{
              todayBalanceFee ? todayBalanceFee : "0.00"
            }}</span>
            <p v-show="!eyes" class="value">{{ "****" }}</p>
          </div>
        </div>
        <div class="analysis">
          <analysis :list="summaryList"></analysis>
        </div>
        <div class="trend">
          <trend :list="summaryList"></trend>
        </div>
        <div class="remark">
          <p>{{$t('assetanalysis.text5')}}</p>
          <p>
            {{$t('assetanalysis.text6')}} </p>
          <p>
            {{$t('assetanalysis.text7')}} </p>
        </div>
      </div>
    </model-full>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import ModelFull from "element/model-full";
import analysis from "./../components/analysis";
import trend from "./../components/trend";

export default {
  components: {
    analysis,
    trend,
    ModelFull
  },
  data() {
    return {
      summaryList: [],
      datasource: [],
      total: null,
      eyes: true,
      todaytext: null
    };
  },
  computed: {
    ...mapGetters({
      todayBalanceFee: "actual/traderecord/todayBalanceFee",
      getTodayProfit: "actual/traderecord/getTodayProfitBalance"
    })
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
    let { token } = this.$route.query;
    if (token) {
      localStorage.setItem("token", token);
    }
    var date = new Date();
    this.todaytext = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate());
    console.log(this.userInfo);
    this.quertProfitSummery().then(res => {
      this.times = [];
      this.datasource = [];
      let source = res;
      for (let index = 0; index < 30; index++) {
        let newitem = {
          profitTime: null,
          todayProfit: 0
        };
        var d = new Date();
        d.setDate(d.getDate() - index);
        var month = d.getMonth() + 1;
        var day = d.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        var val = d.getFullYear() + "-" + month + "-" + day;
        let item = source[source.length - 1];
        newitem.profitTime = val;
        if (item && val === item.profitTime) {
          newitem.todayProfit = Number(this.toFixedStr(item.todayProfit));
          this.datasource.unshift(newitem);
          source.pop();
        } else {
          this.datasource.unshift(newitem);
        }
      }
      this.summaryList = this.datasource;
    });
    this.totalProfitFee().then(res => {
      this.total = res;
    });
    this.sumProfit({ parames: false }).then(res => { });
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      quertProfitSummery: "actual/traderecord/quertProfitSummery",
      totalProfitFee: "actual/traderecord/totalProfitFee",
      sumProfit: "actual/traderecord/sumProfit"
    }),
    clickEyes() {
      this.eyes = !this.eyes;
    }
  }
};
</script>
<style lang="less" scoped>
.assetAnalysis {
  .assetAnalysis-box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    .summary {
      height: 3.48rem;
      margin: 0.3rem 0.3rem 0;
      padding: 0.24rem 0.3rem;
      background: #0852c4;
      box-shadow: 0 6px 12px 0 rgba(0, 53, 100, 0.16);
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      div {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #fefffe;
        .title {
          font-size: 12px;
          color: #83a8e1;
        }
        .value {
          font-size: 24px;
          color: #fefffe;
        }
      }
    }
    .trend {
      margin: 0 0.3rem;
    }
    .analysis {
      margin: 0 0.3rem;
    }
  }
  .remark {
    background: #f7f7fa;
    margin: 0.3rem 0;
    padding: 0.32rem 0.3rem;
    p {
      font-size: 12px;
      color: #c5cfd5;
      line-height: 18px;
    }
  }
}
</style>
