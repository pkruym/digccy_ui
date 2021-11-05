<template>
  <model-full title="选择国家或地区" class="areacode main_page ">
    <MyUl
      v-for="(itme, key) in areaCode"
      :class="key"
      :item="itme"
      :key="key"
    ></MyUl>
    <Aside :list="cptAsideList" @click="jump"></Aside>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import { mapActions, mapGetters } from "vuex";
import areaCode from "@/assets/componentsJs/areaCode";
import MyUl from "../components/MyUL";
import Aside from "../components/Aside";
import { jump } from "@/assets/componentsJs/scrollTop";
export default {
  components: {
    ModelFull,
    MyUl,
    Aside
  },
  data() {
    return {
      areaCode: areaCode
    };
  },
  computed: {
    cptAsideList() {
      let list = [];
      let obj = this.areaCode;
      list = Object.keys(obj);
      list[0] = "热门";
      return list;
    }
  },
  methods: {
    jump(key) {
      this.$vux.toast.show({
        time: 1000,
        text: key,
        position: "top",
        type: "text"
      });
      if (key == "热门") {
        key = "hot";
      }
      jump(`.${key}`);
    }
  }
};
</script>

<style lang="less" scoped></style>
