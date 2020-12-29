import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getCouponOrder } from "@power/actions/changeAction"
import { Col, Row, Table } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import PayTypeElement from "@power/components/Element/PayTypeElement";
import {memcerorderColumns} from "../columns"


interface Props extends IProps {
  couponorder:any;
}

let params = {
  current: 1,
  orderNo: "",
  rtime: [],
  companyHe: [],
  orderChannel:""
}
let resetParams = {
  current: 1,
  orderNo: "",
  rtime: [],
  companyHe: [],
  orderChannel:""
}

class IncomeMemcerorder extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getCouponOrder(params)
  }

  render() {
    const {spinning, utils, couponorder} = this.props

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{
              if(!values){
                params = resetParams
              }else{
                params = {...params, ...values}
              }
              this.props.actions.getCouponOrder(params)
            }}
            data={[
              {label:"订单号", name: "orderNo", type: "input"},
              {label:"订单时间", name: "rtime", type: "rangepicker"},
              {label:"下单途径", name: "orderChannel", type: <PayTypeElement/>},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={memcerorderColumns} dataSource={couponorder?utils.addIndex(couponorder.list):[]}
            pagination={utils.Pagination(couponorder, page=>{
              params.current = page;
              this.props.actions.getCouponOrder(params)
            })} />
        </div>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCouponOrder}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    couponorder: state.change.couponorder,
    utils: state.app.utils,
    spinning: state.change.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(IncomeMemcerorder)