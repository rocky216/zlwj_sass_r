import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getPowerMonitorOrder } from "@power/actions/monitorAction"
import { Card, Col, Row, Table, Tabs } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import CompanyHeSheElement from "@power/components/Element/CompanyHeSheElement";
import moment from "moment"
import {orderMonitorColumns} from "../columns"


interface Props extends IProps {
  monitororder:any;
}

let params = {
  current: 1,
  companyHe:[],
  rtime:[moment().subtract(30,"days"),moment()],
  shedId:"",
  status:"",
  orderStatus:""
}

class MonitorOrder extends React.Component<Props> {
  
  state = {
    activeKey: ""
  }

  componentDidMount(){
    this.props.actions.getPowerMonitorOrder(params)
  }

  getElement(map:any):any[]{
    return [
      {
        key: "1",
        span: 2,
        title: <div>{map.inTheCharging}充电中</div>,
      },
      {
        key: "2",
        span: 10,
        title: <div>{map.normalOrder}正常订单</div>,
        contentL: "时间到"+map.timeOut,
        contentR1: "负载丢失"+map.theLoadLoss,
        contentR2: "手动停止"+map.manualStop,
        contentR3: "正常充饱"+map.normalFullOf,
        contentR: "涓流结束"+map.trickleOver,
      },
      {
        key: "3",
        span: 4,
        title: <div>{map.exceptionOrder} 订单异常结束</div>,
        contentL: "7日掉线 "+ map.endOfOverload,
        contentR: "30日掉线 "+ map.resetToRestart,
      },
      {
        key: "4",
        span: 4,
        title: <div>{map.createLose} 订单创建失败</div>,
        contentL: "使用中 "+ map.nonLoaded,
        contentR: "空闲中 "+ map.deviceBusy,
      },
      {
        key: "5",
        span: 2,
        title: <div>{map.orderTimeout} 订单超时</div>,
      },
      {
        key: "6",
        span: 2,
        title: <div>{map.haveReset} 订单有重启</div>,
      },
    ]
  }

  render() {
    const {spinning, utils, monitororder} = this.props
    const {activeKey} = this.state

    return (
      <JCard spinning={spinning}> 
        <SearchModular
          initialValues={params}
          submitSearch={(values:any)=>{

          }}
          data={[
            {label: "公司/项目", name: "companyHe", type: <CompanyHeElement/>},
            {label: "公司/项目", name: "rtime", type: "rangepicker"}
          ]}
        />
        {monitororder?
        <>
          <Row gutter={15} className="mgt10 mgb10">
            {this.getElement(monitororder.map).map((item,index)=>(
              <Col key={index} span={item.span}>
                <Card size="small" bordered={true} hoverable title={item.title} 
                  headStyle={{color: activeKey==item.key?"#1890ff":""}}
                  style={{cursor:"pointer", color: activeKey==item.key?"#1890ff":""}} 
                  onClick={()=>{
                    this.setState({activeKey: item.key})
                    params.orderStatus = item.key
                    params.status = ""
                    this.props.actions.getPowerMonitorOrder(params)
                  }}
                  >
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                      <div>{item.contentL}</div>
                      <div>{item.contentR1}</div>
                      <div>{item.contentR2}</div>
                      <div>{item.contentR3}</div>
                      <div>{item.contentR}</div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          {activeKey=="2"?
          <SearchModular
            initialValues={params}
            submitSearch={(values:any)=>{
              params.status = values.status
              this.props.actions.getPowerMonitorOrder(params)
            }}
            data={[
              {label: "状态", name: "status", type: "select", selectList:[
                {label: "全部", id: ""},
                {label: "时间到结束", id: 4},
                {label: "负载丢失结束", id: 3},
                {label: "手动停止订单", id: 2},
                {label: "正常充饱结束", id: 1},
                {label: "涓流充电时掉电", id: 6},
              ]}
            ]}
          />:null}
          {activeKey=="3"?
          <SearchModular
            initialValues={params}
            submitSearch={(values:any)=>{
              params.status = values.status
              this.props.actions.getPowerMonitorOrder(params)
            }}
            data={[
              {label: "状态", name: "status", type: "select", selectList:[
                {label: "全部", id: ""},
                {label: "过载结束", id: 6},
                {label: "复位重启结束充电", id: 7},
              ]}
            ]}
          />:null}
          {activeKey=="4"?
          <SearchModular
            initialValues={params}
            submitSearch={(values:any)=>{
              params.status = values.status
              this.props.actions.getPowerMonitorOrder(params)
            }}
            data={[
              {label: "状态", name: "status", type: "select", selectList:[
                {label: "全部", id: ""},
                {label: "设备忙", id: 2},
                {label: "订单无负载启动不成功", id: 3},
              ]}
            ]}
          />:null}
          <Table size="small" bordered columns={orderMonitorColumns} dataSource={monitororder?utils.addIndex(monitororder.list):[]} 
          pagination={utils.Pagination(monitororder, page=>{
            params.current = page
            this.props.actions.getPowerMonitorOrder(params)
          })} />
        </>:null}
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getPowerMonitorOrder}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    monitororder: state.monitor.monitororder,
    utils: state.app.utils,
    spinning: state.monitor.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(MonitorOrder)