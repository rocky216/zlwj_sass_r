import lazy from "@public/utils/lazy"

export default [
  {
    name: "劵列表",
    path: "/active/coupon",
    exact: true,
    component: lazy({loader: import("@power/views/active/coupon")}),
  },
  {
    name: "会员劵活动",
    path: "/active/memcer",
    exact: true,
    component: lazy({loader: import("@power/views/active/memcer")})
  },
  {
    name: "充值劵活动",
    path: "/active/tocoupon",
    exact: true,
    component: lazy({loader: import("@power/views/active/tocoupon")})
  },
  {
    name: "赠劵活动",
    path: "/active/gcoupon",
    exact: true,
    component: lazy({loader: import("@power/views/active/gcoupon")})
  },
  {
    name: "劵配置",
    path: "/active/couponconf",
    exact: true,
    component: lazy({loader: import("@power/views/active/couponconf")})
  },
]