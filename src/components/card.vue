<template>
  <div class="card">
    <div class="listBox">
      <div
        class="list-info flex zhaoshang"
        v-for="(item, index) in bankList"
        :class="[
          item.bankName === '招商银行'
            ? 'red'
            : item.bankName === '中国银行'
            ? 'red'
            : item.bankName === '中国农业银行'
            ? 'green'
            : item.bankName === '中国民生银行'
            ? 'blue'
            : item.bankName === '建设银行'
            ? 'green'
            : 'red'
        ]"
        :key="index"
        @click="seeDel(item)"
      >
        <div class="info flex">
          <div class="header">
            <div class="icon"><img :src="item.icon" class="bankLogo" /></div>
            <p class="flex name">
              <span>{{ item.bankName }}储蓄卡</span>
            </p>
          </div>
          <p class="num">
            <span>{{ item.bankCardId.substring(0, 4) }}</span>
            <span> **** ****</span>
            <span>{{
              item.bankCardId.substring(item.bankCardId.length - 4)
            }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="add-card-box">
      <div class="add-card" @click="addCard" v-if="bankListLength > 0">
        <div class="icon"></div>
        <div class="text">{{ $t("my.setting.text2") }}</div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      bankList: [],
      bankListLength: 0
    };
  },
  mounted() {
    this.getBankList();
  },
  methods: {
    ...mapActions({
      bankCardQueryUser: "user/bankCardQueryUser" //获取已绑定的银行卡
    }),

    addCard() {
      this.$router.push({
        path: "/setting/add-card"
      });
    },
    seeDel(item) {
      sessionStorage.setItem("bankinfo", JSON.stringify(item));
      sessionStorage.setItem("bankListLength", this.bankListLength);
      this.$router.push("/setting/bankinfo");
    },
    getBankList() {
      const _this = this;
      this.bankCardQueryUser().then(res => {
        if (res && res.length != 0) {
          this.bankList = res;
          console.log("banklist", this.bankList);
          this.bankListLength = res.length;
          this.$emit("getLength", res.length);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.add-card-box {
  padding: 0 0.3rem;
}
.add-card {
  width: 100%;
  height: 0.88rem;
  background: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(197, 208, 225, 0.5);
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin-top: 0rem;

  .icon {
    flex: 0 0 0.44rem;
    width: 0.44rem;
    height: 0.44rem;
    background: url(../assets/img/card_icon_add_pre@2x.png) no-repeat;
    background-size: 0.44rem 0.44rem;
    margin: 0 0.24rem 0 0.4rem;
  }
  .text {
    color: @battleshipGrey;
    font-size: 14px;
    flex: 1;
  }
  .right {
    flex: 0 0 0.4rem;
    width: 0.2rem;
    height: 0.2rem;
    background: url(../assets/img/card_icon_addjt_pre@2x.png) no-repeat;
    background-size: contain;
    margin-right: 0.2rem;
  }
}
.listBox {
  .list-info {
    width: 100%;
    background-size: cover;
    margin: 0 auto;
    box-sizing: border-box;
    height: 2.6rem;
    width: 7.5rem;

    &.red {
      background: url(../assets/img/cardzhaoshang@2x.png) no-repeat;
      background-size: cover;
    }
    &.green {
      background: url(../assets/img/cardjianshe@2x.png) no-repeat;
      background-size: cover;
    }
    &.blue {
      background: url(../assets/img/cardminsheng@2x.png) no-repeat;
      background-size: cover;
    }
    .info {
      flex-grow: 2;
      padding: 0 0.8rem 0 0.2rem;
      flex-direction: column;
      justify-content: flex-start;
      margin-top: 0.3rem;
      margin-left: 0.4rem;
      .header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .icon {
          flex: 0 0 1rem;
          img {
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
          }
        }
        .name {
          justify-content: space-between;
          font-size: 16px;
          color: #fefffe;
        }
        p {
          color: #e0ecf7;
        }
      }
      .num {
        font-size: 24px;
        color: #fefffe;
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
