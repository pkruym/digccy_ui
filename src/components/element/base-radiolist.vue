<template>
  <div>
    <div
      v-for="(option,index) in options"
      :key="index"
      class="radio-box flex"
      @click="radioChange(option.value)"
    >
      <div class="flex">
        <span>{{ option.symbol }}</span>

        <label
          class="ui-radio flex"
          :class="{ 'checked' : selectRadio == option.value}"
          @change="radioChange($event)"
        >
          <!-- <input
            type="radio"
            v-model="radioModel"
            :value="option.value"
          >-->
          <!-- @change="radioChange($event)" -->
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: function() {
    return {
      radioModel: "",
      selectRadio: ""
    };
  },
  props: {
    options: {
      type: [Array, Object]
    },
    selectOption: ""
  },
  watch: {
    selectOption: {
      handler(to) {
        this.selectRadio = to;
      },
      immediate: true
    }
  },
  methods: {
    radioChange(value) {
      this.$emit("radioChange", value);
    }
  }
};
</script>


<style lang="less" scoped>


.radio-box {
  font-size: 0.32rem;
  color: @battleshipGrey;
  height: 0.88rem;
  padding: 0 0.3rem;
  > div {
    align-items: center;
    height: 100%;
    width: 100%;
    border-bottom: 0.02rem solid #1A2529;
    justify-content: space-between;
  }
  .ui-radio {
    // width: 15px;
    // height: 15px;
    // border-radius: 50%;
    // border: 1px solid @darkSkyBlue;
    // display: inline-block;
    position: relative;
    // align-items: center;
  }
  .ui-radio.disabled {
    border-color: #ccc;
  }
  .ui-radio::after {
    // content: "";
    // width: 7px;
    // height: 7px;
    // border-radius: 50%;
    // display: inline-block;
    // position: absolute;
    // left: 50%;
    // top: 50%;
    // margin: -4.5px 0 0 -4.5px;
    // border: 1px solid @darkSkyBlue;
  }
  .ui-radio.disabled::after {
    background-color: #ccc;
  }
  .ui-radio.checked::after {
    content: "";
    width: 15px;
    height: 15px;
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    background: url("~@/assets/img/1_9/Path@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .ui-radio input[type="radio"] {
    opacity: 0;
    margin: 0;
  }
}
</style>
