<template>
  <div class="aside">
    <ul>
      <li v-for="val in list" :key="val" @click="$emit('click',val)">{{val}}</li>
    </ul>
  </div>
</template>


<script>
export default {
  props: {
    list: {}
  }
};
</script>

<style lang="less" scoped>


.aside {
  position: fixed;
  top: 2.36rem;
  right: .1rem;;
  li{
      color: @darkSkyBlue;
      font-size: .2rem;
      line-height: .32rem;;
      text-align: center;
  }
}
</style>
