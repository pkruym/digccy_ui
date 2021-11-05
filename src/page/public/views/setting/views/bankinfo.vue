<template>
  <model-full title="银行卡信息" class="fixd-wrap">
    <span
      slot="right"
      style="color:rgb(36,48,73);padding:.2rem;"
      @click="Unbundling"
      v-if="bankListLength > 1"
    >
      解绑</span
    >
    <div class="bankinfo">
      <div
        class="list-info flex zhaoshang"
        :class="[
          bankinfo.bankName === '招商银行'
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
      >
        <div class="info flex">
          <div class="header">
            <div class="icon">
              <img :src="bankinfo.icon" class="bankLogo" />
            </div>
            <p class="flex name">
              <span>{{ bankinfo.bankName }}储蓄卡</span>
            </p>
          </div>
          <p class="num">
            <span>{{ bankinfo.bankCardId.substring(0, 4) }}</span>
            <span> **** ****</span>
            <span>{{
              bankinfo.bankCardId.substring(bankinfo.bankCardId.length - 4)
            }}</span>
          </p>
        </div>
      </div>
      <div class="person">
        <div class="flex">
          <span class="label">持卡人</span> <span>{{ bankinfo.name }}</span>
        </div>
        <div class="flex">
          <span class="label">银行卡号</span>
          <span>{{ bankinfo.bankCardId }}</span>
        </div>
        <div class="flex">
          <span class="label">支行信息</span>
          <span>{{ bankinfo.branchName }}</span>
        </div>
      </div>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
export default {
  components: {
    ModelFull
  },
  data() {
    return {
      bankinfo: {},
      bankListLength: ""
    };
  },

  methods: {
    Unbundling() {
      const _this = this;
      this.$vux.confirm.show({
        title: this.$t("setText.title"),
        content: "确定解绑此张银行卡吗？",
        onCancel() {
          console.log("plugin cancel");
        },
        onConfirm() {
          _this.$vux.loading.show({
            text: "Loading"
          });
          _this.scoketApi.sendSock(
            {
              moduleId: 4,
              cmdId: 2,
              data: {
                id: _this.bankinfo.id
              }
            },
            function(res) {
              if (res.code == "200" && res.moduleId == 4 && res.cmdId == 2) {
                _this.$vux.loading.hide();

                _this.$router.push("/setting/bank-card");

                _this.$vux.toast.text(
                  this.$t("message.operation.message14"),
                  "top"
                );
              } else {
                _this.$router.push("/ower");
              }
            }
          );
        }
      });
    }
  },
  created() {
    this.bankinfo = JSON.parse(sessionStorage.getItem("bankinfo"));
    this.bankListLength = sessionStorage.getItem("bankListLength");
  }
};
</script>
<style lang="less" scoped>
.bankinfo {
  padding: 0.3rem 0;
  .person {
    padding: 0 0.3rem;
    div {
      justify-content: space-between;
      line-height: 1.1rem;
      height: 1.1rem;

      border-bottom: 1px solid #f7f7f7;
    }
    span {
      font-size: 0.28rem;
      color: @darkBlueGrey;
      display: inline-block;
    }
    .label {
      flex-shrink: 0;

      width: 1.6rem;
      color: rgb(129, 128, 129);
      font-size: 0.28rem;
    }
    & > span:nth-of-type(2) {
      text-align: right;
    }
  }
  .list-info {
    height: 2.6rem;
    width: 7.5rem;
    background-size: cover;
    padding: 0.3rem 0.4rem;
    margin-bottom: 0.2rem;
    box-sizing: border-box;

    &.red {
      background: url(../../../../../assets/img/cardzhaoshang@2x.png) no-repeat;
      background-size: cover;
    }
    &.green {
      background: url(../../../../../assets/img/cardjianshe@2x.png) no-repeat;
      background-size: cover;
    }
    &.blue {
      background: url(../../../../../assets/img/cardminsheng@2x.png) no-repeat;
      background-size: cover;
    }
    .info {
      flex-grow: 2;
      padding: 0 0.8rem 0 0.2rem;
      flex-direction: column;
      justify-content: flex-start;
      margin-top: 0rem;
      margin-left: 0rem;
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
