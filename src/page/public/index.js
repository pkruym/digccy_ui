export default [
  {
    path: "my",
    meta: {
      login: true
    },
    children: [
      {
        path: "",
        meta: {
          login: true
        }
      }
    ]
  },
  {
    path: "service",
    meta: {
      login: false
    },
    children: [
      {
        path: "",
        meta: {
          login: false
        }
      }
    ]
  },

  {
    path: "noticedetail",
    meta: {
      login: false
    },
    children: [
      {
        path: "",
        meta: {
          login: false
        }
      }
    ]
  },
  {
    path: "areacode",
    meta: {
      login: false
    },
    children: [
      {
        path: ""
      }
    ]
  },
  {
    path: "setting",
    meta: {
      login: true
    },
    children: [
      {
        path: "",
        meta: {
          login: true
        }
      },
      {
        path: "about-us"
      },
      {
        path: "primary-certification"
      },
      {
        path: "advanced-certification"
      },
      {
        path: "realname-center"
      },
      {
        path: "bank-card"
      },
      {
        path: "language"
      },
      {
        path: "change-pass"
      },
      {
        path: "add-card"
      },
      {
        path: "change-paypass"
      },
      {
        path: "firstpaypass"
      },
      {
        path: "bankinfo"
      }
    ]
  },
  {
    path: "detail",
    meta: {
      login: true
    },
    children: [
      {
        path: "detail",
        name: "detail"
      }
    ]
  },
 
  {
    path: "novice",
    meta: {
      login: false
    },
    children: [
      {
        path: ""
      },
      {
        path: "mustsee",
        name: "mustsee"
      },
      {
        path: "rujin",
        name: "rujin"
      },
      {
        path: "jiaoyi",
        name: "jiaoyi"
      },
      {
        path: "question",
        name: "question"
      }
    ]
  },
  {
    path: "platformbulletin",
    meta: {
      login: false
    },
    children: [
      {
        path: ""
      },
      {
        path: "announcementdetail",
        name: "announcementdetail"
      }
    ]
  },
  {
    path: "hangqing",
    meta: {
      login: false
    },
    children: [
      {
        path: ""
      }
    ]
  },
  {
    path: "stock",
    meta: {
      login: false
    },
    children: [
      {
        path: "stock-line",
        name: "stock-line"
      }
    ]
  },
  {
    path: "buy",
    meta: {
      login: true
    },
    children: [
      // {
      //   path: "buy-detail",
      //   name: "buy-detail"
      // },
      {
        path: "buy-upfull",
        name: "buy-upfull"
      }
    ]
  },
  {
    path: "position",
    meta: {
      login: true
    },
    children: [
      {
        path: "",
        meta: {
          login: true
        }
      }
    ]
  },
  {
    path: "search",
    children: [
      {
        path: ""
      }
    ]
  },
  {
    path: "rules",
    children: [
      {
        path: "qiangping"
      },
      {
        path: "zhiying"
      }
    ]
  }
  // 有特殊性，写在了主文件内
  // {
  //   path: 'zhishu',
  //   children: [
  //     {
  //       path: ''
  //     }
  //   ]
  // }
];
