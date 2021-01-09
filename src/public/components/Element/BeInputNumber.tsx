import React, {ReactNode} from "react"
import { Input, InputNumber } from "antd"
import { InputNumberProps } from "antd/lib/input-number"

interface Props extends InputNumberProps {
  suffix?: ReactNode
}

const BeInputNumber:React.FC<Props> = ({
  suffix,
  prefix,
  value,
  onChange,
  readOnly,
  disabled
})=>{



  return (
    <div>
      <span style={{display:"flex"}}>
        {prefix?<span style={{whiteSpace: "nowrap", textAlign: "center", position: "relative", padding: "5px 5px"}} >{prefix}</span>:null}
        <InputNumber readOnly={readOnly} disabled={disabled} value={value} style={{width: "100%"}} onChange={(v)=>{
          if(onChange){
            onChange(v)
          }
        }} />
        {suffix?<span style={{whiteSpace: "nowrap", textAlign: "center", position: "relative", padding: "5px 5px"}}>{suffix}</span>:null}
      </span>
      </div>
  )
}

export default BeInputNumber