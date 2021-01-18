import React, { useEffect } from "react"
import {getOnlyPark} from "@plate/actions/appAction"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Cascader, Select } from "antd"

const {Option} = Select

interface Props {
  onlypark:any;
  actions:any;
  value?:any;
  onChange?:any;
  companyId?:any;
  itemId?:any;
}

const OnlyParkElement:React.FC<Props> = ({
  onlypark,
  actions,
  value=[],
  onChange,
  companyId,
  itemId
})=>{

  useEffect(()=>{
    if(itemId){
      actions.getOnlyPark({companyId, itemId})
    }
  },[itemId])
  
  return (
    <Select value={value} onChange={(v)=>{
      if(onChange){
        onChange(v)
      }
    }}>
      {onlypark?onlypark.map((item:any)=>(
        <Option key={item.id} value={item.id}>{item.parkName}</Option>
      )):null}
      
    </Select>
  )
}


const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getOnlyPark}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    onlypark: state.app.onlypark
  }
}


export default connect(mapStateProps, mapDispatchProps)(OnlyParkElement)