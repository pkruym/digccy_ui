<template>
  <modelFull title="支付" id="pay-page">
    <div class="main">
      <iframe scrolling="yes" id="main" name="main" frameborder="0" :src="url" style="width:100%;" :style="{ height: oHeight + 'px' }"></iframe>
    </div>
  </modelFull>
</template>
<script>
import modelFull from "element/model-full";

export default {
  components: {
    modelFull
  },
  data() {
    return {
      oHeight: 0,
      url: ""
    };
  },
  mounted() {
    let url = sessionStorage.getItem("payurl");
    if (url.indexOf("jubaopen") > -1 || url.indexOf("qq.logwit") > -1 || url.indexOf("newWindow=true") > -1) {
      window.location.href = url;
    } else {
      this.url = url;
    }
    this.oHeight = document.body.clientHeight - 47;
  },
};
</script>

<style lang="less" scoped>
#pay-page {
  background: #fff;
  height: 100%;
  .main {
    padding-top: 0.94rem;
  }
}
</style>
