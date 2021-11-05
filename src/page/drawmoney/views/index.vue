<template>
  <div class="usdt-main">
    <header class="header line05">
      <div class="left" @click="$router.go(-1)"><div class="arrow"></div></div>
      <div class="btns">
        <!-- 购买USDT -->
        <span :class="{ active: currentId == 1 }" @click="currentId = 1">{{
          $t("page.text11")
        }}</span>
        <!-- 钱包充币 -->
        <span :class="{ active: currentId == 2 }" @click="currentId = 2">{{
          $t("page.text12")
        }}</span>
      </div>
      <div class="right">
        <!-- 购买记录 -->
        <p
          v-if="currentId == 1"
          @click="$router.push({ path: '/usdtList/purchase' })"
        >
          {{ $t("legalTransaction.purchaseRecord") }}
        </p>
        <!-- 充币记录 -->
        <p v-else @click="$router.push({ path: '/recrecord' })">
          {{ $t("my.fund.text18") }}
        </p>
      </div>
    </header>
    <div class="content">
      <usdtBuy v-show="currentId == 1"></usdtBuy>
      <withdral v-show="currentId == 2"></withdral>
    </div>
  </div>
</template>
<script>
import usdtBuy from "./usdtBuy";
import withdral from "./withdral";
export default {
  components: {
    usdtBuy,
    withdral
  },
  data() {
    return {
      currentId: 1
    };
  }
};
</script>
