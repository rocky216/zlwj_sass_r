import lazy from "@public/utils/lazy"

export default [
  {
    name:"APP钥匙申请",
    path: "/keychain/appkey",
    component: lazy({loader: import("@door/views/keychain/appkey")}),
  },
  {
    name:"人脸钥匙申请",
    path: "/keychain/face",
    component: lazy({loader: import("@door/views/keychain/facekey")}),
  },
]