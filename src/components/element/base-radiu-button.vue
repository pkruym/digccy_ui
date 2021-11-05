<template>
  <button @click="$emit('clickEvent')" :disabled="disabled">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less" scoped>
button {
  width: 100%;
  height: 0.84rem;
  color: #ffffff;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.84rem;
  border: none;
  border-radius: 5px;
  background-image: linear-gradient(212deg, #368cff 8%, #0066ed 100%);
  &:disabled {
    opacity: 0.7;
  }
}
</style>
