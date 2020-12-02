import React from "react"
import {Link} from "react-router-dom"
import {Layout} from "antd"
import "./index.less"
import { connect } from "react-redux"
import SideBar from "@power/components/SideBar"
import Routers from "@power/routers"

const { Header, Content, Footer, Sider } = Layout;


class App extends React.Component {
  render() {
    
    return (
      <div className="myApp">
        <Layout>
          <Sider>
            <div className="logo"  />
            <SideBar/>
          </Sider>
          <Layout className="content">
            <Header/>
            <Content className="content_inner" >
              <Routers/>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state:any) => {
  console.log(state)
  return {
    
  }
}

export default connect(mapStateToProps)(App)