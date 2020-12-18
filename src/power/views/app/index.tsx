import React from "react"
import {Link} from "react-router-dom"
import {Layout} from "antd"
import "./index.less"
import { connect } from "react-redux"
import SideBar from "@power/components/SideBar"
import Routers from "@power/routers"
import {getBase } from "@power/actions/appAction"
import { bindActionCreators } from "redux"

const { Header, Content, Footer, Sider } = Layout;

interface Props {
  actions:any;
  location?:any;
}

class App extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getBase({})
  }

  render() {
    const {location} = this.props
    
    return (
      <div className="myApp">
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
            <Header/>
            <Content  className={"content_inner "+ (location.pathname=="/"?"contentBlackBg":"")} >
              <Routers/>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getBase}, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  console.log(state)
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchProps)(App)