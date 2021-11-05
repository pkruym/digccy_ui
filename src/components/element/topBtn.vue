<template>
  <div class="btn-box">
    <div class="fixed-top-btn line05">
      <slot name="left"></slot>
      <div
        class="btn"
        @click="change(val.index)"
        v-for="val in list"
        :key="val.index"
        :class="{ active: index == val.index }"
      >
        {{ val.label }}
      </div>
    </div>
    <slot name="title"></slot>
  </div>
</template>

<script>
import i18n from "./../../lang";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      index: 0
    };
  },
  props: {
    indexKey: {
      default: 0,
      type: Number
    },
    list: {
      default: () => {
        return [
          { index: 0, label: i18n.t("leverageTrading.lever") },
          { index: 1, label: i18n.t("leverageTrading.contract") }
          // { index: 0, label: "内盘期货" },
          // { index: 2, label: "数字货币" }
        ];
      }
    }
  },
  watch: {
    index: {
      handler(to) {
        this.$emit("update:indexKey", to);
      },
      immediate: true
    },
    indexKey: {
      handler(to) {
        this.index = to;
      },
      immediate: true
    }
  },
  computed: {},
  methods: {
    change(key) {
      this.index = key;
      this.$emit("change", key);
    }
  }
};
</script>
<style lang="less" scoped>
.btn-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  background: @bodyBg;
  z-index: 2;
  top: constant(safe-area-inset-top);
  top: env(safe-area-inset-top);
  > div {
    width: 100%;
  }
  .fixed-top-btn {
    display: flex;
    height: 0.88rem;
    justify-content: center;
    align-items: center;
    position: relative;
    .left-arrow {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 8px;
      left: 8px;
      padding: 0.1rem;
      &::before {
        content: "";
        position: absolute;
        width: 12px;
        height: 12px;
        border: 2px solid @txtColor;
        border-width: 2px 0 0 2px;
        -webkit-transform: rotate(315deg);
        transform: rotate(315deg);
        top: 8px;
        left: 10px;
      }
    }
    .btn {
      min-width: 1.4rem;
      width: auto;
      height: 0.56rem;
      line-height: 0.56rem;
      text-align: center;
      border: 1px solid @blueColor;
      color: @blueColor;
      font-size: 0.28rem;
      padding: 0 0.1rem;
      &.active {
        color: @writeColor;
        border-color: @blueColor;
        background: @blueColor;
      }
    }
  }
}
</style>
