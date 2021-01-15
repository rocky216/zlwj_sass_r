import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { getDeviceConf, changeDeviceConf } from "@plate/actions/otherAction";
import { Button, Col, Popconfirm, Row, Table } from "antd";
import { sysDeviceConfColumns } from "../columns";
import SearchModular from "@public/components/Modular/SearchModular";
import Checkbox from "antd/lib/checkbox/Checkbox";
import CompanyHeElement from "@plate/components/Element/CompanyHeElement";
import StatusElement from "@public/components/Element/StatusElement";
import AllDeviceElement from "@plate/components/Element/AllDeviceElement";
import AddModular from "@public/components/Modular/AddModular";
import OnlyParkElement from "@plate/components/Element/OnlyParkElement";



interface Props extends IProps {
  deviceconf:any;
}

let params = {
  current: 1,
  isHave: false,
  companyHe: [],
  deviceSerial:"",
  iotId:"",
  inOut:"",
  online:"",
  status:"",
  deviceType:""
}
let resetParams = {
  current: 1,
  isHave: false,
  companyHe: [],
  deviceSerial:"",
  iotId:"",
  inOut:"",
  online:"",
  status:"",
  deviceType:""
}


class SysDeviceConf extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", companyId: "", itemId: ""},
    companyId:"",
    itemId:""
  }

  componentDidMount(){
    this.props.actions.getDeviceConf(params)
  }

  getCol(){
    return [...sysDeviceConfColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement size="small" notAll value={item} onChange={()=>{
        this.props.actions.changeDeviceConf({
          objective: "enable",
          id: rows.id
        }, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getDeviceConf(params, {obj: res, type: "edit"})
        })
      }} />
    },{
      title: "操作",
      width: 180,
      render: (item:any)=>{
        return (
          <>
            <Button type="link" size="small" onClick={()=>this.setState({editVisible: true, detail: item,
              companyId:item.companyId, itemId:item.itemId})} >编辑</Button>
            <Button size="small" type="link"  >详情</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.changeDeviceConf({
                objective: "delete",
                id: item.id
              }, (res:any)=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getDeviceConf(params, {refresh: true})
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
    const {spinning, utils, deviceconf } = this.props
    const {addVisible, editVisible, detail, companyId, itemId} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Row>
            <Col span={20}>
              <Table size="small" columns={this.getCol()} dataSource={deviceconf?utils.addIndex(deviceconf.list):[]} 
              pagination={utils.Pagination(deviceconf, page=>{
                params.current = page;
                this.props.actions.getDeviceConf(params)
              })} />
            </Col>
            <Col span={4}>
              <SearchModular
                before={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增</Button>}
                layout="vertical"
                initialValues={params}
                resetValues={resetParams}
                submitSearch={(values:any)=>{
                  params = values?{...params, ...values}:resetParams
                  this.props.actions.getDeviceConf(params)
                }}
                data={[
                  {name: "isHave", type: <Checkbox>待分配设备</Checkbox>, valuePropName: "checked"},
                  {label: "在线状态", name: "online", type: "select", selectList: [
                    {label: "全部", id: ""},
                    {label: "在线", id: 1},
                    {label: "离线", id: 0},
                  ]},
                  {label: "序列号", name: "deviceSerial", type: "input"},
                  {label: "IotID", name: "iotId", type: "input"},
                  {label: "设备类型", name: "deviceType", type: <AllDeviceElement/>},
                  {label: "进出类型", name: "inOut", type: "select", selectList: [
                    {label: "全部", id: ""},
                    {label: "出口", id: 1},
                    {label: "入口", id: 0},
                  ]},
                  {label: "公司项目", name: "companyHe", type: <CompanyHeElement/>},
                  {label: "状态", name: "status", type: <StatusElement/>},
                ]}
              />
            </Col>
          </Row>
        </div>

        <AddModular
          title="编辑设备"
          spinning={spinning}
          visible={editVisible}
          initialValues={{...detail, companyHe: [detail.companyId, detail.itemId]}}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeDeviceConf({
              ...values,
              id: detail.id,
              objective: "update"
            }, (res:any)=>{
              this.props.actions.getDeviceConf(params, {obj: res, type: "list"})
              this.setState({editVisible: false})
              this.props.utils.OpenNotification("success")
            })
          }}
          data={[
            {label: '公司/小区', name: "companyHe", type: <CompanyHeElement onChange={(v)=>{
              const [companyId, itemId] = v
              this.setState({companyId, itemId})
            }} />},
            {label: '停车场', name: "companyHe", type: <OnlyParkElement companyId={companyId} itemId={itemId} />},
            {label: "IotId", name: "iotId", type: "input"},
            {label: "进出类型", name: "inOut", type: "select", selectList: [
              {label: "出口", id: 1},
              {label: "入口", id: 0},
            ]},
            {label: "设备名称", name: "deviceName", type: "input"},
            {label: "设备品牌", name: "deviceBrand", type: "input"},
            {label: "设备类型", name: "deviceType", type: <AllDeviceElement/>},
            {label: "状态", name: "status", type: <StatusElement notAll />},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getDeviceConf, changeDeviceConf }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    deviceconf: state.other.deviceconf,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(SysDeviceConf)