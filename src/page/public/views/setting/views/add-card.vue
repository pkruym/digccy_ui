<template>
  <model-full class="addCard fixd-wrap" :title="$t('my.setting.text3')">
    <div class="top-tip">{{ $t("dialog.bandCard.text1") }}</div>
    <ul class="infoList">
      <li class="line05">
        <span class="label">{{ $t("my.setting.text5") }}</span>
        <span>**{{
            getuserInfo.name
              ? getuserInfo.name.substring(
                  getuserInfo.name.length - 1,
                  getuserInfo.name.length
                )
              : ""
          }}</span>
      </li>
      <li class="line05" @click="selectBank">
        <span class="label">{{ $t("my.setting.text73") }}</span>
        <div class="text-box bankname-box">
          <span v-if="userinfo.bankname">{{ userinfo.bankname }}</span>
          <span class="text-box-span" v-if="!userinfo.bankname">{{
            $t("leverageTrading.placeholder2")
          }}</span>
          <div class="flex">
            <img src="@/assets/img/2_7/icon_more@2x.png" alt class="right" />
          </div>
        </div>
      </li>
      <li class="line05">
        <span class="label">{{ $t("my.setting.text9") }}</span>
        <input type="text" :placeholder="$t('my.setting.text10')" v-model="userinfo.bankCardId" />
      </li>
      <li class="line05">
        <span class="label">{{ $t("my.setting.text74") }}</span>
        <div class="text-box" @click="selectprovince">
          <span v-if="userinfo.provinceName">{{ userinfo.provinceName }}</span>
          <span class="text-box-span" v-if="!userinfo.provinceName">{{
            $t("common.text25")
          }}</span>
        </div>
        <div class="flex">
          <img src="@/assets/img/2_7/icon_more@2x.png" alt class="right" />
        </div>
        <div class="text-box" @click="selectcity">
          <span v-if="userinfo.cityName">{{ userinfo.cityName }}</span>
          <span class="text-box-span" v-if="!userinfo.cityName">{{
            $t("common.text26")
          }}</span>
        </div>
        <div class="flex">
          <img src="@/assets/img/2_7/icon_more@2x.png" alt class="right" />
        </div>
      </li>

      <li class="line05">
        <span class="label">{{ $t("my.setting.text65") }}</span>
        <input type="text" :placeholder="$t('my.setting.text64')" v-model="userinfo.branchName" />
      </li>
      <!-- <li class="area line05">
        <span class="label">{{ $t("my.setting.text11") }}</span>
        <telInput v-model="userinfo.phone" ref="telInput"></telInput>
      </li> -->
      <!-- <li class="line05">
        <span class="label">{{ $t("my.setting.text12") }}</span>
        <input type="text" v-model="userinfo.imgCode" />
        <img :src="'data:image/png;base64,' + imageData" @click="clickImageCode" class="imgCode" />
      </li> -->
      <!-- <li>
        <base-input v-model="userinfo.code" :placeholder="$t('dialog.bandCard.placeholder6')">
          <div slot="right-txt" class="code">
            <base-button v-if="pcsBindCard.showContent" type="time" :size="'mini'" @clickEvent="getcode">{{ pcsBindCard.content }}</base-button>
            <div class="daojishi" v-else>
              {{ $t("send.resetCode") }}({{ pcsBindCard.countDown }}s)
            </div>
          </div>
        </base-input>
      </li> -->
    </ul>
    <!-- <p class="prompt">{{ prompt }}</p> -->
    <div class="btn-box">
      <base-button @clickEvent="validadd">{{
        $t("my.feedback.text5")
      }}</base-button>
    </div>
    <yd-popup v-model="showvalidPhone" class="pc-popup" position="bottom">
      <div class="bank-content">
        <div class="valid-head line05">
          <span>{{ $t("common.text31") }}</span>
          <span @click="showvalidPhone = false">{{
            $t("setText.text15")
          }}</span>
        </div>
        <div class="mobilphone">
          {{
            getuserInfo.mobilephone
              ? getuserInfo.mobilephone.substring(0, 3) +
                "****" +
                getuserInfo.mobilephone.substring(7, 11)
              : ""
          }}
        </div>
        <div class="valid-box">
          <base-input :placeholder="$t('register.text2')" v-model="userinfo.imgCode">
            <div slot="right" class="img">
              <img :src="'data:image/png;base64,' + imageData" @click="clickImageCode" class="imgCode" />
            </div>
          </base-input>
        </div>
        <div class="valid-box">
          <base-input v-model="userinfo.code" :placeholder="$t('dialog.bandCard.placeholder6')">
            <div slot="right-txt" class="code">
              <base-button v-if="pcsBindCard.showContent" type="time" :size="'mini'" @clickEvent="getcode">{{ pcsBindCard.content }}</base-button>
              <div class="daojishi" v-else>
                {{ $t("send.resetCode") }}({{ pcsBindCard.countDown }}s)
              </div>
            </div>
          </base-input>
        </div>
        <div class="confrim-btn">
          <div @click="query">{{ $t("setText.text31") }}</div>
        </div>
      </div>
    </yd-popup>

    <yd-popup v-model="showcity" class="pc-popup" position="bottom">
      <div class="bank-content">
        <div class="bank-list-box">
          <div @click="changecity(item)" :class="userinfo.provinceName == item.name ? 'active' : ''" v-for="item in citys">
            {{ item.name }}
          </div>
        </div>
        <div class="bank-btn">
          <div @click="showbank = false">{{ $t("setText.text15") }}</div>
        </div>
      </div>
    </yd-popup>
    <!--银行卡-->
    <yd-popup v-model="showbank" class="pc-popup" position="bottom">
      <div class="bank-content">
        <div class="bank-list-box">
          <div @click="changebank(item)" :class="userinfo.bankCode == item.code ? 'active' : ''" v-for="item in banklist">
            {{ item.label }}
          </div>
        </div>
        <div class="bank-btn">
          <div @click="showbank = false">{{ $t("setText.text15") }}</div>
        </div>
      </div>
    </yd-popup>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import BaseInput from "@/components/element/base-input";
