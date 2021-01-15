import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Card, Popconfirm, Table } from "antd";
import { sysDeviceTypeConfColumns } from "../columns";
import {getDeviceTypeConf, changeDeviceTypeConf, addOrUpTypeCallback} from "@plate/actions/otherAction"
import StatusElement from "@public/components/Element/StatusElement";
import AddModular from "@public/components/Modular/AddModular";
import TypeForm from "./typeform";



interface Props extends IProps {
  devicetype:any;
}

let params = {
  current: 1
}

class SysDeviceTypeConf extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", typeCallbackJson: null},
    confVisible: false,
  }

  componentDidMount(){
    this.props.actions.getDeviceTypeConf(params)
  }

  getCol(){
    return [...sysDeviceTypeConfColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement size="small" notAll value={item} onChange={()=>{
        this.props.actions.changeDeviceTypeConf({
          objective: "enable",
          id: rows.id
        }, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getDeviceTypeConf(params, {obj: res, type: "edit"})
        })
      }} />
    },{
      title: "操作",
      width: 180,
      render: (item:any)=>{
        return (
          <>
            <Button type="link" size="small" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Button size="small" type="link"  onClick={()=>this.setState({confVisible: true, detail: item})} >类型配置</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.changeDeviceTypeConf({
                objective: "delete",
                id: item.id
              }, (res:any)=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getDeviceTypeConf(params, {refresh: true})
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
    const {spinning, utils, devicetype} = this.props
    const {addVisible, editVisible, detail, confVisible } = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Card size="small" title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增</Button>}>
            <Table size="small" columns={this.getCol()} dataSource={devicetype?utils.addIndex(devicetype.list):[]} 
            pagination={utils.Pagination(devicetype, page=>{
              params.current = page;
              this.props.actions.getDeviceTypeConf(params)
            })} />
          </Card>
        </div>

        <AddModular
          title="新增设备类型"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.changeDeviceTypeConf({
              ...values,
              objective: "add",
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getDeviceTypeConf(params, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "类型编号", name: "typeCode", type: "input", rules: true},
            {label: "类型名称", name: "typeName", type: "input", rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "reamrk", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑设备类型"
          spinning={spinning}
          visible={editVisible}
          initialValues={detail}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.changeDeviceTypeConf({
              ...values,
              objective: "update",
              id: detail.id
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getDeviceTypeConf(params, {obj: res, type: "edit"})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "类型编号", name: "typeCode", type: "input", rules: true},
            {label: "类型名称", name: "typeName", type: "input", rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "reamrk", type: "textarea"},
          ]}
        />

        <AddModular
          title="设备类型配置"
          width={800}
          spinning={spinning}
          visible={confVisible}
          initialValues={detail}
          onCancel={()=>this.setState({confVisible: false,detail:{id: "", typeCallbackJson:null}})}
          onOk={(values)=>{
            this.props.actions.addOrUpTypeCallback({
              typeCallbackJson: JSON.stringify(values.typeCallbackJson),
              typeId: detail.id,
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getDeviceTypeConf(params, {obj: res, type: "edit"})
              this.setState({confVisible: false})
            })
          }}
          data={[
            {name: "typeCallbackJson", type:<TypeForm/>,wrapperCol:{span: 24}, rules: true}
          ]}
        />
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getDeviceTypeConf, changeDeviceTypeConf, addOrUpTypeCallback }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    devicetype: state.other.devicetype,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(SysDeviceTypeConf)