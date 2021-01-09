import { OnLineType, OnLineTypeColor, Status, StatusColor, ParkState, ValidStatus, ValidStatusColor} from "@public/common/plateMapper"
import { Tag } from "antd"
import React from "react"


export const parkCarColumns = [
  {
    title: "车牌号码",
    dataIndex: "license",
  },
  {
    title: "车辆分类",
    dataIndex: "plateTypeStr",
  },
  {
    title: "有效状态",
    dataIndex: "isValid",
    render:(item:any)=><Tag color={ValidStatusColor[item]}>{ValidStatus[item]}</Tag>
  },
  {
    title: "有效期",
    dataIndex: "expireTime",
  },
  {
    title: "联系人名称",
    dataIndex: "linkName",
  },
  {
    title: "联系电话",
    dataIndex: "linkPhone",
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

export const parkLeaseActiveColumns = [
  {
    title: "活动名称",
    dataIndex: "activityName",
  },
  {
    title: "租赁信息",
    dataIndex: "activityNum",
  },
  {
    title: "租赁价格",
    dataIndex: "activityMoney",
  },
  {
    title: "备注",
    dataIndex: "remark",
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

export const parkLeaseColumns = [
  {
    title: "车位状态",
    dataIndex: "state",
    render:(item:any)=><Tag>{ParkState[item]}</Tag>
  },
  {
    title: "楼层号",
    dataIndex: "floorCode",
  },
  {
    title: "单元号",
    dataIndex: "unitCode",
  },
  {
    title: "区号",
    dataIndex: "areaCode",
  },
  {
    title: "车位编号",
    dataIndex: "seatCode",
  },
  {
    title: "分配车牌",
    dataIndex: "license",
  },
  {
    title: "分配信息",
    dataIndex: "longSeat",
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

export const parkDeviceColumns = [
  {
    title: "在线状态",
    dataIndex: "online",
    render:(item:number)=><Tag color={OnLineTypeColor[item]}>{OnLineType[item]}</Tag>
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
    title: "设备进出分类",
    dataIndex: "in_out"
  },
  {
    title: "设备名称",
    dataIndex: "deviceName"
  },
  {
    title: "设备品牌",
    dataIndex: "deviceBrand"
  },
  {
    title: "关联收费点",
    dataIndex: "siteName"
  },
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "更新信息",
    dataIndex: "updateTime"
  },
  {
    title: "状态",
    dataIndex: "status",
    render:(item:number)=><Tag color={StatusColor[item]}>{Status[item]}</Tag>
  },
  
]

export const parkAccessColumns = [
  {
    title: "工作人员姓名",
    dataIndex: "authName"
  },
  {
    title: "工作人员电话",
    dataIndex: "authPhone"
  },
  {
    title: "备注",
    dataIndex: "remark"
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


export const parkChargeColumns = [
  {
    title: "分组名称",
    dataIndex: "groupName"
  },
  {
    title: "分组收费规则",
    dataIndex: "parkGroupJson",
    render:(item:any[])=>{
      return item.map(elem=>(
        <Tag key={elem.id}>{`${elem.startHour}到${elem.startHour}小时：${elem.amount}元`}</Tag>
      ))
    }
  },
  {
    title: "有效分组车辆",
    dataIndex: "effectiveCount"
  },
  {
    title: "备注",
    dataIndex: "remark"
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

export const parkFeeColumns = [
  {
    title: "收费站点编号",
    dataIndex: "siteCode"
  },
  {
    title: "收费站点名称",
    dataIndex: "siteName"
  },
  {
    title: "备注",
    dataIndex: "remark"
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

export const parkColumns = [
  {
    title: "停车场名称",
    dataIndex: "parkName"
  },
  {
    title: "停车场编号",
    dataIndex: "parkCode"
  },
  {
    title: "状态",
    dataIndex: "status"
  },
  {
    title: "备注",
    dataIndex: "remark"
  },
]