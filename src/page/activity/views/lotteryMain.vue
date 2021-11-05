<template>
  <div class="lottery-main">
    <div class="top-bg">
      <div class="top-tip">
        剩余<span>{{ lotteryNum }}</span
        >次抽奖机会
      </div>
      <div class="lottery">
        <div class="prize-main">
          <div class="prize block block1">
            <img src="@/assets/img/2_7/lottery/icom_hd_5z@2x.png" alt="" />
            <p>手续费5折</p>
          </div>
          <div class="prize block block2">
            <img src="@/assets/img/2_7/lottery/icom_hd_75z@2x.png" alt="" />
            <p>手续费7.5折</p>
          </div>

          <div class="prize block block3">
            <img src="@/assets/img/2_7/lottery/icom_hd_85z@2x.png" alt="" />
            <p>手续费8.5折</p>
          </div>

          <div class="prize block block4">
            <img src="@/assets/img/2_7/lottery/icom_hd_7z@2x.png" alt="" />
            <p>手续费7折</p>
          </div>

          <div
            class="prize start "
            :class="{ living: !isStart }"
            @click="start"
          >
            <div class="guang"></div>
          </div>

          <div class="prize block block5">
            <img src="@/assets/img/2_7/lottery/icom_hd_95z@2x.png" alt="" />
            <p>手续费9.5折</p>
          </div>

          <div class="prize block block6">
            <img src="@/assets/img/2_7/lottery/icom_hd_9z@2x.png" alt="" />
            <p>手续费9折</p>
          </div>

          <div class="prize block block7">
            <img src="@/assets/img/2_7/lottery/icom_hd_8z@2x.png" alt="" />
            <p>手续费8折</p>
          </div>

          <div class="prize block block8">
            <img src="@/assets/img/2_7/lottery/icom_hd_xxcy@2x.png" alt="" />
            <p>谢谢参与</p>
          </div>
        </div>
        <div class="jinbi">
          <img src="@/assets/img/2_7/lottery/icon_hd_jb2@2x.png" alt="" />
        </div>
      </div>
      <div class="broadcast">
        <div class="content">
          <template v-if="broadData && broadData.length > 0">
            <ul :class="{ animatedTop }" ref="broadDom">
              <li v-for="(item, index) in broadData">
                <span>{{ item.nickname }} 中了{{ item.awardName }}</span>
                <span>{{ item.date }}</span>
              </li>
              <li v-for="(item, index) in broadData2">
                <span>{{ item.nickname }} 中了{{ item.awardName }}</span>
                <span>{{ item.date }}</span>
              </li>
            </ul>
          </template>
        </div>
      </div>
      <div class="rule-activity">
        <img src="@/assets/img/2_7/lottery/icon_hd_hdgz@2x.png" alt="" />
        <div class="infos">
          <p>1、活动时间:2021-05-01到2021-05-30;</p>
          <p>2、每天任意交易1笔，不限保证金，可获取1张抽奖券;</p>
          <p>3、每天累计保证金≥100USDT，可获取2张抽奖券;</p>
          <p>4、每天累计保证金≥500USDT，可获取3张抽奖券;</p>
          <p>5、单笔交易≥500USDT，可一次性获取3张抽奖券;</p>
          <p>
            6、在活动时间内，每人每天最多可以获取3张抽奖券;
            抽奖券仅在当天有效，次日00:00:00重新计算;
          </p>
          <p>
            7、手续费折扣券可用于杠杆交易和USDT交割合约实盘市价单抵扣开仓手续费;
          </p>
          <p>
            8、手续费折扣券采用多不退少补使用原则，不支持叠加和拆分以及重复使用，每次只能使用1张。并且需要在有效期内使用，逾期该券作废;
          </p>
          <p>
            9、鼓励用户正常交易，如有发现通过未经允许的外挂程序、恶意获取手续费折扣券等不正规交易行为，平台有权终止该违规用户参与活动资格并收回手续费折扣券，严重行为者，会取缔该违规帐户，平台拥有最终解释权;
          </p>
        </div>
      </div>
    </div>
    <!-- 抽奖提醒 -->
    <lotteryPop ref="lotteryPop"></lotteryPop>
  </div>
