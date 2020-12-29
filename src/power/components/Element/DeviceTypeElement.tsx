import React, { useEffect } from "react"
import { Select } from "antd"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getDeviceTypeList} from "@power/actions/appAction"


const {Option} = Select

interface Props {
  actions:any;
  value?:any;
  onChange?:any;
  devicetype:any[];
}

const DeviceTypeElement:React.FC<Props> = ({
  actions,
  devicetype,
  value,
  onChange
})=>{

  useEffect(()=>{
    actions.getDeviceTypeList({})
  }, [])

  return (
    <Select value={value} onChange={(v)=>{
      if(onChange){
        onChange(v)
      }
    }}>
      {devicetype?devicetype.map(item=>(
        <Option key={item.id} value={item.typeCode} >{item.typeName}</Option>
      )):null}
    </Select>
  )
}


const mapDispatchProps = (dispatch: any)=>{
  return {
    actions: bindActionCreators({getDeviceTypeList}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    devicetype: state.app.devicetype
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceTypeElement) 