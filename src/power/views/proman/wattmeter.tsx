import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getWattConfList, statusWattConf, addWattConf, editWattConf, deleteWattConf} from "@power/actions/projectAction"
import { Button, Card, Popconfirm, Select, Table } from "antd";
import {wattConfColumns } from "./columns"
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import AddModular from "@power/components/Modular/AddModular";


const {Option} = Select

interface Props extends IProps {
  wattconf:any;
}

let params = {
  current: 1,
  meterName: "",
  status: "",
  companyHe: [],
}

let resetParams = {
  current: 1,
  meterName: "",
  status: "",
  companyHe: [],
}

class WattMeterPage extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", companyId: "", itemId: ""}
  }

  componentDidMount(){
    this.props.actions.getWattConfList(params)
  }

  getCol(){
    return [...wattConfColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=>{
        return (
          <Select size="small" value={item} onChange={(val)=>{
            this.props.actions.statusWattConf({id: rows.id}, (res:any)=>{
              this.props.actions.getWattConfList(params, {obj: res, type: "edit"})
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
              this.props.actions.deleteWattConf({id: item.id}, ()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getWattConfList(params, {refresh: true})
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
    const {spinning, utils, wattconf} = this.props
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
                params = resetParams
              }else{
                params = {...params, ...values}
              }
              this.props.actions.getWattConfList(params)
            }}
            data={[
              {label: "电表名称", name: "meterName", type: "input"},
              {label: "公司项目", name: "companyHe", type: <CompanyHeElement/>},
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
            <Table size="small" columns={this.getCol()} dataSource={wattconf?utils.addIndex(wattconf.list):[]} 
            pagination={utils.Pagination(wattconf, page=>{
              params.current = page
              this.props.actions.getWattConfList(params)
            })} />
          </Card>
        </div>

        <AddModular
          title="新增电表"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.addWattConf(values, ()=>{
              this.props.utils.OpenNotification("success")
              this.setState({addVisible: false})
              this.props.actions.getWattConfList(params, {refresh:true})
            })
          }}
          data={[
            {label: "公司项目", name: "companyHe", type: <CompanyHeElement/>, rules: true},
            {label: "电表名称", name: "meterName", type: "input", rules: true},
            {label: "初始电表值", name: "initDegrees", type: "inputNumber", rules: true},
            {label: "电价", name: "unitMoney", type: "inputNumber", rules: true},
            {label: "状态", name: "status", type: "select", selectList: [
              {label: "启用", id: 1},
              {label: "禁用", id: 0},
            ], rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑电表"
          spinning={spinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          initialValues={{...detail, companyHe: [detail.companyId||"", detail.itemId||""]}}
          onOk={(values:any)=>{
            this.props.actions.editWattConf({
              ...values,
              id: detail.id
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.setState({editVisible: false})
              this.props.actions.getWattConfList(params, {obj: res, type: "edit"})
            })
          }}
          data={[
            {label: "公司项目", name: "companyHe", type: <CompanyHeElement/>, rules: true},
            {label: "电表名称", name: "meterName", type: "input", rules: true},
            {label: "初始电表值", name: "initDegrees", type: "inputNumber", rules: true},
            {label: "电价", name: "unitMoney", type: "inputNumber", rules: true},
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
    actions: bindActionCreators({getWattConfList, statusWattConf, addWattConf, editWattConf, deleteWattConf}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    wattconf: state.project.wattconf,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(WattMeterPage)