import _ from "lodash"
import lazy from "@public/utils/lazy"
import HomePage from "@plate/views/home"
import otherRoute from "./routes/otherRoute"
import confRoute from "./routes/confRoute"
import statisRoute from "./routes/statisRoute"
import parkRoute from "./routes/parkRoute"


const getId = (arr:any[], key:string)=>{
  _.each(arr, (item, index)=>{
    item.id = key+"-"+(index<9?"0"+(index+1):index+1)
    if(item.children && item.children.length){
      getId(item.children, item.id)
    }
  })
  return arr
}


export const routes = [
  {
    id: "1",
    name: "看板",
    path: "/",
    exact: true,
    level: 2,
    component: HomePage
  },
  {
    id: "2",
    name: "系统看板",
    path: "/systemhome",
    exact: true,
    component: lazy({loader: import("@plate/views/home/system")}),
  },
  {
    id: "3",
    name: "停车场管理",
    path: "/park",
    exact: true,
    level: 2,
    component: lazy({loader: import("@plate/views/park")}),
    children: getId(parkRoute,"3")
  },
  {
    id: "4",
    name: "通行码管理",
    path: "/accecode",
    exact: true,
    level: 2,
    component: lazy({loader: import("@plate/views/accecode")}),
  },
  {
    id: "5",
    name: "车辆通行日志",
    path: "/carLog",
    exact: true,
    level: 2,
    component: lazy({loader: import("@plate/views/carlog")}),
  },
  {
    id: "6",
    name: "车位租赁订单",
    path: "/carlease",
    exact: true,
    level: 2,
    component: lazy({loader: import("@plate/views/carlease")}),
  },
  {
    id: "7",
    name: "其他配置记录",
    children: getId(otherRoute,"7")
  },
  {
    id: "8",
    name: "配置管理",
    children: getId(confRoute,"8")
  },
  {
    id: "9",
    name: "数据统计",
    children: getId(statisRoute,"9")
  }
]


let routeData:any[] = [];

const handleRoute = (arr: any[], obj:any=null)=>{
  _.each(arr, async (item, index)=>{
    routeData.push(item)
    if(item.children && item.children.length>0){
      handleRoute(item.children, item)
    }
  })
}

handleRoute(routes);

export default routeData;

