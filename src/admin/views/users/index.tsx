import React from "react"
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import {Button, Card, Form, Input, InputNumber, Select, Table} from "antd"
import {usersColumns} from "./columns"
import JCard from "@admin/components/JCard"
import { bindActionCreators } from "redux";
import {getUsers, addSysUser} from "@admin/actions/userAction"
import {IProps} from "@public/common/interface"
import { FormInstance } from "antd/lib/form";
import AddPage from "@admin/components/Page/AddPage"
import CompanyHeElement from "@admin/components/Element/CompanyHeElement"

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
  companyId: "",
  heId: "",
  temId: "",
}


class UsersPage extends React.Component<Props> {
  formRef = React.createRef<FormInstance>()

  state:any={
    addVisible: false,
    currentKey: "authList",
    filterSelect: [
      {label: "权限查询", value: "authList"},
      {label: "用户查询", value: "userList"},
      {label: "账户查询", value: "accountList"}
    ],
    authList: [
      {label: "公司项区权限", name: "auth", type: <CompanyHeElement/>, 
        initialValue: params.companyId?[params.companyId,params.heId]:[]},
    ],
    userList: [
      {label: "姓名", name: "userName", type: <Input/>},
      {label: "手机号", name: "phone", type: <InputNumber style={{width: 130}}/>},
      {label: "昵称", name: "userNick", type: <Input/>},
    ],
    accountList: [
      {label: "唯一ID", name: "temId", type: <Input/>},
      {label: "账号", name: "account", type: <Input/>},
      {label: "状态", name: "status", type: (
        <Select >
          <Option value="">全部</Option>
          <Option value={1}>启用</Option>
          <Option value={0}>禁用</Option>
        </Select>
      ), initialValue:"" },
    ],
  }

  componentDidMount(){
    
    this.props.actions.getUsers({params, refresh:true}) 
    
  }

  handleSearch(values:any){
    const {currentKey} = this.state
    const {auth, userName, phone, userNick, status, account, temId} = values
    if(currentKey == "authList"){
      params = Object.assign({params, 
        companyId: auth.length?auth[0]:"",
        heId: auth.length?auth[1]:"",
      })
      this.props.actions.getUsers({params, refresh: true})
      return
    }
    if(currentKey == "userList"){
      params = Object.assign({params, 
        userName,
        phone,
        userNick,
      })
      this.props.actions.getUsers({params, refresh: true})
      return
    }
    if(currentKey == "accountList"){
      params = Object.assign({params, 
        status,
        account,
        temId,
      })
      this.props.actions.getUsers({params, refresh: true})
      return
    }
  }

  getCol(){
    return [...usersColumns, {
      title: "操作",
      width: 100,
      render(item:any) {
        return (
          <Link to={`/users/${item.id}/detail/${item.temId}/base`}>
            <Button type="link">用户详情</Button>
          </Link>
        )
      }
    }]
  }

  addUser(values:any){
    this.props.actions.addSysUser({
      ...values,
    }, ()=>{
      this.props.actions.getUsers({params, refresh:true}) 
      this.props.utils.OpenNotification("success")
      this.setState({addVisible: false})
    })
  }


  render() {
    const {spinning, utils, users} = this.props;
    const {filterSelect, currentKey, addVisible} = this.state
    
    return (
      <JCard spinning={spinning}>
        <AddPage
          title="新增用户"
          spinning={false}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={this.addUser.bind(this)}
          data={[
            {label:"手机号", name: "phoneAccount", type: InputNumber, rules: true},
            {label:"姓名", name: "userName", type: Input},
            {label:"昵称", name: "userNick", type: Input},
            {label:"性别", name: "gender", type: (
              <Select>
                <Option value={1}>男</Option>
                <Option value={2}>女</Option>
                <Option value={3}>未知</Option>
              </Select>
            )},
          ]}
        />

        <div key="a">
          <Card size="small" >
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增用户</Button>
              <div>
                <Form className="flexend" layout="inline" ref={this.formRef} onFinish={this.handleSearch.bind(this)} >
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
                    <Form.Item key={index} name={item.name} label={item.label} initialValue={item.initialValue}  >
                      {item.type}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button ghost type="primary" htmlType="submit">搜索</Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Card>
        </div>
        <div key="b">
          <Card size="small"  >
            <Table size="small" columns={this.getCol()} dataSource={users?utils.addIndex(users.list):[]} 
            pagination={utils.Pagination(users, (pages:number)=>{
              params.current = pages;
              this.props.actions.getUsers({params, refresh: true})
            })}/>
          </Card>
        </div>
      </JCard>
    );
  }

}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getUsers, addSysUser}, dispatch)
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