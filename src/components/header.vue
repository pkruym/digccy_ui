<template>
  <header class="header">
    <img src="@/assets/img/copy@2x.png" alt="" @click="goBack" class="arrow" />
    <slot></slot>
  </header>
</template>
<script>
export default {
  methods: {
    goBack() {
      if (window.history.length > 2) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 0.9rem;
  background: @frenchBlue;
  .arrow {
    width: 0.25rem;
    height: 0.5rem;
    position: absolute;
    left: 0.4rem;
    top: 0.2rem;
  }
  .add {
    position: absolute;
    right: 0.4rem;
    top: 0.26rem;
    width: 0.46rem;
    height: 0.46rem;
  }
  p {
    text-align: center;
    color: #e0ecf7;
    font-size: 0.4rem;
    line-height: 0.9rem;
  }
}
</style>
