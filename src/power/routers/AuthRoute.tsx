import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import { Route, RouteProps, Redirect} from "react-router-dom"
import { bindActionCreators } from "redux"
import {setRouteProps} from "@power/actions/appAction"

interface Props extends RouteProps {
  auth:any;
  base:any;
  actions:any;
  level?:any;
}


const AuthRoute:React.FC<Props> = (props)=>{
  

  const gRoute = ()=>{

    if( _.findIndex(props.base.userMenu, (o:any)=>o.menuKey==props.auth)>-1 ){
      props.actions.setRouteProps(props.level)
      if(props.children){
        return <>{props.children}</>
      }
      return <Route {...props}  />
    }
    
    if(props.children){
      return null
    }
    
    return <Redirect to="/error" />
  }

  return  props.base?gRoute():null
}


const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({setRouteProps }, dispatch)
  }
}

const mapStateToProps = (state:any)=>{
  return {
    base: state.app.base
  }
}

export default connect(mapStateToProps, mapDispatchProps)(AuthRoute)