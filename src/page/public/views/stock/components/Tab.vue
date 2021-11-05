<template>
  <div id="tab" class="tab-sd line05">
    <div
      class="tab-info"
      v-for="(item, index) in list"
      :key="index"
      :class="[index === activeIndex ? 'active' : '']"
      @click="tabClick(item, index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          name: this.$t("stock.text29"),
          type: 0
        },
        {
          name: this.$t("stock.text30"),
          type: 1
        }
      ],
      activeIndex: 0
    };
  },
  methods: {
    tabClick(item, index) {
      if (this.activeIndex === index) return;
      this.activeIndex = index;
      this.$emit("change", item);
    }
  }
};
</script>
<style lang="less" scoped>
.tab-sd {
  display: flex;
  height: 0.6rem;
  background: @bodyBg;
  position: relative;
  .tab-info {
    flex: 1;
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.6rem;
    color: @txtColor;
    position: relative;
    &.active {
      color: @blueColor;
      &::after {
        content: "";
        width: 0.32rem;
        height: 0.04rem;
        background: @blueColor;
        position: absolute;
        bottom: 1px;
        left: 50%;
        margin-left: -0.16rem;
      }
    }
  }
}
</style>
