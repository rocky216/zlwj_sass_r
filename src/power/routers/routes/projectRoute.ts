import lazy from "@public/utils/lazy"

export default [
  {
    name: "项目配置",
    path: "/project/proconf",
    exact: true,
    component: lazy({loader: import("@power/views/proman/proconf")}),
  },
  {
    name: "充电棚配置",
    path: "/project/charsheconf",
    exact: true,
    component: lazy({loader: import("@power/views/proman/charsheconf")})
  },
  {
    name: "电表配置",
    path: "/project/wattmeter",
    exact: true,
    component: lazy({loader: import("@power/views/proman/wattmeter")})
  },
  {
    name: "设备配置",
    path: "/project/deviceconf",
    exact: true,
    component: lazy({loader: import("@power/views/proman/deviceconf")}),
    children: [
      {
        name: "设备配置详情",
        path: "/project/deviceconf/:id/detail/:iotId",
        exact: true,
        component: lazy({loader: import("@power/views/proman/devicedetail")}),
      }
    ]
  },
  {
    name: "分账对象配置",
    path: "/project/separaccount",
    exact: true,
    component: lazy({loader: import("@power/views/proman/separaccount")}),
    children: [
      {
        name: "设备配置详情",
        path: "/project/separaccount/:id/log",
        exact: true,
        component: lazy({loader: import("@power/views/proman/separaccountlog")}),
      }
    ]
  },
  {
    name: "设备类型管理",
    path: "/project/devicetype",
    exact: true,
    component: lazy({loader: import("@power/views/proman/devicetype")}),
  },
]