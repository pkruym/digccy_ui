<template>
  <model-full :title="$t('my.feedback.title')" class="fixd-wrap">
    <div class="feedback">
      <header class="header__feed flex">
        <i></i>
        <div>
          <p>{{ $t("my.feedback.text1") }}</p>
          <p>{{ $t("my.feedback.text2") }}</p>
        </div>
      </header>
      <div class="main_content">
        <p>{{ $t("my.feedback.text3") }}</p>
        <textarea
          name="feedback-text"
          class="feedback-text"
          v-model="textValue"
          :placeholder="$t('my.feedback.text4')"
        ></textarea>
      </div>
      <footer class="footer__feed">
        <base-button @clickEvent="_feedback">{{
          $t("my.feedback.text5")
        }}</base-button>
      </footer>
    </div>
  </model-full>
</template>

<script>
import ModelFull from "element/model-full";
import BaseButton from "@/components/element/base-radiu-button";
import { mapActions } from "vuex";

export default {
  components: {
    ModelFull,
    BaseButton
  },
  data() {
    return {
      textValue: ""
    };
  },

  methods: {
    ...mapActions({
      feedbackCreate: "user/feedbackCreate"
    }),
    _feedback() {
      let content = this.textValue;
      if (!content) {
        this.$vux.toast.text(this.$t("my.feedback.text6"), "middle");
        return;
      }
      this.feedbackCreate({ content })
        .then(res => {
          this.$vux.toast.text(this.$t("my.feedback.text7"), "middle");
          if (window.history.length > 2) {
            this.$router.go(-1);
          } else {
            this.$router.push({ path: "/ower" });
          }
        })
        .catch(e => {
          this.$vux.toast.text(e, "middle");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.header__feed {
  height: 1.98rem;
  background-color: @blueColor;
  align-items: center;
  i {
    display: block;
    width: 1.04rem;
    height: 0.86rem;
    background: url("~@/assets/img/1_9/ico-yjfk@2x.png") 100% 100% / cover;
    margin: 0 0.24rem 0 0.46rem;
  }
  > div {
    p:first-child {
      color: #e0ecf7;
      font-size: 0.32rem;
      margin-bottom: 0.04rem;
    }
    p:nth-child(2) {
      font-size: 0.28rem;
      color: #e0ecf7;
    }
  }
}
.main_content {
  height: 4.28rem;
  // border-top: 10px solid #1c2630;
  // background: #1c2630;
  padding: 0.16rem 0;
  p {
    color: @txtColor;
    font-size: 0.32rem;
    padding: 0.32rem;
  }
  .feedback-text {
    resize: none;
    width: 100%;
    padding: 0 0.32rem 0.16rem;
    border-width: 0px;
    color: @txtColor;
    background: @bodyBg;
    font-size: 0.28rem;
    line-height: 0.4rem;
  }
}
.footer__feed {
  margin-top: 0.6rem;
  width: 100%;
  button {
    width: 6.7rem !important;
    margin: 0 auto;
    display: block;
    background: @blueColor;
    border-radius: 0.1rem;
  }
}
</style>

<style>
.feedback-text {
  height: calc(100% - 0.64rem);
}
</style>
