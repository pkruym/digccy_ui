<template>
  <model-full title="常见问题" class="model">
    <group title="开户类问题">
      <div v-for="(item, index) in accountList" :key="index">
        <cell
          :title="item.title"
          is-link
          :border-intent="false"
          :arrow-direction="accountIndex === index ? 'up' : 'down'"
          @click.native="accountClick(index)"
        ></cell>

        <p class="slide" :class="accountIndex === index ? 'animate' : ''">
          {{ item.answer }}
        </p>
      </div>
    </group>
    <group title="出入金类问题">
      <div v-for="(item, index) in goldList" :key="index">
        <cell
          :title="item.title"
          is-link
          :border-intent="false"
          :arrow-direction="goldIndex === index ? 'up' : 'down'"
          @click.native="goldClick(index)"
        ></cell>

        <p class="slide" :class="goldIndex === index ? 'animate' : ''">
          {{ item.answer }}
        </p>
      </div>
    </group>
    <group title="交易类问题">
      <div v-for="(item, index) in transactionList" :key="index">
        <cell
          :title="item.title"
          is-link
          :border-intent="false"
          :arrow-direction="transactionIndex === index ? 'up' : 'down'"
          @click.native="transactionClick(index)"
        ></cell>

        <p class="slide" :class="transactionIndex === index ? 'animate' : ''">
          {{ item.answer }}
        </p>
      </div>
    </group>
    <group title="安全登录类问题">
      <div v-for="(item, index) in loginList" :key="index">
        <cell
          :title="item.title"
          is-link
          :border-intent="false"
          :arrow-direction="loginIndex === index ? 'up' : 'down'"
          @click.native="loginClick(index)"
        ></cell>

        <p class="slide" :class="loginIndex === index ? 'animate' : ''">
          {{ item.answer }}
        </p>
      </div>
    </group>
  </model-full>
</template>
<script>
import { Cell, Group } from "vux";

