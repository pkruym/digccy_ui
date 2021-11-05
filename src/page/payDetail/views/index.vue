<template>
  <model-full id="detail" title="支付">
    <div>
      <textarea id="input"></textarea>
      <div class="charge-info">
        <div class="title">
          <!-- {{ $t("payDetail.text1") }} -->
          <div class="ico"></div>
          <span>请通过 </span> <span> 手机银行/支付宝 </span>
          <span> 转账到如下商户的银行账户</span>
        </div>
        <ul>
          <li class="no-border" v-if="payData.amount">
            <p>{{ $t("payDetail.text12") }}：</p>
            <p class="pay-amount">
              ￥<span>{{ payData.amount }}</span>
            </p>
            <div
              type="hollow"
              class="button"
              　v-clipboard:copy="payData.amount"
              　　v-clipboard:success="copy"
            >
              {{ $t("payDetail.text3") }}
            </div>
          </li>
          <li class="mini">
            <p class="tips">
              请复制正确带小数点金额，否则不到账，损失由客户自行承担!
            </p>
          </li>
          <li>
            <p>{{ $t("payDetail.text2") }}：</p>
            <p>{{ payData.xingming ? payData.xingming : "" }}</p>
            <div
              type="hollow"
              class="button"
              　v-clipboard:copy="payData.xingming"
              　　v-clipboard:success="copy"
            >
              {{ $t("payDetail.text3") }}
            </div>
            <!-- <yd-button type="hollow" @click.native="andCopy(payData.xingming)" v-if="isAndroid">复制</yd-button> -->
          </li>
          <li>
            <p>{{ $t("payDetail.text4") }}：</p>
            <p>{{ payData.bank }}</p>

            <div
              type="hollow"
              class="button"
              　v-clipboard:copy="payData.bank"
              　　v-clipboard:success="copy"
            >
              {{ $t("payDetail.text3") }}
            </div>
            <!-- <yd-button type="hollow" @click.native="andCopy(payData.bank)" v-if="isAndroid">复制</yd-button> -->
          </li>
          <li>
            <p>{{ $t("payDetail.text5") }}：</p>
            <p>{{ payData.bank_no }}</p>

            <div
              type="hollow"
              class="button"
              　v-clipboard:copy="payData.bank_no"
              　　v-clipboard:success="copy"
            >
              {{ $t("payDetail.text3") }}
            </div>
            <!-- <yd-button type="hollow" @click.native="andCopy(payData.bank_no)" v-if="isAndroid">复制</yd-button> -->
          </li>
          <!-- <li>
          <p>附言码：{{payData.c2c_fuyanma}}</p>
          <yd-button
            type="hollow"
            　v-clipboard:copy="payData.c2c_fuyanma"
            　　v-clipboard:success="copy"
            　　v-if="!isAndroid"
          >复制</yd-button>
          <yd-button type="hollow" @click.native="andCopy(payData.c2c_fuyanma)" v-if="isAndroid">复制</yd-button>
        </li>-->
          <li v-if="payData.bankofdeposit">
            <p>{{ $t("payDetail.text6") }}：</p>
            <p>{{ payData.bankofdeposit }}</p>
            <div
              type="hollow"
              class="button"
              　v-clipboard:copy="payData.bankofdeposit"
              　　v-clipboard:success="copy"
            >
              {{ $t("payDetail.text3") }}
            </div>
            <!-- <yd-button
            type="hollow"
            @click.native="andCopy(payData.bankofdeposit)"
            v-if="isAndroid"
          >复制</yd-button>-->
          </li>
          <li v-if="payData.postscript && payData.postscript != ''">
            <p>{{ $t("payDetail.text13") }}：</p>
            <p>{{ payData.postscript }}</p>
            <div
              type="hollow"
              class="button"
              　v-clipboard:copy="payData.postscript"
              　　v-clipboard:success="copy"
            >
              {{ $t("payDetail.text3") }}
            </div>
          </li>

          <!-- <li><p class="red">（请按照实际金额支付，避免无法匹配到账）</p></li> -->
        </ul>
        <p v-if="payData.postscript" class="tip">
          未填写附言、汇款金额不正确、使用支付宝、微信皆会造成延迟到帐，若有以上情形，请主动联络客服！
        </p>
      </div>
      <div class="text">
        <p class="max-font">{{ $t("payDetail.text7") }}</p>
        <p>{{ $t("payDetail.text8") }}</p>
        <p class="payred">{{ $t("payDetail.text14") }}</p>
        <p class="payred">{{ $t("payDetail.text15") }}</p>
        <p>{{ $t("payDetail.text9") }}</p>
        <!-- <p>2.该页面的商户信息会不定时进行更新，请以页面的商户账户信息为准；</p>
      <p>3.支持网银APP/网上银行进行转账。</p>-->
      </div>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
