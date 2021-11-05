<template>
  <model-full :title="$t('my.text14')" class="fixd-wrap">
    <div id="notice">
      <div class="list">
        <new-list></new-list>
      </div>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import newList from "./news";
export default {
  components: {
    ModelFull,
    newList
  },
  data() {
    return {
      btnList: [{ index: 0, label: "消息" }]
    };
  }
};
</script>
<style lang="less" scoped>
#notice {
  height: 100%;
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 0.82rem;
    .header-info {
      flex: 1;
      font-size: 0.32rem;
      color: #2acca6;
      position: relative;
      &.router-link-active {
        &::after {
          position: absolute;
          content: "";
          width: 0.5rem;
          height: 3px;
          background: #2acca6;
          bottom: 0;
          left: 50%;
          margin-left: -0.26rem;
        }
      }
    }
  }
}
</style>
