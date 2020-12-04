import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Card, DatePicker, Descriptions, Skeleton, Tag } from "antd";
import {getDeviceBaseDetail, getDeviceOnlineLog } from "@power/actions/projectAction"
import { Link } from "react-router-dom";
import {OnLineType, OnLineTypeColor} from "@public/common/powerMapper"
import { FundViewOutlined, WifiOutlined, WomanOutlined } from "@ant-design/icons";
import moment from "moment"

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
    onlineTime: moment()
  }

  componentDidMount(){
    const {id, iotId} = this.props.match.params
    this.props.actions.getDeviceBaseDetail({id}, (res:any)=>{
      this.setState({baseinfo: res})
    })
    this.initialOnlineLog(this.state.onlineTime)
    
  }

  initialOnlineLog(onlineTime:any){
    this.props.actions.getDeviceOnlineLog({iotId: this.props.match.params.iotId, 
      onlineTime: moment(onlineTime).format("YYYY-MM-DD")
    }, (res:any)=>{
      this.setState({onlineLog: res})
    })
  }

  render() {
    const {spinning, utils} = this.props
    const {baseinfo, baseList, onlineLog, onlineTime} = this.state
    const {companyName, itemName, shedName, deviceName, online} = baseinfo


    return (
      <JCard spinning={spinning}> 
        <Card size="small">
          {baseinfo?
          <Descriptions size="small" column={6} title={`（${companyName}${itemName}${shedName}）${deviceName}`}  
            extra={<Link to="/project/deviceconf"><Button>返回</Button></Link>} >
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
        <Card size="small"> 
         <Descriptions title="信号强度" extra={<RangePicker format="YYYY-MM-DD HH:mm" showTime disabledDate={(currentDate)=>{
           console.log(currentDate)
           return false;
         }} />}>

         </Descriptions>
        </Card>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getDeviceBaseDetail, getDeviceOnlineLog}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceDetail)