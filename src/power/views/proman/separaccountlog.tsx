import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getSeparaccountLog} from "@power/actions/projectAction"
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import {separaccountLogColumns} from "./columns"
import { Table } from "antd";

interface Props extends IProps {
  separaccountlog:any;
}

let params = {
  companyHe: [],
  status: ""
}
let resetParams = {
  companyHe: [],
  status: ""
}


class SeparaccountLog extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getSeparaccountLog(params)
  }

  render() {
    const {spinning, utils, separaccountlog} = this.props

    return (
      <JCard spinning={spinning}>
        <div key="a">
          <SearchModular
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{

            }}
            data={[
              {label: "状态", name: "status", type: "input"},
              {label: "公司/小区", name: "companyHe", type: <CompanyHeElement/>},
            ]}
          />
        </div>
        <div key="b">
          <Table columns={separaccountLogColumns} dataSource={separaccountlog?utils.addIndex(separaccountlog.list):[]} />
        </div>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getSeparaccountLog}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    separaccountlog: state.project.separaccountlog,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(SeparaccountLog)