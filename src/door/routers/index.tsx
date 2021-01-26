import React from "react"
import {Switch, Route} from "react-router-dom"
import loadable from 'loadable-components'
import routeData from "./routeData";
// import AuthRoute from "./AuthRoute";
import ErrorPage from "@public/pages/error";

const Home = loadable(() => import('../views/home'))

class Routers extends React.Component {
  render() {
    return (
      <Switch>
        {routeData.map((item:any, index:number)=>(
          item.component?<Route
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

export default Routers