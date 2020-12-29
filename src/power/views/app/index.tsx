import React from "react"
import {Link, withRouter} from "react-router-dom"
import {Layout} from "antd"
import "./index.less"
import { connect } from "react-redux"
import SideBar from "@power/components/SideBar"
import Routers from "@power/routers"
import {getBase, getBaseInfo} from "@power/actions/appAction"
import { bindActionCreators } from "redux"
import Loading from "@public/components/Loading"
import Head from "@power/components/Head"

const { Header, Content, Footer, Sider } = Layout;

interface Props {
  actions:any;
  location?:any;
  base:any;
}

class App extends React.Component<Props> {

  state = {
  }

  componentDidMount(){
    this.props.actions.getBase({})
    this.props.actions.getBaseInfo({systemId: 26}, {refresh: true})
  }

  render() {
    const {location, base} = this.props
    
    return (
      <div className="myApp">
        {base?<Layout>
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
            <Content  className={"content_inner "+ (location.pathname=="/"?"contentBlackBg":"")} >
              <Routers/>
            </Content>
          </Layout>
        </Layout>:<Loading/>}
      </div>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getBase, getBaseInfo}, dispatch)
  }
}

const mapStateToProps = (state:any) => {
  console.log(state)
  return {
    base: state.app.base
  }
}

export default withRouter( connect(mapStateToProps, mapDispatchProps)(App) )