<template>
  <!-- 更新公告 -->
  <div v-transfer-dom class="active-pop">
    <x-dialog v-model="showIndexAlert" class="dialog-wrap">
      <div class="content update-notice">
        <!-- <img @click="to" v-if="lang == 'zh'" src="@/assets/img/2_7/img_home_tchd@2x.png" alt />
        <img v-else src="@/assets/img/2_7/img_home_tc_en@2x.png" alt /> -->
        <div class="dialog-head">
          <h2>{{title}}</h2>
        </div>
        <div class="info" v-html="contentHtml"></div>
        <div @click="to" class="btn">我知道了</div>
      </div>
      <div class="close" @click="showIndexAlert = false">
        <img src="@/assets/img/2_7/icon_d@2x.png" alt="" />
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { XDialog } from "vux";
export default {
  components: {
    XDialog
  },
  data() {
    return {
      showIndexAlert: false,
      contentHtml: '',
      lang: localStorage.getItem("language") || "zh"
    };
  },
  methods: {
    ...mapActions({
      noticeIndex: 'system/system/noticeIndex'
    }),
    show() {
      this.getData()
    },
    hide() {
      this.showIndexAlert = false
    },
    getData() {
      this.noticeIndex().then(res => {
        if (res) {
          let lang = localStorage.getItem("language") || "zh"
          let gmtstrTime = res.gmtUpdate.replace(/[-|(\s*)]/g, '').replace(/:/g, '')
          let cachVal = localStorage.getItem('UPDATENOTICE') || ''
          if (gmtstrTime == cachVal) return //如果相等,就不弹出了
          if (lang == 'zh') {
            this.contentHtml = res.content
            this.title = res.title
          } else {
            this.contentHtml = res.contentEnglish
            this.title = res.titleEnglish
          }
          localStorage.setItem('UPDATENOTICE', gmtstrTime)
          this.showIndexAlert = true
        } else {
          localStorage.removeItem('UPDATENOTICE')
        }
      })
    },
    to(type) {
      this.showIndexAlert = false;
    }
  },
  beforeDestroy() {
    this.showIndexAlert = false;
  }
};
</script>
<style lang="less" scoped>
.active-pop {
  .dialog-wrap {
    /deep/.weui-dialog {
      padding: 0;
      width: 5.9rem;
    }
    .content {
      position: relative;
      &.update-notice {
        background-color: @writeColor;
        min-height: 5.6rem;
        height: auto;
        overflow: hidden;
        border-radius: 6px;
        .dialog-head {
          position: relative;
          height: 2.48rem;
          width: 100%;
          background: url('~@/assets/img/2_8/img_home_tc_bg@2x.png') no-repeat;
          background-size: cover;
          display: flex;
          justify-content: center;
          h2 {
            font-size: 18px;
            margin-top: 1.6rem;
          }
        }
        .info {
          // margin-top: 0.3rem;
          text-align: left;
          height: auto;
          padding: 0 0.3rem;
          padding-bottom: 1.4rem;
          word-wrap: break-word;
          white-space: normal;
          word-break: break-all;
          p {
            text-indent: 2em;
          }
        }
      }
      img {
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
  }
  /deep/ .weui-dialog {
    background: transparent;
    &::before {
      background: transparent;
    }
  }
}
</style>
