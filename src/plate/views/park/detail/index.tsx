import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Tabs } from "antd";
import { Route, Switch } from "react-router-dom";
import ParkBase from "./base"
import ParkChargeconf from "./chargeconf"
import ParkAccessconf from "./accessconf"
import ParkDeviceconf from "./device"
import ParkLeaseconf from "./leaseconf"
import CarLeaseconf from "./car"

const {TabPane} = Tabs;

interface Props extends IProps {

}

class ParkDetail extends React.Component<Props> {

  state = {
    tabs: [
      {title: "基础配置", key: "base", component: ParkBase},
      {title: "收费及分组配置", key: "charge", component: ParkChargeconf},
      {title: "通行码权限配置", key: "access", component: ParkAccessconf},
      {title: "设备列表", key: "device", component: ParkDeviceconf},
      {title: "车位及租赁配置", key: "lease", component: ParkLeaseconf},
      {title: "车辆列表", key: "car", component: CarLeaseconf},
    ]
  }

  render() {
    const {spinning, utils, match, history} = this.props
    const {tabs} = this.state

    return (
      <JCard spinning={spinning}> 
        <Tabs type="card"
          tabBarStyle={{marginBottom: 5}}
          tabBarExtraContent={<Button onClick={()=>history.push("/park")} >返回</Button>}
          onChange={(v)=>{
            history.push(`/park/${match.params.id}/detail/${v}`)
          }}
        >
          {tabs.map((item, index)=>(
            <TabPane tab={item.title} key={item.key} />
          ))}
        </Tabs>
        
        <Switch>
          {tabs.map(item=>(
            <Route key={item.key} exact path={"/park/:id/detail/"+item.key} component={item.component} />
          ))}
        </Switch>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ParkDetail)