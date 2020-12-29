import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getPowerDevicetype, changePowerDevicetype, deletePowerDevicetype, addTypeCallback} from "@power/actions/projectAction"
import { Button, Card, Popconfirm, Select, Table } from "antd";
import { deviceTypeColumns,  } from "../columns";
import StatusElement from "@power/components/Element/StatusElement";
import AddModular from "@power/components/Modular/AddModular";
import TypeConf from "./typeconf"


const {Option} = Select

interface Props extends IProps {
  devicetype:any;
}

let params = {
  current: 1,
}

class DeviceType extends React.Component<Props> {


  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: ""},
    typeVisible: false
  }

  componentDidMount(){
    this.props.actions.getPowerDevicetype(params)
  }

  getCol(){
    return [...deviceTypeColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=>{
        return (
          <StatusElement size="small" notAll value={item} onChange={(v:any)=>{
            this.props.actions.changePowerDevicetype({
              objective: "enable",
              id: rows.id
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getPowerDevicetype(params,{obj: res, type: "edit"})
            })
          }} />
        )
      }
    }, {
      title: "操作",
      width: 200,
      render:(item:any)=>{
        return (
          <>
            <Button size="small" type="link" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Button size="small" type="link" onClick={()=>this.setState({typeVisible: true, detail: item})} >类型配置</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.deletePowerDevicetype({id: item.id}, ()=>{
                this.props.actions.getPowerDevicetype(params, {refresh: true})
                this.props.utils.OpenNotification("success")
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
    const {addVisible, editVisible, detail, typeVisible} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Card size="small" title={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增</Button>} >
            <Table size="small" columns={this.getCol()} 
              dataSource={devicetype?utils.addIndex(devicetype.list):[]}
              pagination={utils.Pagination(devicetype, page=>{
                params.current = page
                this.props.actions.getPowerDevicetype(params)
              })} />
          </Card>
        </div>

        <AddModular
          title="新增设备类型"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values)=>{
            this.props.actions.changePowerDevicetype({objective: "add", ...values}, ()=>{
              this.props.actions.getPowerDevicetype(params, {refresh: true})
              this.setState({addVisible: false})
              utils.OpenNotification("success")
            })
          }}
          data={[
            {label: "类型编码", name:"typeName", type: "input", rules: true},
            {label: "类型名称", name:"typeCode", type: "input", rules: true},
            {label: "状态", name:"status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name:"remark", type: "textarea"},
          ]}
        />
        <AddModular
          title="编辑设备类型"
          spinning={spinning}
          visible={editVisible}
          initialValues={detail}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values)=>{
            this.props.actions.changePowerDevicetype({objective: "update",id: detail.id, ...values}, (res:any)=>{
              this.props.actions.getPowerDevicetype(params, {obj: res, type: "edit"})
              this.setState({editVisible: false})
              utils.OpenNotification("success")
            })
          }}
          data={[
            {label: "类型编码", name:"typeName", type: "input", rules: true},
            {label: "类型名称", name:"typeCode", type: "input", rules: true},
            {label: "状态", name:"status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name:"remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="设备类型配置"
          width={700}
          spinning={spinning}
          visible={typeVisible}
          initialValues={detail}
          onCancel={()=>this.setState({typeVisible: false})}
          onOk={(values)=>{
            this.props.actions.addTypeCallback({callbackJson:JSON.stringify(values.callbackJson), id: detail.id}, (res:any)=>{
              this.setState({typeVisible: false})
              this.props.actions.getPowerDevicetype(params, {obj: res, type: "edit"})
              utils.OpenNotification("success")
            })
          }}
          data={[
            {name: "callbackJson", type: <TypeConf/>, rules: true, wrapperCol: {span: 24}}
          ]}
        />
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getPowerDevicetype, changePowerDevicetype, deletePowerDevicetype, addTypeCallback}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    devicetype: state.project.devicetype,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceType)