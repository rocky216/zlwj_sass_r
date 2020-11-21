import {Status} from "@public/common/mapper"


export const companyProjectColumns = [
  {
    title: "项目编号",
    dataIndex: "key"
  },
  {
    title: "项目名称",
    dataIndex: "name"
  },
  {
    title: "简称",
    dataIndex: "nickname"
  },
  {
    title: "项目联系信息",
    dataIndex: "parentName"
  },
  {
    title: "楼栋统计",
    dataIndex: "addressDetail"
  },
  {
    title: "资产合计",
    dataIndex: "zIndex"
  },
  {
    title: "系统分库",
    dataIndex: "itemCount"
  },
  {
    title: "关联员工",
    dataIndex: "systemCount"
  },
  {
    title: "状态",
    dataIndex: "status",
    render:(item:number)=>Status[item]
  },
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
]
export const companyColumns = [
  {
    title: "公司logo",
    dataIndex: "key"
  },
  {
    title: "公司名称",
    dataIndex: "name"
  },
  {
    title: "简称",
    dataIndex: "nickname"
  },
  {
    title: "上级公司",
    dataIndex: "parentName"
  },
  {
    title: "公司联系信息",
    dataIndex: "addressDetail"
  },
  {
    title: "系统分库",
    dataIndex: "zIndex"
  },
  {
    title: "下属项目",
    dataIndex: "itemCount"
  },
  {
    title: "系统权限",
    dataIndex: "systemCount"
  },
  {
    title: "短信",
    dataIndex: "smsCount"
  },
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
]