import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"


interface Props extends IProps {

}

class DeviceConffPage extends React.Component<Props> {
  render() {
    const {spinning, utils} = this.props

    return (
      <JCard spinning={spinning}> 
        DeviceConffPage
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
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceConffPage)