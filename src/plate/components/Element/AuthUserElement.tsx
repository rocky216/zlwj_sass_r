
import React, { useEffect } from "react"
import { Select } from "antd"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getAuthUser} from "@plate/actions/appAction"

const {Option} = Select

interface Props {
  authuser:any;
  actions:any;
  value?:any;
  onChange?:any;
  notAll?:boolean;
}

const AuthUserElement: React.FC<Props> = ({
  actions,
  authuser,
  value,
  onChange,
  notAll
})=>{

  useEffect(()=>{
    actions.getAuthUser({})
  }, [])

  return (
    <Select value={value} onChange={(v)=>{
      if(onChange){
        onChange(v)
      }
    }}>
      {notAll?null:<Option value="">全部</Option>}
      {authuser?authuser.map((item:any)=>(
        <Option key={item.id} value={item.id}>{item.authName}</Option>
      )):null}
    </Select>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getAuthUser}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    authuser: state.app.authuser
  }
}

export default connect(mapStateProps, mapDispatchProps)(AuthUserElement)