import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Checkbox, Col, Popconfirm, Row, Select, Table, Modal} from "antd";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeMeterElement from "@power/components/Element/CompanyHeMeterElement";
import CompanyHeSheElement from "@power/components/Element/CompanyHeSheElement";
import {getDeviceList, statusDevice, deleteDevice, addDevice, editDevice, createDevicePort} from "@power/actions/projectAction"
import {devicesColumns} from "./columns"
import AddModular from "@power/components/Modular/AddModular";
import { Link } from "react-router-dom";

const {Option} = Select

interface Props extends IProps {
  devices:any;
}

let params = {
  current: 1,
  companyHe: [],
  shedId: "",
  meterId:"",
  deviceSerial:"",
  iotId: "",
  isDistribution: false,
  status: ""
}
let resetParams = {
  current: 1,
  companyHe: [],
  shedId: "",
  meterId:"",
  deviceSerial:"",
  iotId: "",
  isDistribution: false,
  status: ""
}

class DeviceConffPage extends React.Component<Props> {

  state = {
    companyHeId: params.companyHe,
    addVisible: false,
    editVisible: false,
    detail:{id: "", companyId: "", itemId: ""},
    addCcompanyHeId: [],
    editCompanyHeId:[]
  }
  
  componentDidMount(){
    this.props.actions.getDeviceList(params)
  }

  getCol(){
    return [...devicesColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=>{
        return (
          <Select size="small" value={item} onChange={(val)=>{
            this.props.actions.statusDevice({id: rows.id}, (res:any)=>{
              this.props.actions.getDeviceList(params, {obj: res, type: "edit"})
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
      width: 200,
      render: (item:any)=>{
        return (
          <>
            <Button size="small" type="link" 
              onClick={()=>this.setState({
                editVisible: true, 
                detail: item,
                editCompanyHeId: [item.companyId||"", item.itemId||""]
              })} >编辑</Button>

            <Link to={`/project/deviceconf/${item.id}/detail/${item.iotId}`}>
              <Button size="small" type="link">详情</Button>
            </Link>
            
            <Button size="small" type="link" onClick={()=>{
              Modal.confirm({
                title: "是否确认生成 2 个端口?(删除原端口详情后重新生成)",
                onOk:()=>{
                  this.props.actions.createDevicePort({id: item.id})
                }
              })
            }} >端口</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.deleteDevice({id: item.id}, ()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getDeviceList(params, {refresh: true})
              })
            }}>
              <Button size="small" type="link">删除</Button>
            </Popconfirm>
          </>
        );
      }
    }]
  }

  render() {
    const {spinning, utils, devices} = this.props
    const {companyHeId, addVisible, editVisible, detail, addCcompanyHeId, editCompanyHeId} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Row>
            <Col span={4}>
              <SearchModular
                layout="vertical"
                before={<Button type="primary" onClick={()=>this.setState({addVisible:true})}>新增</Button>}
                initialValues={params}
                resetValues={resetParams}
                submitSearch={(values:any)=>{
                  if(!values){
                    params = resetParams
                  }else{
                    params = {...params, ...values}
                  }
                  this.props.actions.getDeviceList(params)
                }}
                data={[
                  {name: "isDistribution", type: <Checkbox>待分配设备</Checkbox>, valuePropName: "checked"},
                  {label: "状态", name: "status", type: "select", selectList: [
                    {label: "全部", id: ""},
                    {label: "启用", id: 1},
                    {label: "禁用", id: 0},
                  ]},
                  {label: "公司/项目", name: "companyHe", type: <CompanyHeElement onChange={(v)=>{
                    this.setState({companyHeId:v})
                  }} />},
                  {label: "电表", name: "meterId", type: <CompanyHeMeterElement companyHeId={companyHeId} />},
                  {label: "充电棚子", name: "shedId", type: <CompanyHeSheElement companyHeId={companyHeId} />},
                  {label:"序列号", name: "deviceSerial", type: "input"},
                  {label:"IotID", name: "iotId", type: "input"},
                ]}
                
              />
            </Col>
            <Col span={20}>
              <Table bordered size="middle" columns={this.getCol()} dataSource={devices?utils.addIndex(devices.list):[]}  
              pagination={utils.Pagination(devices, page=>{
                params.current = page
                this.props.actions.getDeviceList(params)
              })} /> 
            </Col>
          </Row>
        </div>

        <AddModular
          title="新增设备"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.addDevice(values, ()=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getDeviceList(params, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "公司/项目", name: "companyHe", type: <CompanyHeElement onChange={(v)=>{
              this.setState({addCcompanyHeId:v})
            }} />, rules: true},
            {label: "电表", name: "meterId", type: <CompanyHeMeterElement companyHeId={addCcompanyHeId}/>, rules: true},
            {label: "充电棚", name: "shedId", type: <CompanyHeSheElement companyHeId={addCcompanyHeId}/>, rules: true},
            {label: "iotID", name: "iotId", type: "input", rules: true},
            {label: "设备序列号", name: "deviceSerial", type: "input", rules: true},
            {label: "端口数量", name: "portType", type: "inputNumber", rules: true},
            {label: "设备名称	", name: "deviceName", type: "input", rules: true},
            {label: "设备类型", name: "deviceBrand", type: "select", selectList: [
              {label: "魔方", id: "MF"}
            ], rules: true},
          ]}
        />
        <AddModular
          title="编辑设备"
          spinning={spinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          initialValues={{...detail, companyHe: [detail.companyId||"", detail.itemId||""]}}
          onOk={(values:any)=>{
            this.props.actions.editDevice(values, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getDeviceList(params, {obj: res, type: "edit"})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "公司/项目", name: "companyHe", type: <CompanyHeElement onChange={(v)=>{
              this.setState({editCompanyHeId:v})
            }} />, rules: true},
            {label: "电表", name: "meterId", type: <CompanyHeMeterElement companyHeId={editCompanyHeId}/>, rules: true},
            {label: "充电棚", name: "shedId", type: <CompanyHeSheElement companyHeId={editCompanyHeId}/>, rules: true},
            {label: "iotID", name: "iotId", type: "input", rules: true},
            {label: "设备序列号", name: "deviceSerial", type: "input", rules: true},
            {label: "端口数量", name: "portType", type: "inputNumber", rules: true},
            {label: "设备名称	", name: "deviceName", type: "input", rules: true},
            {label: "设备类型", name: "deviceBrand", type: "select", selectList: [
              {label: "魔方", id: "MF"}
            ], rules: true},
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getDeviceList, statusDevice, deleteDevice, addDevice, editDevice, createDevicePort}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    devices: state.project.devices,
    utils: state.app.utils,
    spinning: state.project.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceConffPage)