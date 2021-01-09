import lazy from "@public/utils/lazy"

export default [
  {
    name: "停车场详情",
    path: "/park/:id/detail",
    component: lazy({loader: import("@plate/views/park/detail")}),
  },
]