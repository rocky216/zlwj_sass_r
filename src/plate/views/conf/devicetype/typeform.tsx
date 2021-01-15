import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd"
import _ from "lodash";
import React, { useEffect } from "react"


interface Props {
  value?:any;
  onChange?:any;
}

const TypeForm: React.FC<Props> = ({
  value,
  onChange,
})=>{
  
  const addValue = ()=>{
    value.push({
      callbackCode:"",
      callbackUrl:"",
      callbackName:"",
    })
    if(onChange){
      onChange(_.clone(value))
    }
  }
  
  const removeValue = (i:number)=>{
    value.splice(i,1)
    if(onChange){
      onChange(_.clone(value))
    }
  }

  const hChange = (v:any, key:string, i:number)=>{
    value[i][key] = v;
    if(onChange){
      let newValue = _.cloneDeep(value)
      onChange(newValue)
    }
  }
  
  return (
    <div>
      <div className="flexend">
        <Button size="small" type="primary" icon={<PlusOutlined />} onClick={addValue} ></Button>
      </div>
      {value?value.map((item:any, index:number)=>(
        <Space className="mgt10" key={index}>
          <Input addonBefore="key:" value={item.callbackCode} onChange={({target})=>hChange(target.value, "callbackCode", index)} />
          <Input addonBefore="接口URL:" value={item.callbackUrl} onChange={({target})=>hChange(target.value, "callbackUrl", index)} />
          <Input addonBefore="说明:" value={item.callbackName} onChange={({target})=>hChange(target.value, "callbackName", index)} />
          <Button size="small" type="primary" danger icon={<MinusOutlined />} onClick={()=>removeValue(index)} ></Button>
        </Space>
      )):null}
    </div>
  )
}


export default TypeForm