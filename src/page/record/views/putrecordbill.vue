<template>
  <ModelFull :title="$t('my.fund.text13')" class="fixd-wrap">
    <div class="bill">
      <ul>
        <!-- <li class="flex">
                  <span>充值方式：</span>
                  <span>{{billDel.paymentType || '无'}}</span>
        </li>-->

        <li class="flex">
          <span>{{ $t("my.fund.text15") }}:</span>
          <span :class="[billDel.amount > 0 ? 'red' : 'green']">{{ billDel.amount }}USDT</span>
        </li>
        <li class="flex">
          <span>{{ $t("my.fund.realAmount") }}：</span>
          <span>{{ billDel.actualAmount }}USDT</span>
        </li>
        <li class="flex">
          <span>{{ $t("my.fund.text14") }}:</span>
          <span>{{
            billDel.status === "PENDING"
              ? $t("my.fund.text77")
              : billDel.status === "NOTPASS"
              ? $t("my.fund.text88")
              : billDel.status === "PROCESSING"
              ? $t("my.fund.text100")
              : billDel.status === "SUCCESSFUL"
              ? $t("my.fund.text111")
              : billDel.status === "FAILED"
              ? $t("my.fund.text122")
              : "--"
          }}</span>
        </li>
        <li class="flex">
          <span>{{ $t("my.fund.text20") }}：</span>
          <span>{{ billDel.withdrawPath }}</span>
        </li>
        <li class="flex">
          <span>{{ $t("my.fund.hashAddress") }}：</span>
          <span>{{ billDel.hash }}</span>
        </li>
        <li class="flex">
          <span>{{ $t("my.fund.detailFee") }}：</span>
          <span>{{ billDel.fee }}USDT</span>
        </li>
        <li class="flex">
          <span>{{ $t("my.fund.text16") }}：</span>
          <span>{{ billDel.applyTime }}</span>
        </li>

        <li class="flex">
          <span>{{ $t("my.fund.id") }}：</span>
          <span>{{ billDel.id }}</span>
        </li>
        <li class="flex" v-if="billDel.remark">
          <span>{{ $t("legalTransaction.text6") }}：</span>
          <span>{{ billDel.remark }}</span>
        </li>
        <!-- <li class="flex">
                  <span>提现余额：</span>
                  <span>{{availableBalance}}</span>
        </li>-->
      </ul>
    </div>
  </ModelFull>
</template>
<script>
import ModelFull from "element/model-full";
import { withdrawStatusEnum } from "@js/utils/constant";

export default {
  data() {
    return {
      billDel: {}
    };
  },
  computed: {
    cptStatus() {
      return key => {
        if (withdrawStatusEnum.in[key] == key) {
          return withdrawStatusEnum.out[key];
        }
      };
    }
  },
  components: {
    ModelFull
  },
  created() {
    this.billDel = JSON.parse(sessionStorage.getItem("billDel"));
    console.log('this.billDel', this.billDel)
    this.availableBalance = sessionStorage.availableBalance || "---";
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
