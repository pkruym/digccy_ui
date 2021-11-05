<template>
  <div id="moveDiv" class="active-img" v-show="showDaFc">
    <div @click="showDaFc = false">
      <img class="close-img" src="@img/2_3/icon_home_xf_close@2x.png" alt="" />
    </div>
    <div class="dafengche" @click="$router.push('/lottery')">
      <img class="fengche" src="@img/2_3/icon_home_zhuanpan@2x.png" alt="" />
      <img v-if="lang == 'zh'" class="bot" src="@img/2_3/icon_home_meirichoujiang@2x.png" alt="" />
      <img v-else class="bot" src="@img/2_3/icon_home_meirichoujiang_en@2x.png" alt="" />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      showDaFc: false,
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
      lang: localStorage.getItem("language") || "zh",
      activityStart: "",
      activityEnd: "",
      enable: true
    };
  },
  methods: {
    ...mapActions({
      queryLorrerySummer: "user/queryUserLorrerySummer"
    }),
    show() {
      setTimeout(() => {
        this.getqueryLorrerySummer()
      }, 2000)
    },
    hide() {
      this.showDaFc = false
    },
    getqueryLorrerySummer() {
      this.queryLorrerySummer().then(res => {
        console.log("获取交易活动", res);
        let { activityStart, activityEnd, enable } = res;
        this.activityStart = activityStart;
        this.activityEnd = activityEnd;
        this.enable = enable
        this.showDaFc = this.isShowLottery()
      });
    },
    isShowLottery() {
      if (this.activityEnd) {
        if (!this.enable) { return false }
        else {
          const fomat = this.$options.filters['formatTime']
          const activityEnd = Number(fomat(this.activityEnd, "yyyyMMdd"))
          const currentTime = Number(fomat(new Date(), "yyyyMMdd"))
          return activityEnd >= currentTime
        }
      }
      return false
    },
    // 实现移动端拖拽
    down() {
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = moveDiv.offsetLeft;
      this.dy = moveDiv.offsetTop;
    },
    move() {
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;

        moveDiv.style.left = this.xPum + "px";
        moveDiv.style.top = this.yPum + "px";
        //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
        document.addEventListener(
          "touchmove",
          function () {
            event.preventDefault();
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    }
  }
};
</script>
<style lang="less" scoped>
.active-img {
  position: fixed;
  right: 0.3rem;
  bottom: 90px;
  width: 1.34rem;
  height: 1.74rem !important;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  .dafengche {
    width: 1.34rem;
    height: 1.3rem;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    .fengche {
      width: 0.92rem;
      height: 0.9rem;
      margin-bottom: -0.2rem;
      animation: turn 1.2s linear infinite;
    }
    .bot {
      width: 1.38rem;
      height: 0.6rem;
      z-index: 1;
    }
  }
  > div {
    display: flex;
    justify-content: flex-end;
    height: 0.24rem;
    .close-img {
      width: 0.24rem;
      height: 0.24rem;
    }
  }
}
@keyframes turn {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
