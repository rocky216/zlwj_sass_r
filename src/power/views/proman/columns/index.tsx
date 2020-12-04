import React from "react"
import { Tag } from "antd";
import {WhetherType, PayType, FuseStatus, FuseStatusColor, OnLineType, OnLineTypeColor} from "@public/common/powerMapper"

export const devicesColumns = [
  {
    title: "状态",
    dataIndex: "online",
    render:(item:number)=><Tag color={OnLineTypeColor[item]}>{OnLineType[item]}</Tag>
  },
  {
    title: "IotID",
    dataIndex: "iotId"
  },
  {
    title: "序列号",
    width: 50,
    dataIndex: "deviceSerial"
  },
  {
    title: "公司",
    dataIndex: "companyName"
  },
  {
    title: "小区",
    dataIndex: "itemName"
  },
  {
    title: "所属电表",
    dataIndex: "meterName"
  },
  {
    title: "所属充电棚",
    dataIndex: "shedName"
  },
  {
    title: "设备名称",
    dataIndex: "deviceName"
  },
  {
    title: "设备类型",
    dataIndex: "deviceBrand"
  },
  {
    title: "端口",
    dataIndex: "portType"
  },
]

export const wattConfColumns = [
  {
    title: "公司",
    dataIndex: "companyName"
  },
  {
    title: "小区",
    dataIndex: "itemName"
  },
  {
    title: "电表名称",
    dataIndex: "meterName"
  },
  {
    title: "设备数量(台)",
    dataIndex: "deviceCount"
  },
  {
    title: "初始电表值",
    dataIndex: "initDegrees"
  },
  {
    title: "当前电表值",
    dataIndex: "nowDegrees"
  },
  {
    title: "电价",
    dataIndex: "unitMoney"
  },
]

export const sheConfColumns = [
  {
    title: "公司",
    dataIndex: "companyName"
  },
  {
    title: "小区",
    dataIndex: "itemName"
  },
  {
    title: "充电棚名称",
    dataIndex: "shedName"
  },
  {
    title: "设备数量(台)",
    dataIndex: "deviceNum"
  }
]


export const ProConfColumns = [
  {
    title: "公司",
    dataIndex: "companyName"
  },
  {
    title: "小区",
    dataIndex: "itemName"
  },
  {
    title: "电表数量",
    dataIndex: "meterSum"
  },
  {
    title: "充电棚数量",
    dataIndex: "shedSum"
  },
  {
    title: "设备数量",
    dataIndex: "deviceSum"
  },
  {
    title: "自动退款",
    dataIndex: "isRefund",
    render: (item:any)=>WhetherType[item]
  },
  {
    title: "熔断配置",
    maxWidth: 200,
    dataIndex: "powerFuseList",
    render(item:any[]) {
      return item.map((elem, i)=>(
      <Tag key={i}><span style={{color: FuseStatusColor[elem.fuseStatus]}}>{FuseStatus[elem.fuseStatus]}</span>
        {elem.unitTime}分钟{elem.unitNum}次</Tag>
      ))
    }
  },
  {
    title: "收费配置",
    maxWidth: 200,
    dataIndex: "powerRuleList",
    render(item:any[]) {
      return item.map((elem)=><Tag key={elem.id}>{PayType[elem.type]}{elem.unitMoney}/{elem.unitTime}分钟</Tag>);
    }
  }
]