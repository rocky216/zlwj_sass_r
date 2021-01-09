import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import {getLeaseActive, changeLeaseActive } from "@plate/actions/parkAction"
import { Button, Card, Popconfirm, Table } from "antd";
import { parkLeaseActiveColumns } from "../../columns";
import StatusElement from "@public/components/Element/StatusElement";
import AddModular from "@public/components/Modular/AddModular";
import Leasedurate from "./leasedurate";
import BeInputNumber from "@public/components/Element/BeInputNumber";



interface Props extends IProps {
  leaseactive:any;
}


class LeaseActive extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: ""}
  }

  componentDidMount(){
    this.props.actions.getLeaseActive({parkId: this.props.match.params.id})
  }

  getCol(){
    return [...parkLeaseActiveColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement notAll size="small" value={item} onChange={()=>{
        this.props.actions.changeLeaseActive({
          objective:"enable",
          id: rows.id
        }, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getLeaseActive({parkId: this.props.match.params.id}, {obj: res, type: "list"})
        })
      }} />
    }, {
      title: "操作",
      render:(item:any)=>{
        return (
          <>
            <Button size="small" type="link" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.changeLeaseActive({
                objective:"remove",
                id: item.id
              }, (res:any)=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getLeaseActive({parkId: this.props.match.params.id}, {refresh: true})
              })
            }}>
              <Button size="small" type="link">删除</Button>
            </Popconfirm>
          </>
        )
      }
    }]
  }

  render() {
    const {spinning, utils, leaseactive} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <>
        <Card className="mgb10" size="small" title="租赁车位活动列表" 
          extra={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增活动</Button>} >
          <Table size="small" columns={this.getCol()} dataSource={leaseactive?utils.addIndex(leaseactive):[]} pagination={false} />
        </Card>
        <AddModular
          title="新增租赁车位活动"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeLeaseActive({
              ...values,
              objective: "add",
              parkId: this.props.match.params.id
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getLeaseActive({parkId: this.props.match.params.id}, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "租赁活动名称", name: "activityName", type: "input", rules: true},
            {label: "租赁时长", name: "activityNum", type: <Leasedurate/>, rules: true},
            {label: "租赁价格", name: "activityMoney", type: <BeInputNumber suffix="元" />, rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑租赁车位活动"
          spinning={spinning}
          visible={editVisible}
          initialValues={detail}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeLeaseActive({
              ...values,
              objective: "update",
              parkId: this.props.match.params.id,
              id: detail.id
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getLeaseActive({parkId: this.props.match.params.id}, {obj: res, type: "list"})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "租赁活动名称", name: "activityName", type: "input", rules: true},
            {label: "租赁时长", name: "activityNum", type: <Leasedurate/>, rules: true},
            {label: "租赁价格", name: "activityMoney", type: <BeInputNumber suffix="元" />, rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />
      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getLeaseActive, changeLeaseActive }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    leaseactive: state.park.leaseactive,
    utils: state.app.utils,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(LeaseActive)