<template>
  <model-full :title="$t('my.setting.text24')" class="set fixd-wrap">
    <div class="line10"></div>
    <ul>
      <li v-show="login" class="flex line05" @click="hadTrue">
        <div class="flex">
          <span>{{ $t("my.text10") }}</span>
        </div>
        <div class="flex">
          <img src="@/assets/img/right@2x.png" alt class="right" />
        </div>
      </li>
      <router-link
        v-show="login"
        to="/setting/bank-card"
        tag="li"
        class="flex line05"
      >
        <div class="flex">
          <span>{{ $t("my.text13") }}</span>
        </div>
        <div class="flex">
          <img src="@/assets/img/right@2x.png" alt class="right" />
        </div>
      </router-link>
    </ul>
    <ul>
      <router-link
        to="/setting/change-pass"
        tag="li"
        class="flex line05"
        v-show="login"
      >
        <div class="flex">
          <!-- <img src="@/assets/img/wd-zhsz-xiugaimima@2x.png" class="icon"> -->
          <span>{{ $t("my.setting.text25") }}</span>
        </div>
        <div class="flex">
          <img src="@/assets/img/right@2x.png" alt class="right" />
        </div>
      </router-link>
      <li class="flex line05" @click="changepaypass" v-show="login">
        <div class="flex">
          <span>{{ $t("my.setting.text26") }}</span>
        </div>
        <div class="flex">
          <span class="num">
            {{
              fundPasswdBlank
                ? $t("my.setting.text27")
                : $t("my.setting.text28")
            }}
          </span>
          <img src="@/assets/img/right@2x.png" alt class="right" />
        </div>
      </li>

      <router-link to="/setting/language" tag="li" class="flex line05">
        <div class="flex">
          <span>{{ $t("my.setting.text66") }}</span>
        </div>
        <div class="flex">
          <span>{{ $lang == "en" ? "English" : "简体中文" }}</span>
          <img src="@/assets/img/right@2x.png" alt class="right" />
        </div>
      </router-link>
    </ul>
    <ul>
      <router-link to="/feedback" tag="li" class="flex line05">
        <div class="flex">
          <span>{{ $t("my.text16") }}</span>
        </div>
        <div class="flex">
          <img src="@/assets/img/right@2x.png" alt class="right" />
        </div>
      </router-link>
      <li class="flex line05">
        <div class="flex">
          <span>{{ $t("my.setting.text30") }}</span>
        </div>
        <div class="flex"><span class="num">v2.6.0</span></div>
      </li>
    </ul>
    <div class="btn" @click="signout" v-show="login">
      {{ $t("my.setting.text31") }}
    </div>
  </model-full>
