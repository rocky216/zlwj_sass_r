import React from "react"
import JCard from "@admin/components/JCard"
import { connect } from "react-redux";
import {IProps} from "@public/common/interface"
import { Button, Tabs } from "antd"
import { Link, Switch, Route} from "react-router-dom";
import UserBaseInfo from "./base"
import UserBalance from "./balance"
import UserAuth from "./userauth"

const {TabPane} = Tabs;

class UserDetailPage extends React.Component<IProps> {

  state = {
    tabs: [
      {title: "基础信息", key: "base"},
      {title: "余额积分", key: "balance"},
      {title: "系统权限", key: "auth"},
    ]
  }

  render() {
    const {spinning, history, match} = this.props
    const {tabs} = this.state

    return (
      <JCard spinning={spinning} >
        <Tabs type="card" tabBarExtraContent={(
          <Link to="/users"><Button>返回</Button></Link>
        )} onChange={(v)=>{
          console.log(v)
          history.push(`/users/${match.params.id}/detail/${match.params.temId}/${v}`)
        }} >
          {tabs.map(item=>(
            <TabPane tab={item.title} key={item.key} />
          ))}
        </Tabs>
        <Switch>
          <Route path="/users/:id/detail/:temId/base" component={UserBaseInfo} />
          <Route path="/users/:id/detail/:temId/balance" component={UserBalance} />
          <Route path="/users/:id/detail/:temId/auth" component={UserAuth} />
        </Switch>
      </JCard>
    );
  }
}

const mapStateProps = (state:any)=>{
  return {
    spinning: state.user.spinning
  }
}

export default connect(mapStateProps)(UserDetailPage)