<template>
  <div class="add-input">
    <div class="add-input">
      <div class="add-btn" @click="$emit('remove')"></div>
      <div class="input-box">
        <input
          type="number"
          v-model="inputNum"
          v-enter-number
          @input="change"
          :placeholder="placeholder"
          @blur="$emit('blur', a)"
          @keydown="preventNotNumber($event)"
          class="din-medium"
        />
      </div>
      <div class="remove-btn" @click="$emit('add')"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      // type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      a: 0
    };
  },
  computed: {
    inputNum: {
      get: function() {
        return this.num;
      },
      set: function(newValue) {
        // console.log(newValue)
        this.a = parseFloat(newValue);
        // $emit is the correct way to update props:
      }
    }
  },
  methods: {
    add() {
      console.log("ssssssss");
    },
    change() {
      console.log("ssssssss");

      this.$emit("change", this.a);
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
  }
};
</script>

<style lang="less" scoped>
.add-input {
  display: flex;
  .add-btn,
  .remove-btn {
    flex: 0 0 0.52rem;
    width: 0.52rem;
    height: 0.5rem;
  }
  .add-btn {
    background: url(../../assets/img/2_4/icoGsxdJian@2x.png) no-repeat;
    background-size: 0.52rem 0.52rem;
    margin-right: 0.1rem;
  }
  .remove-btn {
    background: url(../../assets/img/2_4/icoGsxdJia@2x.png) no-repeat;
    background-size: 0.52rem 0.52rem;
    margin-left: 0.1rem;
  }
  .input-box {
    flex: 1;

    height: 0.52rem;
    box-sizing: border-box;

    & input {
      display: inline-block;
      width: 100%;
      text-align: center;
      border: 1px solid @inputBorder;
      box-sizing: border-box;
      font-size: 0.32rem;
      height: 100%;
      background: @inputBg;
      color: @txtColor;
      &::placeholder {
        font-size: 0.26rem;
      }
    }
  }
}
</style>
