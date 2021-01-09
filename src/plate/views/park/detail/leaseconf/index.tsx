import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import { Button, Col, Descriptions, Popconfirm, Row, Table } from "antd";
import { parkLeaseColumns } from "../../columns";
import {getParkLease, changeParkLease, changeLotParkLease } from "@plate/actions/parkAction"
import SearchModular from "@public/components/Modular/SearchModular";
import StatusElement from "@public/components/Element/StatusElement";
import AddModular from "@public/components/Modular/AddModular";
import ParkLot from "./parklot";
import LeaseActive from "./leaseactive"


interface Props extends IProps {
  parklease:any;
}

let params = {
  current: 1,
  licenseLinkName: "",
  licenseLinkPhone: "",
  license: "",
  state: "",
  status: "",
}
let resetParams = {
  current: 1,
  licenseLinkName: "",
  licenseLinkPhone: "",
  license: "",
  state: "",
  status: "",
}

class ParkLeaseconf extends React.Component<Props> {

  state = {
    addVisible: false,
    addLotVisible: false,
    editVisible: false,
    detail: {id: ""}
  }

  componentDidMount(){
    this.initial(params)
  }

  initial(params:any, obj={}){
    this.props.actions.getParkLease({...params, parkId: this.props.match.params.id}, obj)
  }

  getCol(){
    return [...parkLeaseColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement notAll size="small" value={item} onChange={()=>{
        this.props.actions.changeParkLease({
          objective:"enable",
          id: rows.id
        }, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.initial(params, {obj:res, type:"edit"})
        })
      }} />
    }, {
      title: "操作",
      render:(item:any)=>{
        return (
          <>
            <Button size="small" type="link" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑车位</Button>
            <Button size="small" type="link">车位日志</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.changeParkLease({
                objective:"remove",
                id: item.id
              }, (res:any)=>{
                this.props.utils.OpenNotification("success")
                this.initial(params, {refresh: true})
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
    const {spinning, utils, parklease} = this.props
    const {addVisible, editVisible, detail, addLotVisible } = this.state

    return (
      <>
        <LeaseActive {...this.props} />
        <Row>
          <Col span={20}>
            {parklease?<Descriptions column={6} style={{background: "#fff", padding: "10px 0 0 10px "}} >
              <Descriptions.Item label="有效车位数量">{parklease.map.seatSum}</Descriptions.Item>
              <Descriptions.Item label="待分配车位数量">{parklease.map.waitSeat}</Descriptions.Item>
              <Descriptions.Item label="永久分配车位数量">{parklease.map.longSeat}</Descriptions.Item>
              <Descriptions.Item label="临时分配车位数量">{parklease.map.temporarySeat}</Descriptions.Item>
            </Descriptions>:null}
            <Table size="small" columns={this.getCol()} dataSource={parklease?utils.addIndex(parklease.list):[]} 
              pagination={utils.Pagination(parklease, page=>{
                params.current = page
                this.initial(params)
              })} />
          </Col>
          <Col span={4}>
            <SearchModular
              before={(
                <>
                  <Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增车位</Button>
                  <Button className="mgl10" type="primary" ghost onClick={()=>this.setState({addLotVisible: true})} >批量新增</Button>
                </>
              )}
              layout="vertical"
              initialValues={params}
              resetValues={resetParams}
              submitSearch={(values:any)=>{
                params = values?{...params, ...values}:resetParams
                this.initial(params)
              }}
              data={[
                {label: "车位编号", name: "seatCod", type: "input"},
                {label: "姓名", name: "licenseLinkName", type: "input"},
                {label: "电话", name: "licenseLinkPhone", type: "input"},
                {label: "车牌", name: "license", type: "input"},
                {label: "车位状态", name: "state", type: "select", selectList: [
                  {label: "全部", id: ""},
                  {label: "待分配", id: 0},
                  {label: "永久车位", id: 1},
                  {label: "临时分配", id: 2},
                ]},
                {label: "状态", name: "status", type: "status"},
              ]}
            />
          </Col>
        </Row>

        <AddModular
          title="批量新增车位"
          spinning={spinning}
          visible={addLotVisible}
          onCancel={()=>this.setState({addLotVisible:false})}
          onOk={(values)=>{
            this.props.actions.changeLotParkLease({
              ...values,
              parkId: this.props.match.params.id
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.initial(params, {refresh: true})
              this.setState({addLotVisible: false})
            })
          }}
          data={[
            {label: "楼层号", name: "floorCode", type: "input"},
            {label: "单元号", name: "unitCode", type: "input"},
            {label: "区号", name: "areaCode", type: "input"},
            {label: "车位编号", name: "prefix", type: <ParkLot/>, rules: true},
            {label: "车位状态", name: "state", type: "select", selectList: [
              {label: "待分配", id: 0},
              {label: "永久车位", id: 1},
              {label: "临时分配", id: 2},
            ], rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll/>, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />
        
        <AddModular
          title="新增车位"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible:false})}
          onOk={(values)=>{
            this.props.actions.changeParkLease({
              ...values,
              objective: "add",
              parkId: this.props.match.params.id
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.initial(params, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "楼层号", name: "floorCode", type: "input"},
            {label: "单元号", name: "unitCode", type: "input"},
            {label: "区号", name: "areaCode", type: "input"},
            {label: "车位编号", name: "seatCode", type: "input", rules: true},
            {label: "车位状态", name: "state", type: "select", selectList: [
              {label: "待分配", id: 0},
              {label: "永久车位", id: 1},
              {label: "临时分配", id: 2},
            ], rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll/>, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑车位"
          spinning={spinning}
          visible={editVisible}
          initialValues={detail}
          onCancel={()=>this.setState({editVisible:false})}
          onOk={(values)=>{
            this.props.actions.changeParkLease({
              ...values,
              objective: "update",
              parkId: this.props.match.params.id,
              id: detail.id
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.initial(params, {obj: res, type: "edit"})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "楼层号", name: "floorCode", type: "input"},
            {label: "单元号", name: "unitCode", type: "input"},
            {label: "区号", name: "areaCode", type: "input"},
            {label: "车位编号", name: "seatCode", type: "input", rules: true},
            {label: "车位状态", name: "state", type: "select", selectList: [
              {label: "待分配", id: 0},
              {label: "永久车位", id: 1},
              {label: "临时分配", id: 2},
            ], rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />
        
      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getParkLease, changeParkLease, changeLotParkLease }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    parklease: state.park.parklease,
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ParkLeaseconf)