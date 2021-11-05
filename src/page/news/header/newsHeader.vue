<template>
  <!-- <model-full class="router news__page" :showBack="false">

  </model-full> -->
  <div class="header">
    <router-link tag="div" to="/news" replace class="header-info"
      >快讯</router-link
    >
    <template v-for="(item, idx) in navList">
      <div
        :key="item.type"
        class="header-info"
        @click="getListPage(item.type)"
        :class="{ 'router-link-active': $route.query.type === item.type }"
      >
        {{ item.name }}
      </div>
    </template>
  </div>
</template>

<script>
import ModelFull from "element/model-full";

export default {
  components: {
    ModelFull
  },
  data() {
    return {
      flag: true,
      navList: [
        {
          name: "头条",
          type: "DIGICCY_HEADLINES_NEWS"
        },
        {
          name: "要闻",
          type: "DIGICCY_DAILY_NEWS"
        },
        {
          name: "产业",
          type: "DIGICCY_INDUSTRY_NEWS"
        },
        {
          name: "技术",
          type: "DIGICCY_TECHNOLOGY_NEWS"
        },
        {
          name: "投研",
          type: "DIGICCY_DEVELOPMENT_NEWS"
        }
      ]
    };
  },
  created() {
    // this.flag = this.$route.path == "/news";
  },
  methods: {
    getListPage(type) {
      this.$router.push({ path: "/celue", query: { type: type } });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .vux-header {
  top: constant(safe-area-inset-top) !important;
  top: env(safe-area-inset-top) !important;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0.88rem;
  .header-info {
    flex: 1;
    font-size: 0.32rem;
    color: @txtColor;
    position: relative;
    text-align: center;
    &.router-link-active {
      color: @blueColor;

      &::after {
        position: absolute;
        content: "";
        width: 0.5rem;
        height: 3px;
        background: @blueColor;
        bottom: -3px;
        left: 50%;
        margin-left: -0.26rem;
      }
    }
  }
}
</style>
