<template>
  <div id="celue">
    <news-header></news-header>
    <div class="celue-list">
      <div
        class="scroll__content"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="20"
      >
        <!-- <ul> -->
        <div
          class="li line05"
          @click="detail(item)"
          v-for="(item, index) in list"
          :key="index"
        >
          <!-- <li> -->
          <div class="list-left">
            <p class="title">{{ item.title }}</p>
            <p class="time">{{ item.gmtRelease }}</p>
          </div>
          <div class="list-right"><img :src="item.coverUrl" alt /></div>
          <!-- </li> -->
        </div>
        <!-- <li>
          <div class="list-left">
            <p class="title">比特币价格上涨？4项指标显示触底涨？4项指标显…</p>
            <p class="time">新华日报 2019/10/09 18:30</p>
          </div>
          <div class="list-right"></div>
        </!-->
        <!-- </ul> -->
      </div>
      <div v-if="list.length == 0 && !isloading" class="none">
        <no-data></no-data>
      </div>
      <div
        v-else-if="list.length && !isMoreData && !isloading"
        class="noDataMore"
      >
        数据已经加载完了
      </div>
      <div class="nomore" v-else>{{ $t("my.setting.text68") }}</div>
    </div>
  </div>
</template>
<script>
import newsHeader from "../../header/newsHeader";
import { mapActions } from "vuex";

export default {
  components: {
    newsHeader
  },
  data() {
    return {
      size: 10,
      pageTime: "",
      list: [],
      detailItem: null,
      isMoreData: true,
      busy: false,
      isloading: true
    };
  },
  watch: {
    $route: function() {
      this.list = [];
      // this.isMore = false
      this.isMoreData = true;
      this.pageTime = "";
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    ...mapActions({
      getnewsFlash: "system/system/getnewsFlash"
    }),
    loadMore() {
      if (!this.list || !this.list.length || this.busy) {
        return;
      }
      this.busy = true;
      this.getList(true);
    },
    detail(item) {
      sessionStorage.setItem("celueItem", JSON.stringify(item));
      this.$router.push({ path: "/newsDetail" });
    },
    getList(isMore = false) {
      let type = this.$route.query.type;
      this.isloading = true;
      console.log(type);
      this.getnewsFlash({
        size: this.size,
        pageTime: this.pageTime,
        language: "",
        type: type
      })
        .then(res => {
          if (res && res.records.length > 0) {
            console.log(res);
            if (isMore) {
              this.list = [...this.list, ...res.records];
              this.pageTime = this.list[this.list.length - 1].gmtRelease;
            } else {
              this.list = res.records;
            }
            if (res.records.length < this.size) {
              this.busy = true;
              this.isMoreData = false;
            } else {
              this.busy = false;
            }
          }
          this.isloading = false;
        })
        .catch(err => {
          console.log(err);
          this.isloading = false;
        });
    }
  },
  beforeDestroy() {
    this.busy = false;
  }
};
</script>
<style lang="less" scoped>
.celue-list {
  padding: 0.32rem 0 0 0;
  position: relative;
  height: 100%;
  .scroll__content {
    max-height: calc(~"100vh - 2rem");
    overflow-y: auto;
    overflow-x: hidden;
  }
  div.li {
    padding: 0 0.26rem 0.3rem 0.32rem;
    display: flex;
    margin-bottom: 0.3rem;
    position: relative;
    .list-left {
      flex: 1;
      margin-right: 0.32rem;

      .title {
        color: @txtColor;
        font-size: 0.32rem;
        margin-bottom: 0.12rem;
      }
      .time {
        font-size: 0.24rem;
        color: @battleshipGrey;
      }
    }
    .list-right {
      width: 2.6rem;
      height: 1.36rem;
      border-radius: 0.08rem;
      background: rgb(74, 116, 123);
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.noDataMore {
  color: #e0ecf7;
  text-align: center;
}
</style>
