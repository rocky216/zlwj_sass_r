import React, { useEffect, useState } from "react"
import { Select } from "antd"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getCompanyProject} from "@admin/actions/appAction"


const {Option} = Select

interface Props {
  actions:any;
  companyproject: any;
  onChange?:(arg1:any)=>void;
  value?: any;
  noAll?:boolean;
  companyId:any;
}

const ProjectElement:React.FC<Props> = ({actions, companyproject, onChange, value, noAll, companyId})=>{

  useEffect(() => {
    if(companyId){
      actions.getCompanyProject({companyId, pageSize: 1000})
    }
    
  }, [companyId])

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
      {companyproject?companyproject.list.map((item:any)=>(
        <Option key={item.id} value={item.id}>{item.name}</Option>
      )):null}
    </Select>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getCompanyProject }, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  return {
    companyproject: state.app.companyproject
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectElement)