<template>
  <model-full :title="$t('activity.customerservice')" class="model">
    <div class="main_page">
      <iframe
        scrolling="yes"
        id="main"
        name="main"
        frameborder="0"
        src="https://direct.lc.chat/12188379"
        style="width:100%;margin-bottom:60px;background:#fff;"
        :style="{height: oHeight + 'px'}"
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
      oHeight: 0
    };
  },
  mounted() {
    this.oHeight = document.body.clientHeight - 57;
  }
};
</script>
<style lang="less" scoped>
.model {
  height: 100%;
  .main_page {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    height: 100%;
    overflow: hidden;
  }
}
</style>

