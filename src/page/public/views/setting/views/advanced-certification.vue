<template>
  <ModelFull title="高级认证" class="realname fixd-wrap">
    <div>
      <div class="realname-info top-title">
        <p class="title">
          {{
            "请务必使用 **" +
              (userInfo.name
                ? userInfo.name.substring(userInfo.name.length - 1)
                : "") +
              "的身份信息"
          }}
        </p>
      </div>
      <div class="realname-info">
        <p class="title">请上传身份证正反面照片</p>
        <div class="realname-box">
          <div class="left">
            <img
              v-lazy="{
                src: headPortrait + form.frontImg,
                error: require('@/assets/img/2_8/icon_gjrz_sfz_zm@2x.png'),
                loading: require('@/assets/img/2_8/icon_gjrz_sfz_zm@2x.png')
              }"
              class="faceurl"
              v-if="form.frontImg && form.frontImg != ''"
            />
            <img v-else src="@/assets/img/2_8/icon_gjrz_sfz_zm@2x.png" alt />
            <base-button>上传人像页照片</base-button>
            <input
              type="file"
              class="face"
              accept="image/*"
              ref="face"
              id="face"
              @change="change($event, 1)"
            />
          </div>
          <div class="right">
            <img
              v-lazy="{
                src: headPortrait + form.backImg,
                error: require('@/assets/img/2_8/icon_gjrz_sfz_fm@2x.png'),
                loading: require('@/assets/img/2_8/icon_gjrz_sfz_fm@2x.png')
              }"
              class="faceurl"
              v-if="form.backImg && form.backImg != ''"
            />
            <img v-else src="@/assets/img/2_8/icon_gjrz_sfz_fm@2x.png" alt />
            <base-button>上传国徽页照片</base-button>
            <input
              type="file"
              class="face"
              accept="image/*"
              ref="face"
              id="face"
              @change="change($event, 2)"
            />
          </div>
        </div>
      </div>
      <div class="realname-info">
        <p class="title">拍摄须知</p>
        <div class="realname-notice">
          <div>
            <img src="@/assets/img/2_8/icon_gjrz_bzps@2x.png" alt />
            <span>标准拍摄</span>
          </div>
          <div>
            <img src="@/assets/img/2_8/icon_gjrz_bgds@2x.png" alt />
            <span>边框丢失</span>
          </div>
          <div>
            <img src="@/assets/img/2_8/icon_gjrz_bsmh@2x.png" alt />
            <span>拍摄模糊</span>
          </div>
          <div>
            <img src="@/assets/img/2_8/icon_gjrz_sggd@2x.png" alt />
            <span>闪光过度</span>
          </div>
        </div>
      </div>
      <div class="line-box"></div>

      <div class="realname-info">
        <div class="title-box">
          <p class="title">请上传手持身份证正反面照</p>
          <p @click="showGg = true">查看范例</p>
        </div>

        <div class="realname-box">
          <div class="left">
            <img
              v-lazy="{
                src: headPortrait + form.holdFrontImg,
                error: require('@/assets/img/2_8/icon_gjrz_scsfz_fm@2x.png'),
                loading: require('@/assets/img/2_8/icon_gjrz_scsfz_fm@2x.png')
              }"
              class="faceurl"
              v-if="form.holdFrontImg && form.holdFrontImg != ''"
            />
            <img v-else src="@/assets/img/2_8/icon_gjrz_scsfz_fm@2x.png" alt />
            <base-button>手持身份证正面</base-button>
            <input
              type="file"
              class="face"
              accept="image/*"
              ref="face"
              id="face"
              @change="change($event, 3)"
            />
          </div>
          <div class="right">
            <img
              v-lazy="{
                src: headPortrait + form.holdBackImg,
                error: require('@/assets/img/2_8/icon_gjrz_scsfz_zm@2x.png'),
                loading: require('@/assets/img/2_8/icon_gjrz_scsfz_zm@2x.png')
              }"
              class="faceurl"
              v-if="form.holdBackImg && form.holdBackImg != ''"
            />

            <img v-else src="@/assets/img/2_8/icon_gjrz_scsfz_zm@2x.png" alt />
            <base-button>手持身份证反面</base-button>
            <input
              type="file"
              class="face"
              accept="image/*"
              ref="face"
              id="face"
              @change="change($event, 4)"
            />
          </div>
        </div>
      </div>
      <div
        v-if="certificationInfo && certificationInfo.status == 'NOTPASS'"
        class="realname-result"
      >
        <p>审核未通过</p>
        <p>理由：{{ certificationInfo.remark }}</p>
      </div>
      <div class="query">
        <base-button @clickEvent="query" class="login-btn">
          <template v-if="!loading">
            提交审核
          </template>
          <img
            v-else
            class="loading-in"
            src="@/assets/img/2_7/icon_loading@2x.png"
          />
        </base-button>
      </div>

      <popup v-model="showGg" class="gg-popup" :show-mask="true">
        <div class="buy-notice">
          <h1>拍摄演示</h1>
          <div class="content">
            <p><span>手持身份证照</span></p>
            <p>人像和证件确保清晰，且使用双手持证，背景墙为白色。</p>
            <p>避免图片出现遮挡光线、反光等情况。</p>
            <img src="@/assets/img/2_8/icom_pssf_zfm@2x.png" alt />
          </div>
          <div class="bot-btn" @click="showGg = false">我知道了</div>
        </div>
      </popup>
    </div>
  </ModelFull>
