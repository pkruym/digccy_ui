<template>
  <!-- <model-full :showBack="false" title="资讯"> -->
  <div class="main_page">
    <news-header></news-header>
    <iframe
      scrolling="yes"
      id="main"
      name="main"
      frameborder="0"
      :src="liveUrl"
      style="min-height: 1050px; width: 100%; height: 100%; margin-bottom: 60px"
    ></iframe>
  </div>
  <!-- </model-full> -->
</template>
<script>
import ModelFull from "element/model-full";
import newsHeader from "../header/newsHeader";
export default {
  components: {
    newsHeader
  },
  data() {
    return {
      liveUrl: ""
    };
  },
  methods: {
    tabClick(item) {
      this.$router.push(item.path);
    },
    getUrl() {
      const _this = this;
      this.scoketApi.sendSock(
        {
          moduleId: 15,
          cmdId: 6,
          data: {
            type: 1,
            enable: true
          }
        },
        function(res) {
          console.log(res);
          _this.liveUrl = res.result[0].url;
          // _this.callBack(res);
        }
      );
    }
  },
  mounted() {
    function calcPageHeight(doc) {
      var cHeight = Math.max(
        doc.body.clientHeight,
        doc.documentElement.clientHeight
      );
      var sHeight = Math.max(
        doc.body.scrollHeight,
        doc.documentElement.scrollHeight
      );
      var height = Math.max(cHeight, sHeight);
      return height;
    }
    //根据ID获取iframe对象
    var ifr = document.getElementById("main");
    ifr.onload = function() {
      //解决打开高度太高的页面后再打开高度较小页面滚动条不收缩
      ifr.style.height = "0px";
      var iDoc = ifr.contentDocument || ifr.document;
      var height = calcPageHeight(iDoc);
      if (height < 1050) {
        height = 1050;
      }
      ifr.style.height = height + "px";
    };
    this.getUrl();
  }
};
</script>
