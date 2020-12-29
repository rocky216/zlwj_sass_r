import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Select, Table } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import {ProConfColumns} from "./columns"
import {getProConfList, statusProConf, changeProConf} from "@power/actions/projectAction"
import AddModular from "@power/components/Modular/AddModular";
import Chargeconf from "./proconfs/chargeconf"
import FusConf from "./proconfs/fusconf" 


const {Option } = Select

interface Props extends IProps {
  proconf:any;
}

let params = {
  current:1,
  isRefund: "",
  companyHe:[],
  status:""
}

let resetParams = {
  current:1,
  isRefund: "",
  companyHe:[],
  status:""
}



class ProConfPage extends React.Component<Props> {
  
  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", companyId:"", itemId:""}
  }

  componentDidMount(){
    this.props.actions.getProConfList(params)
  }

  getCol(){
    return [...ProConfColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=>{
        return (
          <Select size="small" value={item} onChange={(val)=>{
            this.props.actions.statusProConf({id: rows.id}, (res:any)=>{
              this.props.actions.getProConfList(params, {obj: res, type: "edit"})
            })
          }} >
            <Option value={1} >启用</Option>
            <Option value={0} >禁用</Option>
          </Select>
        )
      }
    }, {
      title: "操作",
      render: (item:any)=>{
        return (
          <Button type="link" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
        );
      }
    }]
  }

  render() {
    const {spinning, utils, proconf} = this.props
    const {addVisible, editVisible, detail} = this.state
    
    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular 
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增</Button>} 
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{
              if(!values){
                params = resetParams;
              }else{
                params = {...params, ...values}
              }
              this.props.actions.getProConfList(params)
            }}
            data={[
              {label: "自动退款", name: "isRefund", type: "select", selectList: [
                {label: "全部", id: ""},
                {label: "支持", id: "Y"},
                {label: "不支持", id: "N"},
              ]},
              {label: "状态", name: "status", type: "select", selectList: [
                {label: "全部", id: ""},
                {label: "启用", id: 1},
                {label: "禁用", id: 0},
              ]},
              {label: "公司/项目", name: "companyHe", type: <CompanyHeElement/>}
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={proconf?utils.addIndex(proconf.list):[]} 
          pagination={utils.Pagination(proconf, page=>{
            params.current = page
            this.props.actions.getProConfList(params)
          })}/>
        </div>

        <AddModular
          title="新增配置"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeProConf(values,()=>{
              this.setState({addVisible: false})
              this.props.utils.OpenNotification("success")
              this.props.actions.getProConfList(params, {refresh:true})
            })
          }}
          data={[
            {label: "公司项目", name: "companyHe", type: <CompanyHeElement/>, rules: true},
            {label: "自动重启次数", name: "orderRestartNum", type: "inputNumber", rules: true},
            {label: "自动退款", name: "isRefund", type: "select", selectList: [
              {label: "是", id: 1},
              {label: "否", id: 0},
            ], rules: true},
            {label: "收费配置", name: "powerRuleList", type: <Chargeconf/>, rules: true},
            {label: "熔断配置", name: "powerFuseList", type: <FusConf/>, rules: true},
            {label: "状态", name: "status", type: "select", selectList: [
              {label: "启用", id: 1},
              {label: "禁用", id: 0},
            ], rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑配置"
          spinning={spinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          initialValues={{...detail, companyHe: [detail.companyId, detail.itemId]}}
          onOk={(values)=>{
            this.props.actions.changeProConf({
              ...values,
              id: detail.id
            },()=>{
              this.setState({editVisible: false})
              this.props.utils.OpenNotification("success")
              this.props.actions.getProConfList(params, {refresh:true})
            })
          }}
          data={[
            {label: "公司项目", name: "companyHe", type: <CompanyHeElement/>, rules: true},
            {label: "自动重启次数", name: "orderRestartNum", type: "inputNumber", rules: true},
            {label: "自动退款", name: "isRefund", type: "select", selectList: [
              {label: "是", id: 1},
              {label: "否", id: 0},
            ], rules: true},
            {label: "收费配置", name: "powerRuleList", type: <Chargeconf/>, rules: true},
            {label: "熔断配置", name: "powerFuseList", type: <FusConf/>},
            {label: "状态", name: "status", type: "select", selectList: [
              {label: "启用", id: 1},
              {label: "禁用", id: 0},
            ], rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />
        
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getProConfList, statusProConf, changeProConf}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    proconf: state.project.proconf,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ProConfPage)