<template>
  <div class="tel">
    <base-input
      class="input"
      :placeholder="$t('dialog.bandCard.placeholder4')"
      :value="value"
      @input="$emit('input', $event)"
    >
      <div class="quhao" slot="left-quhao">
        <div class="num" @click="$router.push('/areacode')">+{{ cptAreaCode }}</div>
        <i></i>
        <div class="shu"></div>
      </div>
      <img :src="src" alt="手机" width="12" height="16" />
    </base-input>
  </div>
</template>

<script>
import BaseInput from "@/components/element/base-input";

export default {
  props: {
    src: {},
    value: {},
    areaCode: {
      default: 86
    }
  },
  data() {
    return {
      ismounted: false
    };
  },
  computed: {
    cptAreaCode() {
      let num = "";
      if (this.ismounted) {
        if (sessionStorage.getItem("areaCode")) {
          num = sessionStorage.getItem("areaCode");
        } else {
          num = "86";
        }
        return num;
      }
    }
  },
  mounted() {
    this.ismounted = true;
  },
  components: {
    BaseInput
  }
};
</script>

<style lang="less" scoped>
@paleGreyThree: #3e4757;

.tel {
  display: flex;
  .quhao {
    line-height: 0.8rem;
    // border-bottom:1px  solid @lineColor;
    // margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    .num {
      min-width: 0.66rem;
      // margin-right: 0.04rem;
      font-size: 0.32rem;
      color: @darkBlueGrey;
      // line-height: .8rem;
      margin-top: 0.06rem;
    }
    i {
      width: 0.16rem;
      height: 0.12rem;
      background: url("~@/assets/img/2_7/bottommore.svg") no-repeat center;
      background-size: contain;
      margin-right: 0.12rem;
    }
    .shu {
      height: 0.4rem;
      width: 0.02rem;
      background-color: @blueyGrey;
      margin-right: 0.18rem;
    }
  }
  .input {
    flex: 1;
  }
}
</style>
