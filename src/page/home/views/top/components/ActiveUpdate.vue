<template>
  <div v-transfer-dom class="active-pop">
    <x-dialog v-model="showUpdateBox" class="dialog-wrap">
      <div class="content">
        <img src="@/assets/img/2_8/update.png" alt />
        <div class="btn">系统更新中...</div>
        <!-- 我知道了 -->
        <!-- <div @click="showUpdateBox = false" class="btn">{{ $t("common.viewdetail") }}</div> -->
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
      showUpdateBox: false
    };
  },
  mounted() {

  },
  methods: {
    show() {
      this.showUpdateBox = true;
    },
    hide() {
      this.showUpdateBox = false
    }
  },
  beforeDestroy() {
    this.showScrollBox = false;
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
