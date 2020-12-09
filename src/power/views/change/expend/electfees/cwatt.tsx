import React, { useEffect, useState } from "react"
import {getWatts } from "@power/actions/changeAction"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Space, Descriptions, Input, InputNumber} from "antd"
import _ from "lodash"

const {TextArea} = Input

interface Props {
  actions:any;
  value?:any;
  onChange?:any;
  companyHe:any[];
}

const CWatt:React.FC<Props> = ({
  value,
  onChange,
  companyHe,
  actions
})=>{
  const [watts, setWatts]:any = useState([])
  const [addNumber, setAddNumber] = useState(0)
  const [beforeNumber, setSeforeNumber] = useState(0)

  useEffect(()=>{
    if(companyHe && companyHe.length){
      actions.getWatts({companyHe}, (res:any)=>{
        setWatts(res)
      })
    }
  }, [companyHe])
  
  const getValue = (arr:any[])=>{
    let newArr:any[] = []
    _.each(arr, item=>{
      newArr.push({
        id: item.id,
        degree: item.degree,
        remake: item.remake
      })
    })
    return newArr
  }

  const getCountSum:any = (arr:any[])=>{
    let sum = 0;
    let befSum=0
    _.each(arr, item=>{
      sum+=item.degree||0
      befSum += item.nowDegrees || 0
    })
    return {sum,befSum}
  }

  const fUnitMoney = (v:any,i:number, key:string)=>{
    watts[i][key] = v;
    setWatts(_.cloneDeep(watts))
    setAddNumber(getCountSum(watts).sum)
    setSeforeNumber(getCountSum(watts).befSum)
    if(onChange){
      onChange( {
        electricSum: getValue(watts),
        addNumber,
        beforeNumber
      } )
    }
  }

  return (
    <>
      <div className="flexend">合计新增总数：{addNumber}</div>

      {watts.map((item:any, index:number)=>(
        <div key={index} style={{background: "#eee", padding: 5, marginBottom: 3}} >
          <div className="mgb10" style={{display:"flex", justifyContent: "space-around", lineHeight: "35px"}}>
            <span>{item.meterName}</span>
            <div>{item.nowDegrees}°</div>
            <div>电价：{item.unitMoney}</div>
            <div>抄表后度数：<InputNumber min={0} style={{width: 50}} value={item.degree} onChange={(v)=>fUnitMoney(v, index, "degree")} /></div>
          </div>
          <div>
            <TextArea value={item.remark} placeholder="备注" onChange={({target})=>fUnitMoney(target.value, index, "remark")} style={{width: "100%"}} />
          </div>
        </div>
      ))}
    </>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getWatts}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(CWatt)