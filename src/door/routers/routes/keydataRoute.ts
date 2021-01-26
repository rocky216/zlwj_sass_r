import lazy from "@public/utils/lazy"

export default [
  {
    name:"小程序钥匙",
    path: "/kaydata/applets",
    component: lazy({loader: import("@door/views/keydata/applets")}),
  },
  {
    name:"一卡通钥匙",
    path: "/kaydata/card",
    component: lazy({loader: import("@door/views/keydata/card")}),
  },
  {
    name:"APP用户钥匙",
    path: "/kaydata/app",
    component: lazy({loader: import("@door/views/keydata/app")}),
  },
  {
    name:"人脸钥匙",
    path: "/kaydata/face",
    component: lazy({loader: import("@door/views/keydata/face")}),
  },
]