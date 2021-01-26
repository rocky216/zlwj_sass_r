import routes from "@door/routers/routeData"
import _ from "lodash"


const menus = [
  {
    name: "看板",
  },
  {
    name: "系统看板",
  },
  {
    name: "钥匙申请",
    children: [
      {
        name: "APP钥匙申请"
      },
      {
        name: "人脸钥匙申请"
      },
    ]
  },
  {
    name: "门管理",
  },
  {
    name: "钥匙数据管理",
    children: [
      {
        name: "小程序钥匙"
      },
      {
        name: "一卡通钥匙"
      },
      {
        name: "APP用户钥匙"
      },
      {
        name: "人脸钥匙"
      },
    ]
  },
]

const rMenus = (arr:any[])=>{
  _.each(arr, item=>{
    let index = _.findIndex(routes, o=>o.name==item.name)
    
    if(index>-1){
      item.key = routes[index]["id"]
      item.path = routes[index]["path"]
    }

    if(item.children && item.children.length){
      rMenus(item.children)
    }
    
  })
}

rMenus(menus)

export default menus