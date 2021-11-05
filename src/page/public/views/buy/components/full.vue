<template>
  <div class="full">
    <div class="full-container">
      <div class="content">
        <div class="title">设置止损止盈</div>
        <div class="last-price">
          最新价：
          <mediumspan>{{ data.lastPrice | toFixedFil(data) }}</mediumspan>
        </div>
        <div class="price-box">
          <div class="label">止损：</div>
          <div class="add-btn">
            <add-btn
              @remove="lossRemove"
              @add="lossAdd"
              @change="lossChange"
              :num="lossNum"
              :placeholder="'未设置'"
            ></add-btn>
            <!-- <div class="price-text">
            <p>¥1000.00<span>(-$72.00)</span></p>
            </div>-->
          </div>
        </div>
        <div class="price-box">
          <div class="label">止盈：</div>
          <div class="add-btn">
            <add-btn
              @remove="profitRemove"
              @add="profitAdd"
              @change="profitChange"
              :placeholder="'未设置'"
              :num="profitNum"
            ></add-btn>
            <!-- <div class="price-text">
            <p>¥1000.00<span>(-$72.00)</span> </p>
            </div>-->
          </div>
        </div>
      </div>
    </div>

    <btn @cancle="cancle" @confrim="confrim"></btn>
    <!-- <div class="flex-btn">
      <div
        class="reset"
        @click="cancle"
      >{{$t('common.cancle')}}</div>
      <div
        class="save"
        @click="confrim"
      >确认</div>

    </div>-->
  </div>
</template>

<script>
import addBtn from "element/base-add-input";
import btn from "element/base-confrim-button";
import { mapState } from "vuex";

