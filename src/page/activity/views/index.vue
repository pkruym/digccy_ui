<template>
  <model-full>
    <div class="header" slot="header">
      {{ $t("index.text29") }}
      <!-- <router-link
        tag="div"
        to="/activity/invitation"
        replace
        class="header-info"
        >{{ $t("index.text29") }}</router-link
      > -->
      <!-- <router-link
        tag="div"
        to="/activity/activityRules"
        replace
        class="samll-header"
        >规则</router-link
      >-->
    </div>
    <router-view></router-view>
  </model-full>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@blueyGrey: #4a747b;
.header {
  display: flex;
  .header-info {
    flex: 1;
    font-size: 0.32rem;
    color: @txtColor;
    position: relative;
    &.router-link-active {
      color: @txtColor;
    }
  }
}
.samll-header {
  position: absolute;
  right: 0.3rem;
  font-size: 0.28rem;
  color: rgb(148, 159, 172);
  top: 0.18rem;
}
</style>
