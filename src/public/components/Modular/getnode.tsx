import React, { ReactNode } from "react"
import {Input, InputNumber, Select, DatePicker} from "antd"
const {TextArea} = Input
const {Option} = Select
const {RangePicker} = DatePicker

interface selectListProps {
  label: string,
  id: any;
}

export interface ItemType {
  label?: ReactNode,
  name: string,
  type: any,
  selectList?: selectListProps[];
  initialValue?:any;
  valuePropName?:string;
  notAll?:boolean;
  rules?:any;
  disabled?:boolean;
}

export const getNode = (item:ItemType)=>{
  switch(item.type){
    case "input":
      return <Input disabled={item.disabled} />
    case "textarea":
      return <TextArea disabled={item.disabled} />
    case "inputNumber":
      return <InputNumber style={{width: "100%"}} disabled={item.disabled} />
    case "datepicker":
      return <DatePicker style={{width: "100%"}} disabled={item.disabled} />
    case "rangepicker":
      return <RangePicker style={{width: "100%"}} disabled={item.disabled} />
    case "select":
      return (
        <Select disabled={item.disabled} >
          {item.selectList?.map(elem=>(
            <Option key={elem.id} value={elem.id} >{elem.label}</Option>
          ))}
        </Select>
      )
    case "status":
      return (
        <Select disabled={item.disabled} >
          {item.notAll?null:<Option value="">全部</Option>}
          <Option value={1}>启用</Option>
          <Option value={0}>禁用</Option>
        </Select>
      )
  }

  return item.type;
}