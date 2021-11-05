<template>
  <modelFull :title="$t('page.text63')" class="fixd-wrap">
    <div v-if="$lang == 'en'">
      <img src="@/assets/img/2_4/1@qb_en.png" alt />
      <img src="@/assets/img/2_4/2@qb_en.png" alt />
      <img src="@/assets/img/2_4/3@qb_en.png" alt />
    </div>
    <div v-else>
      <img src="@/assets/img/2_4/1@qb.png" alt />
      <img src="@/assets/img/2_4/2@qb.png" alt />
    </div>
  </modelFull>
</template>
<script>
import modelFull from "element/model-full";
import { mapGetters } from "vuex";

export default {
  components: {
    modelFull
  }
};
</script>
<style lang="less" scoped>
img {
  width: 100%;
}
</style>
