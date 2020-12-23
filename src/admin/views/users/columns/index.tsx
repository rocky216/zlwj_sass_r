import React from "react"
import {Tag} from "antd"
import { ColumnsType } from 'antd/es/table';
import {Status, ClientType, Income, Sex} from "@public/common/mapper"

interface ColumsProps {
  title:string;
  dataIndex: string;
  render?:Function
}


export const usersBalanceColumns:ColumnsType<ColumsProps> = [
  {
    title: "时间",
    dataIndex: "buildTime",
  },
  {
    title: "收支类型",
    dataIndex: "operaType",
    render: (item:string)=><Tag >{Income[item]}</Tag>
  },
  {
    title: "关联信息",
    dataIndex: "linkInfo"
  },
  {
    title: "类型",
    dataIndex: "targetType",
    render: (item:string)=><Tag >{ClientType[item]}</Tag>
  },
  {
    title: "起始余额",
    dataIndex: "initBalance",
  },
  {
    title: "变更余额",
    dataIndex: "changeBalance",
  },
  {
    title: "实时余额",
    dataIndex: "finalBalance",
  },
]

export const usersIntegralColumns:ColumnsType<ColumsProps> = [
  {
    title: "时间",
    dataIndex: "buildTime",
  },
  {
    title: "收支类型",
    dataIndex: "targetType",
  },
  {
    title: "关联信息",
    dataIndex: "linkInfo"
  },
  {
    title: "类型",
    dataIndex: "targetType",
    render: (item:string)=>ClientType[item]
  },
  {
    title: "起始积分",
    dataIndex: "initIntegral",
  },
  {
    title: "变更积分",
    dataIndex: "changeIntegral",
  },
  {
    title: "实时积分",
    dataIndex: "finalIntegral",
  },
]

export const usersColumns:ColumnsType<ColumsProps> = [
  {
    title: "姓名",
    dataIndex: "sysUserInfo",
    render(item) {
      return item?item.realName:"";
    }
  },
  {
    title: "手机号",
    dataIndex: "phoneAccount",
  },
  {
    title: "邮箱",
    dataIndex: "emailAccount"
  },
  {
    title: "性别",
    dataIndex: "sysUserInfo",
    render: item=>item?Sex[item.gender]:""
  },
  {
    title: "积分",
    dataIndex: "sysUserIntegral"
  },
]