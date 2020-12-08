import React from "react"
import { Button, Input, Space } from "antd"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import _ from "lodash"

interface DataItemProps {
  cardNo:string;
  idNumber:string;
  icNumber:string;
}

interface Props {
  value?: any[],
  onChange?:any;
}

const CardList:React.FC<Props> = ({
  value=[],
  onChange
})=>{

  const addCard = ()=>{
    value.push({
      cardNo: "",
      idNumber: "",
      icNumber: "",
    })
    
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  const deleteCard = (i:number)=>{
    value.splice(i, 1)
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  const hChange = (i:number,key:string, val:string)=>{
    value[i][key] = val
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  

  return(
    <div>
      <Button onClick={addCard} type="primary" className="mgb10" size="small" icon={<PlusOutlined />}></Button>
      <Space direction="vertical">
        {value.map((item,index)=>(
          <Space key={index}>
            <Input size="small" onChange={({target})=>hChange(index, "cardNo", target.value)} value={item.cardNo} placeholder="系统卡号" />
            <Input size="small" onChange={({target})=>hChange(index, "icNumber", target.value)} value={item.icNumber} placeholder="IC卡号" />
            <Input size="small" onChange={({target})=>hChange(index, "idNumber", target.value)} value={item.idNumber} placeholder="ID卡号" />
            <Button onClick={()=>deleteCard(index)} size="small" ghost type="primary" icon={<DeleteOutlined />}></Button>
          </Space>
        ))}
      </Space>
      
      
    </div>
  )
}

export default CardList