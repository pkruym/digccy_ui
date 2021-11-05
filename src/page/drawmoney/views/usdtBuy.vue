<template>
  <div class="buy-usdt">
    <div class="top">
      <div class="left hFlex">
        <!-- <p>当前USDT单价</p> -->
        <p>{{ $t("page.text14") }}</p>
        <h2>￥{{ rate }}</h2>
      </div>
      <div class="right lFlex">
        <div class="box hFlex">
          <!-- <p>认证卖家</p> -->
          <p>{{ $t("page.text15") }}</p>
          <div>
            <span>64{{ $t("page.text49") }}</span>
            <!-- <span class="safe">安全保障</span> -->
            <span class="safe">{{ $t("page.text16") }}</span>
          </div>
        </div>
        <div class="box hFlex">
          <!-- <p>成交量</p> -->
          <p>{{ $t("page.text17") }}</p>
          <div>
            <span>{{ volume }}</span>
          </div>
        </div>
        <div class="box hFlex">
          <!-- <p>成交率</p> -->
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
        <div class="cny">{{ $t("page.text19") }}</div>
        <div class="buy">{{ $t("page.text20") }}</div>
        <div class="usdt">USDT</div>
      </div>
      <div class="hFlex border pad30 box">
        <!-- <p>购买数量</p> -->
        <p>{{ $t("page.text23") }}(USDT)</p>
        <div class="num-box">
          <div @click="selectNum(item)" :class="item == usdtNum ? 'active' : ''" v-for="item in itemList">
            <p>{{ item }}U</p>
            <p v-if="filteritem(item) > 0">送{{ filteritem(item) }}USDT</p>
          </div>
        </div>

        <div class="input">
          <input type="text" :placeholder="inputbuytext" v-model="usdtNum" @blur="blur" />
          <p>USDT</p>
        </div>
        <div class="bot">
          <!-- <p>到账数量</p> -->
          <!-- <p>{{ $t("page.text23") }}</p> -->
          <span class="yellow">{{ $t("buy.text23") }}≈{{ payamount }} CNY</span>
        </div>
      </div>
      <div class="Flex pad30 box" @click="chose" v-if="list && list.length > 0">
        <!-- <p>付款方式</p> （请根据限额选择付款方式）-->
        <p class="flex-start">
          {{ $t("page.text24") }} <span>{{ $t("page.text85") }} </span>
        </p>
        <div class="bankBox">
          <div class="bank-item" v-for="(item, index) in peyTypes" :key="index" @click="checked(item, index)">
            <div class="left">
              <img class="go" v-if="currentitem.id == item.id" src="@img/2_8/icon_selected_circle@2x.png" alt />
              <img class="go" v-if="currentitem.id !== item.id" src="@img/2_8/icon_nor_circle@2x.png" alt />

              <img :src="imageUrl + item.channelLogo" alt />
              <span> {{ item.displayName }}</span>
            </div>
            <div class="right">
              单笔限额{{ item.tradeSetting[0].miniLimit }}-{{
                item.tradeSetting[0].maxLimit
              }}元
            </div>
          </div>
        </div>
      </div>
      <div class="tips">
        <p>{{ $t("page.text26") }}</p>
        <p>{{ $t("page.text27") }}</p>
        <p>
          {{ $t("page.text28") }}
          <span @click="$router.push('/service')">
            {{ $t("page.text29") }}
          </span>
        </p>
      </div>
    </div>
    <div class="img"><img src="@img/img_payment method@2x.png" alt /></div>
    <div class="usdtbtn-box">
      <div class="btn" @click="buy">{{ $t("page.text31") }}</div>
    </div>

    <!-- <div v-transfer-dom>
      <popup v-model="showBank" class="bottom-popup">
        <div class="bankPopupBox">
          <div
            class="bankitem"
            v-for="(item, index) in list"
            :key="index"
            @click="checked(item, index)"
          >
            <div class="left">
              <img :src="imageUrl + item.channelLogo" alt />
              <span> {{ item.displayName }}</span>
            </div>
            <div class="right">
              单笔限额{{ item.tradeSetting[0].miniLimit }}-{{
                item.tradeSetting[0].maxLimit
              }}元
            </div>
          </div>
          <div class="line08"></div>
          <div class="cancle" @click="canclePop">{{ $t("common.cancle") }}</div>
        </div>
      </popup>
    </div> -->
    <!-- <popup v-model="showGg" class="gg-popup" :show-mask="true">
      <div class="buy-notice">
        <h1>{{ $t("page.text76") }}</h1>
        <div class="content">
          <p>
            {{ $t("page.text77") }} <span>{{ $t("page.text78") }}</span>
          </p>
          <p>
            {{ $t("page.text79") }} <span>{{ $t("page.text75") }}</span>
          </p>
          <p>{{ $t("page.text80") }}</p>
          <p>
            {{ $t("page.text81") }}<span>{{ $t("page.text82") }}</span>
          </p>
          <p>{{ $t("page.text83") }}</p>
          <p>{{ $t("page.text84") }}</p>
        </div>
        <div class="bot-btn" @click="showGg = false">
          {{ $t("page.text74") }}
        </div>
      </div>
    </popup> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import baseRadio from "element/base-radio";
