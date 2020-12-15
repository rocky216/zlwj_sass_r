import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Card, Col, DatePicker, Radio, Row, Tabs, Typography, Skeleton} from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import moment from "moment";
import _ from "lodash";
import PayStatis from "../system/paystatis"
import OrderStatis from "../system/orderstatis"
import CompanyHeElement from "@power/components/Element/CompanyHeElement";

const {RangePicker} = DatePicker

interface Props extends IProps {
}

let params:any = {
  companyHe: [],
  rtime: null,
  type: "year",
  selectDate:moment(),
  leven: "S",
  selectType: "I"
}

type DTypeProps = "year" | "time" | "date" | "week" | "month" | "quarter" | undefined;
interface State {
  dType:DTypeProps;
}

class HeStatis extends React.Component<Props> {

  state:any = {
    dType: params.type,
    isChange: 1,
    activeKey: "1",
    companyHe: params.companyHe
  }


  render() {
    const {spinning, utils,} = this.props
    const {dType, isChange, activeKey, companyHe} = this.state
    

    return (
      <JCard spinning={spinning}> 
        <Card size="small" >
            <Tabs type="card" activeKey={activeKey} 
              onChange={(v)=>this.setState({activeKey:v})}
            tabBarExtraContent={(
              <div style={{marginBottom: "1px"}}>
                  <SearchModular
                  bordered={false}
                  initialValues={params}
                  submitSearch={(values:any)=>{
                    params = {...params, ...values}
                    this.setState({isChange: isChange+1, companyHe: values.companyHe})
                  }}
                  data={[
                    {name:"companyHe", type: <CompanyHeElement />, rules:true},
                    {name: "type", type: (
                      <Radio.Group onChange={({target})=>this.setState({dType:target.value})}>
                        <Radio.Button value="year">年</Radio.Button>
                        <Radio.Button value="month">月</Radio.Button>
                        <Radio.Button value="date">日</Radio.Button>
                      </Radio.Group>
                    )},
                    {name: dType=="date"?"rtime":"selectDate", 
                    type: dType=="date"?<RangePicker/>:<DatePicker picker={dType} />, rules: true}
                  ]}
                />
              </div>
          )} >
          <Tabs.TabPane tab="收支数据" key="1" />
          <Tabs.TabPane tab="订单数据" key="2" />
        </Tabs>
        </Card>
        {activeKey==1 && companyHe.length?<PayStatis params={params} isChange={isChange} />:null}
        {activeKey==2 && companyHe.length?<OrderStatis params={params} isChange={isChange} />:null}
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    spinning: state.statis.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(HeStatis)