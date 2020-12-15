import React from "react"
import { InputNumber, Space } from "antd"
import { InputNumberProps } from "antd/lib/input-number";

interface Props extends InputNumberProps {
  unit?:any;
  ident?:any;
}

const InputNumberElement:React.FC<Props> = ({
  unit=null,
  ident=null,
  value,
  onChange
})=>{
  return (
    <div style={{width: "100%"}}>
      <Space >
        {ident}
        <InputNumber value={value} onChange={(v)=>{
          if(onChange){
            onChange(v)
          }
        }} style={{width: "100%"}} />
        {unit}
      </Space>
    </div>
  )
}

export default InputNumberElement;