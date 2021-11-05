<template>
  <yd-popup id="lotteryPropup" v-if="showLotteryPopup" v-model="showLotteryPopup" class="lottery-popup" position="center">
    <div class="lottery-content" :class="{ thanks: !lottery.isToWin, hometip: isHomeTip }">
      <div class="content">
        <div class="result" v-if="lottery.isToWin">
          {{ lottery.title }} <span>{{$t('coupons.fold')}}</span>
        </div>
      </div>
      <div class="tips">{{ lottery.tips }}</div>
      <div class="btn" @click="lotteryBtnClick">{{ lottery.btnText }}</div>
    </div>
    <div class="close-pop" v-if="showLotteryPopup && isHomeTip" @click="showLotteryPopup = false"></div>
  </yd-popup>
</template>
<script>
export default {
  data() {
    return {
      showLotteryPopup: false,
      isHomeTip: false,
      isFromToTrade: false, //是否去交易
      lottery: {
        title: "7.5",
        canDraws: true, // 是否还可以继续抽奖
        tips: "温馨提示：奖品已发放可在“红包卡券”查看",
        btnText: "我知道了"
      }
    };
  },
  methods: {
    lotteryBtnClick() {
      this.showLotteryPopup = false;
      if (this.isHomeTip) {
        //去抽奖
        this.$router.push({
          path: "/lottery"
        });
      } else if (this.isFromToTrade) {
        if (window.webkit) {
          window.webkit.messageHandlers.toDeal.postMessage({});
        } else if (window.appInterface) {
          window.appInterface.toDeal({});
        } else {
          //去交易
          this.$router.push({
            path: "/quotation"
          });
        }
      }
    },
    showPop({
      title = "",
      isHomeTip = false,
      isHasLottery = false,
      isToWin = false,
      canDraws = false,
      tips = ""
    }) {
      //抽奖弹出层
      this.lottery.title = title;
      this.lottery.isToWin = isToWin; // 是否中奖
      this.lottery.canDraws = canDraws; // 是否能抽奖
      this.isHomeTip = isHomeTip;
      if (isHomeTip) {
        this.lottery.btnText = "去抽奖";
        this.lottery.tips = tips;
        this.isFromToTrade = false;
      } else {
        if (!isHasLottery) {
          this.lottery.btnText = "去交易";
          this.lottery.tips = "未获取抽奖券";
          this.isFromToTrade = true;
        } else if (!canDraws) {
          //没有抽奖次数
          this.lottery.btnText = "去交易";
          this.lottery.tips = "您的抽奖次数已使用完，明天再接再厉";
          this.isFromToTrade = true;
        } else if (!isToWin && canDraws) {
          this.lottery.btnText = "我知道了";
          this.lottery.tips = "谢谢参与,下次努力!";
          this.isFromToTrade = false;
        } else {
          this.lottery.btnText = "我知道了";
          this.lottery.tips = "温馨提示：奖品已发放可在“红包卡券”查看";
          this.isFromToTrade = false;
        }
      }

      this.alertLottery();
    },
    alertLottery() {
      this.showLotteryPopup = true;
    }
  }
};
</script>
