<template>
  <div class="order-main">
    <div v-if="dataList.length == 0" class="none"><no-data></no-data></div>
    <div class="order-list position" v-else>
      <list-comp :list="dataList"></list-comp>
    </div>
    <!-- <div class="list" v-if="dataList.length > 0" :loading="loading">
      <div class="list-item" v-for="(item, index) in dataList" :key="index">
        <div class="list-title Medium">
          <div>
            {{
              $tradeType.tradeType !== "FUTURE"
                ? item.symbol.split("/")[0]
                : $lang == "en"
                ? item.nameEnglish
                : item.name
            }}
            <span v-if="$tradeType.tradeType == 'LEVER'">{{
              "/" + item.symbol.split("/")[1]
            }}</span>
            <div class="leverage">{{ item.leverage + "X" }}</div>
          </div>

          <div
            class="list-content-info-middle"
            :class="[item.FPAL > 0 ? 'green' : 'red']"
          >
            <span :class="[item.direct === 'BUY' ? 'green' : 'red']"
              >{{
                item.direct === "BUY" ? $t("index.text40") : $t("index.text41")
              }}{{ item.direct === "BUY" ? item.volume : item.volume
              }}{{
                $tradeType.tradeType == "LEVER"
                  ? item.symbol.split("/")[0]
                  : $t("leverageTrading.bow")
              }}</span
            >
          </div>
        </div>
        <div class="list-content">
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                平仓盈亏
                {{ $t("futures.settlement.text2") }}
              </div>
              <div
                class="list-content-info-middle"
                :class="[
                  cptP(item.profit).indexOf('-') == -1 ? 'red' : 'green'
                ]"
              >
                {{ cptP(item.profit) }}
              </div>
            </div>
            <div class="list-content-info">
              <div class="list-content-info-label">
                {{ $t("futures.entrust.text7") }}{{ $t("leverageTrading.fee") }}
              </div>
              <div class="list-content-info-middle">{{ item.fee }}</div>
            </div>
          </div>
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                平仓价格
                {{ $t("futures.settlement.text1") }}
              </div>
              <div class="list-content-info-middle">{{ item.price }}</div>
            </div>
            <div class="list-content-info">
              <div class="list-content-info-label">
                平仓类型
                {{ $t("futures.settlement.text3") }}
              </div>
              <div class="list-content-info-middle">
                {{ cptCloseEnum(item.close) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import NoData from "../components/noData";
import listComp from "../components/settle-list";
import { mapState, mapActions, mapGetters } from "vuex";
import { deleteEnum, offsetEnum } from "@/assets/js/utils/constant";
import * as Rules from "@/assets/componentsJs/FormRules";
import { Currency } from "@/assets/js/config";
import { closeEnum } from "@js/utils/constant";
export default {
  components: {
    NoData,
    listComp
  },
  computed: {
    ...mapGetters({
      isLogin: "user/isLogin",
      accountInfo: "actual/account/accountInfo"
    }),
    cptP() {
      let currencySymbol = Currency.Symbol;

      return key => {
        if (process.env.currency == 3) {
          key =
            (key < 0 ? "-" : "") + (Math.abs(key.toFixed(2)) + currencySymbol);
        } else {
          key =
            (key < 0 ? "-" : "") + (currencySymbol + Math.abs(key.toFixed(2)));
        }
        return key;
      };
    },
    cptCloseEnum() {
      return key => {
        if (closeEnum.in[key] == key) {
          return closeEnum.out[key];
        }
      };
    }
  },
  watch: {
    $route() {
      console.log("切换杠杆和合约");
      this._list();
      this.getPositionList();
      this.getOrderList();
    }
  },
  data() {
    return {
      zong: 0,
      loading: false,
      dataList: [],
      isSettlement: false,
      oHeight: "",
      jiaoyiyuanFlag: null,
      lastSize: 0,
      nameFilter: [],

      cloceHistoryTableMsg: [], //平仓/结算数据
      formInline: {
        user: "",
        region: "",
        timer: "",
        cloce: null,
        order: null,
        cancle: null,
        tradeActionType: null, //开平,
        priceType: null,
        name: null,
        isUserCancel: null
      },
      currentPage: 1,
      size: 999999
    };
  },
  created() {
    this.setDefTime();
  },
  mounted() {
    // this.$nextTick(_ => {
    //   this.oHeight =
    //     document.body.clientHeight - (this.$refs.aaaaa.offsetTop + 50) + "px";
    // });
    this._list();
    // this.getMoney();
  },
  methods: {
    ...mapActions({
      list: "actual/traderecord/list", //平仓和成交
      getPositionList: "actual/position/list",
      getOrderList: "actual/order/list"
    }),
    //处理请求参数
    param() {
      // this.clear();
      let startTime = null;
      let endTime = null;
      if (this.formInline.timer) {
        startTime = this.formInline.timer[0].Format("yyyy-MM-dd hh:mm:ss");
        endTime = this.formInline.timer[1].Format("yyyy-MM-dd hh:mm:ss");
      }
      // console.log(this.formInline.name);
      let contractNo = Rules.num(this.formInline.name);
      let commodityNo = Rules.eng(this.formInline.name);
      console.log(contractNo, commodityNo);

      let param = {
        start: startTime,
        end: endTime,
        commodityNo: commodityNo,
        contractNo: contractNo,
        tradeType: this.$tradeType.tradeType,

        // commodityNo: "GC",
        // contractNo: "1906",
        page: this.currentPage,
        size: this.size
      };
      let queryType;
      queryType = 2;
      param.closeList = [this.formInline.cloce];
      param.offset = offsetEnum.in.CLOSE;
      // param.closeList = ["MANUAL_REVERSE"];

      return { param: param, queryType: queryType };
    },
    //获取时间
    setDefTime() {
      //昨天的时间
      var day1 = new Date();
      day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
      var s1 =
        day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
      //今天的时间
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 =
        day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
      //明天的时间
      var day3 = new Date();
      day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000);
      var s3 =
        day3.getFullYear() + "-" + (day3.getMonth() + 1) + "-" + day3.getDate();

      this.formInline.timer = [
        new Date(day2.getFullYear(), day2.getMonth(), day2.getDate()),
        new Date(day3.getFullYear(), day3.getMonth(), day3.getDate())
      ];
      if (this.isLogin) {
        this._list();
      }
    },
    //获取数据
    _list() {
      let _this = this;
      let param = {
        start: new Date().Format("yyyy-MM-dd 00:00:00"),
        end: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        page: this.currentPage,
        size: this.size,
        offset: "CLOSE"
      };
      this.list({ param, queryType: 1 })
        .then(res => {
          console.log(3333);
          console.log(res, "当日成交");
          _this.dataList = res.records;
          _this.lastSize = res.records.length;

          if (_this.$refs.scrolls) {
            _this.$refs.scrolls.reset();
            _this.$refs.scrolls.donePulldown();
          }
        })
        .catch(err => {});
    },

    letsgo() {
      this.$router.push("/");
    },
    refresh1() {
      this._list();
    }
  }
};
</script>
