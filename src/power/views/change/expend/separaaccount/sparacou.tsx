import React, { useEffect, useState } from "react"
import {getPartnerList } from "@power/actions/changeAction"
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

const Sparacou:React.FC<Props> = ({
  value,
  onChange,
  companyHe,
  actions
})=>{
  const [account, setAccount]:any = useState([])
  const [sum, setSum]:any = useState(0)

  useEffect(()=>{
    if(companyHe && companyHe.length){
      actions.getPartnerList({companyHe}, (res:any)=>{
        setAccount(res)
      })
    }
  }, [companyHe])
  
  const getValue = (arr:any[])=>{
    let newArr:any[] = []
    _.each(arr, item=>{
      newArr.push({
        partnerId: item.id,
        fzFee: item.fzFee,
        remark: item.remark,
      })
    })
    return newArr
  }

  const getCountSum:any = (arr:any[])=>{
    let sum = 0;
    _.each(arr, item=>{
      sum+=item.fzFee||0
    })
    return sum
  }

  const fUnitMoney = (v:any,i:number, key:string)=>{
    account[i][key] = v;
    setAccount(_.cloneDeep(account))
    let s = getCountSum(account);
    setSum(s)
    if(onChange){
      onChange({
        list: getValue(account),
        orderFee: s
      })
    }
  }

  return (
    <>
      <div className="flexend">分账总支出：{sum}</div>

      {account.map((item:any, index:number)=>(
        <div key={index} style={{background: "#eee", padding: 5, marginBottom: 3}} >
          <div className="mgb10" style={{display:"flex", justifyContent: "space-between", lineHeight: "35px"}}>
            <span>{item.partnerName}</span>
            <div>分账金额：<InputNumber min={0} value={item.fzFee} onChange={(v)=>fUnitMoney(v, index, "fzFee")} /></div>
          </div>
          {/* <div>{item.partnerDesc}</div> */}
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
    actions: bindActionCreators({getPartnerList}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Sparacou)