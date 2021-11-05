<template>
	<div class="button">
		<button :disabled="disabled">{{text}}</button>
	</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>

.button {
  // width: 100%;
  // position: fixed;
  // bottom: 0;
  // left: 0;
  padding: 0 .6rem;
  button {
    height: 1rem;
    width: 100%;
    background: @darkSkyBlue;
    color: #e0ecf7;
    border: none;
    letter-spacing: 8px;
    font-size: 0.32rem;
    &:disabled {
      opacity: 0.3;
    }
  }
}
</style>