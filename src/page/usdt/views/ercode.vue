<template>
  <modelFull title="支付宝支付" id="ercode">
    <div class="code-main">
      <!-- <yd-countdown slot="right" :time="300" timetype="second" done-text="支付已超时">
      <em>{%d0}</em><em>{%d1}</em><em>{%d2}</em>天
      <em>{%h1}</em><em>{%h2}</em>小时
      <div class="time-box">为保障充值成功，请在{%m1}{%m2}:{%s1}{%s2}内完成转账</div>
      </yd-countdown>-->
      <!-- <div class="ercode-text">
        支付宝支付会随机风控风险提示，请放心支付充值
      </div> -->
      <div class="ercode-box">
        <div class="ercode-money">￥{{ money }}</div>
        <div class="ercode-img" id="qrcode" ref="qrcode"></div>
      </div>
      <div class="step-box">
        <p>
          <span>1、</span>
          <span>截图保存当前界面至系统相册</span>
        </p>
        <p>
          <span>2、</span>
          <span>打开支付宝扫一扫选择相册识别二维码扫一扫转账付款。</span>
          <!-- 或直接打开支付宝 -->
        </p>
        <p>
          <span>3、</span>
          <span>付款成功充值金额会实时到账</span>
        </p>
        <!-- <p>
          <span>4、</span>
          <span>点击按钮不跳转，请用支付宝APP扫码支付</span>
        </p> -->
        <p>
          <span>4、</span>
          <span>若扫码无效代表已过期，请重新发起支付。</span>
        </p>
      </div>
      <!-- <div class="btn-pay">
        <div class="btn" @click="open">打开支付宝</div>
      </div> -->
    </div>
  </modelFull>
</template>
<script>
import QRCode from "qrcodejs2";
import { Clocker } from "vux";
import modelFull from "element/model-full";

export default {
  components: {
    QRCode,
    Clocker,
    modelFull
  },
  mounted() {
    this.qrcode();
  },
  data() {
    return {
      money: (sessionStorage.getItem("money") * 1).toFixed(2)
    };
  },
  methods: {
    qrcode() {
      let payUrl = sessionStorage.getItem("payurl") || "";
      let qrcode = new QRCode("qrcode", {
        width: 179, // 设置宽度
        height: 179, // 设置高度
        text: `${payUrl}`
      });
    },
    open() {
      let payUrl = sessionStorage.getItem("payurl") || "";
      if (window.appInterface) {
        window.appInterface.goToBrowser(payUrl);
      } else if (window.webkit) {
        window.webkit.messageHandlers.OpenSafari.postMessage({
          url: payUrl
        });
      } else {
        window.location.href = payurl;
      }
    }
  }
};
</script>

<style lang="less" scoped>
#ercode {
  background: #fff;
  height: 100%;
  .code-main {
    padding-top: 0.92rem;
  }
  .time-box {
    text-align: center;
    height: 0.64rem;
    line-height: 0.64rem;
    background: #ffe3ba;
    color: #ff7100;
    font-size: 0.32rem;
  }
  .ercode-box {
    width: 3.84rem;
    margin: 0.48rem auto;
    text-align: center;
    .ercode-money {
      font-size: 0.6rem;
      color: #000000;
      margin-bottom: 0.6rem;
    }
    .ercode-img {
      margin-bottom: 0.48rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .ercode-text {
    background: #fff9ed;
    height: 0.76rem;
    line-height: 0.76rem;
    text-align: center;
    color: #ff6010;
    font-size: 14px;
  }
  .step-box {
    width: 6.9rem;
    margin: 0 auto;
    border: 1px solid @lineColor;
    padding: 0.2rem 0.4rem;
    background: @markBg;
    p {
      font-size: 0.28rem;
      color: #686868;
      display: flex;
      span {
        line-height: 29px;
      }
    }
  }
}
.btn-pay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  .btn {
    width: 6.9rem;
    height: 0.88rem;
    color: @writeColor;
    background: @blueColor;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }
  p {
    color: @txt2Color;
  }
}
</style>
