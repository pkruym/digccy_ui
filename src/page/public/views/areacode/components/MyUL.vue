<template>
  <div class="ul">
    <label>{{ item.name }}</label>
    <div class="box">
      <MyLI v-for="val in item.list" :key="val.area" :item="val"></MyLI>
    </div>
  </div>
</template>

<script>
import MyLI from "./MyLI";
export default {
  components: {
    MyLI
  },
  props: {
    item: {}
  }
};
</script>

<style lang="less" scoped>
.ul {
  // display: flex;
  // flex-direction: column;
  label {
    background-color: @markBg;
    font-size: 0.24rem;
    color: @darkBlueGrey;
    height: 0.52rem;
    padding-left: 0.42rem;
    display: flex;
    align-items: center;
  }
  .box {
    padding: 0 0.6rem 0 0.5rem;
    height: 100%;
  }
}
</style>
