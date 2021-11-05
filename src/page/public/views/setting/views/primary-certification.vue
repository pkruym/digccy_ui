<template>
  <ModelFull title="初级认证" class="realname fixd-wrap">
    <div>
      <model-title
        :title="$t('my.myInfo.text11')"
        :desc="$t('my.myInfo.text12')"
      ></model-title>

      <div class="box">
        <base-input v-model="name" :placeholder="$t('my.myInfo.text13')">
          <span class="width">{{ $t("my.myInfo.text14") }}</span>
        </base-input>
        <base-input
          v-model="idcard"
          :placeholder="$t('my.myInfo.text15')"
          type="text"
        >
          <span class="width">{{ $t("my.myInfo.text16") }}</span>
        </base-input>
      </div>
      <div class="query">
        <base-button @clickEvent="query" class="login-btn">
          <template v-if="!loading">
            {{ $t("my.myInfo.text20") }}
          </template>
          <img
            v-else
            class="loading-in"
            src="@/assets/img/2_7/icon_loading@2x.png"
          />
        </base-button>
      </div>
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
      loading: false,
      idcard: ""
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo"
    })
  },
  methods: {
    ...mapActions({
      realAuth: "user/realAuth" //实名认证
    }),
    ...mapMutations({
      setRealAuth: "user/setRealAuth" //实名认证
    }),
    query() {
      if (this.loading) return;
      if (!/[\u4e00-\u9fa5]{2,5}/.test(this.name)) {
        this.$vux.toast.text(this.$t("my.myInfo.text17"), "middle");
        return;
      }
      if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idcard)) {
        this.$vux.toast.text(this.$t("my.myInfo.text18"), "middle");
        return;
      }
      let params = {
        name: this.name,
        idCard: this.idcard,
        userId: this.userInfo.id
      };
      this.loading = true;
      this.realAuth(params)
        .then(res => {
          if (res) {
            this.setRealAuth();
            this.$vux.toast.text(this.$t("my.myInfo.text19"), "middle");

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
.box {
  padding: 1.16rem 0.6rem;
}
.query {
  padding: 0 0.5rem;
}
</style>
