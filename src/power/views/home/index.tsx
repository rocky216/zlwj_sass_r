import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import "./index.less"
import { Button, Col, Row, Space } from "antd";

const rootRef = React.createRef<HTMLDivElement>()

interface Props extends IProps {

}

class HomePage extends React.Component<Props> {
  

  render() {
    const {spinning, utils} = this.props
    
    return (
      <JCard spinning={spinning}> 
      
      <div ref={rootRef} style={{background: "#061d43"}}>
        <div className="mgb10">
          <Button onClick={()=>(rootRef.current as any).requestFullscreen()}>全屏</Button>
        </div>
        <Row>
          <Col span={8}>
            <div className="flexbetween">
              <div className="question_wrap " style={{width: "48%", height: 200}}>
                <div className="box" >
                  <div>
                    378 设备在线
                  </div>
                  <div>
                    78 设备离线
                  </div>
                </div>
              </div>
              <div className="question_wrap " style={{width: "48%", height: 200}} >
                <div className="box">
                  <div>
                      306 今日订单
                    </div>
                    <div>
                      158 充电中
                    </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={8}>
          </Col>
          <Col span={8}>
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

export default connect(mapStateProps, mapDispatchProps)(HomePage)

