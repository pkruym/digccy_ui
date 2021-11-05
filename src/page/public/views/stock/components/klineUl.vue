<template>
  <div class="klinebtn">
    <ul class="shang flex">
      <template v-for="(val, i) in shanglist">
        <li
          :class="{
            indicatorsDisable: indicatorsDisable,
            index: index == val.index
          }"
          :key="i"
          @click="clickTime(val.id, val.index, true)"
        >
          {{ val.name }}
        </li>
      </template>
      <li
        :class="{
          indicatorsDisable: indicatorsDisable,
          moreBtn: moreBtn && !innerIndicatorsShow
        }"
        @click="moreClick"
      >
        {{ $t("setText.more") }}<i></i>
      </li>
      <li
        class="indicatorsbox"
        :class="{
          indicatorsDisable: indicatorsDisable,
          indicatorsShow: innerIndicatorsShow
        }"
        @click="$emit('indicators')"
      >
        {{ $t("leverageTrading.indicator") }}<i></i>
      </li>
    </ul>
    <ul v-show="moreBtn && !innerIndicatorsShow" class="xia flex">
      <li
        :class="{ index: index == val.index }"
        v-for="(val, i) in xialist"
        :key="i"
        @click="clickTime(val.id, val.index)"
      >
        {{ val.name }}
      </li>
    </ul>
    <ul class="xia flex" v-show="innerIndicatorsShow" ref="myIndicators">
      <Indicators
        :viceLabel="viceLabel"
        @viceClick="$emit('viceClick', $event)"
      ></Indicators>
    </ul>
  </div>
</template>

<script>
import Indicators from "./Indicators";

export default {
  props: {
    viceLabel: {
      default: "MACD"
    },
    indicatorsShow: {
      default: false
    },
    indicatorsDisable: {
      default: false
    },
    changedDisable: {
      default: false
    }
  },
  components: {
    Indicators
  },
  watch: {
    indicatorsShow: {
      handler(to) {
        this.innerIndicatorsShow = to;
        if (this.indicatorsShow) this.moreBtn = false;
      },
      immediate: true
    }
  },
  data() {
    return {
      shanglist: [
        { id: "0", name: this.$t("stock.text9"), index: 0 },
        { id: "D", name: this.$t("stock.text19"), index: 10 },
        { id: "1", name: this.$t("stock.text10"), index: 1 },
        { id: "3", name: this.$t("stock.text11"), index: 2 },
        { id: "5", name: this.$t("stock.text12"), index: 3 }
      ],
      xialist: [
        { id: "30", name: this.$t("stock.text14"), index: 5 },
        { id: "60", name: this.$t("stock.text15"), index: 6 },
        { id: "120", name: this.$t("stock.text16"), index: 8 },
        { id: "240", name: this.$t("stock.text17"), index: 9 }
      ],
      index: 0,
      moreBtn: false,
      innerIndicatorsShow: false
    };
  },
  methods: {
    moreClick() {
      if (this.indicatorsDisable) return;

      // this.innerIndicatorsShow = false
      this.$emit("indicators", false);
      this.moreBtn = !this.moreBtn;
    },
    clickTime(key, index, isTop = false) {
      if (this.indicatorsDisable) return;

      this.index = index;
      this.$emit("change", key);
      if (isTop) {
        this.moreBtn = false;
        // this.indicatorsShow = false;
      }
    },
    watchClick() {
      let _this = this;
      document.body.addEventListener("click", _this.bodyClick, false);
    },
    getElementToPageTop(el) {
      if (el.parentElement) {
        return this.getElementToPageTop(el.parentElement) + el.offsetTop;
      }
      return el.offsetTop;
    },
    bodyClick(ev) {
      let { myIndicators } = this.$refs;
      let klin = document.querySelector(".k-line");
      // let top = this.getElementToPageTop(myIndicators) + myIndicators.parentElement.clientHeight;
      let top = Math.abs(myIndicators.offsetTop) + klin.offsetTop;
      let bottom = top + myIndicators.clientHeight;
      if (
        (ev.clientY < top || ev.clientY > bottom) &&
        this.innerIndicatorsShow == true
      ) {
        this.innerIndicatorsShow = false;
      }
    }
  },

  mounted() {
    this.watchClick();
  },
  beforeDestroy() {
    let _this = this;
    document.body.removeEventListener("click", _this.bodyClick, false);
  }
};
</script>

<style lang="less" scoped>
.klinebtn {
  position: relative;
  justify-content: center;
  align-items: center;
  > ul {
    // padding: 0 0.3rem;
    justify-content: center;
    align-items: center;
    &:not(:first-child) {
      background-color: @bodyBg;
    }
    li {
      color: @txt2Color;
      font-size: 0.26rem;
      padding: 0.12rem 0;
      position: relative;
      flex: 1;
      text-align: center;
      // margin-right: 0.56rem;
      &.moreBtn {
        color: @txtColor;
      }
      &.indicatorsShow {
        background-color: @blueColor;
        color: @writeColor;
      }
      &.indicatorsDisable {
        opacity: 0.2 !important;
      }
      &.indicators {
        position: absolute;
        width: 100%;
        height: 1.28rem;
        left: 0;
        bottom: 0;
        background-color: @paleGrey;
        transform: translateY(100%);
        z-index: 888;
        padding: 0.16rem 0.3rem 0.24rem;
      }
      i {
        display: block;
        height: 0.2rem;
        width: 0.2rem;
        background: url("~@/assets/img/1_9/gengduo@2x.png") no-repeat center;
        align-self: flex-end;
        transform: scale(0.6, 0.6);
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }

  li.index {
    color: @blueColor;
    &:after {
      position: absolute;
      content: "";
      width: 0.52rem;
      height: 0.04rem;
      background-color: @blueColor;
      // top: calc(~"100% - 0.04rem");
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 0.04rem;
    }
  }
}
</style>
