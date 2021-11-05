<template>
  <div class="list">
    <div class="list-item" v-for="(item, index) in order" :key="index">
      <div class="list-title">
        <div class="list-title-left">
          {{
            $tradeType.tradeType !== "FUTURE"
              ? item.symbol
              : $lang == "en"
              ? item.nameEnglish
              : item.name
          }}
          <span class="leverageleft">{{ item.leverage + "X" }}</span>
        </div>
        <div
          class="list-title-right"
          :class="[
            (item.offset === 'OPEN' && item.direct === 'BUY') ||
            (item.offset === 'CLOSE' && item.direct === 'SELL')
              ? 'red'
              : 'green'
          ]"
        >
          {{
            (item.offset === "OPEN" && item.direct === "BUY") ||
            (item.offset === "CLOSE" && item.direct === "SELL")
              ? $t("index.text41")
              : $t("index.text40")
          }}{{ item.volume
          }}{{
            $tradeType.tradeType == "LEVER"
              ? item.symbol.split("/")[0]
              : $t("leverageTrading.bow")
          }}
        </div>
      </div>
      <div class="list-content" v-if="indexKey == 0">
        <div class="list-content-line">
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 委托价 -->
              {{ $t("futures.entrust.text2") }}
            </div>
            <div class="list-content-info-middle">
              {{ item.orderPrice || "--" }}
            </div>
          </div>
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 成交价格 -->
              {{ $t("futures.history.text14") }}
            </div>
            <div class="list-content-info-middle">{{ item.price }}</div>
          </div>
        </div>
        <div class="list-content-line">
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 开平 -->
              {{ $t("futures.entrust.text5") }}
            </div>
            <div
              class="list-content-info-middle"
              :class="[item.offset === 'OPEN' ? 'red' : 'green']"
            >
              {{
                item.offset == "OPEN"
                  ? $t("futures.entrust.text6")
                  : $t("futures.entrust.text7")
              }}
            </div>
          </div>
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 订单类型 -->
              {{ $t("futures.history.text3") }}
            </div>
            <div class="list-content-info-middle">
              <!-- 委托价单 市价单 -->
              {{
                item.orderPriceType == "LIMIT"
                  ? $t("futures.history.text10")
                  : $t("futures.history.text9")
              }}
            </div>
          </div>
        </div>
        <div class="list-content-line">
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 开仓 平仓 手续费 -->
              {{
                item.offset == "OPEN"
                  ? $t("futures.entrust.text6")
                  : $t("futures.entrust.text7")
              }}{{ $t("futures.history.text15") }}
            </div>
            <div class="list-content-info-middle">{{ item.fee }}</div>
          </div>
        </div>
        <div class="list-content-line">
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 成交时间 -->
              {{ $t("futures.history.text17") }}
            </div>
            <div class="list-content-info-middle">{{ item.time }}</div>
          </div>
        </div>
        <div class="list-content-line">
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 成交编号 -->
              {{ $t("futures.history.text18") }}
            </div>
            <div class="list-content-info-middle">{{ item.id }}</div>
          </div>
        </div>
      </div>
      <div class="list-content" v-if="indexKey == 1">
        <div class="list-content-line">
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 委托价格 -->
              {{ $t("futures.history.text19") }}
            </div>
            <div class="list-content-info-middle">{{ item.price || "--" }}</div>
          </div>
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 委托状态 -->
              {{ $t("futures.history.text1") }}
            </div>
            <div class="list-content-info-middle">
              {{
                item.status == "FINISHED"
                  ? $t("futures.history.text11")
                  : $t("futures.history.text13")
              }}
            </div>
          </div>
        </div>
        <div class="list-content-line">
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 开平 -->
              {{ $t("futures.history.text2") }}
            </div>
            <div
              class="list-content-info-middle"
              :class="[item.offset === 'OPEN' ? 'red' : 'green']"
            >
              <!-- 开仓 平仓 -->
              {{
                item.offset == "OPEN"
                  ? $t("futures.history.text7")
                  : $t("futures.history.text8")
              }}
            </div>
          </div>
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 订单类型 -->
              {{ $t("futures.history.text3") }}
            </div>
            <div class="list-content-info-middle">
              <!-- 委托价单  市价单 -->
              {{
                item.orderPriceType == "LIMIT"
                  ? $t("futures.history.text10")
                  : $t("futures.history.text9")
              }}
            </div>
          </div>
        </div>
        <div class="list-content-line">
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 委托数量 -->
              {{ $t("futures.history.text20") }}
            </div>
            <div class="list-content-info-middle">{{ item.volume }}</div>
          </div>
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 成交数量 -->
              {{ $t("futures.history.text21") }}
            </div>
            <div class="list-content-info-middle">{{ item.tradeVolume }}</div>
          </div>
        </div>
        <div class="list-content-line">
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 剩余数量 -->
              {{ $t("futures.history.text22") }}
            </div>
            <div class="list-content-info-middle">
              {{ item | removeNum(item) }}
            </div>
          </div>
        </div>
        <div class="list-content-line">
          <div class="list-content-info">
            <div class="list-content-info-label">
              <!-- 委托时间 -->
              {{ $t("futures.history.text23") }}
            </div>
            <div class="list-content-info-middle">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const _this = this;
