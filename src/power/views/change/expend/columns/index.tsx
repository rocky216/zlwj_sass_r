import React from "react"
import {OrderStatus, OrderStatusColor, PayType} from "@public/common/powerMapper"
import { Tag } from "antd"


export const electfeesColumns = [
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "电费支出单号",
    dataIndex: "orderNo"
  },
  {
    title: "标题",
    dataIndex: "orderName"
  },
  {
    title: "所属项目",
    dataIndex: "companyStr",
    render:(item:any, rows:any)=>item+"/"+rows.itemStr
  },
  {
    title: "电表数量",
    dataIndex: "meterNum"
  },
  {
    title: "抄表前合计度数",
    dataIndex: "initDegrees"
  },
  {
    title: "新增计费度数",
    dataIndex: "changeDegrees"
  },
  {
    title: "当前合计度数",
    dataIndex: "totalDegrees"
  },
  {
    title: "支出电费",
    dataIndex: "orderFee"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]