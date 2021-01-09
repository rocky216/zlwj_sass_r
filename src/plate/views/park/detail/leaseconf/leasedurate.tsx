import React from "react"
import { InputNumber, Select, Space } from "antd"
import _ from "lodash";

const {Option} = Select;

interface Props {
  value?:any;
  onChange?:any;
}

const Leasedurate: React.FC<Props> = ({
  value={},
  onChange
})=>{

  const hChange = (v:any, key:string)=>{
    value[key]=v
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  return (
    <Space>
      <InputNumber min={0} value={value.activityNum} onChange={(v)=>hChange(v, "activityNum")} />
      <Select value={value.activityType} onChange={(v)=>hChange(v, "activityType")} >
        <Option value={0}>日</Option>
        <Option value={1}>月</Option>
        <Option value={2}>季</Option>
        <Option value={3}>年</Option>
      </Select>
    </Space>
  )
}

export default Leasedurate