const axios = require("axios");
import { HttpIPUri } from "@/assets/js/config";

export default {
  components: {
    baseRadio
  },
  computed: {
    ...mapGetters({
      getregulations: "user/getregulations",
      userInfo: "user/userInfo"
    }),
    msg() {
      if (
        (this.usdtNum < this.miniLimit && this.usdtNum != 0) ||
        this.usdtNum > this.maxLimit
      ) {
        return this.buytext;
      } else {
        return "";
      }
    },
    payamount() {
      if (this.rate) {
        return (this.usdtNum * this.rate).toFixed(2);
      }
    },
    //计算当前选择金额符合的 支付方式
    peyTypes() {
      // let types = [];
      // if (this.list && this.list.length > 0) {
      //   types = this.list.filter(
      //     t =>
      //       t.tradeSetting[0].miniLimit <= Number(this.payamount) &&
      //       Number(this.payamount) <= t.tradeSetting[0].maxLimit
      //   );
      //   return types;
      // }
      return this.list;
    }
  },
  data() {
    return {
      imageUrl: localStorage.getItem("imageUrl"),
      usdtNum: 0,
      commonList: [],
      value: "1",
      payType: "",
      inputbuytext: "",
      buytext: "",
      miniLimit: 0,
      maxLimit: 0,
      rate: 0,
      currencySymbol: "",
      loading: false,
      isIOS: false,
      isAndroid: false,
      merchantId: "",
      volume: "",
      volumerate: "",
      currentitem: null,
      tradeList: [],
      showGg: false,
      lang: localStorage.getItem("language") || "zh",
      list: null,
      showBank: false,
      currentnum: 0,
      itemList: [], //充值金额
      rechargeGiveList: [] //赠送配置
    };
  },
  created() {
    if (!document.getElementById("cityjson")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "cityjson";
      script.src = "https://pv.sohu.com/cityjson?ie=utf-8";
      const head = document.getElementsByTagName("head")[0];
      (head || document.body).appendChild(script);
    }
    this._getRealnameGrade();
    this.getList();
    this._queryRechargeConfig();
    //miniLimit   ~ maxLimit
    var u = navigator.userAgent,
      app = navigator.appVersion;
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    this.isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
  },
  methods: {
    ...mapActions({
      merchantList: "user/merchantList",
      getRealnameGrade: "user/getRealnameGrade", //
      otcPay: "user/otcPay", //usdt商家购买
      otcPay2: "user/otcPay2", //usdt商家购买
      queryRechargeConfig: "user/queryRechargeConfig"
    }),
    chose() {
      this.showBank = true;
    },
    _getRealnameGrade() {
      this.getRealnameGrade();
    },
    filteritem(item) {
      if (this.rechargeGiveList) {
        let currentGive = this.rechargeGiveList.find(t => t.amount == item);
        return currentGive ? (item * currentGive.giveRatio) / 100 : 0;
      }
      return 0;
    },
    selectNum(item) {
      this.usdtNum = item;
      // this.currentitem = this.peyTypes[0];
      this.setDefaultItem();
    },
    checked(item) {
      console.log(item);
      this.currentitem = item;
      this.setDefaultItem();
    },
    canclePop() {
      this.showBank = false;
    },
    checkBank(item, index) {
      console.log(item);
      this.commonList = [];
      this.commonList.push(item);
      this.showBank = false;
      this.setDefaultItem();
    },
    getBank() {
      this.showBank = true;
    },
    _queryRechargeConfig() {
      let _this = this;
      this.queryRechargeConfig().then(res => {
        if (res) {
          _this.itemList = res.itemList;
          _this.rechargeGiveList = res.rechargeGiveList;
          this.usdtNum = res.itemList[0];
          this.currentnum = res.itemList[0];
        }
      });
    },
    getList() {
      let params = {
        status: true,
        type: "BUY",
        page: 1,
        size: 100
      };
      let _this = this;
      this.merchantList(params).then(res => {
        console.log(res);
        _this.list = res.records;
        _this.currentitem = _this.list[0];
        _this.tradeList = _this.list[0].tradeSetting;
        _this.setDefaultItem();
        console.log("this.list", _this.list);
      });
    },
    setDefaultItem() {
      if (!this.currentitem) this.currentitem = this.list[0];
      let item = this.currentitem.tradeSetting[0];
      this.volume = this.currentitem.volume || "-";
      this.volumerate = this.currentitem.probability
        ? this.currentitem.probability.toFixed(2) + "%"
        : "--";
      let obj = {
        name: item.channelName,
        value: item.channelId,
        ...item
      };
      this.commonList.push(obj);
      this.inputbuytext = this.$t("dialog.usdtBuy.placeholder1");
      this.buytext =
        this.$t("dialog.usdtBuy.placeholder2[0]") +
        item.miniLimit +
        "--" +
        item.maxLimit +
        this.$t("dialog.usdtBuy.placeholder2[1]");
      this.miniLimit = item.miniLimit;
      this.maxLimit = item.maxLimit;
      this.rate = this.currentitem.price;
      this.value = item.channelId;
      this.payType = item.tradeTypeEnum;
      this.currencySymbol = this.currentitem.currencySymbol;
      this.merchantId = this.currentitem.merchantId;
      // });
    },
    clear() {
      Object.keys(this.currentitem).forEach(
        key => (this.currentitem[key] = "")
      );
      this.commonList = [];
      this.miniLimit = 0;
      this.maxLimit = 0;
      this.rate = 0;
      this.currencySymbol = "";

      this.usdtNum = "";
      this.value = "";
      this.payType = "";
    },

    changeOption(val, label) {
      this.miniLimit = label.miniLimit;
      this.maxLimit = label.maxLimit;

      this.amount = "";
      this.value = val;
      this.payType = label.tradeTypeEnum;

      this.buytext =
        this.$t("dialog.usdtBuy.placeholder1[0]") +
        label.miniLimit +
        "-" +
        label.maxLimit +
        this.$t("dialog.usdtBuy.placeholder1[1]");
    },
    focus() { },
    blur() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    buy() {
      let vm = this;

      if (!this.currentitem) {
        this.$vux.alert.show({
          title: "支付提示",
          content: "请选择支持的支付方式！"
        });
        return;
      }
      if (
        Number(this.payamount) < this.miniLimit ||
        Number(this.payamount) > this.maxLimit
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
      if (!this.userInfo.realAuth) {
        this.$vux.confirm.show({
          title: this.$t("setText.title"),
          content: this.$t("common.noreal"),
          confirmText: this.$t("common.goreal"),
          cancelText: this.$t("common.text3"),
          onCancel() {
            console.log("plugin cancel");
          },
          onConfirm() {
            vm.$router.push("/setting/primary-certification");
          }
        });
        return;
      }
      let ipStr = window.returnCitySN ? returnCitySN["cip"] : "";
      let params = {
        usdtId: this.currentitem.id,
        price: this.rate,
        channelId: this.value,
        id: this.merchantId,
        usdtNum: Number(this.usdtNum),
        currencyType: this.currencySymbol,
        amount: Number(this.payamount)
      };
      if (this.merchantId == 21 || this.merchantId == 63) {
        params.type = "WAP";
        params.userIp = ipStr;
      }
      this.$vux.loading.show({
        text: this.$t("my.setting.text68")
      });
      // console.log("paramsparams", params);
      this.otcPay(params)
        .then(res => {
          console.log("resres", res);
          this.$vux.loading.hide();
          if (res.code == 0) {
            let payurl = res.data.pay_url ? res.data.pay_url : res.data.payUrl;
            if (
              this.merchantId == 24 ||
              this.merchantId == 48 ||
              this.merchantId == 55 ||
              this.merchantId == 60 ||
              this.merchantId == 58
            ) {
              sessionStorage.setItem(
                "payData",
                JSON.stringify(
                  this.merchantId == 48 ||
                    this.merchantId == 55 ||
                    this.merchantId == 60 ||
                    this.merchantId == 58
                    ? res.data.data
                    : res.data
                )
              );
              this.$router.push({
                path: "/payDetail"
              });
            } else if (this.merchantId == 21) {
              sessionStorage.setItem("payurl", payurl);
              sessionStorage.setItem("money", this.payamount);
              this.$router.push("/ercode");
            } else {
              // 支付宝不支持，暂时先不用
              sessionStorage.setItem("payurl", payurl);
              this.$router.push("/payPage");
            }
          } else {
            if (res.code == "4129") {
              this.$vux.toast.text("您已超过充币/购币总额度", "middle");
            } else if (res.code == "4130") {
              this.$vux.confirm.show({
                title: this.$t("setText.title"),
                content:
                  "您已超过充币/购币总额度，</br>" +
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
              this.$vux.toast.text(res.msg || this.$t("page.text62"), "middle");
            }
          }
        })
        .catch(res => {
          this.$vux.loading.hide();
        });
    }
  }
};
</script>
<style lang="less" scoped></style>
