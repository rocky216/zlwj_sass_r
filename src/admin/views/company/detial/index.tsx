import React from "react"
import {connect} from "react-redux"
import {Switch, Route, Redirect} from "react-router-dom"
import {IProps} from "@public/common/interface"
import {Tabs, Card} from "antd"
import JCard from "@admin/components/JCard";
import CompanyBaseInfo from "./baseinfo"
import CompanyProject from "./companyproject"
import CompanyMessage from "./companymessage"

const {TabPane} = Tabs;

class CompanyDetailPage extends React.Component<IProps> {
  state = {
    tabs: [
      {title: "基础信息", key: "base"},
      {title: "项目列表", key: "project"},
      {title: "短信", key: "message"},
    ]
  }
  render() {
    const {spinning, history, match} = this.props
    
    return (
      <JCard spinning={spinning}>
        <div key="a">
          <Card size="small">
            <Tabs type="card" onChange={(val)=>{
              history.push(`/company/${match.params.id}/detail/${val}`)
            }}>
              {this.state.tabs.map(item=>(
                <TabPane tab={item.title} key={item.key} />
              ))}
            </Tabs>
            <Switch>
              <Route  path={"/company/:id/detail/base"} component={CompanyBaseInfo} />
              <Route  path={"/company/:id/detail/project"} component={CompanyProject} />
              <Route  path={"/company/:id/detail/message"} component={CompanyMessage} />
              <Redirect from="/company/:id/detail" to="/company/:id/detail/base" />
            </Switch>
          </Card>
        </div>
      </JCard>
    );
  }
}


const mapStateProps = (state:any)=>{
  return {
    spinning: state.company.spinning
  }
}

export default connect(mapStateProps)(CompanyDetailPage)