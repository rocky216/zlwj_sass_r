import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Card, Col, Row, Space, Tabs } from "antd";
import {getConfigRule, getInitInfo, initAllInfo } from "@plate/actions/otherAction"
import SearchModular from "@public/components/Modular/SearchModular";
import CompanyHeElement from "@plate/components/Element/CompanyHeElement";
import DeviceCatch from "./devicecatch"

const {TabPane} = Tabs

interface Props extends IProps {
  configrule:any;
}

let params = {
  companyHe:[]
}

class CacheStatis extends React.Component<Props> {

  state = {
    configs: [
      {title: "停车场基础配置", key: "config"},
      {title: "访客容器信息", key: "visitor"},
      {title: "规则组容器信息", key: "feeGroup"},
      {title: "停车场容器信息", key: "park"},
      {title: "外来车辆容器信息", key: "foreign"},
    ]
  }


  componentDidMount(){
    
  }

  render() {
    const {spinning, utils, configrule} = this.props
    const {configs} = this.state

    return (
      <JCard spinning={spinning}>
        <Tabs type="card" tabBarStyle={{marginBottom: 0}}>
          <TabPane tab="停车场缓存" key="1">
            <Row>
              <Col span={4}>
                <SearchModular
                  before={<Button type="primary" danger  onClick={()=>{
                    this.props.actions.initAllInfo({})
                  }} >初始化</Button>}
                  layout="vertical"
                  initialValues={params}
                  submitSearch={(values:any)=>{
                    params = values
                    this.props.actions.getConfigRule(values, {refresh: true})
                  }}
                  data={[
                    {label: "公司小区", name: "companyHe", type: <CompanyHeElement/>, rules: true}
                  ]}
                />
              </Col>
              {configrule?<Col span={20}>
                {configs.map(item=>(
                  <Card key={item.key} size="small" title={item.title} extra={(
                      <Space>
                        <Button type="primary" onClick={()=>{
                          this.props.actions.getInitInfo({...params, type: item.key}, ()=>{
                            this.props.actions.getConfigRule(params, {refresh: true})
                          })
                        }} >更新缓存</Button>
                      </Space>
                    )} bodyStyle= {{padding: 20,background: "#333"}}>
                      <pre style={{color: "#fff"}}>
                        {JSON.stringify(configrule[item.key], null, 2)}
                      </pre>
                  </Card>
                ))}
              </Col>:null}
            </Row>
          </TabPane>
          <TabPane tab="设备缓存" key="2" >
            <DeviceCatch/>
          </TabPane>
        </Tabs>
        
        
        
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getConfigRule, getInitInfo, initAllInfo }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    configrule: state.other.configrule,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(CacheStatis)