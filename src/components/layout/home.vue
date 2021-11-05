<template>
  <div class="home-layout">
    <main class="main-content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </main>
    <the-nav ref="nav"></the-nav>
  </div>
</template>
<script>
import TheNav from "@/page/home/components/the-nav";
export default {
  components: {
    TheNav,
  },
  data() {
    return {
      hight: 0,
    };
  },
  mounted() {
    console.log("$router.meta", this.$route);
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.home-layout {
  // position: relative;
  // overflow-y: scroll;
  // padding-bottom: 84px;
  height: 100%;

  .main-content {
    /* main绝对定位，进行内部滚动 */
    // position: absolute;
    // top: 0;
    // bottom: 1rem;
    // width: 100%;
    /* 使之可以滚动 */
    overflow-y: scroll;
    padding-bottom: 30px;
    // height: 100%;
    /* 增加该属性，可以增加弹性 */
    // -webkit-overflow-scrolling: touch;
  }
}
</style>
