<template>
  <div class="fund">
    <div class="meDetailed">
      <template v-if="!isLucky">
        <base-radio ref="baseSelect" :options="commonList" @radioChange="change" :showCheck="false"></base-radio>
      </template>

      <!-- <Divider v-if="list.length < 1">{{ $t("common.noData") }}</Divider> -->
      <no-data v-if="list.length < 1"></no-data>
      <Scroller class="list" ref="scrolls" height="-80px" lock-x @on-pullup-loading="loading" :scroll-bottom-offset="40" @on-pulldown-loading="refresh" :use-pullup="true" :use-pulldown="true" :pulldown-config="{
          downContent: $t('common.downContent'),
          upContent: $t('common.upContent'),
          loadingContent: $t('common.loadingContent')
        }" :pullup-config="{
          content: '',
          upContent: '',
          downContent: '',
          loadingContent: ''
        }">
        <div>
          <ul class="delList">
            <li v-for="(item, index) in list" :key="index" class="flex line05" @click="checkDel(item)">
              <div>
                <p class="type">
                  <!-- <span style="margin-right:10px;" v-if="item.remarks">{{item.remarks}}</span> -->
                  <span>{{lang=='en'?item.type: item.typeDescription }}</span>
                </p>
                <p class="time">{{ item.gmtCreate || "----" }}</p>
              </div>
              <div :class="[cptAmount(item) >= 0 ? 'green' : 'red']">
                {{ cptAmount(item) > 0 ? "+" : "" }}{{ cptAmount(item) }}USDT
              </div>
            </li>
          </ul>
        </div>
      </Scroller>
      <router-view class="children"></router-view>
    </div>
  </div>
</template>
<script>
import { Checklist, Divider, Scroller } from "vux";
import { mapActions } from "vuex";
import { getDIYDay } from "@/assets/componentsJs/getDate30";
// import baseRadio from "element/base-radio";
import baseRadio from "element/base-select";
import commonMixin from "./common.js";

export default {
  mixins: [commonMixin],
  components: {
    Checklist,
    Divider,
    Scroller,
    baseRadio
  },
  data() {
    return {
      isLucky: false,
      lang: localStorage.getItem('language') || 'zh'
    };
  },
  created() {
    this.isLucky = this.$route.query.from == "lucky";
    if (this.isLucky) {
      this.getLuckyList();
    } else {
      this._getList();
    }
  },
  computed: {
    cptTime() {
      if (this.index == 0) {
        return null;
      } else if (this.index == 1) {
        return getDIYDay("monday");
      } else if (this.index == 2) {
        return getDIYDay("monthFirst");
      } else {
        return getDIYDay("halfYear");
      }
    },
    cptAmount() {
      return key => {
        if (key.creditDebit == "UNFREEZE" || key.creditDebit == "CREDIT") {
          return this.toFixedStr(key.amount);
        } else {
          return this.toFixedStr(this.accSub(0, key.amount));
        }
      };
    }
  },
  methods: {
    ...mapActions({
      flowList: "actual/account/flowList", //查询资金列表
      luckyList: "actual/account/luckyList" //查询红包收益明细列表
      // flowCount: "actual/account/flowCount"
    }),
    goBack() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: "/ower" });
      }
    },
    refresh() {
      this.page = 1;
      if (this.isLucky) {
        this.getLuckyList();
      } else {
        this._getList();
      }
      this.$nextTick(_ => {
        if (this.size < this.totalElements) {
          this.$refs.scrolls.enablePullup();
        }
        this.$refs.scrolls.donePulldown();
      });

      // });
    },
    loading() {
      this.page++;
      if (this.page < this.totalpage) {
        if (this.isLucky) {
          this.getLuckyList(true);
        } else {
          this._getList(true);
        }
        this.$nextTick(_ => {
          this.$refs.scrolls.donePullup();
        });
      } else {
        this.$refs.scrolls.disablePullup();
      }
    },
    _getList(more = false) {
      console.log(1111);
      let _this = this;
      let startTime = null;
      let endTime = null;
      if (this.index != 0) {
        startTime = this.cptTime.Format("yyyy-MM-dd hh:mm:ss");
        endTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
      }
      let params = {
        start: startTime,
        end: endTime,
        typeList: [
          "CREDIT_PROFIT",
          "DEBIT_LOSS",
          "DEBIT_OVERNIGHT_FEE",
          "DEBIT_FEE",
          "FREEZE_FEE",
          "UNFREEZE_FEE",
          "FREEZE_DEPOSIT",
          "UNFREEZE_DEPOSIT",
          "FREEZE_DEPOSIT_FEE",
          "UNFREEZE_DEPOSIT_FEE",
          "FREEZE_OVERNIGHT_DEPOSIT",
          "UNFREEZE_OVERNIGHT_DEPOSIT",
          "CREDIT_DAY_PROFIT_RANK_AWARD",
          "REAL_NAME_GIVE_CAPITAL",
          "CREDIT_UP",
          "DEBIT_DOWN",
          "CREDIT_REBATE_FEE",
          "DEBIT_WITHDRAW",
          "CREDIT_PAYMENT_MONEY",
          "CREDIT_PAYMENT_COIN",
          "DEBIT_WITHDRAW_MONEY",
          "DEBIT_WITHDRAW_COIN",
          "FREEZE_WITHDRAW_MONEY",
          "FREEZE_WITHDRAW_COIN",
          "UNFREEZE_WITHDRAW_MONEY",
          "UNFREEZE_WITHDRAW_COIN",
          // "LUCK_MONEY_MARGIN_DISCOUN",
          // "LUCK_MONEY_FEE_FREE",
          // "CASH_ACCOUNT_DEDUCTION"
        ],
        page: this.page,
        size: 15
        // commodityNo: commodityNo,
        // contractNo: contractNo
      };

      Promise.all([this.flowList(params)])
        .then(res => {
          console.log(res);
          console.log(3333);
          this.totalpage = res[0].total;
          console.log("res[0].records", res[0].records);
          if (more) {
            this.list.push(...res[0].records);
          } else {
            this.list = res[0].records;
          }
        })
        .catch(err => {
          _this.$vux.toast.text(err, "middle");
        });
    },
    getLuckyList(more = false) {
      let params = {
        page: this.page,
        size: 15
      };
      this.luckyList(params).then(res => {
        console.log("红包收益明细", res);
        this.totalpage = res.total;
        console.log("res[0].records", res.records);
        if (more) {
          this.list.push(...res.records);
        } else {
          this.list = res.records;
        }
      });
    },
    checkDel(item) {
      console.log("1233", item);
      if (this.isLucky) return;
      sessionStorage.setItem("billDel", JSON.stringify(item));

      this.$router.push({ path: "/record/fund/fundbill" });
    }
  }
};
</script>
<style lang="less" scoped>
.children {
  width: 100%;
  height: 100%;
  background: @bodyBg;
  position: fixed;
  top: 0;
  left: 0;
}
.radio {
  padding: 0.1rem 0;
}
.fund {
  background: @bodyBg;
}
/deep/.checkcontrol {
  .weui-cells {
    color: #949fac !important;
    background: #28323c !important;
  }
}
.meDetailed {
  background: @bodyBg;
  .radio {
    // background: #1c2630;
    text-align: center;
    // padding-top: 10px;
    padding-bottom: 5px;
    justify-content: space-around;
    border-bottom: 1px solid #151e26;
  }
  .list {
    background: @bodyBg;
  }
  .delList {
    li {
      background: @bodyBg;
      justify-content: space-between;
      padding: 0.3rem;
      align-items: center;
      position: relative;
      div {
        .type {
          span {
            font-size: 0.28rem;
            color: @txtColor;
          }
        }
        .time {
          font-size: 0.24rem;
          color: #687284;
          margin-top: 0.08rem;
        }
      }
    }
  }
  .header {
    background: linear-gradient(to right top, #17b2f0, #0addd9);
    height: 2.4rem;
    position: relative;
    .toptitle {
      position: relative;
      padding: 0.2rem;
      text-align: center;
      .title {
        font-size: 0.4rem;
        color: #e0ecf7;
      }
      img {
        width: 0.2rem;
        height: 0.4rem;
        position: absolute;
        top: -5px;
        left: 0;
        padding: 0.4rem;
        box-sizing: content-box;
      }
    }
    ul {
      padding: 0 0.6rem;
      li:first-child::before {
        content: '';
        position: absolute;
        display: block;
        height: 0.8rem;
        background: #fff;
        width: 2px;
        right: 0;
      }
      li {
        text-align: center;
        position: relative;
        float: left;
        width: 50%;
        padding: 0.2rem;
        color: #e0ecf7;
        p:first-child {
          font-size: 0.24rem;
        }

        p:last-child {
          font-size: 0.36rem;
        }
      }
    }
  }
}
</style>
