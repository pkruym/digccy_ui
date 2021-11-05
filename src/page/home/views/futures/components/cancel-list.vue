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
            <span class="label">{{ $t("futures.cancel.text2") }}(USDT)</span>
            <span class="number green">{{ item.price }}</span>
          </div>
          <div class="fd-box">
            <!-- 撤单类型 -->
            <span class="label">{{ $t("futures.cancel.text3") }}</span>
            <!-- 排队中 -->
            <span class="number">
              {{
                item.delete == "MANUAL"
                  ? $t("futures.cancel.text4")
                  : $t("futures.cancel.text5")
              }}</span>
          </div>
          <div class="fd-box">
            <!-- 开平 -->
            <span class="label">{{ $t("futures.cancel.text6") }}</span>
            <span class="number" :class="[item.offset === 'OPEN' ? 'red' : 'green']">
              {{
                item.offset === "OPEN"
                  ? $t("futures.cancel.text7")
                  : $t("futures.cancel.text8")
              }}
            </span>
          </div>
        </div>
        <div class="fd-num">
          <div class="fd-box">
            <!-- 委托类型 -->
            <span class="label">{{ $t("futures.cancel.text9") }}</span>
            <span class="number">
              {{
                item.orderPriceType === "MARKET"
                  ? $t("futures.cancel.text10")
                  : $t("futures.cancel.text11")
              }}</span>
          </div>
          <div class="fd-box">
            <!-- 保证金 -->
            <span class="label">{{ $t("futures.cancel.text12") }}(USDT)</span>
            <span class="number">
              {{ (item.margin ? item.margin.toFixed(2) : 0) || 0 }}</span>
          </div>
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
  methods: {}
};
</script>
