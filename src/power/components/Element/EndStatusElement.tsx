import React from "react"
import {Select} from "antd"
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { EndStatus } from "@public/common/powerMapper";

const {Option} = Select;


interface Props {
  value?:any;
  onChange?:any;
  notAll?:boolean;
  size?:SizeType;
  style?:any;
}

const EndStatusElement: React.FC<Props> = ({value, onChange, notAll, size, style})=>{
  return (
    <Select size={size} style={style} value={value} onChange={(v)=>{
      if(onChange){
        onChange(v)
      }
    }} >
      {notAll?null:<Option value="" >全部</Option>}
      {EndStatus.map((item,index)=>(
        item?<Option key={index} value={index} >{item}</Option>:null
      ))}
    </Select>
  )
}

export default EndStatusElement