<template>
  <!-- <model-full :showBack="false" title="资讯"> -->
  <div class="main_page1">
    <news-header></news-header>
    <!--
    <Scroller
      ref="scrolls"
      lock-x
      height="100%"
      @on-pullup-loading="loading"
      @on-pulldown-loading="refresh"
      :use-pullup="true"
      :use-pulldown="true"
      :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新',loadingContent:'加载中'}"
      :pullup-config="{upContent: '',downContent: '',loadingContent:''}"
    > -->
    <div class="box">
      <div
        class="scroll__content"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="20"
      >
        <div class="li" v-for="(item, index) in cptDataList" :key="index">
          <div class="time-day" v-show="index <= 1">
            {{ index == 0 ? "今天" : index == 1 ? "昨天" : "" }}
            {{ item.strDayRelease }}
          </div>
          <div
            class="list-info line05"
            v-for="(info, index) in item.list"
            :key="index"
          >
            <div class="time">{{ info.strTimeRelease }}</div>
            <div class="title">{{ info.title }}</div>
            <div class="content">{{ info.content }}</div>
          </div>
        </div>
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
      <div class="nomore" v-else-if="isloading">加载中……</div>

      <!-- <ul class="box" v-else>
          <li class="libox" v-for="(val,index) in cptDataList" :key="val.id">
            <div class="flex time-title">
              <label v-show="index<=1">{{index == 0 ? '今天' : index == 1 ? '昨天' : ''}}</label>
              <time>{{_timeData(val.strDayRelease)}}</time>
            </div>
            <Timeline class="Timeline" :singleContent="false" :placement="'left'" :list="val.list"></Timeline>
          </li>
          <div v-show="isMore">
            <i @click="_newsFlash(isMore)" class="more btn"></i>
          </div>
        </ul>-->
    </div>
    <!-- </Scroller> -->
  </div>
</template>
<script>
import ModelFull from "element/model-full";
import newsHeader from "../../../header/newsHeader";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

export default {
  components: {
    newsHeader
  },
  data() {
    return {
      size: 20,
      pageTime: "",
      list: [],
      today: new Date().Format("yyyy-MM-dd"),
      isMoreData: true,
      busy: false,
      isloading: true
    };
  },
  computed: {
    cptDataList() {
      let _list = this.list;
      let o = [];
      let indexArr = [];
      if (_list.length != 0) {
        o.push({
          strDayRelease: _list[0].strDayRelease,
          id: 0
        });
        indexArr = [0];
      }
      for (let i = 1; i < _list.length; i++) {
        if (_list[i].strDayRelease != _list[i - 1].strDayRelease) {
          indexArr.push(i);
          o.push({
            strDayRelease: _list[i].strDayRelease,
            id: i
          });
        }
      }

      for (let g = 0; g < o.length; g++) {
        o[g].list = _list.slice(indexArr[g], indexArr[g + 1]);
      }
      console.log(o);
      return o;
    }
  },
  methods: {
    ...mapActions({
      getnewsFlash: "system/system/getnewsFlash"
    }),
    _timeData(str) {
      str = str + "";
      return `${parseInt(str.split("-")[1])}月${parseInt(str.split("-")[2])}号`;
    },
    loadMore() {
      if (!this.list || !this.list.length || this.busy) {
        return;
      }
      this.busy = true;
      this.getnewslist(true);
    },
    getnewslist(more = false) {
      this.isloading = true;
      this.getnewsFlash({
        size: this.size,
        pageTime: this.pageTime,
        language: "",
        type: "DIGICCY_FLASH_NEWS"
      })
        .then(res => {
          if (more) {
            this.list = [...this.list, ...res.records];
            let cptDataList = this.cptDataList;
            this.pageTime =
              cptDataList[cptDataList.length - 1].list[
                cptDataList[cptDataList.length - 1].list.length - 1
              ].gmtRelease;
          } else {
            this.list = res.records;
          }
          if (res.records.length < this.size) {
            this.busy = true;
            this.isMoreData = false;
          } else {
            this.busy = false;
          }
          this.isloading = false;
        })
        .catch(err => {
          console.log(err);
          this.isloading = false;
        });
    }
    // loading() {
    //   this.getnewslist(true);
    // }
  },
  mounted() {
    this.getnewslist();
    // function calcPageHeight(doc) {
    //   console.log("doc", doc);
    //   var cHeight = Math.max(
    //     doc.body.clientHeight,
    //     doc.documentElement.clientHeight
    //   );
    //   var sHeight = Math.max(
    //     doc.body.scrollHeight,
    //     doc.documentElement.scrollHeight
    //   );
    //   var height = Math.max(cHeight, sHeight);
    //   return height;
    // }
    // //根据ID获取iframe对象
    // var ifr = document.getElementById("main");
    // console.log("ifr", ifr);
    // ifr.onload = function() {
    //   //解决打开高度太高的页面后再打开高度较小页面滚动条不收缩
    //   ifr.style.height = "0px";
    //   var iDoc = ifr.contentDocument || ifr.document;
    //   var height = calcPageHeight(iDoc);
    //   if (height < 1050) {
    //     height = 1050;
    //   }
    //   ifr.style.height = height + "px";
    // };
  },
  beforeDestroy() {
    this.busy = false;
  }
};
</script>

<style lang="less" scoped>
.main_page {
  // overflow: hidden !important;
}
.box {
  padding: 0.02rem 0.3rem;
  // -webkit-overflow-scrolling: touch;
  position: relative;
  height: 100%;
  .scroll__content {
    // max-height: 600px;
    max-height: calc(~"100vh - 2rem");
    overflow-y: auto;
    overflow-x: hidden;
  }
  div.li {
    margin-top: 0.16rem;
    .time-day {
      font-size: 0.24rem;
      color: @txt2Color;
      margin-bottom: 0.16rem;
    }
    .list-info {
      padding: 0.08rem 0.16rem 0.2rem 0.16rem;
      background: @bodyBg;
      margin-bottom: 0.16rem;
      position: relative;
      .time {
        font-size: 0.2rem;
        color: @txtColor;
        margin-bottom: 0.2rem;
        position: relative;
        margin-left: 0.2rem;
        &::after {
          position: absolute;
          content: "";
          width: 0.1rem;
          height: 0.1rem;
          border-radius: 50%;
          box-sizing: border-box;
          border: 1px solid @blueColor;
          left: -0.2rem;
          top: 50%;
          // margin-top: -0.5rem;
          margin-top: -0.05rem;
        }
      }
      .title {
        font-size: 0.28rem;
        color: @lightBlueGreyTwo;
        margin-bottom: 0.16rem;
      }
      .content {
        color: @txtColor;
        font-size: 0.28rem;
      }
    }
  }
}
.noDataMore {
  color: #e0ecf7;
  text-align: center;
}
</style>
