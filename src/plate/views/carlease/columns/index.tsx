import { ActivityType, OrderStatus } from "@public/common/plateMapper"
import React from "react"


export const carLeaseColumns = [
  {
    title: "订单状态",
    dataIndex: "orderState",
    render:(item:any)=>OrderStatus[item]
  },
  {
    title: "下单日期",
    dataIndex: "buildTime"
  },
  {
    title: "订单编号",
    dataIndex: "orderNo"
  },
  {
    title: "租赁车辆车牌",
    dataIndex: "license"
  },
  {
    title: "租赁人信息",
    dataIndex: "leaseUserInfo"
  },
  {
    title: "租赁停车场",
    dataIndex: "parkName"
  },
  {
    title: "租赁车位",
    dataIndex: "seatCode"
  },
  {
    title: "租赁时长",
    dataIndex: "activityNum",
    render:(item:any, rows:any)=>item+ActivityType[rows.activityType]
  },
  {
    title: "支付信息",
    dataIndex: "payType"
  },
  {
    title: "车位变更日志",
    dataIndex: "seatChangeLogId"
  },
  {
    title: "订单金额",
    dataIndex: "activityMoney"
  },
  {
    title: "支付金额",
    dataIndex: "money"
  },
]