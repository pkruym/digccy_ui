<template>
  <div id="payPwd">
    <header>请输入支付密码</header>
    <input
      ref="pwd"
      type="password"
      maxlength="6"
      v-model="pass"
      class="pwd"
      unselectable="on"
      @keyup="getPos"
    />
    <ul class="pwd-wrap" @click="focus">
      <li :class="passLength == 0 ? 'psd-blink' : ''">
        <i v-if="passLength > 0"></i>
      </li>
      <li :class="passLength == 1 ? 'psd-blink' : ''">
        <i v-if="passLength > 1"></i>
      </li>
      <li :class="passLength == 2 ? 'psd-blink' : ''">
        <i v-if="passLength > 2"></i>
      </li>
      <li :class="passLength == 3 ? 'psd-blink' : ''">
        <i v-if="passLength > 3"></i>
      </li>
      <li :class="passLength == 4 ? 'psd-blink' : ''">
        <i v-if="passLength > 4"></i>
      </li>
      <li :class="passLength == 5 ? 'psd-blink' : ''">
        <i v-if="passLength > 5"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      pass: "",
      passLength: -1
    };
  },
  beforeDestroy() {
    this.$off("passFn", this.pass);
  },
  methods: {
    focus() {
      this.passLength = 0;
      this.$refs.pwd.focus();
    },
    getPos() {
      this.passLength = this.pass.length;
      if (this.pass.length === 6 && this.pass != "") {
        this.$emit("passFn", this.pass);
      }
    },
    removePass() {
      this.pass = "";
    }
  }
};
</script>
<style lang="less" scoped>
#payPwd {
  width: 6rem;
  height: 2.8rem;
  header {
    width: 5rem;
    margin: 0 auto;
    font-size: 0.36rem;
    color: rgb(30, 36, 46);
    height: 0.92rem;
    line-height: 0.92rem;
    border-bottom: 1px solid rgb(220, 222, 227);
    text-align: center;
  }
  input[type="password"] {
    width: 0.1px;
    height: 0.1px;
    color: transparent;
    position: relative;
    top: 23px;
    background: #000000;
    left: 46px;
    border: none;
    font-size: 18px;
    opacity: 0;
    z-index: -1;
  }
  //光标
  .psd-blink {
    display: inline-block;
    background: url("../assets/img/blink.gif") no-repeat center;
  }
  .pwd-wrap {
    width: 5rem;
    height: 0.8rem;
    padding-bottom: 1px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid @blueyGrey;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    /*            top: 13%;*/
    z-index: 10;
    li {
      list-style-type: none;
      text-align: center;
      line-height: 0.8rem;
      -webkit-box-flex: 1;
      flex: 1;
      -webkit-flex: 1;
      position: relative;
      &:after {
        content: "";
        width: 1px;
        height: 0.44rem;
        background: @blueyGrey;
        position: absolute;
        right: -1px;
        top: 50%;
        margin-top: -0.22rem;
      }
      &:last-child:after {
        background: none;
      }
      i {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #000;
        display: inline-block;
      }
    }
  }
  button {
    position: relative;
    display: block;
    height: 41px;
    text-align: center;
    margin: 0 auto;
    margin-top: 70%;
    padding: 0 20px;
    border-radius: 5px;
    font-size: 16px;
    border: 1px solid #dddddd;
    background: #dddddd;
    color: #000000;
  }
}
</style>
