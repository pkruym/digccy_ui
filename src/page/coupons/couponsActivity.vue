<template>
  <model-full
    :showheader="!$route.query.phone"
    :title="$t('coupons.activityTitle')"
    :class="$route.query.phone ? 'fixd-wrap fixd-wrap-coupons' : 'fixd-wrap'"
  >
    <div class="activity">
      <div class="desc">{{ $t("coupons.activityDesc") }}</div>

      <div class="activity-banner">
        <!-- <img src="@img/couactivity.jpg" alt /> -->
        <img v-if="$lang == 'en'" src="@img/33@yearen.png" alt />
        <img v-else src="@img/3@yearzh.png" alt />
      </div>
      <div class="time">
        <div class="time-left">{{ $t("coupons.activityTimeLable") }}</div>
        <div class="time-right">
          <p>{{ $t("coupons.activityTimeValue1") }}</p>
          <!-- <p>{{$t('coupons.activityTimeValue2')}}</p> -->
        </div>
      </div>
      <div class="activity-rules">
        <p>{{ $t("coupons.activityInner") }}</p>

        <div class="table-list">
          <table
            class="table-style"
            cellpadding="0"
            width="100%"
            align="center"
            cellspacing="0"
          >
            <tr align="center">
              <td>{{ $t("coupons.table1") }}</td>
              <td>{{ $t("coupons.table2") }}</td>
              <td>{{ $t("coupons.table3") }}</td>
              <!-- <td>{{$t('coupons.table4')}}</td> -->
            </tr>
            <tr align="center">
              <td rowspan="4">{{ $t("coupons.table5") }}</td>
              <td>{{ $t("coupons.table6") }}</td>
              <td>
                {{ $t("coupons.table11") }} <br />{{ $t("coupons.table12") }}
              </td>
              <!-- <td rowspan="4">{{$t('coupons.table17')}}<br />{{$t('coupons.table18')}}</td> -->
            </tr>
            <tr align="center">
              <td>{{ $t("coupons.table7") }}</td>
              <td>
                {{ $t("coupons.table13") }} <br />{{ $t("coupons.table14") }}
              </td>
            </tr>
            <tr align="center">
              <td>{{ $t("coupons.table8") }}</td>
              <td>{{ $t("coupons.table15") }}{{ $t("coupons.table19") }}</td>
            </tr>
            <tr align="center">
              <td>{{ $t("coupons.table9") }}</td>
              <td>{{ $t("coupons.table16") }}{{ $t("coupons.table20") }}</td>
            </tr>
          </table>
        </div>
        <div class="tips">
          <p>
            <span>1.</span>
            <span
              >{{ $t("coupons.acticityRules1")
              }}<span class="service" tag="a" @click="kefu">{{
                $t("coupons.server")
              }}</span
              >。</span
            >
          </p>

          <p>
            <span>2.</span> <span>{{ $t("coupons.acticityRules2") }}</span>
          </p>
          <p>
            <span>3.</span>
            <span
              >{{ $t("coupons.acticityRules3") }}<br />
              <span class="txt2">
                <small>{{ $t("coupons.acticityRules4") }}</small>
              </span>
            </span>
          </p>
          <p>
            <span>4.</span> <span>{{ $t("coupons.acticityRules5") }}</span>
          </p>
          <p>
            <span>5.</span> <span>{{ $t("coupons.acticityRules6") }}</span>
          </p>
          <p>
            <span>6.</span>
            <span
              >{{ $t("coupons.acticityRules7") }}<br />
              <span class="txt2">
                <small>{{ $t("coupons.acticityRules8")[0] }}</small> </span
              ><br />
              <span class="txt2">
                <small
                  >{{ $t("coupons.acticityRules8")[1] }}
                  <span class="service" @click="bgo({ symbol: 'EOS_CW' })"
                    >EOS{{ $t("stock.text33") }}</span
                  >
                  <span class="service" @click="bgo({ symbol: 'EOS_NW' })"
                    >EOS{{ $t("stock.text34") }}</span
                  >
                  <span class="service" @click="bgo({ symbol: 'EOS_CQ' })"
                    >EOS{{ $t("stock.text35") }}</span
                  >
                </small> </span
              ><br />
              <span class="txt2">
                <small>{{ $t("coupons.acticityRules9")[0] }}</small> </span
              ><br />
              <span class="txt2">
                <small
                  >{{ $t("coupons.acticityRules9")[1] }}
                  <span class="service" @click="bgo({ symbol: 'VET/USDT' })"
                    >VET/USDT</span
                  >
                  <span class="service" @click="bgo({ symbol: 'TRX/USDT' })"
                    >TRX/USDT</span
                  >
                </small> </span
              ><br />
              <span class="txt2">
                <small
                  >{{ $t("coupons.acticityRules9")[2] }}
                  <span class="service" @click="bgo({ symbol: 'EOS_CW' })"
                    >EOS{{ $t("stock.text33") }}</span
                  >
                  <span class="service" @click="bgo({ symbol: 'EOS_NW' })"
                    >EOS次{{ $t("stock.text34") }}</span
                  >
                  <span class="service" @click="bgo({ symbol: 'EOS_CQ' })"
                    >EOS{{ $t("stock.text35") }}</span
                  >
                </small>
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex-btn"
      v-if="$route.query.token ? false : !isLogin"
      @click="register"
    >
      {{ $t("coupons.register") }}
    </div>
  </model-full>
