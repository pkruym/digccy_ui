<template>
  <model-full title="公告中心" class="model">
    <div class="main_page">
      <iframe
        scrolling="yes"
        id="main"
        name="main"
        frameborder="0"
        :src="getNoticeUri"
        style="width:100%;height:100%"
      ></iframe>
    </div>
    <!-- https://ytpfx.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=1025752&configID=43180&jid=3301842065&s=1 -->
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import { mapGetters } from "vuex";
export default {
  components: {
    ModelFull
  },
  data() {
    return {
      oHeight: 0
    };
  },
  computed: {
    ...mapGetters({
      getNoticeUri: "user/getNoticeUri"
    })
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
    overflow-x: hidden;
  }
}
</style>

