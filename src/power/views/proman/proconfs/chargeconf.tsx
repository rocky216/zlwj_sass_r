import { Input, InputNumber, Space } from "antd"
import React, { Fragment, useEffect } from "react"
import {PayType} from "@public/common/powerMapper"
import _ from "lodash"

interface Props {
  value?:any[];
  onChange?:(...arg:any) => void;
}

const Chargeconf:React.FC<Props> = ({
  value=[
    {type: "K", unitMoney: 0, unitTime: 0},
    {type: "G", unitMoney: 0, unitTime: 0},
    {type: "W", unitMoney: 0, unitTime: 0},
  ],
  onChange,
})=>{
  

  const handleChange = (v:any, i:number, key:string)=>{
    let val = _.cloneDeep(value)
    val[i][key] = v;
    if(onChange){
      onChange(val)
    }
    
  }

  return (
    <Space direction="vertical">
        {value?.map((item, index)=>(
          <Space key={index} >
            <div style={{width: 90, textAlign: "right"}}>{PayType[item.type]}</div>
            <div>
              <InputNumber min={0} size="small" value={item.unitMoney} onChange={(v)=>{
                handleChange(v, index, "unitMoney")
              }} />元
            </div>
            <div>
              <InputNumber min={0} size="small" value={item.unitTime} onChange={(v)=>{
                handleChange(v, index, "unitTime")
              }} />分钟
            </div>
          </Space>
        ))}
    </Space>
  )
}

export default Chargeconf;