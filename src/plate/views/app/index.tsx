import React from "react"
import {Button, Layout} from "antd"
import Routers from "@plate/routers";
import "./index.less"
import { connect } from "react-redux";
import SideBar from "@plate/components/SideBar";

const { Header, Content, Sider } = Layout;

class App extends React.Component {
  render() {
    
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
            <Header></Header>
            <Content  className={"content_inner "+ (location.pathname=="/" || location.pathname=="/systemhome"?"contentBlackBg":"")} >
              <Routers/>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state:any)=>{
  console.log(state)
  return {

  }
}

export default connect(mapStateToProps)(App)