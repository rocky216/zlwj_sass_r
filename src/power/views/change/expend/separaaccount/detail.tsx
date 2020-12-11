import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getseparaaccountDetail} from "@power/actions/changeAction"
import { Button, Card, Descriptions, Skeleton, Table, Tag, Typography } from "antd";
import { Status, StatusColor } from "@public/common/powerMapper";
import { separaaccountDetailColumns } from "../columns";


interface Props extends IProps {
  acountdetail:any;
}

class ElectfeesDetail extends React.Component<Props> {

  state = {
    detailList: [
      {title: "单号", name: "orderNo"},
      {title: "分账总额", name: "orderFee"},
      {title: "状态", name: "status"},
      {title: "创建信息", name: "buildTime"},
      {title: "备注", name: "remark"},
    ]
  }

  componentDidMount(){
    this.props.actions.getseparaaccountDetail({id: this.props.match.params.id})
  }

  render() {
    const {spinning, utils, acountdetail, history} = this.props
    const {detailList} = this.state

    return (
      <JCard spinning={spinning}> 
        {acountdetail?
        <>
          <Card size="small">
            <Descriptions title={acountdetail.companyName+acountdetail.itemName+acountdetail.orderName} extra={<Button onClick={()=>history.goBack()}>返回</Button>} >
              {detailList.map((item,index)=>(
                <Descriptions.Item key={index} label={item.title}>
                  {item.name=="status"?<Tag color={StatusColor[acountdetail[item.name]]}>{Status[acountdetail[item.name]]}</Tag>
                    :acountdetail[item.name]}
                  </Descriptions.Item>
              ))}
            </Descriptions>
          </Card>
          <Card size="small" title={<Typography.Title level={5}>支出详情</Typography.Title>}>
            <Table size="small" columns={separaaccountDetailColumns} dataSource={utils.addIndex(acountdetail.orderDescs)}
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
    actions: bindActionCreators({getseparaaccountDetail}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    acountdetail: state.change.acountdetail,
    utils: state.app.utils,
    spinning: state.change.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ElectfeesDetail)