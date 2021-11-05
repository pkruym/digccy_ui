<template>
  <div class="coupons no-tab show-btn">
    <div data-v-3af3f361="" class="vux-header full-header line05">
      <div class="vux-header-left" @click="closePage">
        <a class="vux-header-back"></a>
        <div class="left-arrow"></div>
      </div>
      <h1 class="vux-header-title">
        <span>{{ layType == 0 ? "红包卡券" : "手续费折扣券" }}</span>
      </h1>
    </div>
    <!-- <div class="scroll-box">
       -->
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <list
        :couponsType="type"
        :list="luckyData"
        :isHideTab="isHideTab"
        :deposit="deposit"
        @closePage="closePage"
        v-if="layType == 0"
      ></list>
      <disList
        :couponsType="type"
        :list="lotteryData"
        :isHideTab="isHideTab"
        @closePage="closePage"
        v-else
      ></disList>
    </div>
    <!-- </div> -->
    <div class="coupon-btn" @click="userLucky">
      <div class="cou-info">
        <template v-if="layType == 0">
          红包优惠 {{ getCurrentLucky ? getCurrentLucky.luckyMoney : 0 }}U
        </template>
        <template v-else>
          手续费折扣券优惠
          {{ getHandLucky ? getHandLucky.discountValue * 10 : 0 }}折
        </template>
      </div>
      <div class="btn-txt">立即使用</div>
    </div>
  </div>
</template>
<script>
import list from "./components/list";
import disList from "./components/dis-list";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    deposit: {
      type: Number,
      default: 0
    },
    layType: {
      type: Number,
      default: 0
    }
  },
  components: {
    list,
    disList
  },
  data() {
    return {
      type: 1,
      tabItem: [],
      busy: false,
      params: {
        page: 1,
        size: 20,
        type: 1
      },
      luckyData: null,
      lotteryData: null,
      isHideTab: true
      // deposit: 0
    };
  },
  computed: {
    ...mapGetters({
      getCurrentLucky: "user/getCurrentLucky",
      getHandLucky: "user/getHandLucky"
    })
  },
  // watch: {
  //   type() {
  //     this.params.type = this.type;
  //     this.getUserLuck();
  //   }
  // },
  mounted() {
    // this.type = 1;
    this.isHideTab = true;
    this.params.type = 1;
    if (this.layType == 0) {
      this.getUserLuck();
      this.lotteryData = null;
    } else {
      this.luckyData = null;
      this.getHandLuck();
    }
  },
  methods: {
    ...mapActions({
      userLuckyQuery: "user/luckyQuery",
      handLuckyQuery: "user/handLuckyQuery"
    }),
    userLucky() {
      this.closePage();
    },
    closePage() {
      this.$emit("hidenCoupons");
    },
    //加载更多
    loadMore() {
      if (this.layType == 0) {
        if (!this.luckyData || !this.luckyData.length || this.busy) {
          return;
        }
      } else {
        if (!this.lotteryData || !this.lotteryData.length || this.busy) {
          return;
        }
      }
      this.busy = true;
      let that = this;
      setTimeout(() => {
        that.params.page++;
        console.log("加载更多", that.layType);
        if (that.layType == 1) {
          that.getHandLuck(true);
        } else {
          that.getUserLuck(true);
        }
      }, 500);
    },
    getUserLuck(isMore = false) {
      this.params.checkAmount = Number(this.deposit);
      console.log("更多红包", this.params);
      this.userLuckyQuery(this.params).then(res => {
        let { records } = res;
        console.log("红包列表", records);
        if (records && records.length) {
          if (!isMore) {
            this.luckyData = records;
          } else {
            this.luckyData = [...this.luckyData, ...records];
          }
        }
        this.busy = false;
      });
    },
    getHandLuck(isMore = false) {
      this.handLuckyQuery(this.params).then(res => {
        console.log("选择手续费折扣券列表", res);
        let { records } = res;
        if (!isMore) {
          this.lotteryData = records;
        } else {
          this.lotteryData = [...this.lotteryData, ...records];
        }
        this.busy = false;
      });
    },
    onItemClick(index) {
      console.log("on item click:", index);
      this.type = index + 1;
    }
  }
};
</script>