export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      lossNum: "",
      profitNum: "",
      isError: false,
      lastPrice: 0,
      mave: 0
    };
  },
  components: {
    addBtn,
    btn
  },
  computed: {
    ...mapState(["vxLossNum", "vxProfitNum"]),

    minLoss() {
      if (!this.data) return;

      // return this.subtr(this.data.lastPrice, this.data.minWave);
      return (this.addNum(this.lastPrice, this.data.minWave) * 1).toFixed(
        this.mave
      );
    },
    maxLoss() {
      if (!this.data) return;

      let num = (
        this.subtr(this.data.perUnitReserveFund, this.data.perUnitUnwindPoint) /
        (this.data.perWaveMoney * this.data.rate)
      ).toFixed(this.mave);

      return (num * this.data.minWave * 1).toFixed(this.mave);
    },
    maxProfit() {
      if (!this.data) return;

      return (this.subtr(this.lastPrice, this.data.minWave) * 1).toFixed(
        this.mave
      );
    }
  },

  methods: {
    lossRemove() {
      if (this.lastPrice <= 0) {
        this.lastPrice = this.data.lastPrice;
      }
      if (this.lossNum === "未设置" || this.lossNum === "") {
        this.lossNum = this.addNum(this.lastPrice, this.data.minWave);
        return;
      }
      if (this.lossNum <= this.minLoss) {
        return;
      }
      if (this.lossNum <= 0) return;
      this.lossNum = this.subtr(this.lossNum, this.data.minWave);
    },
    lossAdd() {
      if (this.lastPrice <= 0) {
        this.lastPrice = this.data.lastPrice;
      }
      if (this.lossNum === "未设置" || this.lossNum === "") {
        this.lossNum = this.addNum(this.lastPrice, this.data.minWave);
        return;
      }

      this.lossNum = this.addNum(this.lossNum, this.data.minWave);
    },
    lossChange(val) {
      if (val === "" || val === "未设置") {
        this.lastPrice = 0;
      } else {
        this.lastPrice = this.data.lastPrice;
      }

      this.lossNum = val;
    },
    // lossBlur(val) {
    //   if (val === "") {
    //     this.lossNum = "未设置";
    //   }
    // },
    profitRemove() {
      if (this.lastPrice <= 0) {
        this.lastPrice = this.data.lastPrice;
      }
      if (this.profitNum === "未设置" || this.profitNum === "") {
        this.profitNum = this.maxProfit;
        return;
      }
      if (this.profitNum <= 0) return;

      this.profitNum = this.subtr(this.profitNum, this.data.minWave);
    },
    profitAdd() {
      if (this.lastPrice <= 0) {
        this.lastPrice = this.data.lastPrice;
      }
      if (this.profitNum === "未设置" || this.profitNum === "") {
        this.profitNum = this.maxProfit;
        return;
      }
      if (this.profitNum >= this.maxProfit) {
        return;
      }
      this.profitNum = this.addNum(this.profitNum, this.data.minWave);
    },
    profitChange(val) {
      if (val === "" || val === "未设置") {
        this.lastPrice = 0;
      } else {
        this.lastPrice = this.data.lastPrice;
      }
      this.profitNum = val;
    },
    // profitBlur(val) {
    //   if (val === "") {
    //     this.profitNum = "未设置";
    //   }
    // },
    cancle() {
      this.lossNum = "";
      this.profitNum = "";

      this.lossNum = this.vxLossNum;
      this.profitNum = this.vxProfitNum;
      this.lastPrice = 0;
      this.$emit("cancle");
    },
    confrim() {
      if (this.lossNum != "" && this.lossNum != "未设置") {
        this.lossNum = Number(this.lossNum);
      }
      if (this.profitNum != "" && this.profitNum != "未设置") {
        this.profitNum = Number(this.profitNum);
      }
      if (this.lossNum == 0 && this.lossNum != "" && this.lossNum != "未设置") {
        this.$vux.toast.text("止损价不能设置为0", "middle");

        return;
      }
      if (
        this.profitNum == 0 &&
        this.profitNum != "" &&
        this.profitNum != "未设置"
      ) {
        this.$vux.toast.text("止盈价不能设置为0", "middle");

        return;
      }
      if (
        this.lossNum != "" &&
        this.lossNum < this.data.minWave &&
        this.lossNum != "未设置"
      ) {
        this.$vux.toast.text("止损只能输入大于或等于最小波动点的值", "middle");
        return;
      }
      if (
        this.profitNum != "" &&
        this.profitNum < this.data.minWave &&
        this.profitNum != "未设置"
      ) {
        this.$vux.toast.text("止盈只能输入大于或等于最小波动点的值", "middle");
        return;
      }

      if (this.lossNum != "未设置" && this.lossNum != "") {
        if (!this.isPositiveIntegerTimes(this.lossNum, this.data.minWave)) {
          this.lossNum = this.accDiv(
            Math.floor(this.lossNum / this.data.minWave),
            this.data.minWave
          );
          this.$vux.toast.text("止损价必须是最小波动点的整数倍", "middle");

          return;
        }
      }
      if (this.profitNum != "未设置" && this.profitNum != "") {
        if (!this.isPositiveIntegerTimes(this.profitNum, this.data.minWave)) {
          this.profitNum = this.accDiv(
            Math.floor(this.profitNum / this.data.minWave),
            this.data.minWave
          );
          this.$vux.toast.text("止盈价必须是最小波动点的整数倍", "middle");

          return;
        }
      }
      if (
        this.lossNum != "" &&
        this.lossNum <= this.data.lastPrice &&
        this.lossNum != "未设置"
      ) {
        this.$vux.toast.text("止损价不能低于最新价", "middle");
        return;
      }
      if (
        this.profitNum != "" &&
        this.profitNum >= this.data.lastPrice &&
        this.profitNum != "未设置"
      ) {
        this.$vux.toast.text("止盈价不能高于最新价", "middle");
        return;
      }

      // if (
      //   this.lossNum != "" &&
      //   this.lossNum != "未设置" &&
      //   this.lossNum <= this.minLoss
      // ) {
      //   this.lossNum = this.minLoss;
      // }
      // if (
      //   this.profitNum != "" &&
      //   this.profitNum != "未设置" &&
      //   this.profitNum > this.maxProfit
      // ) {
      //   this.profitNum = this.maxProfit;
      // }
      this.$store.commit("vxLossNum", this.lossNum);
      this.$store.commit("vxProfitNum", this.profitNum);
      if (this.lossNum === "" || this.lossNum === "未设置") {
        this.$store.commit("vxLossNum", "未设置");
      }
      if (this.profitNum === "" || this.profitNum === "未设置") {
        this.$store.commit("vxProfitNum", "未设置");
      }
      this.lastPrice = 0;
      this.$emit("confrim");
    }
  },
  watch: {
    data() {
      if (this.data.minWave.toString().indexOf(".") != -1) {
        this.mave = this.data.minWave.toString().split(".")[1].length;
      } else {
        this.mave = 0;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.full {
  // padding: 0.2rem 0.5rem 0.4rem 0.5rem;
  .full-container {
    color: @darkBlueGrey;
    font-size: 0.28rem;
    .title {
      font-size: 0.32rem;
      text-align: center;
      // padding-bottom: 0.08rem;
      // border-bottom: 1px solid @silver;
    }
    .content {
      padding: 0.4rem 0.4rem 0;
    }
    .last-price {
      font-size: 0.28rem;
      margin-top: 0.16rem;
      span {
        font-size: 0.28rem;
        color: rgb(251, 84, 56);
      }
    }
    .price-box {
      margin-top: 0.3rem;
      display: flex;

      .label {
        margin-right: 0.2rem;
        font-size: 0.28rem;
      }
      .add-btn {
        flex: 1;
        margin-right: 0.58rem;
        /deep/.din-medium {
          font-size: 0.32rem;
        }
        .price-text {
          color: @darkBlueGrey;
          font-size: 0.28rem;
          margin-top: 0.1rem;
          p {
            span {
              color: @battleshipGrey;
              font-size: 0.24rem;
            }
          }
        }
      }
    }
  }
  .flex-btn {
    width: 100%;
    display: flex;
    & > div {
      flex: 1;
      height: 0.96rem;
      line-height: 0.96rem;
      text-align: center;
      color: #e0ecf7;
      &.reset {
        background: @blueyGrey;
      }
      &.save {
        background: @darkSkyBlue;
      }
    }
  }
}
</style>
