import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Col, DatePicker, Row, Select, Table } from "antd";
import { carLogColumns } from "./columns";
import {getPlatePassRecordPages} from "@plate/actions/otherAction"
import SearchModular from "@public/components/Modular/SearchModular";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { CarStatus, PassType, CarPayStatus} from "@public/common/plateMapper";
import ParkElement from "@plate/components/Element/ParkElement";
import moment from "moment";

const {Option} = Select
const {RangePicker} = DatePicker

interface Props extends IProps {
  accesslog:any;
}

let params = {
  current: 1,
  isMoney: false,
  rtime: [],
  license: "",
  passType: "",
  orderState: "",
  parkId:[],
  passState:""
}

let resetParams = {
  current: 1,
  isMoney: "",
  rtime: [],
  license: "",
  passType: "",
  orderState: "",
  parkId:[],
  passState:""
}

class CarLog extends React.Component<Props> {

  state:any = {
    dates: []
  }

  componentDidMount(){
    this.props.actions.getPlatePassRecordPages(params)
  }

  render() {
    const {spinning, utils, accesslog} = this.props
    const {dates} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Row>
            <Col span={20}>
              <Table size="small" columns={carLogColumns} dataSource={accesslog?utils.addIndex(accesslog.list):[]} 
              pagination={utils.Pagination(accesslog, page=>{
                params.current = page
                this.props.actions.getPlatePassRecordPages(params)
              })} />
            </Col>
            <Col span={4}>
              <SearchModular
                layout="vertical"
                initialValues={params}
                resetValues={resetParams}
                submitSearch={(values:any)=>{
                  params = values?{...params, ...values}:resetParams
                  this.props.actions.getPlatePassRecordPages(params)
                }}
                data={[
                  { name: "isMoney", type: <Checkbox>收费记录</Checkbox>, valuePropName: "checked"},
                  {label: "通行时间", name: "rtime", type: <RangePicker
                    disabledDate={(current)=>{
                      if (!dates || dates.length === 0) {
                        return false;
                      }
                      const tooLate = dates[0] && current>=moment( (parseInt(moment(dates[0]).format("YYYY"))+1)+"-01-01");
                      return tooLate;
                    }}
                    onCalendarChange={(dates)=>this.setState({dates})}
                    onOpenChange={(open)=>{
                      if(open){
                        this.setState({dates:[]})
                      }
                    }}
                  />},
                  {label: "车牌号码", name: "license", type: "input"},
                  {label: "车辆类型", name: "passType", type: (
                    <Select>
                      <Option value="">全部</Option>
                      {PassType.map((item,index)=>(
                        <Option key={index} value={index}>{item}</Option>
                      ))}
                    </Select>
                  )},
                  {label: "记录状态", name: "orderState", type: (
                    <Select>
                      <Option value="">全部</Option>
                      {CarStatus.map((item,index)=>(
                        <Option key={index} value={index}>{item}</Option>
                      ))}
                    </Select>
                  )},
                  {label: "支付状态", name: "passState", type: (
                    <Select>
                      <Option value="">全部</Option>
                      {CarPayStatus.map((item,index)=>(
                        <Option key={index} value={index}>{item}</Option>
                      ))}
                    </Select>
                  )},
                  {label: "停车场", name:"parkId", type: <ParkElement/>}
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
    actions: bindActionCreators({getPlatePassRecordPages}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    accesslog: state.other.accesslog,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(CarLog)