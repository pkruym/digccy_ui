import index from "./views/index";
export default [
  {
    path: "/home",
    component: index,
    meta: {
      keepAlive: true
    }
  }
];
