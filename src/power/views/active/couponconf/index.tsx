import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Card, InputNumber, Popconfirm, Table } from "antd";
import { couponconfColumns } from "../columns";
import {getCouponconfList, statusCouponconfList, addCouponconfList, editCouponconfList, deleteCouponconfList} from "@power/actions/activeAction"
import StatusElement from "@power/components/Element/StatusElement";
import AddModular from "@power/components/Modular/AddModular";
import { CouponType } from "@public/common/powerMapper";
import UploadElement from "@power/components/Element/UploadElement";
import InputNumberElement from "@power/components/Element/InputNumberElement";


interface Props extends IProps {
  couconf:any;
}

let params = {
  current:1
}

class ActiveCouponconf extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", couponIcon: "", couponNo: ""}
  }

  componentDidMount(){
    this.props.actions.getCouponconfList(params)
  }

  getCol(){
    return [...couponconfColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=> <StatusElement size="small" value={item} notAll onChange={(v:any)=>{
        this.props.actions.statusCouponconfList({id: rows.id}, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getCouponconfList(params, {obj: res, type: "edit"})
        })
      }} />
    }, {
      title: "操作",
      render:(item:any)=>{
        return (
          <>
            <Button type="link" size="small" onClick={()=>this.setState({editVisible:true, detail:item})}>编辑</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.deleteCouponconfList({id: item.id},()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getCouponconfList(params, {refresh: true})
              })
            }} >
              <Button type="link" size="small">删除</Button>
            </Popconfirm>
          </>
        )
      }
    }]
  }

  render() {
    const {spinning, utils, couconf} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}> 
        <Card size="small" title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增</Button>}>
          <Table size="small" columns={this.getCol()} dataSource={couconf?utils.addIndex(couconf.list):[]}
          pagination={utils.Pagination(couconf, page=>{
            params.current = page;
            this.props.actions.getCouponconfList(params)
          })} />
        </Card>

        <AddModular
          title="新增券配置"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.addCouponconfList({
              ...values,
              couponIcon: utils.submitFiles(values.couponIcon)
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getCouponconfList(params, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "卷名称", name: "couponName", type: "input", rules: true},
            {label: "劵图片", name: "couponIcon", type: <UploadElement data={{fileType: "activity"}} />, rules: true},
            {label: "劵类型", name: "couponType", type: "select", selectList: utils.objectArray(CouponType), rules: true},
            {label: "有效时长", name: "unitNum", type: <InputNumberElement unit="月" />, rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll/>, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />
        <AddModular
          title="编辑券配置"
          spinning={spinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          initialValues={{...detail, couponIcon: utils.echoFiles(detail.couponIcon)}}
          onOk={(values:any)=>{
            this.props.actions.editCouponconfList({
              ...values,
              couponIcon: utils.submitFiles(values.couponIcon),
              id: detail.id,
              couponNo: detail.couponNo
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getCouponconfList(params, {obj: res, type: "edit"})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "卷名称", name: "couponName", type: "input", rules: true},
            {label: "劵图片", name: "couponIcon", type: <UploadElement data={{fileType: "activity"}} />, rules: true},
            {label: "劵类型", name: "couponType", type: "select", selectList: utils.objectArray(CouponType), rules: true},
            {label: "有效时长", name: "unitNum", type: <InputNumberElement unit="月" />, rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll/>, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCouponconfList, statusCouponconfList, addCouponconfList, editCouponconfList, deleteCouponconfList}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    couconf: state.active.couconf,
    utils: state.app.utils,
    spinning: state.active.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ActiveCouponconf)