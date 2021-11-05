<template>
  <div id="news">
    <div
      v-show="dataList.length"
      class="scroll__content"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="20"
    >
      <template v-for="(item, index) in dataList">
        <list :key="index" :item="item" :type="2" @openMore="openMore"></list>
      </template>
    </div>
    <div v-if="dataList.length == 0" class="none"><no-data></no-data></div>
    <div v-if="dataList.length && !isMoreData" class="noDataMore">
      {{ $t("my.notice.text4") }}
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import NoData from "../components/noData";
import list from "./../components/list";
export default {
  components: {
    list,
    NoData
  },
  data() {
    return {
      dataList: [],
      size: 20,
      page: 1,
      nodata: 0,
      isLoading: true,
      noMoreData: false,
      isMoreData: true,
      busy: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    ...mapActions({
      // messageList: "user/messageList"
      noticeList: "system/system/noticeList"
    }),
    loadMore() {
      if (!this.dataList || !this.dataList.length || this.busy) {
        return;
      }
      this.busy = true;
      this.page++;
      this.getList(true);
    },
    async getList(more = false) {
      const _this = this;
      this.isLoading = true;
      let params = {
        size: _this.size,
        page: this.page
      };
      if (more) {
        params.time = new Date(
          this.dataList[this.dataList.length - 1].time
        ).getTime();
      } else {
        params.time = new Date().getTime();
      }
      await this.noticeList(params)
        .then(res => {
          console.log("params", res);
          this.nodata = res.length;
          if (more) {
            this.dataList = this.dataList.concat(res.records);
          } else {
            this.dataList = res.records;
          }

          if (res.length < this.size) {
            this.busy = true;
            this.isMoreData = false;
          } else {
            this.busy = false;
          }
        })
        .catch(err => {
          _this.$vux.toast.text(err, "middle");
        });
      if (this.dataList.length) {
        this.dataList.forEach(d => {
          this.$set(d, "isMore", false);
        });
      }
      this.isLoading = false;
    },
    openMore(item) {
      item.isMore = true;
    },
    loading() {
      if (!this.noMoreData) {
        this.page++;
        if (this.page) {
          this.getList(true);
          this.$nextTick(_ => {
            this.$refs.scrolls.donePullup();
          });
        } else {
          this.$refs.scrolls.disablePullup();
        }
      }
    },
    refresh() {
      this.page = 0;
      this.getList();
      this.$nextTick(_ => {
        if (this.size < this.totalElements) {
          this.$refs.scrolls.enablePullup();
        }
        this.$refs.scrolls.donePulldown();
      });
    }
  }
};
</script>
<style>
body .xs-plugin-pullup-container {
  color: #949fac;
}
</style>
<style lang="less" scoped>
#news {
  height: calc(~"100vh - 10px");
  .scroll__content {
    max-height: calc(~"100% - 100px");
    overflow-y: auto;
  }
  .desc {
    font-size: 0.28rem;
    color: @battleshipGrey;
    margin-top: 0.16rem;
  }
  .noDataMore {
    color: #e0ecf7;
    text-align: center;
  }
}
</style>
