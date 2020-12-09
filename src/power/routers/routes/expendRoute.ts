import lazy from "@public/utils/lazy"

export default [
  {
    name: "电费支出记录",
    path: "/expend/electfees",
    exact: true,
    component: lazy({loader: import("@power/views/change/expend/electfees")}),
  },
  {
    name: "分账支出记录",
    path: "/expend/separaaccount",
    exact: true,
    component: lazy({loader: import("@power/views/change/expend/separaaccount")}),
  },
]