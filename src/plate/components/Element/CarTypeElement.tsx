import React, { useEffect } from "react"
import { Select } from "antd"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import {getFeeGroup} from "@plate/actions/appAction"

const {Option} = Select

interface Props {
  value?:any;
  onChange?:any;
  actions:any;
  parkId:any;
  feegroup:any;
  notAll?:boolean;
  def?:any;  //查询非自定义分组 1：查默认分组 0：不查
  style?:any;
}

const CarTypeElement:React.FC<Props> = ({
  actions,
  parkId,
  feegroup,
  notAll,
  value,
  onChange,
  def=1,
  style
})=>{

  useEffect(()=>{
    if(parkId){
      actions.getFeeGroup({parkId, def})
    }
  }, [parkId])

  return (
    <Select style={style} value={value} onChange={(v)=>{
      if(onChange){
        onChange(v)
      }
    }} >
      {notAll?null:<Option value="">全部</Option>}
      {feegroup?feegroup.map((item:any)=>(
        <Option key={item.value} value={item.value} >{item.name}</Option>
      )):null}
    </Select>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getFeeGroup}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    feegroup: state.app.feegroup
  }
}

export default connect(mapStateProps, mapDispatchProps)(CarTypeElement)