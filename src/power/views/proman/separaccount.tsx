import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Popconfirm, Table } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import {getSeparaccountList, addSeparaccountList, editSeparaccountList, deleteSeparaccount} from "@power/actions/projectAction"
import { separaccountColumns } from "./columns";
import AddModular from "@power/components/Modular/AddModular";
import _ from "lodash";
import { Link } from "react-router-dom";


interface Props extends IProps {
  separaccount:any;
}

let params = {
  companyHe: [],
  partnerName: "",
  partnerPhone: "",
  status: ""
}
let resetParams = {
  companyHe: [],
  partnerName: "",
  partnerPhone: "",
}

class SeparAccounStPage extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", powerPartnerComItemList:[]}
  }

  componentDidMount(){
    this.props.actions.getSeparaccountList(params)
  }

  getCol(){
    return [...separaccountColumns, {
      title: "状态",
      dataIndex: "status",
      render: ()=>{
        return "As"
      }
    },{
      title: "操作",
      width: 180,
      render:(item:any)=>{
        return (
          <div>
            <Button type="link" size="small" onClick={()=>this.setState({editVisible: true, detail: item})}>编辑</Button>
            
            <Link to={`/project/separaccount/${item.id}/log`}>
              <Button type="link" size="small">分账日志</Button>
            </Link>
            
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.deleteSeparaccount({id: item.id},()=>{
                this.props.actions.getSeparaccountList(params, {refresh:true})
                this.props.utils.OpenNotification("success")
              })
            }}>
              <Button type="link" size="small">删除</Button>
            </Popconfirm>
            
          </div>
        )
      }
    }]
  }

  getPartnerJson(arr:any[]){
    let newArr:string[]=[]
    if(!_.isArray(arr)) return newArr;
    _.each(arr, item=>{
      newArr.push(`${item.companyId}-${item.itemId}`)
    })
    return newArr;
  }

  render() {
    const {spinning, utils, separaccount} = this.props
    const {addVisible, editVisible, detail} = this.state;
    
    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增</Button>}
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{
              console.log(values)
            }}
            data={[
              {label: "公司/项目", name: "companyHe", type: <CompanyHeElement/>},
              {label: "分账对象名称", name: "partnerName", type: "input"},
              {label: "分账对象电话", name: "partnerPhone", type: "inputNumber"},
              {label: "状态", name: "status", type: "status"},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={separaccount?utils.addIndex(separaccount.list):[]} />
        </div>

        <AddModular
          title="新增分账对象"
          spinning={false}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.addSeparaccountList(values, ()=>{
              this.setState({addVisible:false})
              this.props.utils.OpenNotification("success")
              this.props.actions.getSeparaccountList(params, {refresh:true})
            })
          }}
          data={[
            {label: "分账对象名称", name: "partnerName", type: "input", rules: true},
            {label: "联系电话", name: "partnerPhone", type: "inputNumber", rules: true},
            {label: "分账说明", name: "partnerDesc", type: "textarea", rules: true},
            {label: "分账项目", name: "partnerJson", type: <CompanyHeElement type="treeselect" />, rules: true},
            {label: "状态", name: "status", type: "select", selectList: [
              {label: "启用", id: 1},
              {label: "禁用", id: 0},
            ], rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑分账对象"
          spinning={false}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          initialValues={{...detail, partnerJson: this.getPartnerJson(detail.powerPartnerComItemList)}}
          onOk={(values:any)=>{
            this.props.actions.editSeparaccountList({
              ...values,
              id: detail.id
            }, (res:any)=>{
              this.setState({editVisible:false})
              this.props.utils.OpenNotification("success")
              this.props.actions.getSeparaccountList(params, {obj:res, type: "edit"})
            })
          }}
          data={[
            {label: "分账对象名称", name: "partnerName", type: "input", rules: true},
            {label: "联系电话", name: "partnerPhone", type: "inputNumber", rules: true},
            {label: "分账说明", name: "partnerDesc", type: "textarea", rules: true},
            {label: "分账项目", name: "partnerJson", type: <CompanyHeElement type="treeselect" />, rules: true},
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
    actions: bindActionCreators({getSeparaccountList, addSeparaccountList, editSeparaccountList, deleteSeparaccount}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    separaccount: state.project.separaccount,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(SeparAccounStPage)