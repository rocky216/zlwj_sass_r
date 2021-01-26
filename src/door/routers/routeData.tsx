import _ from "lodash"
import lazy from "@public/utils/lazy"
import HomePage from "@door/views/home"
import keyRoute from "./routes/keyRoute"
import keydataRoute from "./routes/keydataRoute"


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
    component: lazy({loader: import("@door/views/home/system")}),
  },
  {
    id: "3",
    name: "钥匙申请",
    children: getId(keyRoute,"3")
  },
  {
    id: "4",
    name: "门管理",
    path: "/gate",
    exact: true,
    component: lazy({loader: import("@door/views/gate")}),
  },
  {
    id: "5",
    name: "钥匙数据管理",
    children: getId(keydataRoute,"5")
  },
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

