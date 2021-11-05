<template>
  <div class="top-btn">
    <div class="topbtn" @click="change(val.index)" v-for="val in list" :key="val.index" :class="{ index: index == val.index }">
      {{ val.label }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      index: 0
    };
  },
  props: {
    indexKey: {
      default: 0,
      type: Number
    },
    list: {
      default: () => {
        return [
          { index: 0, label: this.$t("leverageTrading.lever") },
          { index: 1, label: this.$t("leverageTrading.contract") }
        ];
      }
    }
  },
  watch: {
    index: {
      handler(to) {
        this.$emit("update:indexKey", to);
      },
      immediate: true
    },
    indexKey: {
      handler(to) {
        this.index = to;
      },
      immediate: true
    }
  },
  computed: {},
  methods: {
    change(key) {
      this.index = key;

      this.$emit("change", key);
    }
  }
};
</script>

<style lang="less" scoped>
.top-btn {
  border: 0.5px solid @blueyGrey;
  border-right: none;
  width: fit-content;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  .topbtn {
    cursor: pointer;
    border-right: 0.5px solid @blueyGrey;
    font-size: 0.24rem;
    line-height: 1;
    color: @greyBlue;
    padding: 0.16rem 0.24rem;
    &.index {
      background-color: @darkSkyBlue;
      border-color: @darkSkyBlue;
      color: @offWhite;
    }
  }
}
</style>
