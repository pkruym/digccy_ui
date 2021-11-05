<template>
  <model-full :title="$t('leverageTrading.rules')" :showheader="$route.query.symbol ? false : true" :class="
      $route.query.symbol
        ? 'rule-box fixd-wrap'
        : 'rule-box rule-box-p fixd-wrap'
    ">
    <div v-if="$route.query.tradeType=='LEVER'||($tradeType.tradeType == 'LEVER'&&!$route.query.tradeType)">
      <div class="rule-top">
        <div class="top-right">
          <div class="info-box">
            <div class="info">
              <!-- <img :src="getimagepath + rule.arr1[8].value" /> -->
              <div
              :class="
                rule.arr1[8].value
                  ? 'img ' + rule.arr1[8].value + '-ico'
                  : 'img default-ico'
              "
            ></div>
            </div>
            <div class="info">
              <span>{{ rule.arr1[1].key }}</span>
              <span>{{ rule.arr1[1].value }}</span>
            </div>
            <div class="info">
              <span>{{ rule.arr1[0].key }}</span>
              <span>{{ rule.arr1[0].value }}</span>
            </div>
            <div class="info">
              <span>{{ rule.arr1[2].key }}</span>
              <span>{{ rule.arr1[2].value }}</span>
            </div>
          </div>
          <div class="info-box">
            <div class="info">
              <span>{{ $t("common.text19") }}</span>
              <span>{{
                rule.arr1[4].value > 0
                  ? (rule.arr1[4].value * 100).toFixed(2) + "%"
                  : $t("common.text23")
              }}</span>
            </div>
            <div class="info">
              <span>{{ $t("common.text20") }}</span>
              <span>{{
                rule.arr1[5].value > 0
                  ? (rule.arr1[5].value * 100).toFixed(2) + "%"
                  : $t("common.text23")
              }}</span>
            </div>
            <div class="info">
              <span>{{ $t("common.text21") }}</span>
              <span>{{ rule.arr1[6].value
                }}{{ rule.arr1[0].value.split("/")[0] }}</span>
            </div>
            <div class="info">
              <span>{{ $t("common.text22") }}</span>
              <span>{{ rule.arr1[7].value
                }}{{ rule.arr1[0].value.split("/")[0] }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rule-mid">
        <span>{{ rule.arr2[0].key }}</span>
        <p>{{ rule.arr2[0].value[0] }}</p>
      </div>
      <div class="rule-bottom">
        <div class="rule-info">
          <span>{{ rule.arr2[1].key }}</span>
          <span>{{ rule.arr2[1].value[0] }}</span>
        </div>
        <div class="rule-info">
          <span>{{ rule.arr2[2].key }}</span>
          <span>{{ rule.arr2[2].value[0] }}</span>
        </div>
        <div class="rule-info">
          <span>{{ rule.arr2[3].key }}</span>
          <span>{{ rule.arr2[3].value[0] }}</span>
        </div>
        <div class="rule-info">
          <span>{{ rule.arr2[4].key }}</span>
          <span>{{ rule.arr2[4].value[0] }}</span>
        </div>
        <div class="rule-info">
          <span>{{ rule.arr2[5].key }}</span>
          <span>{{ rule.arr2[5].value[0] }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="rule-FUTURE-top">
        <p class="rule-title">{{ $t("leverageTrading.tableTitle4") }}</p>
        <p class="rule-value">{{ rule.arr1[0].value }}</p>
      </div>
      <div class="rule-FUTURE-mid">
        <p class="rule-title">
          {{ $t("common.text24") }}
        </p>
        <div class="rule-header">
          {{ rule.arr1[6].value.split("_")[0] }}
          {{ $t("leverageTrading.contract") }}
        </div>
        <table cellpadding="0" cellspacing="0" align="left" width="100%" height="444" border="1">
          <tr align="center">
            <td width="30%">{{ $t("common.Contractsubject") }}</td>
            <td>
              {{ rule.arr1[6].value.split("_")[0] }} {{ rule.arr2[0].value[0] }}
            </td>
          </tr>
          <tr align="center">
            <td>{{ $t("common.Contractmultiplier") }}</td>
            <td>{{ rule.arr2[0].value[1] }}</td>
          </tr>

          <tr align="center">
            <td>{{ $t("common.Quotationunit") }}</td>
            <td>{{ rule.arr2[0].value[2] }}</td>
          </tr>
          <tr align="center">
            <td>{{ $t("common.Minimumchange") }}</td>
            <td>{{ rule.arr1[8].value }}</td>
          </tr>

          <tr align="center">
            <td>{{ $t("common.Contracttype") }}</td>
            <td>{{ rule.arr2[0].value[3] }}</td>
          </tr>
          <tr align="center">
            <td>{{ $t("common.Contractvalue") }}</td>
            <td>
              {{ rule.arr1[7].value }}{{ rule.arr1[6].value.split("_")[0] }}
            </td>
          </tr>
          <tr align="center">
            <td>{{ $t("common.Leveragemultiple") }}</td>
            <td>
              {{ rule.arr2[9].value[0] }}—{{
                rule.arr2[9].value[rule.arr2[9].value.length - 1]
              }}
              {{ $t("my.myInfo.text22") }}
            </td>
          </tr>

          <tr align="center">
            <td>{{ $t("common.Lasttransactiontime") }}</td>
            <td>{{ rule.arr2[0].value[6] }}</td>
          </tr>
          <tr align="center">
            <td>{{ $t("common.Deliverydate") }}</td>
            <td>{{ rule.arr2[0].value[7] }}</td>
          </tr>

          <tr align="center">
            <td>{{ $t("common.Deliverymethod") }}</td>
            <td>{{ rule.arr2[0].value[8] }}</td>
          </tr>

          <tr align="center">
            <td>{{ $t("common.text19") }}</td>
            <td>
              {{
                rule.arr1[1].value > 0
                  ? (rule.arr1[1].value * 100).toFixed(2) + "%"
                  : $t("common.text23")
              }}
            </td>
          </tr>
          <tr align="center">
            <td>{{ $t("common.text20") }}</td>
            <td>
              {{
                rule.arr1[2].value > 0
                  ? (rule.arr1[2].value * 100).toFixed(2) + "%"
                  : $t("common.text23")
              }}
            </td>
          </tr>
        </table>
      </div>
      <div class="rule-FUTURE-bottom">
        <p class="rule-title">{{ rule.arr2[1].key }}</p>
        <p class="rule-value" v-for="item in rule.arr2[1].value">{{ item }}</p>
        <p class="rule-title">{{ rule.arr2[2].key }}</p>
        <p class="rule-value" v-for="item in rule.arr2[2].value">{{ item }}</p>
        <p class="rule-title">{{ rule.arr2[3].key }}</p>
        <p class="rule-value" v-for="item in rule.arr2[3].value">{{ item }}</p>
        <p class="rule-title">{{ rule.arr2[4].key }}</p>
        <p class="rule-value" v-for="item in rule.arr2[4].value">{{ item }}</p>
        <p class="rule-title">{{ rule.arr2[5].key }}</p>
        <p class="rule-value" v-for="item in rule.arr2[5].value">{{ item }}</p>
        <p class="rule-title">{{ rule.arr2[6].key }}</p>
        <p class="rule-value" v-for="item in rule.arr2[6].value">{{ item }}</p>
        <p class="rule-title">{{ rule.arr2[7].key }}</p>
        <p class="rule-value" v-for="item in rule.arr2[7].value">{{ item }}</p>
        <p class="rule-title">{{ rule.arr2[8].key }}</p>
        <p class="rule-value" v-for="item in rule.arr2[8].value">{{ item }}</p>
      </div>
    </div>
  </model-full>
</template>

<script>
import ModelFull from "element/model-full";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ModelFull
  },
  computed: {
    ...mapGetters({
      seeRule: "contractInfo/seeRule", //获取
      seeRule_en: "contractInfo/seeRule_en" //获取
    }),
    getimagepath() {
      if (!this.imageUrl) this.imageUrl = localStorage.getItem("imageUrl");
      return this.imageUrl ? this.imageUrl : localStorage.getItem("imageUrl");
    },
    rule() {
      if (this.$route.query.lang == "en" || this.$lang == "en") {
        return this.seeRule_en({
          tradeType: this.$route.query.tradeType
            ? this.$route.query.tradeType
            : this.$tradeType.tradeType,
          symbol: this.$route.query.symbol
        });
      } else {
        return this.seeRule({
          tradeType: this.$route.query.tradeType
            ? this.$route.query.tradeType
            : this.$tradeType.tradeType,
          symbol: this.$route.query.symbol
        });
      }
    }
  },
  data() {
    return {
      imageUrl: ""
    };
  }
};
</script>

<style lang="less" scoped>
.rule-box {
  height: 100%;
  width: 100%;
  padding: 0.4rem 15px 15px 15px;
  background: @bodyBg;

  .rule-top {
    display: flex;

    .top-right {
      flex: 1;
      flex-direction: column;
      display: flex;
      justify-items: center;
      justify-content: center;
      .info-box {
        display: flex;
        flex: 1;
        justify-items: center;
        justify-content: center;
        margin-bottom: 15px;
        .info {
          flex: 1;
          display: flex;
          line-height: 20px;
          flex-direction: column;
          justify-items: center;
          justify-content: center;
          font-family: PingFangSC-Regular;
          font-size: 12px;

          & > span:nth-of-type(1) {
            color: @txtColor;
          }
          & > span:nth-of-type(2) {
            color: @txt2Color;
          }

          .img {
            margin: 0 15px;
            height: 40px;
            width: 40px;
             border-radius: 50%;
  margin-right: 0.1rem;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
          }
        }
      }
    }
  }
  .rule-mid {
    span {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: @txtColor;
    }
    p {
      text-indent: 2em;
      margin: 10px 0;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: @txtColor;
    }
  }
  .rule-bottom {
    display: flex;
    flex-direction: column;

    .rule-info {
      margin: 10px 0;
      flex: 1;
      display: flex;
      & > span:nth-of-type(1) {
        // flex: 0.3;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: @txtColor;
      }
      & > span:nth-of-type(2) {
        flex: 1;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: @txt2Color;
        text-align: right;
        word-break: break-all;
      }
    }
  }
  .rule-FUTURE-top {
    .rule-title {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: @txtColor;
      margin: 10px 0;
    }
    .rule-value {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: @txtColor;
    }
  }
  .rule-FUTURE-mid {
    .rule-title {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: @txtColor;
      margin: 10px 0;
    }
    .rule-value {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #949fac;
    }
    .rule-header {
      background: #4d5660;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: @writeColor;
      text-align: center;
      height: 33px;
      line-height: 33px;
    }

    tr {
      border-color: #4d5660;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: @txtColor;
    }
    td {
      border-color: #4d5660;
    }
    table {
      border-color: #4d5660;
    }
  }
  .rule-FUTURE-bottom {
    .rule-title {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: @txtColor;
      margin: 10px 0;
    }
    .rule-value {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      margin: 6px 0;
      color: @txt2Color;
    }
  }
}
.rule-box-p {
  padding: 1.4rem 15px 15px 15px;
}
</style>
