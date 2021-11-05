<template>
  <div class="list-wrap">
    <template v-if="tradeType === 'LEVER'">
      <div
        class="transList line05"
        :class="{ hong: color == 'hong', green: color == 'green' }"
        @click="bgo(item)"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="middle">
          <div class="name Medium">
            <div
              :class="
                item.logoName
                  ? 'head-ico ' + item.logoName + '-ico'
                  : 'head-ico default-ico'
              "
            ></div>
            <p class="ellipse medium">
              {{ item.symbol ? item.symbol.split("/")[0] : "--" }}
              <span class="medium"
                >/{{ item.symbol ? item.symbol.split("/")[1] : "--" }}</span
              >
            </p>
          </div>
          <div class="desc" v-show="isDesc">
            {{ $lang == "en" ? item.descriptionEnglish : item.description }}
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
      </div>
    </template>
    <template v-else>
      <div v-for="(item, index) in list" :key="index" class="contract-box">
        <div class="labelName">{{ item.labelName }}</div>
        <div
          class="transList line05"
          :class="{ hong: color == 'hong', green: color == 'green' }"
          @click="bgo(item)"
          v-for="(item, i) in item.data"
          :key="i"
        >
          <div class="middle">
            <div class="name Medium">
              <div
                :class="
                  item.logoName
                    ? 'head-ico ' + item.logoName + '-ico'
                    : 'head-ico default-ico'
                "
              ></div>
              <p class="ellipse medium">
                {{
                  $lang == "en"
                    ? item.nameEnglish
                      ? item.nameEnglish
                      : "--"
                    : item.name
                    ? item.name
                    : "--"
                }}
              </p>
            </div>
            <div class="desc" v-show="isDesc">
              {{ $lang == "en" ? item.descriptionEnglish : item.description }}
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
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import busVue from "@/assets/js/bus";
import { mapMutations, mapActions } from "vuex";

export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    tradeType: {
      type: String,
      default: "LEVER"
    }
  },
  data() {
    return {
      isDesc: true,
      str: "",
      num: 0,
      arr: [],
      color: "",
      imageUrl: ""
    };
  },

  watch: {
    str() {},
    color() {
      setTimeout(() => {
        this.color = "";
      }, 500);
    }
  },
  computed: {
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
    getimagepath() {
      // if (!this.imageUrl) this.imageUrl = localStorage.getItem("imageUrl");
      return bitconfig.imgurl || "";
    }
  },
  methods: {
    ...mapActions({
      changeAsideKeyIndex: "aside/changeAsideKeyIndex" //
    }),
    ...mapMutations({
      toggleUserFlag: "contractInfo/toggleUserFlag"
    }),

    go(item, event) {
      // event
      // this.$router.push({name:'buy',params:{stockCode:item.stockCode}})
    },
    bgo(item) {
      busVue.$emit("selectContract", {
        symbol: item.symbol
      });
      this.$router.push({
        name: "stock-line",
        query: { symbol: item.symbol }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/font2Standard.less";

.list-wrap {
  overflow-y: scroll;
  max-height: calc(~"100% - 1rem");
  padding-bottom: 50px;
}
.gray {
  color: #000;
}
.contract-box {
  .labelName {
    font-size: 14px;
    line-height: 0.6rem;
    color: #949fac;
    background: @markBg;
    padding-left: 0.32rem;
  }
  // &:first-child {
  //   .labelName {
  //     background: @markBg;
  //   }
  // }
}

.transList {
  display: flex;
  // padding: 0 0.3rem;
  // background: rgb(28, 38, 48);
  padding: 0.2rem 0.32rem;
  align-items: center;
  // margin-bottom: 0.02rem;
  position: relative;

  &:last-child {
    border-bottom: none;
  }
  > div {
    flex: 2;

    &.middle {
      // flex: 0 0 4.2rem;
      // width: 4.2rem;
      // margin-right: 0.2rem;
      // overflow: hidden;
      // display: flex;

      .name {
        font-size: 0.25rem;
        color: @darkBlueGrey;
        display: flex;
        align-items: flex-end;
        margin-bottom: 0.08rem;

        .ellipse {
          margin-top: 0.1rem;
          span {
            display: inline-block;
            // margin-left: 0.1rem;
            font-size: 0.2rem;
            color: #949fac;
          }
        }
        p {
          // max-width: 4rem;
        }
        img {
          display: block;
          width: 0.88rem;
          height: 0.32rem;
          object-fit: contain;
        }
      }
      .desc {
        color: @battleshipGrey;
        font-size: 0.2rem;
      }
    }
    &.mind {
      flex: 1;
      text-align: right;
      color: @txtColor;
      p {
        font-family: "DIN-Medium";
        font-size: 0.32rem;

        &:nth-of-type(2) {
          font-size: 0.28rem;
          color: rgb(104, 114, 132);
        }
      }
    }
    &.last {
      flex: 1;
      // flex-basis: 0.5rem;
      text-align: right;
      > span {
        display: inline-block;
        width: 1.2rem;
        height: 0.52rem;
        border-radius: 2px;
        text-align: center;
        line-height: 0.52rem;
        color: @bodyBg;
        font-size: 0.28rem;
        &.bg-green {
          background: @fontColor;
        }
        &.bg-red {
          background: @fontRedColor;
        }
        // padding: 0.12rem 0.14rem;
        // font-size: 0.28rem;
        // line-height: 1;
        // border-radius: 0.04rem;

        // display: none;
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
</style>
