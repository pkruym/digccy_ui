<template>
  <div class="btn">
    <div class="cancle" @click="$emit('cancle')">{{ cancleText }}</div>
    <div class="confrim" @click="$emit('confrim')">{{ confrimText }}</div>
  </div>
</template>
<script>
import i18n from "../../lang";

export default {
  props: {
    cancleText: {
      type: String,
      default: i18n.t("common.cancle")
    },
    confrimText: {
      type: String,
      default: i18n.t("common.confrim")
    }
  }
};
</script>

<style lang="less" scoped>
.btn {
  display: flex;
  margin-top: 0.4rem;
  border-top: 1px solid @lineColor;
  & > div {
    flex: 1;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.32rem;
    // border-radius: 4px;
    &.cancle {
      // margin-right: 0.44rem;
      color: @pink2Standard;
      border-right: 1px solid @lineColor;
    }
    &.confrim {
      color: @darkSkyBlue;
      // background: @darkSkyBlue;
    }
  }
}
</style>
