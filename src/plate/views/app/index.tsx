import React from "react"
import {Button, Layout} from "antd"
import Routers from "@plate/routers";
import "./index.less"
import { connect } from "react-redux";
import SideBar from "@plate/components/SideBar";
import {getBaseInfo, companyItemInitial} from "@plate/actions/appAction"
import { bindActionCreators } from "redux";
import Loading from "@public/components/Loading"
import Head from "@plate/components/Head";
import { withRouter } from "react-router-dom";

const { Header, Content, Sider } = Layout;

interface Props {
  actions:any;
  base:any;
  location:any;
}

class App extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.companyItemInitial({})
    this.props.actions.getBaseInfo({systemId: 27}, {refresh: true})
  }

  render() {
    const {base, location} = this.props
    
    return (
      base?<div className="myApp">
        <Layout>
        <Sider
            style={{
              overflow: 'auto',
              height: '100vh', 
              position: 'fixed',
              left: 0,
            }}
          >
            <div className="logo"  />
            <SideBar/>
          </Sider>
          <Layout className="content" style={{ marginLeft: 200}}>
            <Header><Head/></Header>
            <Content  className={"content_inner "+ (location.pathname=="/" || location.pathname=="/systemhome"?"contentBlackBg":"")} >
              <Routers/>
            </Content>
          </Layout>
        </Layout>
      </div>:<Loading/>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getBaseInfo, companyItemInitial}, dispatch)
  }
}

const mapStateToProps = (state:any)=>{
  console.log(state)
  return {
    base: state.app.base
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchProps)(App) ) 