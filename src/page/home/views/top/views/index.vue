<template>
  <div class="top-mian-box">
    <!-- class="top-mian__main" -->
    <div ref="box">
      <!-- <div v-if="isdownload" class="download-box">
        <div class="download-text">
          <div class="text-left">
            <img src="@/assets/img/ic_launcher-web@2x.png" />
          </div>
          <div class="text-right">
            <span>{{ $t("index.send58") }}</span>
            <span>{{ $t("index.downApp") }}</span>
          </div>
        </div>
        <div class="download-btn" @click="getAppPath">
          {{ $t("index.clickDownLoad") }}
        </div>
        <div class="close-download" @click="isdownload = false">
          <img src="@/assets/img/icon_home_h5_x@2x.png" />
        </div>
      </div> -->
      <div class="flex header">
        <img class="logo" @click="toquickintroduction" :src="require('@img/icon_home_logo@2x.png')" />
        <div @click="kefu" class="icon">
          <img :src="require('@/assets/img/2_3/icon_home_kefu@2x.png')" />
          <!-- <span>{{ $t("index.help") }}</span> -->
        </div>
      </div>
      <div class="banner-box">
        <swiper v-if="bannerList && bannerList.length > 0" :options="swiperOption" ref="mySwiper" class="swi">
          <swiper-slide v-for="(item, index) in bannerList" :key="index">
            <img :src="$lang == 'en' ? item.imgUrlEnglish : item.imgUrl" v-if="index == 0 || index == bannerList.length - 1" class="banner" />
            <img v-else v-lazy="{
                src: $lang == 'en' ? item.imgUrlEnglish : item.imgUrl,
                error: require('@/assets/img/2_0/img_sy_banner@2x.png'),
                loading: require('@/assets/img/2_0/img_sy_banner@2x.png')
              }" :key="index" class="banner" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <img v-else src="@/assets/img/2_0/img_sy_banner@2x.png" alt class="banner" />
      </div>
      <div class="notice-recommend">
        <Notice ref="notice" :noticeList="jiaoyiList"></Notice>
        <!-- <Details :list="getListByAppRecommend"></Details> -->
      </div>
      <div class="line10"></div>
      <Tab></Tab>
      <!-- 充值活动 -->
      <!-- <avtivity></avtivity> -->
      <recommend></recommend>
    </div>
    <!-- 活动弹窗 -->
    <Active ref="activeDialog"></Active>
    <!-- 锁屏 -->
    <!-- <ActiveUpdate ref="ActiveUpdate"></ActiveUpdate> -->
    <ActiveImg ref="ActiveImg"></ActiveImg>
    <!-- 首页公告弹窗 -->
    <updateNotice ref="updateNotice"></updateNotice>
    <!-- 抽奖提醒 -->
    <lotteryPop ref="lotteryPop"></lotteryPop>
  </div>
</template>

