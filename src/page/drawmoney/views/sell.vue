<template>
  <div class="usdt-main">
    <header class="header line05">
      <div class="left" @click="$router.go(-1)"><div class="arrow"></div></div>
      <div class="btns">
        <!-- 出售USDT -->
        <span :class="{ active: currentId == 1 }" @click="currentId = 1">{{
          $t("page.text32")
        }}</span>
        <!-- 地址提币 -->
        <span :class="{ active: currentId == 2 }" @click="currentId = 2">{{
          $t("page.text33")
        }}</span>
      </div>
      <div class="right">
        <!-- 出售记录 -->
        <p
          v-if="currentId == 1"
          @click="
            $router.push({
              path: '/usdtList/sell',
              query: {
                isLuckyProfit: $route.query.isLuckyProfit
              }
            })
          "
        >
          {{ $t("legalTransaction.sellRecord") }}
        </p>
        <!-- 提币记录 -->
        <p v-else @click="$router.push({ path: '/putrecord' })">
          {{ $t("my.fund.text19") }}
        </p>
      </div>
    </header>
    <div class="content">
      <usdtSell v-if="currentId == 1"></usdtSell>
      <withdrawal v-if="currentId == 2"></withdrawal>
    </div>
  </div>
</template>
<script>
import usdtSell from "./usdtSell";
import withdrawal from "./withdrawal";
export default {
  components: {
    usdtSell,
    withdrawal
  },
  data() {
    return {
      currentId: 1
    };
  },
  mounted() {}
};
</script>
