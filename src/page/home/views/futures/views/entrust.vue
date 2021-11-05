<template>
  <div class="order-main">
    <!-- <div class="list" v-if="cptOrder && cptOrder.length > 0"> -->
    <!-- <div class="list-item" v-for="(item, index) in cptOrder" :key="index">
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
            <span
              :class="[
                item.offset === 'CLOSE'
                  ? item.direct === 'BUY'
                    ? 'green'
                    : 'red'
                  : item.direct === 'BUY'
                  ? 'red'
                  : 'green'
              ]"
              >{{
                item.offset === "CLOSE"
                  ? item.direct === "BUY"
                    ? $t("index.text40")
                    : $t("index.text41")
                  : item.direct === "BUY"
                  ? $t("index.text41")
                  : $t("index.text40")
              }}</span
            >
          </div>
        </div>
        <div class="list-content">
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                委托价
                {{ $t("futures.entrust.text2") }}
              </div>
              <div class="list-content-info-middle">
                {{
                  item.orderPriceType === "MARKET"
                    ? "--"
                    : item.price.toFixed(item.pricePrecision)
                }}
              </div>
            </div>
            <div class="list-content-info">
              <div class="list-content-info-label">
                委托状态
                {{ $t("futures.entrust.text3") }}
              </div>
              <div class="list-content-info-middle">
                排队中
                {{ $t("futures.entrust.text4") }}
              </div>
            </div>
          </div>
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                开平
                {{ $t("futures.entrust.text5") }}
              </div>
              <div
                class="list-content-info-middle"
                :class="[item.offset === 'OPEN' ? 'red' : 'green']"
              >开仓 平仓
                {{
                  item.offset === "OPEN"
                    ? $t("futures.entrust.text6")
                    : $t("futures.entrust.text7")
                }}
              </div>
            </div>
            <div class="list-content-info">
              <div class="list-content-info-label">
                委托类型
                {{ $t("futures.entrust.text8") }}
              </div>
              <div class="list-content-info-middle">
                市价单 委托价单
                {{
                  item.orderPriceType === "MARKET"
                    ? $t("futures.entrust.text9")
                    : $t("futures.entrust.text10")
                }}
              </div>
            </div>
          </div>
          <div class="list-content-line" v-if="item.offset === 'OPEN'">
            <div class="list-content-info">
              <div class="list-content-info-label">
                保证金
                {{ $t("futures.entrust.text11") }}
              </div>
              <div class="list-content-info-middle">
                {{ (item.margin ? item.margin.toFixed(2) : 0) || 0 }}
              </div>
            </div>
          </div>
          <div class="list-content-line">
            <div class="list-content-info">
              <div class="list-content-info-label">
                委托数量
                {{ $t("futures.entrust.text15") }}
              </div>
              <div class="list-content-info-middle">
                {{
                  $tradeType.tradeType == "LEVER"
                    ? Number(item.volume).toFixed(item.volumePrecision)
                    : Number(item.volume) + $t("leverageTrading.bow")
                }}
              </div>
            </div>
            <div class="list-content-info">
              <div class="list-content-info-label">
                剩余数量
                {{ $t("futures.entrust.text16") }}
              </div>
              <div class="list-content-info-middle">
                {{
                  $tradeType.tradeType == "LEVER"
                    ? Number(item.remainVolume).toFixed(item.volumePrecision)
                    : Number(item.remainVolume) + $t("leverageTrading.bow")
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="list-bootm">
          <div class="button" @click="cancel(item.id)">
            撤单
            {{ $t("futures.entrust.text18") }}
          </div>
        </div>
      </div> -->
    <div v-if="cptOrder.length == 0" class="none"><no-data></no-data></div>
    <div class="order-list position" v-else>
      <list-comp :list="cptOrder" @cancel="cancel"></list-comp>
    </div>
  </div>
</template>
<script>
import NoData from "../components/noData";
import listComp from "../components/entrust-list";
import busVue from "@/assets/js/bus";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  components: {
    NoData,
    listComp
  },
  data() {
    return {
      show: false,
      page: 0,
      loading: false,
      lastPrice: 66.666,
      entrustList: [],
      isEntrust: false,
      oHeight: "",
      list: []
    };
  },
  created() {
    this.jiaoyiyuanFlag = localStorage.getItem("traderState");
  },
  mounted() {
    this.getPositionList();
    this.getOrderList();
  },
  watch: {
    $route() {
      console.log("切换杠杆和合约");
      this.getPositionList();
      this.getOrderList();
    }
  },
  computed: {
    ...mapGetters({
      cptOrder: "actual/order/getorderList",
      pricePrecision: "trading/pricePrecision",
      volumePrecision: "trading/volumePrecision"
    })
  },
  methods: {
    ...mapActions({
      delete: "actual/order/delete", //撤单
      getPositionList: "actual/position/list",
      getOrderList: "actual/order/list"
    }),
    ...mapMutations({
      changeContract: "trading/changeContract"
    }),
    setAuto(item, index) {
      const _this = this;
      item.isNormal = true;
      busVue.$emit("selectOrder", item);
      this.changeContract({
        pal: "order",
        id: item.id,
        symbol: item.symbol
      });
      console.log("委托", item);

      this.$router.push({
        name: "dismantling",
        params: item,
        query: {
          pal: "order",
          i: index
        }
      });
    },
    cancel(id) {
      const _this = this;
      this.$vux.confirm.show({
        title: this.$t("setText.title"),
        content: _this.$t("futures.entrust.text20"),
        cancelText: this.$t("common.text3"),
        confirmText: this.$t("personalCenter.text15"),
        onCancel() {
          console.log("plugin cancel");
        },
        onConfirm() {
          _this.$vux.loading.show({
            text: _this.$t("my.setting.text68")
          });

          _this
            .delete({ orderId: id })
            .then(res => {
              _this.$vux.loading.hide();
              _this.$vux.toast.text(
                _this.$t("message.operation.message14"),
                "top"
              );
            })
            .catch(e => {
              _this.$vux.loading.hide();
              _this.$vux.toast.text(`${e}`, "middle");
            });
        }
      });
    }
  }
};
</script>
