<template>
  <model-full :title="noticeUrl.title" class="model">
    <div class="main_page">
      <iframe scrolling="yes" id="main" name="main" frameborder="0" :src="noticeUrl.href" style="width:100%;margin-bottom:60px" :style="{height: oHeight + 'px'}"></iframe>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import { mapState } from "vuex";

export default {
  components: {
    ModelFull
  },
  data() {
    return {
      oHeight: 0
    };
  },
    computed:{
    ...mapState(["noticeUrl"]),
  },
  mounted() {
    this.oHeight = document.body.clientHeight - 57;
  }
};
</script>
<style lang="less" scoped>
.model {
  height: 100%;
}
</style>

