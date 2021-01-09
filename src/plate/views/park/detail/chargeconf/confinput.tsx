import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import BeInputNumber from "@public/components/Element/BeInputNumber"
import { Button, InputNumber } from "antd"
import _ from "lodash"
import React, { useEffect } from "react"

interface Props {
  value?: any[];
  onChange?:any;
}

const Chargeconf:React.FC<Props> = ({
  value=[],
  onChange
})=>{

  const addRule = ()=>{
    value.push({
      startHour: 0,
      endHour: 0,
      amount: 0,
    })
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  const deleteRule = (i:number)=>{
    value.splice(i,1)
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  const hChange = (v:any, key:string, i:number)=>{
    if(value && onChange){
      value[i][key] = v
      onChange(_.cloneDeep(value))
    }
  }

  return (
    <div>
      <div className="flexend mgb10">
        <Button size="small" type="primary" ghost onClick={addRule}  ><PlusOutlined /></Button>
      </div>
      {value?value.map((item,index)=>(
        <div className="mgb10" key={index} style={{display: 'flex'}}>
          <BeInputNumber prefix="开始小时" value={item.startHour} onChange={(v)=>hChange(v,"startHour",index)} />
          <BeInputNumber prefix="结束小时" value={item.endHour} onChange={(v)=>hChange(v,"endHour",index)} />
          <BeInputNumber  prefix="收费金额" suffix="元" value={item.amount} onChange={(v)=>hChange(v,"amount",index)} />
          <Button style={{marginTop:5}} size="small" type="link" onClick={()=>deleteRule(index)} ><DeleteOutlined /></Button>
        </div>
      )):null}
      
    </div>
  )
}

export default Chargeconf