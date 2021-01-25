import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Col, Row, Space, Typography } from "antd";
import "./index.less"

const {Title } = Typography

const rootRef = React.createRef<HTMLDivElement>()

interface Props extends IProps {

}

class SystemHome extends React.Component<Props> {
  render() {
    const {spinning, utils} = this.props

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
                    <Space direction="vertical" >
                      <div>
                        <span style={{fontSize: 30, color: "#70c1b3"}}>4</span> 设备在线
                      </div>
                      <div>
                        <span style={{fontSize: 30, color: "#d90020"}}>1</span> 设备离线
                      </div>
                    </Space>
                  </div>
                </div>
                <div className="question_wrap" style={{width: "48%", height: 150, }}>
                  <div className="box" style={{display:"flex", alignItems:"center", justifyContent: "center"}}>
                    <Space direction="vertical" >
                      <div>
                        <span style={{fontSize: 30, color: "#02a7f0"}}>306</span> 剩余车位
                      </div>
                      <div>
                        <span style={{fontSize: 30, color: "#70c1b3"}}>158</span> 已停车辆
                      </div>
                    </Space>
                  </div>
                </div>
              </div>
              <div className="question_wrap mgt10">
                <div className="box">
                  <Row style={{height:150}}>
                    <Col span={12} style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                      <div >
                        <div>
                          <span style={{fontSize: 30, color: "#03bfbf"}}>0</span> 辆 今日通行
                        </div>
                        <div>
                          <span style={{fontSize: 30, color: "#02a7f0"}} >0</span> 辆 外来车辆
                        </div>
                      </div>
                    </Col>
                    <Col span={12} style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
                      <div >
                        <div>
                          <span style={{fontSize: 30, color: "#02a7f0"}}>0</span> 辆 自定义车辆
                        </div>
                        <div>
                          <span style={{fontSize: 30, color: "#f59a23"}} >0</span> 辆 访客/租赁车辆
                        </div>
                      </div>
                    </Col>
                  </Row>
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
                      <tr>
                        <td>离线</td>
                        <td>金庐名居出口设备</td>
                        <td>MF1514220124141</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
            <Col span={10}>
              <div className="question_wrap mgt10">
                <div className="box" style={{padding: "5px"}}>
                  <Title level={5} style={{color: "#fff"}}>设备列表</Title>
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
                      <tr>
                        <td>离线</td>
                        <td>入场</td>
                        <td>外来车辆</td>
                        <td>未离场</td>
                        <td>暂无</td>
                        <td>15:45:46</td>
                      </tr>
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

export default connect(mapStateProps, mapDispatchProps)(SystemHome)