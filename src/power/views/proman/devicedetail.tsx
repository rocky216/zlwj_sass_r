import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Card, DatePicker, Descriptions, Skeleton, Space, Tag, Typography } from "antd";
import {getDeviceBaseDetail, getDeviceOnlineLog, getDateSignal, getTreeDayStatic } from "@power/actions/projectAction"
import { Link } from "react-router-dom";
import {OnLineType, OnLineTypeColor} from "@public/common/powerMapper"
import { FundViewOutlined, WifiOutlined, WomanOutlined } from "@ant-design/icons";
import moment from "moment"
import UseChart from "@power/components/Charts/UseChart"

const {RangePicker } = DatePicker


interface Props extends IProps {

}

class DeviceDetail extends React.Component<Props> {

  state:any = {
    baseinfo: "",
    baseList: [
      {label: "最近信号", name: "signalSize", icon: <WifiOutlined style={{color: "green"}} />},
      {label: "熔断", name: "signalSize", icon: <FundViewOutlined style={{color: "green"}} />},
      {label: "端口数量", name: "portType", icon: <WomanOutlined style={{color: "green"}} />},
      
      {label: "设备序列号", name: "deviceSerial"},
      {label: "端口详情", name: "signalSize"},
      {label: "所属电表", name: "signalSize"},
      {label: "iotId", name: "iotId"},
    ],
    onlineLog: "",
    onlineTime: moment(),
    signalTime: [moment(), moment()],
    lineData: [],
    threeDays: [],
    threeDaysMap: {}
  }

  componentDidMount(){
    const {id, iotId} = this.props.match.params
    this.props.actions.getDeviceBaseDetail({id}, (res:any)=>{
      this.setState({baseinfo: res})
    })
    this.initialOnlineLog(this.state.onlineTime)
    this.initialSignal(this.state.signalTime)
    this.props.actions.getTreeDayStatic({id}, (res:any)=>{
      this.setState({threeDays:res.deviceOrderOffInfo, threeDaysMap: res})
    })
  }
  initialSignal(rtime:any[]){
    this.props.actions.getDateSignal({iotId: this.props.match.params.iotId, rtime}, (res:any)=>{
      this.setState({lineData: res, })
    })
  }

  initialOnlineLog(onlineTime:any){
    this.props.actions.getDeviceOnlineLog({iotId: this.props.match.params.iotId, 
      onlineTime: moment(onlineTime).format("YYYY-MM-DD")
    }, (res:any)=>{
      this.setState({onlineLog: res})
    })
  }

  render() {
    const {spinning, utils, history} = this.props
    const {baseinfo, baseList, onlineLog, onlineTime, lineData, threeDays, signalTime, threeDaysMap} = this.state
    const {companyName, itemName, shedName, deviceName, online, } = baseinfo

    
    return (
      <JCard spinning={spinning}> 
        <Card size="small">
          {baseinfo?
          <Descriptions size="small" column={6} title={`（${companyName}${itemName}${shedName}）${deviceName}`}  
            extra={<Button onClick={()=>history.goBack()}>返回</Button>} >
            <Descriptions.Item label={<span>状态</span>}>
              <Tag color={OnLineTypeColor[online]}>{OnLineType[online]}</Tag>  
            </Descriptions.Item> 

            {baseList.map((item:any,index:number)=>(
              <Descriptions.Item key={index+1} label={item.label}>{item.icon}{baseinfo[item.name]}</Descriptions.Item>
            ))}
          </Descriptions>
          :<Skeleton active />}
        </Card>
        <Card size="small">
          {onlineLog?
          <Descriptions title="上下线日志" extra={<DatePicker value={onlineTime} onChange={(v)=>{
            this.setState({onlineTime: v})
            this.initialOnlineLog(v)
          }}/>} >
            <Descriptions.Item style={{paddingBottom: 50}}>
              <div style={{width: "100%", display: "flex"}}>
                {onlineLog.map((item:any, index:number)=>(
                  <div key={index} title={item.endTime} style={{height: 30, 
                    width: (item.apartMin/1440*100)+"%", 
                    backgroundColor: item.online?"#2db7f5":"#f50",
                    position: "relative"
                  }}>
                      <div style={{
                        width: 52,
                        color: "#999",
                        transformOrigin: "right center",
                        position: "absolute", bottom: -15, right: 0, transform:"rotate(-45deg)"}}>{item.endTime.substring(11)}</div>
                    </div>
                ))}
              </div>
            </Descriptions.Item>
          </Descriptions>
          :<Skeleton active />}
        </Card>
        <Card className="mgt10" size="small" 
          title={<Typography.Title level={5}>信号强度</Typography.Title>} 
          extra={(
            <Space>
              <RangePicker format="YYYY-MM-DD HH:mm" value={signalTime} showTime onChange={(v:any)=>{
            this.setState({signalTime:v})
          }} />
          <Button type="primary"  onClick={()=>{
            this.initialSignal(signalTime)
          }}>搜索</Button>
            </Space>
          )} > 
          <UseChart 
            type="line" 
            data={lineData} 
            xField="addTime" 
            yField={["signal"]} 
            yFieldName={["信号"]}/>
        </Card>
        <Card 
          className="mgt10"
          size="small" 
          extra={(
            <Descriptions title="30日统计图" extra="" column={6}>
              <Descriptions.Item label="7日掉线合计">{threeDaysMap.weekOffNum}次</Descriptions.Item>
              <Descriptions.Item label="15日掉线合计">{threeDaysMap.fifteenOffNum}次</Descriptions.Item>
              <Descriptions.Item label="30日掉线合计">{threeDaysMap.monthOffNum}次</Descriptions.Item>
              <Descriptions.Item label="7日订单合计">{threeDaysMap.weekNum}单</Descriptions.Item>
              <Descriptions.Item label="15日订单合计">{threeDaysMap.fifteenNum}单</Descriptions.Item>
              <Descriptions.Item label="30日订单合计">{threeDaysMap.monthNum}单</Descriptions.Item>
            </Descriptions>
          )} > 
          <UseChart
            type="dualAxes" 
            data={[threeDays,threeDays]} 
            xField="date" 
            yField={["offNum", "orderNum"]} 
            yFieldName={["掉线次数", "订单"]}
            geometryOptions={[
              {geometry: "line", color: "#ff4d4f"},
              {geometry: "column"},
            ]}/>
        </Card>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getDeviceBaseDetail, getDeviceOnlineLog, getDateSignal, getTreeDayStatic}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceDetail)