import React from "react"
import {Route, Switch} from "react-router-dom"
import Login from "@public/pages/login"
import App from "./app";
import "./index.less"




class Index extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <App/>
      </Switch>
    );
  }
}

export default Index;