</template>
<script>
import BaseInput from "@/components/element/base-input";
import ModelTitle from "@/components/element/model-title";
import { mapGetters, mapActions, mapMutations } from "vuex";
import BaseButton from "@/components/element/base-radiu-button";
import ModelFull from "element/model-full";
export default {
  components: {
    BaseInput,
    BaseButton,
    ModelFull,
    ModelTitle
  },
  data() {
    return {
      name: "",
      idcard: "",
      showGg: false,
      loading: false,
      fileTypes: ["image/jpeg", "image/pjpeg", "image/png"],
      headPortrait: localStorage.getItem("imageUrl") || "",
      form: {
        backImg: "",
        frontImg: "",
        holdBackImg: "",
        holdFrontImg: "",
        userId: null
      },
      certificationInfo: {
        status: null,
        remark: null
      }
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  created() {
    this._getCertification();
  },
  methods: {
    ...mapActions({
      certificationApply: "user/certificationApply", //高级认证
      getCertification: "user/getCertification"
    }),
    ...mapMutations({
      setRealAuth: "user/setRealAuth" //实名认证
    }),
    validFileType(file) {
      for (var i = 0; i < this.fileTypes.length; i++) {
        if (file.type === this.fileTypes[i]) {
          return true;
        }
      }
      return false;
    },
    change(event, index) {
      const _this = this;
      const files = event.target.files || event.dataTransfer.files;
      this.file = files[0];

      var formdata1 = new FormData();
      formdata1.append("file", files[0], files[0].name);
      let configFile = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token")
        }
      };

      if (!this.validFileType(this.file)) {
        this.$vux.alert.show({
          title: this.$t("setText.title"),
          content: "图片格式错误"
        });
        return;
      }
      if (this.file.size.toFixed(2) > 1024 * 1024 * 6) {
        this.$vux.alert.show({
          title: this.$t("setText.title"),
          content: "上传图片在6m以内"
        });
        return;
      }
      _this.$vux.loading.show({
        text: "上传中..."
      });
      // 这个接口是上传文件的
      _this.$axios
        .post(`/trade/picture/upload`, formdata1, configFile)
        .then(res => {
          if (res.data.code == "0") {
            _this.$nextTick(t => {
              if (index == 1) _this.form.frontImg = res.data.data;
              if (index == 2) _this.form.backImg = res.data.data;
              if (index == 3) _this.form.holdFrontImg = res.data.data;
              if (index == 4) _this.form.holdBackImg = res.data.data;
            });
          }
          _this.$vux.loading.hide();
        })
        .catch(res => {
          _this.$vux.loading.hide();
        });
    },
    _getCertification() {
      this.getCertification().then(t => {
        this.certificationInfo = t;
      });
    },
    query() {
      if (this.loading) return;
      if (
        this.form.frontImg &&
        this.form.backImg &&
        this.form.holdFrontImg &&
        this.form.holdBackImg
      ) {
        let params = {
          frontImg: this.form.frontImg,
          backImg: this.form.backImg,
          holdFrontImg: this.form.holdFrontImg,
          holdBackImg: this.form.holdBackImg,
          userId: this.userInfo.id
        };
        this.loading = true;
        this.certificationApply(params)
          .then(res => {
            if (res) {
              // this.setRealAuth();
              // this.$vux.toast.text(this.$t("my.myInfo.text19"), "middle");

              if (window.history.length > 2) {
                this.$router.go(-1);
              } else {
                this.$router.push({ path: "/ower" });
              }
              this.loading = false;
            }
          })
          .catch(res => {
            this.loading = false;
            this.$vux.toast.text(res, "middle");
          });
      } else {
        this.$vux.toast.text("请上传完整的审核资料后重试！", "middle");
      }
    }
  }
};
</script>
<style lang="less">
.realname {
  height: 100%;
}
.realname .input-box .input-inbox__left {
  width: 1rem !important;
}
.realname .input-inbox__main {
  font-size: 0.3rem !important;
}
.realname .input-box {
  margin-bottom: 0.3rem !important;
}
</style>

