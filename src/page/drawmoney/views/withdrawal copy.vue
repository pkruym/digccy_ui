<template>
  <div class="withdrawmoney">
    <div class="withdrawmoney-main">
      <group>
        <x-input :title="$t('setText.text1')" value="USDT-ERC20" text-align="right" readonly></x-input>
        <x-input :title="$t('setText.text2')" v-model="withdrawmoney.bindId" text-align="right" :placeholder="$t('setText.text3')"></x-input>
        <x-input :title="$t('setText.text4')" v-model="withdrawmoney.amount" text-align="right" placeholder="0.00"></x-input>
        <div class="keyong">
          <p>
            {{ $t("setText.text5")
            }}{{
              $route.query.isLuckyProfit == 1
                ? personalMsgKey[5].value
                : personalMsgKey[1].value
            }}USDT
          </p>
          <span @click="allLKT">{{ $t("setText.text6") }}</span>
        </div>
        <x-input :title="$t('setText.text7')" :value="server" text-align="right" readonly></x-input>
        <div class="tips">
          <p>{{ $t("setText.text8") }}{{ minAmount }}USDT</p>
          <p>{{ $t("setText.text9") }}</p>
          <p>{{ workTimeText }}</p>
        </div>
        <div class="total">
          <div class="total-left">{{ $t("setText.text10") }}</div>
          <div class="total-right">{{ total }} USDT</div>
        </div>
      </group>

      <div class="btn">
        <yd-button type="primary" :loading-txt="$t('setText.text11')" @click.native="query">{{ $t("setText.text11") }}</yd-button>
      </div>
    </div>
    <yd-keyboard title="Security keyboard" :input-text="$t('my.setting.text49')" v-model="showpass" :callback="done" disorder ref="keyboardDemo2"></yd-keyboard>
  </div>
  <!-- </model-full> -->
