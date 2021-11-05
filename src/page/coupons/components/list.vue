<template>
  <div class="coupons-list" :class="{ page: !isHideTab }" v-if="luckyData && luckyData.length > 0">
    <template v-for="(item, index) in luckyData">
      <div class="list-item" :key="item.id" :class="{
          invalid: couponsType == 2 || couponsType == 3,
          isUsed: couponsType == 2,
          isExpired: couponsType == 3
        }" @click="itemClick(item)">
        <div class="content-coup">
          <div class="left">
            <div class="top medium">{{ item.luckyMoney }}U</div>
            <div class="bot medium" v-if="item.minLimitValue > 0">
              {{lang=='en'?'Full'+item.minLimitValue+'u available':'满'+item.minLimitValue+'可用'}}
            </div>
            <div class="bot" v-else>{{ lang=='en'?'无门槛':'No limit use'}}</div>
          </div>
          <div class="right">
            <div class="tips">
              <p class="t1">{{$t('coupons.leveContract')}}</p>
              <p class="t2 medium">{{ item.luckyMoney }}U{{$t('common.alertTitle2')}}</p>
              <p class="t3 medium">{{$t('coupons.validUntil')}}{{ item.endDay | formatTime }}</p>
              <!-- <div class="btn" v-if="couponsType == 1 && isHideTab">
                立即使用
              </div> -->
              <div v-if="couponsType != 1" class="dis-btn" :class=" {'dis-btn-en':lang=='en'}"></div>
            </div>
            <div class="guize" @click.stop="showGz(item, index)">
              <span>{{$t('coupons.table3')}}</span>
              <span class="arrow" :class="{ down: item.arrow }"></span>
            </div>
          </div>
        </div>
        <div class="info" v-show="item.arrow && item.luckyMoneyType == 1">
          <template v-if="item.luckyMoney >= 10">
            <p v-for="d in item.rules[0].split('|')">{{ d }}</p>
          </template>
          <template v-if="item.luckyMoney >= 4 && item.luckyMoney < 10">
            <p v-for="d in item.rules[1].split('|')">{{ d }}</p>
          </template>
          <template v-if="item.luckyMoney >= 2 && item.luckyMoney < 4">
            <p v-for="d in item.rules[2].split('|')">{{ d }}</p>
          </template>
          <template v-if="item.luckyMoney <= 1">
            <p v-for="d in item.rules[3].split('|')">{{ d }}</p>
          </template>
        </div>
        <div class="info" v-show="item.arrow && item.luckyMoneyType == 2">
          <template v-if="item.luckyMoney == 1">
            <p v-for="d in item.rules2[0].split('|')">{{ d }}</p>
          </template>
          <template v-if="item.luckyMoney == 2">
            <p v-for="d in item.rules2[1].split('|')">{{ d }}</p>
          </template>
          <template v-if="item.luckyMoney == 3">
            <p v-for="d in item.rules2[2].split('|')">{{ d }}</p>
          </template>
          <template v-if="item.luckyMoney == 4">
            <p v-for="d in item.rules2[3].split('|')">{{ d }}</p>
          </template>
          <template v-if="item.luckyMoney == 8">
            <p v-for="d in item.rules2[4].split('|')">{{ d }}</p>
          </template>
          <template v-if="item.luckyMoney == 12">
            <p v-for="d in item.rules2[5].split('|')">{{ d }}</p>
          </template>
        </div>
        <div class="check-icon" v-if="
            couponsType == 1 &&
              isHideTab &&
              getCurrentLucky &&
              getCurrentLucky.id == item.id
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
    },
    deposit: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      showIndexId: "",
      newData: null,
      lang: localStorage.getItem('language') || 'zh'
    };
  },
  watch: {
    list() {
      if (this.list && this.list.length > 0) {
        // let deposit = this.$route.query.deposit;
        // console.log("deposit", deposit);
        // deposit && deposit != 0 && this.selectLucky(deposit);
        this.selectLucky();
      }
    }
  },
  computed: {
    ...mapGetters({
      getCurrentLucky: "user/getCurrentLucky"
    }),
    luckyData: {
      get() {
        return this.newData || this.list;
      },
      set(v) {
        let arr = JSON.parse(JSON.stringify(v ? v : this.list));
        this.newData = arr;
      }
    }
  },
  created() {
    this.lang = localStorage.getItem('language') || 'zh'
  },
  methods: {
    ...mapMutations({
      setCurrentLucky: "user/setCurrentlucky",
      clearCurrentLucky: "user/clearCurrentLucky"
    }),
    showGz(item, idx) {
      console.log(item);
      item.arrow = !item.arrow;
    },

    itemClick(item) {
      if (this.couponsType !== 1) return;
      if (this.isHideTab) {
        if (this.getCurrentLucky) {
          console.log("ddd", this.getCurrentLucky.id, item.id);
          if (this.getCurrentLucky.id == item.id) {
            this.clearCurrentLucky();
          } else {
            this.setCurrentLucky(item);
          }
        } else {
          this.setCurrentLucky(item);
        }
        // this.$emit("closePage");
      }
    },
    selectLucky() {
      let deposit = this.deposit || 0;
      let num = Number(deposit);
      console.log(this.luckyData);
      console.log(this.isHideTab);
      let newData = [];
      if (this.luckyData && this.luckyData.length && num != -1) {
        newData = this.list.filter(
          d => num >= d.minLimitValue || d.minLimitValue <= 0.01
        );
        // console.log("newDatanewData", newData);
        // this.setCurrentLucky(
        //   !this.getCurrentLucky ? newData[0] : this.getCurrentLucky
        // );
        this.luckyData = newData;
      }
    }
  }
};
</script>
