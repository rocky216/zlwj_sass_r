import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getParkBase, getByParkConf, getMerchant, getFeeList, changeFeeList, deleteFeeList} from "@plate/actions/parkAction"
import { Button, Card, Col, Popconfirm, Row, Table } from "antd";
import ParkBaseInfo from "./baseInfo"
import Parkconf from "./parkconf"
import Merchant from "./merchant"
import { parkFeeColumns } from "../../columns";
import AddModular from "@public/components/Modular/AddModular";
import StatusElement from "@public/components/Element/StatusElement";



interface Props extends IProps {
  parkbase:any;
  feelist:any;
  parkconf:any;
}

class ParkBase extends React.Component<Props> {

  state = {
    addVisible: false,
    detail: {id: ""},
    editVisible: false
  }

  componentDidMount(){
    this.props.actions.getParkBase({id: this.props.match.params.id})
    this.props.actions.getByParkConf({parkId: this.props.match.params.id})
    this.props.actions.getMerchant({parkId: this.props.match.params.id})
    this.props.actions.getFeeList({parkId: this.props.match.params.id})
  }

  getCol(){
    return [...parkFeeColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement size="small" notAll value={item} onChange={(v:any)=>{
        this.props.actions.changeFeeList({id: rows.id, objective: "enable"}, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getFeeList({parkId: this.props.match.params.id}, {obj: res, type: "list"})
        })
      }} />
    }, {
      title: "操作",
      render:(item:any)=>{
        return (
          <>
            <Button type="link" size="small" 
              onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Button type="link" size="small">下载系统二维码</Button>
            <Button type="link" size="small">下载商户二维码</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.deleteFeeList({id: item.id}, ()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getFeeList({parkId: this.props.match.params.id}, {refresh: true})
              })
            }}>
              <Button type="link" size="small">删除</Button>
            </Popconfirm>
            
          </>
        )
      }
    }]
  }

  render() {
    const {spinning, utils, parkbase, feelist, parkconf} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <>
        <Row gutter={10}>
          <Col span={8}>
            <ParkBaseInfo/>
          </Col>
          <Col span={16}>
            <Parkconf/>
          </Col>
        </Row>
        <div className="mgt10">
          <Merchant/>
        </div>
        {parkconf && parkconf.isSon==0?
        <div className="mgt10">
          <Card size="small" title="停车场收费点" extra={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增收费点</Button>}>
            <Table size="small" columns={this.getCol()} dataSource={feelist?utils.addIndex(feelist):[]} pagination={false} />
          </Card>
        </div>:null}

        <AddModular
          title={(parkbase?parkbase.parkName:"") + "/新增停车场收费点"}
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.changeFeeList({
              ...values,
              objective: "add",
              parkId: this.props.match.params.id
            }, ()=>{
              utils.OpenNotification("success")
              this.props.actions.getFeeList({parkId: this.props.match.params.id}, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "收费站点编号", name: "siteCode", type: "input", rules: true},
            {label: "收费站点名称", name: "siteName", type: "input", rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"}
          ]}
        />

        <AddModular
          title={(parkbase?parkbase.parkName:"") + "/编辑停车场收费点"}
          spinning={spinning}
          visible={editVisible}
          initialValues={detail}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.changeFeeList({
              ...values,
              objective: "update",
              parkId: this.props.match.params.id,
              id: detail.id
            }, (res:any)=>{
              utils.OpenNotification("success")
              this.props.actions.getFeeList({parkId: this.props.match.params.id}, {obj: res, type: "list"})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "收费站点编号", name: "siteCode", type: "input", rules: true},
            {label: "收费站点名称", name: "siteName", type: "input", rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"}
          ]}
        />

      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getParkBase, getByParkConf, getMerchant, getFeeList, changeFeeList, deleteFeeList}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    parkconf: state.park.parkconf,
    feelist: state.park.feelist,
    parkbase: state.park.parkbase,
    utils: state.app.utils,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ParkBase)