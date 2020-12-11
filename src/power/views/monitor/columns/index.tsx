import React from "react"
import {Tag } from "antd"
import { PayType, WhetherType, EndStatus, OrderType, OrderStatus, OrderStatusColor} from "@public/common/powerMapper"


export const orderMonitorColumns = [
  {
    title: "订单状态",
    dataIndex: "orderStatus",
  render:(item:number)=><Tag color={OrderStatusColor[item]}>{OrderStatus[item]}</Tag>
  },
  {
    title: "结束信息",
    dataIndex: "endStatus",
    render:(item:number)=>EndStatus[item]
  },
  {
    title: "充电订单号",
    dataIndex: "orderNo"
  },
  {
    title: "下单途径",
    dataIndex: "orderChannel",
    render:(item:number)=>PayType[item]
  },
  {
    title: "订单类型",
    dataIndex: "orderType",
    render:(item:number)=>OrderType[item]
  },
  {
    title: "关联信息",
    dataIndex: "companyName"
  },
  {
    title: "充电配置",
    dataIndex: "unitFee",
    render:(item:any,rows:any)=>item+"元/"+rows.unitMin+"分钟"
  },
  {
    title: "基础信息",
    dataIndex: "startTime",
    render:(item:any,rows:any)=>item+"/"+rows.endTime||"暂无"
  },
  {
    title: "重启次数",
    dataIndex: "orderRestartNum"
  },
  {
    title: "退款信息",
    dataIndex: "isRefund",
    render:(item:number)=>WhetherType[item]
  },
  {
    title: "订单金额",
    dataIndex: "orderFee"
  },
  {
    title: "实际金额",
    dataIndex: "realFee"
  },
]

export const deviceAvgorderColumns = [
  {
    title: "24H合计订单",
    dataIndex: "twentyFourNum"
  },
  {
    title: "7H日合计订单",
    dataIndex: "sevenNum"
  },
  {
    title: "15H日合计订单",
    dataIndex: "fifteenNum"
  },
  {
    title: "30H日合计订单",
    dataIndex: "thirtyNum"
  },
  {
    title: "IotID",
    dataIndex: "iotId"
  },
  {
    title: "所属项目",
    dataIndex: "companyName"
  },
  {
    title: "设备名称",
    dataIndex: "deviceName"
  },
  {
    title: "充电棚",
    dataIndex: "shedName"
  },
  {
    title: "设备类型",
    dataIndex: "deviceBrand"
  },
  {
    title: "端口",
    dataIndex: "portType"
  },
  {
    title: "状态",
    dataIndex: "status"
  },
]

export const deviceAvgportColumns = [
  {
    title: "24H平均订单",
    dataIndex: "twentyFourAvg"
  },
  {
    title: "7H平均订单",
    dataIndex: "sevenAvg"
  },
  {
    title: "15H平均订单",
    dataIndex: "fifteenAvg"
  },
  {
    title: "30H平均订单",
    dataIndex: "thirtyAvg"
  },
  {
    title: "IotID",
    dataIndex: "iotId"
  },
  {
    title: "所属项目",
    dataIndex: "companyName"
  },
  {
    title: "设备名称",
    dataIndex: "deviceName"
  },
  {
    title: "充电棚",
    dataIndex: "shedName"
  },
  {
    title: "设备类型",
    dataIndex: "deviceBrand"
  },
  {
    title: "端口",
    dataIndex: "portType"
  },
  {
    title: "状态",
    dataIndex: "status"
  },
]

export const devicePortColumns = [
  {
    title: "端口信息",
    dataIndex: "powerPortList",
    render:(item:any[])=>{
      return item.map((elem:any,index:any)=>(
        <Tag key={index}>{elem.port}{elem.state}</Tag>
      ))
    }
  },
  {
    title: "IotID",
    dataIndex: "iotId"
  },
  {
    title: "所属项目",
    dataIndex: "companyName"
  },
  {
    title: "充电棚",
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
  {
    title: "状态",
    dataIndex: "status"
  },
]

export const deviceOfflineColumns = [
  {
    title: "24H掉线",
    dataIndex: "twentyFourNum"
  },
  {
    title: "7日掉线",
    dataIndex: "sevenNum"
  },
  {
    title: "15日掉线",
    dataIndex: "fifteenNum"
  },
  {
    title: "30日掉线",
    dataIndex: "thirtyNum"
  },
  {
    title: "IotID",
    dataIndex: "iotId"
  },
  {
    title: "所属项目",
    dataIndex: "companyName"
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
  {
    title: "状态",
    dataIndex: "status"
  },
]

export const deviceSignalColumns = [
  {
    title: "当前信号",
    dataIndex: "signalSize"
  },
  {
    title: "IotID",
    dataIndex: "iotId"
  },
  {
    title: "所属项目",
    dataIndex: "companyName"
  },
  {
    title: "充电棚",
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
  {
    title: "状态",
    dataIndex: "status"
  },
]

export const deviceOnlineColumns = [
  {
    title: "IotID",
    dataIndex: "iotId"
  },
  {
    title: "所属项目",
    dataIndex: "companyName"
  },
  {
    title: "充电棚",
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
  {
    title: "状态",
    dataIndex: "status"
  },
]