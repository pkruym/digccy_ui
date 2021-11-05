<template>
  <el-timeline class="time-line" :class="{'left':placement == 'left'}">
    <!-- <el-timeline-item timestamp="2018/4/12" :placement="placement">
      <div class="title">风波不断黄金却走势淡定</div>
      <p
        :class="{'single-content':singleContent,'much-content':!singleContent}"
      >在国际贸易冲突爆发日渐频繁的今天，黄势却在国际贸易冲突爆发日渐频繁的今天，黄舒服sdfslfkjslfjlskjf势却是slkdfjlkasjdfklasjklfjaslkfjlaskjdfkljfklsjdl的…</p>
      <div class="remarks">Remarks</div>
    </el-timeline-item>-->
    <el-timeline-item
      v-for="val in cptList"
      :timestamp="val.strTimeRelease"
      :key="val.id"
      :placement="watchPlacement"
    >
      <!-- :timestamp="val.strTimeRelease.slice(0,5)" -->
      <!-- <div class="title">{{val.title}}</div> -->
      <p :class="{'single-content':singleContent,'much-content':!singleContent}">{{val.content}}</p>
      <!-- <div class="remarks" v-if="val.remarks && val.remarks != ''">{{val.remarks}}</div> -->
    </el-timeline-item>
  </el-timeline>
</template>


<script>
export default {
  props: {
    list: {
      type: [Array, Object],
      default: () => []
    },
    placement: {
      default: "bottom",
      type: String
    },
    singleContent: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      watchPlacement: ""
    };
  },
  watch: {
    placement: {
      handler(to) {
        this.watchPlacement = to;
        if (to == "left") {
          this.watchPlacement = "top";
        }
      },
      immediate: true
    }
  },
  computed: {
    cptList() {
      let list = this.list;
      for (let i = 0; i < list.length; i++) {
        list[i].strTimeRelease = (list[i].strTimeRelease + "").slice(0, 5);
      }
      return list;
    },
    todayData() {
      return new Date();
    }
  }
};
</script>

<style lang="less" scoped>
.time-line {
  &.left {
    /deep/.el-timeline-item {
      margin-left: 0.8rem;
      .el-timeline-item__timestamp {
        position: absolute;
        left: -0.8rem;
        top: 0.02rem;
      }
    }
  }
  /deep/.el-timeline-item {
    padding-bottom: 0.6rem;
    &:last-child {
      padding-bottom: 0;
      .el-timeline-item__tail {
        display: block;
      }
    }

    .el-timeline-item__timestamp {
      font-size: 0.24rem;
      color: @darkSkyBlue;
    }
    .el-timeline-item__tail {
      border: 1px solid @darkSkyBlue;
      transform: translateY(-3px);
      opacity: 0.5;
    }
    .el-timeline-item__node {
      width: 7px;
      height: 7px;
      left: 1px;
      top: 3px;
      background: radial-gradient(circle, @darkSkyBlue, #ffffff);
    }
    .el-timeline-item__content {
      color: #687284;
      .title {
        font-size: 18px;
        margin-bottom: 6px;
      }
      p {
        &.single-content {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &.much-content {
          line-height: 0.4rem;
          word-wrap: break-word;
          font-size: 0.28rem;
        }
      }
      .remarks {
        margin-top: 10px;
      }
    }
  }
}
</style>
