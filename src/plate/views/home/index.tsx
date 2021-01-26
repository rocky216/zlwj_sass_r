import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Col, Row, Skeleton, Space, Tag, Typography } from "antd";
import "./index.less"
import {getDeviceOnline, getPlateNum, getPassPlate, getDeiveList, getPassLog, getPassTwentyFour,
  getOrderInfoMoney, getWeekSumMoney, getWeekPass, changeHomeData } from "@plate/actions/homeAction"
import { CarPayStatus, CarStatus, OnLineType, OnLineTypeColor, PassType } from "@public/common/plateMapper";
import StackColumnChart from "@plate/components/Charts/StackColumnChart";
import _ from "lodash";
import ReconnectingWebSocket from "reconnecting-websocket";

const {Title } = Typography

const rootRef = React.createRef<HTMLDivElement>()

interface Props extends IProps {
  online:any;
  plateNum:any;
  passplate:any;
  devicelist:any;
  passlog:any;
  twentyFour:any;
  todaypay:any;
  weeksum:any;
  weekpass:any;
  base:any;
}

let params = {
  type: "item"
}


class HomePage extends React.Component<Props> {
  rws:any;

  componentDidMount(){
    this.props.actions.getWeekPass(params)
    this.props.actions.getWeekSumMoney(params)
    this.props.actions.getOrderInfoMoney(params)
    this.props.actions.getPassTwentyFour(params)
    this.props.actions.getPassLog(params)
    this.props.actions.getDeiveList(params)
    this.props.actions.getDeviceOnline(params)
    this.props.actions.getPlateNum(params)
    this.props.actions.getPassPlate(params)
    this.getsoket()
  }

  componentWillUnmount(){
    this.rws.close();
  }

  getsoket(){
    this.rws = new ReconnectingWebSocket('ws://192.168.1.40:4959');
    this.rws.addEventListener('open', () => {
      let params = {
        data: {
          itemId:this.props.base.nowItemId,
          companyId:this.props.base.nowCompanyId,
        },
        cmd: "cut_item",
        status: "1"
      }
      this.rws.send( JSON.stringify(params) );
      
    });
    this.rws.addEventListener("message", (values:any)=>{
      this.props.actions.changeHomeData( JSON.parse(values.data) )
    })
  }

