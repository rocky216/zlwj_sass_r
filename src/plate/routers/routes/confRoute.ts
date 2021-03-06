import lazy from "@public/utils/lazy"

export default [
  {
    name:"系统黑白名单",
    path: "/conf/bwlist",
    component: lazy({loader: import("@plate/views/conf/bwlist")}),
  },
  {
    name:"设备配置",
    path: "/conf/device",
    component: lazy({loader: import("@plate/views/conf/device")}),
    exact: true,
    children: [
      {
        name: "设备详情",
        path: "/conf/device/:id/detail/:iotId",
        exact: true,
        component: lazy({loader: import("@plate/views/conf/device/detail")}),
      }
    ]
  },
  {
    name:"设备类型管理",
    path: "/conf/devicetype",
    component: lazy({loader: import("@plate/views/conf/devicetype")}),
  },
]