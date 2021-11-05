<template>
  <model-full id="login" :isLine="false" class="fixd-wrap">
    <!-- <router-link
      to="/register"
      tag="span"
      slot="right"
      style="color:rgb(173,179,193);font-size:.32rem"
    >注册</router-link>-->
    <model-title :title="$t('message.login.webTitle')"></model-title>
    <div class="login">
      <base-input
        :placeholder="$t('dialog.bandCard.placeholder4')"
        type="tel"
        v-model="phone"
      >
        <!-- <img :src="icon.mobie" alt="图标" width="12" height="16"> -->
      </base-input>

      <base-input
        :placeholder="$t('login.text2')"
        type="password"
        v-model="pass"
        :showPass="true"
      >
        <!-- <img :src="icon.lock" alt="图标" width="13" height="16"> -->
      </base-input>
      <div class="l-right">
        <!-- <router-link to="/register">快速注册</router-link> -->
        <router-link to="/forget">{{ $t("login.forgetPass") }}</router-link>
      </div>
    </div>
    <div class="l-center">
      <base-button @clickEvent="sign" class="login-btn">
        <template v-if="!loading">
          {{ $t("login.login") }}
        </template>
        <img
          v-else
          class="loading-in"
          src="@/assets/img/2_7/icon_loading@2x.png"
        />
      </base-button>
      <!-- <base-button @clickEvent="sign" :disabled="btnStatus">登录</base-button> -->
      <!-- <base-button @clickEvent="$router.push('/register')">注册</base-button> -->
    </div>
    <!-- <div class="activity-bg">
      <img src="@/assets/img/2_7/img_login_hd@2x.png" alt />
    </div>-->
    <p>
      {{ $t("login.text3[0]") }}
      <router-link to="/register">{{ $t("login.text3[1]") }}</router-link>
    </p>
  </model-full>
</template>
<script>
import BaseInput from "@/components/element/base-input";
import BaseButton from "@/components/element/base-radiu-button";
import mobie from "@/assets/img/phone-mobie.png";
import lock from "@/assets/img/phone-lock.png";
import ModelFull from "element/model-full";
import ModelTitle from "@/components/element/model-title";
import qs from "qs";
import UUID from "uuid";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      icon: {
        mobie: mobie,
        lock: lock
      },
      loading: false,
      phone: "",
      pass: "",
      canSign: true
    };
  },
  components: {
    BaseInput,
    BaseButton,
    ModelFull,
    ModelTitle
  },
  // watch: {
  //     phone(){
  //         return this.phone==''
  //     },
  //     pass(){

  //     }
  // },
  computed: {
    ...mapGetters({
      mobilephone: "user/mobilephone"
    }),
    btnStatus() {
      if (this.phone && this.pass) {
        return false;
      } else {
        return true;
      }
    }
  },

  methods: {
    ...mapActions({
      loginAct: "user/login", // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      getUrlImage: "system/system/getUrlImage"
    }),
    ...mapMutations({
      setUserInfo: "account/setUserInfo", // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      // setToken: "account/setToken",
      setLogin: "user/setLogin"
    }),
    sign() {
      // if (!this.canSign) return;
      // this.canSign = false;
      if (this.loading) return;
      this.loading = true;
      const _this = this;
      if (!this.phone) {
        this.$vux.toast.text(this.$t("resetreg.text1"), "middle");
        this.loading = false;
        return;
      }
      if (!this.pass) {
        this.$vux.toast.text(this.$t("login.text2"), "middle");
        this.loading = false;
        return;
      }
      let params = {
        username: this.phone,
        password: this.pass
      };

      this.loginAct(params)
        .then(res => {
          _this.$vux.toast.text(this.$t("message.login.message1"), "middle");
          localStorage.setItem("token", res.token);
          localStorage.setItem("phone", _this.phone);
          localStorage.setItem("pass", _this.pass);

          _this.getImage();
          _this.$router.push({
            path: "/"
          });
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          if (err == "用户已被冻结") {
            _this.$vux.toast.text("账号不存在", "middle");
          } else {
            _this.$vux.toast.text(err, "middle");
          }
        });
    },

    getImage() {
      this.getUrlImage().then(res => {
        localStorage.setItem("imageUrl", res);
      });
    }
    // jiaoyiyuan() {
    //   this.scoketApi.sendSock(
    //     {
    //       moduleId: 18,
    //       cmdId: 1
    //     },
    //     res => {
    //       if (res.code != 200) {
    //         this.$vux.alert.show({
    //           title:this.$t("setText.title"),
    //           content: res.message
    //         });
    //         return;
    //       }
    //       localStorage.setItem("traderState", res.result.userStatus);
    //     }
    //   );
    // }
  },
  created() {
    this.phone = localStorage.phone;
    this.pass = localStorage.pass;
  }
};
</script>
<style lang="less" scoped>
#login {
  background: @bodyBg;
  height: 100%;
}
// h1 span {
//   opacity: 0;
// }
.login {
  // padding: 0.6rem 0.6rem;
  padding: 1rem 0.6rem 0.4rem;
  .l-right {
    text-align: right;
    overflow: hidden;
    margin-top: -0.2rem;
    & a {
      color: @blueyGrey;
      float: right;
      font-size: 0.28rem;
    }
    // & > a:nth-of-type(1) {
    //   color: @battleshipGrey;
    //   float: left;
    // }
  }
}
.l-center {
  width: 100%;
  text-align: center;
  padding: 0 0.56rem;
}
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
.activity-bg {
  display: flex;
  justify-content: center;
  // background: url('~@/assets/img/2_7/img_login_hd@2x.png') no-repeat;
  // margin: 2rem auto .6rem;
  // background-size:cover;
  // padding: 0;
  img {
    margin: 2rem 0 0.6rem 0;
    width: 4.46rem;
    height: 3.12rem;
  }
}
p {
  font-size: 0.28rem;
  color: @blueyGrey;

  text-align: center;
  margin-top: 0.8rem;

  // margin-bottom: 2rem;
  a {
    color: @darkSkyBlue;
  }
}
</style>
