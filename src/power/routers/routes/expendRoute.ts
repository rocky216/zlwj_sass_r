import lazy from "@public/utils/lazy"

export default [
  {
    name: "电费支出记录",
    path: "/expend/electfees",
    exact: true,
    component: lazy({loader: import("@power/views/change/expend/electfees")}),
    children: [
      {
        name: "电费支出详情",
        path: "/expend/electfees/:orderNo/detail",
        exact: true,
        component: lazy({loader: import("@power/views/change/expend/electfees/detail")}),
      }
    ]
  },
  {
    name: "分账支出记录",
    path: "/expend/separaaccount",
    exact: true,
    component: lazy({loader: import("@power/views/change/expend/separaaccount")}),
    children: [
      {
        name: "分账支出详情",
        path: "/expend/separaaccount/:id/detail",
        exact: true,
        component: lazy({loader: import("@power/views/change/expend/separaaccount/detail")}),
      }
    ]
  },
]