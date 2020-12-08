import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Col, Row, Table } from "antd";
import {couponColumns} from "../columns"
import {getConponList} from "@power/actions/activeAction"
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";


interface Props extends IProps {
  conpon:any;
}

let params = {
  current: 1,
  companyHe: [],
  useNo: "",
  temId: "",
  rtime: "",
  activityObject: "",
  couponType: "",
}

let resetParams = {
  current: 1,
  companyHe: [],
  useNo: "",
  temId: "",
  rtime: "",
  activityObject: "",
  couponType: "",
}

class ActiveCoupon extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getConponList(params)
  }

  render() {
    const {spinning, utils, conpon} = this.props

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Row>
            <Col span={20}>
              <Table size="small" columns={couponColumns} dataSource={conpon?utils.addIndex(conpon.list):[]} 
              pagination={utils.Pagination(conpon, page=>{
                params.current = page
                this.props.actions.getConponList(params)
              })}/>
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
                  this.props.actions.getConponList(params)
                }}
                data={[
                  {label:"劵ID", name: "useNo", type: "input"},
                  {label:"劵类型", name: "couponType", type: "select", selectList: [
                    {label: "会员券", id: "VIP"},
                    {label: "金额券", id: "MONEY"},
                    {label: "时间券", id: "TIME"},
                  ]},
                  {label:"公司/项目", name: "companyHe", type: <CompanyHeElement/>},
                  {label:"领劵人ID", name: "temId", type: "input"},
                  {label:"领劵时间", name: "rtime", type: "rangepicker"},
                  {label:"用劵途径", name: "activityObject", type: "select", selectList: [
                    {label: "全部", id: ""},
                    {label: "业主app", id: 0},
                    {label: "小程序", id: 1},
                  ]},
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
    actions: bindActionCreators({getConponList}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    conpon: state.active.conpon,
    utils: state.app.utils,
    spinning: state.active.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ActiveCoupon)