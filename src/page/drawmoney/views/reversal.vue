<template>
  <model-full :title="$t('navbar.coinCharging')" class="model fixd-wrap">
    <div id="coincharging" class="coincharging">
      <textarea id="input"></textarea>
      <div class="coincharging-main">
        <!-- <div class="title">
          <p>USDT{{ $t("legalTransaction.coinChargingAddress") }}</p>
          <p>({{ $t("legalTransaction.text1") }} ERC20)</p>
        </div> -->
        <div class="code-main">
          <div class="code-wrap">
            <div id="qrcode" class="qrcode" ref="qrcode"></div>
          </div>
          <!-- <div class="mask"></div> -->
          <!-- <yd-button type="hollow" @click.native="saveQRcode">保存二维码</yd-button> -->
          <div class="bg-btn">只支持USDT-ERC20资产</div>
        </div>
        <div class="coincharging-address">
          <div class="address">{{ address }}</div>
          <div
            class="btn"
            v-if="!isAndroid"
            　v-clipboard:copy="address"
            　　v-clipboard:success="copy"
          >
            {{ $t("legalTransaction.text2") }}
          </div>
          <div class="btn" @click="andCopy(address)" v-if="isAndroid">
            {{ $t("legalTransaction.text2") }}
          </div>
          <!-- <div class="address-title">
            {{ $t("legalTransaction.coinChargingAddress") }}
          </div>
          <div class="address">{{ address }}</div> -->
          <!-- <yd-button
          type="hollow"
          　v-clipboard:copy="address"
          　　v-clipboard:success="copy"
          　　v-if="!isAndroid"
        >复制地址</yd-button>
          <yd-button type="hollow" @click.native="andCopy(address)" v-if="isAndroid">复制地址</yd-button>-->
        </div>
      </div>
      <div class="tip-text">
        <p>{{ $t("legalTransaction.text3") }}</p>
        <p>{{ $t("legalTransaction.text4") }}</p>
        <p>{{ $t("legalTransaction.text5") }}</p>
      </div>
    </div>
  </model-full>
</template>
<script>
import QRCode from "qrcodejs2";
import { mapActions, mapGetters } from "vuex";
import ModelFull from "element/model-full";

export default {
  components: {
    QRCode,
    ModelFull
  },

  data() {
    return {
      // money: (sessionStorage.getItem("money") * 1).toFixed(2),
      address: "",
      isAndroid: false,
      isIOS: false,
      symbol: "SYSTEM"
    };
  },
  mounted() {
    this.getUrl();
    // this.qrcode();
  },
  computed: {
    ...mapGetters({
      userinfo: "user/userInfo"
    })
  },
  created() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    this.isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  },
  methods: {
    ...mapActions({
      burselist: "user/burselist" //查询用户钱包列表
    }),
    qrcode() {
      let qrcode = new QRCode("qrcode", {
        width: 172, // 设置宽度
        height: 172 // 设置高度
      });
      qrcode.makeCode(this.address);
    },

    saveQRcode: function() {
      //下载二维码文件
      this.$dialog.toast({
        mes: "保存成功",
        timeout: 1000
      });
    },

    // 获取地址
    getUrl() {
      let params = {
        userIdList: [],
        symbol: "SYSTEM"
      };
      params.userIdList.push(this.userinfo.id);
      this.burselist(params)
        .then(res => {
          if (res) {
            this.address = res[0].address;
            this.qrcode();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    andCopy(val) {
      if (window.appInterface) {
        window.appInterface.copyCurrencyAddress(val);
      }
    },
    copy(val) {
      this.$vux.toast.text("复制成功", "middle");
    }
  }
};
</script>

<style lang="less" scoped>
.coincharging {
  height: 100%;
  background: #171e25;
  padding-top: 1.2rem;
  padding: 1.2rem 0.5rem 0;
  // background: #21303d;
  height: 100%;
  #input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -10;
  }
  .coincharging-main {
    text-align: center;
    padding: 0 0 0.7rem;
    .title {
      p {
        font-size: 0.36rem;
        color: rgb(42, 204, 166);
      }
    }
    .code-main {
      margin-top: 0.22rem;
      position: relative;
      .code-wrap {
        background-color: #fff;
        padding: 5px;
        width: 3rem;
        height: 3rem;
        margin: 0 auto;
        box-sizing: content-box;
      }
      .mask {
        position: absolute;
        width: 3rem;
        height: 3rem;
        background: rgba(0, 100, 255, 0.2);
        top: 0;
        left: 50%;
        margin-left: -1.72rem;
      }
      .qrcode {
        width: 100%;
        /deep/ img {
          width: 3rem;
          height: 3rem;
        }
      }

      .bg-btn {
        margin: 0 auto;
        margin-top: 25px;
        width: 80%;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: @blueColor;
        background: rgba(42, 204, 166, 0.2);
        border: 1px solid @blueColor;
        border-radius: 2px;
      }
    }
    .coincharging-address {
      margin-top: 0.52rem;
      display: flex;
      height: 44px;
      align-items: center;
      flex-wrap: wrap;

      .address-title {
        font-size: 0.24rem;
        color: @txtColor;
      }
      .address {
        padding: 5px;
        color: #fefffe;
        font-size: 12px;
        width: 4.9rem;
        height: 44px;
        background-color: #000;
        word-wrap: break-word;
        word-break: normal;
        text-align: left;
      }
      .btn {
        // background: rgb(148, 159, 172);
        color: #fff;
        font-size: 0.24rem;
        height: inherit;
        padding: 0.24rem;
        border: none;
        background: #2acca6;
        border-radius: 0 2px 2px 0;
        // width: 2rem;
        // margin: 0 auto;
      }
    }
  }
  .tip-text {
    padding-left: 0.3rem;
    p {
      font-size: 0.24rem;
      color: #cfd3e9;
      line-height: 0.44rem;
    }
  }
}
</style>
