import React from "react"
import {Status, StatusColor} from "@public/common/powerMapper"
import { Tag } from "antd"

export const separaaccountDetailColumns = [
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "分账对象名称",
    dataIndex: "partnerName"
  },
  {
    title: "电话",
    dataIndex: "partnerPhone"
  },
  {
    title: "分账说明",
    dataIndex: "desc",
  },
  {
    title: "分账金额",
    dataIndex: "fzFee"
  },
  {
    title: "状态",
    dataIndex: "status",
    render:(item:any)=>Status[item]
  },
  {
    title: "备注",
    dataIndex: "remark"
  }
]


export const separaaccountColumns = [
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "分账支出单号",
    dataIndex: "orderNo"
  },
  {
    title: "支出标题",
    dataIndex: "orderName"
  },
  {
    title: "所属项目",
    dataIndex: "companyName",
  },
  {
    title: "分账对象",
    dataIndex: "orderDescNum"
  },
  {
    title: "总分账支出",
    dataIndex: "orderFee"
  },
  {
    title: "备注",
    dataIndex: "remark"
  }
]

export const electfeesDetailColumns = [
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "电表名称",
    dataIndex: "meterName"
  },
  {
    title: "电价",
    dataIndex: "meterFee"
  },
  {
    title: "抄表前度数",
    dataIndex: "initDegrees",
  },
  {
    title: "新增度数",
    dataIndex: "changeDegrees"
  },
  {
    title: "当前度数",
    dataIndex: "finalDegrees"
  },
  {
    title: "支出电费",
    dataIndex: "meterMoney"
  },
  {
    title: "备注",
    dataIndex: "remark"
  }
]

export const electfeesColumns = [
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "电费支出单号",
    dataIndex: "orderNo"
  },
  {
    title: "标题",
    dataIndex: "orderName"
  },
  {
    title: "所属项目",
    dataIndex: "companyStr",
    render:(item:any, rows:any)=>item+"/"+rows.itemStr
  },
  {
    title: "电表数量",
    dataIndex: "meterNum"
  },
  {
    title: "抄表前合计度数",
    dataIndex: "initDegrees"
  },
  {
    title: "新增计费度数",
    dataIndex: "changeDegrees"
  },
  {
    title: "当前合计度数",
    dataIndex: "totalDegrees"
  },
  {
    title: "支出电费",
    dataIndex: "orderFee"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]