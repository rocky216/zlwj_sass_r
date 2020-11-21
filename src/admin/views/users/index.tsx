import React from "react"
import { connect } from "react-redux";
import {Button, Card, Form, Input, InputNumber, Select, Table} from "antd"
import {usersColumns} from "./columns"
import JCard from "@admin/components/JCard"
import { PlusOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import {getUsers} from "@admin/actions/userAcrion"
import {IProps} from "@public/common/interface"
import { FormInstance } from "antd/lib/form";

const {Option} = Select

interface Props extends IProps {
  users:any;
}

let params = {
  current: 1,
  userName: "",
  phone: "",
  status: "",
  userNick: "",
  account: "",
}

class UsersPage extends React.Component<Props> {
  formRef = React.createRef<FormInstance>()

  state:any={
    currentKey: "userList",
    filterSelect: [
      {label: "权限查询", value: "authList"},
      {label: "用户查询", value: "userList"},
      {label: "账户查询", value: "accountList"}
    ],
    authList: [
      {label: "公司项区权限", name: "auth"},
    ],
    userList: [
      {label: "姓名", name: "userName", type: <Input/>},
      {label: "手机号", name: "phone", type: <InputNumber/>},
      {label: "昵称", name: "userNick", type: <Input/>},
    ],
    accountList: [
      {label: "唯一ID", name: "temId", type: <Input/>},
      {label: "账号", name: "account", type: <Input/>},
      {label: "状态", name: "status", type: (
        <Select>
          <Option value="">全部</Option>
          <Option value={1}>启用</Option>
          <Option value={2}>禁用</Option>
        </Select>
      ), initialValue: ""},
    ],
  }

  componentDidMount(){
    this.props.actions.getUsers({params})
    
  }

  handleSearch(values:any){
    console.log(values)
  }


  render() {
    const {spinning, utils, users} = this.props;
    const {filterSelect, currentKey} = this.state
  
    return (
      <JCard spinning={false}>
        <div key="a">
          <Card size="small">
            <Form className="flexend" layout="inline" ref={this.formRef} >
              <Form.Item label="搜索类型" name="type" initialValue={currentKey}>
                <Select onChange={(v)=>{
                  this.setState({currentKey: v})
                }}>
                  {filterSelect.map((item:any)=>(
                    <Option key={item.value} value={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              {this.state[currentKey].map((item:any, index:number)=>(
                <Form.Item key={index} label={item.label}>
                  {item.type}
                </Form.Item>
              ))}
              <Form.Item>
                <Button ghost type="primary" htmlType="submit">搜索</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div key="b">
          <Card size="small"  >
            <Table size="small" columns={usersColumns} dataSource={users?utils.addIndex(users.list):[]} />
          </Card>
        </div>
      </JCard>
    );
  }

}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getUsers}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    users: state.user.users,
    spinning: state.user.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(UsersPage)