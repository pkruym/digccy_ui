<template>
  <model-full
    class="fixd-wrap fund-wrap"
    :title="isLucky ? $t('my.text26') : $t('my.text9')"
  >
    <!--  <div class="header" slot="header">
     <router-link tag="div" to="/record/fund" replace class="header-info">{{
        $t("my.fund.text17")
      }}</router-link>
     <template v-if="$diskinfo.type === 'actual'">
        <router-link
          tag="div"
          to="/record/recrecord"
          replace
          class="header-info"
          >{{ $t("my.fund.text18") }}</router-link
        >
        <router-link
          tag="div"
          to="/record/putrecord"
          replace
          class="header-info"
          >{{ $t("my.fund.text19") }}</router-link
        >
      </template>
    </div> -->
    <router-view></router-view>
  </model-full>
</template>
<script>
import modelFull from "element/model-full";

export default {
  components: {
    modelFull
  },
  data() {
    return {
      isLucky: false
    };
  },
  created() {
    this.isLucky = this.$route.query.from == "lucky";
  }
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  .header-info {
    flex: 1;
    font-size: 0.32rem;
    color: @blueyGrey;
    position: relative;
    &.router-link-active {
      color: @blueColor;
      &::after {
        position: absolute;
        content: "";
        width: 0.5rem;
        height: 3px;
        background: @blueColor;
        bottom: 0;
        left: 50%;
        margin-left: -0.26rem;
      }
    }
  }
}
</style>