  render() {
    const {spinning, utils, online, plateNum, passplate, devicelist, passlog, twentyFour,
      todaypay, weeksum, weekpass, base } = this.props
      
    return (
      <JCard spinning={spinning}> 
        <div ref={rootRef} style={{background: "#061d43"}}>
          <div className="home_top mgb10" style={{background: 'url("/images/home_bg.png") center'}}>
            <div  className="home_left">17:55:15 2020年11月28日 星期六</div>
            <div  className="home_center">金庐名居车辆识别实时监控</div>
            <div className="home_right">
              <Button type="link" onClick={()=>{
                (rootRef.current as any).requestFullscreen()
              }}>
                <i className="icon iconfont icon-quanping" style={{fontSize: 30}}></i>
              </Button>
            </div>
          </div>
          <Row gutter={10}>
            <Col span={7}>
              <div className="flexbetween">
                <div className="question_wrap" style={{width: "48%", height: 150, }}>
                  <div className="box" style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                    {online?<Space direction="vertical" >
                      <div>
                        <span style={{fontSize: 30, color: "#70c1b3"}}>{online.onCount}</span> 设备在线
                      </div>
                      <div>
                        <span style={{fontSize: 30, color: "#d90020"}}>{online.offCount}</span> 设备离线
                      </div>
                    </Space>:<Skeleton active />}
                  </div>
                </div>
                <div className="question_wrap" style={{width: "48%", height: 150, }}>
                  <div className="box" style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                    {plateNum?<Space direction="vertical" >
                      <div>
                        <span style={{fontSize: 30, color: "#02a7f0"}}>{plateNum.noStop}</span> 剩余车位
                      </div>
                      <div>
                        <span style={{fontSize: 30, color: "#70c1b3"}}>{plateNum.stop}</span> 已停车辆
                      </div>
                    </Space>:<Skeleton active />}
                  </div>
                </div>
              </div>
              <div className="question_wrap mgt10">
                <div className="box">
                  {passplate?<Row style={{height:150}}>
                    <Col span={12} style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                      <div >
                        <div>
                          <span style={{fontSize: 30, color: "#03bfbf"}}>{passplate.passSum}</span> 辆 今日通行
                        </div>
                        <div>
                          <span style={{fontSize: 30, color: "#02a7f0"}} >{passplate.foreignSum}</span> 辆 外来车辆
                        </div>
                      </div>
                    </Col>
                    <Col span={12} style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                      <div >
                        <div>
                          <span style={{fontSize: 30, color: "#02a7f0"}}>{passplate.customSum}</span> 辆 自定义车辆
                        </div>
                        <div>
                          <span style={{fontSize: 30, color: "#f59a23"}} >{passplate.leaseSum}</span> 辆 访客/租赁车辆
                        </div>
                      </div>
                    </Col>
                  </Row>:<Skeleton active />}
                </div>
              </div>
              <div className="question_wrap mgt10">
                <div className="box" style={{padding: "5px"}}>
                  <Title level={5} style={{color: "#fff"}}>设备列表</Title>
                  <table className="home_table">
                    <thead>
                      <tr>
                        <th>在线状态</th>
                        <th>设备名称</th>
                        <th>设备编号</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devicelist?_.slice(devicelist,0,13).map((item:any, index:number)=>(
                        <tr key={index}>
                          <td><Tag color={OnLineTypeColor[item.online]} >{OnLineType[item.online]}</Tag></td>
                          <td>{item.deviceName}</td>
                          <td>{item.iotId}</td>
                        </tr>
                      )):null}
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
            <Col span={10}>
              <div className="question_wrap">
                <div className="box" style={{padding: "5px"}}>
                  <Title level={5} style={{color: "#fff"}}>车辆通行记录</Title>
                  <table className="home_table">
                    <thead>
                      <tr>
                        <th>车牌号码</th>
                        <th>状态</th>
                        <th>车辆类型</th>
                        <th>类型</th>
                        <th>收费金额</th>
                        <th>通行时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passlog?_.slice(passlog,0,10).map((item:any, index:number)=>(
                        <tr key={index}>
                          <td>{item.license}</td>
                          <td>{CarStatus[item.orderState]}</td>
                          <td>{PassType[item.passType]}</td>
                          <td>{CarPayStatus[item.passState]}</td>
                          <td>{item.money}</td>
                          <td>{item.updateTime?item.updateTime.substring(10):""}</td>
                        </tr>
                      )):null}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="question_wrap mgt10">
                <div className="box">
                  <Title level={5} style={{color: "#fff"}}>24小时车流量</Title>
                  {twentyFour?
                    <StackColumnChart 
                    data={twentyFour} 
                    xField='month' 
                    yField= 'value' 
                    isGroup={true}
                    height={382}
                    seriesField='type'
                    groupField='name'
                    legend={{
                      position:"top",
                      itemName: {
                        style: {
                          fill: "#fff"
                        }
                      }
                    }}
                    />:<Skeleton active />}
                </div>
              </div>
            </Col>
            <Col span={7}>
              <div className="question_wrap">
                <div className="box">
                  {todaypay?<Row style={{height:150}}>
                    <Col span={12} style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                      <div >
                        <div>
                          <span style={{fontSize: 30, color: "#03bfbf"}}>￥{todaypay.sum}</span>今日收入
                        </div>
                      </div>
                    </Col>
                    <Col span={12} style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                      <div >
                        <div>
                          其中<span style={{fontSize: 30, color: "#02a7f0"}}>￥{todaypay.passSum}</span> 车辆通行
                        </div>
                        <div>
                          其中<span style={{fontSize: 30, color: "#f59a23"}} >￥{todaypay.orderSum}</span>车位租赁
                        </div>
                      </div>
                    </Col>
                  </Row>:<Skeleton active />}
                </div>
              </div>
              <div className="question_wrap mgt10">
                <div className="box">
                  <Title level={5} style={{color: "#fff"}}>七日收入</Title>
                  {weeksum?
                    <StackColumnChart 
                    data={weeksum} 
                    xField='month' 
                    yField= 'value' 
                    isGroup={false}
                    isStack={true}
                    height={300}
                    seriesField='type'
                    groupField='name'
                    legend={{
                      position:"top",
                      itemName: {
                        style: {
                          fill: "#fff"
                        }
                      }
                    }}
                    />:<Skeleton active />}
                </div>
              </div>
              <div className="question_wrap mgt10">
                <div className="box">
                  <Title level={5} style={{color: "#fff"}}>七日通行车辆</Title>
                  {weekpass?
                    <StackColumnChart 
                    data={weekpass} 
                    xField='month' 
                    yField= 'value' 
                    isGroup={false}
                    isStack={true}
                    height={300}
                    seriesField='type'
                    groupField='name'
                    legend={{
                      position:"top",
                      itemName: {
                        style: {
                          fill: "#fff"
                        }
                      }
                    }}
                    />:<Skeleton active />}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getDeviceOnline, getPlateNum, getPassPlate, getDeiveList, getPassLog, getPassTwentyFour,
      getOrderInfoMoney, getWeekSumMoney, getWeekPass, changeHomeData}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    weekpass: state.home.weekpass,
    weeksum: state.home.weeksum,
    todaypay: state.home.todaypay,
    twentyFour: state.home.twentyFour,
    passlog: state.home.passlog,
    devicelist: state.home.devicelist,
    passplate: state.home.passplate,
    online: state.home.online,
    plateNum: state.home.plateNum,
    base: state.app.base,
    utils: state.app.utils,
    spinning: state.home.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(HomePage)