</template>
<script>
import lotteryPop from "@/components/lotteryPop";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    lotteryPop
  },
  data() {
    return {
      isStart: false,
      stopTimer: null,
      currentPrizes: "",
      broadData: [],
      broadData2: [],
      animatedTop: false,
      isGoon: false,
      winData: null, //抽奖提示对象
      winNum: 8, // 中将号码
      lotteryNum: 0, //抽奖次数
      totalCount: 0, // 中将号码
      lotteryCount: 0, // 没有参与过抽奖
      scrollTimer: null, // 充值消息滚动定时器
      lotteryTimer: null, // 抽奖定时器
      stopTimer: null,
      // 移动端交互
      token: null
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "user/isLogin"
    })
  },
  created() {
    let { token } = this.$route.query;
    if (token) {
      this.token = token;
      localStorage.setItem("token", token);
    }
    this.getlotteryCount();
    this.getQueryList();
  },
  mounted() {
    // setInterval(() => {
    //   this.showScroll();
    // }, 2000);
  },

  methods: {
    ...mapActions({
      lottery: "user/lottery",
      queryLorreryList: "user/queryLorreryList",
      getLotteryCount: "user/lotteryCount",
      profileList: "user/profileList" //查询龙虎榜用户信息
    }),
    getlottery() {
      this.lottery().then(res => {
        console.log("中将名单", res);
        if (res.code && res.code != 0) {
          //抽奖次数已经用完
          this.setDefaultLottery();
          this.winData.isHasLottery = false; //是否有抽奖机会
          this.showPop();
        } else {
          if (res.awardName) {
            this.winNum = Number(res.awardName.replace(/[^0-9|.]/gi, "")); //今天中将号码
            console.log("中将号码为：", this.winNum);
            this.lotteryCount++;
            this.startLottery();
          }
        }
      });
    },
    getlotteryCount() {
      this.getLotteryCount().then(res => {
        console.log("抽奖次数", res);
        if (res.code && res.code != 0) {
          //抽奖次数已经用完
          this.lotteryNum = 0;
          this.setDefaultLottery();
        } else {
          // lotteryCount: 1
          // remainCount: 0
          // totalCount: 3
          let { remainCount, totalCount, lotteryCount } = res;
          this.lotteryNum = remainCount; //能够抽奖次数
          this.totalCount = totalCount; //今天总共抽几次
          this.lotteryCount = lotteryCount; //今天总共抽几次
        }
      });
    },
    /**
     * 抽奖开始
     */
    start() {
      let _this = this;
      if (!_this.isLogin) {
        if (window.webkit) {
          window.webkit.messageHandlers.toLogin.postMessage({});
        } else if (window.appInterface) {
          window.appInterface.toLogin({});
        } else {
          _this.$vux.confirm.show({
            title: _this.$t("message.login.title"),
            content: _this.$t("message.login.message2"),
            confirmText: _this.$t("setText.login"),
            cancelText: _this.$t("common.text3"),
            onCancel() {},
            onConfirm() {
              _this.$router.push("/login");
            }
          });
        }
        return;
      }
      if (this.isStart) return;
      if (this.lotteryNum > 0) {
        this.isStart = true;
        this.getlottery();
        // this.startLottery();
      } else {
        if (this.lotteryCount > 0) {
          if (this.lotteryCount == this.totalCount) {
            this.winData = {
              canDraws: false,
              isHasLottery: true
            };
          } else {
            this.winData = {
              canDraws: true,
              isHasLottery: false
            };
          }
        } else {
          this.winData = {
            canDraws: true,
            isHasLottery: false
          };
        }
        this.showPop();
      }
    },
    //摇奖开始
    startLottery() {
      const vm = this;
      let startIndex = 0; //从第一个开始
      let winIndex = 0;
      let count = 0;
      let prizes = [5, 7.5, 8.5, 7, 9.5, 9, 8, 0]; //奖品
      let arr = [0, 1, 2, 4, 7, 6, 5, 3]; //盒子运行索引下标，按照顺时针旋转
      let rand = 58; //Math.floor(Math.random() * 8 + 50);
      const around = () => {
        let blocks = document.getElementsByClassName("block");
        if (!blocks) return;
        for (let j = 0; j < arr.length; j++) {
          blocks[arr[j]].style.background = "#fffbf2";
        }
        blocks[arr[startIndex]].style.background = "#FCD390";
        winIndex = arr[startIndex];
        startIndex++;

        if (startIndex === arr.length) {
          startIndex = 0;
        }
        count++;
        if (count === 5 || count === 45) {
          clearInterval(vm.stopTimer);
          vm.stopTimer = setInterval(around, 200);
        }
        if (count === 10 || count === 35) {
          clearInterval(vm.stopTimer);
          vm.stopTimer = setInterval(around, 100);
        }
        if (count === 15) {
          clearInterval(vm.stopTimer);
          vm.stopTimer = setInterval(around, 50);
        }
        // 当等于上面的随机数时，或是否继续转动时
        if (count === rand || vm.isGoon) {
          vm.currentPrizes = prizes[winIndex];
          if (vm.currentPrizes != vm.winNum) {
            //没找到结果
            count = 44;
            vm.isGoon = true;
            clearInterval(vm.stopTimer);
            vm.stopTimer = setInterval(around, 200);
          } else {
            // 找到结果 停止转动
            clearInterval(vm.stopTimer);
            console.log("抽奖结果：", vm.currentPrizes);
            vm.isStart = false;
            vm.isGoon = false;
            vm.setDefaultLottery();
            vm.lotteryNum--;
            this.showPop();
          }
        }
      };
      vm.stopTimer = setInterval(around, 300);
    },
    // 获取中奖名单
    getQueryList() {
      this.queryLorreryList().then(res => {
        console.log("中奖名单", res);
        let { records } = res;
        this.getUserList(records);
      });
    },
    getUserList(records) {
      let uidList = records.map(d => d.userId);
      console.log("uidList==", uidList);
      this.profileList({ uidList: uidList }).then(res => {
        console.log("用户信息", res);
        records.forEach(d => {
          d.nickname = res.find(item => item.id == d.userId).nickname;
        });
        this.broadData = records;
        this.broadData2 = this.broadData;
        this.$nextTick(() => {
          this.broadData.length > 5 && this.showScroll();
        });
      });
    },
    // 初始化抽奖数据
    setDefaultLottery() {
      this.winData = {
        title: this.currentPrizes,
        isToWin: this.currentPrizes > 0,
        canDraws: this.lotteryNum > 0,
        isHasLottery: true
      };
    },
    showPop() {
      this.$refs.lotteryPop.showPop(this.winData);
    },
    //滚动充值消息
    showScroll() {
      this.animatedTop = true;
      let vm = this;
      // setTimeout(() => {
      //   this.broadData.push(this.broadData[0]);
      //   this.broadData.shift();
      //   this.animatedTop = false;
      // }, 500);
      let x = 0,
        dom = this.$refs.broadDom;
      let liHeight = dom.children[0].offsetHeight;
      let liLen = vm.broadData.length;

      let fun = () => {
        dom.style.top = -x + "px";
        x++;
        if (x % (liHeight * liLen) == 0) {
          this.broadData2 = [...this.broadData2, ...this.broadData];
        }
      };
      this.scrollTimer = setInterval(fun, 100);
    }
  },
  beforeDestroy() {
    this.scrollTimer && clearInterval(this.scrollTimer);
    this.stopTimer && clearInterval(this.stopTimer);
  }
};
</script>
<style>
.swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>
