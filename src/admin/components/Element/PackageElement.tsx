import React, { useEffect, useState } from "react"
import { Select } from "antd"
import { connect } from "react-redux"
import {IState} from "@public/common/interface"
import { bindActionCreators } from "redux"
import {getSystemPackage} from "@admin/actions/appAction"


const {Option} = Select

interface Props {
  actions:any;
  systemPackage: any;
  onChange?:(arg1:any)=>void;
  value?: any;
  systemId:any;
}

const PackageElement:React.FC<Props> = ({actions, systemPackage, onChange, value, systemId})=>{

  useEffect(() => {
    if(systemId){
      actions.getSystemPackage({systemId, pageSize: 100})
    }
    
  }, [systemId])

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
      {systemPackage?systemPackage.map((item:any)=>(
        <Option key={item.id} value={item.id}>{item.packageName}</Option>
      )):null}
    </Select>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getSystemPackage }, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  return {
    systemPackage: state.app.systemPackage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageElement)