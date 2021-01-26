import lazy from "@public/utils/lazy"

export default [
  {
    name:"系统数据统计",
    path: "/statis/system",
    component: lazy({loader: import("@plate/views/statis/system")}),
  },
  {
    name:"公司数据统计",
    path: "/statis/company",
    component: lazy({loader: import("@plate/views/statis/company")}),
  },
  {
    name:"项目数据统计",
    path: "/statis/he",
    component: lazy({loader: import("@plate/views/statis/he")}),
  },
  {
    name:"缓存数据管理",
    path: "/statis/cache",
    component: lazy({loader: import("@plate/views/statis//cache")}),
  },
]