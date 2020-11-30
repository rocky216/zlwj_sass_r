import React, { useEffect, useState } from "react"
import { Select } from "antd"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getSystems} from "@admin/actions/systemAction"


const {Option} = Select

interface Props {
  actions:any;
  systems: any;
  onChange?:(arg1:any)=>void;
  value?: any;
  noAll?:boolean;
}

const SystemElement:React.FC<Props> = ({actions, systems, onChange, value, noAll})=>{

  useEffect(() => {
    actions.getSystems({pageSize: 1000})
  }, [])

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
      {systems?systems.list.map((item:any)=>(
        <Option key={item.id} value={item.id}>{item.temName}</Option>
      )):null}
    </Select>
  )
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    actions: bindActionCreators({getSystems }, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  return {
    systems: state.system.systems
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemElement)