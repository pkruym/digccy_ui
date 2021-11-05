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
              (item.offset === 'OPEN' && item.direct === 'BUY') ||
              (item.offset === 'CLOSE' && item.direct === 'SELL')
                ? 'green'
                : 'red'
            ]">{{ item.leverage }}X·
            {{
              (item.offset === "OPEN" && item.direct === "BUY") ||
              (item.offset === "CLOSE" && item.direct === "SELL")
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
      <div class="mid" v-if="indexKey == 0">
        <div class="fd-num" style="margin-top:0">
          <div class="fd-box">
            <!-- 委托价 -->
            <span class="label">{{ $t("futures.cancel.text2") }}(USDT)</span>
            <span class="number">{{ item.price || "--" }}</span>
          </div>
          <div class="fd-box">
            <!-- 数量 -->
            <span class="label">{{ $t("futures.position.text22")
              }}{{
                $tradeType.tradeType == "LEVER"
                  ? item.symbol.split("/")[0]
                  : $t("leverageTrading.bow")
              }}</span>

            <span class="number"> {{ item.volume }}</span>
          </div>
          <div class="fd-box">
            <!-- 开平 -->
            <span class="label">{{ $t("futures.entrust.text5") }}</span>
            <span class="number" :class="[item.offset === 'OPEN' ? 'green' : 'red']">
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
            <!-- 成交价格 -->
            <span class="label">{{ $t("futures.history.text14") }}(USDT)</span>
            <span class="number">
              {{
                item.orderPriceType === "MARKET"
                  ? $t("futures.cancel.text10")
                  : $t("futures.cancel.text11")
              }}</span>
          </div>
          <div class="fd-box">
            <!-- 订单类型 -->
            <span class="label">{{ $t("futures.history.text3") }}</span>
            <span class="number">
              {{
                item.orderPriceType == "LIMIT"
                  ? $t("futures.history.text10")
                  : $t("futures.history.text9")
              }}</span>
          </div>
          <div class="fd-box">
            <span class="label">
              {{
                item.offset == "OPEN"
                  ? $t("futures.entrust.text6")
                  : $t("futures.entrust.text7")
              }}{{ $t("futures.history.text15") }}</span>
            <span class="number"> {{ toFixedStr(item.fee, 2) }}</span>
          </div>
        </div>
        <div class="fd-num">
          <div class="fd-box">
            <!-- 成交时间 -->
            <span class="label">{{ $t("futures.history.text17") }}</span>
            <span class="number"> {{ item.time }}</span>
          </div>
          <div class="fd-box"></div>
          <div class="fd-box">
            <!-- 成交编号 -->
            <span class="label">{{ $t("futures.history.text18") }}</span>
            <span class="number"> {{ item.orderId }}</span>
          </div>
        </div>
      </div>
      <div class="mid" v-else>
        <div class="fd-num" style="margin-top:0">
          <div class="fd-box">
            <!-- 委托价格 -->
            <span class="label">{{ $t("futures.history.text19") }}(USDT)</span>
            <span class="number">{{ item.price || "--" }}</span>
          </div>
          <div class="fd-box">
            <span class="label">{{ $t("futures.position.text22") }}</span>
            <!-- 数量 -->
            <span class="number"> {{ item.volume }}</span>
          </div>
          <div class="fd-box">
            <span class="label">{{ $t("futures.entrust.text5") }}</span>
            <span class="number" :class="[item.offset === 'OPEN' ? 'green' : 'red']">
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
            <!-- 委托状态 -->
            <span class="label">{{ $t("futures.history.text1") }}</span>
            <span class="number">
              {{
                item.status == "FINISHED"
                  ? $t("futures.history.text11")
                  : $t("futures.history.text13")
              }}</span>
          </div>
          <div class="fd-box">
            <!-- 订单类型 -->
            <span class="label">{{ $t("futures.history.text3") }}</span>
            <span class="number">
              {{
                item.orderPriceType == "LIMIT"
                  ? $t("futures.history.text10")
                  : $t("futures.history.text9")
              }}</span>
          </div>
          <div class="fd-box">
            <div class="fd-box">
              <!-- 委托数量 -->
              <span class="label">{{ $t("futures.history.text20") }}</span>
              <span class="number"> {{ item.volume }}</span>
            </div>
          </div>
        </div>
        <div class="fd-num">
          <div class="fd-box">
            <!-- 成交数量 -->
            <span class="label">{{ $t("futures.history.text21") }}</span>
            <span class="number"> {{ item.tradeVolume }}</span>
          </div>
          <div class="fd-box">
            <!-- 剩余数量 -->
            <span class="label">{{ $t("futures.history.text22") }}</span>
            <span class="number"> {{ item | removeNum(item) }}</span>
          </div>
          <div class="fd-box">
            <div class="fd-box">
              <!-- 委托时间 -->
              <span class="label">{{ $t("futures.history.text23") }}</span>
              <span class="number"> {{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <popup v-model="showPing" class="pc-popup" :show-mask="true">
      <div class="content"></div>
    </popup> -->
    </div>
  </div>
</template>
<script>
import { subtr } from "@/assets/js/add-remove";
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    indexKey: {
      type: Number,
      default: 0
    }
  },
  filters: {
    removeNum(item) {
      return subtr(item.volume, item.tradeVolume);
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
