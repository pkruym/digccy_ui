<template>
  <div class="main_page fixd-wrap">
    <!-- <div v-if="$lang == 'en'" class="novice-main">
      <router-link tag="div" to="/quickintroduction" class="novice-list-info">
        <img src="@/assets/img/2_4/img_jieshao@2x_en.png" alt srcset />
      </router-link>
      <router-link tag="div" to="/mustsee" class="novice-list-info">
        <img src="@/assets/img/2_4/ing_rhkh@2x_en.png" alt srcset />
      </router-link>
      <router-link tag="div" to="/jiaoyi" class="novice-list-info">
        <img src="@/assets/img/2_4/img_chongzhi@2x_en.png" alt srcset />
      </router-link>
      <router-link tag="div" to="/rujin" class="novice-list-info">
        <img src="@/assets/img/2_4/img_rhjiaoyi@2x_en.png" alt srcset />
      </router-link>
      <router-link tag="div" to="/qubie" class="novice-list-info">
        <img src="@/assets/img/2_4/img_ggjy_en@2x.png" alt srcset />
      </router-link>
    </div> -->
    <div class="novice-main">
      <div @click="goDetail(item)" v-for="(item,index) in coverList" :key="index" class="novice-list-info">
        <img :src="getimagepath+($lang=='en'?item.coverImgEn:item.coverImg)" alt srcset />
      </div>
      <!-- <router-link tag="div" to="/mustsee" class="novice-list-info">
        <img src="@/assets/img/2_4/ing_rhkh@2x.png" alt srcset />
      </router-link>
      <router-link tag="div" to="/jiaoyi" class="novice-list-info">
        <img src="@/assets/img/2_4/img_chongzhi@2x.png" alt srcset />
      </router-link>
      <router-link tag="div" to="/rujin" class="novice-list-info">
        <img src="@/assets/img/2_4/img_rhjiaoyi@2x.png" alt srcset />
      </router-link>
      <router-link tag="div" to="/qubie" class="novice-list-info">
        <img src="@/assets/img/2_4/img_ggjy_cn@2x.png" alt srcset />
      </router-link> -->
    </div>
    <div class="line8"></div>
    <div class="problem-title line05">{{ $t("index.problem") }}</div>

    <List v-for="(item, index) in list" :item="item" :index='index' :key="index"></List>
  </div>
</template>
<script>
import List from "./../components/List";
import { mapActions } from "vuex";

export default {
  components: {
    List,
  },
  computed: {
        getimagepath() {
      if (!this.imageUrl) this.imageUrl = localStorage.getItem("imageUrl");
      return this.imageUrl ? this.imageUrl : localStorage.getItem("imageUrl");
    },
  },
  data() {
    return {
      list: [],
      coverList: [],
      imageUrl: localStorage.getItem("imageUrl"),
    };
  },
  async mounted() {
    await this.getHelpImageGuide({symbol:'huobi'}).then((res) => {
      this.coverList = res;
    });
    await this._getHelpProblem();
    // let newlist = [];
    // let wen = 42;
    // let da = 43;
    // let idx = 0;
    // for (let index = 0; index < 27; index++) {
    //   wen += 2;
    //   da += 2;
    //   let number = index + 1;
    //   if (idx != 0) {
    //     number = idx + 1;
    //     idx = index;
    //   }
    //   if (this.$t("index.text" + wen) !== "") {
    //     let notice = {
    //       title: number + "：" + this.$t("index.text" + wen),
    //       content: this.$t("index.text" + da),
    //     };
    //     newlist.push(notice);
    //   } else {
    //     idx = index;
    //   }
    // }
    // this.list = newlist;
  },
  methods: {
    ...mapActions({
      getHelpImageGuide: "system/system/getHelpImageGuide",
      getHelpProblem: "system/system/getHelpProblem",
    }),

    _getHelpProblem() {
      this.getHelpProblem({symbol:'huobi'}).then((res) => {
        this.list = res;
      });
    },
    goDetail(item) {
      item.contentImg = item.contentImg.split(',')
      item.contentImgEn = item.contentImgEn.split(',')
      localStorage.setItem('novicedetail', JSON.stringify(item));
      this.$router.push('/quickintroduction')
    }
  },
};
</script>
<style lang="less" scoped>
.line8 {
  height: 0.16rem;
  width: 100%;
  background-color: #fefffe;
}
.main_page {
  box-sizing: border-box;
  // background: #1c2630;
  .novice-main {
    padding: 0.4rem 0.4rem 0 0.4rem;
  }
  .novice-list-info {
    margin-bottom: 0.2rem;
    img {
      width: 100%;
    }
  }
  .problem-title {
    padding: 0.32rem 0.3rem 0.24rem;
    font-size: 0.28rem;
    color: @txtColor;
    position: relative;
  }
}
</style>
