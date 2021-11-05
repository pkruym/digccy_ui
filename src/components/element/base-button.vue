<template>
  <button
    class="btn"
    :disabled="disabled"
    @click="$emit('clickEvent')"
    :class="[type ? 'btn-' + type : '', size ? 'btn__' + size : '']"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "nomal"
    }
  }
};
</script>

<style lang="less" scoped>
@Orange: #ff2f0d;

.btn {
  display: inline-block;
  width: 100%;
  border: none;
  border-radius: 4px;
  overflow: hidden;
  &:disabled {
    opacity: 0.3;
  }
  &:focus {
    outline: none;
  }
  &.btn-default {
    background-color: @darkSkyBlue;
    color: @writeColor;
  }
  &.btn-time {
    // background-color: #1c2630;
    color: @blueColor;
    // border: 1px solid @darkSkyBlue;
    box-sizing: border-box;
  }
  &__nomal {
    font-size: 0.32rem;
    padding: 0.2rem;
  }
  &__mini {
    font-size: 0.28rem;
    padding: 0.16rem;
  }
  &__large {
    font-size: 0.34rem;
    padding: 0.26rem;
  }
}
</style>
