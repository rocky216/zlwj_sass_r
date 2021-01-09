import BeInputNumber from "@public/components/Element/BeInputNumber"
import { Input, InputNumber, Space } from "antd"
import _ from "lodash"
import React from "react"


interface Props {
  value?:any;
  onChange?:any;
}

const ParkLot:React.FC<Props> = ({
  value={prefix:"",startIndex:"", endIndex:""},
  onChange
})=>{

  const hChange = (v:any, key:string)=>{
    console.log(v)
    value[key] = v;
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  return (
    <div>
      <Space>
        <Space><div style={{width: 28}}>前缀</div><Input value={value.prefix} onChange={({target})=>hChange(target.value, "prefix")} /></Space>
        <Space><BeInputNumber prefix="序号" value={value.startIndex} onChange={(v)=>hChange(v, "startIndex")} /></Space>
        <Space>-<InputNumber value={value.endIndex} onChange={(v)=>hChange(v, "endIndex")} /></Space>
      </Space>
    </div>
  )
}


export default ParkLot