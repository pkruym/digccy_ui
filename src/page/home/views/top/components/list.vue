<template>
  <div class="list">
    <div class="list-left">
      <div class="defaultportrait" v-if="index > 2">
        <img v-if="item.headImg" :src="imageUrl + item.headImg" alt />

        <img v-else src="@/assets/img/2_3/ico_touxiang_zhanwei@2x.png" />
      </div>
      <div class="portrait" v-if="index <= 2">
        <img
          class="defaultimg"
          v-if="item.headImg"
          :src="imageUrl + item.headImg"
          alt
        />
        <img
          class="defaultimg"
          v-else
          src="@/assets/img/2_3/ico_touxiang_zhanwei@2x.png"
        />

        <img
          class="topimg"
          v-if="index == 0"
          src="@/assets/img/2_3/img_sy_touxiang_one@2x.png"
        />
        <img
          class="topimg"
          v-if="index == 1"
          src="@/assets/img/2_3/img_sy_touxiang_two@2x.png"
        />
        <img
          class="topimg"
          v-if="index == 2"
          src="@/assets/img/2_3/img_sy_touxiang_three@2x.png"
        />
      </div>
      <p>{{ item.mobilephone }}</p>
    </div>
    <div class="list-right">
      <div class="profit">
        <p v-if="item.totalProfit < 1000000">
          {{ (item.totalProfit / 1000).toFixed(2) }}K
        </p>
        <p v-else>{{ (item.totalProfit / 1000000).toFixed(2) }}M</p>
        <p>{{ $t("index.text37") }} USDT</p>
      </div>
      <div class="rate">
        <p>{{ item.profitTotalVolume }}</p>
        <p>{{ $t("index.text38") }}</p>
      </div>
      <div class="price">
        <p>{{ item.rankingsReward }}</p>
        <p>{{ $t("index.text39") }} USDT</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      imageUrl: localStorage.getItem("imageUrl") || ""
    };
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: {}
    }
  },
  created() {},
  methods: {
    ...mapActions({}),
    go(item) {
      this.$router.push({
        path: "/tigerDetail",
        query: {
          userId: item.userId,
          index: this.index
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.list {
  display: flex;
  // padding: 0.22rem 0 0.2rem 0;
  align-items: center;
  .list-left {
    // flex: 0 0 1.2rem;
    // width: 1.2rem;
    align-items: center;
    padding: 0.22rem 0 0.2rem 0;
    .defaultportrait {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid rgb(42, 204, 166);
      margin: 0 auto 0.1rem auto;
      // background-size:
      img {
        width: 100%;
        height: 100%;
      }
    }
    .portrait {
      position: relative;
      width: 0.9rem;
      height: 0.9rem;
      // border-radius: 100%;
      // border: 1px solid rgb(42, 204, 166);
      margin: 0 auto 0 auto;
      // background-size:
      .defaultimg {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        left: 0.1rem;
        top: 0.14rem;
      }
      .topimg {
        z-index: 20;
        width: 0.8rem;
        height: 0.8rem;
        position: absolute;
        // left: 2px;
      }
    }
    p {
      font-size: 0.2rem;
      color: @blueyGrey;
      text-align: center;
    }
  }
  .list-right {
    flex: 1;
    margin-left: 0.1rem;
    // padding-bottom: .4rem;
    display: flex;
    // border-bottom: 1px solid @darkTwo;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      height: 1px;
      background: @darkTwo;
      left: 0;
      bottom: -0.4rem;
      position: absolute;
    }
    .profit {
      flex: 0 0 1.5rem;
      width: 1.5rem;
      margin-right: 0.3rem;
      p {
        font-size: 0.28rem;
        color: rgb(42, 204, 166);
        text-align: right;
        &:nth-of-type(1) {
          font-weight: 700;
        }
        &:nth-of-type(2) {
          font-size: 0.2rem;
          color: @battleshipGrey;
        }
      }
    }
    .rate {
      flex: 0 0 2rem;
      width: 2rem;
      margin-right: 0.2rem;
      p {
        font-size: 0.28rem;
        color: @whiteTwo;
        text-align: right;
        &:nth-of-type(1) {
          font-weight: 700;
        }
        &:nth-of-type(2) {
          font-size: 0.2rem;
          color: @battleshipGrey;
        }
      }
    }
    .price {
      // flex: 0 0 1.2rem;
      flex: 1;
      // width: 1.2rem;
      // margin-right: 0.3rem;
      p {
        font-size: 0.28rem;
        // color: @whiteTwo;

        color: rgb(255, 218, 51);
        text-align: right;
        &:nth-of-type(1) {
          font-weight: 700;
        }
        &:nth-of-type(2) {
          font-size: 0.2rem;
        }
      }
    }
    .btn {
      flex: 0 0 1.2rem;
      width: 1.2rem;
      height: 0.52rem;
      line-height: 0.52rem;
      color: #e0ecf7;
      text-align: center;
      border-radius: 2px;
      background: rgb(42, 204, 166);
    }
  }
  &:last-child {
    .list-right {
      &::after {
        height: 0;
      }
    }
  }
}
</style>
