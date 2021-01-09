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
  label?: string,
  name: string,
  type: any,
  selectList?: selectListProps[];
  initialValue?:any;
  valuePropName?:string;
  notAll?:boolean;
  rules?:any;
}

export const getNode = (item:ItemType)=>{
  switch(item.type){
    case "input":
      return <Input/>
    case "textarea":
      return <TextArea/>
    case "inputNumber":
      return <InputNumber style={{width: "100%"}}/>
    case "datepicker":
      return <DatePicker style={{width: "100%"}}/>
    case "rangepicker":
      return <RangePicker style={{width: "100%"}}/>
    case "select":
      return (
        <Select>
          {item.selectList?.map(elem=>(
            <Option key={elem.id} value={elem.id} >{elem.label}</Option>
          ))}
        </Select>
      )
    case "status":
      return (
        <Select>
          {item.notAll?null:<Option value="">全部</Option>}
          <Option value={1}>启用</Option>
          <Option value={0}>禁用</Option>
        </Select>
      )
  }

  return item.type;
}