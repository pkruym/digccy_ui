<template>
  <div class="buy-usdt sell">
    <div class="top">
      <div class="left hFlex">
        <!-- <p>当前USDT单价</p> -->
        <p>{{ $t("page.text14") }}</p>
        <h2>￥{{ rate }}</h2>
      </div>
      <div class="right lFlex">
        <div class="box hFlex">
          <p>{{ $t("page.text34") }}</p>
          <div>
            <span>64{{ $t("page.text49") }}</span>
            <span class="safe">{{ $t("page.text16") }}</span>
          </div>
        </div>
        <div class="box hFlex">
          <p>{{ $t("page.text17") }}</p>
          <div>
            <span>{{ volume }}</span>
          </div>
        </div>
        <div class="box hFlex">
          <p>{{ $t("page.text18") }}</p>
          <div>
            <span>{{ volumerate }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="line10"></div>
    <div class="mid">
      <div class="item border pad30">
        <div class="usdt">USDT</div>
        <div class="buy">{{ $t("page.text36") }}</div>
        <div class="cny">{{ $t("page.text19") }}</div>
      </div>
      <div class="hFlex border pad30 box">
        <p class="sell-usdt">
          {{ $t("page.text37") }}
          <span>{{ $t("page.text38")
            }}{{
              $route.query.isLuckyProfit == 1
                ? personalMsgKey[5].value
                : personalMsgKey[1].value
            }}USDT</span>
        </p>
        <div class="input">
          <input type="text" :placeholder="placeholderText" v-model="amount" />
          <p>USDT</p>
        </div>
        <div class="bot">
          <p>{{ $t("page.text39") }}</p>
          <p class="yellow">
            ￥{{ (amount * rate).toFixed(2) }} {{ currencySymbol }}
          </p>
        </div>
      </div>
      <div class="Flex pad30 box">
        <p>
          {{ $t("page.text40") }} {{ $t("page.text40") }}
          <span class="add-bank" v-if="!bankList || bankList.length == 0" @click="
              $router.push({
                path: '/setting/add-card',
                query: { redict: $route.fullPath }
              })
            ">{{ $t("page.text50") }}</span>
        </p>
        <div class="input" v-if="bankList && bankList.length > 0" @click="showBank = true">
          <div class="otc">
            <div class="cardImg"><img :src="bankImg" alt="" /></div>
            <p>
              {{
                bankCardId.substring(0, 4) +
                  " **** ****" +
                  bankCardId.substr(-4)
              }}
            </p>
          </div>
          <p class="arrow"></p>
        </div>
      </div>
    </div>

    <div class="selltips">
      <p>{{ $t("page.text41") }}</p>
      <p>{{ $t("page.text42") }}</p>
      <p>{{ $t("page.text43") }}</p>
      <p>{{ $t("page.text44") }}</p>
      <p>{{ $t("page.text45") }}</p>
      <p>{{ $t("page.text46") }}</p>
      <p>{{ $t("page.text455") }}</p>
      <p class="txtime" v-html="workTimeText"></p>
      <div class="redColor">{{ $t("page.text477") }}</div>
    </div>
    <div class="usdtbtn-box">
      <div class="btn" @click="sell(item)">{{ $t("page.text47") }}</div>
    </div>
    <yd-keyboard v-model="showpass" :callback="done" disorder ref="keyboardDemo2"></yd-keyboard>
    <div v-transfer-dom>
      <popup v-model="showBank" class="bottom-popup">
        <div class="bankPopupBox">
          <div class="bankitem" v-for="item in bankList" @click="checkBank(item)">
            <div class="left">
              <div class="cardImg"><img :src="item.icon" alt="" /></div>
              <span>{{ item.bankCardId }}</span>
            </div>
            <div class="right" :class="{ arrow: item.isCheck }"></div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      personalMsgKey: "actual/account/personalMsgKey",
      userInfo: "user/userInfo"
    }),
    msg() {
      if (
        (this.amount < this.miniLimit && this.amount != 0) ||
        this.amount > this.maxLimit
      ) {
        return this.buytext;
      } else {
        return "";
      }
    },
    usdtNum() {
      if (this.rate) {
        return (this.amount / this.rate).toFixed(2);
      }
    }
  },
  data() {
    return {
      showpass: false,
      headPortrait: localStorage.getItem("imageUrl") || "",
      bankImg: "", // 银行卡图片
      bankCardId: "", // 银行卡号
      showBank: false,
      amount: "",
      fundPassword: "",
      bindId: "",
      buytext: "",
      miniLimit: 0,
      maxLimit: 0,
      rate: 0,
      currencySymbol: "",
      list: [],
      item: null,
      volume: "",
      volumerate: "",
      bankList: null,
      workTimeText: "",
      placeholderText: "",
      onlineTime: "",
      lang: "zh"
    };
  },
  created() {
    this.lang = localStorage.getItem("language") || "zh";
    this.getBankList();
    this.getList();
    this.queryWithdraw(); // 获取体现时间限制
  },
  methods: {
    ...mapActions({
      merchantList: "user/merchantList", //usdt商家列表
      otcApply: "user/otcApply", //usdt出售
      bankCardQueryUser: "user/bankCardQueryUser", //获取已绑定的银行卡
      queryWithdrawTime: "system/system/queryWithdrawTime",
      withdrawTime: "system/system/withdrawTime"
    }),
    clear() {
      Object.keys(this.item).forEach(key => (this.item[key] = ""));
      this.miniLimit = 0;
      this.maxLimit = 0;
      this.rate = 0;
      this.currencySymbol = "";
      this.amount = "";
      this.fundPassword = "";
    },
    getList() {
      let params = {
        status: true,
        type: "SELL",
        page: 1,
        size: 100
      };

      this.merchantList(params).then(res => {
        if (res && res.records.length > 0) {
          this.list = res.records;
          this.item = this.list[0];
          this.setDefaultItem();
        }
      });
    },
    setDefaultItem() {
      let val = this.item;
      this.volume = val.volume || "-";
      this.volumerate = val.probability
        ? val.probability.toFixed(2) + "%"
        : "--";
      let minNum = (
        Math.ceil((val.tradeSetting[0].miniLimit / val.price) * 100) / 100
      ).toFixed(2);
      let maxNum = (
        parseInt((val.tradeSetting[0].maxLimit / val.price) * 100) / 100
      ).toFixed(2);

      this.buytext = `最低出售数量${minNum}USDT，<br>最高${maxNum}USDT`;
      this.placeholderText = `最低出售数量${minNum}USDT，最高${maxNum}USDT`;
      if (this.lang == "en") {
        this.buytext = `Minimum sale quantity ${minNum}USDT，<br>highest ${maxNum}USDT`;
        this.placeholderText = `Minimum sale quantity ${minNum}USDT,highest ${maxNum}USDT`;
      }
      // this.$t("dialog.usdtSell.placeholder1[0]") +
      // (
      //   Math.ceil((val.tradeSetting[0].miniLimit / val.price) * 100) / 100
      // ).toFixed(2) +
      // "-" +
      // (
      //   parseInt((val.tradeSetting[0].maxLimit / val.price) * 100) / 100
      // ).toFixed(2) +
      // this.$t("dialog.usdtSell.placeholder1[1]");
      this.miniLimit = val.tradeSetting[0].miniLimit;
      this.maxLimit = val.tradeSetting[0].maxLimit;
      this.rate = val.price;
      this.value = val.tradeSetting[0].tradeTypeEnum;
      this.currencySymbol = val.currencySymbol;
    },
    //获取银行卡
    getBankList() {
      this.bankCardQueryUser()
        .then(res => {
          if (res && res.length != 0) {
            res.forEach((item, index) => {
              item.isCheck = index == 0;
            });
            this.bankList = res;
            this.bankImg = res[0].icon;
            this.bindId = res[0].id;
            this.bankCardId = res[0].bankCardId;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkBank(item) {
      this.bankList.forEach((d, index) => {
        d.isCheck = false;
        if (item.id == d.id) {
          d.isCheck = true;
        }
      });
      this.bindId = item.id;
      this.bankCardId = item.bankCardId;
      this.showBank = false;
    },
    blur() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    //获取可提现时间及最小金额
    queryWithdraw() {
      this.queryWithdrawTime().then(res => {
        let week = res.weekList;
        if (week && week.length > 0) {
          var min = Math.min.apply(null, week);
          var max = Math.max.apply(null, week);
          let { startTime, endTime } = res;
          let arr1 = startTime.split(":");
          let arr2 = endTime.split(":");
          startTime = arr1[0] + ":" + arr1[1];
          endTime = arr2[0] + ":" + arr2[1];

          // 周一至周五10:00至17:00
          let weekStart = this.getWeekName(min);
          let weekEnd = this.getWeekName(max);
          // 尊敬的用户我们的提款时间为，周一至周五10:00至17:00，请您安排好提款计划，以便于及时出金，如有变动请以系统公告为准！
          // Dear users, our withdrawal time is from 10:00 to 17:00 from Monday to Friday. Please arrange a withdrawal plan to facilitate timely withdrawal. Please refer to the system announcement for any changes!
          let zhText = ` 尊敬的用户我们的提款时间为，<span>${weekStart}至${weekEnd}${startTime}-${endTime}</span>，请您安排好提款计划，以便于及时出金，如有变动请以系统公告为准！`;
          let enText = `Dear users, <span>our withdrawal time is from ${startTime} to ${endTime} from ${weekStart} to ${weekEnd}</span>. Please arrange a withdrawal plan to facilitate timely withdrawal. Please refer to the system announcement for any changes!`;
          this.workTimeText = this.lang == "en" ? enText : zhText;
          this.onlineTime = `商家在线时间为<br>${weekStart}至${weekEnd}${startTime}-${endTime}`;
          if (this.lang == "en") {
            this.onlineTime = `Business online time is<br>from ${weekStart} to ${weekEnd} ${startTime}-${endTime}`;
          }
        }
      });
    },
    getWeekName(num) {
      let lang = this.lang;
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
    sell() {
      let vm = this;
      if (!this.bankList || this.bankList.length == 0) {
        this.$vux.toast.text(this.$t("page.text51"), "middle");
        return;
      }
      if (!this.bankCardId) {
        this.$vux.toast.text(this.$t("page.text52"), "middle");
        return;
      }
      if (!this.item.id) {
        this.$vux.toast.text(this.$t("page.text86"), "middle");
        return;
      }
      if (this.userInfo.fundPasswdBlank) {
        this.$vux.confirm.show({
          title: this.$t("setText.title"),
          content: this.$t("page.text53"),
          confirmText: this.$t("common.text18"),
          cancelText: this.$t("common.text3"),
          onCancel() {
            console.log("plugin cancel");
          },
          onConfirm() {
            vm.$router.push("/setting/firstpaypass");
          }
        });
        return;
      }

      if (Number(this.amount) > this.personalMsgKey[1].value) {
        this.$vux.toast.text(this.$t("page.text54"), "middle");
        return;
      }
      if (
        Number(this.amount) < (this.miniLimit / this.rate).toFixed(2) ||
        Number(this.amount) > (this.maxLimit / this.rate).toFixed(2)
      ) {
        this.$vux.alert.show({
          title:
            this.lang == "en"
              ? "Not within the merchant limit"
              : "不在商家限额范围内",
          content: `<div style="text-align:left;">${this.buytext}</div>`
        });
        return;
      }
      this.showpass = true;
      // this.checkTime();//先判断提币时间的
    },
    checkTime() {
      this.withdrawTime().then(res => {
        if (res) {
          this.showpass = true;
        } else {
          this.$vux.alert.show({
            title: this.lang == "en" ? "No merchants online" : "暂无商家在线",
            content: this.onlineTime
          });
        }
      });
    },
    done(val) {
      let vm = this;
      this.fundPassword = val;
      this.$dialog.loading.open(this.$t("setText.text17"));
      setTimeout(() => {
        let params = {
          merchantId: this.item.id,
          price: this.rate,
          channelId: 3,
          id: 12,
          usdtNum: Number(this.amount),
          amount: Number(this.amount * this.rate),
          bindId: this.bindId,
          fundPassword: this.fundPassword
        };
        if (this.$route.query.isLuckyProfit) {
          params.isLuckyProfit = true;
        }
        this.otcApply(params)
          .then(res => {
            this.$dialog.loading.close();
            this.showpass = false;
            this.$router.push({
              path: "/sellDetail",
              query: {
                id: res.id,
                amount: res.amount,
                usdtNum: res.usdtNum,
                price: res.price,
                name: res.name,
                bankCardId: res.bankCardId,
                bankName: res.bankName,
                branchName: res.branchName,
                currencySymbol: this.currencySymbol
              }
            });
          })
          .catch(err => {
            this.showpass = false;
            this.$dialog.loading.close();
            if (err.code == "4105") {
              this.$vux.alert.show({
                title:
                  this.lang == "en" ? "No merchants online" : "暂无商家在线",
                content: this.onlineTime
              });
            } else if (err.code == "4131") {
              this.$vux.toast.text("您已超过单次提币/售币额度", "middle");
            } else if (err.code == "4132") {
              this.$vux.confirm.show({
                title: this.$t("setText.title"),
                content:
                  "您已超过单次提币/售币额度，</br>" +
                  this.$t("common.noadvanced"),
                confirmText: this.$t("common.goadvanced"),
                cancelText: this.$t("common.text3"),
                onCancel() {
                  console.log("plugin cancel");
                },
                onConfirm() {
                  vm.$router.push("/setting/advanced-certification");
                }
              });
            } else if (err.code == "4133") {
              this.$vux.toast.text("您已超过24小时提币/售币额度", "middle");
            } else if (err.code == "4134") {
              this.$vux.confirm.show({
                title: this.$t("setText.title"),
                content:
                  "您已超过24小时提币/售币额度，</br>" +
                  this.$t("common.noadvanced"),
                confirmText: this.$t("common.goadvanced"),
                cancelText: this.$t("common.text3"),
                onCancel() {
                  console.log("plugin cancel");
                },
                onConfirm() {
                  vm.$router.push("/setting/advanced-certification");
                }
              });
            } else if (err.code == "4135") {
              this.$vux.toast.text("您已超过提币/售币总额度", "middle");
            } else if (err.code == "4136") {
              this.$vux.confirm.show({
                title: this.$t("setText.title"),
                content:
                  "您已超过提币/售币总额度，</br>" +
                  this.$t("common.noadvanced"),
                confirmText: this.$t("common.goadvanced"),
                cancelText: this.$t("common.text3"),
                onCancel() {
                  console.log("plugin cancel");
                },
                onConfirm() {
                  vm.$router.push("/setting/advanced-certification");
                }
              });
            } else {
              this.$vux.toast.text(err.msg, "middle");
            }
          });
      }, 2000);
    }
  },
  beforeDestroy() {
    this.$dialog.loading.close();
  }
};
</script>
