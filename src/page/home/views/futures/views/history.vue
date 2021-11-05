<template>
  <div class="history-body fixd-wrap">
    <topBtn
      class="btn-bbb"
      :list="btnList"
      @change="changeBtn"
      :indexKey="indexKey"
      slot="header"
    >
      <div class="left-arrow" slot="left" @click="$router.push(upRouter)"></div>
    </topBtn>
    <div class="main-t title line05">
      <div class="mind r-line" @click="_click(0)">
        <span>{{ offset }}</span> <i></i>
      </div>
      <div class="last" :class="{ 'r-line': indexKey == 1 }" @click="_click(1)">
        <span>{{ orderPriceType }}</span> <i></i>
      </div>
      <div class="head" v-show="indexKey == 1" @click="_click(2)">
        <span>{{ state }}</span> <i></i>
      </div>
    </div>
    <div class="line6"></div>
    <div
      class="homeHot"
      ref="homeHot"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <div class="main1 order-main" v-if="dataList.length > 0">
        <div class="scroller-box order-list">
          <!-- <orderBox :indexKey="indexKey" :order="dataList"></orderBox> -->
          <list-comp :list="dataList" :indexKey="indexKey"></list-comp>
        </div>
      </div>
      <div v-if="dataList.length == 0 && !isloading" class="none">
        <no-data></no-data>
      </div>
      <div
        class="nomore"
        v-else-if="dataList.length && !isMoreData && !isloading"
      >
        {{ $t("news.text3") }}
      </div>
      <div class="nomore" v-else-if="isloading">{{ $t("news.text4") }}</div>
    </div>
    <bottomPopup
      :popupShow.sync="popupShow"
      :options="cptOptions"
      @click="popupClick"
    ></bottomPopup>
  </div>
</template>
<script>
import ModelFull from "element/model-full";
import { mapGetters, mapActions } from "vuex";
import { SocketAPI } from "@/assets/js/WsApi2";
import listComp from "../components/history-list";

export default {
  components: {
    ModelFull,
    listComp
  },
  data() {
    return {
      currentdiskType: "actual",
      scrollsMontend: true,
      indexKey: 0,
      optionIndex: 0,
      popupShow: false,
      state: this.$t("futures.history.text1"),
      stateValue: ["DELETED", "PARTDELETED", "FINISHED"],
      offset: this.$t("futures.history.text2"),
      offsetValue: null,
      orderPriceType: this.$t("futures.history.text3"),
      orderPriceTypeValue: null,

      currentPage: 1,
      size: 15,
      totalCount: 0,
      dataList: [],

      isMoreData: true,
      busy: false,
      oHeight: "",
      isloading: true,

      btnList: [
        { index: 0, label: this.$t("futures.history.text4") },
        { index: 1, label: this.$t("futures.history.text5") }
      ],

      offsetOptions: [
        { id: null, label: this.$t("futures.history.text6"), isChecked: false },
        {
          id: "OPEN",
          label: this.$t("futures.history.text7"),
          isChecked: false
        },
        {
          id: "CLOSE",
          label: this.$t("futures.history.text8"),
          isChecked: false
        }
      ],
      orderPriceTypeOptions: [
        { id: null, label: this.$t("futures.history.text6"), isChecked: false },
        {
          id: "MARKET",
          label: this.$t("futures.history.text9"),
          isChecked: false
        },
        {
          id: "LIMIT",
          label: this.$t("futures.history.text10"),
          isChecked: false
        }
      ],
      stateOptions: [
        {
          id: ["DELETED", "PARTDELETED", "FINISHED"],
          label: this.$t("futures.history.text6"),
          isChecked: false
        },
        {
          id: ["FINISHED"],
          label: this.$t("futures.history.text11"),
          isChecked: false
        },
        {
          id: ["DELETED"],
          label: this.$t("futures.history.text13"),
          isChecked: false
        }
      ],
      upRouter: {
        path: "",
        query: {}
      }
    };
  },
  computed: {
    ...mapGetters({
      getListByMarketType: "contractInfo/getListByMarketType",
      getContractInfo: "contractInfo/getContractInfo"
    }),
    cptState() {},
    cptOptions() {
      let arr = [];
      let index = this.optionIndex;
      if (index == 0) {
        arr = this.offsetOptions;
      } else if (index == 1) {
        arr = this.orderPriceTypeOptions;
      } else if (index == 2) {
        arr = this.stateOptions;
      }

      return arr;
    },
    cptList() {
      let arr = [];
      return arr;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(from);
      vm.upRouter.path = from.path;
      vm.upRouter.query = from.query;
    });
  },
  created() {
    this.currentdiskType = this.$diskinfo.type;
  },
  methods: {
    ...mapActions({
      queryOrderCount: "actual/order/queryOrderCount",
      queryTradeCount: "actual/traderecord/queryTradeCount",
      getPositionList: "actual/position/list",
      getOrderList: "actual/order/list",
      list: "actual/traderecord/list" //平仓和成交
    }),
    param() {
      let param = {
        start: "2018-01-01 00:00:00",
        end: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        commodityNo: null,
        contractNo: null,
        page: this.currentPage,
        size: this.size,
        tradeType: this.$tradeType.tradeType,
        priceType: this.orderPriceTypeValue,
        offset: this.offsetValue
      };

      return param;
    },
    changeBtn(key) {
      this.currentPage = 1;
      this._list(key);
      this.$nextTick(() => {
        this.$refs.homeHot.scrollTop = 0;
      });
    },
    refresh() {
      this.currentPage = 1;
      this._list(this.indexKey);
    },
    // loading() {
    //   if (this.dataList.length < this.totalCount) {
    //     this.currentPage += 1;
    //     this._list(this.indexKey, true);
    //   } else {
    //     if (this.$refs.scrolls) {
    //       this.$nextTick(_ => {
    //         this.$refs.scrolls.donePullup();
    //       });
    //     }
    //   }
    // },
    loadMore() {
      if (!this.dataList || !this.dataList.length || this.busy) {
        return;
      }
      console.log("加载更多");
      this.busy = true;
      this.currentPage += 1;
      this._list(this.indexKey, true);
    },
    _list(key, more = false) {
      this.indexKey = key;
      let _this = this;
      _this.isloading = true;
      let param = this.param();
      if (key == 0) {
        Promise.all([this.list({ param })])
          .then(res => {
            console.log("listlistlistlistlistlist", res);
            if (more) {
              this.dataList = [...this.dataList, ...res[0].records];
            } else {
              this.dataList = res[0].records;
            }
            _this.totalCount = res[0].total;
            _this.isloading = false;
          })
          .catch(err => {
            _this.isloading = false;
          });
      } else {
        param.status = this.stateValue;
        Promise.all([
          SocketAPI.request("/" + this.currentdiskType + "/order/list", param)
        ])
          .then(res => {
            console.log("历史委托订单", res);
            for (let i = 0; i < res[0].records.length; i++) {
              let node = _this.getContractInfo(res[0].records[i]);
              res[0].records[i].contractName = node.contractName;
              res[0].records[i].name = node.name;
              res[0].records[i].nameEnglish = node.nameEnglish;
              res[0].records[i].margin = res[0].records[i].margin; //保证金
              res[0].records[i].DIYVolume =
                res[0].records[i].volume - res[0].records[i].tradeVolume;
            }
            if (more) {
              _this.dataList = [..._this.dataList, ...res[0].records];
            } else {
              _this.dataList = res[0].records;
            }
            _this.totalCount = res[0].total;

            _this.isloading = false;
          })
          .catch(e => {
            // _this.errFun(e);
            _this.isloading = false;
          });
      }
      if (
        _this.dataList.length > 0 &&
        _this.dataList.length === _this.totalCount
      ) {
        this.busy = true;
        this.isMoreData = false;
      } else {
        this.busy = false;
        this.isMoreData = true;
      }
    },
    _click(index) {
      this.optionIndex = index;
      this.popupShow = !this.popupShow;
    },
    popupClick(key) {
      let arr = this.cptOptions;
      this.currentPage = 1;
      arr.forEach(item => {
        item.isChecked = false;
      });
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == key) {
          arr[i].isChecked = true;
          switch (this.optionIndex) {
            case 0:
              this.offset = arr[i].label;
              this.offsetValue = key;
              break;
            case 1:
              this.orderPriceType = arr[i].label;
              this.orderPriceTypeValue = key;
              break;
            case 2:
              this.state = arr[i].label;
              this.stateValue = key;
              break;
            default:
              break;
          }
          break;
        }
      }
      this._list(this.indexKey);
      this.popupShow = false;
    }
  },
  activated() {},

  mounted() {
    let _this = this;
    this._list(this.indexKey);
  }
};
</script>

<style lang="less" scoped>
.history-body {
  height: 100%;
  /deep/.vux-header .vux-header-title {
    margin: 0 66px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nomore {
    text-align: center;
    color: #949fac;
    margin-bottom: 0.3rem;
  }
  .noDataMore {
    color: #e0ecf7;
    text-align: center;
  }
  .btn-box {
    // height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40px;
  }

  .homeHot {
    overflow-y: auto;
    max-height: calc(~"100vh - 2rem");
    position: relative;
    padding-bottom: 2rem;
  }
  .header {
    width: 100%;
    height: 0.94rem;
    font-size: 0.36rem;
    color: rgb(36, 48, 73);
    line-height: 0.94rem;
    text-align: center;
    position: fixed;
    top: 0;
    background: #fff;
    z-index: 99;
  }
  /deep/ .scroller {
    color: #949fac !important;
  }
  .main-t {
    position: relative;
    &.title {
      padding: 0 0.3rem;
      display: flex;
      height: 0.56rem;
      align-items: center;
      width: 100%;
      z-index: 100;
      div {
        flex: 1;
        height: 100%;
        font-size: 0.24rem;
        line-height: 1;
        color: @txtColor;
        justify-content: center;
        display: flex;
        align-items: center;
        i {
          display: block;
          width: 0.186rem;
          height: 0.106rem;
          position: relative;
          &::after {
            content: "";
            height: 0.1rem;
            width: 0.1rem;
            display: block;
            border: 1px solid @txt2Color;
            border-right-width: 0;
            border-top-width: 0;
            transform: rotate(-45deg);
            position: absolute;
            top: -1px;
            left: 6px;
          }
        }
      }
    }
    .mind,
    .last {
      position: relative;
      &.r-line {
        &::after {
          content: " ";
          position: absolute;
          right: 0;
          top: 0;
          width: 1px;
          height: 100%;
          border-right: 1px solid #e8ecef;
          transform-origin: 0 0;
          transform: scaleX(0.5);
        }
      }
    }
  }
}
</style>