import ModelFull from "element/model-full";
export default {
  components: {
    ModelFull,
    Cell,
    Group
  },
  data() {
    return {
      accountIndex: -1,
      goldIndex: -1,
      transactionIndex: -1,
      loginIndex: -1,

      accountList: [
        {
          title: "能开设多个交易账户吗？",
          answer:
            "为保证客户资金及交易安全，每个账户全部需要实名认证，一个身份证仅且只能开一个交易账户。"
        },
        {
          title: "开户是否需要实名？",
          answer:
            "实名认证是保护账户安全的必要措施，在您使用银联充值的时候需要完成实名认证。"
        },
        {
          title: "在交易平台这里实名了，个人信息会泄露吗？",
          answer:
            "平台对用户的信息严格保密，采用了最高安全等级的数据保存方式，杜绝任何形式的用户信息泄露。"
        },
        {
          title: "平台开户需要满足什么条件？",
          answer:
            "实名认证是保护账户安全的必要措施，在您使用银联充值的时候需要完成实名认证。"
        },
        {
          title: "忘记交易平台的登录密码怎么办？",
          answer:
            "忘记密码可通过手机+短信验证码的方式找回，您还可以联系客服协助找回密码。"
        },
        {
          title: "平台的交易软件是平台自己的吗？有没有操作教程？",
          answer:
            "交易软件由平台专业的技术人员开发，实盘对接国际、国内交易所，我们提供软件使用手册及其他相关使用说明。"
        },
        {
          title: "交易平台的交易工具（APP、PC）重装指导？",
          answer:
            "交易平台每次做出更新，都会通过平台提示使用者更新，并且平台官网有详细的更新及安装操作说明。"
        }
      ],
      goldList: [
        {
          title: "平台交易账户如何充值？",
          answer:
            "平台提供多种充值方式，具体包含个人银联转账、支付宝扫码及线下充值入金，线上入金方式到账及时，方便快捷，线下入金安全迅速。交易平台有具体的充值入口，请您根据需要选择对应的入金方式，按照提示说明操作。"
        },
        {
          title: "平台交易账户入金有最低限额吗？",
          answer:
            "由于交易涉及货币兑换及其他一些因素，所以对每次入金的额度有一定限制，一般100元人民币及以上数额。"
        },
        {
          title: "为什么使用银联转账会提示充值带有小数的金额？",
          answer:
            "使用个人银联转账入金时，由于需要及时匹配入账及货币兑换，因此在使用银联转账入金时系统会随机匹配收款信息及收款金额。入金时多出的充值金额也会一并进入客户的交易账户。"
        },
        {
          title: "为什么收款的是个人银行卡或者支付宝账号？",
          answer:
            "交易平台为了保证客户资金账户安全及资金到账及时性，全部采用个人收款卡或者支付宝账户，并且充值资金需要进行货币兑换，为了避免汇率波动及其他因素影响，充值入金统使用一个人账户收款。"
        },
        {
          title: "平台充值时间有限制吗？",
          answer:
            "平台用户充值入金时间不受限制，线上入金方式7*24小时开放，如有特殊情况，平台会通过公告发出，请多留意平台公告信息。"
        },
        {
          title: "充值、提现收手续费吗？",
          answer:
            "平台用户在进行正常操作出入金时，是没有手续费的。但是对于反复充值提现不进行交易的，设计利用平台进行洗钱的账户，会进行相应的风控处理。"
        },
        {
          title: "平台什么时间可以提现，多久能够到账？",
          answer:
            "交易平台规定固定的提现时间，一般是周一至周五上午10点到下午5点，节假日另行通知。交易账户自发起提现时刻起，半小时内到账。"
        },
        {
          title: "交易账户充值未到账怎么办？",
          answer:
            "平台交易账户自发起充值时刻起，入充值入金未到账，可通过我们的在线客服及时与我们联系，提供对应的转账凭证，在平台核对之后，资金会及时到达对应的平台交易账户。"
        },
        {
          title: "我们的资金安全怎么保证？",
          answer:
            "为保证投资者资金账户安全，平台所有资金全部托管于第三方银行机构，安全无忧。"
        },
        {
          title: "平台交易账户出金有限额吗？",
          answer:
            "当日出金无限额，单笔有限额。具体出金限额可能会根据第三方资金存管银行政策调整有关。"
        }
      ],
      transactionList: [
        {
          title: "什么是止损止盈？",
          answer:
            "为了降低用户投资风险，系统在您下单时会自带一个止损价和止盈价，您也可以在持仓列表自行修改止损价和止盈价。当您持仓订单最新价到达您设置的止损价后，触发系统止损平仓。当您持仓订单的最新价到达您设置的止盈价后，触发系统止盈平仓。"
        },
        {
          title: "为什么做单没有按照止盈止损价格成交？",
          answer:
            "止盈止损不保证成交。正常市场交易中，止盈止损单的重要性，无需赘述。但是我们要知道止盈止损价仅仅是触发价格，也就是说，这个价格仅仅是系统确认是否发出委托的依据价格，委托时系统会按照交易者设置的止盈止损价下单，也就是说会以当时市场的对手价发出委托，而最终成交的价格则是由交易所撮合交易的结果，所以止盈止损价不保证成交，也不保证最终的成交价格就是投资者设置的止盈止损价。"
        },
        {
          title: "为什么不能用自动化程序交易？",
          answer:
            "程序化交易，只不过是把投资者总结出来的适合自己的相对高赢利率的操作策略、方法，用数学的形式表达出来，并让电脑替你果断执行而已。所以，如果投资者没有一个明确的操作思路，没有实际去总结各个品种的盘性特点的话，用别人给你的程序去交易的话，应该只会在某一段行情中实现赢利，而在其他时间内大亏，最终结果几乎可以确定是以亏损结局的。所以没有任何程序是适合所有品种及所有行情的！"
        },
        {
          title: "为什么锁仓了还会爆仓？",
          answer:
            "锁仓不代表持仓一定不会被强平，例如一下三种情况。1：账户资金临近爆仓，锁仓手续费产生后立即导致账户余额不足会发生锁仓强平情形，只要不在临近爆仓点位锁仓就不会发生；2：合约到期更换合约或者隔夜，仍会发生强平，请注意合约交易时间；3：极端行情下，买卖差距较大，因为锁仓的原理是持有反向的单子，此时反向的单子市场价值不匹配，有可能导致不能完全对冲，导致爆仓。"
        },
        {
          title: "你们交易平台有哪些交易合约，外盘还是内盘？",
          answer:
            "目前交易平台包含主流交易品种，设计内盘、外盘、数字币等多个交易品种。"
        },
        {
          title: "平台的杠杆倍数是多少？",
          answer:
            "平台不同的交易品种价值不同，对应的杠杆倍数也不同，以期货美原油合约为例，假如保证金2500元人民币，则杠杆倍数大约为20倍。"
        },
        {
          title: "平台交易为什么会有点差？",
          answer:
            "点差就是买价跟卖价的差，也是你付给平台的手续费，在交易软件上都会显示一个买价一个卖价的，不管是什么样的投资都是要手续费的，点差其实也就是手续费的一种。这个是有现货的交易机制决定的。 那么为什么会存在点差呢？ 现货交易有2个价格，一个买价，一个卖价。点差指的是买价和卖价之间的固定差价， 即买价 - 卖价 = 点差。 点差是投资者的交易成本， 在建仓的一刻， 系统便收取了点差费用。 点差费用只在建仓时单向收取， 平仓时无需收取点差费用。 现货有一个做空的机制， 即买多挣钱， 买跌一样挣钱， 而股票呢， 没有做空， 只能买涨， 如果白银只能买涨， 那么就不存在点差这一个说法了， 交易所不能平白无故给你一个平台让你挣钱吧， 如果没有点差那么交易所不亏死了， 你当时买进， 立刻就能卖出。而点差的存在， 就是为了群众利用这个漏洞刷手术， 也是交易所一个防控措施， 还有这个点差日积月累， 如滚雪球一样越来越多， 那么当市场出现危机的时候， 它的存在也解决了这一危机。 所以有点差的存在。 即买进和卖出的一个差价， 理所应当的存在了。"
        },
        {
          title: "平台交易卖出价或者买入价和委托价不一致，是不是存在点差？",
          answer:
            "在正常市场交易中，当平台交易者发出买入或者卖出指令后，系统即发出交易者对应指令的委托单，由于交易时凑合成交的，最终成交价格都是市价成交，所以最终的成交价格不一定是指令发出时的价格。以美原油合约为例，当以52.41元发出指定价平仓指令时，此时交易所即挂出52.41的卖出单，但是成交机制是凑合机制，最终成交的价格则是以买入方的最优价格成交，可能是52.41，也可能是52.42等其他价格。"
        },
        {
          title: "止盈止损的设置什么标准？",
          answer:
            "止盈止损是平台交易者在持仓前、持仓后对要交易的交易品种设置止盈止损价位。期货品种交易因具备杠杆效应，交易规则的初衷是为了提供更好的资金利用率，但目前国内期货市场上大部分资金都是投机资金，所以就必须要有止盈止损的设定，以保证每一笔交易都具备止盈止损离场的操作。"
        },
        {
          title: "你们平台用实盘做单，有没有看盘软件，和实盘价格是一样的吗？",
          answer:
            "交易平台提供手机APP、电脑PC及WEB三种形式的看盘软件，行情直接对接交易所，精准实时无误。"
        },
        {
          title: "平台有没有模拟账号，模拟账号和实盘行情是一样的吗？",
          answer:
            "平台提供模拟账号给用户模拟操盘使用，模拟账号功能和实盘账号完全一样，可以进行开仓、平仓等操作，但是模拟账号不允许进行资金的出入金操作。"
        },
        {
          title: "保证金是什么？",
          answer:
            "在期货市场上，交易者只需按期货合约价格的一定比率交纳少量资金作为履行期货合约的财力担保，便可参与期货合约的买卖，这种资金就是期货保证金。"
        }
      ],
      loginList: [
        {
          title: "为什么客户端登录不上去等其他问题？",
          answer:
            "期货交易对数据及时性要求很高，自然对使用的网络条件要求比较高，如出现提示网络问题，属于正常现象，请在网络条件较好的情况下使用，如出现任何问题，可及时与我们的工作人员联系。"
        },
        {
          title: "软件安装后，为什么界面信息显示不全？",
          answer:
            "软件安装之后，首次使用，系统需要初始化合约信息，如果网络情况较好，软件界面显示信息是全面完整的，出现信息显示不全的情况，可能是网络异常引起，使用者可检查网络情况或者刷新交易平台应用界面。"
        },
        {
          title: "使用交易平台出现无网络提示怎么办？",
          answer:
            "如平台交易者在使用过程中碰到提示网络提示，请安选择下面方式处理，1：退出软件（杀死程序），重新启动程序；2：退出软件，将手机设置成飞行模式一分钟后，重新设置成正常模式，即重置手机网络访问；3:重新启动手机；4：如以上方式不行，请换个网络环境好点的地方再继续使用软件。"
        }
      ]
    };
  },

  methods: {
    accountClick(index) {
      if (this.accountIndex === index) {
        this.accountIndex = -1;
        return;
      }
      this.accountIndex = index;
    },
    goldClick(index) {
      if (this.goldIndex === index) {
        this.goldIndex = -1;
        return;
      }
      this.goldIndex = index;
    },
    transactionClick(index) {
      if (this.transactionIndex === index) {
        this.transactionIndex = -1;
        return;
      }
      this.transactionIndex = index;
    },
    loginClick(index) {
      if (this.loginIndex === index) {
        this.loginIndex = -1;
        return;
      }
      this.loginIndex = index;
    }
  }
};
</script>
<style lang="less" scoped>
.model {
  height: 100%;
  .sub-item {
    color: #888;
  }
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
}
</style>
