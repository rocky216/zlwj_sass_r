import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import "./index.less"
import {getDeviceSignal, getOrderWeekSum, getDeviceOnline, getPowerOnline, getOrderTopTen, getPowerToDayIncome,
  getOrderWeekPay, getPowerOrderUnusualSum } from "@power/actions/homeAction"
import { Button, Col, Row, Space, Table } from "antd";
import PieChart from "@power/components/Charts/PieChart"
import UseChart from "@power/components/Charts/UseChart"
import {OrderType} from "@public/common/powerMapper"
import StackColumnChart from "@power/components/Charts/StackColumnChart"
import { Pie } from "@ant-design/charts";
import { RetweetOutlined } from "@ant-design/icons";
import ReconnectingWebSocket from "reconnecting-websocket";


let params = {
  selectType: "all"
}

const rootRef = React.createRef<HTMLDivElement>()

interface Props extends IProps {
  devicesignal:any;
  orderWeekSum:any;
  deviceonline:any;
  powerOnline:any[];
  orderTopTen:any[];
  toDayIncome:any;
  orderWeekPay:any[];
  unusualsum:any[];
}

class HomePage extends React.Component<Props> {
  
  componentDidMount(){
    
    this.props.actions.getDeviceSignal(params)
    this.props.actions.getOrderWeekSum(params)
    this.props.actions.getDeviceOnline(params)
    this.props.actions.getPowerOnline(params)
    this.props.actions.getOrderTopTen(params)
    this.props.actions.getPowerToDayIncome(params)
    this.props.actions.getOrderWeekPay(params)
    this.props.actions.getPowerOrderUnusualSum(params)
    this.getsoket()
  }

  getsoket(){
    const rws = new ReconnectingWebSocket('ws://192.168.1.40:4961');
    rws.addEventListener('open', () => {
      rws.send('{"data":{"itemId":0,"companyId":0},"cmd":"cut_item","status":"1"}');
      
    });
    rws.addEventListener("message", (value)=>{
      console.log(value.data, "asas")
    })
  }

