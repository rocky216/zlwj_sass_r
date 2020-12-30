import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button } from "antd";



interface Props extends IProps {

}

class ParkPage extends React.Component<Props> {
  render() {
    const {spinning, utils, location, history} = this.props
    console.log(location)

    return (
      <JCard spinning={spinning}> 
        <Button onClick={()=>{
            history.push({
              pathname: "/accecode",
              state: {
                aaa: 222
              }
            })
          }}>跳转</Button>
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

export default connect(mapStateProps, mapDispatchProps)(ParkPage)