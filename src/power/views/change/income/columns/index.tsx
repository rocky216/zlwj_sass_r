import React from "react"
import {OrderStatus, OrderStatusColor, PayType} from "@public/common/powerMapper"
import { Tag } from "antd"




export const cardorderColumns = [
  {
    title: "订单时间",
    dataIndex: "buildTime",
  },
  {
    title: "订单编号",
    dataIndex: "orderNo",
  },
  {
    title: "充值途径",
    dataIndex: "orderChannel",
    render: (item:number)=>PayType[item]
  },
  {
    title: "卡号",
    dataIndex: "cardNo",
  },
  {
    title: "充值前余额",
    dataIndex: "initBalance",
  },
  {
    title: "充值后余额",
    dataIndex: "finalBalance",
  },
  {
    title: "充值金额",
    dataIndex: "changeBalance",
  }
]

export const memcerorderColumns = [
  {
    title: "订单时间",
    dataIndex: "buildTime",
  },
  {
    title: "结束信息",
    dataIndex: "endStatus",
  },
  {
    title: "充电订单号",
    width: 100,
    dataIndex: "orderNo",
  },
  {
    title: "下单途径",
    dataIndex: "orderChannel",
    render: (item:number)=>PayType[item]
  },
  {
    title: "订单类型",
    dataIndex: "orderType",
  },
  
  {
    title: "充电配置",
    dataIndex: "key",
  },
  {
    title: "基础信息",
    dataIndex: "startTime",
  },
  {
    title: "重启信息",
    dataIndex: "orderRestartNum",
  },
  {
    title: "退款信息",
    dataIndex: "isCharge",
  },
  {
    title: "订单金额",
    dataIndex: "orderFee",
  },
  {
    title: "实际金额",
    dataIndex: "realFee",
  },
]

export const charorderColumns = [
  {
    title: "订单状态",
    dataIndex: "orderStatus",
    render: (item:number)=><Tag color={OrderStatusColor[item]} >{OrderStatus[item]}</Tag>
  },
  {
    title: "结束信息",
    dataIndex: "endStatus",
  },
  {
    title: "充电订单号",
    width: 100,
    dataIndex: "orderNo",
  },
  {
    title: "下单途径",
    dataIndex: "orderChannel",
    render: (item:number)=>PayType[item]
  },
  {
    title: "订单类型",
    dataIndex: "orderType",
  },
  
  {
    title: "充电配置",
    dataIndex: "key",
  },
  {
    title: "基础信息",
    dataIndex: "startTime",
  },
  {
    title: "重启信息",
    dataIndex: "orderRestartNum",
  },
  {
    title: "退款信息",
    dataIndex: "isCharge",
  },
  {
    title: "订单金额",
    dataIndex: "orderFee",
  },
  {
    title: "实际金额",
    dataIndex: "realFee",
  },
]