</template>
<script>
import { Group, Cell, XInput } from "vux";
// import ModelFull from "element/model-full";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Group,
    Cell,
    XInput
    // ModelFull
  },
  computed: {
    ...mapGetters({
      personalMsgKey: "actual/account/personalMsgKey",
      userInfo: "user/userInfo"
    }),
    btnStatus() {
      if (!this.withdrawmoney.bindId || !this.withdrawmoney.amount) {
        return true;
      } else if (
        this.withdrawmoney.amount * 1 < his.minAmount ||
        this.withdrawmoney.amount * 1 > this.availableBalance * 1
      ) {
        return true;
      } else {
        return false;
      }
    },
    //提现手续费 = 提现数量*提现手续费比例；
    server() {
      if (this.feeType == "FIXED") {
        return this.fee;
      } else {
        if (this.withdrawmoney.amount) {
          return ((this.withdrawmoney.amount * this.fee) / 100).toFixed(2);
        } else {
          return "0.00";
        }
      }
    },
    //到账数量 = 提现数量 - 提现手续费
    total() {
      let amount = this.withdrawmoney.amount * 1;
      if (this.server && amount > 0) {
        let num = this.withdrawmoney.amount - this.server;
        if (num < 0) {
          return "0.00";
        }
        return num.toFixed(2);
      } else {
        return "0.00";
      }
    }
  },
  data() {
    return {
      // token: this.$route.query.token || "",
      // availableBalance:
      //   this.$route.query.availableBalance > 0 ||
      //     this.$route.query.availableBalance == 0
      //     ? (this.$route.query.availableBalance * 1).toFixed(2)
      //     : "--",
      showpass: false,
      withdrawmoney: {
        bindId: "",
        amount: "",
        fundPassword: ""
      },
      fee: 0,
      isFundPassword: true,
      minAmount: 0, // 最小体现金额
      feeType: "",
      workTimeText: "",
      onlineTime: "",
      lang: "zh"
    };
  },
  mounted() {
    this.lang = localStorage.getItem("language") || "zh";
    this.queryFee();
    this.queryWithdraw(); // 获取体现时间限制
    //暴露给app调用的方法
    window.getCode = val => {
      let data = val;
      this.getCode(data);
    };
  },
  methods: {
    ...mapActions({
      getFee: "system/system/queryFee",
      userQuery: "system/system/userQuery",
      applyBurse: "system/system/applyBurse",
      queryWithdrawTime: "system/system/queryWithdrawTime",
      withdrawTime: "system/system/withdrawTime"
    }),
    //获取可提现时间及最小金额
    queryWithdraw() {
      this.queryWithdrawTime().then(res => {
        this.minAmount = res.minAmount || 0;
        let week = res.weekList;
        if (week && week.length > 0) {
          var min = Math.min.apply(null, week);
          var max = Math.max.apply(null, week);
          let { startTime, endTime } = res;
          let arr1 = startTime.split(":");
          let arr2 = endTime.split(":");
          startTime = arr1[0] + ":" + arr1[1];
          endTime = arr2[0] + ":" + arr2[1];
          console.log(min, max);
          // 周一至周五10:00至17:00
          let weekStart = this.getWeekName(min);
          let weekEnd = this.getWeekName(max);
          let zhText = ` 3.地址提币处理时间：${weekStart}至${weekEnd}${startTime}-${endTime}`;
          let enText = `3.Address withdrawal processing time:from ${weekStart} to ${weekEnd} ${startTime}-${endTime}`;
          let lang = this.lang; // localStorage.getItem("language") || "zh";
          this.workTimeText = lang == "en" ? enText : zhText;
          this.onlineTime = `地址提币处理时间为<br>${weekStart}至${weekEnd}${startTime}-${endTime}`;
          if (lang == "en") {
            this.onlineTime = `Address withdrawal processing time is<br>from ${weekStart} to ${weekEnd}${startTime}-${endTime}`;
          }
        }
      });
    },
    getWeekName(num) {
      let lang = localStorage.getItem("language") || "zh";
      let weekText = "";
      switch (num) {
        case 1:
          weekText = lang == "en" ? "Monday" : "周一";
          break;
        case 2:
          weekText = lang == "en" ? "Tuesday" : "周二";
          break;
        case 3:
          weekText = lang == "en" ? "Wednesday" : "周三";
          break;
        case 4:
          weekText = lang == "en" ? "Thursday" : "周四";
          break;
        case 5:
          weekText = lang == "en" ? "Friday" : "周五";
          break;
        case 6:
          weekText = lang == "en" ? "Saturday" : "周六";
          break;
        case 7:
          weekText = lang == "en" ? "Sunday " : "周日";
          break;
      }
      return weekText;
    },
    //获取手续费
    queryFee() {
      this.getFee().then(res => {
        let data = res || [];
        console.log("获取手续费", data);
        let withObj = data.find(d => d.symbol == "WITHDRAW");
        // let feeType = withObj.feeType;
        // FIXED 固定手续费，RATIO：按比例手续费
        this.feeType = withObj.feeType;
        this.fee = withObj.fee;
      });
    },
    //获取绑卡id
    getCode(val) {
      this.withdrawmoney.bindId = val;
    },
    //全部金额
    allLKT() {
      this.withdrawmoney.amount = Number(this.personalMsgKey[1].value);
    },
    //监听数量输入框
    amountChange() {
      if (this.withdrawmoney.amount * 1 < this.minAmount) {
        this.$dialog.toast({
          mes: this.$t("setText.text12") + this.minAmount + "USDT",
          timeout: 1000
        });
      }
    },
    //扫码
    // scan() {
    //   if (window.webkit) {
    //     window.webkit.messageHandlers.ScanQRCode.postMessage("ScanQRCode");
    //   } else if (window.appInterface) {
    //     window.appInterface.scanQrCode();
    //   } else {
    //     console.log("pc端不能扫码");
    //   }
    // },

    //申请提币
    query() {
      //  this.withdrawmoney.amount * 1 < 100 ||
      //   this.withdrawmoney.amount * 1 > this.availableBalance * 1
      if (this.withdrawmoney.bindId == "") {
        // 提币地址不能为空
        let msg = this.$t("setText.text20"); //'提币地址不能为空'
        this.$dialog.toast({ mes: msg });
        return;
      }
      if (this.withdrawmoney.amount * 1 < this.minAmount) {
        // 提币数量不能小于100USDT，且不能大于可用数量
        let msg = this.$t("setText.text12") + this.minAmount + "USDT"; //'提币数量不能小于100USDT'
        this.$dialog.toast({ mes: msg });
        return;
      }
      if (this.withdrawmoney.amount * 1 > this.personalMsgKey[1].value * 1) {
        // 提币数量不能小于100USDT，且不能大于可用数量
        let msg = this.$t("setText.text19"); //'提币数量不能大于可用数量'
        this.$dialog.toast({ mes: msg });
        return;
      }
      let _this = this;
      this.userQuery().then(res => {
        if (res && res.username) {
          this.isFundPassword = res.fundPasswdBlank; //res.data.data.fundPasswdBlank;
          if (this.isFundPassword) {
            this.$vux.confirm.show({
              title: this.$t("setText.text13"),
              content: this.$t("setText.text14"),
              cancelText: this.$t("setText.text15"),
              confirmText: this.$t("setText.text16"),
              onCancel() { },
              onConfirm() {
                _this.$router.push({
                  path: "/setting/firstpaypass"
                });
              }
            });
          } else {
            _this.showpass = true;
            // this.checkTime();//先判断提币时间的
          }
        }
      });
    },
    checkTime() {
      this.withdrawTime().then(res => {
        console.log(res);
        if (res) {
          this.showpass = true;
        } else {
          this.$vux.alert.show({
            title:
              this.lang == "en"
                ? "Not within the withdrawal time"
                : "不在提币时间内",
            content: this.onlineTime
          });
        }
      });
    },
    //输入密码回调
    done(val) {
      this.withdrawmoney.fundPassword = val;
      this.$dialog.loading.open(this.$t("setText.text17"));
      setTimeout(() => {
        /* 模拟异步验证密码 */
        let params = {
          address: this.withdrawmoney.bindId,
          currencyTypeEnum: "AMT",
          amount: this.withdrawmoney.amount,
          fundPassword: this.withdrawmoney.fundPassword,
          actualAmount: this.total
        };
        if (this.$route.query.isLuckyProfit) {
          params.isLuckyProfit = true;
        }
        this.applyBurse(params)
          .then(res => {
            this.$dialog.loading.close();
            if (res.userId) {
              this.$router.replace("/drawmoney/detail");
              this.showpass = false;
            } else {
              this.$dialog.toast({
                mes: this.lang == "en" ? "Withdrawal failed" : "提币失败"
              });
            }
          })
          .catch(err => {
            this.showpass = false;
            this.$dialog.loading.close();
            if (err.code == "4105") {
              this.$vux.alert.show({
                title:
                  this.lang == "en"
                    ? "Not within the withdrawal time"
                    : "不在提币时间内",
                content: this.onlineTime
              });
            } else {
              this.$vux.toast.text(err.msg, "middle");
            }
          });
      }, 2000);
    }
  },
  beforeDestroy() {
    console.log("销毁");
    this.$dialog.loading.close();
  }
};
</script>

