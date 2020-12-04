import React from "react"
import {Input, InputNumber, Select} from "antd"
const {TextArea} = Input
const {Option} = Select

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
}

export const getNode = (item:ItemType)=>{
  switch(item.type){
    case "input":
      return <Input/>
    case "textarea":
      return <TextArea/>
    case "inputNumber":
      return <InputNumber style={{width: "100%"}}/>
    case "select":
      return (
        <Select>
          {item.selectList?.map(elem=>(
            <Option key={elem.id} value={elem.id} >{elem.label}</Option>
          ))}
        </Select>
      )
  }

  return item.type;
}