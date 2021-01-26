import { InOutType, Status, StatusColor } from "@public/common/plateMapper"
import { Tag } from "antd"
import React from "react"


export const deviceCatchColums = [
  {
    title: "公司",
    dataIndex: "companyName",
    render:(item:any, rows:any)=>`${rows.companyName}/${rows.itemName}/${rows.parkName}`
  },
  {
    title: "IotID",
    dataIndex: "iotId"
  },
  {
    title: "设备序列号",
    dataIndex: "deviceSerial"
  },
  {
    title: "设备名称",
    dataIndex: "deviceName"
  },
  {
    title: "进出分类",
    dataIndex: "inOut",
    render:(item:any)=>InOutType[item]
  },
  {
    title: "关联收费点",
    dataIndex: "siteName"
  },
  {
    title: "设备品牌",
    dataIndex: "deviceBrand"
  },
  {
    title: "设备类型",
    dataIndex: "deviceType"
  },
  {
    title: "状态",
    dataIndex: "status",
    render: (item:any)=><Tag color={StatusColor[item]}>{Status[item]}</Tag>
  },
]