  render() {
    const {spinning, utils, devicesignal, orderWeekSum, deviceonline, powerOnline, orderTopTen,
      toDayIncome, orderWeekPay, unusualsum} = this.props
    
    return (
      <JCard spinning={spinning}> 
      
      <div ref={rootRef} style={{background: "#061d43"}}>
        <div className="home_top mgb10" style={{background: 'url("/images/home_bg.png") center'}}>
          
        <div  className="home_left">17:55:15 2020年11月28日 星期六</div>
          <div  className="home_center">金庐名居智能充电桩实时监控</div>
          <div className="home_right">
            <Button ghost onClick={()=>(rootRef.current as any).requestFullscreen()}><RetweetOutlined /></Button>
          </div>
        </div>
        <Row gutter={10}>
          <Col span={7}>
            <div className="flexbetween">
              <div className="question_wrap " style={{width: "48%", height: 150, }}>
                <div className="box" style={{display:"flex", alignItems:"center", justifyContent: "center"}} >
                  {deviceonline?<div>
                    <div>
                      <span style={{fontSize: 30, color: "#70c1b3"}}>{deviceonline.deviceOff}</span> 设备在线
                    </div>
                    <div><span style={{fontSize: 30, color: "#d90020"}} >{deviceonline.deviceOnline}</span> 设备离线</div>
                  </div>:null}
                </div>
              </div>
              <div className="question_wrap " style={{width: "48%", height: 150}} >
                <div className="box" style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                  <div>
                    <div>
                      <span style={{fontSize: 30, color: "#02a7f0"}}>306</span> 今日订单
                    </div>
                    <div>
                      <span style={{fontSize: 30, color: "#70c1b3"}} >158</span> 充电中
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="question_wrap mgt10" style={{height: 300}}>
              <div className="box" style={{color: "#fff"}}>
                <h3 style={{color: "#fff"}}>在线信号</h3>
                {devicesignal?
                  <>
                    <div style={{display: "flex", justifyContent: "center"}}>
                      <div style={{height: 200, width: "70%"}}>
                      <PieChart data={devicesignal.list} angleField="countMoney" colorField="type" 
                        label={{
                          type: "inner",
                          style: {
                            fill: "#fff",
                            fontSize: 16
                          },
                        }}
                        legend={{
                          title: {
                            text: `平均信号： ${devicesignal.signalAvg.countMoney}`,
                            style: {
                              fill: "#fff",
                              fontSize: 16,
                            },
                            spacing: 30
                          },
                          itemName: {
                            style: {
                              fill: "#fff"
                            }
                          },
                          
                        }}
                      />
                    </div>
                    </div>
                  </>
                :null}
              </div>
            </div>
            <div className="question_wrap mgt10">
              <div className="box">
                <div style={{padding: "10px 20px"}}>
                  <h3 style={{color: "#fff"}}>七日订单数量走势</h3>
                  {orderWeekSum?<UseChart 
                  type="column" data={orderWeekSum} 
                  xField="type" 
                  yField={["value"]}  
                  />:null}
                </div>
              </div>
            </div>
            
          </Col>
          <Col span={10}>
            <div className="question_wrap ">
              <div className="box">
                <div style={{padding: "5px 20px 20px 20px"}}>
                  <h3 style={{color: "#fff"}}>设备上下线</h3>
                  <table className="home_table">
                    <thead>
                      <tr>
                        <th>IOTID</th>
                        <th>设备名称</th>
                        <th>记录类型</th>
                        <th>记录时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {powerOnline?(
                        <>
                          {powerOnline.map((item:any, index)=>(
                            <tr key={index}>
                              <td>{item.iotId}</td>
                              <td>{item.deviceName}</td>
                              <td style={{color: item.online==0?"#ff0327":"#7fee2e"}} >{item.online==0?"下线":"上线"}</td>
                              <td>{item.onlineTime}</td>
                            </tr>
                          ))}
                        </>
                      ):null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="question_wrap mgt10">
              <div className="box">
                <div style={{padding: "5px 20px 20px 20px"}}>
                  <h3 style={{color: "#fff"}}>充电订单记录</h3>
                  <table className="home_table">
                    <thead>
                      <tr>
                        <th>订单编号</th>
                        {/* <th>状态</th> */}
                        <th>订单类型</th>
                        <th>下单途径</th>
                        <th>订单设备</th>
                        <th>订单金额</th>
                        <th>更新时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderTopTen?(
                        <>
                          {orderTopTen.map((item:any, index)=>(
                            <tr key={index}>
                              <td>{item.orderNo?item.orderNo.substring(0,8):""}</td>
                              <td>{OrderType[item.orderType]}</td> 
                              {/* {OrderType[item.orderType]} */}
                              <td>{item.deviceName}</td>
                              <td>{item.realFee}</td>
                              <td>{item.buildTime}</td>
                            </tr>
                          ))}
                        </>
                      ):null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
          <Col span={7}>
            <div className="question_wrap">
              <div className="box">
                {toDayIncome?<Row style={{height:150}}>
                  <Col span={12} style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                    <div >
                      <div>
                        <span style={{fontSize: 30, color: "#03bfbf"}}>{toDayIncome.sum}</span> 今日收入
                      </div>
                      <div>
                        <span style={{fontSize: 30, color: "#02a7f0"}} >{toDayIncome.card}</span> 充电卡订单
                      </div>
                    </div>
                  </Col>
                  <Col span={12} style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                    <div >
                      <div>
                        <span style={{fontSize: 30, color: "#02a7f0"}}>{toDayIncome.balance}</span> 余额订单
                      </div>
                      <div>
                        <span style={{fontSize: 30, color: "#f59a23"}} >{toDayIncome.vip}</span> 会员劵订单
                      </div>
                    </div>
                  </Col>
                </Row>:null}
              </div>
            </div>

            <div className="question_wrap mgt10">
              <div className="box">
                <div style={{padding: "10px 20px"}}>
                  <h3 style={{color: "#fff"}}>七日收入走势</h3>
                  {orderWeekPay?<StackColumnChart 
                    data={orderWeekPay} 
                    xField='month' 
                    yField= 'value' 
                    seriesField='type'
                    height={320}
                    groupField='name'
                    legend={{
                      layout: "horizontal",
                      position: "top-right",
                      itemName: {
                        style: {
                          fill: "#fff"
                        }
                      }
                    }} />:null}
                </div>
              </div>
            </div>

            <div className="question_wrap mgt10">
              <div className="box">
                <div style={{padding: "10px 20px"}}>
                  <h3 style={{color: "#fff"}}>七日异常订单走势</h3>
                  {unusualsum?<StackColumnChart 
                    data={unusualsum} 
                    height={320}
                    xField='type' 
                    yField= 'value' 
                    seriesField='country'
                    legend={{
                      layout: "horizontal",
                      position: "top-right",
                      itemName: {
                        style: {
                          fill: "#fff"
                        }
                      }
                    }} />:null}
                </div>
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
    actions: bindActionCreators({getDeviceSignal, getOrderWeekSum, getDeviceOnline, getPowerOnline,
      getOrderTopTen, getPowerToDayIncome, getOrderWeekPay, getPowerOrderUnusualSum }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    unusualsum: state.home.unusualsum,
    orderWeekPay: state.home.orderWeekPay,
    toDayIncome: state.home.toDayIncome,
    orderTopTen: state.home.orderTopTen,
    powerOnline: state.home.powerOnline,
    deviceonline: state.home.deviceonline,
    orderWeekSum: state.home.orderWeekSum,
    devicesignal: state.home.devicesignal,
    utils: state.app.utils,
    spinning: state.home.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(HomePage)

