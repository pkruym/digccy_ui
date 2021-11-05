<template>
  <div id="detail" class="fixd-wrap">
    <ModelFull :title="item | titleFilter">
      <div class="detail-info">
        <div class="title">{{ item.title }}</div>
        <div class="banner"></div>
        <div class="detail-text" v-html="item.content"></div>
        <div class="footer-text">
          <p>版权信息：</p>
          <!-- <p>来源：新华日报</p> -->
          <p>
            免责声明：转载此文为传递更多市场信息，不代表我们的观点和立场，请自行参考。
          </p>
        </div>
        <!-- <div class="see-num">阅读量 1230</div> -->
      </div>
    </ModelFull>
  </div>
</template>
<script>
import ModelFull from "element/model-full";

export default {
  components: {
    ModelFull
  },
  filters: {
    titleFilter(item) {
      switch (item.type) {
        case "DIGICCY_HEADLINES_NEWS":
          return "头条";
          break;
        case "DIGICCY_DAILY_NEWS":
          return "要闻";
          break;
        case "DIGICCY_INDUSTRY_NEWS":
          return "产业";
          break;
        case "DIGICCY_TECHNOLOGY_NEWS":
          return "技术";
          break;
        case "DIGICCY_DEVELOPMENT_NEWS":
          return "投研";
          break;
        default:
          return "新闻";
          break;
      }
    }
  },
  data() {
    return {
      item: null
    };
  },
  created() {
    // console.log(this.$route)
    this.item = JSON.parse(sessionStorage.getItem("celueItem"));
    // console.log(this.data)
  }
};
</script>
<style lang="less" scoped>
#detail {
  width: 100%;
  height: 100%;
  padding-bottom: 2rem;
  background: @bodyBg;
  position: absolute;
  overflow: scroll;
  top: 0;
  left: 0;
  .detail-info {
    padding: 0.32rem;
    .title {
      color: @lightBlueGreyTwo;
      font-size: 0.32rem;
    }
    .banner {
      width: 100%;
      margin: 0.24rem 0;
    }
    .detail-text {
      text-indent: 2em;
      color: @lightBlueGreyTwo;
      font-size: 0.24rem;
      line-height: 0.5rem;
      /deep/ p {
        color: @lightBlueGreyTwo;
        font-size: 0.24rem;
        line-height: 0.5rem;
      }
      /deep/ img {
        width: 100%;
      }
    }
    .footer-text {
      margin-top: 0.24rem;
      p {
        font-size: 0.2rem;
        color: @battleshipGrey;
        &:nth-of-type(1) {
          font-size: 0.24rem;
          margin-bottom: 0.1rem;
        }
      }
    }
    .see-num {
      font-size: 0.24rem;
      color: rgb(74, 116, 123);
      margin-top: 0.1rem;
      text-align: right;
    }
  }
}
</style>
