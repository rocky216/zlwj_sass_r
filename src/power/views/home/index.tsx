import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import "./index.less"
import { Button } from "antd";

const rootRef = React.createRef<HTMLDivElement>()

interface Props extends IProps {

}

class HomePage extends React.Component<Props> {
  

  render() {
    const {spinning, utils} = this.props
    
    return (
      <JCard spinning={spinning}> 
      <Button onClick={()=>(rootRef.current as any).requestFullscreen()}>全屏</Button>
      <div ref={rootRef} style={{background: "#fff"}}>
        <div className="question_title_content " >
          <div className="describe2">

          </div>
        </div>
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

