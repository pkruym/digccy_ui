<template>
  <!-- <model-full :showBack="false" title="资讯"> -->
  <div class="main_page">
    <news-header></news-header>
    <iframe class="ck" scrolling="yes" id="main" name="main" frameborder="0" src="http://www.jin10.com/example/jin10.com.html"></iframe>
  </div>
  <!-- </model-full> -->
</template>
<script>
import ModelFull from "element/model-full";
import newsHeader from '../../header/newsHeader'
export default {
  components: {
    newsHeader
  },
  methods: {
    tabClick(item) {
      this.$router.push(item.path);
    }
  },
  mounted() {
    function calcPageHeight(doc) {
      var cHeight = Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
      var sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight)
      var height = Math.max(cHeight, sHeight)
      return height
    }
    //根据ID获取iframe对象
    var ifr = document.getElementById('main')
    ifr.onload = function () {
      //解决打开高度太高的页面后再打开高度较小页面滚动条不收缩
      ifr.style.height = '0px';
      var iDoc = ifr.contentDocument || ifr.document
      var height = calcPageHeight(iDoc)
      if (height < 1050) {
        height = 1050;
      }
      ifr.style.height = height + 'px'
    }
  }
};
</script>

<style lang="less" scoped>
.ck {
  width: 100%;
}
</style>
<style>
.main_page .ck {
  height: calc(100vh - 2.3rem) !important;
}
</style>

