import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Card, Popconfirm, Select, Table } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import {getShedConfList, statusSheConf, addSheConf, editSheConf, deleteSheConf} from "@power/actions/projectAction"
import {sheConfColumns, } from "./columns"
import AddModular from "@power/components/Modular/AddModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";

const {Option} = Select

interface Props extends IProps {
  sheconf:any;
}

let params = {
  current:1,
  shedName: "",
  status: ""
}
let resetParams = {
  current:1,
  shedName: "",
  status: ""
}

class CharSheConfPage extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "",companyId:"", itemId:""}
  }

  componentDidMount(){
    this.props.actions.getShedConfList(params)
  }

  getCol(){
    return [...sheConfColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=>{
        return (
          <Select size="small" value={item} onChange={(val)=>{
            this.props.actions.statusSheConf({id: rows.id}, (res:any)=>{
              this.props.actions.getShedConfList(params, {obj: res, type: "edit"})
              this.props.utils.OpenNotification("success")
            })
          }} >
            <Option value={1} >启用</Option>
            <Option value={0} >禁用</Option>
          </Select>
        )
      }
    }, {
      title: "操作",
      width: 150,
      render: (item:any)=>{
        return (
          <>
            <Button type="link" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.deleteSheConf({id: item.id}, ()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getShedConfList(params, {refresh: true})
              })
            }}>
              <Button type="link">删除</Button>
            </Popconfirm>
          </>
        );
      }
    }]
  }

  render() {
    const {spinning, utils, sheconf} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>添加</Button>}
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{
              if(!values){
                params = resetParams
              }else{
                params = {...params, ...values}
              }
              this.props.actions.getShedConfList(params)
            }}
            data={[
              {label: "充电棚名称", name: "shedName", type: "input"},
              {label: "状态", name: "status", type: "select", selectList: [
                {label: "全部", id: ""},
                {label: "启用", id: 1},
                {label: "禁用", id: 0},
              ]},
            ]}
          />
        </div>
        <div key="b">
          <Card size="small">
            <Table size="small" columns={this.getCol()} dataSource={sheconf?utils.addIndex(sheconf.list):[]} 
            pagination={utils.Pagination(sheconf, page=>{
              params.current = page
              this.props.actions.getShedConfList(params)
            })}/>
          </Card>
        </div>

        <AddModular
          title="新增充电棚"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values)=>{
            this.props.actions.addSheConf(values, ()=>{
              this.setState({addVisible: false})
              this.props.utils.OpenNotification("success")
              this.props.actions.getShedConfList(params, {refresh: true})
            })
          }}
          data={[
            {label: "公司项目",name: "companyHe", type: <CompanyHeElement/>, rules: true},
            {label: "充电棚名称",name: "shedName", type: "input", rules: true},
            {label: "状态",name: "status", type: "select", selectList: [
              {label: "启用", id: 1},
              {label: "禁用", id: 0},
            ], rules: true},
            {label: "充电棚名称",name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑充电棚"
          spinning={spinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          initialValues={{...detail, companyHe: [detail.companyId||"", detail.itemId||""]}}
          onOk={(values)=>{
            this.props.actions.editSheConf({
              ...values,
              id: detail.id
            }, (res:any)=>{
              this.setState({editVisible: false})
              this.props.utils.OpenNotification("success")
              this.props.actions.getShedConfList(params, {obj: res, type: "edit"})
            })
          }}
          data={[
            {label: "公司项目",name: "companyHe", type: <CompanyHeElement/>, rules: true},
            {label: "充电棚名称",name: "shedName", type: "input", rules: true},
            {label: "状态",name: "status", type: "select", selectList: [
              {label: "启用", id: 1},
              {label: "禁用", id: 0},
            ], rules: true},
            {label: "充电棚名称",name: "remark", type: "textarea"},
          ]}
        />
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getShedConfList, statusSheConf, addSheConf, editSheConf, deleteSheConf}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    sheconf: state.project.sheconf,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(CharSheConfPage)