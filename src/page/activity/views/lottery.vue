<template>
  <model-full class=" fixd-wrap" title="抽奖活动">
    <lotteryMain></lotteryMain>
  </model-full>
</template>
<script>
import lotteryMain from "./lotteryMain";
export default {
  components: {
    lotteryMain
  }
};
</script>
<style lang="less" scoped>
/deep/.flex-full__body {
  background-color: #0c1f26;
}
</style>
