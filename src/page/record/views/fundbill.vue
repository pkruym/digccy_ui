<template>
  <ModelFull :title="$t('my.fund.text2')" class="bill fixd-wrap">
    <div class="bill">
      <ul>
        <li class="flex" v-if="billDel.symbol != 'null(null)'">
          <span class="span1">{{ $t("common.commodityNo") }}:</span>
          <span>{{
            (billDel.tradeType !== "FUTURE" ? billDel.symbol : billDel.name) ||
              "无"
          }}</span>
        </li>
        <li class="flex">
          <span class="span1">{{ $t("my.fund.id") }}：</span>
          <span>{{ billDel.id }}</span>
        </li>
        <li class="flex">
          <span class="span1">{{ $t("my.fund.type") }}：</span>
          <span>{{ billDel.typeDescription }}</span>
        </li>
        <!--订单亏损金额-->
        <li class="flex" v-if="billDel.value16!=''">
          <span class="span1">{{ $t("my.fund.Orderloss") }}：</span>
          <span>{{ billDel.value16 }}USDT</span>
        </li>
        <li class="flex" v-if="
            ((billDel.type != 'UNFREEZE_DEPOSIT' &&
              billDel.type != 'CREDIT_PROFIT' &&
              billDel.type != 'DEBIT_FEE' &&
              billDel.type != 'FREEZE_FEE' &&
              billDel.type != 'CREDIT_REBATE_FEE' &&
              billDel.type != 'FREEZE_DEPOSIT' &&
              billDel.type != 'DEBIT_OVERNIGHT_FEE') ||
              (billDel.value14 && billDel.amount > 0))&&billDel.value16==''
          ">
          <span class="span1">{{ $t("my.fund.money") }}：</span>
          <span>{{ billDel.amount }}USDT</span>
        </li>
        <li class="flex" v-if="billDel.type == 'UNFREEZE_DEPOSIT' && billDel.amount == 0">
          <span class="span1">{{ $t("my.fund.money") }}：</span>
          <span>{{ billDel.value14 }}USDT</span>
        </li>
        <!--隔夜费扣除-->
        <!-- <li class="flex" v-if="billDel.value5">
          <span class="span1">{{ $t("my.fund.Overnightdeduction") }}：</span>
          <span>{{ billDel.value5 }}USDT</span>
        </li> -->
        <!--红包保证金券抵扣-->
        <li class="flex" v-if="billDel.value1">
          <span class="span1">{{ $t("my.fund.Securitydeduction") }}：</span>
          <span>{{ billDel.value1 }}USDT</span>
        </li>
        <!--系统减免-->
        <li class="flex" v-if="billDel.value2">
          <span class="span1">{{ $t("my.fund.Systemexemption") }}：</span>
          <span>{{ billDel.value2 }}USDT</span>
        </li>
        <!--手续费折扣券抵扣-->
        <!-- <li class="flex" v-if="billDel.value3">
          <span class="span1">{{ $t("my.fund.Overnightdeduction") }}：</span>
          <span>{{ billDel.value3 }}USDT</span>
        </li> -->
        <li class="flex" v-if="billDel.value6">
          <span class="span1">{{ $t("my.fund.feededuction") }}：</span>
          <span>{{ billDel.value6 }}USDT</span>
        </li>

        <!--解冻-->
        <li class="flex" v-if="billDel.value12">
          <span class="span1">{{ $t("my.fund.unfreezingmoney") }}：</span>
          <span>{{ billDel.value12 }}USDT</span>
        </li>

        <!--盈利-->
        <li class="flex" v-if="billDel.value11">
          <span class="span1">{{ $t("my.fund.zhanghubalance") }}：</span>
          <span>{{ billDel.value11 }}USDT</span>
        </li>

        <li class="flex" v-if="billDel.value10">
          <span class="span1">{{ $t("my.fund.redbalance") }}：</span>
          <span>{{ billDel.value10 }}USDT</span>
        </li>

        <!--手续费-->
        <li class="flex" v-if="billDel.value8&&billDel.value15==''">
          <span class="span1">{{ $t("my.fund.balancededuction") }}：</span>
          <span>{{ billDel.value8 }}USDT</span>
        </li>
        <li class="flex" v-if="billDel.value9">
          <span class="span1">{{ $t("my.fund.Securitydeduction") }}：</span>
          <span>{{ billDel.value9 }}USDT</span>
        </li>
        <li class="flex" v-if="billDel.value7">
          <span class="span1">{{ $t("my.fund.Securitydeduction") }}：</span>
          <span>{{ billDel.value7 }}USDT</span>
        </li>
        <!--现金账户抵扣-->
        <li class="flex" v-if="billDel.value15!=''">
          <span class="span1">{{ $t("my.fund.Cashduction") }}：</span>
          <span>{{ billDel.value15 }}USDT</span>
        </li>

        <!--备注-->
        <li class="flex" v-if="billDel.value13">
          <span class="span1">{{ $t("legalTransaction.text6") }}：</span>
          <span>{{ billDel.value13 }}</span>
        </li>
        <li class="flex">
          <span class="span1">{{ $t("my.fund.time") }}：</span>
          <span>{{ billDel.gmtCreate }}</span>
        </li>
        <li class="flex">
          <span class="span1">{{ $t("futures.text6") }}：</span>
          <span>{{ billDel.balance }}USDT</span>
        </li>
      </ul>
    </div>
  </ModelFull>
