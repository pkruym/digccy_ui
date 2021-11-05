<template>
  <div class="btn">
    <div class="cancle" @click="$emit('cancle')">{{ cancleText }}</div>
    <div class="confrim" @click="$emit('confrim')">{{ confrimText }}</div>
  </div>
</template>
<script>
export default {
  props: {
    cancleText: {
      type: String,
      default: this.$t("common.cancle")
    },
    confrimText: {
      type: String,
      default: this.$t("common.confrim")
    }
  }
};
</script>

<style lang="less" scoped>
.btn {
  display: flex;
  margin-top: 0.48rem;
  & > div {
    flex: 1;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.32rem;
    border-radius: 4px;
    &.cancle {
      margin-right: 0.44rem;
      color: @darkSkyBlue;
      border: 1px solid @darkSkyBlue;
      background: #fff;
    }
    &.confrim {
      color: #e0ecf7;
      background: @darkSkyBlue;
    }
  }
}
</style>