// import BaseButton from "element/base-button";
// import { Toast } from 'vux'
export default {
  components: {
    ModelFull
    // BaseButton,
    // Toast
  },
  data() {
    return {
      // corName: "广州欧子贸易有限公司",
      // cardName: "中国建设银行广州市广元西路支行",
      // cardId: "44050149070600000984",
      // name: "何飞信",

      payData: {
        xingming: "",
        productname: "",
        bkname: "",
        bkno: "",
        amount: "",
        acctname: "",
        postscript: ""
      },
      isAndroid: false,
      isIOS: false
    };
  },
  created() {
    // this.getPayList();
    this.payData = JSON.parse(sessionStorage.getItem("payData"));
    if (this.payData && this.payData.postscript) {
      // 卓越支付
      let {
        productname,
        bkname,
        bkno,
        amount,
        acctname,
        postscript
      } = this.payData;
      this.payData.xingming = acctname;
      this.payData.bank = bkname;
      this.payData.bank_no = bkno;
      this.payData.amount = amount;
      this.payData.postscript = postscript;
    }
    var u = navigator.userAgent,
      app = navigator.appVersion;
    this.isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  },
  methods: {
    andCopy(val) {
      if (window.appInterface) {
        window.appInterface.copyCurrencyAddress(val);
      }
    },
    copy(val) {
      this.$vux.toast.text(this.$t("payDetail.text10"), "middle");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/colorWrite.less";

#detail {
  background: #f7f7fa;
  height: 100%;
  #input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -10;
  }

  .charge-info {
    background: #fff;
    padding-top: 0.8rem;
    margin-bottom: 0.2rem;

    .title {
      font-size: 0.28rem;
      padding-left: 0.2rem;
      color: rgb(30, 36, 46);
      display: flex;
      justify-items: flex-start;
      align-items: center;
      height: 0.72rem;
      background: rgba(254, 153, 49, 0.2);

      .ico {
        background: url("~@/assets/img/2_7/icon_pay_laba@2x.png") no-repeat;
        background-size: cover;
        height: 0.26rem;
        width: 0.32rem;
        margin-right: 0.2rem;
      }

      & > span:nth-of-type(1) {
        font-size: 12px;
        color: #fe8000;
        margin-right: 0.1rem;
      }
      & > span:nth-of-type(2) {
        font-size: 12px;
        color: #ff4d41;
        margin-right: 0.1rem;
      }
      & > span:nth-of-type(3) {
        font-size: 12px;
        color: #fe8000;
      }
    }

    li {
      padding: auto 0.4rem;
      height: 1.48rem;
      line-height: 1.48rem;
      border-bottom: 1px solid @paleGreyTwo;
      display: flex;
      justify-content: flex-start;
      &.no-border {
        border: none;
      }
      p {
        font-family: "DIN-Medium";
        font-size: 16px;
        &.pay-amount span {
          font-size: 30px;
          font-weight: 300;
        }
      }
      & > p:nth-of-type(1) {
        color: #8c9fad;
        margin-left: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 0.5;
      }
      & > p:nth-of-type(2) {
        color: #14181f;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }
      &.mini {
        height: 0.6rem;
        .tips {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          padding: 0 0.1rem;
          width: 100%;
          height: 0.42rem;
          background: #f06e57;
          border-radius: 10.5px;
          color: #fff;
        }
      }
      .button {
        margin: auto 0;
        flex: 0 0 1.36rem;
        width: 1.36rem;
        height: 0.72rem;
        font-size: 13px;
        text-align: center;
        line-height: 0.72rem;
        border: 1px solid rgb(70, 114, 237);
        color: rgb(70, 114, 237);
        outline: none;
        border-radius: 18px;
        margin-right: 20px;
      }
    }
  }

  .text {
    padding: 0.3rem 0.4rem;
    .max-font {
      font-size: 16px;
      color: #14181f;
    }
    p {
      line-height: 0.44rem;
      font-size: 0.24rem;
      color: #14181f;
    }
    .payred {
      color: #ff402c;
    }
  }
  .tip {
    background-color: #f7e19f;
    height: 0.88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
  }
}
</style>
