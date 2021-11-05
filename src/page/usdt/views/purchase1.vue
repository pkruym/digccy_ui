<template>
  <div class="usdtlist">
    <div class="container">
      <div class="list-info" v-for="(item,index) in list" :key="index">
        <div class="list-title">
          <div class="list-title-name">
            <div class="icon">
              <img v-if="item.headImg" :src="imageUrl+item.headImg" alt />
              <img v-else src="@/assets/img/2_3/ico_touxiang_zhanwei@2x.png" alt />
            </div>
            <div class="name">{{item.nickname}}</div>
            <div class="tab">
              <img src="@/assets/img/2_3/ico_wd_cb_v@2x.png" alt />
            </div>
          </div>
          <div class="list-title-volume">
            <div>成交 {{item.volume}}</div>
            <div>成交率 {{item.probability.toFixed(2)}}%</div>
          </div>
        </div>
        <div class="list-content">
          <div class="list-content-name">
            <div class="list-content-name-left">
              <span>单价</span>
              <!-- {{item.price}}CNY/USDT -->
            </div>
            <div class="list-content-name-right">
              <div class="list-content-name-right-icon" v-for="(info,index) in item.tradeSetting" :key="index">
                <img v-if="info.tradeTypeEnum === 'ALIPAY'" src="@/assets/img/2_3/ico_wd_cb_zfb@2x.png" alt />
                <img v-else src="@/assets/img/2_3/ico_wd_cb_yhk@2x.png" alt />

              </div>
              <!-- <div class="list-content-name-right-icon">
              </div> -->

            </div>
          </div>
          <div class="list-content-info">
            <div class="list-content-info-left">
              <!-- <p>限额 区间{{item.miniLimit}}-{{item.maxLimit}}CNY</p> -->
              <p>销售总数量 {{item.total}} USDT</p>
            </div>
            <div class="list-content-info-right" @click="buy(item)">购买</div>
          </div>
        </div>
      </div>
    </div>
    <popup v-model="purchase" position="bottom" height="90%" class="buy-popup">
      <div style="padding: .3rem .2rem 0 .2rem; background:rgb(32,42,51);height:100%;">
        <div class="close" @click="close"></div>
        <buy :item="item" ref="buy"></buy>
        <!-- <x-button @click.native="show13 = false" plain type="primary">Close Me</x-button> -->
      </div>
    </popup>
    <!-- <router-view class="children"></router-view> -->
  </div>
</template>
<script>
import { Popup } from "vux";
import buy from "./../components/buy";
import { mapActions } from "vuex";

export default {
  components: {
    Popup,
    buy
  },
  data() {
    return {
      amount: "",
      imageUrl: localStorage.getItem("imageUrl"),
      list: [],
      phone: this.$route.query.phone || "",
      token: this.$route.query.token || "",
      availableBalance:
        this.$route.query.availableBalance > 0 ||
          this.$route.query.availableBalance == 0
          ? (this.$route.query.availableBalance * 1).toFixed(2)
          : "--",
      type: this.$route.query.type || "",
      purchase: false,

      item: {}
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    ...mapActions({
      paymentList: "user/merchantList", //usdt商家列表
    }),
    buy(item) {
      this.item = Object.assign({}, item);
      this.amount = '';
      this.purchase = true;
    },
    close() {
      this.$refs.buy.clear();
      this.purchase = false;
    },
    getList() {
      let params = {
        status: true,
        type: "BUY",
        page: 1,
        size: 100
      };

      this.paymentList(params).then(res => {
        console.log(res)
        console.log(1111111)
        if (res && res.records.length > 0) {
          this.list = res.records;
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
.usdtlist {
  height: 100%;
  padding-bottom: 2rem;

  //   background: @paleGreyTwo;
  .container {
    margin: 0.2rem;

    .list-info {
      background: @darkFour;
      border-radius: 4px;
      padding: 0.16rem 0.3rem 0.34rem 0.3rem;
      margin-bottom: 0.2rem;

      .list-title {
        border-bottom: 1px solid rgb(21, 30, 38);

        padding-bottom: 0.14rem;
        align-items: center;

        display: flex;

        .list-title-name {
          display: flex;
          align-items: center;

          .icon {
            flex: 0 0 0.52rem;
            width: 0.52rem;
            height: 0.52rem;
            background: @darkSkyBlue;
            border-radius: 100%;
            margin-right: 0.1rem;
            overflow: hidden;

            img {
              width: 0.52rem;
              height: 0.52rem;
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
            color: rgb(156, 163, 185);
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

        .list-content-name {
          display: flex;
          align-items: center;
          margin-bottom: 0.26rem;

          .list-content-name-left {
            span {
              font-size: 0.24rem;
              color: rgb(156, 163, 185);
            }

            flex: 1;
            font-size: 0.4rem;
            color: #e0ecf7;
          }

          .list-content-name-right {
            /* flex: 0 0 0.32rem;
            width: 0.32rem;
            height: 0.3rem; */
            display: flex;
            align-items: center;

            .list-content-name-right-icon {
              flex: 0 0 0.32rem;
              width: 0.32rem;
              height: 0.3rem;
              margin-right: 0.12rem;
              img {
                width: 100%;
              }
            }
          }
        }

        .list-content-info {
          display: flex;
          align-items: end;

          .list-content-info-left {
            flex: 1;

            p {
              font-size: 0.24rem;
              color: @blueyGrey;
            }
          }

          .list-content-info-right {
            flex: 0 0 1.6rem;
            width: 1.6rem;
            height: 0.56rem;
            line-height: 0.56rem;
            text-align: center;
            font-size: 0.28rem;
            color: #e0ecf7;
            border-radius: 2px;
            background: linear-gradient(
              to right top,
              rgb(24, 196, 165),
              rgb(52, 211, 174)
            );
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