<style lang="less" scoped>
.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e0ecf7;
  background-image: linear-gradient(to right, @carolinaBlue, @darkSkyBlue);
  .loading-in {
    text-align: center;
    height: 20px;
    width: 20px;
    animation: rotating 1.5s linear infinite;
  }
  @keyframes rotating {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(1turn);
    }
  }
}

.gg-popup {
  background: none;
  top: 45%;
  margin: 0 auto;
  margin-top: -3.4rem;
  overflow: initial !important;
  .buy-notice {
    width: 6.06rem;
    margin: 0 auto;
    position: relative;
    background: @writeColor;
    height: 6.74rem;
    border-radius: 5px;
    h1 {
      font-size: 18px;
      color: #161417;
      letter-spacing: 0;
      text-align: center;
      line-height: 20px;
      padding: 25px 0 14px;
    }
    .content {
      height: 5.66rem;
      position: relative;
      padding: 5px 15px;
      overflow-y: scroll;
      p {
        font-size: 14px;
        color: @txtColor;
        letter-spacing: 0;
        line-height: 21px;
        margin-top: 5px;
        &:first-child {
          margin-top: 0;
          margin-bottom: 5px;
        }
        span {
          display: block;
          font-weight: bold;
        }
      }
      img {
        margin-top: 0.2rem;
        height: 1.55rem;
      }
    }
    .bot-btn {
      width: 90%;
      height: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      color: @bodyBg;
      text-align: center;
      position: absolute;
      bottom: 20px;
      left: 5%;
      background: #0066ed;
      border-radius: 2px;
      box-shadow: 0 -3px 15px rgba(80, 95, 107, 0.15);
    }
  }
}
.realname-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #d04b64;
  width: 90%;
  text-align: center;
  margin: 20px auto 0 auto;
  height: 1.22rem;
  & > p:nth-of-type(1) {
    font-size: 13px;
    color: #d04b64;
    text-align: center;
    margin-bottom: 0.1rem;
  }
  & > p:nth-of-type(2) {
    font-size: 12px;
    color: #14181f;
    text-align: center;
  }
}
.realname-info {
  display: flex;
  flex-direction: column;
  margin-top: 22px;
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > p:nth-of-type(1) {
      font-size: 16px;
      color: #14181f;
      margin-left: 15px;
    }
    & > p:nth-of-type(2) {
      font-size: 16px;
      color: #0066ed;
      text-align: right;
      margin-right: 15px;
    }
  }
  .title {
    font-size: 16px;
    color: #14181f;
    margin-left: 15px;
  }

  .realname-box {
    display: flex;
    position: static;
    padding: 22px 15px 0px 15px;
    .left {
      display: flex;
      flex-direction: column;
      margin-right: 15px;
      position: relative;

      img {
        width: 3.3rem;
        height: 1.8rem;
      }
      button {
        width: 3.3rem;
        font-size: 12px;
      }
      .face {
        background: transparent;
        position: absolute;
        width: 3.3rem;
        height: 2.5rem;
        opacity: 0;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      position: relative;

      img {
        width: 3.3rem;
        height: 1.8rem;
      }
      button {
        width: 3.3rem;
        font-size: 12px;
      }
      .face {
        background: transparent;
        position: absolute;
        width: 3.3rem;
        height: 2.5rem;
        opacity: 0;
      }
    }
  }
  .realname-notice {
    display: flex;
    padding: 0 15px 15px 15px;
    align-items: center;
    margin-top: 15px;
    justify-content: space-between;
    border: 0 0 10px 0 solid #f7f7fa;
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      img {
        height: 1.18rem;
        width: 1.4rem;
      }
      span {
        margin-top: 0.12rem;
        font-size: 12px;
        color: #14181f;
        text-align: center;
      }
    }
  }
}
.line-box {
  background: #f7f7fa;
  height: 0.2rem;
  width: 100%;
}
.line {
  background: #f7f7fa;
  height: 0.2rem;
  width: 100%;
}
.top-title {
  height: 44px;
  width: 100%;
  line-height: 44px;
  background: rgba(254, 153, 49, 0.2);
  text-align: center;
  margin-top: 0;
  .title {
    font-size: 14px;
    color: #fe8000;
  }
}
.box {
  padding: 1.16rem 0.6rem;
}
.query {
  padding: 1rem 0.3rem;
}
</style>
