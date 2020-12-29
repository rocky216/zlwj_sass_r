import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Checkbox, Col, Row, Table } from "antd";
import {getPowerOrder } from "@power/actions/changeAction"
import SearchModular from "@power/components/Modular/SearchModular";
import OrderStatusElement from "@power/components/Element/OrderStatusElement";
import EndStatusElement from "@power/components/Element/EndStatusElement";
import PayTypeElement from "@power/components/Element/PayTypeElement";
import {charorderColumns } from "../columns"


interface Props extends IProps {
  powerorder:any;
}

let params = {
  current: 1,
  companyHe: "",
  orderNo: "",
  iotId: "",
  rtime: [],
  orderStatus: "",
  haveRefund: false,
  haveReset: false,
  orderChannel: "",
  orderType: "",
  targetId: "",
  endStatus:""
}
let resetParams = {
  current: 1,
  companyHe: "",
  orderNo: "",
  iotId: "",
  rtime: [],
  orderStatus: "",
  haveRefund: false,
  haveReset: false,
  orderChannel: "",
  orderType: "",
  targetId: "",
  endStatus:""
}

class IncomeCharorder extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getPowerOrder(params)
  }

  

  render() {
    const {spinning, utils, powerorder} = this.props
    
    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Row>
            <Col span={20}>
              <Table size="small" columns={charorderColumns} dataSource={powerorder?utils.addIndex(powerorder.list):[]}
              pagination={utils.Pagination(powerorder, page=>{
                params.current = page;
                this.props.actions.getPowerOrder(params)
              })} />
            </Col>
            <Col span={4}>
              <SearchModular
                layout="vertical"
                initialValues={params}
                resetValues={resetParams}
                submitSearch={(values:any)=>{
                  if(!values){
                    params = resetParams
                  }else{
                    params = {...params, ...values}
                  }
                  this.props.actions.getPowerOrder(params)
                }}
                data={[
                  {label: "订单号", name: "orderNo", type: "input"},
                  {label: "iotId", name: "iotId", type: "input"},
                  {label: "创建时间", name: "rtime", type: "rangepicker"},
                  {label: "订单状态", name: "orderStatus", type: <OrderStatusElement/> },
                  {name: "haveRefund", type: <Checkbox>有退款订单</Checkbox>, valuePropName: "checked"},
                  {name: "haveReset", type: <Checkbox>重启次数大于0</Checkbox>, valuePropName: "checked"},
                  {label: "结束状态", name: "endStatus", type: <EndStatusElement/> },
                  {label: "下单途径", name: "orderChannel", type: <PayTypeElement/>},
                  // {label: "订单类型", name: "orderType", type: "input"},
                  {label: "券", name: "targetId", type: "input"},
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
    actions: bindActionCreators({getPowerOrder }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    powerorder: state.change.powerorder,
    utils: state.app.utils,
    spinning: state.change.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(IncomeCharorder)