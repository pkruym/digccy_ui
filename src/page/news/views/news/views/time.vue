<template>
  <div class="news-main">
    <base-time class="base-time"></base-time>
    <scroller
      ref="scrolls"
      lock-x
      @on-pullup-loading="loading"
      @on-pulldown-loading="refresh"
      :use-pullup="true"
      :use-pulldown="true"
    >
      <base-time-line>
        <base-time-item v-for="item in list" :key="item.id">
          <div class="header" slot="header">
            <i class="ygw ygw-shizhong"></i> {{ item.createTime }}
          </div>
          {{ item.content }}
        </base-time-item>
      </base-time-line>
    </scroller>
  </div>
</template>
<script>
import { Scroller, Divider, Spinner, LoadMore } from "vux";
import BaseTime from "../components/base-time";
import BaseTimeLine from "../components/base-timeline";
import BaseTimeItem from "../components/base-timeline-item";
export default {
  components: {
    BaseTime,
    BaseTimeLine,
    BaseTimeItem,
    Scroller,
    Divider,
    LoadMore,
    Spinner
  },
  data() {
    return {
      list: [],
      allLoaded: false,
      page: 0,
      size: 20,
      list: [],
      total: 0
    };
  },
  created() {
    this.loadMore();
  },
  methods: {
    loadMore() {
      this.$axios
        .get(
          "/tactics/crawler/informationData?page=" +
            this.page +
            "&size=" +
            this.size
        )
        .then(res => {
          this.total = Math.ceil(res.data.total / this.size);
          const data = res.data.data.map(x => ({
            createTime: x.createTime,
            content: x.content,
            id: x.id
          }));
          if (this.page === 0) {
            this.list = data;
          } else {
            this.list = [...this.list, ...data];
          }
          // this.allLoaded = false;
          this.$refs.scrolls.donePullup();
          this.$refs.scrolls.donePulldown();
        });
    },
    loading() {
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
<style lang="less" scoped>
.news-main {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #f7f7f7;
  padding-top: 0.3rem;
  position: relative;
  .base-time {
    position: fixed;
    top: 1.1rem;
    right: 0.3rem;
    z-index: 9999;
  }
}

.ygw.ygw-shizhong {
  font-size: 0.2rem;
}
</style>
