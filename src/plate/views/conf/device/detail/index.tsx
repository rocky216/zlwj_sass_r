import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getDeviceInfo, getDeviceonLineLog, getSelectThirty } from "@plate/actions/otherAction"
import { Button, Card, Descriptions, Skeleton, Tag, Typography } from "antd";
import { InOutType, OnLineType, OnLineTypeColor } from "@public/common/plateMapper";
import moment from "moment";
import { Line } from '@ant-design/charts';

const {Title} = Typography

interface Props extends IProps {
  deviceinfo:any;
}

class DeviceDetailPage extends React.Component<Props> {

  state:any = {
    baseInfo: null,
    devicelog: null,
    logDate: moment(),
    thirtylog:null
  }

  componentDidMount(){
    this.props.actions.getDeviceInfo({id: this.props.match.params.id}, (res:any)=> this.setState({baseInfo: res}))
    this.getDeviceLog(this.state.logDate)
    this.props.actions.getSelectThirty({iotId: this.props.match.params.iotId},(res:any)=>this.setState({thirtylog:res}))
  }

  getDeviceLog(logDate:any){
    this.props.actions.getDeviceonLineLog({
      iotId: this.props.match.params.iotId,
      date: logDate.format("YYYY-MM-DD")
    }, (res:any)=> this.setState({devicelog: res}))
  }

  render() {
    const {spinning, utils, deviceinfo, history} = this.props
    const {baseInfo, devicelog, thirtylog } = this.state

    return (
      <JCard spinning={spinning}> 
        <Card size="small">
          {baseInfo?<Descriptions column={5} title="(华庭物业-金庐名居-xxx停车场)金庐名居出口车牌识别设备"
            extra={<Button onClick={()=>history.goBack()}>返回</Button>}
          >
            <Descriptions.Item label="在线状态"><Tag color={OnLineTypeColor[baseInfo.online]} >{OnLineType[baseInfo.online]}</Tag></Descriptions.Item>
            <Descriptions.Item label="IOTID">{baseInfo.iotId}</Descriptions.Item>
            <Descriptions.Item label="设备序列号">{baseInfo.deviceSerial}</Descriptions.Item>
            <Descriptions.Item label="设备类型">{baseInfo.deviceType}</Descriptions.Item>
            <Descriptions.Item label="进出口类型">{InOutType[baseInfo.inOut]}</Descriptions.Item>
            <Descriptions.Item >{baseInfo.plateCompanyItemStr}</Descriptions.Item>
          </Descriptions>:<Skeleton active />}
        </Card>
        <Card size="small" className="mgt10" title={<Title level={5}>上下线日志</Title>} style={{paddingBottom: 50}} >
          {devicelog?(
            devicelog.map((item:any, index:number)=>(
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
            ))
          ):<Skeleton active />}
        </Card>
        {thirtylog?
        <Card className="mgt10" size="small" extra={(
            <Descriptions title="30日统计图" extra="" column={6}>
              <Descriptions.Item label="7日掉线合计">{thirtylog.week}次</Descriptions.Item>
              <Descriptions.Item label="15日掉线合计">{thirtylog.fifteen}次</Descriptions.Item>
              <Descriptions.Item label="30日掉线合计">{thirtylog.thirty}次</Descriptions.Item>
            </Descriptions>
          )}>
          
          <Line 
            data={thirtylog.thirtyInfo}
            xField="time"
            yField="count"
          />
        </Card>:null}
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getDeviceInfo, getDeviceonLineLog, getSelectThirty}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    deviceinfo: state.other.deviceinfo,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceDetailPage)