import React, { useEffect, useState } from "react"
import { Button, InputNumber, Select, Space } from "antd"
import {getVipCouponConfig } from "@power/actions/activeAction"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { CloseCircleOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import _ from "lodash"

const {Option} = Select

interface Props {
  actions:any;
  value?:any[];
  onChange?:any;
}



const Memcerconf:React.FC<Props> = ({
  value=[],
  onChange,
  actions
})=>{
  const [vipcou, getVipcou] = useState([])

  useEffect(()=>{
    actions.getVipCouponConfig({},(res:any)=>{
      getVipcou(res)
    })
  },[])

  const cData = ()=>{
    value.push({
      configId: "",
      vipMoney: "",
      vipDayMin: "",
    })
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }
  const hChange = (v:any, index:number)=>{
    value[index]["configId"] = v
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  const hInput = (v:any,index:number, key:string)=>{
    value[index][key] = v
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  const rData = (index:number)=>{
    value.splice(index,1)
    if(onChange){
      onChange(_.cloneDeep(value))
    }
  }

  return (
    <div>
      <div className="flexend">
        <Button onClick={cData} className="mgb10" type="primary" size="small" icon={<PlusOutlined />}></Button></div>
      
      {value.map((item,index)=>(
        <div className="mgb10" key={index} style={{background: "#eee", padding: 10, position:"relative"}}>
          <Space direction="vertical">
            <div style={{display:"flex"}}>
              <div style={{width: 70}}>会员劵：</div>
              <Select value={item.configId} onChange={(v)=>hChange(v,index)}>
                {vipcou.map((item:any)=>(
                  <Option key={item.id} value={item.id}>{item.couponName}</Option>
                ))}
              </Select>
            </div>
            <Space>
              <div>
                价格：<InputNumber min={0} value={item.vipMoney} onChange={(v)=>hInput(v,index, "vipMoney")} />元
              </div>
              <div>
                每日：<InputNumber min={0} value={item.vipDayMin} onChange={(v)=>hInput(v,index, "vipDayMin")} />分钟
              </div>
            </Space>
          </Space>
          <Button 
            style={{position:"absolute", top: 30, right:-30}} type="link" size="small" 
            icon={<CloseCircleOutlined style={{fontSize: 20}} 
            onClick={()=>rData(index)}  />}></Button>
        </div>
      ))}
      
    </div>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getVipCouponConfig}, dispatch)
  }
}

const mapStateProps = ()=>{
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Memcerconf);