import routes from "@power/routers/routeData"
import _ from "lodash"

const menus =  [
  {
    name: "看板",
  },
  {
    name: "系统看板",
  },
  {
    name: "项目管理",
    children: [
      {
        name:"设备类型管理",
      },
      {
        name: "项目配置",
      },
      {
        name: "充电棚配置",
      },
      {
        name: "电表配置",
      },
      {
        name: "设备配置",
      },
      {
        name: "分账对象配置",
      },
    ]
  },
  {
    name: "活动管理",
    children: [
      {
        name: "劵列表",
      },
      {
        name: "会员劵活动",
      },
      {
        name: "充值劵活动",
      },
      {
        name: "赠劵活动",
      },
      {
        name: "劵配置",
      },
    ]
  },
  {
    name: "充电卡管理",
  },
  {
    name: "收入管理",
    children: [
      {
        name: "充电订单",
      },
      {
        name: "会员劵订单",
      },
      {
        name: "充电卡充值订单",
      }
    ]
  },
  {
    name: "支出管理",
    children: [
      {
        name: "电费支出记录",
      },
      {
        name: "分账支出记录",
      }
    ]
  },
  {
    name: "监控管理",
    children: [
      {
        name: "设备监控",
      },
      {
        name: "充电订单监控",
      }
    ]
  },
  {
    name: "数据统计",
    children: [
      {
        name: "系统数据统计",
      },
      {
        name: "公司数据统计",
      },
      {
        name: "项目数据统计",
      },
    ]
  },
  {
    name: "推送日志",
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