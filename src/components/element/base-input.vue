<template>
  <div class="input-box" :class="{ 'input-focus': isClick }">
    <slot name="left-quhao"></slot>
    <div class="input-box__left">
      <!-- <div class="input-inbox__left">
				<slot></slot>
      </div>-->
      <input
        :type="_type"
        class="input-inbox__main"
        :placeholder="placeholder"
        v-bind:value="value"
        :disabled="disabled"
        @input="updateValue($event.target.value)"
        @focus="focusIpt($event)"
        @blur="blurIpt($event)"
      />
      <div @click="view" v-if="showPass" class="icon">
        <img v-show="isPassword" src="@/assets/img/dl-show@2x.png" alt />
        <img v-show="!isPassword" src="@/assets/img/dl-disappear@2x.png" alt />
      </div>
      <slot name="right-txt"></slot>
    </div>
    <div class="input-box__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {},
    placeholder: {
      type: String,
      default: "点击输入内容"
    },
    type: {
      type: String,
      default: "text"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showPass: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isPassword: false,
      isClick: false
    };
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
    focusIpt() {
      this.isClick = true;
    },
    blurIpt() {
      this.isClick = false;
    },
    view() {
      this.isPassword = this.isPassword ? false : true;
    }
  },
  computed: {
    _type() {
      const type = this.type;
      if (type === "password" && this.isPassword) {
        return "text";
      }
      return type;
    }
  }
};
</script>

<style lang="less" scoped>
@white: #151e26;
@blueyGrey: #151e26;
.input-inbox__main {
  background: transparent;
}
.input-box {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  position: relative;
  border-bottom: 1px solid @lineColor;
  background-image: linear-gradient(#0066ed, #0066ed);
  background-size: 0px 1px, 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom, center 100%;
  &__left {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  .input-inbox {
    &__left {
      flex-shrink: 0;
      width: 0.32rem;
      // height: 0.40rem;
      margin-right: 0.36rem;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &__main {
      display: inline-block;
      flex-grow: 1;
      height: 0.8rem;
      line-height: 0.8rem;
      border: none;
      font-size: 0.36rem;
      color: @darkBlueGrey;
      &:focus {
        outline: none;
      }
      &:placeholder {
        color: @blueyGrey;
      }
      &::-webkit-input-placeholder {
        color: #adb3c1 !important;
        font-size: 0.28rem;
      }
    }
  }
  &__right {
    flex-shrink: 0;
  }
  .icon {
    width: 0.42rem;
    height: 0.42rem;
    img {
      width: 100%;
    }
  }
  input {
    background-color: transparent;
  }
  // input:focus {
  //   outline: none;
  //   border-color: transparent;
  // }
  &.input-focus {
    background-size: 100% 1px, 100% 1px;
    transition: all 0.3s;
    border: none;
    outline: none;
  }
}
</style>
