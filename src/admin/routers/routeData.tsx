import React from "react"
import loadable from "@loadable/component";
import _ from "lodash"
import Home from "@admin/views/home"
import CompanyDetailPage from "@admin/views/company/detial"
import CompanyPage from "@admin/views/company"


const lazy = (props: {loader: any})=>{
  const {loader} = props
  return loadable( function(){
    return loader
  } , {
    cacheKey: function(){
      return "key"
    },
    fallback: <div>正在加载。。。</div>
  })
}



const routes = [
  {
    id: "1",
    name: "工作台",
    path: "/",
    exact: true,
    component: Home
  },
  {
    id: "2",
    name: "用户管理",
    path: "/users",
    exact: true,
    component: lazy({loader: import("@admin/views/users")}),
    children: [
      {
        id: "2-01",
        name: "用户详情",
        path: "/users/:id/detail/:temId",
        exact: false,
        component: lazy({loader: import("@admin/views/users/detail")}),
      }
    ]
  },
  {
    id: "7",
    name: "系统管理",
    path: "/system",
    exact: true,
    component: lazy({loader: import("@admin/views/system")}),
    children: [
      {
        id: "7-01",
        name: "公司详情",
        path: "/company/:id/permisser",
        exact: true,
        component: lazy({loader: import("@admin/views/system/permisser")}),
      }
    ]
  },
  {
    id: "3",
    name: "公司管理",
    path: "/company",
    exact: true,
    component: CompanyPage,
    children: [
      {
        id: "3-01",
        name: "公司详情",
        path: "/company/:id/detail",
        exact: false,
        component: CompanyDetailPage,
      }
    ]
  },
  {
    id: "4",
    name: "资源管理",
    path: "/resource",
    exact: true,
    component: lazy({loader: import("@admin/views/resource")})
  },
  {
    id: "5",
    name: "定时任务",
    exact: true,
    children: [
      {
        name: "任务配置",
        path: "/timetask/conf",
        component: lazy({loader: import("@admin/views/timetask/conf")}),
      },
    ]
  },
  {
    id: "6",
    name: "短信管理",
    exact: true,
    children: [
      {
        id: "6-01",
        name: "短信订单",
        path: "/message/order",
        component: lazy({loader: import("@admin/views/message/order")}),
      },
      {
        id: "6-02",
        name: "短信配置",
        path: "/message/conf",
        component: lazy({loader: import("@admin/views/message/conf")}),
      },
      {
        id: "6-03",
        name: "短信签名",
        path: "/message/sign",
        component: lazy({loader: import("@admin/views/message/sign")}),
      },
      {
        id: "6-04",
        name: "短信模板",
        path: "/message/template",
        component: lazy({loader: import("@admin/views/message/template")}),
      },
    ]
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

