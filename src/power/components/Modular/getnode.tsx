import React from "react"
import {Input, InputNumber} from "antd"
const {TextArea} = Input

export interface ItemType {
  label?: string,
  name: string,
  type: any,
  selectList?: any[];
  initialValue?:any;
}

export const getNode = (item:ItemType)=>{
  switch(item.type){
    case "input":
      return <Input/>
    case "textarea":
      return <TextArea/>
    case "inputNumber":
      return <InputNumber/>
  }

  return item.type;
}