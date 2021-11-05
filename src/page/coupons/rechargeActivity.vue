<template>
  <model-full :showheader="!($route.query.phone)" :title="$t('coupons.activityrechargeTitle')" :class="$route.query.phone?'fixd-wrap fixd-wrap-recharge':'fixd-wrap'">
    <div class="activity">
      <div class="desc">{{ $t("coupons.activityrechargeDesc") }}</div>

      <div class="activity-banner">
        <!-- <img v-if="$lang == 'en'" src="@img/rechargecouactivity.png" alt />
        <img v-else src="@img/rechargecouactivity.png" alt /> -->
        <img v-if="$lang == 'en'" src="@img/22@yearen.png" alt />
        <img v-else src="@img/2@yearzh.png" alt />
      </div>
      <div class="time">
        <div class="time-left">{{ $t("coupons.activityTimeLable") }}</div>
        <div class="time-right">
          <p>{{ $t("coupons.rechargTime") }}</p>
          <!-- <p>{{$t('coupons.activityTimeValue2')}}</p> -->
        </div>
      </div>
      <div class="activity-rules">
        <p>{{ $t("coupons.activityInner") }}</p>

        <div class="table-list">
          <img v-if="$lang == 'en'" src="@img/2_8/img_guizetu_en@2x.png" alt />
          <img v-else src="@img/2_8/img_guizetu@2x.png" alt />
        </div>

        <div class="tips">
          <p>
            <span>1.</span>
            <span>{{ $t("coupons.acticityrechargeRules1") }}</span>
          </p>

          <p>
            <span>2.</span>
            <span>{{ $t("coupons.acticityrechargeRules2") }}</span>
          </p>
          <p>
            <span>3.</span>
            <span>{{ $t("coupons.acticityrechargeRules3") }} </span>
          </p>
          <p></p>
          <p>
            <span>4.</span>
            <span>{{ $t("coupons.acticityrechargeRules4") }} </span>
          </p>
          <p>
            <span>5.</span>
            <span>{{ $t("coupons.acticityrechargeRules5") }}</span>
          </p>
          <p>
            <span>6.</span>
            <span>{{ $t("coupons.acticityrechargeRules6") }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="flex-btn" v-if="$route.query.token ? false : !isLogin" @click="register">
      {{ $t("coupons.register") }}
    </div>
    <div class="flex-btn" v-if="$route.query.token ? true : isLogin" @click="recharge">立即充值</div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import { mapGetters } from "vuex";

export default {
  components: {
    ModelFull
  },
  computed: {
    ...mapGetters({
      isLogin: "user/isLogin"
    })
  },
  methods: {
    register() {
      if (this.$route.query.phone) {
        if (window.webkit) {
          window.webkit.messageHandlers.toRegister.postMessage({});
        }
        if (window.appInterface) {
          window.appInterface.toRegister({});
        }
      } else {
        this.$router.push("/register");
      }
    },
    recharge() {
      if (this.$route.query.phone) {
        if (window.webkit) {
          window.webkit.messageHandlers.toRecharge.postMessage({});
        }
        if (window.appInterface) {
          window.appInterface.toRecharge({});
        }
      } else {
        let path = "";
        const is_rember = localStorage.getItem("is_rember");
        if (is_rember && is_rember == 1) {
          path = "/drawmoney/index";
        } else {
          path = "/instructions"; // 跳到充值须知页面
        }
        this.$router.push(path);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.fixd-wrap-recharge {
  padding-top: 0rem;
  height: 100%;
}
.flex-btn {
  width: 6.9rem;
  height: 0.8rem;
  background: @activityBtnBg;
  border-radius: 2px;
  color: @offWhite;
  text-align: center;
  line-height: 0.8rem;
  position: fixed;
  bottom: 0.2rem;
  left: 50%;
  margin-left: -3.45rem;
}
.activity {
  padding: 0.3rem 0.3rem 1.2rem 0.3rem;
  .desc {
    font-size: 20px;
    color: @activityColor;

    font-weight: 600;
  }
  .time {
    display: flex;
    font-weight: 600;
    // margin: 0.4rem 0 0.3rem 0;
    flex-direction: column;
    color: @activityTime;
    .time-left,
    p {
      font-size: 15px;
    }
    .time-left {
      color: @txtColor;
    }
  }

  .activity-banner {
    width: 100%;
    margin: 0.1rem 0 0.3rem 0;
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  .activity-rules {
    margin-top: 0.3rem;
    .service {
      color: @activityBtnBg;
      text-decoration: underline;
    }
    .table-list {
      margin: 0.3rem 0;

      width: 100%;
      img {
        width: 100%;
      }
    }
    .tips {
      p {
        font-size: 14px;
        color: @activityColor;
        display: flex;
        margin-bottom: 0.1rem;
        .txt2 {
          margin-top: 5px;
          color: @txt2Color;
        }

        span {
          font-family: 'PingFangSC-Regular' !important;
          i {
            color: #ff0030;
          }
          &:nth-of-type(1) {
            margin-top: 0.04rem;
            margin-right: 0.06rem;
          }
        }
        &:nth-of-type(1) {
          margin-bottom: 0.16rem;
        }
        table {
          td {
            border-right: 0;
          }
        }
      }
    }
  }
}
</style>
