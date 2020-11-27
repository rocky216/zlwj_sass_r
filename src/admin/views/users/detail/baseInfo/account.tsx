import React from "react"
import { connect } from "react-redux";
import { Button, Card, Form, Input, Skeleton } from "antd"
import { bindActionCreators } from "redux";
import {getAccountInfo, editAccountInfo} from "@admin/actions/userAction"
import {IProps} from "@public/common/interface"
import _ from "lodash";
import { FormInstance } from "antd/lib/form";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

class UserAccountInfo extends React.Component<IProps> {
  formRef = React.createRef<FormInstance>();

  state = {
    detail: {},
    accountForm: [
      {label: "账户", name: "account", type: <Input disabled />},
      {label: "手机账户", name: "phoneAccount", type: <Input disabled/>},
      {label: "email账户", name: "emailAccount", type: <Input disabled/>},
      {label: "密码", name: "password", type: <Input/>},
      {label: "加密盐值	", name: "salt", type: <Input />},
    ]
  }

  componentDidMount(){
    console.log(this.props)
    this.props.actions.getAccountInfo({id: this.props.match.params.id}, (res:any)=>{
      this.setState({detail: res})
    })
  }

  onFinish(values: any){
    this.props.actions.editAccountInfo({
      ...values,
      id: this.props.match.params.id
    }, ()=>{
      this.props.utils.OpenNotification("success")
    })
  }

  render() {
    const {} = this.props;
    const {accountForm, detail} = this.state

    return (
      <Card  title="账户信息" size="small" extra={<Button type="primary" onClick={()=>this.formRef.current?.submit()}>保存</Button>}>
        {_.size(detail)>0?
        <Form {...layout} ref={this.formRef} initialValues={detail} 
          onFinish={this.onFinish.bind(this)}>
          {accountForm.map(item=>(
            <Form.Item key={item.name} label={item.label} name={item.name} >
              {item.type}
            </Form.Item>
          ))}
        </Form>:<Skeleton active />}
      </Card>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getAccountInfo, editAccountInfo}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(UserAccountInfo)