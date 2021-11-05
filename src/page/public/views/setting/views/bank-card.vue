<template>
  <model-full :title="$t('my.setting.text1')" class="full fixd-wrap">
    <div class="bankList">
      <div class="no-card" @click="addCard" v-if="bankListLength < 1">
        <div class="icon">
          <img src="@/assets/img/Bank card_icon_add_pre@2x.png" alt="" />
        </div>
        <p>{{ $t("my.setting.text2") }}</p>
        <p>{{ $t("my.setting.text4") }}</p>
      </div>
      <card @getLength="getBank"></card>
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import Card from "@/components/card";
export default {
  components: {
    ModelFull,
    Card
  },
  data() {
    return {
      bankList: [],
      bankListLength: ""
    };
  },
  mounted() {},
  methods: {
    getBank(val) {
      this.bankListLength = val;
    },
    addCard() {
      this.$router.push({
        path: "/setting/add-card"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.full {
  height: 100%;
}
.bankList {
  height: 100%;
  background: #f7f7fa;
  padding-top: 0.3rem;
  .no-card {
    background: @bodyBg;
    padding: 0.46rem 0.6rem 0.2rem 0.6rem;
    text-align: center;
    .icon {
      width: 0.8rem;
      margin: 10px auto 20px auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      font-size: 0.36rem;
      color: @darkBlueGrey;
      &:nth-of-type(2) {
        font-size: 0.28rem;
        color: @blueyGrey;
        margin-top: 0.1rem;
      }
    }
  }
  /*.listBox{
        padding: .2rem;
        li{
            width: 6.82rem;
            margin: 0 auto;
            height: 1.8rem;
            background: #4277e8;
            border-radius: 8px;
            padding: .3rem .34rem;
            margin-bottom: .2rem;
            .info{
                flex-grow: 2;
                padding: 0 .8rem 0 .2rem;
                flex-direction:column;
                justify-content: center;
                p{
                    color: #e0ecf7;
                }
                .name{
                    justify-content: space-between;
                    line-height: .6rem;
                    span{
                        font-size: .24rem;
                    }
                }
                .num{
                    font-size: .4rem;
                }
            }
            .bankLogo{
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 50%;
            }
        }
    }*/
}
</style>
