<template>
  <model-full title="公告详情" class="body">
    <div class="announcement-detail">
      <header>
        <label>1月5日周末凌晨强平通知公告点击查看</label>
        <p>
          <span>Huobi Lite</span>
          <time>01-09 09:22</time>
        </p>
      </header>
      <main>
        <label>尊敬的用户:</label>
        <p>
          周末将至，为了避免在休盘期产生的跳空，所以交易品种不支持持仓过周末的原指放书的桌子，后来指在桌子上写字的人。
        </p>

        <p>
          现在指的是公司或企业中从事文字工作的职位，就是以文字来表现已经制定的创意策略。
          文案它不同于设计师用画面或其他手段的表现手法，它是一个与广告创意先后相继的表现的过程、发展的过程、深化的过程，
          多在于广告公司，企业宣传，新闻策划等。
        </p>
        <p>
          周末将至，为了避免在休盘期产生的跳空，所以
          交易品种不支持持仓过周末的原指放书的桌子， 后来指在桌子上写字的人。
        </p>
      </main>
    </div>
  </model-full>
</template>

<script>
import ModelFull from "element/model-full";
export default {
  components: {
    ModelFull
  }
};
</script>

<style lang="less" scoped>
.announcement-detail {
  //   width: 6.9rem;
  margin: 0 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 15px;
  //   height: calc(100vh - 57px);
  header {
    padding: 0.24rem 0 0.32rem;
    border-bottom: 1px solid rgb(232, 232, 232);
    label {
      display: block;
      font-size: 0.36rem;
      color: rgb(51, 51, 51);
      margin-bottom: 0.3rem;
      // font-weight: normal;
      font-weight: 700;
    }
    p {
      font-size: 0.24rem;
      color: rgb(173, 179, 193);
      span {
        font-size: 0.24rem;
      }
    }
    time {
      font-size: 0.24rem;
      color: rgb(173, 179, 193);
    }
  }
  main {
    padding-top: 0.33rem;
    font-size: 0.28rem;
    color: rgb(36, 48, 73);
    label {
      display: block;
      margin-bottom: 0.26rem;
    }
    p {
      line-height: 0.56rem;
      margin-bottom: 0.4rem;
    }
  }
}
</style>
<style>
.announcement-detail {
  height: calc(100vh - 57px);
}
</style>
