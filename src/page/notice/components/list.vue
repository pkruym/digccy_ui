<template>
  <div class="list-box line05">
    <div class="list-info">
      <div class="list-info-title">
        <div class="list-info-title-left">
          {{ $lang == "en" ? item.titleEnglish : item.title }}
        </div>
        <div class="list-info-title-right">{{ item.start }}</div>
      </div>
      <div class="desc">
        <div v-html="$lang == 'en' ? item.contentEnglish : item.content"></div>
        <p class="more" v-if="!item.isMore" @click="openMore(item)">
          {{ $t("setText.more") }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      }
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      clampValue: 4
    };
  },
  methods: {
    openMore(item) {
      this.$emit("openMore", item);
    }
  }
};
</script>
<style lang="less" scoped>
.list-box {
  margin-bottom: 0.2rem;
  padding: 0.3rem 0.2rem 0.28rem 0.36rem;
  position: relative;
  .list-info {
    .list-info-title {
      display: flex;
      color: @txtColor;
      align-items: center;
      .list-info-title-left {
        flex: 1;
        position: relative;
        span {
          display: block;
          position: absolute;
          left: -0.2rem;
          top: 0.1rem;
          width: 0.16rem;
          height: 0.16rem;
          background: @Red;
          border-radius: 50%;
        }
      }
      .list-info-title-right {
        flex: 1;
        text-align: right;
        font-size: 0.24rem;
      }
    }
  }
  .desc {
    color: @txtColor;
    font-size: 14px;

    .is-more {
      height: 1.9rem;
      overflow: hidden;
      font-size: 14px;
    }
    .more {
      text-align: right;
      color: @blueColor;
    }
  }
}
</style>
