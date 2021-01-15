import { BwType, OpenState } from "@public/common/plateMapper"
import React from "react"


export const bwlistColumns = [
  {
    title: "黑白名单类型",
    dataIndex: "type",
    render:(item:any)=>BwType[item]
  },
  {
    title: "车牌号码",
    dataIndex: "license"
  },
  {
    title: "联系人名称",
    dataIndex: "linkName"
  },
  {
    title: "联系电话",
    dataIndex: "linkPhone"
  },
  {
    title: "黑白名单说明",
    dataIndex: "remark"
  },
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "修改信息",
    dataIndex: "updateTime"
  },
]

export const regstrictColumns = [
  {
    title: "限制车牌前缀",
    dataIndex: "licensePrefix",
  },
  {
    title: "限制说明",
    dataIndex: "forbidReason"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
  {
    title: "新增信息",
    dataIndex: "buildTime"
  },
  {
    title: "更新信息",
    dataIndex: "updateTime"
  }
]

export const elecfenceColumns = [
  {
    title: "电子围栏状态",
    dataIndex: "openState",
    render:(item:any)=>OpenState[item]
  },
  {
    title: "限制车辆",
    dataIndex: "license"
  },
  {
    title: "限制说明",
    dataIndex: "openRemark"
  },
  {
    title: "限制解除信息",
    dataIndex: "closeTemId"
  },
  {
    title: "限制解除说明",
    dataIndex: "closeRemark"
  },
  {
    title: "创建信息",
    dataIndex: "openTime"
  }
]