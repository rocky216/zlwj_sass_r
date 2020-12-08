import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getTocouponList} from "@power/actions/activeAction"
import { Table } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";


interface Props extends IProps {

}

let params = {
  current: 1,
  companyHe: []
}

class ActiveTocoupon extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getTocouponList(params)
  }

  render() {
    const {spinning, utils} = this.props

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            initialValues={params}
            submitSearch={(values:any)=>{

            }}
            data={[
              {label: "活动名称", name: "activeName", type: "input"},
              {label: "公司/项目", name: "companyHe", type: <CompanyHeElement/>}
            ]}
          />
        </div>
        <div key="b">
          <Table/>
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
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ActiveTocoupon)