<template>
  <model-full :title="$t('primaryInfo.primary')" class="set fixd-wrap">
    <div class="line10"></div>
    <div class="real-center">
      <div
        class="real-info line05"
        @click="primarycertification"
        v-show="login"
      >
        <div class="flex"><span>初级认证</span></div>
        <div class="flex">
          <span :class="userInfo.realAuth ? 'blue' : 'red'">
            {{
              userInfo.realAuth ? $t("my.text11") : $t("personalCenter.text5")
            }}
          </span>
          <img
            v-if="!userInfo.realAuth"
            src="@/assets/img/right@2x.png"
            alt
            class="right"
          />
        </div>
      </div>
      <!-- <div class="detail-box">
        <div
          class="detail"
          v-if="
            (index == 0 && regulations.PRIMARY.totalRechargeLimit) ||
              (index == 1 && regulations.PRIMARY.totalWithdrawLimit) ||
              (index == 2 && regulations.PRIMARY.perWithdrawLimit) ||
              (index == 3 && regulations.PRIMARY.dayWithdrawLimit)
          "
          v-for="(item, index) in titles"
        >
          <div :class="userInfo.realAuth ? 'real' : 'default'"></div>
          <p>
            {{ item
            }}{{
              index == 0
                ? regulations.PRIMARY.totalRechargeLimit
                : index == 1
                ? regulations.PRIMARY.totalWithdrawLimit
                : index == 2
                ? regulations.PRIMARY.perWithdrawLimit
                : index == 3
                ? regulations.PRIMARY.dayWithdrawLimit
                : ""
            }}U
          </p>
        </div>
      </div> -->

      <div
        class="real-info real-info-margin line05"
        @click="advancedcertification"
        v-show="login"
      >
        <div class="flex"><span>高级认证</span></div>
        <div class="flex">
          <span
            :class="
              !userInfo.realAuth
                ? 'num'
                : userInfo.realAuth && userInfo.advancedRealAuth
                ? 'blue'
                : certificationInfo && certificationInfo.status == 'PENDING'
                ? 'yellow'
                : certificationInfo && certificationInfo.status == 'NOTPASS'
                ? 'red'
                : 'red'
            "
          >
            {{
              !userInfo.realAuth
                ? "请先完成初级认证"
                : userInfo.realAuth && userInfo.advancedRealAuth
                ? $t("my.text11")
                : getstatus
            }}
          </span>
          <img
            v-if="!userInfo.advancedRealAuth"
            src="@/assets/img/right@2x.png"
            alt
            class="right"
          />
        </div>
      </div>
      <!-- <div class="detail-box">
        <div
          v-if="
            (index == 0 && regulations.ADVANCED.totalRechargeLimit) ||
              (index == 1 && regulations.ADVANCED.totalWithdrawLimit) ||
              (index == 2 && regulations.ADVANCED.perWithdrawLimit) ||
              (index == 3 && regulations.ADVANCED.dayWithdrawLimit)
          "
          class="detail"
          v-for="(item, index) in titles"
        >
          <div :class="userInfo.advancedRealAuth ? 'real' : 'default'"></div>
          <p>
            {{ item
            }}{{
              index == 0
                ? regulations.ADVANCED.totalRechargeLimit
                : index == 1
                ? regulations.ADVANCED.totalWithdrawLimit
                : index == 2
                ? regulations.ADVANCED.perWithdrawLimit
                : index == 3
                ? regulations.ADVANCED.dayWithdrawLimit
                : ""
            }}U
          </p>
        </div>
      </div> -->
    </div>
  </model-full>
</template>
<script>
import { Storage, Diskinfo } from "@/assets/js/localstorage";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      login: localStorage.token,
      certificationInfo: {
        status: null,
        remark: null
      },
      titles: [
        "OTC购买额度",
        "总提币/售币额度",
        "单笔提币/售币额度",
        "24小时提币/售币额度"
      ]
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      isLogin: "user/isLogin",
      getregulations: "user/getregulations",
      fundPasswdBlank: "user/fundPasswdBlank"
    }),
    regulations() {
      let res = this.getregulations;
      if (res) {
        return {
          PRIMARY: res.find(a => a.grade == "PRIMARY"),
          ADVANCED: res.find(a => a.grade == "ADVANCED")
        };
      }
      return {
        PRIMARY: null,
        ADVANCED: null
      };
    },
    getstatus() {
      if (this.certificationInfo && this.certificationInfo.status) {
        if (this.certificationInfo.status == "PENDING") return "待审核";
        if (this.certificationInfo.status == "NOTPASS") return "审核不通过";
        if (this.certificationInfo.status == "SUCCESSFUL") return "审核通过";
      }
      return this.$t("personalCenter.text5");
    }
  },
  created() {
    this._getRealnameGrade();
    this._getCertification();
  },
  methods: {
    ...mapMutations({
      setclearuser: "user/setclearuser",
      setAdvancedRealAuth: "user/setAdvancedRealAuth"
    }),
    ...mapActions({
      logout: "user/logout",
      getCertification: "user/getCertification",
      getRealnameGrade: "user/getRealnameGrade"
    }),
    primarycertification() {
      if (!this.userInfo.realAuth) {
        this.$router.push("/setting/primary-certification");
      }
    },
    _getRealnameGrade() {
      this.getRealnameGrade();
    },
    advancedcertification() {
      if (
        this.userInfo.realAuth &&
        !this.userInfo.advancedRealAuth &&
        (!this.certificationInfo ||
          !this.certificationInfo.status ||
          this.certificationInfo.status == "NOTPASS")
      ) {
        this.$router.push("/setting/advanced-certification");
      }
    },
    _getCertification() {
      this.getCertification().then(t => {
        this.certificationInfo = t;
        if (
          this.certificationInfo &&
          this.certificationInfo.status == "SUCCESSFUL"
        ) {
          this.setAdvancedRealAuth();
        }
      });
    }
  },
  mounted() {
    if (this.isLogin) {
      console.log(this.userInfo);
    }
  }
};
</script>

<style lang="less" scoped>
.set {
  height: 100%;
  background: @whiteBg;
  position: relative;
  .real-center {
    .real-info-margin {
      margin-top: 0.2rem;
    }
    .real-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.08rem;
      border-bottom: 0.5px solid #e8ecef;
      padding: 0 0.3rem;
      background: @offWhite;

      div {
        .icon {
          width: 0.32rem;
          margin-right: 0.22rem;
        }
        span {
          color: @battleshipGrey;
        }
        .num {
          color: @txt2Color;
        }
        .blue {
          color: @blueColor;
        }
        .red {
          color: @fontRedColor;
        }
        .yellow {
          color: @txt3Color;
        }
        .right {
          width: 0.32rem;
          height: 0.32rem;
          margin-left: 0.2rem;
        }
        align-items: center;
      }
      & > div:nth-of-type(1) {
        font-weight: 900;
      }
    }
    .detail-box {
      background: @offWhite;
      padding: 0.2rem 0;
      .detail {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 0.3rem;

        .default {
          height: 0.28rem;
          width: 0.28rem;
          background: url("~@/assets/img/2_8/icon_smrz_dui_nor@2x.png")
            no-repeat;
          background-size: cover;
        }
        .real {
          height: 0.28rem;
          width: 0.28rem;
          background: url("~@/assets/img/2_8/icon_smrz_dui_sel@2x.png")
            no-repeat;
          background-size: cover;
        }
        img {
          height: 14px;
          width: 14px;
        }
        p {
          margin-left: 6.5px;
          font-size: 12px;
          color: #14181f;
          line-height: 32px;
        }
      }
    }
  }
}
</style>
