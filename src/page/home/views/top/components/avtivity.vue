<template>
  <router-link tag="div" to="/rechargeActivity" class="activity">
    <img
      v-if="lang == 'zh'"
      src="@/assets/img/2_7/img_smailbanner@2x.png"
      alt
    />
    <img v-else src="@/assets/img/2_7/img_smailbanner_en@2x.png" alt />
  </router-link>
</template>
<script>
export default {
  data() {
    return {
      lang: localStorage.getItem("language") || "zh"
    };
  }
};
</script>
<style lang="less" scoped>
.activity {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.2rem;
  background: #f7f7fa;
  img {
    width: 6.9rem;
    height: 0.8rem;
    border-radius: 5px;
  }
}
</style>
