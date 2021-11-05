<template>
  <div class="Notice flex">
    <i :class="$lang == 'en' ? 'entitle' : 'title'"></i>
    <div v-show="noticeList && noticeList.length">
      <div ref="ul" class="ul flex">
        <PaoMaDeng :delay="0.5" :speed="30" :content="noticeList">
          <div
            class="li flex noticeli"
            v-for="(val, index) in noticeList"
            :key="index"
          >
            <span>{{ val.mobilephone }}</span>
            <span>{{ `${val.symbol}` }}</span>
            <span>{{
              (val.direct == "BUY" ? $t("index.text40") : $t("index.text41")) +
                val.volume
            }}</span>
            <span class="green"
              >{{ $t("index.text42") }}{{ val.profit
              }}{{ Currency.Symbol }}</span
            >
          </div>
        </PaoMaDeng>
      </div>
    </div>
  </div>
</template>
<script>
import PaoMaDeng from "heyushuo-marquee";
import { mapGetters } from "vuex";

export default {
  props: {
    noticeList: {
      default: []
    }
  },
  components: {
    PaoMaDeng
  },
  data() {
    return {
      text: "",
      ulWidth: 0,
      timer: ""
      // swiperOption: {
      //   speed: 15000, //匀速时间
      //   loop: true,
      //   // autoplay: true,
      //   autoplay: {
      //     delay: 0,
      //     stopOnLastSlide: false,
      //     disableOnInteraction: false
      //   },
      //   slidesPerView: 1,
      //   pagination: {
      //     clickable: true,
      //     type: "bullets"
      //   }
      // }
    };
  },
  computed: {
    ...mapGetters({
      transactionDynamics: "actual/order/transactionDynamics"
    }),
    cptLast() {
      if (this.noticeList.length > 0) {
        let val = this.noticeList[this.noticeList.length - 1];
        return val;
      } else {
        return {
          mobilephone: "",
          commodityNo: "",
          contractNo: "",
          direct: "",
          volume: "",
          profit: ""
        };
      }
    }
  }
};
</script>
<style lang="less" scoped>
.Notice {
  padding: 0 !important;
  align-items: center;
  display: flex;
  flex-direction: row;
  .title {
    display: block;
    width: 1.22rem;
    height: 0.26rem;
    background: url("~@/assets/img/2_0/ico_sy_jiaoyidongtai@2x.png") no-repeat
      100% / cover;
    margin-left: 0.2rem;
  }
  .entitle {
    display: block;
    width: 1.22rem;
    height: 0.26rem;
    background: url("~@/assets/img/2_0/enico_sy_jiaoyidongtai@2x.png") no-repeat;
    background-size: contain;
    margin-left: 0.2rem;
  }
  > span {
    font-size: 0.24rem;
    margin: 0 0.16rem 0 0.1rem;
    display: block;
    height: 0.24rem;
    width: 0.04rem;
    background-color: @pink2Standard;
  }
  > div {
    width: 4.92rem;
    margin-left: 0.24rem;
    overflow: hidden;
    .ul {
      align-items: center;
      /deep/.wrap {
        background: @bodyBg;
        .content {
          display: flex;
          flex-direction: row;
          margin-right: 0.05rem;
        }
      }
      .li {
        align-items: center;
        flex-wrap: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
        span {
          white-space: nowrap;
          margin-right: 0.1rem;
          font-size: 0.24rem;
          color: @txtColor;
        }
      }
    }
  }
}
</style>
