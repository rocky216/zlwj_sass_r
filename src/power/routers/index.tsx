import React, {Suspense } from "react"
import {Switch, Route} from "react-router-dom"
import routeData from "./routeData"
import ErrorPage from "@public/pages/error"
import _ from "lodash"
import AuthRoute from "./AuthRoute"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import {setRouteProps} from "@power/actions/appAction"

interface RouteConf {
  path: string;
  componet?: any;
  exact?: boolean;
  key?: string
}

interface Props {
  actions:any;
}


class Routers extends React.Component<Props> {

  render() {
    const {actions} = this.props
    return (
      <Switch>
        {routeData.map((item:any, index:number)=>(
          item.component?<AuthRoute
            key={item.id} 
            auth={item.id}
            level={item.level}
            exact={item.exact} 
            path={item.path} 
            component={item.component} 
            />:null
        ))}
        <Route path="/error" component={ErrorPage} />
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({setRouteProps }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(Routers)