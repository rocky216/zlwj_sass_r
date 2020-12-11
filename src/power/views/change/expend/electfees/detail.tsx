import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getElectfeesDetail} from "@power/actions/changeAction"
import { Button, Card, Descriptions, Skeleton, Table, Tag, Typography } from "antd";
import { Status, StatusColor } from "@public/common/powerMapper";
import { electfeesDetailColumns } from "../columns";


interface Props extends IProps {
  electdetail:any;
}

class ElectfeesDetail extends React.Component<Props> {

  state = {
    detailList: [
      {title: "单号", name: "orderNo"},
      {title: "抄表前合计度数", name: "initDegrees"},
      {title: "抄表后合计度数", name: "totalDegrees"},
      {title: "新增计费度数", name: "changeDegrees"},
      {title: "支出电费", name: "orderFee"},
      {title: "状态", name: "status"},
      {title: "创建信息", name: "buildTime"},
      {title: "备注", name: "remark"},
    ]
  }

  componentDidMount(){
    this.props.actions.getElectfeesDetail({orderNo: this.props.match.params.orderNo})
  }

  render() {
    const {spinning, utils, electdetail, history} = this.props
    const {detailList} = this.state

    return (
      <JCard spinning={spinning}> 
        {electdetail?
        <>
          <Card size="small">
            <Descriptions title={electdetail.powerMeterOrder.companyStr+electdetail.powerMeterOrder.itemStr+electdetail.powerMeterOrder.orderName} extra={<Button onClick={()=>history.goBack()}>返回</Button>} >
              {detailList.map((item,index)=>(
                <Descriptions.Item key={index} label={item.title}>
                  {item.name=="status"?<Tag color={StatusColor[electdetail.powerMeterOrder[item.name]]}>{Status[electdetail.powerMeterOrder[item.name]]}</Tag>
                    :electdetail.powerMeterOrder[item.name]}
                  </Descriptions.Item>
              ))}
            </Descriptions>
          </Card>
          <Card size="small" title={<Typography.Title level={5}>支出详情</Typography.Title>}>
            <Table size="small" columns={electfeesDetailColumns} dataSource={utils.addIndex(electdetail.powerMeterOrderDescList)}
            pagination={false} />
          </Card>
        </>
        :<Skeleton active />}
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getElectfeesDetail}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    electdetail: state.change.electdetail,
    utils: state.app.utils,
    spinning: state.change.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ElectfeesDetail)