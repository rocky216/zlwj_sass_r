import { EyeOutlined } from "@ant-design/icons"
import { Space, Tag } from "antd"
import React from "react"
import { Status, StatusColor } from "@public/common/powerMapper"


export const linkCardLogColumns = [
  {
    title: "时间",
    dataIndex: "buildTime"
  },
  {
    title: "收支类型",
    dataIndex: "operaType"
  },
  {
    title: "类型",
    dataIndex: "orderChannel"
  },
  {
    title: "关联编号",
    dataIndex: "targetId"
  },
  {
    title: "关联信息",
    dataIndex: "linkInfo"
  },
  {
    title: "起始余额",
    dataIndex: "initBalance"
  },
  {
    title: "操作余额",
    dataIndex: "changeBalance"
  },
  {
    title: "实时余额",
    dataIndex: "finalBalance"
  },
]

export const linkCardUserColumns = [
  {
    title: "状态",
    dataIndex: "status",
    render:(item:any)=><Tag color={StatusColor[item]}>{Status[item]}</Tag>
  },
  {
    title: "关联用户唯一id",
    dataIndex: "temId"
  },
  {
    title: "用户充电卡标签",
    dataIndex: "cardName"
  },
  {
    title: "充电卡用户备注",
    dataIndex: "remark"
  },
  {
    title: "结束关联时间",
    dataIndex: "endTime"
  },
  {
    title: "创建时间",
    dataIndex: "startTime"
  },
]

export const cardsColumns = (_this:any)=>{
 return [
    {
      title: "状态",
      dataIndex: "state"
    },
    {
      title: "系统卡号",
      dataIndex: "cardNo"
    },
    {
      title: "IC卡号",
      dataIndex: "icNumber"
    },
    {
      title: "ID卡号",
      dataIndex: "idNumber"
    },
    {
      title: "充电卡名称",
      dataIndex: "cardName"
    },
    {
      title: "当前余额",
      dataIndex: "balance"
    },
    {
      title: "创建信息",
      dataIndex: "buildTime",
      render:(item:any, rows:any)=>{
        return (
          <Space direction="vertical">
            <Space>{item}{!rows.buildUserName?
            <EyeOutlined onClick={_this.getBuildUserName.bind(_this, rows)} style={{cursor: "pointer", color: "#1890ff"}} />:null}</Space>
            {rows.buildUserName?<div>{rows.buildUserName}</div>:null}
          </Space>
        )
      }
    },
    {
      title: "备注",
      dataIndex: "remark"
    }
  ]
}