<template>
  <div class="indicators-box">
    <header class="box">
      <label>{{ $t("stock.text37") }}</label>
      <div class="shu"></div>
      <ul>
        <li
          :class="{ Medium: item.label == mainLabel }"
          v-for="item in mainList"
          :key="item.id"
          @click="$emit('mainClick', item.label)"
        >
          {{ item.label }}
        </li>
      </ul>
    </header>
    <footer class="box">
      <label>{{ $t("stock.text38") }}</label>
      <div class="shu"></div>
      <ul>
        <li
          :class="{ Medium: item.value == viceLabel }"
          v-for="item in viceList"
          :key="item.id"
          @click="viceClick(item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    mainLabel: {
      default: "MA"
    },
    viceLabel: {
      default: "MACD"
    },
    indicatorsDisable: {
      default: false
    }
  },
  data() {
    return {
      mainList: [{ label: "MA", id: 0 }],
      viceList: [
        { label: "MACD", id: 0, value: "MACD" },
        { label: "KDJ", id: 1, value: "Stochastic" },
        { label: "RSI", id: 2, value: "Relative Vigor Index" },
        { label: "WR", id: 3, value: "Williams %R" }
      ]
    };
  },
  methods: {
    viceClick(key) {
      if (this.indicatorsDisable) {
        return;
      }
      this.$emit("viceClick", key);
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.indicators-box {
  font-size: 0.26rem;
  color: @txtColor;
  width: 100%;
  background-color: @bodyBg;
  .box {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.06rem 0.24rem;
    label {
      padding-right: 0.26rem;
    }
    .shu {
      height: 0.2rem;
      width: 0.02rem;
      background-color: @blueyGrey;
      margin-right: 0.32rem;
    }
    ul {
      display: flex;
      li {
        flex: 1;
        margin-right: 0.44rem;
        position: relative;
        &.Medium {
          color: @darkSkyBlue;
        }
      }
    }
  }
}
</style>
