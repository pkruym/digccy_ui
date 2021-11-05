<template>
  <div class="tabberWarp">
    <div
      class="itemWarp flex_mid"
      v-for="(item, index) in $lang == 'en' ? tabbarDesen : tabbarDes"
      :key="item.path"
      @click="getVal(item, index)"
    >
      <img
        :src="
          $route.path.indexOf(item.page) != -1 ||
          (item.paths && item.paths.indexOf($route.path) != -1)
            ? item.activeImg
            : item.normalImg
        "
        alt=""
      />
      <p
        :class="[
          'font',
          {
            color:
              $route.path.indexOf(item.page) != -1 ||
              (item.paths && item.paths.indexOf($route.path) != -1)
          }
        ]"
      >
        {{ item.txt }}
      </p>
    </div>
  </div>
</template>
<script>
import IndexN from "@img/2_6/tab_home_nor.svg";
import IndexS from "@img/2_6/tab_home_sell.svg";
import QuoTationN from "@img/2_6/tab_quotes_nor.svg";
import QuoTationS from "@img/2_6/tab_quotes_sell.svg";
import StockN from "@img/2_6/tab_jiaoyi_nor.svg";
import StockS from "@img/2_6/tab_jiaoyi_sell.svg";
import NewsN from "@img/2_6/tab_new_nor.svg";
import NewsS from "@img/2_6/tab_new_sell.svg";
import OwserN from "@img/2_6/tab_me_nor.svg";
import OwserS from "@img/2_6/tab_me_sell.svg";
import LiveN from "@/assets/img/2_0/ico-tab-zb-nor@2x.png";
import LiveS from "@/assets/img/2_0/ico-tab-zb-sel@2x.png";

// import OptionsN from "@/assets/img/zixuan-nor.png";
// import OptionsS from "@/assets/img/zixuan-sel.png";
// import OwserN from "@/assets/img/wode-nor.png";
// import OwserS from "@/assets/img/wode-sel.png";

export default {
  data() {
    return {
      IndexN,
      IndexS,
      QuoTationN,
      QuoTationS,
      StockN,
      StockS,
      // FuturesN,
      // FuturesS,
      NewsN,
      NewsS,
      LiveN,
      LiveS,
      // OptionsN,
      // OptionsS,
      OwserN,
      OwserS,
      flag: false,
      selectedindex: 0,

      selected: "/home",
      tabbarDes: [
        {
          txt: this.$t("nav.index"),
          page: "/home",
          normalImg: require("@img/2_6/tab_home_nor@2x.png"),
          activeImg: require("@img/2_6/tab_home_sel@2x.png")
        },
        {
          txt: this.$t("nav.quotation"),
          page: "/quotation",
          normalImg: require("@img/2_6/tab_quotes_nor@2x.png"),
          activeImg: require("@img/2_6/tab_quotes_sel@2x.png")
        },
        {
          txt: this.$t("nav.stock"),
          page: "/futures",
          paths: "/position,/entrust,/cancel,/settlement,/history",
          normalImg: require("@img/2_6/tab_jiaoyi_nor@2x.png"),
          activeImg: require("@img/2_6/tab_jiaoyi_sel@2x.png")
        },
        {
          txt: this.$t("nav.news"),
          page: "/news",
          paths: "/celue",
          normalImg: require("@img/2_6/tab_new_nor@2x.png"),
          activeImg: require("@img/2_6/tab_new_sel@2x.png")
        },
        {
          txt: this.$t("nav.my"),
          page: "/ower",
          normalImg: require("@img/2_6/tab_me_nor@2x.png"),
          activeImg: require("@img/2_6/tab_me_sel@2x.png")
        }
      ],
      tabbarDesen: [
        {
          txt: this.$t("nav.index"),
          page: "/home",
          normalImg: require("@img/2_6/tab_home_nor@2x.png"),
          activeImg: require("@img/2_6/tab_home_sel@2x.png")
        },
        {
          txt: this.$t("nav.quotation"),
          page: "/quotation",
          normalImg: require("@img/2_6/tab_quotes_nor@2x.png"),
          activeImg: require("@img/2_6/tab_quotes_sel@2x.png")
        },
        {
          txt: this.$t("nav.stock"),
          page: "/futures",
          paths: "/position,/entrust,/cancel,/settlement,/history",
          normalImg: require("@img/2_6/tab_jiaoyi_nor@2x.png"),
          activeImg: require("@img/2_6/tab_jiaoyi_sel@2x.png")
        },
        {
          txt: this.$t("nav.my"),
          page: "/ower",
          normalImg: require("@img/2_6/tab_me_nor@2x.png"),
          activeImg: require("@img/2_6/tab_me_sel@2x.png")
        }
      ]
    };
  },
  created() {
    // window.onresize = function() {
    // // alert(1)
    // var windheight = window.innerHeight;
    //   // var docheight = window.innerHeight;
    //   // if (docheight < windheight) {
    //   //   document.getElementById("nav").style.position = "static";
    //   //   // alert(1)
    //   // } else {
    //   //   document.getElementById("nav").style.position = "fixed";
    //   //   // alert(2)
    //   // }
    //   // alert(docheight < windheight)
    //   // alert(document.getElementById("nav").style.position);
    // };
  },
  methods: {
    getVal(res, index) {
      this.selected = res.page;
      this.selectedindex = index;
      this.$router.push({
        path: res.page
      });
    }
  }
};
</script>
<style lang="less" scoped>
// .bottom-line {
//   background: #1d2331;
//   width: 100%;
//   line-height: 0.46rem;
//   height: 0.46rem;
//   text-align: center;
//   font-size: 0.2rem;
//   color: #88929e;
// }
// nav {
//   position: absolute;
//   width: 100%;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   // top:vh;
//   background: #171e29;
//   .nav {
//     padding: 0.14rem 0 0.08rem;
//     justify-content: space-around;
//     .nav-item {
//       text-align: center;
//       width: 1rem;
//       img {
//         height: 0.44rem;
//         width: 0.44rem;
//         display: block;
//         margin: 0 auto;
//       }
//       img:nth-child(2) {
//         display: none;
//       }
//     }
//     .router-link-active p {
//       color: rgb(3, 173, 143);
//     }
//     .router-link-active img:nth-child(2) {
//       display: block;
//     }
//     .router-link-active img:nth-child(1) {
//       display: none;
//     }
//   }
// }
// p {
//   font-size: 0.2rem;
//   color: rgb(70, 98, 102);
// }
// .celueimg {
//   img:nth-child(2) {
//     display: block !important;
//   }
//   img:nth-child(1) {
//     display: none !important;
//   }
//   p {
//     color: @pink2Standard;
//   }
// }
</style>
