<template>
  <model-full title="公告中心" class="model">
    <div class="main_page">
      <iframe
        scrolling="yes"
        id="main"
        name="main"
        frameborder="0"
        :src="config.host + '/operate/#/notice'"
        style="min-height:1250px;width:100%;height:100%;margin-bottom:60px"
      ></iframe>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
export default {
  components: {
    ModelFull
  },
  data() {
    return {
      config,
      oHeight: 0
    };
  }
};
</script>
<style lang="less" scoped>
.model {
  height: 100%;
  background: @bodyBg;
  .main_page {
    height: 100%;
    background: @bodyBg;
    // overflow: auto;
    -webkit-overflow-scrolling: touch; /*看这里*/
  }
}
</style>
