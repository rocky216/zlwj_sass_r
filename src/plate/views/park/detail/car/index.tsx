import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import { Button, Col, Descriptions, Popconfirm, Row, Select, Space, Table, Typography } from "antd";
import { parkCarColumns } from "../../columns";
import {getParkCar, changegetParkCar, bachContract, definedLicenseCount, getFeeGroup, deleteFeeGroup} from "@plate/actions/parkAction"
import StatusElement from "@public/components/Element/StatusElement";
import SearchModular from "@public/components/Modular/SearchModular";
import CarTypeElement from "@plate/components/Element/CarTypeElement";
import AddModular from "@public/components/Modular/AddModular";
import UploadElement from "@public/components/Element/UploadElement";
import ImportModular from "@plate/components/Modular/ImportModular";
import moment from "moment";
import Checkbox from "antd/lib/checkbox/Checkbox";
import _ from "lodash";

const {Text} = Typography
const {Option} = Select

interface Props extends IProps {
  parkcar:any;
  feegroup:any;
  base:any;
}

let params = {
  current: 1,
  linkPhone: "",
  linkName: "",
  license: "",
  isValid: "",
  status: "",
  plateType: "",
}

let resetParams = {
  current: 1,
  linkPhone: "",
  linkName: "",
  license: "",
  isValid: "",
  status: "",
  plateType: "",
}

class CarLeaseconf extends React.Component<Props> {

  state = {
    reneVisible: false,
    addVisible: false,
    editVisible: false,
    detail: {id: "", cardUrl:"", driverUrl:"", travelUrl: "", startTime: null, expireTime: null},
    importVisible: false,
    deleteVisible: false,
    plateType: "",
    validNum: 0,
    invalidNum: 0,
    plateTypeList:[],
    exportVisible: false
  }

  componentDidMount(){
    this.initial(params)
  }

  initial(params:any, obj={}){
    this.props.actions.getParkCar({...params, parkId: this.props.match.params.id}, obj)
  }

  getPlateType(){
    this.setState({deleteVisible: true})
    this.props.actions.getFeeGroup({
      parkId: this.props.match.params.id,
      isFlag: 1,
      def: 1,
    }, (res:any[])=>{
      this.setState({plateTypeList: res})
    })
  }

