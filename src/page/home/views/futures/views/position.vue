<template>
  <div class="order-main">
    <div v-if="positionList.length == 0" class="none"><no-data></no-data></div>
    <div class="order-list position" v-else>
      <list-comp
        :list="positionList"
        @pingcang="clickPeace"
        @setAuto="setAuto"
      ></list-comp>
    </div>
    <!-- <div class="list" v-if="positionList.length > 0" :loading="loading">
      <div class="list-item" v-for="(item, index) in positionList" :key="index">
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

            <span v-if="$tradeType.tradeType != 'LEVER'"
              >( {{ $t("leverageTrading.deliverytips") }}{{ item.expiredDay
              }}{{ $t("leverageTrading.day") }} )距离交割还有6天</span
            >
          </div>

          <div
            class="list-content-info-middle"
            :class="[item.FPAL > 0 ? 'red' : 'green']"
          >
            <span :class="[item.direct === 'BUY' ? 'red' : 'green']">
              买涨 买跌
              {{
                item.direct === "BUY" ? $t("index.text41") : $t("index.text40")
              }}
            </span>
          </div>
        </div>
        <div class="list-content">
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                盈亏
                {{ $t("futures.position.text42") }}
              </div>
              <div
                class="list-content-info-middle Medium"
                :class="[item.FPAL > 0 ? 'red' : 'green']"
              >
                {{ item.FPAL }}
              </div>
            </div>
            <div class="list-content-info">
              <div class="list-content-info-label">
                数量
                {{ $t("futures.position.text43") }}
              </div>
              <div class="list-content-info-middle Medium">
                {{
                  $tradeType.tradeType == "LEVER"
                    ? Number(item.volume).toFixed(item.volumePrecision)
                    : Number(item.volume)
                }}{{
                  $tradeType.tradeType == "LEVER"
                    ? item.symbol.split("/")[0]
                    : $t("leverageTrading.bow")
                }}
              </div>
            </div>
          </div>
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                最新价
                {{ $t("futures.position.text3") }}
              </div>
              <div class="list-content-info-middle Medium">
                {{ item.close || "--" }}
              </div>
            </div>

            <div class="list-content-info">
              <div class="list-content-info-label">
                持仓价
                {{ $t("futures.position.text4") }}
              </div>
              <div class="list-content-info-middle Medium">
                {{ item.price.toFixed(item.pricePrecision) }}
              </div>
            </div>
          </div>
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                保证金
                {{ $t("futures.position.text5") }}
              </div>
              <div
                class="list-content-info-middle Medium"
                v-if="item.direct === 'BUY'"
              >
                {{ item.margin ? item.margin.toFixed(2) : "--" }}
              </div>
              <div class="list-content-info-middle Medium" v-else>
                {{ item.margin ? item.margin.toFixed(2) : 0 }}
              </div>
            </div>
            <div class="list-content-info">
              <div class="list-content-info-label">
                开仓手续费
                {{ $t("futures.entrust.text6")
                }}{{ $t("futures.position.text6") }}
              </div>

              <div class="list-content-info-middle Medium">
                {{ item.fee ? item.fee.toFixed(2) : "0" }}
              </div>
            </div>
          </div>

          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                止损价
                {{ $t("futures.position.text7") }}
              </div>
              <div class="list-content-info-middle Medium">
                {{
                  item.stopLossPrice
                    ? item.stopLossPrice.toFixed(item.pricePrecision)
                    : "--"
                }}
              </div>
            </div>

            <div class="list-content-info">
              <div class="list-content-info-label">
                止盈价
                {{ $t("futures.position.text8") }}
              </div>
              <div class="list-content-info-middle Medium">
                {{
                  item.stopProfitPrice
                    ? item.stopProfitPrice.toFixed(item.pricePrecision)
                    : "--"
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="list-bootm">
          <div class="button" @click="setAuto(item, index)">
            止损止盈
            {{ $t("futures.position.text9") }}
          </div>
          <div class="button" @click="clickPeace(item)">
            平仓
            {{ $t("futures.position.text12") }}
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import NoData from "../components/noData";
// import peace from "../components/peace";
import listComp from "../components/position-list";
import busVue from "@/assets/js/bus";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    NoData,
    listComp
    // peace,
  },

  computed: {
    ...mapGetters({
      positionList: "actual/position/positionList",
      pricePrecision: "trading/pricePrecision",
      volumePrecision: "trading/volumePrecision",
      expiredTime: "trading/expiredTime" // 交割时间
    }),
    expiredTimeCount() {
      let day = Math.floor(
        Math.abs(Date.parse(new Date()) - Date.parse(this.expiredTime)) /
          (24 * 3600 * 1000)
      );
      return (day ? (isNaN(day) ? 0 : day) : 0) + 1;
    }
  },
  watch: {
    $route() {
      this.getPositionList();
      this.getOrderList();
    }
  },
  data() {
    return {
      // totalprofit: 0,
      show: false,
      page: 0,
      loading: false,
      dataList: [],
      isEntrust: false,
      data: {},
      lockData: {},
      fanData: {},
      peaceData: {},
      oHeight: "",
      nowNum: 0,
      isFrist: true
    };
  },
  mounted() {
    let that = this;
    this.getPositionList();
    this.getOrderList();
    this.$nextTick(_ => {
      this.oHeight =
        document.body.clientHeight - (this.$refs.offsetTop + 50) + "px";
    });

    const changeTradingForm = ({ id, direct, remainVolume }, pal) => {
      if (remainVolume == undefined && direct !== undefined) {
        // 点击委托订单
        direct = undefined;
      }

      this.changeContract({
        pal: pal,
        id: id
      });

      if (direct) {
        // 选择持仓订单
        this.quantity = remainVolume <= 0 ? 1 : remainVolume;
        // this.targetProfit = perUnitLimitProfitAmount;
        // this.stopLoss = perUnitLimitLossAmount;
        this.targetProfit = 0;
        this.stopLoss = 0;
        this.nowPrice = this.lastPrice;
      } else {
        // 选择行情
        this.quantity = 1;
        this.targetProfit = 0;
        this.stopLoss = 0;
        this.nowPrice = this.lastPrice;
      }
    };

    const makeCb = pal => {
      return obj => {
        return changeTradingForm(obj, pal);
      };
    };

    busVue.$on("selectContract", makeCb("contract"));
    // busVue.$on("selectPosition", makeCb("position"));
    // busVue.$on("selectOrder", makeCb("order"));
  },
  methods: {
    ...mapActions({
      close: "actual/order/close", //市价反手
      open: "actual/order/open", //开仓和锁仓
      getPositionList: "actual/position/list",
      getOrderList: "actual/order/list"
    }),
    ...mapMutations({
      changeContract: "trading/changeContract"
    }),
    setAuto(item) {
      console.log(item);
      const _this = this;
      item.isNormal = true;
      if (item.volume - item.freezeVolume <= 0) {
        _this.$vux.toast.text(this.$t("futures.position.text16"), "middle");
        return false;
      }

      // busVue.$emit("selectPosition", item);
      this.changeContract({
        pal: "position",
        id: item.id,
        symbol: item.symbol
      });
      console.log("持仓", item);
    },
    confrim(val) {
      const _this = this;
      let arg = {
        commodityNo: val[2],
        contractNo: val[3],
        direct: val[4], // 快捷锁仓，接口用原始的direct
        marketType: 1,
        orderPriceType: "MARKET",
        volume: val[5]
      };
      this.open(arg)
        .then(res => {
          _this.$vux.loading.hide();
          _this.$vux.toast.text(this.$t("futures.text9"), "middle");
          // this.getPositionList();
        })
        .catch(e => {
          _this.$vux.loading.hide();
          _this.$vux.toast.text(`${e}`, "middle");
        });
    },
    pConfrim(val) {
      console.log(val);
      const _this = this;

      let params = {
        marketPriceType: "NORMAL",
        orderPriceType: "MARKET",
        positionId: this.positionRow.id,
        volume: this.positionRow.remainVolume
      };
      // 确定
      this.close(params)
        .then(res => {
          this.successNotic({
            title: this.$t("common.title2"),
            message: this.$t("futures.text9"),
            position: "bottom-right",
            duration: 2000
          });
        })
        .catch(e => {
          this.errorNotic({
            title: this.$t("common.title2"),
            message: `${e}`,
            position: "bottom-right",
            duration: 2000
          });
        });
    },
    clickPeace(item) {
      busVue.$emit("selectContract", {
        symbol: item.symbol
      });
      if (item.forCloseRemainVolume <= 0) {
        this.$vux.toast.text(this.$t("futures.position.text16"), "middle");
        return false;
      }
      busVue.$emit("peaceData", {
        show: true,
        peaceData: Object.assign({}, item)
      });
      // this.$refs.peace.show = true;
      // this.peaceData = Object.assign({}, item);
      console.log(this.peaceData);
    },
    clickLock(item) {
      if (item.volume <= 0) {
        this.$vux.toast.text(`可平仓数量不足，无法锁仓`, "middle");
        return false;
      }
      this.$refs.lock.show = true;
      this.lockData = item;
    },
    confrimFan(val) {
      let _this = this;
      _this.$vux.loading.show({
        text: _this.$t("my.setting.text68")
      });
      let arg = {
        marketPriceType: "REVERSE",
        orderPriceType: "MARKET",
        positionId: val[0],
        volume: val[1]
      };

      // 确定
      this.close(arg)
        .then(res => {
          _this.$vux.loading.hide();
          _this.$vux.toast.text(this.$t("futures.text9"), "middle");
        })
        .catch(e => {
          _this.$vux.loading.hide();
          _this.$vux.toast.text(`${e}`, "middle");
        });
    },
    fanshou(item) {
      if (item.forCloseRemainVolume <= 0) {
        this.$vux.toast.text(`订单已全部挂单中`, "middle");
        return false;
      }
      this.$refs.fan.show = true;
      this.fanData = item;
    },

    refresh1() {
      this.getList();
    },
    getList() {
      this.getPositionList();
    }
  }
};
</script>
