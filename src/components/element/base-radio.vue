<template>
  <div class="flex">
    <div v-for="(option, index) in options" :key="index" class="radio-box flex">
      <label
        class="ui-radio flex"
        :class="{ checked: selectRadio == option.value }"
      >
        <input
          type="radio"
          v-model="radioModel"
          :value="option.value"
          @change="radioChange($event, option)"
        />
      </label>
      <span>
        {{ option.name }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
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
    selectOption(val) {
      this.radioModel = val;
      this.selectRadio = val;
      // this.option.value = val;
    }
  },
  created: function() {},
  mounted: function() {
    this.selectRadio = this.selectOption;
  },
  methods: {
    radioChange: function($event, option) {
      this.selectRadio = $event.target.value;
      // console.log($event.target.value);
      this.$emit("radioChange", $event.target.value, option);
    }
  }
};
</script>

<style lang="less" scoped>
.radio-box {
  font-size: 0.28rem;
  color: @txtColor;
  align-items: center;
  margin-right: 0.5rem;
  span {
    font-size: 0.28rem;
    margin-left: 4px;
  }
  .ui-radio {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid @darkSkyBlue;
    display: inline-block;
    position: relative;
    align-items: center;
  }
  .ui-radio.disabled {
    border-color: #ccc;
  }
  // .ui-radio::after {
  //   content: "";
  //   width: 7px;
  //   height: 7px;
  //   border-radius: 50%;
  //   display: inline-block;
  //   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   margin: -4.5px 0 0 -4.5px;
  //   border: 1px solid @darkSkyBlue;
  // }
  .ui-radio.disabled::after {
    background-color: #ccc;
  }
  .ui-radio.checked::after {
    content: "";
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -4.5px 0 0 -4.5px;
    box-sizing: border-box;
    background-color: @darkSkyBlue;
  }
  .ui-radio input[type="radio"] {
    opacity: 0;
    margin: 0;
  }
}
</style>
