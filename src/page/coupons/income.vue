<template>
  <ModelFull :title="$t('common.reward')" class="fixd-wrap">
    <span @click="viewDetail" slot="right">{{$t('common.Detail')}}</span>
    <!-- 我的收益 -->
    <div class="income">
      <div class="content">
        <div class="left">
          <p>{{$t('my.text2')}}(USDT)</p>
          <p class="balance">{{ isLogin ? personalMsgKey[5].value : "--" }}</p>
        </div>
        <div class="tixian">
          <div class="btn" @click="tixian">{{$t('navbar.withdrawmoney')}}</div>
        </div>
      </div>
      <div class="income-tips" v-if="lang=='en'">
        <p>Earnings description</p>
        <p>
          1. Red envelope income: Users can obtain red envelope cards and coupons through activities, and use red envelope cards and coupons to place orders, and the profits generated will go to the red envelope income account.
        </p>
        <p>
          2. If the balance is less than 100U, the order fee can only be deducted if the cash cannot be withdrawn, and the balance is more than 100U,
          You can apply for cash withdrawal, supporting both OTC and wallet cash withdrawal methods.
        </p>
        <p>3. You can view the balance income and expenditure details in the details. </p>
      </div>
      <div class="income-tips" v-else>
        <p>收益说明</p>
        <p>
          1.红包收益：用户通过活动可以获取红包卡券，使用红包卡券进行下单交易，产生的盈利将会进入红包收益账户。
        </p>
        <p>
          2.余额＜100U,不能提现只能抵扣订单手续费，余额＞100U，
          可申请提现，支持OTC和钱包提现两种方式。
        </p>
        <p>3.可在明细里查看余额收支明细。</p>
      </div>
    </div>
  </ModelFull>
</template>
<script>
import ModelFull from "element/model-full";
import { mapActions, mapGetters } from "vuex";
import busVue from "@js/bus";
export default {
  components: {
    ModelFull
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      isLogin: "user/isLogin",
      mobilephone: "user/mobilephone",
      personalMsgKey: "actual/account/personalMsgKey"
    })
  },
  data() {
    return {
      userIncomeAccount: 0,
      lang: localStorage.getItem('language') || 'zh'
    };
  },
  mounted() {
    this.getConfig();
  },
  methods: {
    ...mapActions({
      configQuery: "system/system/configQuery"
    }),
    getConfig() {
      this.configQuery().then(res => {
        if (res && res.length) {
          this.userIncomeAccount = Number(res[0].args);
        }
      });
    },
    tixian() {
      let txt = this.lang == 'en' ? `The withdrawal amount cannot be less than${this.userIncomeAccount}USDT` : `提现金额不能小于${this.userIncomeAccount}USDT`
      if (this.personalMsgKey[5].value < this.userIncomeAccount) {
        busVue.$emit("alert", {
          title: this.$t('setText.title'),
          content: txt
        });
        return;
      }
      this.$router.push({
        path: "/drawmoney/sell",
        query: {
          realAuth: this.userInfo.realAuth,
          isLuckyProfit: 1
        }
      });
    },
    viewDetail() {
      this.$router.push({
        path: "/record/fund",
        query: {
          from: "lucky"
        }
      });
    }
  }
};
</script>
