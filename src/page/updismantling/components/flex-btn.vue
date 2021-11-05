<template>
  <div class="flex-btn">
    <div class="reset" @click="$emit('reset')" v-if="isResrt">
      {{ $t("futures.text15") }}
    </div>
    <div class="save" @click="$emit('save')">{{ $t("futures.text16") }}</div>
  </div>
</template>
<script>
export default {
  props: {
    isResrt: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.flex-btn {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 1.38rem;
  background: @bodyBg;
  line-height: 1.38rem;
  display: flex;
  & > div {
    flex: 0.8;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    width: 3rem;
    top: 0.24rem;
    &.reset {
      background: #1c2630;
      border: 1px solid @blueColor;
      width: 3rem;
      margin: auto 0.16rem auto 0.32rem;
      color: @blueColor;
    }
    &.save {
      background: @blueColor;
      flex: 1;
      margin: auto 0.32rem auto 0.16rem;
      color: @writeColor;
    }
  }
}
</style>
