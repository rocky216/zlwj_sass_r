import lazy from "@public/utils/lazy"

export default [
  {
    name: "充电订单",
    path: "/income/charorder",
    level: 2,
    exact: true,
    component: lazy({loader: import("@power/views/change/income/charorder")}),
  },
  {
    name: "会员劵订单",
    path: "/income/memcerorder",
    level: 2,
    exact: true,
    component: lazy({loader: import("@power/views/change/income/memcerorder")}),
  },
  {
    name: "充电卡充值订单",
    path: "/income/cardorder",
    exact: true,
    component: lazy({loader: import("@power/views/change/income/cardorder")}),
  },
]