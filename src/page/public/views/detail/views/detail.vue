<template>
    <model-full title="结算详情" v-if="obj.orderType">
        <div class="content">
            <div class="top flex">
                <div class="t-left">
                    <p>
                        <span class="name">{{obj.commodityName}}({{obj.commodityNo}}{{obj.contractNo}})</span>
                        <span :class="[obj.orderType==='BuyUp'?'green':'red','shou']">{{obj.orderType==='BuyUp'?'买涨':'买跌'}}{{obj.quantity}}手</span>
                    </p>
                    <p class="bianhao">订单编号 {{obj.entrustNo||'--'}}</p>
                </div>
                <div class="t-right">
                    <span :class="[obj.publisherProfitOrLoss>0?'green':'red','left']">{{obj.publisherProfitOrLoss>0?'+':'-'}}{{obj.currencySign}}{{((obj.publisherProfitOrLoss>=0?obj.publisherProfitOrLoss:-obj.publisherProfitOrLoss)/obj.rate).toFixed(2)}}</span><span class="right">(￥{{obj.publisherProfitOrLoss?obj.publisherProfitOrLoss>=0?obj.publisherProfitOrLoss:-obj.publisherProfitOrLoss:0.00}})</span>
                </div>
            </div>
            <div class="middle"  v-if="obj.state=='Success'">
                <p>
                    <span class="label">保证金</span>
                    <span>{{obj.reserveFund||'--'}}</span>
                </p>
                <p>
                    <span class="label">持仓价</span>
                    <span>{{obj.openAvgFillPrice | toFixedFil(obj)||'--'}}</span>
                </p>
                <p>
                    <span class="label">{{obj.windControlType === 'DayUnwind'?'日内平仓':obj.windControlType === 'ReachStrongPoint'?'达到强平点':obj.windControlType === 'UserApplyUnwind'?'手动平仓':obj.windControlType === 'BackhandUnwind'?'手动平仓':obj.windControlType === 'ReachProfitPoint'?'达到止盈':obj.windControlType === 'ReachLossPoint'?'达到止损':obj.windControlType === 'ReachContractExpiration'?'合约到期':obj.windControlType === 'StopProfitOrLoss'?'止盈止损平仓':obj.windControlType === 'SpecifiedPrice'?'委托价平仓':obj.windControlType === 'OvernightFeeNotEnough'?'延期费不足强平':'异常'}}</span>
                    <span>{{obj.tradePrice | toFixedFil(obj)||'--'}}</span>
                </p>
                <p>
                    <span class="label">平仓时间</span>
                    <span>{{obj.settlementTime||'--'}}</span>
                </p>
                <p>
                    <span class="label">平仓类型</span>
                    <span>{{obj.windControlType === 'DayUnwind'?'日内平仓':obj.windControlType === 'ReachStrongPoint'?'达到强平点':obj.windControlType === 'UserApplyUnwind'?'手动平仓':obj.windControlType === 'BackhandUnwind'?'手动平仓':obj.windControlType === 'ReachProfitPoint'?'达到止盈':obj.windControlType === 'ReachLossPoint'?'达到止损':obj.windControlType === 'ReachContractExpiration'?'合约到期':obj.windControlType === 'StopProfitOrLoss'?'止盈止损平仓':obj.windControlType === 'SpecifiedPrice'?'委托价平仓':obj.windControlType === 'OvernightFeeNotEnough'?'延期费不足强平':'异常'}}</span>
                </p>
                <!-- <p>
                    <span class="label">止盈点</span>

                    <span v-if="obj.orderType === 'BuyUp' ">{{( obj.buyingPrice + Math.floor( obj.perUnitLimitProfitAmount / obj.perWaveMoney ) * obj.minWave )| toFixedFil(obj)}}({{obj.currencySign}}{{obj.perUnitLimitProfitAmount*obj.totalQuantity}})
                    </span>
                    <span v-else>{{(obj.buyingPrice - Math.floor( obj.perUnitLimitProfitAmount / obj.perWaveMoney ) * obj.minWave )| toFixedFil(obj)}}({{obj.currencySign}}{{obj.perUnitLimitProfitAmount*obj.totalQuantity}})
                    </span>

                </p>
                <p>
                    <span class="label">止损点</span>
                    <span v-if="obj.orderType === 'BuyUp' ">{{(obj.buyingPrice - Math.floor( obj.perUnitLimitLossAmount / obj.perWaveMoney ) * obj.minWave) | toFixedFil(obj)}}({{obj.currencySign}}{{obj.perUnitLimitLossAmount* obj.totalQuantity}})
                    </span>
                    <span v-else>{{(obj.buyingPrice + Math.floor( obj.perUnitLimitLossAmount / obj.perWaveMoney ) * obj.minWave )| toFixedFil(obj)}}({{obj.currencySign}}{{obj.perUnitLimitLossAmount}})
                    </span>
                </p> --> 

            </div>
            <div class="bottom" v-if="obj.state=='Unwind'">
                <p>
                    <span class="label">{{obj.buyingPriceType=='MKT'?'市价':'委托价'}}买入</span>
                    <span v-if="obj.state=='Unwind' || obj.state=='Position'">{{obj.buyingPrice | toFixedFil(obj)}}</span>
                    <span v-else>{{obj.buyingEntrustPrice | toFixedFil(obj)}}</span>
                </p>
                <p>
                    <span class="label">开仓时间</span>
                    <span>{{obj.buyingTime||'--'}}</span>
                </p>
                <p>
                    <span class="label">市价平仓</span>
                    <span>{{obj.sellingPrice||'--'}}</span>
                </p>
                <p>
                    <span class="label">平仓时间</span>
                    <span>{{obj.sellingTime||'--'}}</span>
                </p>
                <p>
                    <span class="label">平仓类型</span>
                    <span>{{obj.windControlType=='DayUnwind'?'强制平仓':obj.windControlType=='UserApplyUnwind'?'手动平仓':obj.windControlType=='BackhandUnwind'?'手动平仓':obj.windControlType=='ReachProfitPoint'?'达到止盈':obj.windControlType=='ReachLossPoint'?'达到止损':obj.windControlType=='ReachContractExpiration'?'合约到期':'异常'}}</span>
                </p>
            </div>
            <div class="bottom"  v-if="obj.state=='Canceled'">
                <p>
                    <span class="label">保证金</span>
                    <span>{{obj.reserveFund}}</span>
                </p>
                <p>
                    <span class="label">委托价</span>
                    <span>{{obj.entrustPrice||'--'}}</span>
                </p>
                <!-- <p>
                    <span class="label">{{obj.buyingPriceType=='MKT'?'市价':'委托价'}}买入</span>

                    <span v-if="obj.state=='Unwind' || obj.state=='Position'">{{obj.buyingPrice | toFixedFil(obj)}}</span>
                    <span v-else>{{obj.buyingEntrustPrice | toFixedFil(obj)}}</span>
                </p> -->
                <p>
                    <span class="label">委托时间</span>
                    <span>{{obj.entrustTime||'--'}}</span>
                </p>
                <p>
                    <span class="label">委托状态</span>
                    <span>{{obj.state == 'Canceled'? '委托取消' :obj.state == 'BuyingFailure'? '委托失败':'--'}}</span>
                </p>
            </div>
        </div>
    </model-full>