</template>
<script>
import { toFixedStr } from "@/assets/js/add-remove";
import ModelFull from "element/model-full";
export default {
  data() {
    return {
      billDel: {}
    };
  },
  components: {
    ModelFull
  },

  created() {
    //
    let data = Object.assign({}, JSON.parse(sessionStorage.getItem("billDel")));
    data.value1 = ""; //红包保证金抵扣
    data.value2 = ""; //系统减免
    data.value3 = ""; //红包盈利账户抵扣
    data.value4 = ""; //红包账户盈利金额
    data.value5 = ""; //隔夜费扣除
    data.value6 = ""; //手续费抵扣券抵扣
    data.value7 = ""; //收益账户抵扣
    data.value8 = ""; //账户余额划扣
    data.value9 = ""; //保证券抵扣
    data.value10 = ""; //红包账户收益
    data.value11 = ""; //账户收益
    data.value12 = ""; //解冻金额
    data.value13 = ""; //备注
    data.value14 = ""; //金额
    data.value15 = ""; //现金账户抵扣
    data.value16 = ""; //订单亏损
    data.amount = toFixedStr(data.amount, 2);
    if (data.remark && data.remark.data && data.remark.data.amount)
      data.remark.data.amount = Number(toFixedStr(data.remark.data.amount, 2));
    if (data.remark && data.remark.data && data.remark.data.discountAmount)
      data.remark.data.discountAmount = Number(
        toFixedStr(data.remark.data.discountAmount, 2)
      );
    //备注信息处理
    if (data.remark && data.remark.data) {
      if (data.remark.data.type == "LUCK_MONEY_MARGIN_DISCOUNT") {
        // data.value13 = "红包保证金抵扣";
        data.value1 = data.remark.data.amount;
        data.value8 = data.amount;
      }
      if (data.remark.data.type == "LUCK_MONEY_FEE_FREE") {
        data.value13 = "系统减免";
        data.value2 = data.remark.data.amount;
        data.value8 = data.amount;
      }
      if (data.remark.data.type == "LUCK_MONEY_ACCOUNT_DISCOUNT") {
        data.value13 = "红包盈利账户抵扣";
        data.value3 = data.remark.data.amount;
        data.value8 = data.amount;
      }
      if (data.remark.data.type == "LUCK_MONEY_ACCOUNT_PROFIT") {
        data.value13 = "红包账户盈利金额";
        data.value10 = data.amount;
      }
      if (data.remark.data.type == "LUCK_MONEY_OVERNIGHT_FEE_DISCOUNT") {
        data.value13 = "隔夜费扣除";
        data.value8 = data.amount;
      }

      if (data.remark.data.type == "FEE_DISCOUNT_DEBIT") {
        data.value13 = "手续费抵扣券抵扣";
        data.value8 = data.amount;
      }
    }
    //解冻信息处理
    if (data.type == "UNFREEZE_DEPOSIT") {
      data.value12 = data.amount;
    }
    //账户收益
    if (data.type == "CREDIT_PROFIT") {
      data.value11 = data.amount;
    }
    //红包账户收益
    if (
      data.remark &&
      data.type == "CREDIT_PROFIT" &&
      data.remark.data.discountAmount
    ) {
      data.value10 = data.remark.data.discountAmount;
    }

    //隔夜费综合处理
    if (data.remark && data.remark.data.tradeAmountList) {
      data.remark.data.tradeAmountList.forEach(element => {
        if (
          element.type == "LUCK_MONEY_MARGIN_DISCOUNT" &&
          data.type != "UNFREEZE_DEPOSIT"
        ) {
          // data.value13 = data.value13 ? "" : "红包保证金券抵扣";
          data.value1 = Number(toFixedStr(element.amount, 2));
          data.value8 = data.amount;
        }

        if (
          element.type == "LUCK_MONEY_MARGIN_DISCOUNT" &&
          data.type == "UNFREEZE_DEPOSIT"
        ) {
          data.value14 = data.amount;
        }
        if (element.type == "LUCK_MONEY_FEE_FREE") {
          data.value13 = " 系统减免";
          data.value2 = Number(toFixedStr(element.amount, 2));
          data.value8 = data.amount;
        }
        if (
          element.type == "LUCK_MONEY_ACCOUNT_DISCOUNT" &&
          data.type != "UNFREEZE_FEE"
        ) {
          // data.value13 = " 红包账户抵扣";
          data.value3 = Number(toFixedStr(element.amount, 2));
          data.value8 = data.amount;
        }
        if (element.type == "LUCK_MONEY_OVERNIGHT_FEE_DISCOUNT") {
          // data.value13 = " 红包账户抵扣隔夜费";
          data.value5 = Number(toFixedStr(element.amount, 2));
          data.value8 = data.amount;
        }
        if (element.type == "CASH_ACCOUNT_DEDUCTION") {
          data.value15 = toFixedStr(Math.abs(element.amount), 2);
          // data.value8 = data.amount;
        }
        if (element.type == "ORDER_LOSS_AMOUNT") {
          data.value16 = (toFixedStr(Math.abs(element.amount), 2));
          // data.value8 = data.amount;
        }
        if (element.type == "LUCK_MONEY_ACCOUNT_PROFIT") {
          // data.value13 = " 红包账户盈利金额";
          data.value10 = Number(toFixedStr(element.amount, 2));
        }
        if (
          element.type == "FEE_DISCOUNT_DEBIT" &&
          data.type != "UNFREEZE_FEE"
        ) {
          data.value13 = data.value13 ? "" : " 手续费抵扣券抵扣";
          data.value6 = Number(toFixedStr(element.amount, 2));
          data.value8 = data.amount;
        }
      });
    }
    if (data.remark && data.remark.data.discountAmountList) {
      data.remark.data.discountAmountList.forEach(element => {
        if (
          element.type == "LUCK_MONEY_MARGIN_DISCOUNT" &&
          data.type != "UNFREEZE_DEPOSIT"
        ) {
          // data.value13 = "红包保证金券抵扣";
          data.value1 = Number(toFixedStr(element.amount, 2));
          data.value8 = data.amount;
        }
        if (
          element.type == "LUCK_MONEY_MARGIN_DISCOUNT" &&
          data.type == "UNFREEZE_DEPOSIT"
        ) {
          data.value14 = data.amount;
        }
        if (element.type == "LUCK_MONEY_FEE_FREE") {
          data.value13 = " 系统减免";
          data.value2 = Number(toFixedStr(element.amount, 2));
          data.value8 = data.amount;
        }
        if (
          element.type == "LUCK_MONEY_ACCOUNT_DISCOUNT" &&
          data.type != "UNFREEZE_FEE"
        ) {
          // data.value13 = " 红包账户抵扣";
          data.value3 = Number(toFixedStr(element.amount, 2));
          data.value8 = data.amount;
        }
        if (element.type == "CASH_ACCOUNT_DEDUCTION") {
          data.value15 = toFixedStr(Math.abs(element.amount), 2);
          // data.value8 = data.amount;
        }
        if (element.type == "ORDER_LOSS_AMOUNT") {
          data.value16 = (toFixedStr(Math.abs(element.amount), 2));
          // data.value8 = data.amount;
        }
        if (element.type == "LUCK_MONEY_OVERNIGHT_FEE_DISCOUNT") {
          // data.value13 = " 红包账户抵扣隔夜费";
          data.value5 = Number(toFixedStr(element.amount, 2));
          data.value8 = data.amount;
        }
        if (element.type == "LUCK_MONEY_ACCOUNT_PROFIT") {
          // data.value13 = " 红包账户盈利金额";
          data.value10 = Number(toFixedStr(element.amount, 2));
        }
        if (
          element.type == "FEE_DISCOUNT_DEBIT" &&
          data.type != "UNFREEZE_FEE"
        ) {
          data.value13 = " 手续费抵扣券抵扣";
          data.value6 = Number(toFixedStr(element.amount, 2));
          data.value8 = data.amount;
        }
      });
    }
    //手续费
    if (
      data.remark &&
      (data.type == "DEBIT_FEE" ||
        data.type == "FREEZE_FEE" ||
        data.type == "CREDIT_REBATE_FEE" ||
        data.type == "FREEZE_DEPOSIT") &&
      data.remark.data.discountAmount > 0
    ) {
      if (billDel.type == "FREEZE_DEPOSIT") {
        data.value9 = data.remark.data.discountAmount;
      } else {
        data.value7 = data.remark.data.discountAmount;
      }
    }
    if (
      (!data.remark ||
        (!data.remark.data.discountAmountList &&
          !data.remark.data.tradeAmountList)) &&
      data.type != "DEBIT_FEE" &&
      data.type != "UNFREEZE_DEPOSIT" &&
      data.type != "CREDIT_PROFIT"
    ) {
      data.value14 = data.amount;
    }
    if (
      data.remark &&
      (!data.remark.data.discountAmountList ||
        !data.remark.data.tradeAmountList) &&
      data.type == "DEBIT_FEE"
    ) {
      data.value14 = data.amount;
    }
    this.billDel = data;
    console.log("$tradeType.tradeType111111111111", this.billDel);
    // this.availableBalance = sessionStorage.availableBalance || "---";
  }
};
</script>
<style lang="less" scoped>
.bill {
  ul {
    padding: 0.4rem;
    li {
      justify-content: space-between;
      align-items: center;
      padding: 0.15rem 0;
      span {
        color: @battleshipGrey;
        font-size: 0.28rem;
        &:first-child {
          width: 3.2rem;
        }
        &:last-child {
          display: block;
          flex: 1;
          text-align: right;
          word-break: break-all;
        }
      }
    }
  }
}
</style>
