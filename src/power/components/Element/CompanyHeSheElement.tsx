import React, { useEffect } from "react"
import {Cascader, Select} from "antd"
import {getCompanyHeShe} from "@power/actions/appAction"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

const {Option} = Select

interface Props {
  actions:any;
  value?:any;
  onChange?:any;
  companyHeId:any[];
  companyheshe:any;
  notAll?:boolean;
}

const CompanyHeSheElement: React.FC<Props> = ({
  value,
  onChange,
  actions,
  companyHeId,
  companyheshe,
  notAll
})=>{

  useEffect(()=>{
    if(companyHeId.length){
      actions.getCompanyHeShe({
        companyId: companyHeId[0] || "",
        itemId: companyHeId[1] || ""
      })
      onChange("")
    }
  }, [companyHeId])

  return (
    <Select value={value} onChange={(v)=>{
      if(onChange){
        onChange(v)
      }
    }}>
      {notAll?null:<Option value="">选择充电棚</Option>}
      {companyheshe?companyheshe.map((item:any)=>(
        <Option key={item.id} value={item.id}>{item.shedName}</Option>
      )):null}
    </Select>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCompanyHeShe}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    companyheshe: state.app.companyheshe
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyHeSheElement)