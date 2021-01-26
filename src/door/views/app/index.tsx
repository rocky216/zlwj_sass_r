import React from "react"
import {Button, Layout} from "antd"
import {Link} from "react-router-dom"
import "./index.less"
import SideBar from "@door/components/SideBar"
import Routers from "@door/routers"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getBaseInfo} from "@door/actions/appAction"
import Loading from "@public/components/Loading"

const {Sider, Header, Content } = Layout

interface Props {
  actions:any;
  base:any;
}

class App extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getBaseInfo({systemId:28}, {refresh: true})
  }

  render() {
    const {base} = this.props
    
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
            <Header></Header>
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
    actions: bindActionCreators({getBaseInfo}, dispatch)
  }
}

const mapStateToProps = (state:any)=>{
  console.log(state)
  return {
    base: state.app.base
  }
}

export default connect(mapStateToProps, mapDispatchProps)(App)