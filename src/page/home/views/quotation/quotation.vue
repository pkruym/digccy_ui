<template>
  <div class="homeHot">
    <topBtn class="btn-bbb" @change="_change" :indexKey="indexKey">
      <div class="title line05" slot="title">
        <div class="head">{{ $t("quotation.text3") }}</div>
        <div class="mind">{{ $t("quotation.text4") }}</div>
        <div class="last" @click="orderBy">
          {{ $t("quotation.text5") }}
          <div class="orderby" v-if="$tradeType.tradeType === 'LEVER'">
            <span class="up" :class="{ active: order === 1 }"></span>
            <span class="down" :class="{ active: order === 2 }"></span>
          </div>
        </div>
      </div>
    </topBtn>
    <div class="main1 quatation-main">
      <noData v-if="cptList.length <= 0"></noData>
      <div class="list-box" v-if="cptList.length > 0">
        <Translist
          :list="cptList"
          :tradeType="$tradeType.tradeType"
        ></Translist>
      </div>
    </div>
  </div>
</template>

<script>
import Translist from "@/components/homeHot/transaList";
import ModelFull from "element/model-full";
import busVue from "@js/bus";
import { Storage } from "@/assets/js/localstorage";

import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  components: {
    Translist,
    ModelFull
  },
  data() {
    return {
      indexKey: this.$tradeType.tradeType == "LEVER" ? 0 : 1,
      order: 0,
      isOrder: false
    };
  },
  computed: {
    ...mapGetters({
      getListByMarketType: "contractInfo/getListByMarketType"
    }),
    cptList() {
      const compare = key => {
        return (a, b) => {
          var value1 = parseFloat(a[key]);
          var value2 = parseFloat(b[key]);
          if (this.order === 1) {
            return value1 - value2;
          } else {
            return value2 - value1;
          }
        };
      };
      //获取数据及排序
      if (this.$tradeType.tradeType !== "LEVER") {
        return this.getListByMarketType(
          this.indexKey == 0 ? "LEVER" : "FUTURE"
        );
      } else {
        if (this.isOrder) {
          return this.getListByMarketType(
            this.indexKey == 0 ? "LEVER" : "FUTURE"
          ).sort(compare("upDropSpeed"));
        } else {
          return this.getListByMarketType(
            this.indexKey == 0 ? "LEVER" : "FUTURE"
          );
        }
      }
    }
  },
  mounted() {
    this.isOrder = false;
  },
  methods: {
    ...mapMutations({
      changetradeType: "changetradeType",
      setTabIndex: "contractInfo/setTabIndex"
    }),
    ...mapActions({
      changeAsideKeyIndex: "aside/changeAsideKeyIndex" //
    }),
    orderBy() {
      // 仅仅对杠杆交易排序
      this.isOrder = true;
      if (this.$tradeType.tradeType !== "LEVER") return;
      if (this.order === 1) {
        this.order = 2;
      } else {
        this.order = 1;
      }
    },
    _change(key) {
      this.$tradeType.tradeType = key == 0 ? "LEVER" : "FUTURE";
      this.indexKey = key;
      this.changetradeType({ tradeType: this.$tradeType.tradeType }); // 修改状态
      this.setTabIndex(this.$tradeType.tradeType == "LEVER" ? 1 : 2);
      Storage.setString("tradeType", this.$tradeType.tradeType);
    }
  }
};
</script>

<style lang="less" scoped>
.homeHot {
  // background: #1c2630;
  // overflow: auto;
  // padding-top: 1.44rem;
  position: relative;
  height: 100%;
  // padding-bottom: 50px;
  // bottom: 72px;
  // -webkit-overflow-scrolling: touch;
  overflow: hidden;
  .btn-box .title {
    padding: 0 0.3rem;
    display: flex;
    height: 0.56rem;
    align-items: center;
    background: @bodyBg;
    position: relative;
    div {
      flex: 1;
      font-size: 0.28rem;
      line-height: 1;
      color: @txt2Color;
      &.head {
        flex: 2;
      }
      &.mind {
        text-align: right;
      }

      &.last {
        // flex-basis: 1rem;
        text-align: right;
        .orderby {
          display: inline-block;
          width: 0.2rem;
          > span {
            height: 0.1rem;
            width: 0.2rem;
            display: block;
            position: relative;

            &::before {
              content: "";
              height: 0;
              width: 0;
              display: block;
              border: 0.1rem transparent solid;
              position: absolute;
            }
            &.up {
              &:before {
                border-top-width: 0;
                border-bottom-color: @txt2Color;
                top: 0px;
              }
              &.active {
                &:before {
                  border-bottom-color: @blueColor;
                }
              }
            }
            &.down {
              &:before {
                border-bottom-width: 0;
                border-top-color: @txt2Color;
                bottom: -2px;
              }
              &.active {
                &:before {
                  border-top-color: @blueColor;
                }
              }
            }
          }
        }
      }
    }
  }
  .main1 {
    padding-top: 1.45rem;
  }
}
</style>
