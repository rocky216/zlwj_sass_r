import { routes } from "@plate/routers/routeData"
import _ from "lodash"


const menus = [
  {
    name: "看板",
  },
  {
    name: "系统看板",
  },
  {
    name: "停车场管理",
  },
  {
    name: "通行码管理",
  },
  {
    name: "车辆通行日志",
  },
  {
    name: "车位租赁订单",
  },
  {
    name: "其他配置记录",
  },
  {
    name: "配置管理",
  },
  {
    name: "数据统计",
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