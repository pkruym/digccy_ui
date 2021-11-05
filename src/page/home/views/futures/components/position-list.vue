<template>
  <div>
    <div class="list-item" v-for="(item, idx) in list" :key="idx" @click="jumpToDetail(item)">
      <div class="top">
        <div class="info">
          <span class="bit-name weight">
            {{
              $tradeType.tradeType !== "FUTURE"
                ? item.symbol.split("/")[0]
                : $lang == "en"
                ? item.nameEnglish
                : item.name
            }}
            <template v-if="$tradeType.tradeType == 'LEVER'">
              {{ "/" + item.symbol.split("/")[1] }}
            </template>
          </span>
          <span class="number" :class="[item.direct === 'BUY' ? 'green' : 'red']">{{ item.leverage }}X·{{
              item.direct === "BUY" ? $t("index.text41") : $t("index.text40")
            }}</span>
        </div>
        <div>
          <span v-if="$tradeType.tradeType != 'LEVER'">{{ $t("leverageTrading.deliverytips") }}{{ item.expiredDay
            }}{{ $t("leverageTrading.day") }}</span>
          <div class="right-arrow">
            <img src="@/assets/img/2_7/icon_more@2x.png" alt="" />
          </div>
        </div>
      </div>
      <div class="fd-num">
        <div class="fd-box">
          <span class="label">{{ $t("futures.position.text42") }}(USDT)</span>
          <span class="number" :class="[item.FPAL > 0 ? 'green' : 'red']">
            {{ item.FPAL }}</span>
        </div>
        <div class="fd-box">
          <span class="label">{{ $t("futures.position.text43") }}</span>
          <span class="number">
            {{
              $tradeType.tradeType == "LEVER"
                ? item.volume
                : Number(item.volume)
            }}{{
              $tradeType.tradeType == "LEVER"
                ? item.symbol.split("/")[0]
                : $t("leverageTrading.bow")
            }}
          </span>
        </div>
      </div>
      <div class="mid">
        <div class="fd-num">
          <div class="fd-box">
            <span class="label">{{ $t("futures.position.text3") }}(USDT)</span>
            <span class="number" :class="[item.direct === 'BUY' ? 'green' : 'red']">{{ item.close || "--" }}</span>
          </div>
          <div class="fd-box">
            <span class="label">{{ $t("futures.position.text4") }}(USDT)</span>
            <span class="number">{{
              toFixedStr(item.price,item.pricePrecision)
            }}</span>
          </div>
          <div class="fd-box">
            <span class="label">{{ $t("futures.position.text5") }}(USDT)</span>
            <span class="number">
              <template v-if="item.direct === 'BUY'">
                {{ item.margin ? toFixedStr(item.margin) : "--" }}
              </template>
              <template v-else>
                {{ item.margin ? toFixedStr(item.margin) : 0 }}
              </template>
            </span>
          </div>
        </div>
        <div class="fd-num">
          <div class="fd-box">
            <!-- 开仓手续费 -->
            <span class="label">{{ $t("common.text19") }}(USDT)</span>
            <span class="number">{{
              item.actualFee == 0
                ? $t("buy.text73")
                : item.fee
                ? toFixedStr(item.fee)
                : "0"
            }}</span>
          </div>
          <div class="fd-box">
            <span class="label">{{ $t("futures.position.text7") }}(USDT)</span>
            <span class="number">
              {{
                item.stopLossPrice
                  ? toFixedStr(item.stopLossPrice,item.pricePrecision)
                  : "--"
              }}</span>
          </div>
          <div class="fd-box">
            <span class="label">{{ $t("futures.position.text8") }}(USDT)</span>
            <span class="number">
              {{
                item.stopProfitPrice
                  ? toFixedStr(item.stopProfitPrice,item.pricePrecision)
                  : "--"
              }}</span>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <div class="btn active" @click.stop="openPc(item)">
          {{ $t("futures.position.text12") }}
        </div>
        <div class="btn" @click.stop="openZszy(item)">
          {{ $t("futures.position.text9") }}
        </div>
      </div>
    </div>
    <!-- <popup v-model="showPing" class="pc-popup" :show-mask="true">
      <div class="content"></div>
    </popup> -->
    <!-- 止损止盈 -->
    <yd-popup v-model="showZs" class="pc-popup" position="bottom" width="100%">
      <div class="content bottom" v-if="cptData">
        <div class="head">
          <div class="title">
            {{
              $tradeType.tradeType !== "FUTURE"
                ? cptData.symbol.split("/")[0]
                : $lang == "en"
                ? cptData.nameEnglish
                : cptData.name
            }}
            <template v-if="$tradeType.tradeType == 'LEVER'">
              {{ "/" + cptData.symbol.split("/")[1] }}
            </template>
            <span :class="cptData.direct == 'BUY' ? 'green' : 'red'">
              {{ cptData.leverage }}X·{{
                cptData.direct == "BUY"
                  ? $t("index.text41")
                  : $t("index.text40")
              }}</span>
          </div>
          <div class="cancel" @click="showZs = false">
            {{ $t("personalCenter.text16") }}
          </div>
        </div>
        <div class="mid">
          <div class="fd-num">
            <div class="fd-box">
              <span class="label">{{ $t("futures.position.text4") }}(USDT)</span>
              <span class="number">{{ cptData.price }}</span>
            </div>
            <div class="fd-box">
              <span class="label">{{ $t("futures.position.text3") }}(USDT)</span>
              <span class="number" :class="[cptData.direct === 'BUY' ? 'green' : 'red']">{{ cptData.close || "--" }}</span>
            </div>
            <div class="fd-box">
              <span class="label">{{ $t("futures.position.text42") }}(USDT)</span>
              <span class="number" :class="[cptData.FPAL > 0 ? 'green' : 'red']">
                {{ cptData.FPAL }}</span>
            </div>
          </div>
          <div class="cell-box">
            <div class="cell-box">
              <span>{{ $t("futures.position.text7") }}</span>
              <div class="input-add large">
                <input class="input" v-model="stopLossPriceVal" @keydown="UpNumber($event, 'stopLossPrice')" @blur="blurNumber($event, 'stopLossPrice')" type="number" />
                <span class="dw">USDT</span>
                <div class="action">
                  <span @click="jian('stopLossPrice')">-</span>
                  <span @click="add('stopLossPrice')">+</span>
                </div>
              </div>
            </div>
          </div>
          <p class="right-txt">
            {{ $t("futures.position.text48") }} ≈ -{{ stopLossMoney }}
          </p>
          <div class="cell-box">
            <div class="cell-box">
              <span>{{ $t("futures.position.text8") }}</span>
              <div class="input-add large">
                <input class="input" v-model="stopProfitPriceVal" @keydown="UpNumber($event, 'stopProfitPrice')" @blur="blurNumber($event, 'stopProfitPrice')" type="number" />
                <span class="dw">USDT</span>
                <div class="action">
                  <span @click="jian('stopProfitPrice')">-</span>
                  <span @click="add('stopProfitPrice')">+</span>
                </div>
              </div>
            </div>
          </div>
          <p class="right-txt">
            {{ $t("futures.position.text49") }} ≈ +{{ stopProfitMoney }}
          </p>
        </div>
        <div class="popup-btn">
          <div class="btn large active" @click="save">
            {{ $t("futures.text16") }}
          </div>
        </div>
      </div>
    </yd-popup>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import busVue from "@/assets/js/bus";
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      showZs: false,
      cptData: null,
      PALOrderListData: [],
      //止损金额
      // 买涨： ( 成交价 - 止损价 )*持仓量
      // 买跌： ( 止损价  - 成交价)*持仓量
      stopLossMoney: 0, //止损金额
      //止盈金额
      // 买涨： (止盈价 - 成交价 )*持仓量
      // 买跌： ( 成交价 - 止盈价 )*持仓量
      stopProfitMoney: 0, //止盈金额
      stopLossPriceVal: 0, // 止损价
      stopProfitPriceVal: 0 // 止盈价
    };
  },
  watch: {
    showZs() {
      if (this.showZs) {
        this.stopLossPriceVal = this.cptData.stopLossPrice;
        this.stopProfitPriceVal = this.cptData.stopProfitPrice;
        this.$nextTick(() => {
          this.getLossMoney(0);
          this.getLossMoney(1);
        });
      } else {
        this.stopLossPriceVal = 0;
        this.stopProfitPriceVal = 0;
        this.stopLossMoney = 0;
        this.stopProfitMoney = 0;
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfo",
      tradingId: "trading/tradingId",
      positionList: "actual/position/positionList",
      orderList: "actual/order/orderList",
      lastPrice: "trading/lastPrice",
      perContractValue: "trading/perContractValue" // 合约面值
    })
  },
  mounted() {
    console.log(this.list);
  },
  methods: {
    ...mapActions({
      setpositionProSetting: "actual/position/riskPrice", //设置持仓止盈止损
      // setOrderProSetting: "actual/order/riskPrice", //设置委托止盈止损
      getContractOrderList: "actual/position/list", // 刷新持仓订单
      getEntrustOrderList: "actual/order/list" // 刷新委托订单
    }),
    ...mapMutations({
      updateStoplossPrice: "actual/position/updateStoplossPrice"
    }),
    //打开详情页
    jumpToDetail(item) {
      console.log("持仓", item);
      sessionStorage.setItem("orderDetail", JSON.stringify(item));
      this.$router.push({
        path: "/orderDetail",
        query: {
          type: 0
        }
      });
    },
    blurNumber(e, key) {
      let val = e.target.value;
      let type = 0;
      if (key == "stopLossPrice") {
        val = val == "" ? this.cptData.stopLossPrice : val;
        this.stopLossPriceVal = val;
        type = 0;
      } else {
        val = val == "" ? this.cptData.stopProfitPrice : val;
        this.stopProfitPriceVal = val;
        type = 1;
      }
      this.getLossMoney(type, val);
    },
    UpNumber(e, key) {
      let val = e.target.value;
      let type = 0;
      if (key == "stopLossPrice") {
        this.stopLossPriceVal = val;
        type = 0;
      } else {
        this.stopProfitPriceVal = val;
        type = 1;
      }
      this.getLossMoney(type, val);
      // console.log("止损价", this.stopLossPriceVal);
      // let val = String(e.target.value);
      // let n = this.cptData.pricePrecision;
      // if (n > 0) {
      //   let strReg = "(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{" + n + "}$)";
      //   let reg = new RegExp(strReg);
      //   console.log("33", reg, reg.test(val));
      //   if (val != "" && !reg.test(val)) {
      //     let m = val.split(".")[0];
      //     let n1 = val.split(".")[1];
      //     e.target.value = m + "." + n1.substr(0, n);
      //   } else {
      //     e.target.value = val;
      //   }
      // }
    },
    /**
     *   // 0止损 1止盈
     */
    getLossMoney(type, lossProPrice = 0) {
      // 获取止损金额
      //tradeType :'FUTURE' 合约，direct:'BUY' 买涨
      //stopLossPrice止损价 stopProfitPrice ：止盈价
      // price 成交价
      let {
        price,
        tradeType,
        direct,
        stopLossPrice,
        stopProfitPrice,
        volume,
        perContractValue
      } = this.cptData;
      if (lossProPrice > 0) {
        if (type == 0) {
          stopLossPrice = lossProPrice;
        } else {
          stopProfitPrice = lossProPrice;
        }
      }
      // if (!stopLossPrice) return;
      let money = 0;
      if (tradeType === "LEVER") {
        //杠杆
        if (direct === "BUY") {
          if (type == 0) {
            //止损金额
            money = (price - stopLossPrice) * volume;
          } else {
            //止盈金额
            money = (stopProfitPrice - price) * volume;
          }
        } else {
          if (type == 0) {
            //止损金额
            money = (stopLossPrice - price) * volume;
          } else {
            //止盈金额
            money = (price - stopProfitPrice) * volume;
          }
        }
      } else {
        // 合约
        if (direct === "BUY") {
          if (type == 0) {
            //止损金额
            money = (price - stopLossPrice) * volume * perContractValue;
          } else {
            //止盈金额
            money = (stopProfitPrice - price) * volume * perContractValue;
          }
        } else {
          if (type == 0) {
            //止损金额
            money = (stopLossPrice - price) * volume * perContractValue;
          } else {
            //止盈金额
            money = (price - stopProfitPrice) * volume * perContractValue;
          }
        }
      }
      let resultMoney = this.toFixed2(money);
      if (type == 0) {
        this.stopLossMoney = resultMoney;
      } else {
        this.stopProfitMoney = resultMoney;
      }
    },
    openPc(item) {
      // this.showPing = true;
      this.$emit("pingcang", item);
    },
    openZszy(item) {
      this.cptData = item;
      this.showZs = true;
      this.$emit("setAuto", item);
    },
    clickRadio(e, val) {
      this.radioType = val;
    },
    add(key) {
      this.getPrecision(key, true);
    },
    jian(key) {
      this.getPrecision(key, false);
    },
    //计算止损价止盈价
    getPrecision(key, isAdd = true) {
      let value =
        key == "stopLossPrice"
          ? this.stopLossPriceVal
          : this.stopProfitPriceVal;
      let resultVal = 0;
      let {
        price,
        direct,
        lossForcedPrice,
        profitForcedPrice,
        pricePrecision
      } = this.cptData;
      let val = Number(value);
      if (val != 0) {
        let str =
          pricePrecision != 0
            ? "0000000000000".substring(0, pricePrecision - 1)
            : "";
        let str2 = Number(str == "" ? 1 : "0." + str + "1");
        let max = 0;
        let min = 0;
        if (isAdd) {
          if (key == "stopLossPrice") {
            //止损
            //止损强平
            if (direct == "BUY") {
              //买涨
              //最大范围 开仓成交价- 最小精度
              max = +this.accSub(price, str2);
            } else {
              //买跌
              // 最大范围：stopLossPriceVal
              max = Number(lossForcedPrice);
            }
            if (val < max) {
              resultVal = this.toFixedStr(
                this.accAdd(val, str2),
                pricePrecision
              );
            } else {
              resultVal = val;
            }
          } else {
            //止盈
            if (direct == "BUY") {
              //买涨
              max = Number(profitForcedPrice);
            } else {
              //买跌
              // 最大范围：stopLossPriceVal
              max = +this.accSub(price, str2);
            }
            //止盈强平
            if (val < max) {
              resultVal = this.toFixedStr(
                this.accAdd(val, str2),
                pricePrecision
              );
            } else {
              resultVal = val;
            }
          }
        } else {
          //减
          if (key == "stopLossPrice") {
            //止损
            // 最小范围：开仓成交价 - 强平止损价
            if (direct == "BUY") {
              min = Number(lossForcedPrice);
            } else {
              min = this.accAdd(price, str2);
            }
            if (val > min) {
              resultVal = this.toFixedStr(
                this.accSub(val, str2),
                pricePrecision
              );
            } else {
              resultVal = val;
            }
          } else {
            //止盈
            // 最小范围：开仓成交价 - 强平止损价
            if (direct == "BUY") {
              min = this.accAdd(price, str2);
            } else {
              min = parseFloat(profitForcedPrice);
            }
            if (val > min) {
              resultVal = this.toFixedStr(
                this.accSub(val, str2),
                pricePrecision
              );
            } else {
              resultVal = val;
            }
          }
        }
        if (key == "stopLossPrice") {
          this.stopLossPriceVal = resultVal;
        } else {
          this.stopProfitPriceVal = resultVal;
        }
        //重新计算止损止盈金额
        this.getLossMoney(key == "stopLossPrice" ? 0 : 1, resultVal);
      }
    },
    isOk(key) {
      let {
        price,
        direct,
        lossForcedPrice,
        profitForcedPrice,
        pricePrecision
      } = this.cptData;
      let str =
        pricePrecision != 0
          ? "0000000000000".substring(0, pricePrecision - 1)
          : "";
      let str2 = parseFloat(str == "" ? 1 : "0." + str + "1");
      let _forcePrice = 0;
      let val = 0;
      if (key == "stopLossPrice") {
        _forcePrice = lossForcedPrice;
        val = this.stopLossPriceVal;
      } else {
        _forcePrice = profitForcedPrice;
        val = this.stopProfitPriceVal;
      }
      let min = 0;
      let max = 0;
      let _isOk = true;
      if (direct == "BUY") {
        if (key == "stopLossPrice") {
          min = +_forcePrice;
          max = +this.accSub(price, str2); //减法
        } else {
          min = +this.accAdd(price, str2); //加法
          max = _forcePrice;
        }
        if (val < min) {
          _isOk = false;
        } else if (val > max) {
          _isOk = false;
        } else {
          _isOk = true;
        }
      } else {
        if (key == "stopLossPrice") {
          min = +this.accAdd(price, str2);
          max = _forcePrice;
        } else {
          min = _forcePrice;
          max = +this.accSub(price, str2);
        }
        if (val < min) {
          _isOk = false;
        } else if (val > max) {
          _isOk = false;
        } else {
          _isOk = true;
        }
      }
      if (!_isOk) {
        let txt =
          key == "stopLossPrice"
            ? this.$t("futures.position.text44")
            : this.$t("futures.position.text45");
        // this.$vux.toast.text(`${txt}范围为：${min}-${max}`, "middle");
        busVue.$emit("alert", {
          title: this.$t("futures.position.text47"),
          content: `${txt}${this.$t(
            "futures.position.text46"
          )}${this.toFixedStr(min, pricePrecision)}-${this.toFixedStr(
            max,
            pricePrecision
          )}`
        });
        return false;
      }
      return _isOk;
    },
    save() {
      let _this = this;
      let { lossForcedPrice, profitForcedPrice, id } = this.cptData;
      if (!this.isOk("stopLossPrice") || !this.isOk("stopProfitPrice")) return;
      let params = {
        positionId: id,
        userId: this.userInfo.id,
        stopProfitPrice: this.stopProfitPriceVal, //止盈价
        stopLossPrice: this.stopLossPriceVal //止损价
      };
      this.setpositionProSetting(params)
        .then(res => {
          console.log("止损止盈设置的结果", res);
          this.showZs = false;
          this.getContractOrderList();
          _this.$vux.toast.text(
            this.$t("message.operation.message14"),
            "middle"
          );
        })
        .catch(e => {
          _this.$vux.toast.text(e, "middle");
        });
    }
  }
};
</script>
