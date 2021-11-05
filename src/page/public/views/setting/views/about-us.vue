<template>
  <model-full title="关于我们" class="model fixd-wrap">
    <div class="main_page">
      <iframe scrolling="yes" id="main" name="main" frameborder="0"  :src="config.host+'/operate/#/about'" style="width:100%;height:100%;"></iframe>
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
  .main_page {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    width: 100%;
    height: 100%;
  }
}
</style>

