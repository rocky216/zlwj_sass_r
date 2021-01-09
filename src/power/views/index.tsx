import React from "react"
import {Route, Switch, withRouter} from "react-router-dom"
import Login from "@public/pages/login"
import App from "./app";
import "./index.less"





class Index extends React.Component<any> {
  constructor(props:any){
    super(props);
    (window as any)._navigation = props.history;
  }
  
  render() {
    return (
      <Switch>
        {/* <Route path="/plate" component={TestPlate} /> */}
        <Route exact path="/login" component={Login} />
        
        <App/>
      </Switch>
    );
  }
}

export default withRouter(Index);