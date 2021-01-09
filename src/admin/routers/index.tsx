import React, {Suspense } from "react"
import {Switch, Route} from "react-router-dom"
import routeData from "./routeData"
import ErrorPage from "@public/pages/error"
import _ from "lodash"



class Routers extends React.Component {

  

  render() {
    return (
      <Switch>
        {routeData.map((item:any, index:number)=>(
          <Route 
            key={index} 
            exact={item.exact} 
            path={item.path} 
            component={item.component} />
        ))}
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

export default Routers