<template>
  <model-full>
    <div class="header" slot="header">
      <router-link
        tag="div"
        to="/noviceAbout/novice"
        replace
        class="header-info"
        >{{ $t("index.text43") }}</router-link
      >
    </div>
    <router-view></router-view>
  </model-full>
</template>
<script>
import modelFull from "element/model-full";

export default {
  components: {
    modelFull
  }
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  .header-info {
    flex: 1;
    font-size: 0.36rem;
    font-weight: 400;
    color: @txtColor;
    position: relative;
    &.router-link-active {
      color: @txtColor;
    }
  }
}
</style>
