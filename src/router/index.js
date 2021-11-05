const Vue = require("vue");
import Router from "vue-router";

import homeRouter from "../page/home/index";
import newsRouter from "../page/news/index";
import publicRouter from "@/page/public/index";

import i18n from "./../lang";

import { ConfirmPlugin } from "vux";

Vue.use(Router);
Vue.use(ConfirmPlugin);
Router.prototype.goBack = function() {
  this.isBack = true;
  window.history.go(-1);
};
//push
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};
//replace
const VueRouterReplace = Router.prototype.replace;
Router.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err);
};
// 获取public文件夹下的所有路由
const indexPage = [];
publicRouter.map(x => {
  let arr = x.children.map(item => ({
    path: "/" + x.path + "/" + item.path,
    meta: {
      login: item.meta && item.meta.login ? true : false
    },
    url: "@/page/public/views/" + x.path + "/views/" + item.path,
    name: item.name ? "" + item.name : "",
    component: (_ /* webpackChunkName: "public-view" */) =>
      import("@/page/public/views/" + x.path + "/views/" + item.path)
  }));
  indexPage.push(...arr);
}); // 整页转换的路由
// console.log('public文件夹下的路由', indexPage)
// const address = "@/page/public/views";

// let routerConfig = {
//     mode: 'history'
// }
// routerConfig = {} // 先不用

