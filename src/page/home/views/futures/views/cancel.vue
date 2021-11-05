<template>
  <div class="order-main">
    <div v-if="dataList.length == 0" class="none"><no-data></no-data></div>
    <div class="order-list position" v-else>
      <list-comp :list="dataList"></list-comp>
    </div>
    <!-- <div v-if="dataList.length == 0" class="none">
      <no-data></no-data>
    </div>
    <div class="list" v-if="dataList.length > 0">
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
            :class="[item.FPAL > 0 ? 'red' : 'green']"
          >
            <span :class="[item.direct === 'BUY' ? 'red' : 'green']">{{
              item.direct === "BUY" ? $t("index.text41") : $t("index.text40")
            }}</span>
          </div>
        </div>
        <div class="list-content">
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                委托价
                {{ $t("futures.cancel.text2") }}
              </div>
              <div class="list-content-info-middle">{{ item.price }}</div>
            </div>
            <div class="list-content-info">
              <div class="list-content-info-label">
                撤单类型
                {{ $t("futures.cancel.text3") }}
              </div>
              <div class="list-content-info-middle">
                用户撤单 系统撤单
                {{
                  item.delete == "MANUAL"
                    ? $t("futures.cancel.text4")
                    : $t("futures.cancel.text5")
                }}
              </div>
            </div>
          </div>
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                {{ $t("futures.cancel.text6") }}
              </div>
              <div
                class="list-content-info-middle"
                :class="[item.offset === 'OPEN' ? 'red' : 'green']"
              >开仓 平仓
                {{
                  item.offset === "OPEN"
                    ? $t("futures.cancel.text7")
                    : $t("futures.cancel.text8")
                }}
              </div>
            </div>
            <div class="list-content-info">
              <div class="list-content-info-label">
                委托类型
                {{ $t("futures.cancel.text9") }}
              </div>
              <div class="list-content-info-middle">
                市价单 委托价单
                {{
                  item.orderPriceType === "MARKET"
                    ? $t("futures.cancel.text10")
                    : $t("futures.cancel.text11")
                }}
              </div>
            </div>
          </div>
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                保证金
                {{ $t("futures.cancel.text12") }}
              </div>
              <div class="list-content-info-middle">
                {{ (item.margin ? item.margin.toFixed(2) : 0) || 0 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import qs from "qs";
import NoData from "../components/noData";
import listComp from "../components/cancel-list";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {
    NoData,
    listComp
  },
  computed: {
    ...mapState(["refresh"]),
    ...mapGetters({
      orderList: "actual/order/orderList"
    })
  },
  watch: {
    refresh() {
      // this.getList();
    },
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
      dataList: [],
      isEntrust: false,
      lastSize: 0,
      oHeight: "",
      jiaoyiyuanFlag: null,
      currentPage: 1,
      size: 999999
    };
  },
  created() {
    this.jiaoyiyuanFlag = localStorage.getItem("traderState");
  },
  mounted() {
    this._list();
    // this.getfdyk();
    // this.$nextTick(_ => {
    //   //   this.getList();
    //   this.oHeight =
    //     document.body.clientHeight - (this.$refs.aaaaa.offsetTop + 40) + "px";
    // });
  },
  methods: {
    ...mapActions({
      // 2.0新增
      getCancelList: "actual/order/getCancelList",
      queryOrderCount: "actual/order/queryOrderCount",
      getPositionList: "actual/position/list",
      getOrderList: "actual/order/list"
    }),

    _list() {
      let _this = this;
      let param = {
        status: ["FAIL", "DELETED"],
        start: new Date().Format("yyyy-MM-dd 00:00:00"),
        end: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        tradeType: this.$tradeType.tradeType,
        page: this.currentPage,
        size: this.size
      };

      Promise.all([this.getCancelList(param)])
        .then(res => {
          console.log("撤单", res);
          for (let i = 0; i < res[0].records.length; i++) {
            res[0].records[i].DiyVolume =
              res[0].records[i].volume - res[0].records[i].tradeVolume;
          }
          _this.dataList = res[0].records;
          _this.lastSize = res[0].records.length;
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
