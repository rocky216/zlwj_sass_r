import lazy from "@public/utils/lazy"

export default [
  {
    name: "设备监控",
    path: "/monitor/device",
    exact: true,
    component: lazy({loader: import("@power/views/monitor/device")}),
  },
  {
    name: "充电订单监控",
    path: "/monitor/order",
    exact: true,
    component: lazy({loader: import("@power/views/monitor/order")}),
  },
]