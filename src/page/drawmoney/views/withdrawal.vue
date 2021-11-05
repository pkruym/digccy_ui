<template>
  <div class="withdrawmoney">
    <!-- <div class="erc-box">
      <label>USDT</label>
      <span>ERC20</span>
    </div> -->
    <div class="cz-type">
      <!-- 提币方式 -->
      <p>{{ $t("setText.text34") }}</p>
      <div class="cz-btns">
        <template v-for="item in burseList">
          <span :class="{'is-check':currentBurseItem.id==item.id}" @click="chooseItem(item)">{{item.burseType}}</span>
        </template>
        <!-- <span :class="{'is-check':czType==2}" @click="czType=2">钱包充币</span> -->
      </div>
    </div>
    <div class="with-box line05">
      <!-- 提币地址 -->
      <p class="title">{{$t('legalTransaction.withdrawMoneyAddress')}}</p>
      <div class="ipt-box">
        <div class="txt-ipt">
          <!-- 输入或长按粘贴地址 -->
          <input type="text" :placeholder="$t('setText.text3')" v-model="withdrawmoney.bindId">
        </div>
        <div class="right-action">
          <div class="icon">
            <!-- <img src="@img/2_8/icon_tubi_saom@2x.png" alt=""> -->
          </div>
          <div class="line"></div>
          <div class="icon" @click="choose">
            <img src="@img/2_8/icon_tubi_dizhi@2x.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="with-box line05">
      <!-- 数量 -->
      <p class="title">{{$t('setText.text4')}}</p>
      <div class="ipt-box">
        <div class="txt-ipt">
          <!-- 输入提币数量 -->
          <input type="text" :placeholder="$t('setText.text4')" v-model="withdrawmoney.amount">
        </div>
        <div class="right-action">
          <div class="icon">
            USDT
          </div>
          <div class="line"></div>
          <div class="icon" @click="allLKT">
            <!-- 全部 -->
            {{$t('setText.text6')}}
          </div>
        </div>
      </div>
    </div>
    <p class="keyong"> {{ $t("setText.text5")
            }}{{
              $route.query.isLuckyProfit == 1
                ? personalMsgKey[5].value
                : personalMsgKey[1].value
            }}USDT</p>
    <div class="with-box line05">
      <!-- 手续费 -->
      <p class="title">{{$t('setText.text7')}}</p>
      <div class="ipt-box">
        <div class="txt-ipt">
          <input type="text" v-model="server" readonly>
        </div>
        <div class="right-action">
          <div class="icon">
          </div>
          <div class="icon">
            USDT
          </div>
        </div>
      </div>
    </div>
    <div class="tips">
      <p>{{ $t("setText.text8") }}{{ minAmount }}USDT</p>
      <p>{{ $t("setText.text9") }}</p>
      <p>{{ workTimeText }}</p>
    </div>
    <div class="btn-box">
      <div class="total">
        <!-- 到账数量 -->
        <span>{{$t('setText.text10')}}</span>
        <span>{{ total }} USDT</span>
      </div>
      <div class="yd-btn" :class="{'disbale':isDisbale}" @click="query">{{ $t("setText.text11") }}</div>
      <!-- <yd-button type="primary" :class="{'disbale':isDisbale}" :loading-txt="$t('setText.text11')" @click.native="query">{{ $t("setText.text11") }}</yd-button> -->
    </div>
    <yd-keyboard title="Security keyboard" :input-text="$t('my.setting.text49')" v-model="showpass" :callback="done" disorder ref="keyboardDemo2"></yd-keyboard>

    <popup v-model="showAddress" id="buyDetailCoupons" class="pc-popup" :popup-style="{ 'z-index': 1508 }" position="right" width="100%">
      <usdtAdress v-if="showAddress" @closeUsdtAddress="showAddress=false"></usdtAdress>
    </popup>
  </div>
</template>
<script>

import usdtAdress from './usdt-address'
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    usdtAdress
  },
  computed: {
    ...mapGetters({
      personalMsgKey: "actual/account/personalMsgKey",
      userInfo: "user/userInfo",
      currentAddress: 'system/system/getCurrentAddress',
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
      if (this.currentBurseItem.burseType == 'TRC20') {
        return 1
      } else {
        if (this.feeType == "FIXED") {
          return this.fee;
        } else {
          if (this.withdrawmoney.amount) {
            return ((this.withdrawmoney.amount * this.fee) / 100).toFixed(2);
          } else {
            return "0.00";
          }
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
    },
    isDisbale() {
      if (!this.withdrawmoney.bindId || !this.withdrawmoney.amount) {
        return true;
      } else {
        return false
      }
    }
  },
  watch: {
    currentAddress() {
      this.withdrawmoney.bindId = this.currentAddress
    }
  },
  data() {
    return {
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
      lang: "zh",
      showAddress: false,
      burseList: [
        {
          burseType: 'TRC20',
          id: 1
        },
        {
          burseType: 'ERC20',
          id: 2
        }
      ],
      currentBurseItem: {
        burseType: 'TRC20',
        id: 1
      },
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
      withdrawTime: "system/system/withdrawTime",
      queryBurseList: "system/system/queryDisplayList",
    }),
    chooseItem(item) {
      this.currentBurseItem = item;
    },
    choose() {
      this.showAddress = true
      // this.$router.push({
      //   path: '/drawmoney/usdtAddress'
      // })
    },
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
      if (this.isDisbale) return
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
          actualAmount: this.total,
          burseType: this.currentBurseItem.burseType
        };
        if (this.$route.query.isLuckyProfit) {
          params.isLuckyProfit = true;
        }
        console.log('提币发送参数===', params)
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
