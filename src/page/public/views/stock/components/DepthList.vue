<template>
  <div id="depth-list">
    <div class="title">
      <div class="title-info">
        {{ $t("leverageTrading.bid") }} {{ $t("leverageTrading.number") }}
      </div>
      <div class="title-info">{{ $t("leverageTrading.price1") }}(USDT)</div>
      <div class="title-info">
        {{ $t("leverageTrading.number") }} {{ $t("leverageTrading.selling") }}
      </div>
    </div>
    <div class="list-container">
      <div class="list-info">
        <div class="list-info-left">
          <div
            class="list-info-left-desc"
            v-for="(item, index) in bidsList"
            :key="index"
          >
            <div class="Medium">
              <i>{{ index + 1 }}</i>
              {{ item[1].toFixed(symbolvolumePrecision) }}
            </div>
            <div class="Medium bids">
              {{ item[0].toFixed(symbolpricePrecision) }}
              <span
                :style="{ width: bidsList[index][1] * getbidsWidth + '%' }"
                id="bidspan"
              ></span>
            </div>
          </div>
        </div>
        <div class="list-info-right">
          <div
            class="list-info-right-desc"
            v-for="(item, index) in asksList"
            :key="index"
          >
            <div class="Medium" id="asks">
              {{ item[0].toFixed(symbolpricePrecision) }}
              <span
                :style="{ width: asksList[index][1] * getasksMax + '%' }"
              ></span>
            </div>
            <div class="Medium">
              {{ item[1].toFixed(symbolvolumePrecision) }}
              <i>{{ index + 1 }}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: {
    asksList: {
      type: Array,
      default: []
    },
    bidsList: {
      type: Array,
      default: []
    }
  },
  computed: {
    ...mapGetters({
      symbolpricePrecision: "trading/symbolpricePrecision",
      symbolvolumePrecision: "trading/symbolvolumePrecision"
    }),
    getbidsWidth() {
      let max = 0;
      for (let index = 0; index < this.bidsList.length; index++) {
        const element = this.bidsList[index];
        if (element[1] > max) max = element[1];
      }
      return 400 / max;
    },
    getasksMax() {
      let max = 0;
      for (let index = 0; index < this.asksList.length; index++) {
        const element = this.asksList[index];
        if (element[1] > max) max = element[1];
      }
      return 400 / max;
    }
  }
};
</script>
<style lang="less" scoped>
#depth-list {
  padding: 0.28rem 0.32rem 0 0.32rem;
  background: @bodyBg;
  .title {
    display: flex;
    margin-bottom: 0.36rem;
    .title-info {
      flex: 1;
      text-align: left;
      color: @txt2Color;
      font-size: 0.2rem;
      &:nth-of-type(2) {
        text-align: center;
      }
      &:nth-of-type(3) {
        text-align: right;
      }
    }
  }
  .list-container {
    margin-bottom: 20px;
    .list-info {
      display: flex;
      flex-wrap: wrap;

      .list-info-left {
        flex: 1;
        position: relative;
        // &::after {
        //   content: "";
        //   display: block;
        //   height: 100%;
        //   width: 0.01rem;
        //   top: 0;
        //   right: -1px;
        //   background-color: #22272d;
        //   position: absolute;
        // }
        .list-info-left-desc {
          // display: flex;
          width: 100%;
          overflow: hidden;
          i {
            font-style: normal;
            font-style: 0.2rem;
            display: inline-block;
            margin-right: 0.24rem;
            color: @txt2Color;
            // width: 0.2rem;
          }
          & > div {
            float: left;
            color: @lightBlueGreyTwo;
            font-size: 0.2rem;
            position: relative;
            height: 0.56rem;
            line-height: 0.56rem;
            // flex: 1;
            &:nth-of-type(2) {
              float: right;
              text-align: right;
              color: rgb(3, 173, 143);
              padding-right: 0.1rem;
            }
            span {
              width: 100%;
              height: 100%;
              position: absolute;
              right: 0;
              top: 0;
              background: rgb(3, 173, 143);
              opacity: 0.2;
            }
          }
        }
      }
      .list-info-right {
        flex: 1;
        .list-info-right-desc {
          // display: flex;
          width: 100%;
          overflow: hidden;
          i {
            font-style: normal;
            font-style: 0.2rem;
            display: inline-block;
            margin-left: 0.2rem;
            color: @txt2Color;
          }
          & > div {
            font-size: 0.2rem;
            position: relative;
            flex: 1;
            height: 0.56rem;
            line-height: 0.56rem;
            color: rgb(208, 75, 100);
            float: left;
            &:nth-of-type(1) {
              padding-left: 0.1rem;
            }
            &:nth-of-type(2) {
              text-align: right;
              color: @lightBlueGreyTwo;
              float: right;
            }
            span {
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              background: rgb(208, 75, 100);
              opacity: 0.2;
            }
          }
        }
      }
      // & > div {
      //   font-size: 0.24rem;
      //   flex: 1;
      //   color: @lightBlueGreyTwo;
      //   height: 0.56rem;
      //   line-height: 0.56rem;
      //   text-align: left;
      //   &.price {
      //     display: flex;
      //     & > div {
      //       flex: 1;
      //       font-size: 0.24rem;
      //       text-align: center;
      //       position: relative;
      //       span {
      //         width: 100%;
      //         height: 100%;
      //         position: absolute;
      //         left: 0;
      //         top: 0;
      //         background: rgb(208, 75, 100);
      //         opacity: 0.1;
      //       }
      //       &:nth-of-type(1) {
      //         border-right: 1px solid @darkFive;
      //         span {
      //           background: rgb(3, 173, 143);
      //         }
      //       }
      //     }
      //   }
      //   &:nth-of-type(3) {
      //     text-align: right;
      //   }
      // }
    }
  }
}
</style>
