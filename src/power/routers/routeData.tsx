import _ from "lodash"
import lazy from "@public/utils/lazy"
import Home from "@power/views/home"
import projectRoute from "./routes/projectRoute"
import activeRoute from "./routes/activeRoute"
import cardRoute from "./routes/cardRoute"

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
    name: "工作台",
    path: "/",
    exact: true,
    component: Home
  },
  {
    id: "2",
    name: "项目管理",
    children: getId(projectRoute,"2")
  },
  {
    id: "3",
    name: "活动管理",
    children: getId(activeRoute,"3")
  },
  {
    id: "4",
    name: "充电卡管理",
    path: "/card",
    exact: true,
    component: lazy({loader: import("@power/views/card")}),
    children: getId(cardRoute,"4")
  },
]



let routeData:any[] = [];

const handleRoute = (arr: any[], obj:any=null)=>{
  _.each(arr, async (item, index)=>{
    if(item.component){
      routeData.push(item)
    }
    if(item.children && item.children.length>0){
      handleRoute(item.children, item)
    }
  })
}

handleRoute(routes);

export default routeData;

