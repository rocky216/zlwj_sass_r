import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Card, Popconfirm, Table } from "antd";
import {getParkList, changePark } from "@plate/actions/parkAction"
import AddModular from "@public/components/Modular/AddModular";
import StatusElement from "@public/components/Element/StatusElement";
import { parkColumns } from "./columns";



interface Props extends IProps {
  parktree:any;
}


class ParkPage extends React.Component<Props> {

  state = {
    addVisible: false,
    detail: {id: 0, parentId: 0},
    editVisible: false,
  }

  componentDidMount(){
    this.props.actions.getParkList({})
  }

  getCol(){
    return [...parkColumns, {
      title: "操作",
      render:(item:any)=>(
        <>
          <Button type="link" size="small" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
          {item.parentId?null:
          <Button type="link" size="small" onClick={()=>this.setState({addVisible: true, detail: item})} >添加子停车场</Button>}
          <Button type="link" size="small" onClick={()=>{
            this.props.history.push({
              pathname: `/park/${item.id}/detail/base`,
              state: ""
            })
          }} >详情</Button>
          <Popconfirm title="是否删除？" onConfirm={()=>{
            this.props.actions.changePark({
              id: item.id,
              objective: "delete"
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getParkList({}, {refresh: true})
            })
          }}>
            <Button type="link" size="small">删除</Button>
          </Popconfirm>
          
        </>
      )
    }]
  }

  render() {
    const {spinning, utils, parktree} = this.props
    const {addVisible, detail, editVisible } = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Card size="small" title={<Button type="primary" 
            onClick={()=>this.setState({addVisible:true, detail: {id: 0, parentId: 0 }})} >新增</Button>}>
            <Table size="small" 
              expandable={{defaultExpandAllRows: true}}
              bordered columns={this.getCol()} 
              dataSource={parktree?utils.addIndex(parktree,true):[]} />
          </Card>
        </div>
        <AddModular
          title="新增停车场"
          visible={addVisible}
          spinning={spinning}
          onCancel={()=>this.setState({addVisible: false, })}
          onOk={(values:any)=>{
            this.props.actions.changePark({
              ...values,
              objective: "add",
              parentId: detail.id
            },()=>{
              utils.OpenNotification("success")
              this.props.actions.getParkList({}, {refresh: true})
              this.setState({addVisible: false })
            })
          }}
          data={[
            {label: "停车场名称", name: "parkName", type: "input"},
            {label: "停车场编号", name: "parkCode", type: "input"},
            {label: "状态", name: "status", type: <StatusElement notAll />},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑停车场"
          visible={editVisible}
          spinning={spinning}
          onCancel={()=>this.setState({editVisible: false })}
          initialValues={detail}
          onOk={(values:any)=>{
            this.props.actions.changePark({
              ...values,
              objective: "update",
              id: detail.id,
              parentId: detail.parentId
            },()=>{
              utils.OpenNotification("success")
              this.props.actions.getParkList({}, {refresh: true})
              this.setState({editVisible: false })
            })
          }}
          data={[
            {label: "停车场名称", name: "parkName", type: "input"},
            {label: "停车场编号", name: "parkCode", type: "input"},
            {label: "状态", name: "status", type: <StatusElement notAll />},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getParkList, changePark}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    parktree: state.park.parktree,
    utils: state.app.utils,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ParkPage)