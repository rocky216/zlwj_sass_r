import React from "react"
import {Select} from "antd"
import { SizeType } from "antd/lib/config-provider/SizeContext";

const {Option} = Select;


interface Props {
  value?:any;
  onChange?:any;
  notAll?:boolean;
  size?:SizeType;
}

const StatusElement: React.FC<Props> = ({value, onChange, notAll, size})=>{
  return (
    <Select size={size} value={value} onChange={(v)=>{
      if(onChange){
        onChange(v)
      }
    }} >
      {notAll?null:<Option value="" >全部</Option>}
      <Option value={1} >启用</Option>
      <Option value={0} >禁用</Option>
    </Select>
  )
}

export default StatusElement