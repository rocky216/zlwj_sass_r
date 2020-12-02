import React, { useEffect, useState } from "react"
import { Select } from "antd"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getCompanyRole} from "@admin/actions/appAction"


const {Option} = Select

interface Props {
  actions:any;
  companyRole: any;
  onChange?:(arg1:any)=>void;
  value?: any;
  noAll?:boolean;
  companyId:any;
  systemId?:any;
}

const RoleElement:React.FC<Props> = ({actions, companyRole, onChange, value, noAll, companyId, systemId})=>{

  useEffect(() => {
    console.log(systemId)
    actions.getCompanyRole({
      companyId,
      systemId,
    })
  }, [companyId, systemId])

  const hanleChange = (val:any)=>{
    if(onChange){
      onChange(val);
    }
  }

  return (
    <Select
      style={{minWidth: 100}}
      showSearch
      filterOption={(input, option:any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      value={value}
      onChange={hanleChange}
    >
      {noAll?null:<Option value="">全部</Option>}
      {companyRole?companyRole.map((item:any)=>(
        <Option key={item.id} value={item.id}>{item.roleName}</Option>
      )):null}
    </Select>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getCompanyRole }, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  return {
    companyRole: state.app.companyRole
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleElement)