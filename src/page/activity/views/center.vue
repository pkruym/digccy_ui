<template>
  <model-full class="fixd-wrap" :title="$t('common.activityCenter')">
    <centerMain></centerMain>
  </model-full>
</template>
<script>
import centerMain from "./centerMain";
export default {
  components: {
    centerMain
  }
};
</script>
