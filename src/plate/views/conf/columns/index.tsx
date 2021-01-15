import { OnLineType, OnLineTypeColor, InOutType} from "@public/common/plateMapper";
import { Tag } from "antd";
import React from "react";


export const sysDeviceTypeConfColumns = [
  {
    title: "设备类型编号",
    dataIndex: "typeCode",
  },
  {
    title: "设备类型名称",
    dataIndex: "typeName"
  },
  {
    title: "设备类型统计",
    dataIndex: "deviceCount",
    render:(item:any)=>item+"台"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]

export const sysDeviceConfColumns = [
  {
    title: "状态",
    dataIndex: "online",
    render:(item:any)=> <Tag color={OnLineTypeColor[item]}>{OnLineType[item]}</Tag> 
  },
  {
    title: "IotID",
    dataIndex: "iotId"
  },
  {
    title: "设备序列号",
    dataIndex: "asa"
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
    title: "公司",
    dataIndex: "plateCompanyItemStr"
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
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "更新信息",
    dataIndex: "updateTime"
  },
]