<script>
import Notice from "./../components/notice";
import Tab from "./../components/Tab";
import recommend from "./../components/recommend";
import avtivity from "./../components/avtivity";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Hot from "@/components/homeHot/hot";
import Active from "./../components/Active";
// import ActiveUpdate from "./../components/ActiveUpdate";
import updateNotice from "./../components/updateNotice";
import ActiveImg from "./../components/ActiveImg";
import { Popup } from "vux";
import { Storage } from "@/assets/js/localstorage";
import { mapState, mapGetters, mapActions } from "vuex";
import lotteryPop from "@/components/lotteryPop";
import utils from "@/utils.js";
let vm = null; // 全局vue对象
export default {
  name: 'home',
  components: {
    Notice,
    Hot,
    recommend, // 推荐合约
    Popup,
    Active,
    // ActiveUpdate, //锁屏
    Tab,
    avtivity,
    swiper,
    swiperSlide,
    ActiveImg,
    updateNotice,
    lotteryPop
  },
  computed: {
    ...mapState(["notice"]),
    ...mapGetters({
      getNoticeUri: "user/getNoticeUri",
      getListByMarketType: "contractInfo/getListByMarketType",
      getListByAppRecommend: "contractInfo/getListByAppRecommend"
    })
  },
  data() {
    return {
      // isdownload: false,
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
          bulletClass: "bullet-class", //设置小圆点的类名,包括下面的当前页面导航器的类名，用来写css样式，注意，这段css一定要引在，swiper实例创建之前，通常用import引入,图片可以考虑用base64方式写入！！！！！！！！！！
          bulletActiveClass: "bullet-active-class"
        },
        on: {
          click: function () {
            // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
            console.log("Swiper", this); // -> Swiper
            // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
            const realIndex = this.realIndex;
            vm.handleClickSlide(realIndex);
          }
        }
      },

      jiaoyiList: [],
      noticeList: [],
      urlImage: localStorage.getItem("imageUrl"),
      bannerList: [],
      // timer1: "",
      page: -1,
      size: 8,
      url: "/buyRecord/tradeDynamic",
      // 2.0新增
      isDownScroll: false
    };
  },
  created() {
    // var u = navigator.userAgent;
    // var app = navigator.appVersion;
    // this.isdownload = !this.openInWebview();
    vm = this;
  },
  mounted() {
    let orgcode = this.$route.query.orgCode || this.$route.query.orgcode;
    if (orgcode) {
      sessionStorage.setItem("orgCode", orgcode);
    }
    setTimeout(t => {
      this.getbanner();
    }, 2000)
    this.gettradelist();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.path == "/home") {
        vm.$refs.ActiveImg.show();
        //活动弹窗
        // vm.$refs.activeDialog.showDialog();
        // 首页弹窗公告
        vm.$refs.updateNotice.show()
        //锁屏
        // vm.$refs.ActiveUpdate.show()
        //判断是否有交易弹出提示框
        vm.checkIsTrade();
      } else {
        vm.$refs.ActiveImg.hide();
        vm.$refs.updateNotice.hide();
      }
    });
  },
  methods: {
    ...mapActions({
      banners: "system/system/getbanner",
      tradelist: "system/system/tradelist",
      getUrlImage: "system/system/getUrlImage",
      getvestApp: "system/system/getvestApp",
      getLotteryCount: "user/lotteryCount"
    }),
    //是否有交易，弹窗提醒
    checkIsTrade() {
      this.getLotteryCount().then(res => {
        console.log("获取当前交易额和抽奖数", res);
        if (res.code || res.totalCount == 0 || res.remainCount == 0) return;
        // 当前抽奖信息 totalMargin当前交易额
        let { remainCount, totalCount, lotteryCount, totalMargin } = res;
        let tips = "",
          num = 0;
        if (remainCount == 0) {
          utils.setLocalStorageAndTime("remainCount", remainCount);
          return;
        } else {
          let _total = utils.getLocalStorageAndTime("totalMargin") || 0; // 缓存交易金额
          let count = utils.getLocalStorageAndTime("remainCount") || 0; // 缓存抽奖次数
          if (count == totalCount || _total == totalMargin) return;
          if (count == 0) {
            num = remainCount;
          } else {
            if (lotteryCount == 0) {
              num = remainCount - count;
            } else {
              if (remainCount == 1) {
                num = 1;
              } else if (count != remainCount) {
                num = remainCount;
              } else {
                return;
              }
            }
            if (num == 0) return;
          }
          utils.setLocalStorageAndTime("remainCount", remainCount);
          utils.setLocalStorageAndTime("totalMargin", totalMargin);
          tips = `恭喜您完成交易，获得${num}张抽奖券，最高可抽取5折手续费折扣券`;
          let winData = {
            isHomeTip: true,
            tips
          };

          this.$refs.lotteryPop.showPop(winData);
        }
      });
    },
    openInWebview() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        // 微信浏览器判断
        return false;
      } else if (ua.match(/QQ/i) == "qq") {
        // QQ浏览器判断
        return false;
      } else if (ua.match(/WeiBo/i) == "weibo") {
        return false;
      } else {
        if (ua.match(/Android/i) != null) {
          return ua.match(/browser/i) == null;
        } else if (ua.match(/iPhone/i) != null) {
          return ua.match(/safari/i) == null;
        } else {
          return ua.match(/macintosh/i) == null && ua.match(/windows/i) == null;
        }
      }
    },
    getAppPath() {
      let params = {
        symbol: "huobi"
      };
      this.getvestApp(params).then(res => {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/Android/i) != null) {
          window.location.href = res.androidDownload;
        } else if (ua.match(/iPhone/i) != null) {
          window.location.href = res.appstoreDownload;
        }
      });
    },
    getImgPath() {

    },
    toquickintroduction() {
      this.$router.push("/noviceAbout");
    },
    handleClickSlide(index) {
      let item = this.bannerList[index];
      console.log(this.bannerList);
      console.log("当前点击url：", item.skipUrl);
      item.skipUrl && this.$router.push(item.skipUrl); // window.open(item.skipUrl, "_self");
    },
    gettradelist() {
      this.tradelist()
        .then(res => {
          this.jiaoyiList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getbanner() {
      await this.banners()
        .then(res => {
          console.log(res);
          console.log(3333);
          if (res && res.length > 0) {
            this.urlImage = localStorage.getItem("imageUrl");
            res.forEach(item => {
              item.imgUrl = this.urlImage + item.imgUrl;
              item.imgUrlEnglish = this.urlImage + item.imgUrlEnglish;
            });
          }
          this.bannerList = res;
        })
        .catch(err => { });
    },
    seeMore() {
      this.onHide();
      this.$router.push("/notice/news");
    },
    handleScroll() {
      var scrollTop =
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageXOffset;
      if (scrollTop < 100) {
        this.isDownScroll = false;
      } else {
        this.isDownScroll = true;
      }
    },
    kefu() {
      if (window.appInterface) {
        window.appInterface.goToBrowser("https://direct.lc.chat/12188379");
      } else {
        this.$router.push({
          path: "/service"
        });
      }
      // window.location.href = "https://direct.lc.chat/12188379";
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang="less" scoped>
@import '~@/assets/css/font2Standard.less';
/deep/ .bullet-class {
  width: 0.3rem;
  height: 0.04rem;
  display: inline-block;
  background: #ffffff;
  opacity: 0.5;
}
/deep/ .bullet-active-class {
  opacity: 0.8;
}

.swi {
  width: 100%;
  padding: 0 !important;
}
.download-box {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 500;
  display: flex;
  .download-text {
    flex: 1;
    display: flex;
    justify-content: left;
    align-items: center;
    background: #c7e3ff;
    height: 60px;
    .text-left {
      img {
        height: 35px;
        width: 35px;
        margin: 13px 6.5px 13px 20.5px;
      }
    }
    .text-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      :first-child {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #fb5e41;
        text-align: center;
      }
      :last-child {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #14181f;
      }
    }
  }
  .close-download {
    position: fixed;
    top: 2px;
    right: 2px;
    z-index: 501;
    img {
      height: 15px;
      width: 15px;
    }
  }
  .download-btn {
    width: 118px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    background: #2d60e0;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #fefffe;
    text-align: center;
  }
}
.banner-box {
  // overflow: hidden;
  margin-top: 0.96rem;
  .banner {
    width: 6.9rem;
    height: 2.6rem;
    object-fit: cover;
    border-radius: 10px;
    margin: 0 auto;
  }
}

.notice-recommend {
  display: flex;
  align-items: center;
  padding: 0 0.3rem;
  height: 0.88rem;
}

.pingzhong {
  border-bottom: 0.2rem solid rgb(248, 249, 253);
  background-color: #21303d;
  margin: 0 0.3rem;
  border-bottom: 1px solid @darkTwo;
  section {
    padding: 0 0.32rem;
  }
  .pingzhong-header {
    padding: 0.3rem;
    font-size: 0.32rem;
    position: relative;
    align-items: center;
    color: @whiteTwo;
    border-bottom: 1px solid @darkTwo;
    > i {
      display: block;
      width: 0.35rem;
      height: 0.4rem;
      background: url('~@/assets/img/2_0/icon_home_phb_nor.svg') no-repeat
        center;
      background-size: cover;
      margin-right: 0.108rem;
    }
    div {
      position: absolute;
      top: 0.3rem;
      right: 0.36rem;
      font-size: 0;
      span {
        font-size: 0.28rem;
        color: #e0ecf7;
        vertical-align: middle;
      }
      img {
        vertical-align: middle;
        display: inline-block;
        height: 0.24rem;
        margin: 0.08rem;
      }
    }
  }
}
.promotion {
  border-top: 0.2rem solid rgb(248, 249, 253);
  border-bottom: 0.2rem solid rgb(248, 249, 253);
  position: relative;
  .promotion-content {
    position: absolute;
    max-width: 3.6rem;
    height: 0.9rem;
    top: 50%;
    left: 46%;
    transform: translate(-50%, -50%);
    font-size: 0.28rem;

    .top {
      margin: 0;
      line-height: 0.4rem;
      margin-bottom: 0.1rem;
      color: @brightYellow;
    }

    .bottom {
      margin: 0;
      line-height: 0.4rem;
      color: #e0ecf7;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 1.828rem;
    margin: 0.08rem auto 0.072rem;
  }
}
.tab-content {
  background: #fff;
}
.vx-popup {
  height: 400px;
  background: none;
  top: 50%;
  margin: 0 auto;
  margin-top: -3.4rem;
  overflow: initial !important;
  & > div {
    width: 80%;
    margin: 0 auto;
    position: relative;
    .vx-top {
      text-align: center;
      color: rgb(249, 249, 249);
      .face {
        height: 1.7rem;
        position: relative;
        border-radius: 100%;

        img {
          position: absolute;
          transform: translateY(-60%);
          width: 100%;
          top: 0;
          left: 0;
          // width: 100%;
        }
      }
    }
    .vx-number {
      padding: 0.8rem 0.72rem 0.4rem 0.72rem;
      text-align: center;
      border-radius: 4px;
      background: #fff;
      .vx-code {
        font-size: 0.36rem;
        color: rgb(111, 111, 111);
        margin-bottom: 0.7rem;
        max-height: 1.38rem;
        overflow-y: scroll;
      }
      .copy-btn {
        width: 4rem;
        height: 0.88rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.4rem;
        color: #e0ecf7;
        border-radius: 4px;
        background: linear-gradient(
          to left,
          rgb(250, 48, 46),
          rgb(250, 100, 54)
        );
        margin: 0 auto;
        box-shadow: 0 2px 4px 0 rgba(101, 149, 255, 0.5);
      }
    }
    .vx-hide {
      width: 2px;
      height: 1.22rem;
      background: #fff;
      margin: 0 auto;
      position: relative;
      .close {
        position: absolute;
        bottom: -0.84rem;
        width: 0.84rem;
        height: 0.84rem;
        background: url('~@/assets/img/tc-shengji-quxiao2x.png') no-repeat;
        background-size: 0.84rem 0.84rem;
        left: 50%;
        margin-left: -0.42rem;
      }
    }
  }
}
.top-mian-box {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 1rem;
  // background: #171e25;

  > div {
    height: 100%;
    overflow-y: scroll;
  }
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 0.88rem;
    z-index: 100;
    padding: 0 0.3rem;
    display: flex;
    background: @bodyBg;
    justify-content: space-between;
    align-items: center;
    top: constant(safe-area-inset-top);
    top: env(safe-area-inset-top);
    .logo {
      width: 2.08rem;
      height: 0.52rem;
    }
    .icon {
      display: flex;
      justify-content: center;
      justify-items: center;
      img {
        width: 0.52rem;
        height: 0.48rem;
      }
      span {
        font-size: 12px;
        text-align: center;
        margin: auto 0 auto 0.1rem;
      }
    }
    .name {
      flex: 1;
      text-align: left;
      font-size: 18px;
      font-weight: 500;
      color: #d5e0ef;
    }
  }
}
</style>
