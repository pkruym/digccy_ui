<template>
  <div id="coincharging" class="coincharging">
    <div class="erc-box">
      <label>USDT</label>
      <span>{{displayName}}</span>
    </div>
    <div class="cz-type">
      <!-- 充币方式 -->
      <p>{{ $t("setText.text23") }}</p>
      <div class="cz-btns">
        <template v-for="item in burseList">
          <span :class="{'is-check':currentBurseItem.id==item.id}" @click="chooseItem(item)">{{item.displayName}}</span>
        </template>
        <!-- <span :class="{'is-check':czType==2}" @click="czType=2">钱包充币</span> -->
      </div>
    </div>
    <textarea id="input" class="txtCopyAddress"></textarea>
    <div class="coincharging-main">
      <div class="code-main">
        <div class="code-wrap">
          <div id="qrcode" class="qrcode" ref="qrcode"></div>
        </div>
        <!-- <div class="mask"></div> -->
        <!-- <yd-button type="hollow" @click.native="saveQRcode">保存二维码</yd-button> -->
        <div class="bg-btn">{{$t('page.text30')}}{{displayName}}{{$t('page.text301')}}</div>
      </div>
      <div class="coincharging-address">
        <!-- 充币地址 -->
        <p>{{ $t("legalTransaction.coinChargingAddress") }}</p>
        <p class="address">{{address}}</p>
        <div class="copy" v-clipboard:copy="address" 　v-clipboard:success="copy">
          <!-- 复制地址 -->
          <span>{{ $t("legalTransaction.text2") }}</span>
        </div>
      </div>
    </div>

    <!-- 充值活动 -->
    <!-- <p class="give-tip">{{$t('page.text87')}}</p>

    <div class="chong-guize">

      <p>{{ $t("setText.text24") }}</p>
      <img src="@img/2_8/img_guize.png" alt />
    </div> -->
    <div class="tip-text">
      <h2>{{$t('page.text58')}}</h2>
      <p>{{ $t("legalTransaction.text3") }}{{displayName}}{{ $t("legalTransaction.text333") }}</p>
      <p>{{ $t("legalTransaction.text4") }}</p>
      <p>{{minAmountText}}</p>
      <p>{{ $t("legalTransaction.text5") }}</p>
      <p>{{$t('legalTransaction.text59')}}</p>
      <p>{{$t('legalTransaction.text60')}}<span @click="$router.push('/service')">{{$t('legalTransaction.text61')}}</span>
      </p>
    </div>
    <div class="img">
      <img src="@img/img_logo@2x.png"></img>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    QRCode,
  },
  data() {
    return {
      address: "",
      isAndroid: false,
      isIOS: false,
      symbol: "SYSTEM",
      czType: 1,
      burseList: null,
      currentBurseItem: null,
      displayName: 'ERC20'
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters({
      userinfo: "user/userInfo",
    }),
    minAmountText() {
      let lang = localStorage.getItem("language") || "zh";
      if (this.currentBurseItem) {
        let { minAmount } = this.currentBurseItem;
        if (lang == "zh") {
          return `3.最小充币金额：${minAmount}USDT，小于最小金额的充币将不会上账且无法退回。`;
        } else {
          return `3. Minimum deposit amount: ${minAmount}USDT. Deposits smaller than the minimum amount will not be posted and cannot be returned.`;
        }
      }
    },
  },
  created() {
    let { token } = this.$route.query;
    if (token) {
      localStorage.setItem("token", token);
    }
    var u = navigator.userAgent,
      app = navigator.appVersion;
    this.isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
    this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  },
  methods: {
    ...mapActions({
      // burselist: "user/burselist", //查询用户钱包列表,
      otcUrl: "user/otcPay", //查询用户钱包列表,
      queryBurseList: "system/system/queryDisplayList",
    }),
    getData() {
      this.queryBurseList().then((res) => {
        console.log("充币地址", res);
        this.burseList = res || [];
        if (this.burseList.length > 0) {
          this.currentBurseItem = this.burseList[0];
          this.displayName = this.currentBurseItem.displayName
          this.getUrl();
        }
      });
    },
    chooseItem(item) {
      this.currentBurseItem = item;
      this.address = "";
      this.displayName = item.displayName
      this.getUrl();
    },
    qrcode() {
      this.$refs.qrcode.innerHTML = "";
      if (this.address == "") return;
      let qrcode = new QRCode("qrcode", {
        width: 150, // 设置宽度
        height: 150, // 设置高度
      });
      qrcode.makeCode(this.address);
    },

    saveQRcode: function () {
      //下载二维码文件
      this.$dialog.toast({
        mes: "保存成功",
        timeout: 1000,
      });
    },

    // 获取地址
    getUrl() {
      let { channelId, payId } = this.currentBurseItem;
      let params = {
        channelId,
        id: payId,
      };
      console.log("获取充币二维码地址参数", this.currentBurseItem);
      this.otcUrl(params)
        .then((res) => {
          if (res) {
            console.log("获取充币二维码地址", res);
            if (res && res.code == 0) {
              this.address = res.data.content;
            }
            this.qrcode();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    andCopy(val) {
      let text = val.text;
      if (window.appInterface) {
        window.appInterface.copyAddress(val);
      }
    },
    copy(val) {
      this.andCopy(val);
      this.$vux.toast.text("复制成功", "middle");
    },
  },
};
</script>
