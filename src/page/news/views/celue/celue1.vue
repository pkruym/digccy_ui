<template>
  <div class="background nooverflowx">
    <div id="text"></div>
    <news-header class="ding"></news-header>
    <div class="padding"></div>
    <noData v-if="celueList.length <=0"></noData>
    <div class="box" v-for="(item, index) in celueList" :key="index" @click="tapNum(item.id)">
      <div class="top">
        <div class="touxiang">
          <img
            style="width:100%;height:100%"
            :src="item.headImg?item.headImg:'@/assets/img/2_1img/sy-gsgs-touxiangzhanwei@2x'"
            alt
          />
        </div>
        <div class="nikeName">{{item.author}}</div>
        <div class="time">{{shijiancha(item.gmtCreate)}}</div>
      </div>
      <div class="main pl">
        <div
          class="font"
          :class="{'height':!item.flag, 'font-mb':!item.flag2}"
          v-html="item.content"
        ></div>
        <div @click="unfold(item)" class="font-btn" v-show="item.flag2">{{item.flag?'收起':'展开'}}</div>
        <div class="img">
          <img :src="item.contentImg" alt />
        </div>
      </div>
      <div class="bot">
        <div class="zuijin">
          最近买入：
          <span class="zi">{{item.symbol + item.contractNo}}</span>
        </div>
        <div class="look">
          <!--<img style="width:.38rem;height:.32rem;display:inline-block; vertical-align:top;" src="@/assets/img/dl-show@2x.png" alt="">-->
          {{item.clickFollowNum}}阅读
        </div>
        <div class="qujiaoyi" @click="qujiaoyi(item.symbol, item.id)">去交易</div>
      </div>
    </div>
    <div class="padding2"></div>
  </div>
</template>

<script>
import newsHeader from "../../header/newsHeader";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import busVue from "@/assets/js/bus";
export default {
  components: {
    newsHeader
  },
  data() {
    return {
      celueList: [],
      page: 0,
      pageNum: 0,
      urlImage: localStorage.getItem("imageUrl")
    };
  },
  created() {
    // this.scoket();
  },
  watch: {
    celueList() {
      let dom = document.getElementById("text");
      String.prototype.visualLength = function(size, family) {
        var height = 0;
        dom.style.fontSize = size || "inherit";
        dom.style.fontFamily = family || "inherit";
        dom.innerHTML = this;
        height = dom.offsetHeight;
        dom.innerHTML = "";
        return height;
      };
      for (let i in this.celueList) {
        if (this.celueList[i].content.visualLength(".3rem") / 50 < 1.36) {
          this.celueList[i].flag2 = false;
        } else {
          this.celueList[i].flag2 = true;
        }
      }
    }
  },
  mounted() {
    const _this = this;
    this.getstrateg();
    window.addEventListener("scroll", function() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight == scrollHeight) {
        _this.page++;
        if (_this.page > _this.pageNum) {
          _this.page--;
          return;
        }
        // _this.scoket();
      }
    });
  },
  methods: {
    ...mapActions({
      getstrategyList: "system/system/getstrategyList",
      getstrategyCount: "system/system/getstrategyCount"
    }),
    getstrateg() {
      this.getstrategyList()
        .then(res => {
          for (let i in res) {
            res[i].flag = false;
            res[i].index = i;
            res[i].contentImg = this.urlImage + res[i].contentImg;
            res[i].headImg = this.urlImage + res[i].headImg;
          }
          this.celueList = res;
          console.log("getstrategyList", res);
        })
        .catch(res => {
          console.log(res);
        });
    },

    scoket() {
      this.scoketApi.sendSock(
        {
          moduleId: 20,
          cmdId: 1,
          data: {
            page: this.page,
            size: 10
          }
        },
        res => {
          this.pageNum = res.result.totalPages;
          if (res.result.content.length != 0) {
            for (let i in res.result.content) {
              res.result.content[i].flag = false;
              res.result.content[i].index = i;
              if (
                this.celueList.slice(-res.result.content.length) !=
                res.result.content
              ) {
                this.celueList.push(res.result.content[i]);
              }
            }
          } else {
            if (this.page == 0) {
              return;
            } else if (this.page > 1) {
              this.page--;
              return;
            }
          }
        }
      );
    },
    tapNum(id) {
      this.scoketApi.sendSock({
        moduleId: 20,
        cmdId: 2,
        data: {
          robotId: id
        }
      });
    },
    qujiaoyi(s, c, i) {
      // this.$router.push({path: `/stock/stock-line?commodityNo=${s}&contractNo=${c}&id=${i}`})
      this.$router.push({ path: `/stock/stock-line?symbol=${s}` });
      this.getstrategyCount(i);

      busVue.$emit("selectContract", {
        symbol: s
      });
    },
    shijiancha(time) {
      // 计算相差天数
      const now = new Date(time.replace(/-/g, "/"));
      let diff = "";
      const time_diff = new Date().getTime() - now;
      let days = Math.floor(time_diff / (24 * 3600 * 1000));
      if (days > 0) {
        diff += days + "天";
      } else if (days > 2) {
        return time;
      }
      // 计算相差小时数
      let leave1 = time_diff % (24 * 3600 * 1000);
      let hours = Math.floor(leave1 / (3600 * 1000));
      if (hours > 0) {
        diff += hours + "小时";
      } else {
        if (diff !== "") {
          diff += hours + "小时";
        }
      }
      // 计算相差分钟数
      let leave2 = leave1 % (3600 * 1000);
      let minutes = Math.floor(leave2 / (60 * 1000));
      if (minutes > 0) {
        diff += minutes + "分钟";
      } else {
        if (diff !== "") {
          diff += minutes + "分钟";
        }
      }
      if (diff == "") {
        diff = "当";
      }
      return diff + "前";
    },
    unfold(e) {
      this.celueList[e.index].flag = !this.celueList[e.index].flag;
    }
  }
};
</script>

