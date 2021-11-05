<template>
  <div class="success-box">
    <div class="content">
      <div class="title">{{ cptTitle }}</div>
      <time>{{ cptTime || "我是时间" }}</time>
      <div class="success-text">
        <div class="flex real" v-html="cptData"></div>
      </div>
    </div>
    <div class="btn" @click="close">{{ cptBtnTxt }}</div>
  </div>
</template>
<script>
import btn from "element/base-confrim-button";
import busVue from "@js/bus";

export default {
  components: {
    btn
  },
  props: {
    propsData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      name: "",
      averagePrice: 0,
      pushData: {
        id: ""
      }
    };
  },
  computed: {
    cptTitle() {
      return this.propsData.title;
    },
    cptData() {
      return this.propsData.data.content;
    },
    cptTime() {
      return this.propsData.data.sendTime || this.propsData.data.time;
    },
    cptPath() {
      return this.propsData.path;
    },
    cptBtnTxt() {
      return this.propsData.btnTxt;
    }
  },
  methods: {
    close() {
      if (this.cptPath) {
        this.$router.push(this.cptPath);
      }
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
.success-box {
  // padding: 0.2rem 0.5rem 0.4rem 0.5rem;
  .title {
    font-size: 0.32rem;
    text-align: center;
    color: @battleshipGrey;
    // padding-bottom: 0.08rem;
    // border-bottom: 1px solid @silver;
  }
  .content {
    padding: 0.4rem 0.4rem 0;
  }
  time {
    display: block;
    font-size: 0.2rem;
    color: @battleshipGrey;
    text-align: center;
  }

  .btn {
    font-size: 0.32rem;
    padding: 0.21rem 0 0.22rem;
    color: @battleshipGrey;
    text-align: center;
    border-top: 0.01rem solid rgb(238, 238, 238);
  }

  .tips {
    font-size: 0.2rem;
    color: @battleshipGrey;
  }
  .success-text {
    margin-top: 0.2rem;

    p {
      color: @battleshipGrey;
      font-size: 0.28rem;
      // padding-left: 0.8rem;
      text-align: center;

      &:nth-of-type(2) {
        margin-top: 0.3rem;
        margin-bottom: 0.12rem;
      }
    }
    .real {
      margin-top: 0.08rem;
      justify-content: center;
      align-items: center;
      font-size: 0.28rem;
      color: @battleshipGrey;
      margin-bottom: 0.12rem;
    }
  }
}
</style>
