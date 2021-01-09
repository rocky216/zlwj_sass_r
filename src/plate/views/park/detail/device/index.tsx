import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getParkDevice } from "@plate/actions/parkAction"
import { Table } from "antd";
import { parkDeviceColumns } from "../../columns";


interface Props extends IProps {
  parkdevice:any;
}

class ParkDeviceconf extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getParkDevice({parkingId: this.props.match.params.id})
  }

  render() {
    const {spinning, utils, parkdevice} = this.props

    return (
      <Table size="small" columns={parkDeviceColumns} dataSource={parkdevice?utils.addIndex(parkdevice):[]} />
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getParkDevice }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    parkdevice: state.park.parkdevice,
    utils: state.app.utils,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ParkDeviceconf)