<template>
  <div class="sect">
    <div class="fund-wrap">
      <div class="lavel" @click.stop="isShowCheck = !isShowCheck">
        {{ selectValue }}<i class="icons"></i>
      </div>
      <div class="poup-box" :class="{ open: isShowCheck }">
        <template v-for="(item, i) in options">
          <div class="box" @click="clickEvent(item)">
            <span>{{ item.value }}</span>
            <span class="icon" :class="{ 'is-checked': item.checked }">
              <i class="icon-ok" v-if="item.checked"></i>
            </span>
          </div>
        </template>
      </div>
    </div>
    <div class="mask" :class="{ open: isShowCheck }" @click="maskClcik"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowCheck: false
    };
  },
  props: {
    options: {
      type: [Array, Object]
    }
  },
  computed: {
    selectValue() {
      return this.options.find(d => d.checked).value;
    }
  },
  created() {
    document
      .getElementsByTagName("body")[0]
      .addEventListener("click", this.bodyClickEvent, false);
  },
  beforeDestroy() {
    document
      .getElementsByTagName("body")[0]
      .removeEventListener("click", this.bodyClickEvent, false);
  },
  methods: {
    bodyClickEvent(e) {
      let dom = e.target;
      let nodeClassName = dom.parentNode ? dom.parentNode.className || "" : "";
      if (nodeClassName !== "lavel" && this.isShowCheck) {
        this.isShowCheck = false;
      }
    },
    clickEvent(item) {
      this.$emit("radioChange", item);
    },
    maskClcik() {
      this.isShowCheck = false;
    }
  }
};
</script>
<style lang="less" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(21, 30, 38, 0.6);
  z-index: 5;
  display: none;
  &.open {
    display: block;
  }
}
.fund-wrap {
  position: relative;
  height: 0.6rem;
  z-index: 7;
  .lavel {
    text-align: left;
    line-height: 0.6rem;
    color: @txtColor;
    padding: 0 0.32rem;
    z-index: 7;
    .icons {
      display: inline-block;
      position: relative;
      width: 5px;
      height: 8px;
      &::before {
        content: "";
        height: 0;
        width: 0;
        display: block;
        border: 6px transparent solid;
        border-bottom-width: 0;
        border-top-color: @txt2Color;
        position: absolute;
        top: 0px;
        left: 5px;
      }
    }
  }
  .poup-box {
    position: absolute;
    width: 100%;
    height: 0rem;
    top: 0.6rem;
    left: 0;
    background: @bodyBg;
    transition: height 0.3s;
    z-index: 1;
    overflow: hidden;
    &.open {
      height: 4rem;
    }
    .box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: @txtColor;
      height: 1rem;
      border-bottom: 1px solid @lineColor;
      padding: 0 0.32rem;
      span {
        flex: 1;
        &.icon {
          width: 0.5rem;
          text-align: right;
        }
      }
    }
  }
}
</style>
