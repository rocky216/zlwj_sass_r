import React from "react"
import {Status, DefaultStatus, MessageType} from "@public/common/mapper"


export const messageSignColumns = [
  {
    title: "签名名称",
    dataIndex: "signName"
  },
  {
    title: "短信种类",
    dataIndex: "signType",
    render: (item:number)=>MessageType[item]
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
  {
    title: "是否默认",
    dataIndex: "isDefault",
    render: (item:number)=>DefaultStatus[item]
  },
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
]

export const messageConfColumns = [
  {
    title: "短信包名称",
    dataIndex: "packageName"
  },
  {
    title: "短信包详情",
    dataIndex: "packageDesc"
  },
  {
    title: "短信数量(条)",
    dataIndex: "num"
  },
  {
    title: "短信包价格(元)",
    dataIndex: "money"
  },
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
]

export const messageOrderColumns = [
  {
    title: "购买时间",
    dataIndex: "buildTime"
  },
  {
    title: "短信包名称",
    dataIndex: "packageName"
  },
  {
    title: "短信数量(条)",
    dataIndex: "num"
  },
  {
    title: "短信包价格(元)",
    dataIndex: "money"
  },
  {
    title: "支付公司",
    dataIndex: "companyName"
  },
  {
    title: "支付信息",
    dataIndex: "payWayStr"
  },
  {
    title: "支付金额(元)",
    dataIndex: "payMoney"
  },
]