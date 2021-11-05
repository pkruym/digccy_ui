<template>
  <model-full title="用户须知以及风险提示" class="model fixd-wrap">
    <div class="main_page">
      <iframe
        scrolling="yes"
        id="main"
        name="main"
        frameborder="0"
        :src="config.host + '/buy/rules/fxts.html'"
        style="width:100%;margin-bottom:60px"
        :style="{ height: oHeight + 'px' }"
      ></iframe>
    </div>
    <!-- https://ytpfx.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=1025752&configID=43180&jid=3301842065&s=1 -->
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
  },
  mounted() {
    this.oHeight = document.body.clientHeight - 57;
  }
};
</script>
<style lang="less" scoped>
.model {
  height: 100%;
  background: @bodyBg;
  .main_page {
    height: 100%;
    overflow: hidden;
  }
}
</style>
