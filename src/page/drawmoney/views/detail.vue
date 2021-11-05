<template>
  <model-full :preventGoBack="true" class="fixd-wrap" @prev="goback" :title="$t('page.text55')">
    <div class="result-success">
      <div class="content">
        <div class="top">
          <img src="@img/icon_xz@3x.png" alt="" />
          <p>{{$t('page.text56')}}</p>
        </div>
        <div class="btn" @click="$router.push({path:'/putrecord'})">
          {{$t('page.text57')}}
        </div>
      </div>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
export default {
  components: {
    ModelFull
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
