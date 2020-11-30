import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {getCompanyDetail, editCompanyBase, addCompanyAuthPackage, deleteCompanyAuthPackage,
  getCompanyAuthPackageMenu} from "@admin/actions/companyAction"
import { IProps } from "@public/common/interface";
import { Button, Card, Col, DatePicker, Form, Input, List, Popconfirm, Row, Select, Skeleton} from "antd"
import SelectCompany from "@admin/components/Element/SelectCompany"
import UploadElement from "@admin/components/Element/UploadElement";
import _ from "lodash"
import Region from "@admin/components/Element/Region"
import { FormInstance } from "antd/lib/form";
import MenuTree from "@admin/components/Page/MenuTree";
import AddPage from "@admin/components/Page/AddPage";
import SystemElement from "@admin/components/Element/SystemElement";
import PackageElement from "@admin/components/Element/PackageElement"
import { DeleteOutlined } from "@ant-design/icons";

const {TextArea} = Input
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 },
};


interface Props extends IProps {
  companyDetail: any;
}



class CompanyBaseInfo extends React.Component<Props> {


  formRef = React.createRef<FormInstance>()

  state = {
    formList: [
      {label: "公司logo", name: "logo", type: <UploadElement />},
      {label: "公司名称",name: "name", type: <Input/>},
      {label: "公司简称",name: "nickname", type: <Input/>},
      {label: "上级公司",name: "parentId", type: <SelectCompany/>},
      {label: "省/市/区",name: "companyAddress", type: <Region/>},
      {label: "公司地址",name: "addressDetail", type: <TextArea/>},
      {label: "经度",name: "longitude", type: <Input/>},
      {label: "纬度",name: "latitude", type: <Input/>},
    ],
    companyDetail: {
      logo: "",
      sysProperAuthPackageList:[]
    },
    addVisible: false,
    systemId: "",
    currentKeys: [],
    currentPackage: {id:"",packageName:""}
  }

  componentDidMount(){
    this.initial()
  }
  initial(){
    this.props.actions.getCompanyDetail({id: this.props.match.params.id}, (res:any)=>{
      res.companyAddress = res.companyAddress?res.companyAddress.split(","):[]
      this.setState({companyDetail: res})
    })
  }

  onFinishBase(values:any){
    
    const {companyAddress, logo} = values;
    this.props.actions.editCompanyBase({
      ...values,
      id: this.props.match.params.id,
      logo: this.props.utils.submitFiles(logo),
      companyAddress: companyAddress?companyAddress.join():""
    }, ()=>{
      this.props.utils.OpenNotification("success")
    })
  }

  addPackage(values:any){
    console.log(values)
    this.props.actions.addCompanyAuthPackage({...values, companyId: this.props.match.params.id}, ()=>{
      this.setState({addVisible: false})
      this.props.utils.OpenNotification("success")
      this.initial();
    })
  }

  deletePackage(item:any){
    this.props.actions.deleteCompanyAuthPackage({
      companyId: this.props.match.params.id,
      packageId: item.id
    }, ()=>{
      this.initial();
      this.props.utils.OpenNotification("success")
    })
  }

  getPackageMenu(item:any){
    this.setState({currentPackage: item})
    this.props.actions.getCompanyAuthPackageMenu({packageId: item.id}, (res:any)=>{
      this.setState({currentKeys: res})
    })
  }

  render() {
    const {companyDetail,  addVisible, systemId, currentKeys, currentPackage} = this.state;
    
    return (
      <>
        <Row>
          <Col span={8}>
            <Card size="small" extra={<Button ghost type="primary" onClick={()=>this.formRef.current?.submit()}>保存</Button>}>
              {_.size(companyDetail)>2?
              <Form {...layout} ref={this.formRef}
                onFinish={this.onFinishBase.bind(this)}
                initialValues={{...companyDetail, logo: [{url: companyDetail.logo, uid: -1, name: "a"}]}}>
                {this.state.formList.map((item, index)=>(
                  <Form.Item key={index} label={item.label} name={item.name} >
                    {item.type}
                  </Form.Item>
                ))}
              </Form>:<Skeleton active />}
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="系统权限包" 
              extra={<Button type="primary" onClick={()=>this.setState({addVisible:true})}>新增权限包</Button>}>
              <List
                bordered
                dataSource={companyDetail.sysProperAuthPackageList}
                renderItem={(item:any)=>{
                  return (
                    <List.Item  actions={[(
                      <Popconfirm title="是否删除？" onConfirm={this.deletePackage.bind(this, item)}>
                          <DeleteOutlined />
                      </Popconfirm>
                    )]}>
                      <div  style={{cursor: "pointer", color: currentPackage.id==item.id?"green":"" }} onClick={this.getPackageMenu.bind(this, item)}>
                        {item.packageName}
                      </div>
                    </List.Item>
                  )
                }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title={currentPackage.packageName}>
              <MenuTree
                disabled
                checkable
                checkedKeys={currentKeys}
                defaultExpandAll
                systemId={"25"}
              />
            </Card>
          </Col>
        </Row>
        <Form.Provider
          onFormChange={(name, {changedFields, forms})=>{
            if(changedFields && changedFields.length){
              if((changedFields as any)[0]["name"][0] === "systemId"){
                forms[name].setFieldsValue({packageId: ""})
              }
            }
            
          }}
        >
          <AddPage
            title="新增权限包"
            spinning={false}
            visible={addVisible}
            onCancel={()=>this.setState({addVisible: false})}
            onOk={this.addPackage.bind(this)}
            data={[
              {label: "选择系统", name: "systemId", type: <SystemElement noAll onChange={(val:any)=>{
                this.setState({systemId: val})
              }} />, rules: true},
              {label: "选择权限包", name: "packageId", type: <PackageElement systemId={systemId} />,  rules: true},
              {label: "有效期", name: "isLong", type: Select, selectList: [
                {name: "永久有效", id: "Y"},
                {name: "有效时间", id: "N"},
              ]},
              {label: "有效期至", name: "expireTime", type: DatePicker},
            ]}
          />
        </Form.Provider>
        
      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCompanyDetail, editCompanyBase, addCompanyAuthPackage, deleteCompanyAuthPackage,
      getCompanyAuthPackageMenu}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyBaseInfo)