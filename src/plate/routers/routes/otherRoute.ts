import lazy from "@public/utils/lazy"

export default [
  {
    name:"电子围栏",
    path: "/otherconf/elecfence",
    level: 2,
    component: lazy({loader: import("@plate/views/otherconf/elecfence")}),
  },
  {
    name: "区域限制通行",
    path: "/otherconf/regstrict",
    level: 2,
    component: lazy({loader: import("@plate/views/otherconf/regstrict")}),
  },
  {
    name: "车辆黑白名单",
    path: "/otherconf/bwlist",
    level: 2,
    component: lazy({loader: import("@plate/views/otherconf/bwlist")}),
  },
]