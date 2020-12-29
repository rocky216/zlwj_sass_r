import React from "react"
import { connect } from "react-redux";
import {Row, Col, Card, Button, Form, Input, Select, InputNumber, Skeleton} from "antd"
import { bindActionCreators } from "redux";
import Region from "@admin/components/Element/Region"
import {IProps} from "@public/common/interface"
import UploadElement from "@admin/components/Element/UploadElement"
import {getUserInfo, editUserInfo} from "@admin/actions/userAction"
import _ from "lodash";
import { FormInstance } from "antd/lib/form";
import UserAccountInfo from "./baseInfo/account"
import UserPush from "./baseInfo/userpush"


const {Option} = Select

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};


class UserBaseInfo extends React.Component<IProps> {
  formRef = React.createRef<FormInstance>();

  state = {
    detail: {
      avatarUrl: "",
      id: ""
    },
    baseForm: [
      {label: "头像", name: "avatarUrl", type: <UploadElement/> },
      {label: "用户ID", name: "temId", type: <Input disabled /> },
      {label: "姓名", name: "realName", type: <Input/>},
      {label: "昵称", name: "nickName", type: <Input disabled /> },
      {label: "电话", name: "language", type: <InputNumber style={{width: "100%"}} /> },
      {label: "邮箱", name: "email", type: <Input/> },
      {label: "性别", name: "gender", type: (
        <Select>
          <Option value={1}>男</Option>
          <Option value={2}>女</Option>
          <Option value={3}>未知</Option>
        </Select>
      ) }
    ]
  }

  componentDidMount(){
    this.props.actions.getUserInfo({temId: this.props.match.params.temId}, (res:any)=>{
      this.setState({detail: res})
    })
  }
  onFinish(values: any){
    this.props.actions.editUserInfo({
      ...values,
      id: this.state.detail.id,
      avatarUrl: this.props.utils.submitFiles(values.avatarUrl)
    }, ()=>{
      this.props.utils.OpenNotification("success")
    })
  }

  render() {
    const {utils } = this.props
    const {baseForm, detail, } = this.state

    return (
      <Row gutter={10}>
        <Col span={8}>
          <Card size="small" title="基础信息" 
            extra={<Button type="primary" onClick={()=>this.formRef.current?.submit()}>保存</Button>}>
            {_.size(detail)>2?
            <Form ref={this.formRef} {...layout} 
              onFinish={this.onFinish.bind(this)}
              initialValues={{...detail, avatarUrl: utils.echoFiles(detail.avatarUrl)}} >
              {baseForm.map((item, index)=>(
                <Form.Item key={index} label={item.label} name={item.name}>{item.type}</Form.Item>
              ))}
            </Form>: <Skeleton active />}
          </Card>
        </Col>
        <Col span={8}>
          <UserAccountInfo {...this.props} />
        </Col>
        <Col span={8}>
          <UserPush {...this.props} />
        </Col>
      </Row>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getUserInfo, editUserInfo}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(UserBaseInfo)