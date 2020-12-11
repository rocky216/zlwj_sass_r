import React from "react"
import {PayType, Status, StatusColor} from "@public/common/powerMapper"
import { Tag, Image} from "antd"


export const memcerColumns = [
  {
    title: "活动图",
    dataIndex: "activityUrl",
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
    dataIndex: "activityInfoList",
    render:(item:any[])=>{
      return item.map((elem,index)=>(
        <Tag key={index}>{elem.activityInfo}</Tag>
      ))
    }
  },
  {
    title: "活动途径",
    dataIndex: "activityObject",
    render:(item:any)=>PayType[item]
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