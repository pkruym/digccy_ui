<template>
  <div class="input-num">
    <div class="add-btn" v-show="!readonly" @click="_decrease($event)"></div>
    <input
      class="input-box"
      :value="displayValue"
      v-enterNumber="{ type: inputType }"
      type="text"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="_input($event)"
      @change="_change($event)"
      @focus="_foucus($event)"
      @blur="_blur($event)"
    />
    <div v-show="!readonly" class="remove-btn" @click="_increase($event)"></div>
  </div>
</template>
<script>
export default {
  name: "inputnum",
  props: {
    step: {
      type: Number,
      default: 1
    },
    allowZero: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: 9999999999
    },
    min: {
      type: Number,
      default: -1
    },
    value: {
      // type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number
    },
    validateOnInput: {
      type: Boolean,
      default: false
    },
    int: {
      // 是否是整数
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: "precision"
    },
    precision: {
      type: Number,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10);
      }
    }
  },
  data() {
    return {
      num: 0
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(value) {
        let newVal = value === undefined ? value : Number(value);
        if (newVal !== undefined) {
          if (isNaN(newVal)) {
            return;
          }
          if (newVal == this.num) {
            return;
          }
          if (this.precision !== undefined) {
            newVal = this.toPrecision(newVal, this.precision);
          }
        }
        // 外面传进来，如果可以是0，直接设置就行了
        if (!(this.allowZero == true && newVal == 0)) {
          if (this.max != -1 && newVal >= this.max) newVal = this.max;
          if (this.min != -1 && newVal <= this.min) newVal = this.min;
        }

        this.num = newVal;
        this.$emit("change");
      }
    }
  },
  computed: {
    displayValue() {
      return this._formatValue(this.num);
    }
  },
  methods: {
    _formatValue(value) {
      const currentValue = value;
      // console.log('this.precision',this.precision);
      if (typeof currentValue === "number" && this.precision !== undefined) {
        if (currentValue == 0) {
          return "0";
        }
        return currentValue;
      } else {
        return currentValue;
      }
    },
    // 事件 =============================
    _input(e) {
      if (this.validateOnInput) {
        // let value = e.target.value;
        // if (this.max <= value) {
        //   value = this.max;
        // } else if (value <= this.min) {
        //   value = this.min;
        // }
        let value = e.target.value;
        if (this.int) {
          value = value.replace(/\D+/, "");
          this[val] = value;
        } else {
          let matchArr = value.match(/\d+\.?\d*/);
          if (!matchArr) {
            value = "";
          }
          value = matchArr[0];
        }
        e.target.value = value;
        // this.setValue(value);
        // e.target.value = this._formatValue(this.num); // 显示的内容
      }
    },
    toPrecision(num, precision) {
      if (precision === undefined) return num;
      return parseFloat(Number(num));
    },
    _change(e) {
      this.setValue(e.target.value);
      e.target.value = this._formatValue(this.num); // 显示的内容
    },
    _foucus(e) {
      this.$emit("focus", e);
    },
    _blur(e) {
      console.log("asasasasa");

      this.$emit("blur", e);
    },
    checkValue(value) {
      if (value == "") {
        value = 0;
      }

      value = parseFloat(value);

      if (isNaN(value)) {
        value = 0;
      }
      if (!(this.allowZero == true && value == 0)) {
        if (this.max != -1 && value >= this.max) value = this.max;
        if (this.min != -1 && value <= this.min) value = this.min;
      }

      value = parseFloat(this._formatValue(value));

      return value;
    },
    setValue(value) {
      const old = this.num;
      value = this.checkValue(value);

      if (old == value) return;

      console.log("inputVlueSet======================================", value);

      this.$emit("input", value); // 传出去
      this.$emit("change", value, old);
      this.num = value;
    },

    // ---------------------------------
    // 功能函数===============================
    _increase(e) {
      console.log("asasasasa");
      let value = Array.from(e.target.offsetParent.children)[0].children[1]
        .children[1].value;
      let num = parseFloat(value) + parseFloat(this.step);
      this.setValue(num);
      console.log("asasasasa");

      this.$emit("increaseChange", this.num, value);
    },
    _decrease(e) {
      console.log("asasasasa");

      let value = Array.from(e.target.offsetParent.children)[0].children[1]
        .children[1].value;

      let num = parseFloat(value) - parseFloat(this.step);
      this.setValue(num);
      this.$emit("decreaseChange", this.num, value);
    },
    isBackspace(keyCode) {
      return keyCode === 8;
    },
    isBackspace(keyValue) {
      return keyValue === "Backspace";
    },
    isDot(keyValue) {
      return keyValue === ".";
    },
    isNumber(keyValue) {
      return keyValue >= 0 && keyValue <= 9;
    },
    preventNotNumber(event) {
      var keyValue = event.key;
      // debugger
      if (
        !this.isBackspace(keyValue) &&
        !this.isDot(keyValue) &&
        !this.isNumber(keyValue)
      ) {
        // 其他按键
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
    // ------------------------------------
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.input-num {
  display: flex;
  margin-top: 0.48rem;
  justify-content: center;
  .add-btn,
  .remove-btn {
    flex: 0 0 0.52rem;
    width: 0.52rem;
    height: 0.5rem;
  }

  .add-btn {
    background: url(../../assets/img/zhisunzhiyingJian@2x.png) no-repeat;
    background-size: 0.52rem 0.5rem;
  }

  .remove-btn {
    background: url(../../assets/img/zhisunzhiyingJia@2x.png) no-repeat;
    background-size: 0.52rem 0.5rem;
  }
  .input-box {
    // flex: 1;
    text-align: center;
    height: 0.5rem;
    box-sizing: border-box;
    font-size: 0.32rem;
    background: @inputBg;
    border: 1px solid @inputBorder;
    color: @txtColor;

    & input {
      display: inline-block;
      // width: 100%;
      text-align: center;
      box-sizing: border-box;
      font-size: 0.32rem;
      height: 100%;
      &::placeholder {
        font-size: 0.26rem;
      }
    }
  }
}
</style>
