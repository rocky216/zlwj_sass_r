import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getTocouponList, addChangeActive, editChangeActive, deleteActive, statusActive} from "@power/actions/activeAction"
import { Button, Popconfirm, Table } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import {memcerColumns } from "../columns"
import StatusElement from "@power/components/Element/StatusElement";
import AddModular from "@power/components/Modular/AddModular";
import UploadElement from "@power/components/Element/UploadElement";
import Tocouponconf from "./tocouponconf"
import _ from "lodash";
import moment from "moment";


interface Props extends IProps {
  tocoupon:any;
}

let params = {
  current: 1,
  companyHe: [],
  status: "",
  activityName: "",
}
let resetParams = {
  current: 1,
  companyHe: [],
  status: "",
  activityName: "",
}

class ActiveTocoupon extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", companyId:"", itemId:"", activityInfoList:[],activityNo:"", activityStartTime:null,activityEndTime:null,activityUrl:""}
  }

  componentDidMount(){
    this.props.actions.getTocouponList(params)
  }

  getCol(){
    return [...memcerColumns, {  
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement size="small" value={item} notAll onChange={(v:any)=>{
        this.props.actions.statusActive({id:rows.id},(res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getTocouponList(params, {obj:res, type: "edit"})
        })
      }} />
    },{
      title: "操作",
      width:120,
      render:(item:any)=>{
        return (
          <>
            <Button size="small" type="link" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Popconfirm title="时候删除？" onConfirm={()=>{
              this.props.actions.deleteActive({id: item.id}, ()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getTocouponList(params, {refresh: true})
              })
            }}>
              <Button type="link" size="small" >删除</Button>
            </Popconfirm>
          </>
        )
      }
    }]
  }

  getActiveData(arr:any[]){
    let newArr:any[] = []
    _.each(arr, item=>{
      newArr.push({
        configId: item.couponId,
        rechargeMoney: item.rechargeMoney,
        couponNum: item.couponNum,
      })
    })
    return newArr
  }

  render() {
    const {spinning, utils, tocoupon} = this.props
    const {addVisible, editVisible, detail} = this.state
    
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
              this.props.actions.getTocouponList(params)
            }}
            data={[
              {label: "活动名称", name: "activityName", type: "input"},
              {label: "公司/项目", name: "companyHe", type: <CompanyHeElement/>},
              {label: "状态", name: "status", type: <StatusElement/>},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={tocoupon?utils.addIndex(tocoupon.list):[]}
          pagination={utils.Pagination(tocoupon, page=>{
            params.current = page
            this.props.actions.getTocouponList(params)
          })} />
        </div>

        <AddModular
          width={720}
          title="新增充值券活动"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.addChangeActive({
              ...values,
              activityImg: utils.submitFiles(values.activityImg)
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getTocouponList(params, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label:"活动名称", name:"activityName", type: "input"},
            {label:"公司项目", name:"companyHe", type: <CompanyHeElement/>},
            {label:"活动图片", name:"activityImg", type: <UploadElement data={{fileType: "activity"}} />},
            {label: "活动时间", name: "rtime", type: "rangepicker", rules:true},
            {label: "充值配置", name: "activityJson", type: <Tocouponconf/>, rules:true},
            {label: "券有效期", name: "validDay", type: "inputNumber", rules:true},
            {label: "活动途径", name: "activityObject", type: "select", selectList: [
              {label: "业主app", id: 0},
              {label: "小程序用户", id: 1},
            ], rules:true},
            {label: "状态", name: "status", type: "status", notAll: true, rules:true},
            {label: "备注", name: "remark", type: "textarea"}
          ]}
        />

        <AddModular
          width={720}
          title="编辑充值券活动"
          spinning={spinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          initialValues={{
            ...detail, 
            companyHe: [detail.companyId, detail.itemId],
            activityJson: this.getActiveData(detail.activityInfoList),
            rtime: [moment(detail.activityStartTime),moment(detail.activityEndTime)],
            activityImg: utils.echoFiles(detail.activityUrl),
          }}
          onOk={(values:any)=>{
            this.props.actions.editChangeActive({
              ...values,
              activityImg: utils.submitFiles(values.activityImg),
              id: detail.id,
              activityNo:detail.activityNo,
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getTocouponList(params, {obj: res, type:"edit"})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label:"活动名称", name:"activityName", type: "input"},
            {label:"公司项目", name:"companyHe", type: <CompanyHeElement/>},
            {label:"活动图片", name:"activityImg", type: <UploadElement data={{fileType: "activity"}} />},
            {label: "活动时间", name: "rtime", type: "rangepicker", rules:true},
            {label: "充值配置", name: "activityJson", type: <Tocouponconf/>, rules:true},
            {label: "券有效期", name: "validDay", type: "inputNumber", rules:true},
            {label: "活动途径", name: "activityObject", type: "select", selectList: [
              {label: "业主app", id: 0},
              {label: "小程序用户", id: 1},
            ], rules:true},
            {label: "状态", name: "status", type: "status", notAll: true, rules:true},
            {label: "备注", name: "remark", type: "textarea"}
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getTocouponList, addChangeActive, editChangeActive, deleteActive, statusActive}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    tocoupon: state.active.tocoupon,
    utils: state.app.utils,
    spinning: state.active.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ActiveTocoupon)