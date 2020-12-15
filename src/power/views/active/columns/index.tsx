import React from "react"
import {PayType, Status, StatusColor, CouponType} from "@public/common/powerMapper"
import { Tag, Image} from "antd"

const UnitType:any = { M: "月", Y: "元", F: "分钟", D: "分钟"}
export const CouponTypeBe:any = {VIP: "有效时长",  MONEY: "金额", TIME: "时间"}

export const couponconfColumns = [
  {
    title: "劵名称",
    dataIndex: "couponName"
  },
  {
    title: "劵配图",
    dataIndex: "couponIcon",
    render: (item:any)=><Image src={item} width={80} height={80} />
  },
  {
    title: "劵类型",
    dataIndex: "couponType",
    render:(item:string)=>CouponType[item]
  },
  {
    title: "劵配置",
    dataIndex: "unitNum",
    render:(item:any, rows:any)=>CouponTypeBe[rows.couponType]+':'+item+UnitType[rows.unitType]
  },
  {
    title: "历史发劵总数",
    dataIndex: "allNum"
  },
  {
    title: "当前有效劵总数",
    dataIndex: "isStateNum"
  }
]

export const memcerColumns = [
  {
    title: "活动图",
    dataIndex: "activityUrl",
    render: (item:any)=><Image src={item} width={80} height={80} />
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