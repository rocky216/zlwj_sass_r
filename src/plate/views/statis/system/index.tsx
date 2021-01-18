import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Card, DatePicker, Radio, Tabs } from "antd";
import SearchModular from "@public/components/Modular/SearchModular";
import moment from "moment";
import PayExpendStatis from "../PayExpendStatis";

const {TabPane} = Tabs
const {RangePicker} =  DatePicker

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

class SystemStatis extends React.Component<Props> {

  state = {
    dType: params.type,
    activeKey: "1",
    isChange:0
  }

  render() {
    const {spinning, utils} = this.props
    const {activeKey, dType, isChange} = this.state

    return (
      <JCard spinning={spinning}> 
        <Card size="small">
          <Tabs
            type="card" 
            activeKey={activeKey}
            onChange={(v)=>this.setState({activeKey:v})}
            tabBarExtraContent={(
              <div style={{marginBottom: "1px"}}>
                  <SearchModular
                  bordered={false}
                  initialValues={params}
                  submitSearch={(values:any)=>{
                    params = {...params, ...values}
                    this.setState({isChange: isChange+1})
                  }}
                  data={[
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
          )}
          >
            <Tabs.TabPane tab="收支数据" key="1" />
            {/* <Tabs.TabPane tab="订单数据" key="2" /> */}
          </Tabs>
        </Card>
        <PayExpendStatis params={params} isChange={isChange} />
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
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(SystemStatis)