let env = process.env.NODE_ENV;
const router = new Router({
  mode: env === "production" || env === "uat" ? "history" : "",
  base: env === "uat" ? "/speed/" : "/",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      component: (_ /* webpackChunkName: "layout-home" */) =>
        import("@/components/layout/home"),
      redirect: "/home",
      children: homeRouter
    },
    {
      path: "/news",
      redirect: "/news",
      component: _ =>
        import(/* webpackChunkName: "news-home" */ "@/components/layout/home"),
      children: newsRouter
    },
    {
      path: "/rules",
      component: _ =>
        import(/* webpackChunkName: "news-home" */ "@/page/rules/views/index")
    },
    {
      path: "/newsDetail",
      component: (_ /* webpackChunkName: "page-new" */) =>
        import("@/page/news/views/celue/detail")
    },
    ...indexPage,
    {
      path: "/login",
      name: "login",
      component: _ =>
        import(/* webpackChunkName: "login" */ "@/page/login/login")
    },
    {
      path: "/forget",
      name: "forget",
      component: _ =>
        import(/* webpackChunkName: "login" */ "@/page/login/forget")
    },
    {
      path: "/register",
      name: "register",
      component: _ =>
        import(/* webpackChunkName: "login" */ "@/page/login/register"),
      meta: {
        login: false
      }
    },
    {
      path: "/fuwu",
      name: "fuwu",
      component: _ =>
        import(/* webpackChunkName: "login" */ "@/page/login/fuwu"),
      meta: {
        login: false
      }
    },
    {
      path: "/transactionsettings",
      name: "transactionsettings",
      component: _ =>
        import(/* webpackChunkName: "login" */ "@/page/public/views/setting/views/transactionsettings"),
      meta: {
        login: true
      }
    },
    {
      path: "/promt",
      name: "promt",
      component: _ =>
        import(/* webpackChunkName: "page-components" */ "@/components/promt"),
      meta: {
        login: false
      }
    },
    {
      path: "/payDetail",
      name: "payDetail",
      component: (_ /* webpackChunkName: "page-components" */) =>
        import("@/page/payDetail/views/index"),
      meta: {
        login: false
      }
    },
    {
      path: "/feedback",
      name: "feedback",
      component: (_ /* webpackChunkName: "page-components" */) =>
        import("@/components/feedback"),
      meta: {
        login: true
      }
    },

    {
      path: "/notice",
      component: (_ /* webpackChunkName: "page-notice" */) =>
        import("@/page/notice/views/index"),
      meta: {
        login: true
      },
      children: [
        {
          path: "/",
          redirect: "tongzhi"
        },
        {
          path: "tongzhi",
          name: "tongzhi",
          component: (_ /* webpackChunkName: "page-notice" */) =>
            import("@/page/notice/views/tongzhi"),
          meta: {
            login: true
          }
        },
        {
          path: "news",
          name: "news",
          component: (_ /* webpackChunkName: "page-notice" */) =>
            import("@/page/notice/views/news"),
          meta: {
            login: true
          }
        }
      ]
    },
    {
      path: "/activity",
      component: (_ /* webpackChunkName: "page-activity" */) =>
        import("@/page/activity/views/index"),
      meta: {
        login: false
      },
      children: [
        {
          path: "/",
          redirect: "invitation"
        },
        {
          path: "invitation",
          component: (_ /* webpackChunkName: "page-activity" */) =>
            import("@/page/activity/views/invitation"),
          meta: {
            login: true
          }
        },
        {
          path: "activityRules",
          component: (_ /* webpackChunkName: "page-activity" */) =>
            import("@/page/activity/views/activityRules"),
          meta: {
            login: true
          }
        }
      ]
    },
    {
      path: "/orderDetail",
      component: _ => import("@/page/home/views/futures/views/order-detail"),
      meta: {
        login: true
      }
    },
    {
      path: "/assetanalysis",
      component: _ => import("@/page/assetanalysis/views/index"),
      meta: {
        login: true,
        keepAlive: false
      }
    },
    {
      path: "/center",
      component: (_ /* webpackChunkName: "page-activity" */) =>
        import("@/page/activity/views/center"),
      meta: {
        login: true
      }
    },
    {
      path: "/centerMain",
      name: "活动中心",
      component: (_ /* webpackChunkName: "page-activity" */) =>
        import("@/page/activity/views/centerMain"),
      meta: {
        login: true
      }
    },
    {
      path: "/lottery",
      name: "抽奖活动",
      component: (_ /* webpackChunkName: "page-activity" */) =>
        import("@/page/activity/views/lottery"),
      meta: {
        login: false
      }
    },
    {
      path: "/lotteryMain",
      name: "抽奖活动",
      component: (_ /* webpackChunkName: "page-activity" */) =>
        import("@/page/activity/views/lotteryMain"),
      meta: {
        login: false
      }
    },
    {
      path: "/noticeCenter",
      component: (_ /* webpackChunkName: "page-activity" */) =>
        import("@/page/noticeCenter/views/index"),
      meta: {
        login: false
      }
    },
    {
      path: "/noviceAbout",
      component: (_ /* webpackChunkName: "page-activity" */) =>
        import("@/page/noviceAbout/views/index"),
      meta: {
        login: true
      },
      children: [
        {
          path: "/",
          redirect: "novice"
        },
        {
          path: "novice",
          component: (_ /* webpackChunkName: "page-activity" */) =>
            import("@/page/noviceAbout/views/novice"),
          meta: {
            login: true
          }
        },
        // {
        //   path: "about",
        //   component: (_ /* webpackChunkName: "page-activity" */) =>
        //     import("@/page/noviceAbout/views/about"),
        //   meta: {
        //     login: true
        //   }
        // }
      ]
    },
    {
      path: "/quickintroduction",
      meta: {
        title: "新手必看"
      },
      component: (_ /* webpackChunkName: "page-activity" */) =>
        import("@/page/noviceAbout/views/quickintroduction")
    },
    // {
    //   path: "/rujin",
    //   meta: {
    //     title: "出入金指南"
    //   },
    //   component: (_ /* webpackChunkName: "page-activity" */) =>
    //     import("@/page/noviceAbout/views/rujin")
    // },
    // {
    //   path: "/mustsee",
    //   meta: {
    //     title: "新手必看"
    //   },
    //   component: (_ /* webpackChunkName: "page-activity" */) =>
    //     import("@/page/noviceAbout/views/mustsee")
    // },
    // {
    //   path: "/jiaoyi",
    //   meta: {
    //     title: "交易指导"
    //   },
    //   component: (_ /* webpackChunkName: "page-activity" */) =>
    //     import("@/page/noviceAbout/views/jiaoyi")
    // },
    // {
    //   path: "/qubie",
    //   meta: {
    //     title: "杠杆交易和合约交易的区别"
    //   },
    //   component: (_ /* webpackChunkName: "page-activity" */) =>
    //     import("@/page/noviceAbout/views/qubie")
    // },
    {
      path: "/dismantling",
      name: "dismantling",
      component: (_ /* webpackChunkName: "page-activity" */) =>
        import("@/page/updismantling/views/index"),
      meta: {
        login: true
      }
    },
    {
      path: "/record",
      // name: "notice",
      component: (_ /* webpackChunkName: "page-record" */) =>
        import("@/page/record/views/index"),
      meta: {
        login: true
      },
      children: [
        {
          path: "/",
          redirect: "fund"
        },
        {
          path: "fund",
          component: (_ /* webpackChunkName: "page-record" */) =>
            import("@/page/record/views/fund"),
          meta: {
            login: true
          },
          children: [
            {
              path: "fundbill",
              component: (_ /* webpackChunkName: "page-record" */) =>
                import("@/page/record/views/fundbill")
            }
          ]
        }
      ]
    },
    {
      path: "/recrecord",
      component: (_ /* webpackChunkName: "page-record" */) =>
        import("@/page/record/views/recrecord"),
      meta: {
        login: true
      },
      children: [
        {
          path: "recrecordbill",
          component: (_ /* webpackChunkName: "page-record" */) =>
            import("@/page/record/views/recrecordbill")
        }
      ]
    },
    {
      path: "/putrecord",
      component: (_ /* webpackChunkName: "page-record" */) =>
        import("@/page/record/views/putrecord"),
      meta: {
        login: true
      },
      children: [
        {
          path: "putrecordbill",
          component: (_ /* webpackChunkName: "page-record" */) =>
            import("@/page/record/views/putrecordbill")
        }
      ]
    },
    {
      path: "/sellDetail",
      component: (_ /* webpackChunkName: "page-list" */) =>
        import("@/page/sellDetail/views/index"),
      meta: {
        login: false
      }
    },
    {
      path: "/ercode",
      component: _ =>
        import(/* webpackChunkName: "ercode" */ "@/page/usdt/views/ercode"),
      meta: {
        login: true
      }
    },
    {
      path: "/payPage",
      component: _ =>
        import(/* webpackChunkName: "usdt" */ "@/page/usdt/views/payPage"),
      meta: {
        login: true
      }
    },
    {
      path: "/usdt",
      component: _ =>
        import(/* webpackChunkName: "usdt" */ "@/page/usdt/views/index"),
      meta: {
        login: true
      },
      children: [
        {
          path: "/",
          redirect: "/fast"
        },
        {
          path: "/fast",
          component: _ =>
            import(/* webpackChunkName: "usdt" */ "@/page/usdt/views/fast"),
          meta: {
            login: true
          }
        },
        {
          path: "/otc",
          component: _ =>
            import(/* webpackChunkName: "usdt" */ "@/page/usdt/views/otc"),
          redirect: "/purchase",
          children: [
            {
              path: "/purchase",
              component: (_ /* webpackChunkName: "usdt" */) =>
                import("@/page/usdt/views/purchase"),
              meta: {
                login: true
              }
            },
            {
              path: "/sell",
              component: _ =>
                import(/* webpackChunkName: "usdt" */ "@/page/usdt/views/sell"),
              meta: {
                login: true
              }
            }
          ],
          meta: {
            login: true
          }
        }
      ]
    },
    {
      path: "/usdtList",
      component: _ =>
        import(/* webpackChunkName: "usdt" */ "@/page/usdtList/views/index"),
      meta: {
        login: true
      },
      children: [
        {
          path: "/",
          redirect: "purchase"
        },
        {
          path: "purchase",
          component: (_ /* webpackChunkName: "usdt" */) =>
            import("@/page/usdtList/views/purchase"),
          meta: {
            login: true
          }
        },
        {
          path: "sell",
          component: _ =>
            import(/* webpackChunkName: "usdt" */ "@/page/usdtList/views/sell"),
          meta: {
            login: true
          }
        },
        {
          path: "purchaseDetail",
          component: (_ /* webpackChunkName: "usdt" */) =>
            import("@/page/usdtList/views/purchaseDetail"),
          meta: {
            login: true
          }
        }
      ]
    },
    {
      path: "/drawmoney/index",
      name: "USDT购买",
      component: (_ /* webpackChunkName: "drawmoney" */) =>
        import("@/page/drawmoney/views/index")
    },
    {
      path: "/withdral",
      name: "充币",
      component: (_ /* webpackChunkName: "drawmoney" */) =>
        import("@/page/drawmoney/views/withdral")
    },
    {
      path: "/drawmoney/detail",
      name: "提币地址成交详情",
      component: (_ /* webpackChunkName: "drawmoney" */) =>
        import("@/page/drawmoney/views/detail")
    },

    {
      path: "/drawmoney/sell",
      name: "USDT出售",
      component: (_ /* webpackChunkName: "drawmoney" */) =>
        import("@/page/drawmoney/views/sell")
    },
    {
      path: "/drawmoney/reversal",
      name: "chongbi",
      component: (_ /* webpackChunkName: "drawmoney" */) =>
        import("@/page/drawmoney/views/reversal")
    },
    {
      path: "/drawmoney/withdrawal",
      name: "tibi",
      component: (_ /* webpackChunkName: "drawmoney" */) =>
        import("@/page/drawmoney/views/withdrawal")
    },
    {
      path: "/drawmoney/usdtAddress",
      name: "usdt地址",
      component: (_ /* webpackChunkName: "drawmoney" */) =>
        import("@/page/drawmoney/views/usdt-address")
    },
    {
      path: "/drawmoney/usdtAdd",
      name: "添加usdt地址",
      component: (_ /* webpackChunkName: "drawmoney" */) =>
        import("@/page/drawmoney/views/usdt-add")
    },
    {
      path: "/instructions",
      name: "充值须知",
      component: _ =>
        import(/* webpackChunkName: "drawmoney" */ "@/page/instructions")
    },
    {
      path: "/coupons",
      name: "红包卡券",
      component: _ =>
        import(/* webpackChunkName: "drawmoney" */ "@/page/coupons")
    },
    {
      path: "/income",
      name: "我的收益",
      component: _ =>
        import(/* webpackChunkName: "drawmoney" */ "@/page/coupons/income")
    },
    {
      path: "/couponsactivity",
      name: "红包活动",
      component: _ =>
        import(/* webpackChunkName: "drawmoney" */ "@/page/coupons/couponsActivity")
    },
    // {
    //   path: "/activityRule",
    //   name: "活动规则",
    //   component: _ =>
    //     import(/* webpackChunkName: "drawmoney" */ "@/page/coupons/activityRule")
    // },
    {
      path: "/rechargeActivity",
      name: "充值活动",
      component: _ =>
        import(/* webpackChunkName: "drawmoney" */ "@/page/coupons/rechargeActivity")
    },
    {
      path: "*",
      component: {
        template: "<h1>404 Not Found</h1>"
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  // 没有token时候,无法跳转其他页面.
  const Token = localStorage.getItem("token");
  const Disk = localStorage.getItem("t_diskinfo") || "actual";
  // alert(!Token)
  // '/fund',
  const arr = [
    "/feedback",
    "/position",
    "/setting/firstpaypass",
    "/setting/bank-card",
    "/tixian",
    "/my",
    "/recharge",
    "/notice/tongzhi",
    "/fund",
    "/record/fund",
    "/recrecord",
    "/putrecord",
    "/entrust",
    "/position",
    "/settlement",
    "/buy/buy-detail",
    "/limitset",
    "/limitconstrain",
    "/usdt/purchase",
    "/usdt/sell",
    "/usdt",
    "/fast",
    "/coupons",
    "/income",
    // '/stock/stock-line',
    "/setting/primary-certification",
    "/setting/advanced-certification",
    "/setting/realname-center",
    "/activity/invitation"
  ];
  const diskdispose = [
    "/setting/advanced-certification",
    "/setting/primary-certification",
    "/setting/realname-center",
    "/notice/tongzhi",
    "/setting",
    "/transactionsettings",
    "/usdt/purchase",
    "/usdt",
    "/tixian",
    "/recharge",
    "/setting/bank-card",
    "/drawmoney/withdrawal",
    "/drawmoney/reversal",
    "/drawmoney/sell",
    "/instructions",
    "/drawmoney/index",
    "/lottery",
    "/center"
  ];
  console.log(to.path, to.query);

  if (arr.indexOf(to.path) > -1 && !Token) {
    Vue.$vux.confirm.show({
      title: i18n.t("message.login.title"),
      content: i18n.t("message.login.message2"),
      confirmText: i18n.t("setText.login"),
      cancelText: i18n.t("personalCenter.text16"),
      onCancel() {
        console.log("plugin cancel");
      },
      onConfirm() {
        next("/login");
      }
    });
  } else if (diskdispose.indexOf(to.path) > -1 && Disk == "simulate") {
    Vue.$vux.toast.text(i18n.t("common.text12"), "middle");
  } else if ("/drawmoney/sell" == to.path && !to.query.realAuth) {
    Vue.$vux.confirm.show({
      title: i18n.t("setText.title"),
      content: i18n.t("common.noreal"),
      confirmText: i18n.t("common.goreal"),
      cancelText: i18n.t("common.text3"),
      onCancel() {
        console.log("plugin cancel");
      },
      onConfirm() {
        next("/setting/primary-certification");
      }
    });
  } else {
    next();
  }
});
export default router;
