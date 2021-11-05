<template>
  <div class="li" @click="codeClick">
    <span>{{ item.label }}</span>
    <span>+{{ item.code }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      default: () => {
        return {
          label: "China",
          code: 86
        };
      }
    }
  },
  methods: {
    codeClick() {
      sessionStorage.setItem("areaCode", this.item.code);
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.86rem;
  border-bottom:1px solid  @lineColor;
  span {
    color: @darkBlueGrey;
    font-size: 0.28rem;
  }
}
</style>
