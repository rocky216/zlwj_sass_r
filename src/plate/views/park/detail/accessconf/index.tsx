import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import { Button, Card, Popconfirm, Table } from "antd";
import { parkAccessColumns } from "../../columns";
import {getAccessCode, changeAccessCode} from "@plate/actions/parkAction"
import AddModular from "@public/components/Modular/AddModular";
import StatusElement from "@public/components/Element/StatusElement";



interface Props extends IProps {
  accesscode:any;
}

class ParkAccessconf extends React.Component<Props> {

  state = {
    addVisible: false
  }

  componentDidMount(){
    this.props.actions.getAccessCode({parkId: this.props.match.params.id})
  }

  getCol(){
    return [...parkAccessColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement size="small" notAll value={item} onChange={()=>{
        this.props.actions.changeAccessCode({
          objective: "enable",
          id: rows.id
        }, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getAccessCode({parkId: this.props.match.params.id}, {obj: res, type: "list"})
        })
      }} />
    }, {
      title: "操作",
      render: (item:any)=>{
        return (
          <Popconfirm title="是否删除？" onConfirm={()=>{
            this.props.actions.changeAccessCode({
              objective: "delete",
              id: item.id
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getAccessCode({parkId: this.props.match.params.id}, {refresh: true})
            })
          }}>
            <Button size="small" type="link">删除</Button>
          </Popconfirm>
        )
      }
    }]
  }

  render() {
    const {spinning, utils, accesscode } = this.props
    const {addVisible} = this.state

    return (
      <>
        <Card size="small" title="通行码权限配置" extra={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增人员</Button>} >
          <Table size="small" columns={this.getCol()} dataSource={accesscode?utils.addIndex(accesscode):[]} 
          pagination={false} />
        </Card>
        <AddModular
          title="新增人员"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeAccessCode({
              ...values,
              objective: "add",
              parkId: this.props.match.params.id
            }, ()=>{
              utils.OpenNotification("success")
              this.props.actions.getAccessCode({parkId: this.props.match.params.id}, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "姓名", name: "authName", type: "input", rules: true},
            {label: "手机号", name: "authPhone", type: "inputNumber", rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll/>, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />
      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getAccessCode, changeAccessCode }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    accesscode: state.park.accesscode,
    utils: state.app.utils,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ParkAccessconf)