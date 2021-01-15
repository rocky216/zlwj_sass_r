import React, { useEffect } from "react"
import {getParkAll} from "@plate/actions/appAction"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Cascader } from "antd"

interface Props {
  allpark:any;
  actions:any;
  value?:any;
  onChange?:any;
}

const ParkElement:React.FC<Props> = ({
  allpark,
  actions,
  value=[],
  onChange
})=>{

  useEffect(()=>{
    actions.getParkAll({})
  },[])
  
  return <Cascader options={allpark?allpark:[]} 
      value={value}
      fieldNames={{ label: 'parkName', value: 'id', children: 'children' }}
      onChange={(v)=>{
        if(onChange){
          onChange(v)
        }
      }}
    /> 
}


const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getParkAll}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    allpark: state.app.allpark
  }
}


export default connect(mapStateProps, mapDispatchProps)(ParkElement)