<template>
  <div class="main_page">
    <iframe
      scrolling="yes"
      id="main"
      name="main"
      frameborder="0"
      :src="config.host + '/operate/#/about'"
      style="width:100%;"
      :style="{ height: oHeight + 'px' }"
    ></iframe>
  </div>
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
  },
  mounted() {
    this.oHeight = document.body.clientHeight - 47;
  }
};
</script>
<style lang="less" scoped>
.model {
  height: 100%;
  .main_page {
    height: 100%;
    overflow: auto;
  }
}
</style>
