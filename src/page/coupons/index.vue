<template>
  <ModelFull :title="$t('common.redCard')" :preventGoBack="true" @prev="$router.push({ path: '/ower' })" class="coupons fixd-wrap" :class="{ 'no-tab': isHideTab }">
    <!-- 红包卡券页面 -->
    <div class="top-tab" v-if="!isHideTab">
      <tab :line-width="2" custom-bar-width="60px" default-color="#687284" active-color="#0066ED">
        <tab-item @on-item-click="tabClick" selected>{{$t('common.marginCoupon')}}</tab-item>
        <tab-item @on-item-click="tabClick">{{$t('common.discountCoupon')}}</tab-item>
      </tab>
      <div class="tab-detail">
        <div :class="currentindex == item.index ? 'active' : ''" v-for="(item, index) in usetype" :key="index" @click="onItemClick(item.index)">
          {{ item.value }}
        </div>
      </div>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <list v-if="tabVal == 0" :couponsType="type" :list="luckyData" :isHideTab="isHideTab"></list>
      <dis-list v-else :couponsType="type" :list="lotteryData" :isHideTab="isHideTab"></dis-list>
    </div>
  </ModelFull>
</template>
<script>
import ModelFull from "element/model-full";
import list from "./components/list";
import disList from "./components/dis-list";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    ModelFull,
    list,
    disList
  },
  data() {
    return {
      type: 1,
      tabVal: 0,
      tabItem: [],
      busy: false,
      params: {
        page: 1,
        size: 20,
        type: 1
      },
      currentindex: 0,
      usetype: [
        {
          index: 0,
          value: this.$t('common.Unused')
        },
        {
          index: 1,
          value: this.$t('common.Used')
        },
        {
          index: 2,
          value: this.$t('common.Expired')
        }
      ],
      luckyData: null,
      lotteryData: null, //手续费抵扣券
      isHideTab: false
    };
  },
  computed: {},
  watch: {
    type() {
      this.params.type = this.type;
      if (this.tabVal == 0) {
        this.getUserLuck();
      } else {
        this.getHandLuck();
      }
    }
  },
  mounted() {
    // this.type = this.$route.query.type || 1;
    // this.isHideTab = this.$route.query.isShowTab == 1;
    // this.params.type = this.type;
    this.clearCurrentLucky();
    this.clearHandLucky();
    this.getUserLuck();
  },
  methods: {
    ...mapActions({
      userLuckyQuery: "user/luckyQuery",
      handLuckyQuery: "user/handLuckyQuery"
    }),
    ...mapMutations({
      clearCurrentLucky: "user/clearCurrentLucky",
      clearHandLucky: "user/clearHandLucky"
    }),
    tabClick(val) {
      // value：0 红包 1手续费折扣券
      this.tabVal = val;
      this.params.page = 1;
      this.busy = false;
      if (val == 1) {
        this.getHandLuck();
        this.luckyData = null;
      } else {
        this.getUserLuck();
        this.lotteryData = null;
      }
    },
    getUserLuck(isMore = false) {
      this.userLuckyQuery(this.params).then(res => {
        let { records } = res;
        console.log("红包列表", res);
        if (records && records.length > 0) {
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
        console.log("手续费折扣券", res);
        let { records } = res;
        if (records && records.length) {
          if (!isMore) {
            this.lotteryData = records;
          } else {
            this.lotteryData = [...this.lotteryData, ...records];
          }
        }
        this.busy = false;
      });
    },
    loadMore() {
      // 滚动加载更多
      if (this.tabVal == 0) {
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
        if (that.layType == 1) {
          that.getHandLuck(true);
        } else {
          that.getUserLuck(true);
        }
      }, 500);
    },
    onItemClick(index) {
      this.currentindex = index;
      this.luckyData = [];
      this.lotteryData = [];
      console.log("on item click:", index);
      this.type = index + 1;
    }
  }
};
</script>
