<template>
  <div>
    <div class="list-item" v-for="(item, idx) in list" :key="idx" @click="jumpToDetail(item)">
      <div class="top">
        <div class="info">
          <span class="bit-name weight">
            {{
              $tradeType.tradeType !== "FUTURE"
                ? item.symbol.split("/")[0]
                : $lang == "en"
                ? item.nameEnglish
                : item.name
            }}
            <template v-if="$tradeType.tradeType == 'LEVER'">
              {{ "/" + item.symbol.split("/")[1] }}
            </template>
          </span>
          <span class="number" :class="[
              item.offset === 'CLOSE'
                ? item.direct === 'BUY'
                  ? 'red'
                  : 'green'
                : item.direct === 'BUY'
                ? 'green'
                : 'red'
            ]">{{ item.leverage }}X·{{
              item.offset === "CLOSE"
                ? item.direct === "BUY"
                  ? $t("index.text40")
                  : $t("index.text41")
                : item.direct === "BUY"
                ? $t("index.text41")
                : $t("index.text40")
            }}</span>
        </div>
        <div class="right-arrow">
          <img src="@/assets/img/2_7/icon_more@2x.png" alt="" />
        </div>
      </div>
      <div class="fd-num">
        <div class="fd-box">
          <!--平仓盈亏 -->
          <span class="label">{{ $t("futures.settlement.text2") }}(USDT)</span>
          <span class="number" :class="[item.actualProfit > 0 ? 'green' : 'red']">
            {{ item.actualProfit > 0 ? "+" : ""
            }}{{ toFixedStr(item.actualProfit, 2) || 0 }}</span>
        </div>
        <div class="fd-box">
          <span class="label">{{ $t("futures.position.text22") }}</span>
          <span class="number"> {{ item.volume }} </span>
        </div>
      </div>
      <div class="mid">
        <div class="fd-num">
          <div class="fd-box">
            <span class="label">{{ $t("futures.settlement.text4") }}(USDT)</span>
            <span class="number">{{ getOpenPrice(item) }}</span>
          </div>
          <div class="fd-box">
            <span class="label">{{ $t("futures.settlement.text1") }}(USDT)</span>
            <!-- 排队中 -->
            <span class="number"> {{ item.price }}</span>
          </div>
          <div class="fd-box">
            <!-- 平仓类型 -->
            <span class="label">{{ $t("futures.settlement.text3") }}</span>
            <span class="number">{{ item.close | cptCloseEnum }}</span>
          </div>
        </div>
        <div class="fd-num">
          <div class="fd-box">
            <!-- 平仓手续费 -->
            <span class="label">
              {{ $t("futures.entrust.text7")
              }}{{ $t("leverageTrading.fee") }}(USDT)</span>
            <span class="number">{{
              item.actualFee == 0 ? "0" : item.fee
            }}</span>
          </div>
          <div class="fd-box"></div>
          <div class="fd-box"></div>
        </div>
      </div>
    </div>
    <!-- <popup v-model="showPing" class="pc-popup" :show-mask="true">
      <div class="content"></div>
    </popup> -->
  </div>
</template>
<script>
import { closeEnum } from "@js/utils/constant";
import { Currency } from "@/assets/js/config";
import { mapGetters } from "vuex";

export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  computed: {
    ...mapGetters({
      pricePrecision: "trading/pricePrecision" // 价格精度
    })
  },
  filters: {
    cptCloseEnum(key) {
      return closeEnum.out[key] || "--";
    }
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.list);
  },
  methods: {
    //打开详情页
    jumpToDetail(item) {
      console.log("结算", item);
      sessionStorage.setItem("orderDetail", JSON.stringify(item));
      this.$router.push({
        path: "/orderDetail",
        query: {
          type: 1
        }
      });
    },
    getOpenPrice(item) {
      let obj = JSON.parse(item.openTradeRecord);
      return obj[0].price;
    }
  }
};
</script>
