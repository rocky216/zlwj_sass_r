import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {getCompanyDetail, editCompanyBase} from "@admin/actions/companyAction"
import { IProps } from "@public/common/interface";
import { Button, Card, Col, Form, Input, Row, Skeleton } from "antd"
import SelectCompany from "@admin/components/Element/SelectCompany"
import UploadElement from "@admin/components/Element/UploadElement";
import _ from "lodash"
import Region from "@admin/components/Element/Region"
import { FormInstance } from "antd/lib/form";

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
      logo: ""
    }
  }

  componentDidMount(){
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

  render() {
    const {companyDetail} = this.state;
    
    return (
      
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
          <Col span={8}></Col>
          <Col span={8}></Col>
        </Row>
      
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCompanyDetail, editCompanyBase}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyBaseInfo)