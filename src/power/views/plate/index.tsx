import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import axios from "axios"
import { Button, Col, Row, Space } from "antd";
import "./index.less"
import { Column } from '@ant-design/charts';
import _ from "lodash";


interface Props extends IProps {

}

const rootRef = React.createRef<HTMLDivElement>()

class TestPlate extends React.Component<Props> {
  
  timer:any;

  state = {
    carLogList:[],
    deviceList: [], 
    inCarNumber: 0, 
    logList: [], 
    outCarNumber: 0,
    hChartsList:[],
    sevenChartsList:[]
  }

  componentDidMount(){
    this.initial()
    this.timer = setInterval(()=>{
      this.initial()
    },5000)
    
  }

  componentWillUnmount(){
    if(this.timer){
      clearTimeout(this.timer)
    }
  }

  async initial(){
    try{
      let respone = await axios.get("https://api.jxhtservice.com/wuye/api/pc/initKb")
      if(respone.data.code == 0){
        const {carLogList, deviceList, inCarNumber, logList, outCarNumber, hChartsList, sevenChartsList} = respone.data.data
        this.setState({carLogList:_.slice(carLogList,0,25), deviceList, inCarNumber, logList, outCarNumber, hChartsList, sevenChartsList})
        console.log(respone.data.data)
      }
      
    }catch(e){}
    
  }

  render() {
    const {spinning, utils} = this.props
    const {carLogList, deviceList, inCarNumber, logList, outCarNumber, hChartsList, sevenChartsList} = this.state

    return (
      <JCard spinning={spinning}> 
        <div className="testPlate contentBlackBg" ref={rootRef} style={{background: "#061d43"}} >
        <h1 style={{color: "#fff", padding: "10px 0", textAlign: "center"}}>安居小区智慧平安社区看板</h1>
          <Row gutter={20}>
            <Col span={8}>
              <div className="iframe1"  style={{width: "100%", height: 400}} >
                <iframe src="/exopen" style={{padding:0,margin:0, border: "none", width: "100%", height: "100%"}}></iframe>
              </div>
              <div  className="iframe1" style={{width: "100%", height: 400, marginTop:20}} >
                <iframe src="/exopen1" style={{padding:0,margin:0, border: "none", width: "100%", height: "100%"}}></iframe>
              </div>
            </Col>
            <Col span={8} style={{padding: "20px 0"}}>
              <h3 style={{color: "#fff", padding: "10px 0", textAlign: "center"}}>通行信息</h3>
              <Row gutter={10}>
                <Col span={12} style={{display: "flex", justifyContent: "center"}}>
                  <Space direction="vertical">
                    {deviceList.map((item:any, index)=>(
                      <div key={index} style={{color: '#fff'}}>
                        <div className="question_wrap">
                          <div className="box" style={{padding: "10px 20px", color: item.online==="1"?"#0cf332":"#f30c48"}}>
                            <span className="icon iconfont icon-cheliangtonghang" style={{fontSize: 36, color: item.online==="1"?"#0cf332":"#f30c48"}}></span>
                            <span style={{marginLeft: 20}}>{index==0?"入口":"出口"}</span>
                        </div>
                        </div>
                      </div>
                    ))}
                  </Space>
                </Col>
                <Col span={12}  style={{display: "flex", justifyItems: "center", alignItems: 'center'}}>
                  <div className="question_wrap">
                    <div className="box" style={{padding: "20px 30px"}}>
                      <Space direction="vertical" >
                      <Space >
                        <span className="whiteColor">今日离开小区数量</span>
                        <span className="whiteColor" style={{color: "#f30c48", fontSize: 30}}>{outCarNumber}</span>
                      </Space>
                      <Space>
                        <span className="whiteColor">今日进入小区数量</span>
                        <span className="whiteColor"  style={{color: "#0cf332", fontSize: 30}}>{inCarNumber}</span>
                      </Space>
                    </Space>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="question_wrap">
                <div className="box" style={{padding: 20}}>
                  <h3 style={{color: "#fff", padding: "10px 0"}}>今日车辆通行记录</h3>
                  <Column height={260} data={hChartsList} xField="month" yField="value" isGroup={true}
                    seriesField="type"
                  />
                </div>
              </div>

              <div className="question_wrap">
                <div className="box" style={{padding: 20}}>
                  <h3 style={{color: "#fff", padding: "10px 0"}}>七日车辆通行记录</h3>
                  <Column height={260} data={sevenChartsList} xField="month" yField="value" isGroup={true}
                    seriesField="type"
                  />
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div style={{display:"flex", justifyContent: "space-between"}}>
                <h3 style={{color: "#fff", padding: "10px 0"}}>车辆通行记录</h3>
                <Button type="link" onClick={()=>{
                    (rootRef.current as any).requestFullscreen()
                  }}>
                    <i className="icon iconfont icon-quanping" style={{fontSize: 30}}></i>
                  </Button>
              </div>
              <div className="question_wrap">
                <div className="box" style={{padding: 10}}> 
                  <table className="home_table" >
                  <thead>
                    <tr>
                      <th>车牌号</th>
                      <th>出/入</th>
                      <th>时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carLogList.map((item:any,index)=>(
                      <tr key={index}>
                        <td>{item.license}</td>
                        <td>{item.inOut==1?<span style={{color: "#0cf332"}}>进</span>:<span style={{color: "#f30c48"}}>出</span>}</td>
                        <td>{item.buildTime}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
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
    actions: bindActionCreators({}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(TestPlate)