<template>
  <model-full title="强平规则" class="qiangp">
    <ul>
      <li>
        <label class="flex">
          <img src="@/assets/img/ico-bule@3x.png" alt="" />
          <span>交易保证金</span>
        </label>
        <div>
          <p>
            交易保证金是投资者放在自己持仓的交易合约中的资金，用来承担交易过程中可能遭受的亏损，保证金交易充分利用了杠杆投资的原理，即用较少的资金实现获取较大的收益。
          </p>
        </div>
      </li>
      <li>
        <label class="flex">
          <img src="@/assets/img/ico-bule@3x.png" alt="" />
          <span>隔夜保证金</span>
        </label>
        <div>
          <p>
            隔夜保证金用于持仓订单过夜，为避免行情波动过大导致隔夜订单可能面临的强平风险，持仓过夜订单需要补足隔夜保证金，待第二天开盘持仓订单安全过夜将返还隔夜保证金
          </p>
        </div>
      </li>
      <li>
        <label class="flex">
          <img src="@/assets/img/ico-red@3x.png" alt="" />
          <span>保证金模式下的强制平仓</span>
        </label>
        <div>
          <p class="flex">
            <span>1、</span>
            <span
              >当订单产生亏损时，首先扣除可用余额，当可用余额亏损完，资产净值低于保证金强平比例时，订单会被强系统强制平仓</span
            >
          </p>
          <p class="flex">
            <span>2、</span>
            <span
              >当订单持仓至过夜时间，可用余额不足以支付过夜费，订单会被强制平仓</span
            >
          </p>
          <p class="flex">
            <span>3、</span> <span>合约到期未平仓的订单会被系统强制平仓</span>
          </p>
        </div>
      </li>
    </ul>
  </model-full>
</template>
<script>
import modelFull from "element/model-full";
export default {
  components: {
    modelFull
  }
};
</script>
<style lang="less" scoped>
.qiangp {
  height: 100%;
  background: @bodyBg;
  ul {
    padding: 0 0.42rem;
    li {
      div {
        padding: 0.26rem;
        border-radius: 4px;
        background: rgb(245, 245, 245);
        p {
          font-size: 0.24rem;
          color: @battleshipGrey;
          span {
            font-size: 0.24rem;
            color: @battleshipGrey;
          }
        }
      }
      label {
        padding: 0.26rem 0;
        align-items: center;
        img {
          width: 0.274rem;
          height: 0.274rem;
          display: inline-block;
          margin-right: 0.23rem;
        }
        span {
          font-size: 0.32rem;
          color: @darkBlueGrey;
        }
      }
    }
  }
}
</style>
