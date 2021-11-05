<template>
  <div class="tab-container">
    <div class="tab-info-top line05">
      <img class="tab-info-icon" src="@img/2_3/icon_home_kuiajie@2x.png" alt />
      <div class="tab-info-text">
        <p>{{ $t("index.fast") }}</p>
        <p>{{ $t("index.otcbank") }}</p>
      </div>
      <img
        class="tab-info-buy"
        src="@img/2_3/icon_home_go@2x.png"
        alt
        @click="buyUSDT"
      />
    </div>
    <div class="tab-info">
      <router-link tag="div" to="/center" class="tab-info-box">
        <img
          class="tab-info-icon"
          src="@img/2_3/icon_list_home_hdzx@2x.png"
          alt
        />
        <!-- 活动中心 -->
        <div class="tab-info-text">
          <p>{{ $t("common.activityCenter") }}</p>
        </div>
      </router-link>
      <div class="tab-info-box">
        <img
          class="tab-info-icon"
          src="@img/2_3/icon_list_home_mnp@2x.png"
          alt
        />
        <div class="tab-info-text" @click="Switck">
          <p>{{ $t("index.text27") }}</p>
          <!-- <p>{{ $t("index.text28") }}</p> -->
        </div>
      </div>
      <router-link to="/noviceAbout" tag="div" class="tab-info-box">
        <img
          class="tab-info-icon"
          src="@img/2_3/icon_list_home_help@2x.png"
          alt
        />
        <div class="tab-info-text">
          <p>{{ $t("index.text26") }}</p>
          <!-- <p>{{ $t("index.text32") }}</p> -->
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Storage, Diskinfo } from "@/assets/js/localstorage";
import { SocketAPI } from "@/assets/js/WsApi2";

export default {
  computed: {
    ...mapGetters({
      getListByMarketType: "contractInfo/getListByMarketType",
      isLogin: "user/isLogin"
    })
  },

  methods: {
    ...mapMutations({
      accountchangeDisk: "actual/account/changeDiskStatus", //修改状态
      orderchangeDisk: "actual/order/changeDiskStatus", //修改状态
      positionchangeDisk: "actual/position/changeDiskStatus", //修改状态
      stoplossorprofitchangeDisk: "actual/stoplossorprofit/changeDiskStatus", //修改状态
      tradeinfochangeDisk: "actual/tradeinfo/changeDiskStatus", //修改状态
      traderecordchangeDisk: "actual/traderecord/changeDiskStatus" //修改状态
    }),
    buyUSDT() {
      let vm = this;
      let path = "";
      if (vm.isLogin) {
        // todo:缓存第一次点击
        const is_rember = localStorage.getItem("is_rember");
        if (is_rember && is_rember == 1) {
          path = "/drawmoney/index";
        } else {
          path = "/instructions"; // 跳到充值须知页面
        }
        vm.$router.push(path);
      } else {
        vm.$vux.confirm.show({
          title: vm.$t("message.login.title"),
          content: vm.$t("message.login.message2"),
          confirmText: vm.$t("setText.login"),
          cancelText: vm.$t("personalCenter.text16"),
          onCancel() {
            console.log("plugin cancel");
          },
          onConfirm() {
            vm.$router.push("/login");
          }
        });
      }
    },
    Switck() {
      let _this = this;
      if (!this.isLogin) {
        this.$vux.confirm.show({
          title: this.$t("message.login.title"),
          content: this.$t("message.login.message2"),
          confirmText: this.$t("setText.login"),
          cancelText: this.$t("common.text3"),
          onCancel() {},
          onConfirm() {
            _this.$router.push("/login");
          }
        });
        return;
      }
      if (_this.$diskinfo.type == "simulate") {
        let first = this.getListByMarketType(this.$tradeType.tradeType)[0];
        this.$router.push({
          path: `/stock/stock-line?symbol=${first.symbol}`
        });
        return;
      }
      this.$vux.confirm.show({
        title: this.$t("setText.title"),
        content: this.$t("common.text1"),
        cancelText: this.$t("common.text3"),
        confirmText: this.$t("personalCenter.text15"),
        onCancel() {
          console.log("nossss");
        },
        onConfirm() {
          _this.$diskinfo.type = "simulate";
          Diskinfo.save("simulate");
          _this.orderchangeDisk({ type: _this.$diskinfo.type });
          _this.accountchangeDisk({ type: _this.$diskinfo.type });
          _this.positionchangeDisk({ type: _this.$diskinfo.type });
          _this.stoplossorprofitchangeDisk({ type: _this.$diskinfo.type });
          _this.tradeinfochangeDisk({ type: _this.$diskinfo.type });
          _this.traderecordchangeDisk({ type: _this.$diskinfo.type });
          SocketAPI.emit("login", true); //切换模拟盘广播重新获取数据
          let first = _this.getListByMarketType(_this.$tradeType.tradeType)[0];

          // console.log('ssssss',first);
          _this.$router.push({
            path: `/stock/stock-line?symbol=${first.symbol}`
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@writeColor: #ffffff;
@txtColor: #14181f;
.tab-container {
  background: @bodyBg;
  padding: 0 0.5rem;
  border-radius: 10px;
  // box-shadow: 0 6px 12px 0 rgba(234, 234, 234, 0.6);
  .tab-info-top {
    display: flex;
    justify-items: center;
    justify-content: center;
    height: 1.48rem;
    align-items: center;
    position: relative;
    .tab-info-icon {
      width: 0.86rem;
      height: 0.72rem;
    }
    .tab-info-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: left;
      padding: 0 0.24rem;
      p {
        font-size: 14px;
        color: @txtColor;
        font-weight: bold;
        &:nth-of-type(2) {
          color: @txtColor;
          font-size: 12px;
          white-space: nowrap;
          margin-left: -15px;
          transform: scale(0.85);
        }
      }
    }
    .tab-info-buy {
      width: 1.1rem;
      height: 0.82rem;
    }
  }
  .tab-info {
    display: flex;
    height: 1.3rem;
    align-items: center;
    justify-content: space-around;
    justify-items: stretch;
    .tab-info-box {
      flex: 1;
      display: flex;
      align-items: center;
      &:nth-of-type(1) {
        justify-content: flex-start;
      }
      &:nth-of-type(2) {
        justify-content: center;
      }
      &:nth-of-type(3) {
        justify-content: flex-end;
      }
      .tab-info-icon {
        width: 0.6rem;
        height: 0.6rem;
      }
      .tab-info-text {
        margin-left: 0.16rem;
        p {
          font-size: 0.24rem;
          color: @txtColor;
        }
      }
    }
  }
}
</style>
