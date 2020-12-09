import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getcardOrder } from "@power/actions/changeAction"
import { Button, Col, Row, Table } from "antd";
import { cardorderColumns } from "../columns";
import SearchModular from "@power/components/Modular/SearchModular";
import PayTypeElement from "@power/components/Element/PayTypeElement";
import { Link } from "react-router-dom";


interface Props extends IProps {
  cardorder:any;
}

let params = {
  current: 1,
  orderNo: "",
  orderChannel: "",
  cardNo: "",
  rtime: []
}
let resetParams = {
  current: 1,
  orderNo: "",
  cardNo:"",
  orderChannel: "",
  rtime: []
}

class IncomeCardorder extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getcardOrder(params)
  }

  getCol(){
    return [...cardorderColumns, {
      title: "操作",
      render:(item:any)=>{
        
        return (
          <Link to={`/card/${item.cardNo}/detail`}>
            <Button size="small" type="link" >详情</Button>
          </Link>
        )
      }
    }]
  }

  render() {
    const {spinning, utils, cardorder} = this.props

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
              this.props.actions.getcardOrder(params)
            }}
            data={[
              {label: "订单号", name: "orderNo", type:"input"},
              {label: "充电卡卡号", name: "cardNo", type:"input"},
              {label: "充值途径", name: "orderChannel", type:<PayTypeElement/>},
              {label: "创建时间", name: "rtime", type:"rangepicker"},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={cardorder?utils.addIndex(cardorder.list):[]}
            pagination={utils.Pagination(cardorder, page=>{
              params.current = page
              this.props.actions.getcardOrder(params)
            })} />
        </div>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getcardOrder}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    cardorder: state.change.cardorder,
    utils: state.app.utils,
    spinning: state.change.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(IncomeCardorder)