import React from "react"
import { Select } from "antd"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"



const CompanyElement:React.FC = ()=>{
  return (
    <Select></Select>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyElement)