<template>
  <ModelFull :title="$t('futures.settlement.title')" class="bill fixd-wrap">
    <div class="order-main" v-if="item">
      <div class="order-head">
        <div class="symbol">
          <h2>
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
            <span v-if="type == 0" :class="[item.direct === 'BUY' ? 'green' : 'red']">{{ item.leverage }}X·{{
                item.direct === "BUY" ? $t("index.text41") : $t("index.text40")
              }}</span>
            <span v-else class="number" :class="[
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
          </h2>
        </div>
        <div class="order-time">
          <template v-if="type == 0">
            <p>
              <!-- 开仓时间： -->
              {{ $t("futures.settlement.text6") }}：<span>{{
                item.gmtCreate
              }}</span>
            </p>
          </template>
          <template v-else>
            <p v-if="openItem">
              <!-- 开仓时间： -->
              {{ $t("futures.settlement.text6") }}：<span>{{
                openItem.time
              }}</span>
            </p>
            <p>
              {{ $t("futures.settlement.text7") }}：<span>{{ item.time }}</span>
            </p>
          </template>
        </div>
      </div>
      <div class="line6"></div>
      <div class="order-content">
        <!-- 结算详情 -->
        <template v-if="type == 1">
          <div class="row-box">
            <!-- 平仓盈亏 -->
            <div class="left">{{ $t("futures.settlement.text2") }}</div>
            <div class="right">
              <p :class="[item.actualProfit > 0 ? 'green' : 'red']">
                {{ item.actualProfit > 0 ? "+" : ""
                }}{{ toFixedStr(item.actualProfit, 2) || 0 }}USDT
              </p>
            </div>
          </div>
          <div class="row-box">
            <!-- 开仓价格 -->
            <div class="left">{{ $t("futures.settlement.text4") }}</div>
            <div class="right">
              <p>{{ openItem.price }}USDT</p>
            </div>
          </div>
          <div class="row-box">
            <!-- 平仓价格 -->
            <div class="left">{{ $t("leverageTrading.closingPrice") }}</div>
            <div class="right">
              <p>{{ item.price }}USDT</p>
            </div>
          </div>
          <div class="row-box">
            <!-- 止盈价格 -->
            <div class="left">{{ $t("futures.position.text45") }}</div>
            <div class="right">
              <p>{{ openItem.stopProfitPrice }}USDT</p>
            </div>
          </div>
          <div class="row-box">
            <!-- 止损价格 -->
            <div class="left">{{ $t("futures.position.text44") }}</div>
            <div class="right">
              <p>{{ openItem.stopLossPrice }}USDT</p>
            </div>
          </div>
          <div class="row-box">
            <!-- 平仓数量 -->
            <div class="left">{{ $t("futures.settlement.text5") }}</div>
            <div class="right">
              <p>
                {{ item.volume
                }}{{
                  $tradeType.tradeType == "LEVER"
                    ? item.symbol.split("/")[0]
                    : $t("leverageTrading.bow")
                }}
              </p>
            </div>
          </div>
          <div class="row-box">
            <!-- 平仓类型 -->
            <div class="left">{{ $t("futures.settlement.text3") }}</div>
            <div class="right">
              <p>{{ item.close | cptCloseEnum }}</p>
            </div>
          </div>
        </template>
        <!-- 订单 -->
        <template v-else>
          <div class="row-box">
            <!-- 持仓价 -->
            <div class="left">{{ $t("futures.position.text4") }}</div>
            <div class="right">
              <p>{{ item.price.toFixed(item.pricePrecision) }}USDT</p>
            </div>
          </div>
          <div class="row-box">
            <!-- 数量 -->
            <div class="left">{{ $t("futures.position.text22") }}</div>
            <div class="right">
              <p>
                {{ item.volume
                }}{{
                  $tradeType.tradeType == "LEVER"
                    ? item.symbol.split("/")[0]
                    : $t("leverageTrading.bow")
                }}
              </p>
            </div>
          </div>
        </template>

        <div class="row-box" v-if="type == 0">
          <!-- 保证金 -->
          <div class="left">{{ $t("futures.cancel.text12") }}</div>
          <div class="right">
            <p>{{ item.margin ? toFixedStr(item.margin) : 0 }} USDT</p>
            <p class="yellow" v-if="item.marginLuckyMoneyId">
              <!-- 保证金券抵扣  toFixedStr(accSub(item.margin, item.actualMargin)) || 0 -->
              {{ $t("futures.settlement.text8")
              }}{{
                item.marginLuckyMoneyAmount
              }}USDT
            </p>
            <p class="txt2">
              <!-- 实际支付 -->
              {{ $t("futures.settlement.text11")
              }}{{ toFixedStr(item.actualMargin) || 0 }}USDT
            </p>
          </div>
        </div>
        <div class="row-box" v-if="type == 1">
          <!-- 保证金 -->
          <div class="left">{{ $t("futures.cancel.text12") }}</div>
          <div class="right">
            <p>{{ item.margin ? toFixedStr(item.margin) : 0 }} USDT</p>
            <p class="yellow" v-if="item.marginLuckyMoneyId">
              <!-- 保证金券抵扣  toFixedStr(accSub(item.margin, item.actualMargin)) || 0 -->
              {{ $t("futures.settlement.text8")
              }}{{
               item.profit>=0?'0': item.marginLuckyMoneyAmount
              }}USDT
            </p>
            <p class="txt2">
              <!-- 现金账户扣除 -->
              {{ $t("my.fund.Cashduction")
              }}{{cashMoney }}USDT
            </p>
          </div>
        </div>
        <div class="row-box">
          <!-- 开仓手续费 -->
          <div class="left">{{ $t("common.text19") }}</div>
          <div class="right">
            <template v-if="type == 1 && openItem">
              <p>
                {{
                  openItem.fee == 0
                    ? $t("buy.text73")
                    : openItem.fee + "USDT"
                    ? toFixedStr(openItem.fee) + "USDT"
                    : "0"
                }}
              </p>

              <p class="yellow" v-if="openItem.feeDiscountValue > 0">
                <!-- 手续费7.5折抵扣 -->
                {{ $t("futures.position.text6")
                }}{{ openItem.feeDiscountValue * 10 }}
                {{ $t("futures.settlement.text9")
                }}{{ toFixedStr(accSub(openItem.fee, openItem.actualFee)) }}USDT
              </p>
              <p class="yellow">
                <!-- 红包收益账户抵扣 -->
                {{ $t("futures.settlement.text10")
                }}{{ toFixedStr(openItem.luckyMoneyAccountFee) || 0 }}USDT
              </p>
              <p class="txt2">
                <!-- 实际支付 -->
                {{ $t("futures.settlement.text11")
                }}{{ toFixedStr(openItem.balanceAccountFee) || 0 }}USDT
              </p>
            </template>
            <template v-else>
              <p>
                {{
                  item.fee == 0
                    ? $t("buy.text73")
                    : toFixedStr(item.fee) + "USDT"
                    ? toFixedStr(item.fee) + "USDT"
                    : 0
                }}
              </p>

              <p class="yellow" v-if="item.feeDiscountValue > 0">
                {{ $t("futures.position.text6")
                }}{{ item.feeDiscountValue * 10 }}
                {{ $t("futures.settlement.text9")
                }}{{ toFixedStr(accSub(item.fee, item.actualFee)) }}USDT
              </p>
              <p class="yellow">
                {{ $t("futures.settlement.text10")
                }}{{ toFixedStr(item.luckyMoneyAccountFee) || 0 }}USDT
              </p>
              <p class="txt2">
                {{ $t("futures.settlement.text11")
                }}{{ toFixedStr(item.balanceAccountFee) || 0 }}USDT
              </p>
            </template>
          </div>
        </div>
        <div class="row-box" v-if="type == 1">
          <!-- 平仓手续费 -->
          <div class="left">{{ $t("common.text20") }}</div>
          <div class="right">
            <p>{{ toFixedStr(item.fee) || 0 }}</p>
            <p class="yellow">
              <!-- 红包收益账户抵扣 -->
              {{ $t("futures.settlement.text10")
              }}{{ toFixedStr(item.luckyMoneyAccountFee) || 0 }}USDT
            </p>
            <p class="txt2">
              {{ $t("futures.settlement.text11")
              }}{{ toFixedStr(item.balanceAccountFee) || 0 }}USDT
            </p>
          </div>
        </div>
        <!-- v-if="$tradeType.tradeType == 'LEVER'" -->
        <div class="row-box">
          <div class="left">
            <!-- 隔夜费 -->
            {{ $t("futures.settlement.text12") }}
            <p class="txt2" v-if="item.settleDay && item.settleDay > 0">
              <!-- 已隔夜几天 -->
              {{ $t("futures.settlement.text13") }}{{ item.settleDay
              }}{{ $t("leverageTrading.day") }}
            </p>
          </div>
          <div class="right">
            <template v-if="item.settleDay && item.settleDay > 0">
              <p>
                {{
                  item.overnightFee > 0
                    ? toFixedStr(item.overnightFee) + "USDT"
                    : 0
                }}
              </p>
              <p class="yellow">
                <!-- 红包收益账户抵扣 -->
                {{ $t("futures.settlement.text10")
                }}{{ toFixedStr(item.luckyMoneyOvernightFee) }}USDT
              </p>
              <p class="txt2">
                <!-- 实际支付 -->
                {{ $t("futures.settlement.text11")
                }}{{
                  toFixedStr(
                    accSub(item.overnightFee, item.luckyMoneyOvernightFee)
                  ) || 0
                }}USDT
              </p>
            </template>
            <!-- 不隔夜 -->
            <p v-else>{{ $t("futures.settlement.text14") }}</p>
          </div>
        </div>
      </div>
    </div>
  </ModelFull>
</template>
<script>
import { closeEnum } from "@js/utils/constant";
export default {
  data() {
    return {
      type: 0, // 默认持仓
      item: null
    };
  },
  computed: {
    openItem() {
      if (this.item.openTradeRecord) {
        let obj = JSON.parse(this.item.openTradeRecord);
        return obj[0];
      } else {
        return null;
      }
    },
    cashMoney() {
      if (this.item) {
        let { marginLuckyMoneyId, marginLuckyMoneyAmount, actualProfit } = this.item
        let absActualProfit = Math.abs(actualProfit)
        if (marginLuckyMoneyId) {
          if (actualProfit >= 0) {
            return 0
          } else {
            if (marginLuckyMoneyAmount > absActualProfit) {
              return 0
            } else {
              return this.toFixedStr(this.accSub(absActualProfit, marginLuckyMoneyAmount))
            }
          }
        } else {
          return actualProfit >= 0 ? '0' : this.toFixedStr(absActualProfit)
        }
      }
    }
  },
  filters: {
    cptCloseEnum(key) {
      return closeEnum.out[key] || "--";
    }
  },
  created() {
    this.type = this.$route.query.type;
    this.item = JSON.parse(sessionStorage.getItem("orderDetail"));
  },
  methods: {}
};
</script>