<style lang="less" scoped>
.withdrawmoney {
  span,
  h2,
  p,
  input,
  .total-right {
    font-family: 'DIN-Medium';
  }
  height: 100vh;
  background: @bodyBg;
  padding-top: 0.2rem;
  .line {
    height: 0.2rem;
    background: #171e25;
  }
  .withdrawmoney-main {
    padding: 0 0.3rem;
    .label-input {
      margin-bottom: 0.72rem;
      border-bottom: 1px solid @lineColor;

      .label {
        font-size: 0.28rem;
        color: rgb(246, 246, 246);
      }
      .input-slot {
        position: relative;
        margin-top: 0.24rem;
        display: flex;
        align-items: center;

        .input {
          flex: 1;
          color: @txtColor;
          font-size: 0.36rem;
          input {
            width: 100%;
            font-size: 0.36rem;
            color: @txtColor;
            &::-webkit-input-placeholder {
              /* Chrome/Opera/Safari */
              color: @txtColor;
            }
          }
        }
        .solt {
          flex: 0 0 0.7rem;
          width: 0.7rem;
          text-align: right;
          margin-left: 0.2rem;
          color: @blueColor;
          font-size: 0.32rem;

          // position: absolute;
          // right: 0;
          // top: 2px;
          // font-size: 0.32rem;
          // color: rgb(36, 48, 73);
          // &:nth-of-type(3) {
          // }
          &.address {
            flex: 0 0 0.44rem;
            width: 0.44rem;
            height: 0.44rem;
            // background: url('@/assets/img/icoWdTbSaoyisao@2x.png')   no-repeat;

            background-size: 0.44rem 0.44rem;
          }
        }
      }
      &:nth-of-type(2) {
        margin-bottom: 0.14rem;
      }
      &:nth-of-type(3) {
        margin-top: 0.72rem;
        margin-bottom: 0.5rem;
        .solt {
          color: rgb(104, 114, 132);
        }
      }
      p {
        font-size: 0.28rem;
        color: rgb(104, 114, 132);
        margin-top: 0.14rem;
      }
    }
  }
  .tip-text {
    margin: 0 0.3rem;
    padding: 0.4rem 0 0.4rem 0.3rem;
    background: rgb(40, 50, 60);
    p {
      font-size: 0.24rem;
      color: rgb(42, 204, 166);
      line-height: 0.44rem;
    }
  }
  .total {
    // padding: 0 0.3rem;
    margin: 0.6rem 0 0.3rem;
    display: flex;
    & > div {
      flex: 1;
      font-size: 0.36rem;
      color: @txtColor;
      &:nth-of-type(2) {
        text-align: right;
        color: @txtColor;
      }
    }
  }
  .btn {
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    padding: 0 0.3rem 0 0.3rem;
    background: @blueColor;
    border-radius: 2px;
    /deep/ .yd-btn {
      width: 100%;
      padding: 0;
      height: 0.8rem;
      border-radius: 4px;
      font-size: 0.36rem;
      background: @blueColor;
      &.yd-btn-disabled {
        font-size: 0.36rem;
        background: rgba(0, 100, 255, 0.3);
      }
    }
  }
}
</style>

<style lang="less" scoped>
.withdrawmoney-main {
  p,
  div,
  label {
    font-size: 14px;
  }
  /deep/.weui-cells {
    background: @bodyBg;
    border-radius: 2px;
    color: @txtColor;
  }
  /deep/.weui-cell {
    background-color: @bodyBg;
    border: 1px solid @inputBorder;
    margin-bottom: 0.2rem;
  }
  .keyong {
    display: flex;
    margin-top: -0.08rem;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    p {
      color: @txt2Color;
    }
    span {
      color: @blueColor;
    }
  }
  .yudengyu {
    text-align: right;
  }
  .tips {
    margin-top: 0.6rem;
    background: rgba(0, 100, 255, 0.1);
    border: 1px solid @blueColor;
    border-radius: 2px;
    padding: 15px;
    p {
      font-size: 12px;
      color: @blueColor;
      line-height: 18px;
    }
  }
}
</style>
