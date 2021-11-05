<template>
  <p class="fuwu">
    {{ $t("register.text14") }}
    <router-link to="/fuwu" tag="span">{{ $t("register.text15") }}</router-link>
  </p>
</template>

<script></script>

<style lang="less" scoped>
@blueColor: #0066ed;
.fuwu {
  width: 100%;
  color: @blueyGrey;
  font-size: 0.24rem;
  margin-top: 20px;
  // position: fixed;
  // left: 0;
  // bottom: 0.4rem;
  text-align: center;
  span {
    // color: @frenchBlue;
    color: @blueColor;
    text-decoration: underline;
    font-size: 0.24rem;
    display: inline-block;
  }
}
</style>
