import React, { useEffect } from "react"
import {Cascader, Select} from "antd"
import {getCompanyHeMeter} from "@power/actions/appAction"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

const {Option} = Select

interface Props {
  actions:any;
  value?:any;
  onChange?:any;
  companyHeId:any[];
  companyhemeter:any;
  notAll?:boolean;
}

const CompanyHeMeter: React.FC<Props> = ({
  value,
  onChange,
  actions,
  companyHeId,
  companyhemeter,
  notAll
})=>{

  useEffect(()=>{
    if(companyHeId.length){
      actions.getCompanyHeMeter({
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
      {notAll?null:<Option value="">选择电表</Option>}
      {companyhemeter?companyhemeter.map((item:any)=>(
        <Option key={item.id} value={item.id}>{item.meterName}</Option>
      )):null}
    </Select>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCompanyHeMeter}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    companyhemeter: state.app.companyhemeter
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyHeMeter)