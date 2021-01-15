import { Select } from "antd"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getAllDevice} from "@plate/actions/appAction"

const {Option} = Select

interface Props {
  alldevice:any;
  value?:any;
  onChange?:any;
  actions:any;
  notAll?:boolean;
}

const AllDeviceElement:React.FC<Props> = ({
  alldevice,
  value,
  onChange,
  actions,
  notAll
})=>{

  useEffect(()=>{
    actions.getAllDevice({})
  },[])

  return (
    <Select value={value} onChange={(v)=>{
      if(onChange){
        onChange(v)
      }
    }} >
      {notAll?null:<Option value="">全部</Option>}
      {alldevice?alldevice.map((item:any)=>(
        <Option key={item.id} value={item.typeCode}>{item.typeName}</Option>
      )):null}
    </Select>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getAllDevice}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    alldevice: state.app.alldevice
  }
}

export default connect(mapStateProps, mapDispatchProps)(AllDeviceElement)