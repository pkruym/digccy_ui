<template>
  <model-full class="fund-wrap fixd-wrap" :title="$t('my.fund.text19')">
    <div class="fund">
      <div class="meDetailed">
        <!-- <base-radio ref="baseSelect" :options="commonList" @radioChange="change"></base-radio> -->
        <no-data v-if="list.length < 1"></no-data>
        <Scroller class="list" ref="scrolls" height="-48px" lock-x @on-pullup-loading="loading" :scroll-bottom-offset="20" @on-pulldown-loading="refresh" :use-pullup="true" :use-pulldown="true" :pulldown-config="{
            downContent: $t('common.downContent'),
            upContent: $t('common.upContent'),
            loadingContent: $t('common.loadingContent'),
            upContent: ''
          }" :pullup-config="{
            content: '',
            upContent: '',
            downContent: '',
            loadingContent: ''
          }">
          <ul class="delList">
            <li v-for="(item, index) in list" :key="index" class="flex" @click="checkDel(item)">
              <div>
                <p class="type">
                  <!-- <span style="margin-right:10px;" v-if="item.remarks">{{item.remarks}}</span> -->
                  <span v-if="item.status == 'PENDING'">{{
                    $t("my.fund.text77")
                  }}</span>
                  <span v-if="item.status == 'NOTPASS'">{{
                    $t("my.fund.text88")
                  }}</span>
                  <span v-if="item.status == 'PROCESSING'">{{
                    $t("my.fund.text100")
                  }}</span>
                  <span v-if="item.status == 'SUCCESSFUL'">{{
                    $t("my.fund.text111")
                  }}</span>
                  <span v-if="item.status == 'FAILED'">{{
                    $t("my.fund.text122")
                  }}</span>
                </p>
                <p class="time">{{ item.applyTime || "----" }}</p>
              </div>
              <div :class="[item.amount > 0 ? 'red' : 'green']">
                {{ item.amount }}USDT
              </div>
            </li>
          </ul>
        </Scroller>
      </div>
      <router-view class="children"></router-view>
    </div>
  </model-full>
</template>
<script>
import modelFull from "element/model-full";
import { Divider, Scroller } from "vux";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import commonMixin from "./common.js";
// import baseRadio from "element/base-radio";
import { getDIYDay } from "@/assets/componentsJs/getDate30";
// import baseRadio from "element/base-select";
import Checklist from "element/base-radiolist";

export default {
  mixins: [commonMixin],
  components: {
    modelFull,
    Checklist,
    Divider,
    Scroller
    // baseRadio
  },
  data() {
    return {};
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
    }
  },
  created() {
    this.page = 1;
    this._getList();
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrolls.reset({ top: 0 });
    });
  },
  methods: {
    ...mapActions({
      withdrawQuery: "user/withdrawQuery" //获取充值记录
    }),
    _getList(more = false) {
      let that = this;
      let startTime = null;
      if (this.index != 0) {
        startTime = this.cptTime.Format("yyyy-MM-dd hh:mm:ss");
      }
      let params = {
        startTime: startTime,
        endTime: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        page: this.page,
        size: this.size,
        isWithdrawPath: true
        // commodityNo: commodityNo,
        // contractNo: contractNo
      };
      this.withdrawQuery(params)
        .then(res => {
          console.log("提币记录", res);
          this.totalpage = res.total;
          if (more) {
            this.list = [...this.list, ...res.records];
          } else {
            this.list = res.records;
          }
        })
        .catch(err => {
          this.$vux.toast.text(err, "middle");
        });
    },
    refresh() {
      this.page = 1;
      this._getList();
      // .then(_ => {
      this.$nextTick(_ => {
        if (this.list.length < this.totalpage) {
          this.$refs.scrolls.enablePullup();
        }
        this.$refs.scrolls.donePulldown();
      });

      // });
    },
    loading() {
      this.page++;
      if (this.list.length < this.totalpage) {
        this._getList(true);
        this.$nextTick(_ => {
          this.$refs.scrolls.donePullup();
        });
      } else {
        this.$refs.scrolls.disablePullup();
      }
    },
    goBack() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: "/ower" });
      }
    },
    checkDel(item) {
      sessionStorage.setItem("billDel", JSON.stringify(item));
      this.$router.push({ path: "/putrecord/putrecordbill" });
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
  display: flex;
  flex-direction: column;
  height: 100%;
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
    padding: 5px 0;
    justify-content: space-around;
    border-bottom: 1px solid #151e26;
  }
  .delList {
    li {
      background: @bodyBg;
      justify-content: space-between;
      padding: 0.3rem;
      align-items: center;
      border-bottom: 1px solid @lineColor;
      .amount {
        font-size: 0.24rem;
        color: #949fac;
      }
      div {
        .type {
          span {
            font-size: 0.28rem;
            color: @txtColor;
          }
        }
        .time {
          font-size: 0.24rem;
          color: @txt2Color;
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
