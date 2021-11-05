<template>
  <div class="main_page">
    <iframe
      scrolling="yes"
      id="main"
      name="main"
      frameborder="0"
      :src="config.host + '/operate/#/activityRules'"
      style="width:100%;"
      :style="{ height: oHeight + 'px' }"
    ></iframe>
  </div>
  <!-- https://ytpfx.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=1025752&configID=43180&jid=3301842065&s=1 -->
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
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
