import React from "react"
import {Status, StatusColor} from "@public/common/powerMapper"
import { Tag, Image} from "antd"


export const memcerColumns = [
  {
    title: "活动图",
    dataIndex: "couponIcon",
    render: (item:any)=><Image src={item} width="100" height="100" />
  },
  {
    title: "公司",
    dataIndex: "companyName"
  },
  {
    title: "小区",
    dataIndex: "itemName",
  },
  {
    title: "活动名称",
    dataIndex: "activityName"
  },
  {
    title: "活动详情",
    dataIndex: "activityFee"
  },
  {
    title: "活动途径",
    dataIndex: "activityObject"
  },
  {
    title: "活动时间",
    dataIndex: "activityTime"
  },
]

export const couponColumns = [
  {
    title: "发券时间",
    dataIndex: "buildTime"
  },
  {
    title: "劵信息",
    dataIndex: "key"
  },
  {
    title: "劵状态",
    dataIndex: "status",
    render:(item:number)=><Tag color={StatusColor[item]}>{Status[item]}</Tag>
  },
  {
    title: "领劵人唯一ID",
    dataIndex: "temId"
  },
  {
    title: "有效期至",
    dataIndex: "validTime"
  },
  {
    title: "所属项目",
    dataIndex: "key"
  },
  {
    title: "用券信息",
    dataIndex: "powerOrder"
  },
]