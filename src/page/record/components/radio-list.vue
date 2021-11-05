<template>
  <div class="radio-wrap">
    <template v-for="(item, idx) in radioList">
      <div :key="item.key" class="radio-box" @click="checkBox(item, idx)">
        <i :class="{ isChecked: item.checked }"></i>{{ item.value }}
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    radioList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    checkBox(item, idx) {
      if (item.checked) return;
      this.$emit("onChange", item);
      // item.checked = true
    }
  }
};
</script>
<style lang="less">
.radio-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  .radio-box {
    flex: 1;
    padding: 6px 0;
    position: relative;
    color: @txtColor;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.28rem;
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 0.025rem solid #c9c9c9;
      border-radius: 50%;
      margin-right: 0.1rem;
      &.isChecked {
        border-color: #2acca6;
        background-color: #2acca6;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          width: 0.18rem;
          height: 0.08rem;
          border-left: 0.022rem solid #28323c;
          border-bottom: 0.025rem solid #28323c;
          transform: rotate(-45deg);
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          top: 0.1rem;
          left: 0.07rem;
        }
      }
    }
  }
}
</style>
