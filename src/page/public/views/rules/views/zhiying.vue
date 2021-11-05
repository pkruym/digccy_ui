<template>
  <model-full :title="$t('futures.text17')" class="qiangp fixd-wrap">
    <ul>
      <li>
        <label class="flex">
          <img src="@/assets/img/ico-bule@3x.png" alt="" />
          <span>{{ $t("futures.text18") }}</span>
        </label>
        <div>
          <p>{{ $t("futures.text19") }}</p>
          <p>{{ $t("futures.text20") }}</p>
        </div>
      </li>
      <li>
        <label class="flex">
          <img src="@/assets/img/ico-red@3x.png" alt="" />
          <span> {{ $t("futures.text21") }}</span>
        </label>
        <div>
          <p class="flex">
            <span>1、</span> <span> {{ $t("futures.text22") }}</span>
          </p>
          <p class="flex">
            <span>2、</span> <span> {{ $t("futures.text23") }}</span>
          </p>
          <p class="flex">
            <span>3、</span> <span> {{ $t("futures.text24") }}</span>
          </p>
          <p class="flex">
            <span>4、</span> <span> {{ $t("futures.text25") }}</span>
          </p>
          <p class="flex">
            <span>5、</span> <span> {{ $t("futures.text26") }}</span>
          </p>
        </div>
      </li>
    </ul>
  </model-full>
</template>
<script>
import modelFull from "element/model-full";
export default {
  components: {
    modelFull
  }
};
</script>
<style lang="less" scoped>
.qiangp {
  height: 100%;
  background: @bodyBg;
  ul {
    padding: 0 0.42rem;
    li {
      div {
        padding: 0.26rem;
        border-radius: 4px;
        background: @markBg;
        p {
          font-size: 0.24rem;
          color: @txtColor;
          span {
            font-size: 0.24rem;
          }
        }
      }
      label {
        padding: 0.26rem 0;
        align-items: center;
        img {
          width: 0.274rem;
          height: 0.274rem;
          display: inline-block;
          margin-right: 0.23rem;
        }
        span {
          font-size: 0.32rem;
          color: @darkBlueGrey;
        }
      }
    }
  }
}
</style>