</template>
<script>
import ModelFull from "element/model-full";
import busVue from "@/assets/js/bus";
import { mapGetters } from "vuex";

export default {
  components: {
    ModelFull
  },
  computed: {
    ...mapGetters({
      isLogin: "user/isLogin",
      queryContractInfo: "contractInfo/queryContractInfo"
    })
  },
  methods: {
    kefu() {
      if (this.$route.query.phone) {
        if (window.webkit) {
          window.webkit.messageHandlers.toService.postMessage({});
        }
        if (window.appInterface) {
          window.appInterface.toService({});
        }
      } else {
        this.$router.push("/service");
      }
    },
    register() {
      if (this.$route.query.phone) {
        if (window.webkit) {
          window.webkit.messageHandlers.toRegister.postMessage({});
        }
        if (window.appInterface) {
          window.appInterface.toRegister({});
        }
      } else {
        this.$router.push("/register");
      }
    },
    bgo(item) {
      let _this = this;
      _this.symbol = item.symbol;
      if (!_this.symbol.includes("USDT")) {
        _this.symbol = this.queryContractInfo({
          symbol: _this.symbol
        }).symbol;
      }
      if (!_this.symbol) return;
      if (this.$route.query.phone) {
        if (window.webkit) {
          window.webkit.messageHandlers.toTrade.postMessage(item.symbol);
        }
        if (window.appInterface) {
          window.appInterface.toTrade(item.symbol);
        }
      } else {
        busVue.$emit("selectContract", {
          symbol: _this.symbol
        });
        this.$router.push({
          name: "stock-line",
          query: { symbol: _this.symbol }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.fixd-wrap-coupons {
  padding-top: 0rem;
  height: 100%;
}
.flex-btn {
  width: 6.9rem;
  height: 0.8rem;
  background: @activityBtnBg;
  border-radius: 2px;
  color: @offWhite;
  text-align: center;
  line-height: 0.8rem;
  position: fixed;
  bottom: 0.2rem;
  left: 50%;
  margin-left: -3.45rem;
}
.activity {
  padding: 0.3rem 0.3rem 1.2rem 0.3rem;
  .desc {
    font-size: 20px;
    color: @activityColor;

    font-weight: 600;
  }
  .time {
    display: flex;
    font-weight: 600;
    // margin: 0.4rem 0 0.3rem 0;
    flex-direction: column;
    color: @activityTime;
    .time-left,
    p {
      font-size: 15px;
    }
    .time-left {
      color: @txtColor;
    }
  }

  .activity-banner {
    width: 100%;
    margin: 0.1rem 0 0.3rem 0;
    img {
      width: 100%;
      border-radius: 4px;
    }
  }
  .activity-rules {
    margin-top: 0.3rem;
    .service {
      color: @activityBtnBg;
      text-decoration: underline;
    }
    .table-list {
      margin: 0.3rem 0;
      .table-style tr {
        font-size: 12px;
        height: 50px;
        border: 0.5px solid #14181f;
        &:nth-of-type(1) {
          height: 35px;
          border: 0px solid #14181f;
        }
      }
      .table-style td {
        font-size: 12px;
        font-family: "PingFangSC-Regular";
        border: 0.5px solid #14181f;
      }
      //  .table-style>tr:nth-of-type(1)
      //  {
      //    border: 0px solid #14181F;
      //  }
      //  .table-style>tr:nth-of-type(2)
      //  {
      //    border: 0px solid #14181F;
      //  }
      //  .table-style>tr:nth-of-type(3)
      //  {
      //    border: 0px solid #14181F;
      //  }
    }
    .tips {
      p {
        font-size: 14px;
        color: @activityColor;
        display: flex;
        margin-bottom: 0.1rem;
        .txt2 {
          margin-top: 5px;
          color: @txt2Color;
        }

        span {
          font-family: "PingFangSC-Regular" !important;
          i {
            color: #ff0030;
          }
          &:nth-of-type(1) {
            margin-top: 0.04rem;
            margin-right: 0.06rem;
          }
        }
        &:nth-of-type(1) {
          margin-bottom: 0.16rem;
        }
        table {
          td {
            border-right: 0;
          }
        }
      }
    }
  }
}
</style>
