<template>
  <div class="recommend">
    <div class="tabs line05">
      <span :class="{ active: tabIndex == 1 }" @click="tabClick(1)">{{
        $t("dialog.trading.newlever")
      }}</span>
      <span :class="{ active: tabIndex == 2 }" @click="tabClick(2)">{{
        $t("dialog.trading.newcontract")
      }}</span>
    </div>
    <div class="recommend-list">
      <div class="head-box">
        <!-- <span>币种对</span>
        <span>最新价</span>
        <span>涨跌幅</span> -->
        <span>{{ $t("quotation.text3") }}</span>
        <span>{{ $t("buy.text63") }}</span>
        <span>{{ $t("leverageTrading.updowns") }}</span>
        <!-- <span>&nbsp;</span> -->
      </div>
      <template v-for="item in list">
        <div class="transList line05" @click="bgo(item)">
          <div class="middle">
            <div class="name Medium">
              <div
                :class="
                  item.logoName
                    ? 'top-head-ico ' + item.logoName + '-ico'
                    : 'top-head-ico default-ico'
                "
              ></div>
              <div class="neiron">
                <p class="ellipse medium">
                  {{
                    ($lang == "en" && tabIndex == 2) || tabIndex == 1
                      ? item.nameEnglish
                      : item.name
                  }}
                  <span class="medium" v-if="tabIndex == 1">/USDT</span>
                </p>
                <p class="desc">
                  <!-- {{ $lang == "en" ? item.descriptionEnglish : item.description }} -->
                  <span>100X</span>
                </p>
              </div>
            </div>
          </div>
          <div
            class="mind din-medium"
            :class="[cptColor(item) ? 'bggreen' : 'bgred']"
          >
            <p>{{ item.close.toFixed(item.symbolpricePrecision) }}</p>
          </div>

          <div class="last">
            <span
              :class="[item.upDropSpeed > 0 ? 'bg-green' : 'bg-red']"
              class="din-medium"
              >{{ item.upDropSpeed }}%</span
            >
          </div>
          <!-- <div class="btn" @click="bgo(item)"> -->
          <!-- <span>去交易</span> -->
          <!-- <span>{{ $t("buy.text65") }}</span>
          </div> -->
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import busVue from "@/assets/js/bus";

export default {
  data() {
    return {
      // tabIndex: 1,
      imageUrl: "https://cdn-lalala.oss-cn-beijing.aliyuncs.com/icons/"
    };
  },
  computed: {
    ...mapState("contractInfo", {
      tabIndex: "tabIndex"
    }),
    ...mapGetters({
      getListByAppRecommendGg: "contractInfo/getListByAppRecommendGg",
      getListByAppRecommendHy: "contractInfo/getListByAppRecommendHy"
    }),
    gteimgpath() {
      return bitconfig.imgurl || "";
    },
    cptColor() {
      return item => {
        let n = parseFloat(item.preSettle)
          ? parseFloat(item.preSettle)
          : parseFloat(item.open);
        if (parseFloat(item.newPrice) > n) {
          return true;
        }

        return false;
      };
    },
    list() {
      return this.tabIndex == 1
        ? this.getListByAppRecommendGg
        : this.getListByAppRecommendHy;
    }
  },
  created() {
    this.setTabIndex(this.$tradeType.tradeType == "LEVER" ? 1 : 2);
  },
  methods: {
    ...mapMutations({
      setTabIndex: "contractInfo/setTabIndex"
    }),
    bgo(item) {
      this.$router.push({
        name: "stock-line",
        query: { symbol: item.symbol }
      });
      busVue.$emit("selectContract", {
        symbol: item.symbol
      });
    },
    tabClick(type) {
      // this.tabIndex = type
      this.$tradeType.tradeType = type == 1 ? "LEVER" : "FUTURE";
      this.setTabIndex(type);
      localStorage.setItem("tradeType", this.$tradeType.tradeType);
    }
  }
};
</script>
<style lang="less" scoped>
.recommend {
  padding: 0 0.3rem;
  .tabs {
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
    color: @txtColor;
    span {
      height: 0.8rem;
      line-height: 0.8rem;
      display: block;
      position: relative;
      &:last-child {
        margin-left: 0.7rem;
      }
      &.active {
        color: @blueColor;
        &::after {
          position: absolute;
          content: "";
          height: 2px;
          width: 100%;
          bottom: 1px;
          left: 0;
          background-color: @blueColor;
        }
      }
    }
  }
  .recommend-list {
    .head-box {
      color: #949fac;
      font-size: 11px;
      display: flex;
      // height: 0.4rem;
      padding: 0.1rem 0;
      span {
        align-items: center;
        &:first-child {
          width: 40%;
          justify-content: flex-start;
        }
        &:not(:first-child) {
          flex: 1;
          text-align: right;
        }
      }
    }
    .transList {
      display: flex;
      height: 1.08rem;
      align-items: center;
      position: relative;
      // margin-bottom: 0.02rem;
      &:last-child {
        border-bottom: none;
      }
      > div {
        &.middle {
          width: 40%;
          .name {
            font-size: 0.25rem;
            // font-weight: 700;
            color: @darkBlueGrey;
            display: flex;
            align-items: center;
            margin-bottom: 0.08rem;

            .neiron {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              .ellipse {
                // margin-top: 0.1rem;
                span {
                  display: inline-block;
                  // margin-left: 0.1rem;
                  font-size: 0.2rem;
                  color: #949fac;
                }
              }
              img {
                display: block;
                width: 0.88rem;
                height: 0.32rem;
                object-fit: contain;
              }
            }
            .desc {
              margin: 0;
              padding: 0;
              width: 100%;
              span {
                display: block;
                width: 36px;
                line-height: 13px;
                height: 13px;
                margin-left: -2px;
                background: rgba(0, 102, 237, 0.15);
                border-radius: 1px;
                font-size: 10px;
                -webkit-transform: scale(0.8);
                color: @blueColor;
                letter-spacing: 0;
                text-align: center;
                transform: skewX(-10deg);
              }
            }
          }
        }
        &.mind {
          flex: 1;
          text-align: right;
          p {
            font-size: 16px;
            color: @txtColor;
            font-family: "DIN-Medium";
            &:nth-of-type(2) {
              font-size: 0.28rem;
              color: rgb(104, 114, 132);
            }
          }
        }
        &.last {
          flex: 1;
          text-align: right;
          > span {
            display: inline-block;
            text-align: center;
            width: 1.2rem;
            height: 0.52rem;
            border-radius: 2px;
            line-height: 0.52rem;
            font-size: 0.28rem;
            border-radius: 2px;
            color: @bodyBg;
            &.bg-green {
              background: @fontColor;
            }
            &.bg-red {
              background: @fontRedColor;
            }
          }
        }
        &.btn {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          span {
            display: block;
            width: 50px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #fff;
            font-size: 10px;
            -webkit-text-size-adjust: none;
            background-image: linear-gradient(90deg, #1dcba2 0%, #00a981 100%);
            border-radius: 2px;
          }
        }
      }
      .bgred {
        color: @Red;
      }
      .bggreen {
        color: @algaeGreen;
      }
      //begin add cc bugid4250 字体颜色
      .fontbgred {
        color: @Red;
      }
      .fontbggreen {
        color: @algaeGreen;
      }
      //end add cc bugid 4250 字体颜色
    }
  }
}
</style>