import { subtr } from "@/assets/js/add-remove";
import {
  orderPriceTypeEnum,
  directEnum,
  offsetEnum
} from "@/assets/js/utils/constant";
export default {
  props: {
    order: {},
    indexKey: {}
  },
  data() {
    return {
      // order: []
    };
  },
  filters: {
    removeNum(item) {
      return subtr(item.volume, item.tradeVolume);
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.list {
  padding: 0 0.2rem 0.2rem;
  // height: calc(~"100vh - 3.4rem - 2rem");
  // padding-bottom: 1rem;
  // overflow: hidden;
  // overflow-y: auto;
  // -webkit-overflow-scrolling: touch;
  .list-item {
    padding: 0.24rem 0.3rem 0.4rem 0.3rem;
    border-radius: 4px;
    // box-shadow: 0 1px 17px rgb(216, 226, 245);
    background: @markBg;
    margin-bottom: 0.18rem;
    .list-title {
      display: flex;
      // padding: 0 0.3rem 0.16rem;
      padding-bottom: 0.22rem;
      border-bottom: 1px dotted @lineColor;
      justify-content: space-between;
      span {
        font-size: 0.2rem;
        color: rgb(104, 114, 132);
      }
      & > div {
        // flex: 1;
        font-size: 0.3rem;
        color: @darkBlueGrey;
        &.list-title-right {
          font-size: 0.28rem;
          text-align: left;
        }
      }
      .leverageleft {
        display: inline-block;
        margin-left: 0.04rem;
        text-align: center;
        background: rgba(0, 102, 237, 0.15);
        height: 0.32rem;
        width: 0.68rem;
        color: @blueColor;
        font-size: 0.2rem !important;
        transform: skew(-10deg, 0);
      }
      .list-title-left1 {
        width: 1.5rem;
      }
      .list-title-gen {
        // font-size: 14px;
        text-align: left;
        margin: 0;
        color: #687284;
      }
    }
    .list-content {
      // padding: 0 0.3rem;
      .list-content-line {
        display: flex;
        margin-top: 0.26rem;
        .list-content-info {
          display: flex;
          flex: 1;
          align-items: center;
          .list-content-info-label {
            // flex: 0 0 1.4rem;
            width: 1.5rem;
            text-align: left;
            // margin-right: 0.36rem;
            display: inline-block;
            color: rgb(104, 114, 132);
            font-size: 0.28rem;
          }
          .list-content-info-middle {
            font-size: 0.28rem;
            color: @txtColor;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
