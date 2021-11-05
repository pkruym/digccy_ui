<template>
  <div>
    <x-header
      class="full-header"
      @on-click-back="goBack"
      :title="title"
      :left-options="{
        backText: '',
        showBack: showBack,
        preventGoBack: preventGoBack
      }"
    >
      <div slot="right"><slot name="right"></slot></div>
    </x-header>
    <div class="line05" v-show="showLine"></div>
    <div class="full-body"><slot></slot></div>
  </div>
</template>
<script>
import { XHeader } from "vux";
export default {
  props: {
    isShowHead: {
      type: Boolean,
      default: true
    },
    preventGoBack: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    showBack: {
      type: Boolean,
      default: true
    },
    showLine: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  components: {
    XHeader
  }
};
</script>

<style lang="less" scoped>
.full-header {
  background-color: @headBgColor;
  /deep/&.vux-header {
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 100;
    width: 100%;
    height: 0.88rem;
    top: constant(safe-area-inset-top);
    top: env(safe-area-inset-top);
    // .vux-header-left {
    //   float: left;
    //   left: 14px;
    //   position: relative;
    // }
    .vux-header-left {
      .left-arrow {
        &::before {
          border-color: @txtColor;
        }
      }
    }
    .vux-header-right {
      float: right;
      position: relative;
      top: -35px;
      color: @txtColor;
    }
  }
}
// .full-header {
//   height: 0.88rem;
//   &.vux-header {
//     background-color: #1c2630;
//     position: fixed;
//     left: 0px;
//     top: 0px;
//     z-index: 100;
//     width: 100%;
//     height: 40px;
//     .vux-header-title {
//       margin: 0;
//       font-size: 0.36rem;
//       color: #f6f6f6;
//       height: auto;
//       width: 100%;
//       .header {
//         font-size: 0.36rem;
//       }
//     }
//     .vux-header-left {
//       .left-arrow {
//         &::before {
//           border-color: @midnight;
//         }
//       }
//     }
//   }
// }
.full-body {
  height: 100%;
  line-height: 1;
  overflow: auto;
  padding-top: 46px;
  background: #1c2630;
}
</style>
<style lang="less">
.flex-full {
  .header {
    .header-info {
      line-height: unset;
    }
  }

  .line {
    height: 0.2rem;
    background: @darkTwo;
  }
}
</style>
