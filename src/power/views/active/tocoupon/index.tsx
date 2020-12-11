import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getTocouponList} from "@power/actions/activeAction"
import { Button, Table } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import {memcerColumns } from "../columns"
import StatusElement from "@power/components/Element/StatusElement";


interface Props extends IProps {
  tocoupon:any;
}

let params = {
  current: 1,
  companyHe: [],
  status: "",
  activityName: "",
}
let resetParams = {
  current: 1,
  companyHe: [],
  status: "",
  activityName: "",
}

class ActiveTocoupon extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getTocouponList(params)
  }

  render() {
    const {spinning, utils, tocoupon} = this.props
    console.log(tocoupon)
    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            before={<Button type="primary">新增</Button>}
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{

            }}
            data={[
              {label: "活动名称", name: "activeName", type: "input"},
              {label: "公司/项目", name: "companyHe", type: <CompanyHeElement/>},
              {label: "状态", name: "status", type: <StatusElement/>},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={memcerColumns} dataSource={tocoupon?utils.addIndex(tocoupon.list):[]}
          pagination={utils.Pagination(tocoupon, page=>{
            params.current = page
            this.props.actions.getTocouponList(params)
          })} />
        </div>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getTocouponList}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    tocoupon: state.active.tocoupon,
    utils: state.app.utils,
    spinning: state.active.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ActiveTocoupon)