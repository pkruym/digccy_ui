<template>
  <popup class="lever-contract" v-model="showLeft" :popup-style="{ 'z-index': 1502, background: '#fefffe' }" position="left" width="75%">
    <div class="head-title">
      {{ tradeType == "LEVER" ? $t('coupons.Leverage') : $t('coupons.deliveryContract') }}
    </div>
    <div class="tabs" v-if="tradeType == 'LEVER'">
      <div class="tab active medium">USDT</div>
    </div>
    <div class="tabs medium" v-else>
      <template v-for="item in tabList">
        <div class="tab medium" :key="item.value" :class="{ active: item.check }" @click="changeTab(item)">
          {{ item.name }}
        </div>
      </template>
    </div>
    <div class="list-wrap">
      <template v-if="tradeType === 'LEVER'">
        <div class="lever-box line05" @click="bgo(item)" v-for="(item, index) in list" :key="item.symbol">
          <div class="leve-name medium">
            {{ item.symbol ? item.symbol.split("/")[0] : "--" }}/{{
              item.symbol ? item.symbol.split("/")[1] : "--"
            }}
          </div>
          <div class="leve-price Medium" :class="[item.upDropSpeed > 0 ? 'green' : 'red']">
            {{ item.close.toFixed(item.symbolpricePrecision) }}
          </div>
        </div>
      </template>
      <template v-else>
        <template v-if="tabValue == 'all'">
          <template v-for="(item, index) in list">
            <div class="label-title line05">{{ item.labelName }}</div>
            <div class="lever-box line05" @click="bgo(item)" v-for="(item, index) in item.data">
              <div class="leve-name medium" :key="item.name + '' + index">
                {{
                  $lang == "en"
                    ? item.nameEnglish
                      ? item.nameEnglish
                      : "--"
                    : item.name
                    ? item.name
                    : "--"
                }}
              </div>
              <div class="leve-price Medium" :class="[item.upDropSpeed > 0 ? 'green' : 'red']">
                {{ item.close.toFixed(item.symbolpricePrecision) }}
              </div>
            </div>
          </template>
        </template>
        <template v-else>
          <template v-if="fuctureList && fuctureList.length > 0">
            <div class="lever-box line05" @click="bgo(item)" v-for="(item, index) in fuctureList">
              <div class="leve-name medium" :key="item.symbol">
                {{
                  $lang == "en"
                    ? item.nameEnglish
                      ? item.nameEnglish
                      : "--"
                    : item.name
                    ? item.name
                    : "--"
                }}
              </div>
              <div class="leve-price Medium" :class="[item.upDropSpeed > 0 ? 'green' : 'red']">
                {{ toFixedStr(item.close, item.symbolpricePrecision) }}
              </div>
            </div>
          </template>
        </template>
      </template>

      <!-- <template v-if="tradeType === 'LEVER'">
      <div
        class="transList line05"
        :class="{ hong: color == 'hong', green: color == 'green' }"
        @click="bgo(item)"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="middle">
          <div class="name Medium">
            <div class="face"><img v-lazy="getimagepath + item.icon" /></div>
            <p class="ellipse">
              {{ item.symbol ? item.symbol.split("/")[0] : "--" }}
              <span>/{{ item.symbol ? item.symbol.split("/")[1] : "--" }}</span>
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
              <div class="face"><img v-lazy="getimagepath + item.icon" /></div>
              <p class="ellipse">
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
    </template> -->
    </div>
  </popup>
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
      showLeft: false,
      num: 0,
      arr: [],
      color: "",
      imageUrl: localStorage.getItem("imageUrl"),
      tabList: [
        //*CW:当周  NW：次周 CQ：季度
        {
          name: this.$t('common.all'),//"全部",
          value: "all",
          check: true
        },
        {
          name: this.$t('common.currentweek'),//"当周",
          value: "CW",
          check: false
        },
        {
          name: this.$t('common.nextweek'),//"次周",
          value: "NW",
          check: false
        },
        {
          name: this.$t('common.currentSeason'),//"当季",
          value: "CQ",
          check: false
        }
      ],
      tabValue: "all",
      fuctureList: []
    };
  },
  watch: {
    // color() {
    //   setTimeout(() => {
    //     this.color = "";
    //   }, 500);
    // },
    showLeft() {
      if (!this.showLeft) {
        this.$emit("closeLeft");
        document.body.style.overflow = "";
      } else {
        document.body.style.overflow = "hidden";
      }
    },
    tabValue() {
      this.getContractList();
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
      if (!this.imageUrl) this.imageUrl = localStorage.getItem("imageUrl");
      return this.imageUrl ? this.imageUrl : localStorage.getItem("imageUrl");
    },
    allData() {
      let arr = [];
      this.list.forEach(d => {
        arr.push(...d.data);
      });
      return arr;
    }
  },
  methods: {
    ...mapActions({
      changeAsideKeyIndex: "aside/changeAsideKeyIndex", //
      symbolSubscribe: "contractInfo/symbolSubscribe" //修改状态
    }),
    ...mapMutations({
      toggleUserFlag: "contractInfo/toggleUserFlag"
    }),

    getContractList() {
      this.fuctureList = [];
      let arr = [];
      if (this.tabValue != "all") {
        console.log("this.allData", this.allData);
        arr = this.allData.filter(
          d => d.symbol.indexOf("_" + this.tabValue) > -1
        );
      } else {
        arr = this.list;
      }
      this.fuctureList = arr;
    },
    changeTab(item) {
      this.tabValue = item.value;
      this.tabList.forEach(d => {
        d.check = d.value == item.value;
      });
    },
    go(item, event) {
      // event
      // this.$router.push({name:'buy',params:{stockCode:item.stockCode}})
    },
    bgo(item) {
      this.symbolSubscribe({ symbol: item.symbol });
      this.showLeft = false;
      busVue.$emit("selectContract", {
        symbol: item.symbol
      });
      this.$router.push({
        name: "stock-line",
        query: { symbol: item.symbol }
      });
    }
  },
  mounted() { }
};
</script>
<style lang="less" scoped>
@import '~@/assets/css/font2Standard.less';

.list-wrap {
  // overflow-y: scroll;
  // max-height: calc(~"100% - 1rem");
  // padding-bottom: 50px;
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
        // font-weight: 700;
        color: @darkBlueGrey;
        display: flex;
        align-items: flex-end;
        margin-bottom: 0.08rem;
        .face {
          flex: 0 0 0.36rem;
          width: 0.36rem;
          height: 0.36rem;
          // background: rgb(70,98,102);
          border-radius: 50%;
          margin-right: 0.1rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
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
        font-family: 'DIN-Medium';
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
