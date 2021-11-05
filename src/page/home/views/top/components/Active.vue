<template>
  <div v-transfer-dom class="active-pop">
    <x-dialog v-model="showScrollBox" class="dialog-wrap">
      <div class="content">
        <img
          @click="to"
          v-if="lang == 'zh'"
          src="@/assets/img/2_7/img_home_tchd@2x.png"
          alt
        />
        <img v-else src="@/assets/img/2_7/img_home_tc_en@2x.png" alt />
        <div @click="to" class="btn">{{ $t("common.viewdetail") }}</div>
      </div>
      <div class="close" @click="showScrollBox = false">
        <img src="@/assets/img/2_7/icon_d@2x.png" alt="" />
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog } from "vux";
export default {
  components: {
    XDialog
  },
  data() {
    return {
      showScrollBox: false
      // poptimer: null,
      // lang: localStorage.getItem("language") || "zh"
    };
  },
  mounted() {
    console.log("isLoginisLogin", this.isLogin);
    let isactive = localStorage.getItem("isactive");
    if (!isactive) {
      localStorage.setItem("isactive", 1);
      this.showScrollBox = true;
    }
  },
  methods: {
    // showDialog() {
    //   if (!localStorage.getItem("isactive")) {
    //     this.showScrollBox = true;
    //     localStorage.setItem("isactive", 1);
    //   }
    //   this.startDialog();
    // },
    // startDialog() {
    //   let myDate = new Date();
    //   let mytime = myDate.getHours();
    //   if (mytime >= 10 || mytime >= 15 || mytime >= 20) {
    //     this.poptimer = setInterval(res => {
    //       let mytime2 = myDate.getSeconds();
    //       let isactive = localStorage.getItem("isactive");
    //       if (
    //         (mytime == 10 || mytime == 15 || mytime == 20) &&
    //         mytime2 > 0 &&
    //         mytime2 < 5
    //       ) {
    //         this.showScrollBox = true;
    //         localStorage.setItem("isactive", mytime);
    //       }
    //     }, 3000);
    //   } else {
    //     this.poptimer && clearInterval(this.poptimer);
    //   }
    // },
    to(type) {
      // let path = "/activityRule";
      let path = "/couponsActivity";
      this.$router.push({ path: path });
      this.showScrollBox = false;
    }
  },
  beforeDestroy() {
    this.showScrollBox = false;
    // if (localStorage.getItem("isactive")) {
    //   this.poptimer && clearInterval(this.poptimer);
    // }
  }
};
</script>
<style lang="less" scoped>
.active-pop {
  .dialog-wrap {
    /deep/.weui-dialog {
      padding: 0;
      width: 5.9rem;
      // width: 7.5rem;
      // margin: auto;
      // max-width: 7.5rem;
    }
    .content {
      position: relative;
      // margin: 0 auto;
      img {
        // margin: 0 auto;
        // width: 100%;
        width: 5.9rem;
        height: 8rem;
      }
      .btn {
        width: 5.1rem;
        height: 0.8rem;
        text-align: center;
        color: #fff;
        font-size: 15px;
        background: @activityBtnBg;
        border-radius: 5px;
        line-height: 0.8rem;
        position: absolute;
        left: 50%;
        bottom: 0.4rem;
        margin-left: -2.6rem;
      }

      // img {
      //   display: inline-block;
      // }
      // .close {
      //   position: relative;
      //   text-align: right;
      //   .img1 {
      //     width: 0.9rem;
      //     z-index: 1;
      //   }
      // }

      // .tp {
      //   text-align: center;
      //   .img2 {
      //     width: 4.2rem;
      //   }
      // }
    }
    .close {
      display: flex;
      justify-content: center;
      margin-top: 0.44rem;
      img {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
    // .foot-btn {
    //   display: flex;
    //   justify-content: space-around;
    //   align-items: center;
    //   margin-top: -10px;
    //   z-index: 2;
    //   .btn {
    //     padding: 0.2rem 0.5rem;
    //     color: #28cba5;
    //     text-align: center;
    //     border: 1px solid #28cba5;
    //     border-radius: 20px;
    //     background: rgba(40, 203, 165, 0.2);
    //     &.register {
    //       color: #e0ecf7;
    //       background: #28cba5;
    //     }
    //   }
    // }
  }
  /deep/ .weui-dialog {
    background: transparent;
    &::before {
      background: transparent;
    }
  }
}
</style>
