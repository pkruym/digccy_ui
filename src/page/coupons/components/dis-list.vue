<template>
  <div class="coupons-list" :class="{ page: !isHideTab }" v-if="list && list.length > 0">
    <template v-for="(item, index) in list">
      <div class="list-item" :key="item.id" :class="{
          invalid: couponsType == 2 || couponsType == 3,
          isUsed: couponsType == 2,
          isExpired: couponsType == 3
        }" @click="itemClick(item)">
        <div class="content-coup discount">
          <div class="left">
            <div class="top medium">
              {{ item.discountValue * 10 }}<span class="sm">{{$t('coupons.fold')}}</span>
            </div>
            <div class="bot" v-else>
              {{ lang=='en'?'无门槛':'No limit use'}}</div>
          </div>
          <div class="right">
            <div class="tips">
              <p class="t1">{{$t('coupons.leveContract')}}</p>
              <p class="t2 medium">{{$t('common.discountCoupon')}}</p>
              <p class="t3 medium">{{$t('coupons.validUntil')}}{{ item.endDay | formatTime }}</p>
              <div v-if="couponsType != 1" class="dis-btn"></div>
            </div>
            <!-- <div class="guize" @click.stop="showGz(item, index)">
              <span>使用规则</span>
              <span class="arrow" :class="{ down: item.arrow }"></span>
            </div> -->
          </div>
        </div>
        <div class="check-icon" v-if="
            couponsType == 1 &&
              isHideTab &&
              getHandLucky &&
              getHandLucky.id == item.id
          "></div>
      </div>
    </template>
  </div>
  <div class="noData" v-else>
    <img src="@/assets/img/2_7/icon_coupon_no@2x.png" alt="" />
    <p>{{$t('common.noCoupon')}}</p>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    isHideTab: {
      type: Boolean,
      default: false
    },
    couponsType: {
      type: Number,
      default: 1
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      showIndexId: "",
      newData: null,
      lang: localStorage.getItem('language') || 'zh'
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      getHandLucky: "user/getHandLucky"
    })
    // luckyData: {
    //   get() {
    //     return this.newData || this.list;
    //   },
    //   set(v) {
    //     let arr = JSON.parse(JSON.stringify(v ? v : this.list));
    //     this.newData = arr;
    //   }
    // }
  },
  created() {
    this.lang = localStorage.getItem('language') || 'zh'
  },
  methods: {
    ...mapMutations({
      setHandLucky: "user/setHandLucky",
      clearHandLucky: "user/clearHandLucky"
    }),
    showGz(item, idx) {
      console.log(item);
      item.arrow = !item.arrow;
    },

    itemClick(item) {
      if (this.couponsType !== 1) return;
      if (this.isHideTab) {
        if (this.getHandLucky) {
          console.log("ddd", this.getHandLucky.id, item.id);
          if (this.getHandLucky.id == item.id) {
            this.clearHandLucky();
          } else {
            this.setHandLucky(item);
          }
        } else {
          this.setHandLucky(item);
        }
      }
    }
  }
};
</script>
