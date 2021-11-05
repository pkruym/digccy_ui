<template>
  <div class="news-main">
    <scroller
      ref="scrolls"
      lock-x
      @on-pullup-loading="loading"
      @on-pulldown-loading="refresh"
      :use-pullup="pullup"
      :use-pulldown="pullDown"
    >
      <div>
        <div style="height: 1px;"></div>
        <panel :list="list" :type="type"></panel>
      </div>
    </scroller>
  </div>
</template>
<script>
import { Panel, Scroller, Divider, Spinner, LoadMore } from "vux";
export default {
  components: {
    Panel,
    Scroller,
    Divider,
    LoadMore,
    Spinner
  },
  data() {
    return {
      type: "1",
      detailUrl: "/news", // 详情页路由
      allLoaded: false,
      page: 0,
      size: 20,
      list: [],
      total: 0,
      pullup: true,
      pullDown: true
    };
  },
  created() {
    this.loadMore();
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.scrolls.reset();
    });
  },
  methods: {
    loadMore() {
      this.$axios
        .get(
          "/tactics/crawler/importantNews?page=" +
            this.page +
            "&size=" +
            this.size
        )
        .then(({ data: { data } }) => {
          this.total = Math.ceil(data.totalElements / this.size);
          let message = data.map(item => {
            return {
              src: item.coverUrl,
              title: item.title,
              desc: item.createTime,
              id: item.id,
              url: this.detailUrl + "?delId=" + item.id
            };
          });
          if (this.page === 0) {
            this.list = message;
          } else {
            this.list = [...this.list, ...message];
          }
          this.$refs.scrolls.donePullup();
          this.$refs.scrolls.donePulldown();
        });
    },
    loading() {
      // console.log("加载");
      this.page++;
      this.loadMore();
    },
    refresh() {
      this.page = 0;
      this.loadMore();
    }
  }
};
</script>
<style lang="less">
.news-main {
  .weui-panel {
    .weui-media-box_appmsg {
      align-items: flex-start;
    }
    .weui-media-box__hd {
      width: 2rem;
      height: auto;
    }
    .weui-media-box__title {
      white-space: normal;
      font-size: 0.2rem;
    }
    .weui-media-box__desc {
      font-size: 0.2rem;
      color: rgb(173, 179, 193);
      margin-top: 0.1rem;
      text-align: right;
    }
  }
}
</style>
<style lang="less" scoped>
.news-main {
  min-height: 10px;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #f7f7f7;
}
</style>
