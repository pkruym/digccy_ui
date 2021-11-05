<template>
  <div class="main_page">
    <iframe
      scrolling="yes"
      id="main"
      name="main"
      frameborder="0"
      :src="url"
      style="width:100%;"
      :style="{ height: oHeight + 'px' }"
    ></iframe>
  </div>
  <!-- https://ytpfx.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=1025752&configID=43180&jid=3301842065&s=1 -->
</template>
<script>
import ModelFull from "element/model-full";
import { mapGetters } from "vuex";

export default {
  components: {
    ModelFull
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  data() {
    return {
      oHeight: 0,
      url: ""
    };
  },
  mounted() {
    // this.url = `${window.config.host}/activity/#/invitation?userId=${this.userInfo.id}&token=${localStorage.getItem('token')}`;
    this.url =
      `${window.config.domain}/activity/#/` +
      (this.$lang == "en" ? "eninvitation" : "invitation") +
      `?userId=${this.userInfo.id}&token=${localStorage.getItem(
        "token"
      )}&phone=${localStorage.getItem("phone")}`;

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
