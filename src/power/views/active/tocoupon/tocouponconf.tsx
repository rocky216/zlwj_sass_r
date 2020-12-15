import React, { useEffect, useState } from "react"
import { Button, InputNumber, Select, Space } from "antd"
import {getTocouponConfig } from "@power/actions/activeAction"
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



const Tocouponconf:React.FC<Props> = ({
  value=[],
  onChange,
  actions
})=>{
  const [tocou, setTocou] = useState([])

  useEffect(()=>{
    actions.getTocouponConfig({},(res:any)=>{
      setTocou(res)
    })
  },[])

  const cData = ()=>{
    value.push({
      configId: "",
      couponNum: "",
      rechargeMoney: "",
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
            <Space >
              <div>
                充：<InputNumber min={0} value={item.rechargeMoney} onChange={(v)=>hInput(v,index, "rechargeMoney")} />元
              </div>
              <div style={{display:"flex"}}>
                <div style={{paddingTop: "6px"}}>赠：</div>
                <Select value={item.configId} onChange={(v)=>hChange(v,index)} style={{minWidth: 140}}>
                  {tocou.map((item:any)=>(
                    <Option key={item.id} value={item.id}>{item.couponName}</Option>
                  ))}
                </Select>
              </div>
              <div>
                <InputNumber min={0} value={item.couponNum} onChange={(v)=>hInput(v,index, "couponNum")} />张
              </div>
            </Space>
            
          </Space>
          <Button 
            style={{position:"absolute", top: 15, right:-30}} type="link" size="small" 
            icon={<CloseCircleOutlined style={{fontSize: 20}} 
            onClick={()=>rData(index)}  />}></Button>
        </div>
      ))}
      
    </div>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getTocouponConfig}, dispatch)
  }
}

const mapStateProps = ()=>{
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Tocouponconf);