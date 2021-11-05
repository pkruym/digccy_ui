<template>
  <div>
    <div class="list-item" v-for="(item, idx) in list" :key="idx">
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
                  ? 'green'
                  : 'red'
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
        <div> </div>
      </div>
      <!-- <div class="fd-num">
        <div class="fd-box">
          <span class="label">盈亏(USDT)</span>
          <span class="number" :class="[item.FPAL > 0 ? 'red' : 'green']">
            {{ item.FPAL }}</span
          >
        </div>
        <div class="fd-box">
          <span class="label">数量</span>
          <span class="number">
            {{
              $tradeType.tradeType == "LEVER"
                ? Number(item.volume).toFixed(item.volumePrecision)
                : Number(item.volume)
            }}{{
              $tradeType.tradeType == "LEVER"
                ? item.symbol.split("/")[0]
                : $t("leverageTrading.bow")
            }}
          </span>
        </div>
      </div> -->
      <div class="mid">
        <div class="fd-num">
          <div class="fd-box">
            <!-- 委托价 -->
            <span class="label">{{ $t("futures.entrust.text2") }}(USDT)</span>
            <span class="number green">{{
              item.orderPriceType === "MARKET"
                ? "--"
                : item.price.toFixed(item.pricePrecision)
            }}</span>
          </div>
          <div class="fd-box">
            <!-- 委托状态 -->
            <span class="label">{{ $t("futures.entrust.text3") }}</span>
            <!-- 排队中 -->
            <span class="number"> {{ $t("futures.entrust.text4") }}</span>
          </div>
          <div class="fd-box">
            <span class="label">{{ $t("futures.entrust.text5") }}</span>
            <span class="number" :class="[item.offset === 'OPEN' ? 'red' : 'green']">
              {{
                item.offset === "OPEN"
                  ? $t("futures.entrust.text6")
                  : $t("futures.entrust.text7")
              }}
            </span>
          </div>
        </div>
        <div class="fd-num">
          <div class="fd-box">
            <!-- 委托类型 -->
            <span class="label">{{ $t("futures.entrust.text8") }}</span>
            <span class="number">
              {{
                item.orderPriceType === "MARKET"
                  ? $t("futures.entrust.text9")
                  : $t("futures.entrust.text10")
              }}</span>
          </div>
          <div class="fd-box">
            <span class="label">{{ $t("futures.entrust.text11") }}(USDT)</span>
            <span class="number">
              {{ (item.margin ? item.margin.toFixed(2) : 0) || 0 }}</span>
          </div>
          <div class="fd-box">
            <!-- 委托数量 -->
            <span class="label">{{ $t("futures.entrust.text15") }}</span>
            <span class="number">
              {{
                $tradeType.tradeType == "LEVER"
                  ? Number(item.volume).toFixed(item.volumePrecision)
                  : Number(item.volume) + $t("leverageTrading.bow")
              }}</span>
          </div>
        </div>
        <div class="fd-num">
          <div class="fd-box">
            <!-- 剩余数量 -->
            <span class="label">{{ $t("futures.entrust.text16") }}</span>
            <span class="number">
              {{
                $tradeType.tradeType == "LEVER"
                  ? Number(item.remainVolume).toFixed(item.volumePrecision)
                  : Number(item.remainVolume) + $t("leverageTrading.bow")
              }}</span>
          </div>
          <div class="fd-box"></div>
          <div class="fd-box"></div>
        </div>
      </div>
      <div class="btn-box">
        <div class="btn active" @click="cancel(item.id)">
          {{ $t("futures.entrust.text18") }}
        </div>
      </div>
    </div>
    <!-- <popup v-model="showPing" class="pc-popup" :show-mask="true">
      <div class="content"></div>
    </popup> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.list);
  },
  methods: {
    ...mapActions({
      delete: "actual/order/delete" //撤单
    }),
    cancel(id) {
      this.$emit("cancel", id);
    }
  }
};
</script>
