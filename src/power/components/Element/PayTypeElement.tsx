import React from "react"
import {Select} from "antd"
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { PayType } from "@public/common/powerMapper";

const {Option} = Select;


interface Props {
  value?:any;
  onChange?:any;
  notAll?:boolean;
  size?:SizeType;
}

const PayTypeElement: React.FC<Props> = ({value, onChange, notAll, size})=>{
  return (
    <Select size={size} value={value} onChange={(v)=>{
      if(onChange){
        onChange(v)
      }
    }} >
      {notAll?null:<Option value="" >全部</Option>}
      {PayType.map((item,index)=>(
        item?<Option key={index} value={index} >{item}</Option>:null
      ))}
    </Select>
  )
}

export default PayTypeElement