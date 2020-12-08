import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getMemcerList, statusActive, deleteActive} from "@power/actions/activeAction"
import {memcerColumns} from "../columns"
import { Button, Popconfirm, Table } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import StatusElement from "@power/components/Element/StatusElement";
import AddModular from "@power/components/Modular/AddModular";
import UploadElement from "@power/components/Element/UploadElement";


interface Props extends IProps {
  memcer: any;
}

let params = {
  current: 1,
  couponType: "",
  companyHe: [],
  status: "",
  activityName: "",
}
let resetParams = {
  current: 1,
  couponType: "",
  companyHe: [],
  status: "",
  activityName: "",
}

class ActiveMemcer extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: ""
  }

  componentDidMount(){
    this.props.actions.getMemcerList(params)
  }

  getCol(){
    return [...memcerColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement size="small" value={item} notAll onChange={(v:any)=>{
        this.props.actions.statusActive({id:rows.id},(res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getMemcerList(params, {obj:res, type: "edit"})
        })
      }} />
    }, {
      title: "操作",
      render: (item:any)=>{
        return (
          <>
            <Button type="link" size="small">编辑</Button>
            <Popconfirm title="时候删除？" onConfirm={()=>{
              this.props.actions.deleteActive({id: item.id}, ()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getMemcerList(params, {refresh: true})
              })
            }}>
              <Button type="link" size="small" >删除</Button>
            </Popconfirm>
          </>
        )
      }
    }]
  }

  render() {
    const {spinning, utils, memcer} = this.props
    const {addVisible, editVisible, detail} = this.state;

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增</Button>}
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{
              if(!values){
                params = resetParams
              }else{
                params = {...params, ...values}
              }
              this.props.actions.getMemcerList(params)
            }}
            data={[
              {label: "活动名称", name: "activityName", type: "input"},
              {label: "公司/项目", name: "companyHe", type: <CompanyHeElement/>},
              {label: "状态", name: "status", type: <StatusElement/>},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={memcer?utils.addIndex(memcer.list):[]}
          pagination={utils.Pagination(memcer, page=>{
            params.current = page;
            this.props.actions.getMemcerList(params)
          })} />
        </div>

        <AddModular
          title="新增活动"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible:false})}
          onOk={(values:any)=>{

          }}
          data={[
            {label: "公司项目", name: "companyHe", type: <CompanyHeElement/>},
            {label: "活动图片", name: "couponIcon", type: <UploadElement data={{linkType: "powerMemberActive"}} />},
            {label: "活动时间", name: "rtime", type: "rangepicker"},
            {label: "会员劵配置", name: "config", type: "rangepicker"},
            {label: "活动途径", name: "activityObject", type: "select", selectList: [
              {label: "业主app", id: "G"},
              {label: "小程序用户", id: "W"},
            ]},
            {label: "状态", name: "status", type: "status", notAll: true},
            {label: "备注", name: "remark", type: "textarea"}
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getMemcerList, statusActive, deleteActive}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    memcer: state.active.memcer,
    utils: state.app.utils,
    spinning: state.active.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ActiveMemcer)