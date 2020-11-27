import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import {getMessageOrder} from "@admin/actions/messageAction"
import JCard from "@admin/components/JCard"
import { Card, Table, DatePicker, Input, Select} from "antd";
import {messageOrderColumns} from "../columns"
import SelectCompamy from "@admin/components/Element/SelectCompany"
import Search from "@admin/components/Submit/Search";

const {RangePicker} = DatePicker

interface Props extends IProps {
  orders: any;
}

let params:any = {
  current: 1,
  companyId: "",
  time: null,
  PayWay: "",
  packageName: ""
}
let restParams:any = {
  current: 1,
  companyId: "",
  time: null,
  PayWay: "",
  packageName: ""
}

class MessageOrder extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getMessageOrder({params})
  }

  submitSearch(values:any){
    if(!values){
      params = restParams
    }else{
      params = {...params, ...values}
    }
    
    this.props.actions.getMessageOrder({params})
  }

  render() {
    const {spinning,utils, orders} = this.props

    return (
      <JCard spinning={spinning}>
        <div key="a">
          <Search
            initialValues={params}
            resetValues={restParams}
            handleSearch={this.submitSearch.bind(this)}
            data={[
              {label:"时间", name: "time", type: RangePicker},
              {label:"公司", name: "companyId", type: <SelectCompamy/>},
              {label:"短信包", name: "packageName", type: Input},
              {label:"支付类型", name: "PayWay", type: Select, selectList: [
                {label: "全部", id: ""},
                {label: "微信", id: "W"}, 
                {label: "支付宝", id: "Z"},
              ]},
            ]}
          />
        </div>
        <div key="b">
          <Card size="small" key="b">
            <Table size="small" columns={messageOrderColumns} dataSource={orders?utils.addIndex(orders.list):[]} 
            pagination={utils.Pagination(orders, page=>{
              params.current = page
              this.props.actions.getMessageOrder({params, refresh: true})
            })}/>
          </Card>
        </div>

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getMessageOrder}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    orders: state.message.orders,
    utils: state.app.utils,
    spinning: state.message.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(MessageOrder)