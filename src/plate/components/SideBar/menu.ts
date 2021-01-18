import routes from "@plate/routers/routeData"
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
    children:[
      {
        name: "电子围栏"
      },
      {
        name: "区域限制通行"
      },
      {
        name: "车辆黑白名单"
      },
    ]
  },
  {
    name: "配置管理",
    children:[
      {
        name: "系统黑白名单"
      },
      {
        name: "设备配置"
      },
      {
        name: "设备类型管理"
      },
    ]
  },
  {
    name: "数据统计",
    children:[
      {
        name: "系统数据统计"
      },
      {
        name: "公司数据统计"
      },
      {
        name: "项目数据统计"
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