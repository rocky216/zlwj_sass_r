import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import { } from "@admin/actions/messageAction"
import JCard from "@admin/components/JCard"
import { Card } from "antd";

interface Props extends IProps {

}

let params = {
  current: 1
}

class MessageTemplate extends React.Component<Props> {

  componentDidMount(){

  }

  render() {
    const {spinning, utils} = this.props

    return (
      <JCard spinning={spinning}>
        <Card size="small">

        </Card>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    spinning: state.message.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(MessageTemplate)