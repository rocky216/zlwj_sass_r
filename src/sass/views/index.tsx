import React from "react"
import Routers from "@sass/routers"
import {Route, Switch} from "react-router-dom"


class Index extends React.Component {
  render() {
    return (
      // <Switch>
      //   <Route render={()=><Routers/>} />
      // </Switch>
      <Routers/>
    );
  }
}

export default Index