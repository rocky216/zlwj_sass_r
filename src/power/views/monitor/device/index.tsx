import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getDevicesDays, getDeviceSignalTotal, getFusePortTotal, getPowerDevice,
  getPowerSignal, getPowerOffline,  getPowerAvgport, getPowerAvgorder } from "@power/actions/monitorAction"
import { Button, Card, Col, Row, Skeleton, Table, Tabs, Tag } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import CompanyHeSheElement from "@power/components/Element/CompanyHeSheElement";
import {deviceOnlineColumns, deviceSignalColumns, deviceOfflineColumns, devicePortColumns, 
  deviceAvgportColumns, deviceAvgorderColumns } from "../columns/index"
import { Link } from "react-router-dom";
import { OnLineType, OnLineTypeColor } from "@public/common/powerMapper";


interface Props extends IProps {
  onlinePdevice:any;
  powersignal:any;
  poweroffline:any;
  poweravgport:any;
  poweravgorder:any;
}

let params = {
  current: 1,
  companyHe:[],
  shedId:""
}

let oParams = {
  current: 1,
  online: ""
}
let sParams = {
  current: 1,
  online: "",
  signalSort:"",
}
let ofParams = {
  current: 1,
  online: "",
  sortRule:"",
  sortType:""
}

let pParams = {
  current: 1,
  online: ""
}
let apParams = {
  current: 1,
  online: "",
  sortRule:"",
  sortType:""
}
let aoParams = {
  current: 1,
  online: "",
  sortRule:"",
  sortType:""
}


class MonitorDevice extends React.Component<Props> {
  
  state = {
    companyHeId: [],
    devicesignal:"",
    devicefuse:"",
    devicesday:"",
    activeKey: "",
    values: {}
  }

  componentDidMount(){
  }
  initial(params:any){
    this.props.actions.getDeviceSignalTotal(params,{next:(res:any)=>{
      this.setState({devicesignal:res})
    }})
    this.props.actions.getDevicesDays(params,{next:(res:any)=>{
      this.setState({devicesday:res})
    }})
    this.props.actions.getFusePortTotal(params,{next:(res:any)=>{
      this.setState({devicefuse:res})
    }})
  }

  getElement(devicesignal:any,  devicefuse:any, devicesday:any):any[]{
    return [
      {
        key: "online",
        title: <div>{devicefuse.deviceNum}台设备</div>,
        contentL: devicefuse.deviceOnlineNum+"台在线",
        contentR: devicefuse.deviceOfflineNum+"台离线",
      },
      {
        key: "signal",
        title: <div>{devicesignal.signalAvg}平均信号</div>,
        contentL: "小于15 "+devicesignal.signalLeFifteen,
        contentC: devicesignal.signalGeFifteen,
        contentR: "小于25 "+devicesignal.signalGeTwentyFive,
      },
      {
        key: "offline",
        title: <div>{devicesignal.dayNum} 24H掉线</div>,
        contentL: "7日掉线 "+ devicesignal.weekNum,
        contentR: "30日掉线 "+ devicesignal.monthNum,
      },
      {
        key: "port",
        title: <div>{devicefuse.devicePortNum} 端口数量</div>,
        contentL: "使用中 "+ devicefuse.deviceUseNum,
        contentR: "空闲中 "+ devicefuse.deviceFreeNum,
      },
      {
        key: "avgport",
        title: <div>{devicesday.dayAvg} 24H每端口平均单</div>,
        contentL: "7日平均 "+ devicesday.weekAvg,
        contentR: "30日平均 "+ devicesday.monthAvg,
      },
      {
        key: "avgorder",
        title: <div>{devicesday.dayCount} 24H合计订单</div>,
        contentL: "7日订单 "+ devicesday.weekCount,
        contentR: "30日订单 "+ devicesday.monthCount,
      },
    ]
  }

  gData(key:string, tParams: any){
    const {values} = this.state
    this.setState({activeKey: key})
    switch (key){
      case "online":
        this.props.actions.getPowerDevice({...values, ...tParams})
        break;
      case "signal":
        this.props.actions.getPowerSignal({...values, ...tParams})
        break;
      case "offline":
        this.props.actions.getPowerOffline({...values, ...tParams})
        break;
      case "port":
        this.props.actions.getPowerDevice({...values, ...tParams})
        break;
      case "avgport":
        this.props.actions.getPowerAvgport({...values, ...tParams})
        break;
      case "avgorder":
        this.props.actions.getPowerAvgorder({...values, ...tParams})
        break;
    }
  }

  getCol(columns:any[]){
    return [{
      title: "在线状态",
      dataIndex: "online",
      render:(item:any)=><Tag color={OnLineTypeColor[item]}>{OnLineType[item]}</Tag>
    },...columns,{
      title: "操作",
      render:(item:any)=><Link target="_blank" to={`/project/deviceconf/${item.id}/detail/iot`}><Button type="link" size="small">详情</Button></Link>
    }]
  }

  render() {
    const {spinning, utils, onlinePdevice, powersignal, poweroffline, poweravgport, poweravgorder} = this.props
    const {companyHeId, devicesday, devicesignal, devicefuse, activeKey } = this.state

    return (
      <JCard spinning={spinning}> 
        <SearchModular
          initialValues={params}
          submitSearch={ async (values:any)=>{
            await this.setState({devicesday:"", devicesignal:"", devicefuse:"", values, activeKey:""})
            this.initial(values)
          }}
          data={[
            {label: "公司/小区", name: "companyHe", type: <CompanyHeElement onChange={(v)=>this.setState({companyHeId:v})} />, rules: true},
            {label: "充电棚", name: "shedId", type: <CompanyHeSheElement companyHeId={companyHeId} />, rules: true},
          ]}
        />
        <div className="mgt10">
          {devicesday && devicesignal && devicefuse?
            <>
              <Row gutter={15}>
                {this.getElement(devicesignal, devicefuse, devicesday).map((item,index)=>(
                  <Col key={index} span={4}>
                    <Card size="small" bordered={true} hoverable title={item.title} 
                      headStyle={{color: activeKey==item.key?"#1890ff":""}}
                      style={{cursor:"pointer", color: activeKey==item.key?"#1890ff":""}} 
                      onClick={this.gData.bind(this, item.key, {current:1})}>
                      <div style={{display:"flex", justifyContent:"space-between"}}>
                          <div>{item.contentL}</div>
                          <div>{item.contentR}</div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
              
              {activeKey=="online"?
              <Card className="mgt10" size="small">
                <SearchModular
                initialValues={oParams}
                submitSearch={(values:any)=>{
                  oParams = {...oParams, ...values}
                  this.gData(activeKey, oParams)
                }}
                data={[
                  {label:"状态", name: "online", type: "select", selectList: [
                    {label: '全部', id:""},
                    {label: '在线', id:1},
                    {label: '离线', id:0},
                  ]}
                ]}
              />
                <Table size="small" columns={this.getCol(deviceOnlineColumns)} dataSource={onlinePdevice?utils.addIndex(onlinePdevice.list):[]}
                pagination={utils.Pagination(onlinePdevice, page=>{
                  oParams.current = page
                  this.gData(activeKey, oParams)
                })} />
              </Card>:null}
              {activeKey=="signal"?
              <Card className="mgt10" size="small">
                <SearchModular
                  initialValues={sParams}
                  submitSearch={(values:any)=>{
                    sParams = {...sParams, ...values}
                    this.gData(activeKey, sParams)
                  }}
                  data={[
                    {label:"排序", name: "signalSort", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '正序', id:"asc"},
                      {label: '倒序', id:"desc"},
                    ]},
                    {label:"状态", name: "online", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '在线', id:1},
                      {label: '离线', id:0},
                    ]}
                  ]}
                />

                <Table size="small" columns={this.getCol(deviceSignalColumns)} dataSource={powersignal?utils.addIndex(powersignal.list):[]}
                pagination={utils.Pagination(powersignal, page=>{
                  oParams.current = page
                  this.gData(activeKey, sParams)
                })} />
              </Card>:null}

              {activeKey=="offline"?
              <Card className="mgt10" size="small">
                <SearchModular
                  initialValues={ofParams}
                  submitSearch={(values:any)=>{
                    ofParams = {...ofParams, ...values}
                    this.gData(activeKey, ofParams)
                  }}
                  data={[
                    {label:"排序", name: "sortRule", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '正序', id:"asc"},
                      {label: '倒序', id:"desc"},
                    ]},
                    {label:"类型", name: "sortType", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '24小时', id:"twentyFour"},
                      {label: '7天', id:"seven"},
                      {label: '15天', id:"fifteen"},
                      {label: '30天', id:"thirty"},
                    ]},
                    {label:"状态", name: "online", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '在线', id:1},
                      {label: '离线', id:0},
                    ]}
                  ]}
                />
                <Table size="small" columns={this.getCol(deviceOfflineColumns)} dataSource={poweroffline?utils.addIndex(poweroffline.list):[]}
                pagination={utils.Pagination(poweroffline, page=>{
                  oParams.current = page
                  this.gData(activeKey, ofParams)
                })} />
              </Card>:null}

              {activeKey=="port"?
              <Card className="mgt10" size="small">
                <SearchModular
                  initialValues={pParams}
                  submitSearch={(values:any)=>{
                    pParams = {...pParams, ...values}
                    this.gData(activeKey, pParams)
                  }}
                  data={[
                    {label:"状态", name: "online", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '在线', id:1},
                      {label: '离线', id:0},
                    ]}
                  ]}
                />
                <Table size="small" columns={this.getCol(devicePortColumns)} dataSource={onlinePdevice?utils.addIndex(onlinePdevice.list):[]}
                pagination={utils.Pagination(onlinePdevice, page=>{
                  oParams.current = page
                  this.gData(activeKey, pParams)
                })} />
              </Card>:null}

              {activeKey=="avgport"?
              <Card className="mgt10" size="small">
                <SearchModular
                  initialValues={apParams}
                  submitSearch={(values:any)=>{
                    apParams = {...apParams, ...values}
                    this.gData(activeKey, apParams)
                  }}
                  data={[
                    {label:"排序", name: "sortRule", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '正序', id:"asc"},
                      {label: '倒序', id:"desc"},
                    ]},
                    {label:"类型", name: "sortType", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '24小时', id:"twentyFour"},
                      {label: '7天', id:"seven"},
                      {label: '15天', id:"fifteen"},
                      {label: '30天', id:"thirty"},
                    ]},
                    {label:"状态", name: "online", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '在线', id:1},
                      {label: '离线', id:0},
                    ]}
                  ]}
                />
                <Table size="small" columns={this.getCol(deviceAvgportColumns)} dataSource={poweravgport?utils.addIndex(poweravgport.list):[]}
                pagination={utils.Pagination(poweravgport, page=>{
                  oParams.current = page
                  this.gData(activeKey, apParams)
                })} />
              </Card>:null}

              {activeKey=="avgorder"?
              <Card className="mgt10" size="small">
                <SearchModular
                  initialValues={aoParams}
                  submitSearch={(values:any)=>{
                    aoParams = {...aoParams, ...values}
                    this.gData(activeKey, aoParams)
                  }}
                  data={[
                    {label:"排序", name: "sortRule", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '正序', id:"asc"},
                      {label: '倒序', id:"desc"},
                    ]},
                    {label:"类型", name: "sortType", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '24小时', id:"twentyFour"},
                      {label: '7天', id:"seven"},
                      {label: '15天', id:"fifteen"},
                      {label: '30天', id:"thirty"},
                    ]},
                    {label:"状态", name: "online", type: "select", selectList: [
                      {label: '全部', id:""},
                      {label: '在线', id:1},
                      {label: '离线', id:0},
                    ]}
                  ]}
                />
                <Table size="small" columns={this.getCol(deviceAvgorderColumns)} dataSource={poweravgorder?utils.addIndex(poweravgorder.list):[]}
                pagination={utils.Pagination(poweravgorder, page=>{
                  oParams.current = page
                  this.gData(activeKey, aoParams)
                })} />
              </Card>:null}
              
            </>
          :null}
          
        </div>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getDevicesDays, getDeviceSignalTotal, getFusePortTotal, getPowerDevice,
      getPowerSignal, getPowerOffline, getPowerAvgport, getPowerAvgorder}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    poweravgorder:state.monitor.poweravgorder,
    poweravgport:state.monitor.poweravgport,
    poweroffline: state.monitor.poweroffline,
    powersignal: state.monitor.powersignal,
    onlinePdevice: state.monitor.onlinePdevice,
    utils: state.app.utils,
    spinning: state.monitor.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(MonitorDevice)