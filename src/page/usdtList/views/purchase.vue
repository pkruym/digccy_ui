<template>
  <div class="usdtlist fixd-wrap">
    <base-radio ref="baseSelect" :options="commonList" @radioChange="change" :showCheck="false"></base-radio>
    <div class="container">
      <noData v-if="list.length <= 0"></noData>
      <div class="list-info" v-for="(item, index) in list" :key="index" v-else>
        <div class="list-title">
          <div class="list-title-name">
            <div class="icon">
              <img v-if="item.headImg" :src="imageUrl + item.headImg" alt />
              <img v-else src="@/assets/img/2_3/ico_touxiang_zhanwei@2x.png" alt />
            </div>
            <div class="name">{{ item.merchantName }}</div>
            <div class="tab">
              <img src="@/assets/img/2_3/ico_wd_cb_v@2x.png" alt />
            </div>
          </div>
          <div class="list-title-volume">
            <div>{{ $t("legalTransaction.order") }}：{{ item.id }}</div>
            <!-- <div>成交率 98%</div> -->
          </div>
        </div>
        <div class="list-content">
          <div class="list-content-info">
            <div class="list-content-info-left">
              <p>
                <span>{{ $t("legalTransaction.price") }}</span>
                <span>{{ item.price }}{{ item.type }}/USDT</span>
              </p>
              <p>
                <span>{{ $t("dialog.coincharging.text7") }}</span>
                <span>{{ item.usdtNum ? item.usdtNum : "--" }}USDT</span>
              </p>
              <p>
                <span>{{ $t("legalTransaction.purchaseTime") }}</span>
                <span> {{ item.gmtCreate }}</span>
              </p>
            </div>
            <div class="list-content-info-right">
              {{
                item.status === "SUCCESS"
                  ? $t("dialog.coincharging.text11")
                  : item.status === "PENDING"
                  ? $t("dialog.coincharging.text12")
                  : item.status === "CLOSE"
                  ? $t("dialog.coincharging.text13")
                  : item.status === "FAIL"
                  ? $t("dialog.coincharging.text14")
                  : "--"
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Divider, Scroller } from "vux";
import { mapActions } from "vuex";
import { getDIYDay } from "@/assets/componentsJs/getDate30";
import baseRadio from "element/base-select";

export default {
  components: {
    baseRadio
  },
  computed: {
    cptTime() {
      if (this.index == 0) {
        return null;
      } else if (this.index == 1) {
        return getDIYDay("monday");
      } else if (this.index == 2) {
        return getDIYDay("monthFirst");
      } else {
        return getDIYDay("halfYear");
      }
    }
  },
  data() {
    return {
      value: "0",
      commonList: [
        {
          value: this.$t("common.all"),
          key: "0",
          checked: true
        },
        {
          value: this.$t("common.week"),
          key: "1",
          checked: false
        },
        {
          value: this.$t("common.month"),
          key: "2",
          checked: false
        },
        {
          value: this.$t("common.year"),
          key: "3",
          checked: false
        }
      ],
      index: 0,
      list: [],
      imageUrl: localStorage.getItem("imageUrl"),
      phone: this.$route.query.phone || "",
      token: this.$route.query.token || "",
      availableBalance:
        this.$route.query.availableBalance > 0 ||
          this.$route.query.availableBalance == 0
          ? (this.$route.query.availableBalance * 1).toFixed(2)
          : "--",
      type: this.$route.query.type || "",
      purchase: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    ...mapActions({
      paymentList: "user/paymentList" //充值列表
    }),
    change({ value, key }) {
      this.commonList.forEach((item, i) => {
        item.checked = false;
        if (item.key === key) {
          item.checked = true;
        }
      });
      if (this.$refs.baseSelect) {
        this.$refs.baseSelect.isShowCheck = false;
      }
      this.index = key;
      this.list = [];
      this.getList();
    },
    buy() {
      this.purchase = true;
    },
    getList() {
      // /tactics/system/getEnabledCircularsList
      let startTime = null;
      if (this.index != 0) {
        startTime = this.cptTime.Format("yyyy-MM-dd hh:mm:ss");
      }

      let params = {
        start: startTime,
        end: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        page: 1,
        size: 100,
        isBruse: false,
        isMerchant: true
      };
      this.paymentList(params).then(res => {
        this.list = [];
        console.log(res);
        console.log(1111);
        if (res && res.records.length > 0) {
          this.list = res.records;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.usdtlist {
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 2rem;
  background: @bodyBg;
  min-height: 8rem;
  //   background: @paleGreyTwo;
  // /deep/.checkcontrol {
  //   .weui-cells {
  //     color: #949fac !important;
  //     background: #28323c !important;
  //   }
  //   /deep/.weui-check_label {
  //     padding: 0.12rem;
  //   }
  // }
  .radio {
    background: #28323c;
    text-align: center;
    display: flex;
    // padding-top: 10px;
    padding-bottom: 5px;
    justify-content: space-around;
    border-bottom: 1px solid #151e26;
    /deep/ .weui-cells.weui-cells_checkbox {
      display: flex;
    }
  }
  .flex {
    display: flex;
  }
  .container {
    margin: 0 0.2rem 0.2rem;
    .list-info {
      background: @markBg;
      border-radius: 4px;
      padding: 0.16rem 0.3rem 0.34rem 0.3rem;
      margin-bottom: 0.2rem;
      .list-title {
        border-bottom: 1px solid @lineColor;
        padding-bottom: 0.14rem;
        align-items: center;

        display: flex;
        .list-title-name {
          // flex: 1;
          display: flex;
          align-items: center;
          .icon {
            flex: 0 0 0.52rem;
            width: 0.52rem;
            height: 0.52rem;
            // background: @darkSkyBlue;
            border-radius: 100%;
            margin-right: 0.1rem;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            color: @darkBlueGrey;
            font-size: 0.28rem;
            margin-right: 0.1rem;
          }
          .tab {
            flex: 0 0 0.22rem;
            width: 0.22rem;
            height: 0.24rem;
            img {
              width: 0.22rem;
              height: 0.24rem;
            }
          }
        }

        .list-title-volume {
          flex: 1;
          display: flex;
          & > div {
            flex: 1;
            font-size: 0.24rem;
            color: @txtColor;
            text-align: right;
            padding-right: 0.2rem;
            &:nth-of-type(2) {
              text-align: left;
              padding-left: 0.2rem;
              padding-right: 0;
              position: relative;
              &::before {
                position: absolute;
                content: '';
                width: 1px;
                height: 0.2rem;
                background: rgb(203, 203, 203);
                left: 0;
                top: 50%;
                margin-top: -0.08rem;
              }
            }
          }
        }
      }
      .list-content {
        margin-top: 0.3rem;
        .list-content-info {
          display: flex;
          align-items: center;
          .list-content-info-left {
            flex: 1;
            p {
              margin-top: 0.22rem;
              font-size: 0.24rem;
              color: @txtColor;
              display: flex;
              align-items: center;
              span {
                &:first-child {
                  display: inline-block;
                  width: 1.3rem;
                }
                &:nth-of-type(2) {
                  flex: 1;
                  justify-self: center;
                }
              }
            }
          }
          .list-content-info-right {
            // flex: 0 0 1.6rem;
            // width: 1.6rem;
            // height: 0.56rem;
            // line-height: 0.56rem;
            // text-align: center;
            font-size: 0.32rem;
            color: @txtColor;
          }
        }
      }
    }
  }
  .buy-popup {
    .close {
      position: absolute;
      right: 0.42rem;
      top: 0.34rem;
      width: 0.32rem;
      height: 0.32rem;
      background: url('~@/assets/img/2_3/ico_tangchuang_guanbi@2x.png')
        no-repeat 100% 100% / cover;
    }
  }
}
</style>
