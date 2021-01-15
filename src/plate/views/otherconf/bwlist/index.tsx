import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Popconfirm, Table } from "antd";
import { bwlistColumns } from "../columns";
import { getBwlist, changeBwlist} from "@plate/actions/otherAction";
import StatusElement from "@public/components/Element/StatusElement";
import SearchModular from "@public/components/Modular/SearchModular";
import AddModular from "@public/components/Modular/AddModular";



interface Props extends IProps {
  bwlist:any;
}

let params = {
  current: 1,
  license:"",
  linkPhone:"",
  linkName:"",
  status: "",
  type:""
}

let resetParams = {
  current: 1,
  license:"",
  linkPhone:"",
  linkName:"",
  status: "",
  type:""
}


class Bwlist extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: ""}
  }

  componentDidMount(){
    this.props.actions.getBwlist(params)
  }

  getCol(){
    return [...bwlistColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement size="small" notAll value={item} onChange={()=>{
        this.props.actions.changeBwlist({
          objective: "enable",
          id: rows.id
        }, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getBwlist(params, {obj: res, type: "edit"})
        })
      }} />
    },{
      title: "操作",
      render: (item:any)=>{
        return (
          <>
            <Button type="link" size="small" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.changeBwlist({
                objective: "delete",
                id: item.id
              }, (res:any)=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getBwlist(params, {refresh: true})
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
    const {spinning, utils, bwlist } = this.props
    const {addVisible, editVisible, detail } = this.state
    
    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增</Button>}
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{
              params = values?{...params,...values}:resetParams
              this.props.actions.getBwlist(params)
            }}
            data={[
              {label: "车牌", name: "license", type: "input"},
              {label: "联系人电话", name: "linkPhone", type: "input"},
              {label: "联系人名称", name: "linkName", type: "input"},
              {label: "名单类型", name: "type", type: "select", selectList: [
                {label:"全部", id: ""},
                {label:"白名单", id: 0},
                {label:"黑名单", id: 1},
              ]},
              {label: "状态", name: "status", type: <StatusElement/>},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={bwlist?utils.addIndex(bwlist.list):[]} 
          pagination={utils.Pagination(bwlist, page=>{
            params.current = page
            this.props.actions.getBwlist(params)
          })} />
        </div>

        <AddModular
          title="新增黑白名单"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeBwlist({
              ...values,
              objective: "add",
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getBwlist(params, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "名单类型", name: "type", type: "select", selectList: [
              {label:"白名单", id: 0},
              {label:"黑名单", id: 1},
            ], rules: true},
            {label: "车牌", name: "license", type: "input", rules: true},
            {label: "联系人电话", name: "linkPhone", type: "input", rules: true},
            {label: "联系人名称", name: "linkName", type: "input", rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />
        <AddModular
          title="编辑黑白名单"
          spinning={spinning}
          visible={editVisible}
          initialValues={detail}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeBwlist({
              ...values,
              objective: "update",
              id: detail.id
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getBwlist(params, {obj: res, type: "edit"})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "名单类型", name: "type", type: "select", selectList: [
              {label:"白名单", id: 0},
              {label:"黑名单", id: 1},
            ], rules: true},
            {label: "车牌", name: "license", type: "input", rules: true},
            {label: "联系人电话", name: "linkPhone", type: "input", rules: true},
            {label: "联系人名称", name: "linkName", type: "input", rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getBwlist, changeBwlist}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    bwlist: state.other.bwlist,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Bwlist)