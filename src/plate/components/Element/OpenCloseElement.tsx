import React from "react"
import { Radio } from "antd"


interface Props {
  value?:any;
  onChange?:any;
}

const OpenCloseElement:React.FC<Props> = ({
  value,
  onChange
})=>{
  return (
    <Radio.Group  onChange={({target})=>{
      if(onChange){
        onChange(target.value)
      }
    }} value={value}>
      <Radio value={1}>开启</Radio>
      <Radio value={0}>不开启</Radio>
    </Radio.Group>

  )
}

export default OpenCloseElement