<style lang="less" scope>
.nooverflowx {
  overflow-x: hidden;
}

#text {
  position: absolute;
  visibility: hidden;
  // white-space: nowrap;
  word-wrap: break-word;
  // width: 5.9rem;
  z-index: -100;
}
.background {
  background-color: #151e26;
  padding-top: 0.9rem;
  .padding2 {
    padding-bottom: 0.95rem;
  }
  .ding {
    position: fixed !important;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .padding {
    height: 0.1rem;
  }
  .box {
    padding: 0.2rem 0.3rem 0.24rem;
    border-bottom: #f8f9fd 1px solid;
    background-color: #e0ecf7;
  }
}
.top {
  margin-bottom: 0.24rem;
  position: relative;
  .touxiang {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .nikeName {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .time {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #adb3c1;
    font-size: 0.24rem;
  }
}
.pl,
.bot {
  /*padding-left: 1rem;*/
}
.main {
  .font {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.28rem;
    margin-bottom: 0rem;
    p {
      word-wrap: break-word;
    }
  }

  .font-mb {
    margin-bottom: 0.24rem;
  }
  .height {
    max-height: 1.31rem;
  }
  .font-btn {
    color: #4672ed;
    margin-bottom: 0.24rem;
  }
  .img {
    width: 100%;
    margin-bottom: 0.24rem;
    img {
      max-width: 100%;
      max-height: 5rem;
    }
  }
}
.bot {
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    // display: inline-block;
    font-size: 0.24rem !important;
  }
  .zuijin {
    // margin-right: 0.6rem;
    .zi {
      font-size: 0.24rem !important;
      display: inline-block;
      box-sizing: content-box;
      padding: 0.1rem 0rem;
      color: #4672ed;
      border-radius: 0.1rem;
    }
  }
  .zuijin,
  .look {
    color: #adb3c1;
  }
  .look::before {
    box-sizing: content-box;
    width: 0.4rem;
    height: 0.4rem;
  }
  .qujiaoyi {
    padding: 0 0.16rem;
    border-radius: 0.1rem;
    color: #e0ecf7;
    background-color: #4672ed;
  }
}
</style>
