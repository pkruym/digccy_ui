<template>
  <div class="fast">
    <div class="tabs">
      <div>
        <span :class="{'isclick':tab==1}" @click="goTo(1)">USDT{{$t('dialog.usdtBuy.title')}}</span>
        <span class="sell" :class="{'isclick':tab==2}" @click="goTo(2)">USDT{{$t('dialog.usdtSell.title')}}</span>
      </div>
      <div class="record" @click="$router.push('/usdtList')">
        <img src="@/assets/img/icon_jilu@2x.png" alt="">
        <!-- <span>记录</span> -->
        <span>{{$t('dialog.usdtBuy.records')}}</span>
      </div>
    </div>
    <div class="content">
      <!-- <router-view></router-view> -->
      <purchase v-if="tab==1"></purchase>
      <sell v-if="tab==2"></sell>
    </div>
  </div>
</template>
<script>
import Purchase from './purchase'
import Sell from './sell'
export default {
  data() {
    return {
      tab: 1
    }
  },
  components: {
    Purchase,
    Sell
  },
  methods: {
    goTo(tab) {
      this.tab = tab
      // this.$router.push({
      //   path: tab == 1 ? '/purchase' : '/sell'
      // })
    }
  }
}
</script>
<style lang="less" scoped>
.fast {
  display: flex;
  flex-direction: column;
  height: 100%;
  .tabs {
    padding: 0 0.3rem;
    font-size: 14px;
    color: #949fac;
    height: 0.96rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .isclick {
      font-size: 20px;
      color: #e0ecf7;
    }
    span {
      transition: all 0.2s;
      &.sell {
        margin-left: 20px;
      }
    }
    .record {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 14px;
        height: 17px;
      }
      span {
        font-size: 10px;
        -webkit-transform: scale(0.8);
      }
    }
  }
  .content {
    height: calc(~'100% - 102px');
    background: #151e26;
    border-radius: 15px;
    overflow: hidden;
    padding: 0.4rem 0.3rem;
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #949fac;
      margin-bottom: 8px;
    }
    .form-box {
      padding: 0.4rem 0;
      border-bottom: 1px solid #3e4757;
      display: flex;
      span {
        font-size: 26px;
        color: #e0ecf7;
        margin-right: 5px;
      }
      input {
        font-size: 16px;
        color: #949fac;
        flex: 1;
        background: none;
      }
    }
    .btn {
      background: #2acca6;
      border-radius: 4px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fefefe;
      font-size: 14px;
      margin-top: 30px;
    }
    .usdtlist {
      padding: 0;
    }
  }
}
</style>
