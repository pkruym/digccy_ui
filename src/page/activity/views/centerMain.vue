<template>
  <div class="active-main">
    <template v-for="(item, index) in activeData">
      <div
        class="active-list"
        @click="jumbTo(item.activityType)"
        v-if="item.current"
      >
        <div class="title-info">
          <div class="title">
            {{
              item.activityType == 1
                ? $t("register.text22")
                : $t("register.text23")
            }}
          </div>
          <div class="time">
            {{ item.start_day | formatTime("yyyy-MM-dd") }}--{{
              item.end_day | formatTime("yyyy-MM-dd")
            }}
          </div>
        </div>
        <div class="content">
          <!-- <img v-if="item.activityType == 1" src="@/assets/img/2_7/active2.png" alt="" />
          <img v-else src="@/assets/img/2_7/active3.png" alt="" /> -->
          <template v-if="lang == 'zh'">
            <img
              v-if="item.activityType == 1"
              src="@/assets/img/3@yearzh.png"
              alt=""
            />
            <img v-else src="@/assets/img/2@yearzh.png" alt="" />
          </template>
          <template v-else>
            <img
              v-if="item.activityType == 1"
              src="@/assets/img/33@yearen.png"
              alt=""
            />
            <img v-else src="@/assets/img/22@yearen.png" alt="" />
          </template>
        </div>
      </div>
    </template>
    <div class="active-list" @click="toLottery" v-if="isShowLottery">
      <div class="title-info">
        <div class="title">交易送手续费活动</div>
        <div class="time">
          {{ activityStart | formatTime("yyyy-MM-dd") }}--{{
            activityEnd | formatTime("yyyy-MM-dd")
          }}
        </div>
      </div>
      <div class="content">
        <!-- <img src="@/assets/img/2_7/active1.png" alt="" /> -->
        <img v-if="lang == 'zh'" src="@/assets/img/1@year.png" alt="" />
        <img v-else src="@/assets/img/1@yearen.png" alt="" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activityStart: "",
      activityEnd: "",
      activeData: null,
      token: "",
      enable: true,
      lang: localStorage.getItem("language") || "zh"
    };
  },
  computed: {
    isShowLottery() {
      if (this.activityEnd) {
        if (!this.enable) {
          return false;
        } else {
          const fomat = this.$options.filters["formatTime"];
          const activityEnd = Number(fomat(this.activityEnd, "yyyyMMdd"));
          const currentTime = Number(fomat(new Date(), "yyyyMMdd"));
          return activityEnd >= currentTime;
        }
      }
      return false;
    }
  },
  created() {
    let { token } = this.$route.query;
    if (token) {
      this.token = token;
      localStorage.setItem("token", token);
    }
    this.getqueryActivity();
    this.getqueryLorrerySummer();
  },
  methods: {
    ...mapActions({
      queryActivity: "user/queryActivity",
      queryLorrerySummer: "user/queryUserLorrerySummer"
    }),
    toLottery() {
      let url = "/lottery";
      if (this.token) {
        url = "/lotteryMain";
      }
      this.$router.push(url);
    },
    getqueryActivity() {
      this.queryActivity().then(res => {
        console.log("获取抽奖活动", res);
        if (res && res.length > 0) {
          let arr = [];
          res.forEach(d => {
            let { end_day } = d;
            let fomat = this.$options.filters["formatTime"];
            let activityEnd = Number(fomat(end_day, "yyyyMMdd"));
            let currentTime = Number(fomat(new Date(), "yyyyMMdd"));
            if (activityEnd >= currentTime) {
              arr.push(d);
            }
          });
          this.activeData = arr;
        }
      });
    },
    getqueryLorrerySummer() {
      this.queryLorrerySummer().then(res => {
        console.log("获取交易活动", res);
        let { activityStart, activityEnd, enable } = res;
        this.activityStart = activityStart;
        this.activityEnd = activityEnd;
        this.enable = enable;
      });
    },
    jumbTo(type) {
      let { token, phone } = this.$route.query;
      let path = "";
      if (type == 1) {
        path = "/couponsActivity";
      } else {
        path = "/rechargeActivity";
      }
      this.$router.push({
        path: path,
        query: {
          phone: phone,
          token: token
        }
      });
    }
  }
};
</script>
