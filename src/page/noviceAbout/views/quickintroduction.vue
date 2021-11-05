<template>
  <modelFull
    :title="$lang == 'en' ? itemDetail.titleEn : itemDetail.title"
    class="fixd-wrap"
  >
    <div v-if="$lang == 'en'" class="quickintrod">
      <img
        v-for="(item, index) in itemDetail.contentImgEn"
        :key="index"
        :src="getimagepath + item"
      />
      <!-- <img src="@/assets/img/2_4/enquick03.jpg" />
      <img src="@/assets/img/2_4/enquick04.jpg" />
      <img src="@/assets/img/2_4/enquick05.jpg" />
      <img src="@/assets/img/2_4/enquick06.jpg" />
      <img src="@/assets/img/2_4/enquick07.jpg" />
      <img src="@/assets/img/2_4/enquick08.jpg" />
      <img src="@/assets/img/2_4/enquick09.jpg" /> -->
    </div>
    <div v-else>
      <img
        v-for="(item, index) in itemDetail.contentImg"
        :key="index"
        :src="getimagepath + item"
      />
      <!-- <img src="@/assets/img/2_4/quick02.jpg" />
      <img src="@/assets/img/2_4/quick03.jpg" />
      <img src="@/assets/img/2_4/quick04.jpg" />
      <img src="@/assets/img/2_4/quick05.jpg" />
      <img src="@/assets/img/2_4/quick06.jpg" />
      <img src="@/assets/img/2_4/quick07.jpg" />
      <img src="@/assets/img/2_4/quick08.jpg" /> -->
    </div>
  </modelFull>
</template>
<script>
import modelFull from "element/model-full";

export default {
  components: {
    modelFull
  },
  computed: {
    getimagepath() {
      if (!this.imageUrl) this.imageUrl = localStorage.getItem("imageUrl");
      return this.imageUrl ? this.imageUrl : localStorage.getItem("imageUrl");
    }
  },
  data() {
    return {
      itemDetail: null,
      imageUrl: localStorage.getItem("imageUrl")
    };
  },
  created() {
    this.itemDetail = JSON.parse(localStorage.getItem("novicedetail"));
    document.title = "新手必看";
  }
};
</script>
<style lang="less" scoped>
img {
  width: 100%;
  margin-top: -1px;
}
</style>
