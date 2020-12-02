import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@admin/components/JCard"
import { Button, Card, Input, InputNumber, Popconfirm, Select, Table } from "antd";
import {getCompanyStaff } from "@admin/actions/companyAction"
import {usersColumns} from "@admin/views/users/columns"
import {statusSysUser} from "@admin/actions/userAction"
import Search from "@admin/components/Submit/Search";
import { Link } from "react-router-dom";
import AddPage from "@admin/components/Page/AddPage";


const {Option} = Select

interface Props extends IProps {
  companystaff: any;
}

let params = {
  current: 1,
  phone: "",
  status: ""
}
let resetParams = {
  current: 1,
  phone: "",
  status: ""
}

class CompanyStaff extends React.Component<Props> {

  state = {
    addVisible: false,
  }

  componentDidMount(){
    this.initial(params)
  }

  initial(params:any){
    this.props.actions.getCompanyStaff({params: {...params, companyId: this.props.match.params.id}})
  }

  statusUser(item:any){
    this.props.actions.statusSysUser({id: item.id}, (res:any)=>{
      
      this.props.utils.OpenNotification("success")
      this.props.actions.getCompanyStaff({
        params: {...params, companyId: this.props.match.params.id}, 
        obj: res, 
        type: "edit",
        refresh:true
      })
    })
  }

  getCol(){
    let _this = this;
    const {params} = this.props.match
    return [...usersColumns,{
      title: "状态",
      dataIndex: "status",
      render(item:any, rows:any) {
        return (
          <Select size="small" value={item} onChange={_this.statusUser.bind(_this, rows)}>
            <Option value={1}>启用</Option>
            <Option value={0}>禁用</Option>
          </Select>
        );
      }
    }, {
      title: "操作",
      width: 150,
      render(item:any) {
        return (
          <>
            <Link to={`/company/${params.id}/detail/assignauth/${item.temId}`}>
              <Button type="link">分配权限</Button>
            </Link>
          </>
        );
      }
    }]
  }

  handleSearch(values:any){
    if(!values){
      params = resetParams;
    }else{
      params = {...params, ...values}
    }
    this.initial(params)
  }

  render() {
    const {spinning, utils, companystaff} = this.props
    const {addVisible} = this.state


    return (
      <JCard spinning={spinning}> 
        <Search
          before={<Button type="primary">新增</Button>}
          initialValues={params}
          resetValues={resetParams}
          handleSearch={this.handleSearch.bind(this)}
          data={[
            {label: "手机号", name: "phone", type: Input},
            {label: "状态", name: "status", type: Select, selectList: [
              {label: "全部", id: ""},
              {label: "启用", id: 1},
              {label: "禁用", id: 0},
            ]},
          ]}
        />
        <Card  size="small" >
          <Table size="small" columns={this.getCol()} dataSource={companystaff?utils.addIndex(companystaff.list):[]} 
          pagination={utils.Pagination(companystaff, (page)=>{
            params.current = page
            this.initial(params)
          })}/>
        </Card>

        {/* <AddPage
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={()=>{}}
          data={[
            {label: ""}
          ]}
        /> */}

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCompanyStaff, statusSysUser}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    companystaff: state.company.companystaff,
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyStaff)