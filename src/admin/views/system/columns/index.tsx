import React from "react"
import {ProjectLevel} from "@public/common/mapper"

export const systemColumns = [
  {
    title: "系统代号",
    dataIndex: "temCode"
  },
  {
    title: "系统名称",
    dataIndex: "temName"
  },
  {
    title: "访问URL",
    dataIndex: "temUrl"
  },
  {
    title: "系统级别",
    dataIndex: "temLevel",
    render:(item:any)=>ProjectLevel[item]
  },
  // {
  //   title: "应用公司与项目",
  //   dataIndex: "key"
  // },
  // {
  //   title: "系统权限",
  //   dataIndex: "key"
  // },
]