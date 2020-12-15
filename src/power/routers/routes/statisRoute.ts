import lazy from "@public/utils/lazy"

export default [
  {
    name: "系统数据统计",
    path: "/statis/system",
    exact: true,
    component: lazy({loader: import("@power/views/statis/system")}),
  },
  {
    name: "公司数据统计",
    path: "/statis/company",
    exact: true,
    component: lazy({loader: import("@power/views/statis/company")}),
  },
  {
    name: "项目数据统计",
    path: "/statis/he",
    exact: true,
    component: lazy({loader: import("@power/views/statis/he")}),
  },
]