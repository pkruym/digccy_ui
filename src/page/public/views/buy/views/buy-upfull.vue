<template>
  <model-full title="止盈止损点数设置" :showLine="true" class="limitset">
    <ul class="limitform">
      <li>
        <label>交易品种</label>
        <span class>{{ cptName }}</span>
      </li>
      <li>
        <label>交易方向</label>
        <span class="after flex">{{
          cptDirect == "BUY" ? "买涨" : "买跌"
        }}</span>
      </li>
      <li class="input">
        <label>止损点数</label>
        <base-input
          placeholder="请输入止损点数"
          v-model="stopLossPoint"
        ></base-input>
      </li>
      <li class="input">
        <label>止盈点数</label>
        <base-input
          placeholder="请输入止盈点数"
          v-model="stopProfitPoint"
        ></base-input>
      </li>
      <li>
        <label>是否生效</label>
        <InlineXSwitch class="Switchbutton" v-model="value"></InlineXSwitch>
      </li>
    </ul>
    <p>
      提前设置好止损止盈固定点数，下单成功止损止盈参数自动同步您设置的风控条件。
    </p>
    <div class="button" @click="button">确认提交</div>
  </model-full>
</template>

<script>
import ModelFull from "element/model-full";
import BaseInput from "@/components/element/base-input";
import { InlineXSwitch, Popup } from "vux";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ModelFull,
    BaseInput,
    InlineXSwitch,
    Popup
  },
  data() {
    return {
      fangxiangvule: "买涨",
      getCeshi: "黄金",
      stopLossPoint: "",
      stopProfitPoint: "",
      value: true,
      index: 0
    };
  },
  computed: {
    ...mapGetters({
      contractInfo: "contractInfo/contractInfo",
      commodityList: "commodity/commodityList",
      getSOPSetting: "actual/stoplossorprofit/getSOPSetting" // 止损止盈点数，可能为null
    }),
    cptName() {
      return this.commodityList[this.cptCommodityNo].name;
    },
    cptCommodityNo() {
      let { commodityNo, direct } = this.$route.query;
      return commodityNo;
    },
    cptDirect() {
      let { commodityNo, direct } = this.$route.query;
      if (direct == 1) {
        return "BUY";
      } else {
        return "SELL";
      }
    },
    cptGetSOPSetting() {
      let { commodityNo, direct } = this.$route.query;
      let info = this.getSOPSetting({
        commodityNo: commodityNo,
        direct: direct == 1 ? "BUY" : "SELL"
      });
      return info;
    }
  },
  mounted() {
    this.getParams();
  },
  methods: {
    ...mapActions({
      preset: "actual/stoplossorprofit/preset"
    }),
    getParams() {
      let { commodityNo, direct } = this.$route.query;
      let arr = Object.keys(this.commodityList);
      for (let i = 0; i < arr.length; i++) {
        if (commodityNo == arr[i].symbol) {
          this.index = i;
        }
      }
      if (this.cptGetSOPSetting != null) {
        this.stopLossPoint = this.cptGetSOPSetting.stopLossPoint;
        this.stopProfitPoint = this.cptGetSOPSetting.stopProfitPoint;
      }
    },

    button() {
      let param = {
        commodityNo: this.cptCommodityNo,
        direct: this.cptDirect,
        enable: !this.value ? "INVALID" : "VALID",
        stopLossPoint: parseFloat(this.stopLossPoint),
        stopProfitPoint: parseFloat(this.stopProfitPoint)
      };

      if (this.stopLossPoint == "" && this.stopProfitPoint == "") {
        this.$vux.toast.text("请设置正确的止损点或者止盈点", "middle");
        return false;
      } else if (this.stopLossPoint == "" && this.stopProfitPoint == "") {
        this.$vux.toast.text("请设置正确的止盈止损点数", "middle");
      } else {
        this.preset(param)
          .then(res => {
            this.$vux.toast.text("设置成功", "middle");
            this.$router.go(-1);
          })
          .catch(err => {
            this.$vux.toast.text(err, "middle");
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.limitset {
  background: #28323c;
  label {
    font-size: 0.32rem;
    color: #949fac;
    margin: 0 20px;
  }
  p {
    font-size: 0.24rem;
    color: #949fac;
    word-wrap: break-word;
    padding: 0 15px;
    margin-bottom: 0.6rem;
  }
  .button {
    width: 6.5rem;
    height: 0.98rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: @darkSkyBlue;
    color: #e0ecf7;
    font-size: 16px;
    font-family: "PingFang-SC-Medium";
    border-radius: 0.12rem;
    margin: 0 auto;
  }
}
.Switchbutton {
  margin: 0 20px;
}
.limitform {
  background-color: transparent;
  margin-bottom: 15px;
  padding: 0 0px;
  li {
    display: flex;
    height: 1rem;
    align-items: center;
    border-bottom: 1px solid #1a2529;
    justify-content: space-between;
    > span {
      font-size: 0.28rem;
      color: #949fac;
      align-items: center;
      margin: 0 10px;
    }
  }
  .input {
    display: flex;
    .input-box {
      margin: 0 10px;
      margin-bottom: 0;
    }
  }
}
</style>

<style>
.limitform .input-box__left {
  border: 0 !important;
}
.limitform .input-box__left input {
  text-align: right;
}
.limitform .weui-switch:checked,
.weui-switch-cp__input:checked ~ .weui-switch-cp__box {
  border-color: #2acca6;
  background-color: #2acca6;
}
</style>