  getCol(){
    return [...parkCarColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement notAll size="small" value={item} onChange={()=>{
        this.props.actions.changegetParkCar({
          objective:"enable",
          id: rows.id
        }, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.initial(params, {obj:res, type:"edit"})
        })
      }} />
    },{
      title: "操作",
      render:(item:any)=>{
        return (
          <>
            <Button size="small" type="link" onClick={()=>this.setState({editVisible: true, detail:item})}>编辑</Button>
            <Button size="small" type="link">通行日志</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{

            }}>
              <Button size="small" type="link" >删除</Button>
            </Popconfirm>
          </>
        )
      }
    }]
  }
  

  render() {
    const {spinning, utils, parkcar, base} = this.props
    const {addVisible, editVisible, detail, importVisible, plateType, reneVisible, validNum, invalidNum, 
      deleteVisible, plateTypeList, exportVisible} = this.state

    return (
      <>
        {parkcar?<div style={{display: "flex", justifyContent: "space-between", background: "#fff", padding: 10}}>
          <Space>
            <Space>有效车辆：{parkcar.map.valid}</Space>
            <Space>已过期车辆：{parkcar.map.invalid}</Space>
          </Space>
          <Space>
            <Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增车辆</Button>
            <Button type="primary" ghost onClick={()=>this.setState({importVisible: true})} >批量导入</Button>
            <Button type="default" onClick={()=>this.setState({exportVisible: true})} >批量导出</Button>
            <Button type="dashed" danger onClick={()=>this.setState({reneVisible: true})} > 批量续约</Button>
            <Button type="primary" danger onClick={this.getPlateType.bind(this)} >批量移除</Button>
          </Space>
        </div>:null}
        <Row>
          <Col span={20}>
            <Table size="small" columns={this.getCol()} dataSource={parkcar?utils.addIndex(parkcar.list):[]} />
          </Col>
          <Col span={4}>
            <SearchModular
              layout="vertical"
              initialValues={params}
              resetValues={resetParams}
              submitSearch={(values:any)=>{
                params = values?{...params, ...values}:resetParams
                this.initial(params)
              }}
              data={[
                {label: "联系电话", name: "linkPhone", type: "input"},
                {label: "联系人名称", name: "linkName", type: "input"},
                {label: "车牌号码", name: "license", type: "input"},
                {label: "车辆分类", name: "plateType", type: <CarTypeElement parkId={this.props.match.params.id} />},
                {label: "有效状态", name: "isValid", type: "select", selectList: [
                  {label: "全部", id: ""},
                  {label: "已过期", id: 0},
                  {label: "未过期", id: 1},
                ]},
                {label: "状态", name: "status", type: <StatusElement/>},
              ]}
            />
          </Col>
        </Row>

        <AddModular
          title="新增车辆"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values)=>{
            this.props.actions.changegetParkCar({
              ...values,
              objective: "add",
              parkId: this.props.match.params.id,
              cardUrl: utils.submitFiles(values.cardUrl),
              driverUrl: utils.submitFiles(values.driverUrl),
              travelUrl: utils.submitFiles(values.travelUrl),
            }, ()=>{
              this.setState({addVisible: false})
              this.props.utils.OpenNotification("success")
              this.initial(params, {refresh: true})
            })
          }}
          data={[
            {label: "车牌号码", name: "license", type:"input", rules: true},
            {label: "车辆分类", name: "groupId", type:<CarTypeElement def={0} notAll parkId={this.props.match.params.id} />, rules: true},
            {label: "有效时间", name: "rtime", type:"rangepicker", rules: true},
            {label: "联系人名称", name: "linkName", type:"input", rules: true},
            {label: "联系电话", name: "linkPhone", type:"input", rules: true},
            {label: "身份证号", name: "cardNumber", type:"input"},
            {label: "身份证图片", name: "cardUrl", type:<UploadElement data={{fileType: "logo"}} />},
            {label: "驾驶证号", name: "driverNumber", type:"input"},
            {label: "驾驶证图片", name: "driverUrl", type:<UploadElement data={{fileType: "logo"}} />},
            {label: "行驶证号", name: "travelNumber", type:"input"},
            {label: "行驶证图片", name: "travelUrl", type:<UploadElement data={{fileType: "logo"}} />},                                                                                                                                                                                                                                                                                                                
            {label: "状态", name: "status", type:<StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type:"textarea"},
          ]}
        />

        <AddModular
          title="编辑车辆"
          spinning={spinning}
          visible={editVisible}
          initialValues={{...detail, 
            cardUrl: utils.echoFiles(detail.cardUrl),
            driverUrl: utils.echoFiles(detail.driverUrl),
            travelUrl: utils.echoFiles(detail.travelUrl),
            rtime: [moment(detail.startTime), moment(detail.expireTime)]
          }}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values)=>{
            this.props.actions.changegetParkCar({
              ...values,
              objective: "update",
              id: detail.id,
              parkId: this.props.match.params.id,
              cardUrl: utils.submitFiles(values.cardUrl),
              driverUrl: utils.submitFiles(values.driverUrl),
              travelUrl: utils.submitFiles(values.travelUrl),
            }, ()=>{
              this.setState({editVisible: false})
              this.props.utils.OpenNotification("success")
              this.initial(params, {refresh: true})
            })
          }}
          data={[
            {label: "车牌号码", name: "license", type:"input", rules: true},
            {label: "车辆分类", name: "groupId", type:<CarTypeElement def={0} notAll parkId={this.props.match.params.id} />, rules: true},
            {label: "有效时间", name: "rtime", type:"rangepicker", rules: true},
            {label: "联系人名称", name: "linkName", type:"input", rules: true},
            {label: "联系电话", name: "linkPhone", type:"input", rules: true},
            {label: "身份证号", name: "cardNumber", type:"input"},
            {label: "身份证图片", name: "cardUrl", type:<UploadElement data={{fileType: "logo"}} />},
            {label: "驾驶证号", name: "driverNumber", type:"input"},
            {label: "驾驶证图片", name: "driverUrl", type:<UploadElement data={{fileType: "logo"}} />},
            {label: "行驶证号", name: "travelNumber", type:"input"},
            {label: "行驶证图片", name: "travelUrl", type:<UploadElement data={{fileType: "logo"}} />},                                                                                                                                                                                                                                                                                                                
            {label: "状态", name: "status", type:<StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type:"textarea"},
          ]}
        />

        <ImportModular 
          title="批量导入车辆"
          visible={importVisible}
          onCancel={()=>this.setState({importVisible: false})}
          onOk={()=>{
            this.initial(params, {refresh: true})
          }}
          condNode={<CarTypeElement style={{minWidth: 100}} notAll parkId={this.props.match.params.id} onChange={(v:any)=>{
            this.setState({plateType:v})
          }} />}
          disabled={plateType?false:true}
          data={{importType: "plateData",parkId: this.props.match.params.id, type: plateType}}
          resourceKey={base.ResourceList.carInfoMode}
        />

        <AddModular
          title="批量续约"
          spinning={spinning}
          visible={reneVisible}
          onCancel={()=>this.setState({reneVisible: false})}
          onOk={(values)=>{
            console.log(values)
            this.props.actions.bachContract({
              ...values,
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.setState({reneVisible: false})
              this.initial(params, {refresh: true})
            })
          }}
          data={[
            {label:"续约类型", name:"type", type: <CarTypeElement def={0} notAll parkId={this.props.match.params.id} 
            onChange={(v:any)=>{
              this.props.actions.definedLicenseCount({
                listType: v
              }, ({invalid,valid}:any)=>{
                this.setState({validNum: valid, invalidNum: invalid})
              })
            }} />, rules: true},
            {label: "数量统计", name: "num", type: (
              <Space>
                <span>有效车辆：<Text type="success">{validNum}</Text></span>
                <span>已过期车辆：<Text type="danger">{invalidNum}</Text></span>
              </Space>
            )},
            {name: "valid", type: <Checkbox>有效车辆</Checkbox>,valuePropName: "checked", wrapperCol: {offset: 5}},
            {name: "invalid", type: <Checkbox>已过期车辆</Checkbox>, valuePropName: "checked", wrapperCol: {offset: 5} },
            {label: "续约时间", name: "contractDate", type: "datepicker", rules: true}
          ]}
        />

        <AddModular
          title="批量删除"
          spinning={spinning}
          visible={deleteVisible}
          onCancel={()=>this.setState({deleteVisible: false})}
          onOk={(values)=>{
            console.log(values)
            this.props.actions.deleteFeeGroup({
              ...values,
              parkId: this.props.match.params.id,
              type:values.type.join()
            }, ()=>{
              this.setState({deleteVisible: false})
              this.initial(params, {refresh: true})
            })
          }}
          data={[
            {label: "车辆类型", name: "type", type: (
              <Select mode="multiple" >
                {plateTypeList.map((item:any)=>(
                  <Option key={item.value} value={item.value} >
                    <Space>
                      <span>{item.name}</span>
                      <span>已过期车辆<Text mark>{item.plateSum}</Text></span>
                    </Space>
                  </Option>
                ))}
              </Select>
            ), rules: true}
          ]}
        />

        <AddModular
          title="批量导出"
          spinning={spinning}
          visible={exportVisible}
          onCancel={()=>this.setState({exportVisible: false})}
          onOk={(values)=>{
            window.location.href = `/zlwj/api/plate/sys/plate-license/plateExportData?parkId=${this.props.match.params.id}&groupId=${values.groupId}&token=${utils.getToken()}`
          }}
          data={[
            {label: "车辆类型", name: "groupId", type: <CarTypeElement style={{minWidth: 100}} notAll 
              parkId={this.props.match.params.id}  />, rules: true}
          ]}
        />

      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getParkCar, changegetParkCar, bachContract, definedLicenseCount, getFeeGroup,
      deleteFeeGroup}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    base: state.app.base,
    parkcar: state.park.parkcar,
    utils: state.app.utils,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(CarLeaseconf)