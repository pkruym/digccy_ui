import index from "./views/index";
export default [
  {
    path: "/history",
    component: _ => import("./views/history"),
    meta: {
      login: true
    }
  },
  {
    path: "/futures",
    component: index,
    redirect: "/position",
    children: [
      // {
      //       path: "/",
      //       redirect: "position"
      //   },
      {
        path: "/entrust",
        component: _ => import("./views/entrust"),
        meta: {
          login: true
        }
      },
      {
        path: "/position",
        component: _ => import("./views/position"),

        meta: {
          login: true
        }
      },
      {
        path: "/cancel",
        component: _ => import("./views/cancel"),
        meta: {
          login: true
        }
      },

      {
        path: "/settlement",
        component: _ => import("./views/settlement"),
        meta: {
          login: true
        }
      }
    ]
  }
];
