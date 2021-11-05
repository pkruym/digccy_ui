<template>
  <model-full :title="$t('my.setting.text59')" class="model fixd-wrap">
    <!-- <span slot="right" @click="save" class="right">保存</span> -->
    <div class="language">
      <div
        class="li line05"
        v-for="(item, index) in list"
        :key="index"
        @click="setLanguage(item, index)"
      >
        <div class="btn-name">{{ item.name }}</div>
        <div class="gou" :class="selectId == item.id ? 'choose' : ''"></div>
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
  data() {
    return {
      config,
      selectId: 1,
      list: [
        // {
        //   id: 1,
        //   name: "自动(Auto)",
        //   value: 'auto'
        // },
        {
          id: 2,
          name: "中文简体",
          value: "zh"
        },
        {
          id: 3,
          name: "English",
          value: "en"
        }
      ]
    };
  },
  mounted() {
    let enDomain = config.domainEn;
    this.selectId = this.$lang == "en" ? 3 : 2;
  },
  methods: {
    save() {},
    setLanguage(item) {
      if (this.selectId === item.id) return;
      this.selectId = item.id;
      // let domain = "";
      // const env = config.env;
      // const host = config.host;
      // if (item.value === "en") {
      //   domain = config.domainEn;
      // } else {
      //   domain = config.domain;
      // }
      localStorage.setItem("language", item.value);

      if (window.appInterface) {
        //
        this.$nextTick(r => {
          this.$router.push({ path: "/" });
          window.appInterface.reloadPage();
        });
      } else {
        //
        this.$nextTick(r => {
          this.$router.push({ path: "/" });
          window.location.reload();
        });
      }
      // let url = domain.indexOf('?') > 0 ? (domain + '&lang=' + item.value) : (domain + '?lang=' + item.value)
      // window.location.replace(url)
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.model {
  /deep/ .vux-header-right {
    span {
      color: rgb(3, 173, 143);
    }
  }
  .language {
    .li {
      padding: 0 0.3rem;
      display: flex;
      align-items: center;
      height: 1rem;
      position: relative;

      .btn-name {
        margin-right: 0.2rem;
        color: @txtColor;
      }
      .gou {
        margin-left: auto;
        width: 0.32rem;
        height: 0.32rem;
        &.choose {
          background-position: center;
          background-size: contain;
          background-image: url("~@/assets/img/icoWdSzGouxuan@2x.png");
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>
