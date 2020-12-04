import { InputNumber, Space, Tag } from "antd";
import _ from "lodash";
import React from "react"
import {FuseStatus, FuseStatusColor} from "@public/common/powerMapper"


interface Props {
  value?:any;
  onChange?:(...arg:any)=>void;
}

const FusConf: React.FC<Props> = ({
  value=[
    {fuseStatus: 1, unitTime: 0, unitNum: 0},
    {fuseStatus: 2, unitTime: 0, unitNum: 0},
  ],
  onChange,
})=>{
  let val = _.cloneDeep(value)

  const triggerChange = (v:any,i:number,key:string)=>{
    val[i][key] = v;
    if(onChange){
      onChange(val)
    }
  }

  return (
    <Space direction="vertical">
      {value.map((item:any, index:number)=>(
        <Space key={index} style={{fontSize:12}}>
          <Tag color={FuseStatusColor[item.fuseStatus]} >{FuseStatus[item.fuseStatus]}</Tag>
          <div>
            <InputNumber min={0}  size="small" value={item.unitTime} onChange={(v)=>{
              triggerChange(v, index, "unitTime")
            }} />分钟
          </div>
          <div>
            设备掉线大于<InputNumber style={{width: 60}} min={0} size="small" value={item.unitNum} onChange={(v)=>{
              triggerChange(v, index, "unitNum")
            }} />次
          </div>
        </Space>
      ))}
    </Space>
  )
}


export default FusConf;