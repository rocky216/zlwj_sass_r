import lazy from "@public/utils/lazy"

export default [
  {
    name: "充电卡详情",
    path: "/card/:cardNo/detail",
    exact: false,
    component: lazy({loader: import("@power/views/card/detail")}),
  },
]