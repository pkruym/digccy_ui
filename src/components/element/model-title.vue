<template>
  <div class="title">
    <p class="Medium">{{ title }}</p>
    <p class="desc">{{ desc }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      defalut: ""
    },
    desc: {
      type: String,
      defalut: ""
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  padding-left: 0.4rem;
  p {
    &:nth-of-type(1) {
      color: @txtColor;
      font-size: 0.56rem;
      padding: 0.7rem 0 0 0;
      font-weight: 500;
    }
    &.desc {
      color: @blueyGrey;
      font-size: 0.28rem;
      margin-top: 0.1rem;
    }
  }
}
</style>
