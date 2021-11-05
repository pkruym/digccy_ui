<template>
  <div class="details" v-if="list&&list.length">
    <swiper :options="swiper" class="container">
      <swiper-slide v-for="(item, index) in list" :key="index+'tg'">
        <div class="details-info" @click="bgo(item)">
          <p>{{item.tradeType!=='FUTURE'?item.symbol:item.name}}</p>

          <p :class="[item.upDropSpeed > 0 ? 'green' : 'red']">
            {{ item.close }}
          </p>
          <div class="bottomprice">
            <p :class="[item.upDropPrice > 0 ? 'green' : 'red']">
              {{ item.upDropPrice }}
            </p>
            <p :class="[item.upDropSpeed > 0 ? 'green' : 'red']">
              {{ item.upDropSpeed }}%
            </p>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
import busVue from "@/assets/js/bus";

export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      dataList: [],
      tabArray: [1, 2],
      now: 0,
      swiper: {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  created() { },
  methods: {
    tabClick(index) {
      this.now = index;
    },
    bgo(item) {

      this.$router.push({
        name: "stock-line",
        query: { symbol: item.symbol }
      });
      // console.log("加载合约K线");
      busVue.$emit("selectContract", {
        symbol: item.symbol
      });
    }
  }
};
</script>

<style lang="less" scoped>
.details {
  // padding: 0.1rem 0.2rem !important;
  // padding: 0.32rem 0.24rem 0.2rem !important;
  height: 2rem;
  box-sizing: border-box;
  padding: 0.32rem 0.32rem 0.58rem;
  background: linear-gradient(
    to right bottom,
    rgb(47, 64, 78),
    rgb(21, 30, 38)
  );
  position: relative;
  border-radius: 4px;
  .details-info {
    flex: 1;
    color: #949fac;
    text-align: center;
    > p {
      font-size: 0.22rem;
      line-height: 0.4rem;
      text-align: center;
      &:nth-of-type(2) {
        text-align: center;
        font-size: 0.36rem;
        font-weight: bold;
      }
    }
    .bottomprice {
      display: flex;
      p {
        // margin: 0 0.05rem;
        flex: 1;
        font-size: 0.2rem;
        line-height: 0.4rem;
      }
    }
  }
  .tab-details {
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    p {
      float: left;
      width: 0.3rem;
      height: 2px;
      background: @silver;
      &.active {
        background: @darkBlueGrey;
      }
      &:nth-of-type(1) {
        margin-right: 0.4rem;
      }
    }
  }

  .swiper-pagination {
    bottom: 0;
  }

  .container {
    height: 1.4rem;
    left: 0;
    width: 100%;
    /deep/.swiper-pagination-bullet {
      border-radius: 0;
    }
  }
}
</style>
