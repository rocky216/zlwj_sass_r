import React from "react"
import Routers from "@door/routers"
import {Route, Switch, withRouter} from "react-router-dom"
import { Layout } from "antd";
import App from "./app";




class Index extends React.Component<any> {
  constructor(props:any){
    super(props);
    
    (window as any)._navigation = props.history;
  }
  render() {
    return (
      <App/>
      
    );
  }
}

export default withRouter(Index)