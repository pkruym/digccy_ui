<template>
  <div id="tongzhi">
    <scroller
      ref="scrolls"
      height="-57px"
      @on-pullup-loading="loading"
      :scroll-bottom-offset="40"
      @on-pulldown-loading="refresh"
      :use-pullup="true"
      :use-pulldown="true"
      :pulldown-config="{
        downContent: '下拉刷新',
        upContent: '释放后更新',
        loadingContent: '加载中'
      }"
      :pullup-config="{
        upContent: cptLoadingContent,
        downContent: '释放后加载',
        loadingContent: '加载中...'
      }"
    >
      <div class="box">
        <list
          v-for="(item, index) in data"
          :key="index"
          :item="item"
          :type="1"
          @click.native="read(item)"
        >
          <div class="desc">
            <span v-html="item.content"></span>
            <span class="link" @click="toFutures(item.category)"
              >查看详情></span
            >
          </div>
        </list>
      </div>
      <div>
        <div
          id="title"
          style="width:100%;text-align:center;height:30px;ling-height:30px;margin-top:20px;"
        >
          上拉加载更多
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import list from "./../components/list";
import qs from "qs";
import { Scroller } from "vux";
import { mapActions } from "vuex";

export default {
  components: {
    list,
    Scroller
  },
  data() {
    return {
      data: [],
      size: 8,
      page: 0,

      moreState: false
    };
  },

  computed: {
    cptLoadingContent() {
      let str = "上拉加载";
      if (this.data.length == this.nodata) {
        str = "暂无数据啦";
      }
      return str;
    }
  },
  methods: {
    ...mapActions({
      noticeList: "actual/account/noticeList"
    }),
    getList(more = false) {
      const _this = this;
      let params = {
        size: _this.size
      };
      if (more) {
        params.time = new Date(this.data[this.data.length - 1].time).getTime();
        // params.time = new Date().getTime();
      } else {
        params.time = new Date().getTime();
      }

      this.noticeList(params)
        .then(res => {
          if (more) {
            let lastTime = new Date(res[res.length - 1].time).getTime();
            params.time;
            if (params.time == lastTime) {
              _this.$vux.toast.text("这会真没有了", "middle");
              return;
            } else {
              this.data = [...this.data, ...res];
            }
          } else {
            this.data = res;
          }
        })
        .catch(err => {
          _this.$vux.toast.text(err, "middle");
        });
    },

    toFutures(key) {
      console.log(key);

      let router = this.$router;
      switch (key) {
        case "POSITION":
          router.push("/position");
          break;
        case "DELETE":
          router.push("/cancel");
          break;
        case "ACCOUNT":
          router.push("/record/fund");
          break;
        case "ORDER":
          router.push("/entrust");
          break;
        case "TRADERECORD":
          router.push("/settlement");
          break;

        default:
          break;
      }
    },

    read(item) {
      const _this = this;
      const params = {
        moduleId: 2,
        cmdId: 4,
        data: {
          id: item.id
        }
      };
      this.scoketApi.sendSock(params, function(res) {
        if (res.code == "200" && res.cmdId == 4 && res.moduleId == 2) {
          var state = item.outsideMsgType;
          if (
            state === "Futures_Position" ||
            state === "Futures_EntrustPosition" ||
            state === "Futures_Warning"
          ) {
            _this.$router.push("/position");
          } else if (state === "Futures_BuyingEntrust") {
            _this.$router.push("/entrust");
          } else if (
            state === "Account_FuturesServiceFee" ||
            state === "Account_FuturesReserveFund" ||
            state === "Account_FuturesReturnReserveFund" ||
            state === "Account_FuturesOvernightDeferredFee" ||
            state === "Account_FuturesOvernightReserveFund" ||
            state === "Account_FuturesReturnOvernightReserveFund" ||
            state === "Account_FuturesLoss" ||
            state === "Account_FuturesProfit" ||
            state === "ACCOUNT_RECHARGESUCCESS" ||
            state === "ACCOUNT_WITHDRAWALSSUCCESS" ||
            state === "ACCOUNT_WITHDRAWALFAILED"
          ) {
            _this.$router.push("/record/recrecord");
          } else if (
            state === "Futures_ReachLossPoint" ||
            state === "Futures_ReachProfitPoint" ||
            state === "Futures_ApplyUnwind" ||
            state === "Futures_DayUnwind" ||
            state === "Futures_ReachStrongPoint" ||
            state === "Futures_ReachContractExpiration" ||
            state === "Futures_BuyingCanceled" ||
            state === "Futures_BuyingFailure"
          ) {
            _this.$router.push("/settlement");
          }
        } else {
          _this.$vux.alert.show({
            title: _this.$t("setText.title"),
            content: res.message
          });
        }
      });
    },
    loading() {
      this.moreState = true;
      this.getList(this.moreState);
      // .then(_ => {
      this.$nextTick(_ => {
        this.$refs.scrolls.donePullup();
      });
      // if (this.page < this.totalpage) {

      //   // });
      // } else {
      //   this.$refs.scrolls.disablePullup();
      // }
    },
    refresh() {
      this.page = 0;
      this.getList();
      // .then(_ => {
      this.$nextTick(_ => {
        if (this.size < this.totalElements) {
          this.$refs.scrolls.enablePullup();
        }
        this.$refs.scrolls.donePulldown();
      });

      // });
    }
  },

  created() {
    this.getList();

    this.$nextTick(_ => {
      if (this.size > this.totalElements) {
        this.$refs.scrolls.disablePullup();
      }
    });
  }
};
</script>
<style lang="less" scoped>
#tongzhi {
  padding: 0 0.2rem;
  .desc {
    margin-top: 0.16rem;
    font-size: 0.28rem;
    color: @battleshipGrey;
    .link {
      color: #478aff;
      font-size: 0.28rem;
    }
    span {
      /deep/ #futures {
        color: #f6f6f6;
        font-size: 0.28rem;
      }
    }
  }
  .xs-plugin-pulldown-container {
    color: #f6f6f6;
  }
}
</style>
