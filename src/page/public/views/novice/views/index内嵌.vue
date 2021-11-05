
<template>
  <model-full :title="title" class="model">
    <div class="main_page">
      <iframe
        scrolling="yes"
        id="main"
        name="main"
        frameborder="0"
        :src="getNewguideUri"
        style="width:100%;height:100%;"
        ref="iframe"
        title="1111"
      ></iframe>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import { mapGetters } from "vuex";
import busVue from "@js/bus";
export default {
  components: {
    ModelFull
  },
  data() {
    return {
      oHeight: 0,
      title: "指引问答"
    };
  },
  computed: {
    ...mapGetters({
      getNewguideUri: "user/getNewguideUri"
    })
  },
  methods: {
    click(ev) {
      console.log(ev);
    }
  },
  mounted() {
    window.name = "能看见吗";
    console.log(window);
    let _this = this;
    let iframe = document.getElementById("main");

    busVue.$on("onload", () => {
      // console.log(iframe.contentWindow.document.head);
      let x = iframe.contentWindow;
      // console.log(x.getElementsByTagName("title"));

      // _this.title =  x.getElementsByTagName('title')
    });
    this.oHeight = document.body.clientHeight - 57;
    if (iframe.attachEvent) {
      iframe.attachEvent("onload", function() {
        // IE
        busVue.$emit("onload");
      });
    } else {
      iframe.onload = function() {
        // 非IE
        busVue.$emit("onload");
      };
    }
  }
};
</script>
<style lang="less" scoped>
.model {
  height: 100%;
  .main_page {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    width: 100%;
    height: 100%;
  }
}
</style>

