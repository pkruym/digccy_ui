<template>
  <div style="height:100%;">
    <x-header class="full-header" @on-click-back="goBack" :title="title" v-if="showheader" :class="[isLine === true ? 'line05' : '']" :left-options="{
        backText: '',
        showBack: showBack,
        preventGoBack: preventGoBack
      }">
      <slot name="header"></slot>
      <div slot="right">
        <slot name="right"></slot>
      </div>
    </x-header>
    <div class="flex-full__body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { XHeader } from "vux";
export default {
  props: {
    preventGoBack: {
      type: Boolean,
      default: false
    },
    isLine: {
      type: Boolean,
      default: true
    },
    showheader: {
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
    }
  },
  methods: {
    goBack() {
      this.$emit("prev");
    }
  },
  components: {
    XHeader
  }
};
</script>

<style lang="less" scoped>
.flex-full {
  display: flex;
  flex-direction: column;
  background-color: @bodyBg;
  height: 46px;
  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    // -webkit-overflow-scrolling: touch;
  }
}
.full-header {
  /deep/&.vux-header {
    background-color: @bodyBg;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 100;
    width: 100%;
    height: 0.88rem;
    top: constant(safe-area-inset-top);
    top: env(safe-area-inset-top);
    &.line {
      border-bottom: 1px solid @lineColor;
    }
    .vux-header-title {
      margin: 0;
      padding: 0 0.8rem;
      font-size: 0.36rem;
      color: @txtColor;
      height: auto;
      width: 100%;
      // min-height: 41px;
      .header {
        font-size: 0.36rem;
      }
    }
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
      top: -30px;
      color: @txtColor;
    }
    &::after {
      content: '';
      clear: both;
    }
  }
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
