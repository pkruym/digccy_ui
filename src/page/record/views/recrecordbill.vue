<template>
  <ModelFull :title="$t('my.fund.text3')" class="fixd-wrap">
    <div class="bill">
      <ul>
        <li class="flex">
          <span class="span1">{{ $t("my.fund.text5") }}：</span>
          <span>{{ billDel.amount }}USDT</span>
        </li>
        <li class="flex">
          <span class="span1">{{ $t("my.fund.text4") }}：</span>
          <span>{{ billDel.payType }}</span>
        </li>
        <li class="flex">
          <span>{{ $t("my.fund.text14") }}:</span>
          <span>{{
            billDel.status === "PENDING"
              ? $t("my.fund.text7")
              : billDel.status === "NOTPASS"
              ? $t("my.fund.text8")
              : billDel.status === "PROCESSING"
              ? $t("my.fund.text10")
              : billDel.status === "SUCCESS"
              ? $t("my.fund.text22")
              : billDel.status === "FAILED"
              ? $t("my.fund.text12")
              : "--"
          }}</span>
        </li>
        <li class="flex">
          <span>{{ $t("my.fund.text21") }}：</span>
          <span>{{ billDel.burseAddress }}</span>
        </li>
        <li class="flex">
          <span>{{ $t("my.fund.hashAddress") }}：</span>
          <span>{{ billDel.hash }}</span>
        </li>
        <li class="flex">
          <span class="span1">{{ $t("my.fund.text6") }}：</span>
          <span>{{ billDel.gmtCreate }}</span>
        </li>

        <li class="flex">
          <span class="span1">{{ $t("my.fund.id") }}：</span>
          <span>{{ billDel.id }}</span>
        </li>
        <!-- <li class="flex">
          <span>可用余额：</span>
          <span>{{availableBalance}}</span>
        </li>-->
      </ul>
    </div>
  </ModelFull>
</template>
<script>
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
    this.billDel = JSON.parse(sessionStorage.getItem("billDel"));
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