import BaseButton from "@/components/element/base-button";
import { mapGetters, mapActions } from "vuex";
import { chinadivisions } from "@/assets/componentsJs/city.js";
import { pcsBindCard } from "@/assets/componentsJs/phoneCodeShow";
import {
  Group,
  Value2nameFilter as value2name,
  Countdown,
  Actionsheet
} from "vux";
export default {
  components: {
    ModelFull,
    Countdown,
    BaseInput,
    BaseButton,
    Actionsheet
  },
  data() {
    return {
      img: "",
      showbank: false,
      showvalidPhone: false,
      pcsBindCard: pcsBindCard,
      showcity: false,
      imgTimer: "",
      telCode: "86",
      location: [],
      userinfo: {
        name: "",
        bankCode: "",
        bankCardId: "",
        bankname: "",
        provinceName: "",
        cityName: "",
        mobilePhone: "",
        smsCode: "",
        branchName: "",
        imgCode: "",
        code: ""
      },
      selectcitytype: 1,
      canbtn: false,
      time2: 60,
      start: false,
      sessionId: "",
      banklist: [],
      citys: []
    };
  },
  computed: {
    ...mapGetters({
      imageData: "user/imageData",
      imgSessionId: "user/imgSessionId",
      getuserInfo: "user/userInfo"
    })
  },
  methods: {
    ...mapActions({
      getImgCode: "user/codeImage",
      getPhoneCode: "user/codeSMSSend",
      bankCardBind: "user/bankCardBind", //绑定银行卡
      querybankList: "system/system/querybankList"
    }),
    selectprovince() {
      this.selectcitytype = 1;
      this.showcity = true;
      this.citys = chinadivisions;
      this.userinfo.cityName = "";
    },
    selectcity() {
      if (!this.userinfo.provinceName) {
        //{{$t('common.text25')}}
        this.showToastText("请先择省级信息!");
        return;
      }
      this.citys = chinadivisions.find(
        t => t.name == this.userinfo.provinceName
      ).children;
      this.selectcitytype = 2;
      this.showcity = true;
    },
    changecity(item) {
      if (this.selectcitytype == 1) {
        this.userinfo.provinceName = item.name;
      } else {
        this.userinfo.cityName = item.name;
      }
      this.showcity = false;
    },
    changebank(item) {
      this.userinfo.bankCode = item.code;
      this.userinfo.bankname = item.label;
      this.showbank = false;
    },
    selectBank() {
      this.showbank = true;
    },
    clickMenu(val, val1) {
      this.showbank = false;
    },
    _querybankList() {
      let _this = this;
      this.querybankList().then(res => {
        let list = [];
        res.forEach(element => {
          let b = {
            label: element.name,
            code: element.code
          };
          list.push(b);
        });
        _this.banklist = list;
      });
    },
    onShaowChange(ids, names) { },
    queryAddress(value) { },
    clickImageCode() {
      if (this.imgTimer) {
        clearTimeout(this.imgTimer);
      }
      this.requestImgCode();
    },
    requestImgCode() {
      this.getImgCode();
      // this.imgTimer = setTimeout(this.requestImgCode.bind(this), 60 * 1000);
    },
    showToastText(msg, position = "middle") {
      this.$vux.toast.text(msg, position);
    },
    validPhone() {
      if (this.userinfo.phone == "") {
        this.showToastText(this.$t("forget.text1"));
        return false;
      }
      return true;
    },
    getcode() {
      if (this.userinfo.imgCode.length < 1) {
        this.$vux.toast.text(this.$t("my.setting.text17"), "middle");
        return;
      }
      let imgCode = this.userinfo.imgCode;
      let parmas = {
        mobilephone: this.getuserInfo.mobilephone,
        sessionId: this.imgSessionId, // 绑定银行卡
        verifyCode: imgCode,
        areaCode: "86"
      };
      this.$dialog.loading.open(this.$t("send.loading"));
      this.getPhoneCode(parmas)
        .then(res => {
          this.$dialog.loading.close();
          this.showToastText(
            this.$t("setText.text21") +
            "****" +
            parmas.mobilephone.substring(7),
            "middle"
          );
          pcsBindCard.click();
        })
        .catch(err => {
          this.$dialog.loading.close();
          this.showToastText(err);
          this.clickImageCode();
        });
    },
    validadd() {
      if (!this.getuserInfo.realAuth) {
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
      /**
       * 验证开户行
       */
      if (this.userinfo.bankname.length < 1) {
        this.$vux.toast.text(this.$t("common.text28"), "middle");
        return;
      }
      if (!this.userinfo.provinceName) {
        this.$vux.toast.text(this.$t("common.text27"), "middle");
        return;
      }
      if (!this.userinfo.cityName) {
        this.$vux.toast.text(this.$t("common.text29"), "middle");

        return;
      }
      /**
       * 验证支行
       */
      if (this.userinfo.branchName.length < 1) {
        this.$vux.toast.text(this.$t("common.text30"), "middle");
        return;
      }
      /**
       * 验证银行卡
       */
      if (!/^(\d{16}|\d{19})$/.test(this.userinfo.bankCardId)) {
        this.$vux.toast.text(this.$t("my.setting.text19"), "middle");
        return;
      }

      /**
       * 验证 验证码
       */

      this.showvalidPhone = true;
      this.userinfo.code = "";
      this.userinfo.imgCode = "";
    },
    query() {
      if (!/\d{4}/.test(this.userinfo.code)) {
        this.$vux.toast.text(this.$t("my.setting.text20"), "middle");
        return;
      }
      let params = {
        mobilePhone: this.getuserInfo.mobilephone,
        bankCardId: this.userinfo.bankCardId,
        provinceName: this.userinfo.provinceName,
        cityName: this.userinfo.cityName,
        branchName: this.userinfo.branchName,
        bankCode: this.userinfo.bankCode,
        smsCode: this.userinfo.code
      };
      this.bankCardBind(params)
        .then(res => {
          this.$vux.toast.text(this.$t("my.setting.text21"), "middle");
          this.showvalidPhone = false;
          if (window.history.length > 2) {
            this.$router.go(-1);
          } else {
            this.$router.push({ path: "/ower" });
          }
        })
        .catch(err => {
          this.$vux.toast.text(err, "middle");
        });
    }
  },
  mounted() {
    let vm = this;
    if (!this.getuserInfo.realAuth) {
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
  },
  created() {
    this.clickImageCode();
    this._querybankList();

    console.log("ssssschinadivisions", chinadivisions);
  },
  beforeDestroy() {
    this.clickImageCode();
  }
};
</script>
<style lang="less" scoped>
.group-picker {
  width: 100%;
  /deep/ .weui-cells {
    width: 100%;
    .weui-cell {
      padding: 10px 0px !important;
    }
  }
}
/deep/.weui-cells:after {
  border-bottom: 0px solid #e8ecef !important;
  bottom: 1px !important;
}
.addCard {
  height: 100%;
  .btn-box {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    padding: 0 0.5rem;
    margin-top: 0.4rem;
  }
  .prompt {
    font-size: 0.24rem;
    color: rgb(255, 43, 72);
    margin-top: 0.2rem;
    padding: 0 0.5rem;
  }
  .top-tip {
    background: rgba(254, 153, 49, 0.2);
    height: 0.88rem;
    width: 100%;
    line-height: 0.44rem;
    font-size: 14px;
    color: #fe8000;
    padding-left: 15px;
    display: flex;
    align-items: center;
  }
  .infoList {
    padding: 0 0.3rem;
    li {
      height: 1.1rem;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:last-child {
        border-bottom: none;
        .input-box {
          margin-bottom: 0;
        }
      }
      &.area {
        display: flex;
        /deep/.tel {
          padding-left: 0.4rem;

          .input {
            margin-bottom: 0;
            .input-box__left {
              border: none;
              input {
                background: @bodyBg;
                border: 1px solid #687284;
                font-size: 0.28rem;
                border: none;
              }
            }
          }
          .quhao {
            margin-bottom: 0;
            border: none;
            .num {
              font-size: 0.28rem;
            }
          }
        }
      }
      .label {
        color: @txtColor;
        font-size: 0.28rem;
        width: 40%;
      }

      .text-box {
        width: 30%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        text-align: right;
        align-items: center;
        .text-box-span {
          font-size: 14px;
          color: #8c9fad;
        }
      }
      .bankname-box {
        text-align: right;
        .text-box-span {
          font-size: 14px;
          color: #8c9fad;
        }
      }
      div {
        img {
          width: 14px;
          height: 14px;
        }
      }
      input {
        padding-left: 0.1rem;
        font-size: 0.28rem;
        width: 4rem;
        background: transparent;
        border: 1px solid @inputBorder;
        border: none;
        color: @txtColor;
        height: 1.1rem;
        width: 100%;
        text-align: right;
        &:placeholder {
          color: @blueyGrey;
        }
        &::-webkit-input-placeholder {
          color: #adb3c1 !important;
          font-size: 0.28rem;
        }
      }
      .getcode {
        // width: 1.7rem;
        height: 0.88rem;
        // border: none;
        color: #e0ecf7;
        // background: @darkSkyBlue;
        position: absolute;
        right: 0rem;
        top: 0.14rem;
        border-radius: 4px;
        font-size: 0.24rem;
      }
      .imgCode {
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0.05rem;
      }
    }
  }
}
</style>
