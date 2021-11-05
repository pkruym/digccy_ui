<template>
  <div class="shoufengqin line05" @click="zhankai">
    <div class="list-info">
      <div class="top flex" :class="{ show: show }">
        <div class="topl flex">
          <span>{{ index + 1 }}：{{ $lang=='en'?item.titleEn:item.title }}</span>
        </div>
        <div class="right-arrow"></div>
      </div>
      <div class="bottom flex" v-if="show"><p v-html="$lang=='en'?item.contentEn:item.content"></p></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      tyep: Object,
      default: {},
    },
    index: {
      tyep: Number,
      default: 0,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    zhankai() {
      this.show = !this.show;
    },
  },
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/colorWrite.less";
.shoufengqin {
  padding: 0 0.32rem;
  background: @bodyBg;
  display: flex;
  align-items: center;
  position: relative;
  .list-info {
    width: 100%;
    .top {
      justify-content: space-between;
      align-items: center;
      padding: 0.24rem 0;
      display: flex;
      justify-content: space-between;
      .right-arrow {
        position: relative;

        &::before {
          content: "";
          height: 8px;
          width: 8px;
          display: block;
          border: 2px solid @txtColor;
          border-right-width: 0;
          border-top-width: 0;
          transform: rotate(-45deg);
          position: absolute;
          bottom: -2px;
          right: 0;
        }
      }

      &.show {
        .right-arrow {
          &::before {
            border: 2px solid @txtColor;
            border-left-width: 0;
            border-bottom-width: 0;
          }
        }
      }
      .topl {
        align-items: center;
        font-size: 0.28rem;
        color: @txtColor;
        img {
          margin-right: 10px;
        }
      }
    }
  }

  .bottom {
    padding: 0.2rem 0;
    // border-top: 1px solid @battleshipGrey;
    p {
      font-size: 0.28rem;
      color: @txt2Color;
    }
    img {
      margin-right: 10px;
    }
  }
  .arrow {
    img {
      width: 0.3rem;
      height: 0.2rem;
    }
  }
  img {
    display: inline-block;
    width: 0.44rem;
    height: 0.44rem;
  }
}
</style>
