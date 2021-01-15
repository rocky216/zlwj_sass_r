import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Col, Row, Select, Table } from "antd";
import SearchModular from "@public/components/Modular/SearchModular";
import ParkElement from "@plate/components/Element/ParkElement";
import {getParkLeaseOrder} from "@plate/actions/parkAction"
import { carLeaseColumns } from "./columns";

const {Option} = Select



interface Props extends IProps {
  leaseorder:any;
}

let params = {
  current: 1,
  rtime:[],
  license:"",
  orderNo:"",
  payNo:"",
  orderState:"",
  parkId:[]
}
let resetParams = {
  current: 1,
  rtime:[],
  license:"",
  orderNo:"",
  payNo:"",
  orderState:"",
  parkId:[]
}

class CarLease extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getParkLeaseOrder(params)
  }

  render() {
    const {spinning, utils, leaseorder } = this.props

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Row>
            <Col span={20}>
              <Table size="small" columns={carLeaseColumns} dataSource={leaseorder?utils.addIndex(leaseorder.list):[]} 
              pagination={utils.Pagination(leaseorder, page=>{
                params.current = page;
                this.props.actions.getParkLeaseOrder(params)
              })}/>
            </Col>
            <Col span={4}>
              <SearchModular
                layout="vertical"
                initialValues={params}
                resetValues={resetParams}
                submitSearch={(values:any)=>{
                  params=values?{...params, ...values}:resetParams
                  this.props.actions.getParkLeaseOrder(params)
                }}
                data={[
                  {label: "下单日期", name: "rtime", type: "rangepicker"},
                  {label: "车牌号码", name: "license", type: "input"},
                  {label: "订单编号", name: "orderNo", type: "input"},
                  {label: "支付单号", name: "payNo", type: "input"},
                  {label: "订单状态", name: "orderState", type: "select", selectList: [
                    {label: "全部", id: ""},
                    {label: "待支付", id: 1},
                    {label: "支付完成", id: 2},
                    {label: "支付取消", id: 3},
                  ]},
                  {label: "停车场", name: "parkId", type: <ParkElement/>},
                ]}
              />
            </Col>
          </Row>
        </div>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getParkLeaseOrder}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    leaseorder: state.park.leaseorder,
    utils: state.app.utils,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(CarLease)