</template>
<script>
import { Confirm } from "vux";
import { Storage, Diskinfo } from "@/assets/js/localstorage";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    Confirm
  },
  data() {
    return {
      fileTypes: ["image/jpeg", "image/pjpeg", "image/png"],
      login: localStorage.token
    };
  },
  computed: {
    ...mapMutations({
      setclearuser: "user/setclearuser"
    }),
    ...mapGetters({
      userInfo: "user/userInfo",
      isLogin: "user/isLogin",
      fundPasswdBlank: "user/fundPasswdBlank"
    })
  },
  methods: {
    ...mapActions({
      logout: "user/logout"
    }),
    changepaypass() {
      if (this.fundPasswdBlank) {
        this.$router.push("/setting/firstpaypass");
      } else {
        this.$router.push("/setting/change-paypass");
      }
    },
    hadTrue() {
      this.$router.push("/setting/realname-center");
    },
    validFileType(file) {
      for (var i = 0; i < this.fileTypes.length; i++) {
        if (file.type === this.fileTypes[i]) {
          return true;
        }
      }
      return false;
    },
    ImgToBase64(file, maxLen, callBack) {
      var img = new Image();

      var reader = new FileReader(); //读取客户端上的文件
      reader.onload = function() {
        var url = reader.result; //读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
        img.src = url; //reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
      };
      img.onload = function() {
        //生成比例
        var width = img.width,
          height = img.height;
        console.log(width, height);
        //计算缩放比例
        var rate = 1;
        if (width >= height) {
          if (width > maxLen) {
            rate = maxLen / width;
          }
        } else {
          if (height > maxLen) {
            rate = maxLen / height;
          }
        }
        img.width = width * rate;
        img.height = height * rate;
        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var base64 = canvas.toDataURL("image/jpeg", 0.9);
        callBack(base64);
      };
      reader.readAsDataURL(file);
    },
    change(event) {
      const _this = this;
      const files = event.target.files || event.dataTransfer.files;
      this.file = files[0];
      if (!this.validFileType(this.file)) {
        this.$vux.alert.show({
          title: this.$t("setText.title"),
          content: this.$t("my.setting.text32")
        });
        return;
      }
      if (this.file.size.toFixed(2) > 1024 * 1024 * 6) {
        this.$vux.alert.show({
          title: this.$t("setText.title"),
          content: this.$t("my.setting.text33")
        });
        return;
      }
      this.ImgToBase64(this.file, 180, function(res) {
        _this.$vux.loading.show({
          text: this.$t("my.setting.text67")
        });
        _this.scoketApi.sendSock(
          {
            moduleId: 1,
            cmdId: 13,
            data: {
              base64Str: res.split(",")[1]
            }
          },
          function(res) {
            _this.$vux.loading.hide();
            if (res.code == 200 && res.moduleId == 1 && res.cmdId == 13) {
              _this.file = "";
              if (res.code == 200) {
                _this.$vux.toast.text(this.$t("my.setting.text34"), "middle");
                localStorage.setItem("headPortrait", res.result);
              }
            } else if (
              res.code != 200 &&
              res.moduleId == 1 &&
              res.cmdId == 13
            ) {
              _this.$vux.loading.hide();
              _this.$vux.toast.text(this.$t("my.setting.text35"), "middle");
            }
          }
        );
      });
    },
    close() {
      this.dialog = false;
    },
    signout() {
      // this.dialog = true;
      let _this = this;
      let ydtop = localStorage.getItem("ydtop");
      let isRember = localStorage.getItem("is_rember") || "";
      if (!window.navigator.onLine) {
        this.$vux.toast.text(_this.$t("my.setting.text36"), "toop");
        return;
      }
      const pass = localStorage.pass;
      _this.$vux.confirm.show({
        title: _this.$t("setText.title"),
        content: _this.$t("my.setting.text37"),
        cancelText: _this.$t("common.text3"),
        confirmText: _this.$t("personalCenter.text15"),
        onCancel() {
          _this.$vux.confirm.hide();
        },
        onConfirm() {
          _this.$vux.loading.show({
            text: _this.$t("my.setting.text68")
          });
          _this
            .logout()
            .then(res => {
              _this.$vux.loading.hide();
              localStorage.clear();
              sessionStorage.clear();
              isRember && localStorage.setItem("is_rember", isRember);
              localStorage.phone = _this.userInfo.mobilephone;
              localStorage.ydtop = ydtop;
              localStorage.pass = pass;
              localStorage.setItem("isactive", 1);
              _this.$diskinfo.type = "actual";
              Diskinfo.save("actual");
              _this.$router.push({ path: "/" });
            })
            .catch(err => {});
        }
      });
    }
  },
  mounted() {
    if (this.isLogin) {
      console.log(this.userInfo);
    }
  }
};
</script>

<style lang="less" scoped>
.set {
  height: 100%;
  position: relative;
  background: @whiteBg;

  ul {
    padding: 0 0.3rem;
    margin: 0.1rem 0;
    background: @offWhite;
    li {
      justify-content: space-between;
      padding: 0.2rem 0;
      height: 1rem;
      position: relative;
      .face {
        background: transparent;
        display: none;
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
      }
      div {
        .icon {
          width: 0.32rem;
          margin-right: 0.22rem;
        }
        span {
          color: @battleshipGrey;
        }
        .num {
          color: @txt2Color;
        }
        .right {
          width: 0.32rem;
          height: 0.32rem;
          margin-left: 0.2rem;
        }
        align-items: center;
      }
    }
  }
  .btn {
    width: 6.9rem;
    height: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 15px;
    color: @offWhite;
    background: @activityBtnBg;
    border-radius: 2px;
    position: fixed;
    left: 0.3rem;
    bottom: 1.6rem;
  }
}
</style>
