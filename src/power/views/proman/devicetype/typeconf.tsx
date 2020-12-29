import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import _ from "lodash";
import React, { useEffect } from "react"

interface Props {
  value?:any;
  onChange?:any;
}

const TypeConf:React.FC<Props> = ({
  value=[],
  onChange
})=>{

  useEffect(()=>{
    // if(!value || !value.callbackJson){
    //   if(onChange){
    //     onChange(null)
    //   }
    // }
    console.log(value)
  }, [value])

  const addValue = ()=>{
    value.push({
      callbackCode: "",
      callbackUrl: "",
      callbackName:""
    })

    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  const changeValue = (v:string,i:number, key:string)=>{
    value[i][key] = v
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  return (
    <div>
      <div className="flexend mgb10" >
        <Button ghost type="primary" onClick={addValue} size="small" icon={<PlusOutlined />}></Button>
      </div>
      {value.map((item:any,index:number)=>(
        <Space key={index} className="mgb10" >
        <Space>
          <span>key:</span>
          <Input value={item.callbackCode} onChange={({target})=>changeValue(target.value,index, "callbackCode")} />
        </Space>
        <Space>
          <div style={{width: 60}}>接口URL:</div>
          <Input value={item.callbackUrl} onChange={({target})=>changeValue(target.value,index, "callbackUrl")} />
        </Space>
        <Space>
          <div style={{width: 33}}>说明:</div>
          <Input value={item.callbackName} onChange={({target})=>changeValue(target.value,index, "callbackName")} />
        </Space>
      </Space>
      ))}
      
    </div>
  )
}


export default TypeConf;