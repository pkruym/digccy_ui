<template>
  <div class="no-data">
    <div class="img">
      <img v-if="$lang == 'en'" src="@/assets/img/nodata.png" alt="" />
      <img v-else src="@/assets/img/bg-kongjiemian@2x.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less" scoped>
.no-data {
  padding-bottom: 1.5rem;
  .img {
    width: 3.2rem;
    margin: 1.2rem auto 0 auto;
    img {
      width: 100%;
    }
  }

  p {
    font-size: 0.36rem;
    color: rgb(102, 102, 102);
    &:nth-of-type(2) {
      font-size: 0.26rem;
      color: rgb(175, 175, 175);
    }
  }
  .btn {
    width: 4rem;
    height: 0.84rem;
    line-height: 0.84rem;
    background: @darkSkyBlue;
    text-align: center;
    font-size: 0.32rem;
    color: #e0ecf7;
    margin: 0.5rem auto 0;
  }
}
</style>