</template>
<script>
import modelFull from "element/model-full";

export default {
  components: {
    modelFull
  },
  data() {
    return {
      obj: {}
    };
  },
  created() {
    this.obj = this.$route.params;
    console.log(this.obj);
  },
  methods: {
    getDetail() {
      const id = this.$route.query.id || 0;
      this.$axios.get(`/tactics/futuresOrder/detail/${id}`).then(res => {
        if (res.data.code == "200") {
          this.obj = res.data.result;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>


.content {
  padding: 10px 20px;
  .label {
    font-size: 0.28rem;
    color: @battleshipGrey;
  }
  .top {
    padding: 10px 0;
    align-items: center;
    justify-content: space-between;
    .shou {
      font-size: 0.24rem;
    }
    .bianhao {
      font-size: 0.24rem;
      color: @battleshipGrey;
    }
    .right {
      font-size: 0.24rem;
      color: @battleshipGrey;
    }
  }
  .middle {
    padding: 10px 0;
    border-top: 1px dashed #ddd;
    border-bottom: 1px dashed #ddd;
    p {
      line-height: 0.48rem;
      display: flex;
      justify-content: space-between;
    }
  }
  .bottom {
    padding: 10px 0;
    border-top: 1px dashed #ddd;
    border-bottom: 1px dashed #ddd;
    p {
      line-height: 0.48rem;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
