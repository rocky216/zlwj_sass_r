import { CarPayStatus, CarStatus, PassType } from "@public/common/plateMapper"
import { Tag } from "antd"
import React from "react"


export const carLogColumns = [
  {
    title: "记录状态",
    dataIndex: "orderState",
    render:(item:any)=><Tag>{CarStatus[item]}</Tag>
  },
  {
    title: "通行时间",
    dataIndex: "updateTime"
  },
  {
    title: "车牌号码",
    dataIndex: "license"
  },
  {
    title: "车辆类型",
    dataIndex: "passType",
    render:(item:any)=><Tag>{PassType[item]}</Tag>
  },
  {
    title: "停车场",
    dataIndex: "parkName"
  },
  {
    title: "入场时间",
    dataIndex: "iTime"
  },
  {
    title: "离场时间",
    dataIndex: "oTime"
  },
  {
    title: "停车时长",
    dataIndex: "timeStr"
  },
  {
    title: "类型",
    dataIndex: "passState",
    render:(item:any)=><Tag>{CarPayStatus[item]}</Tag>
  },
  {
    title: "收费金额",
    dataIndex: "money"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]