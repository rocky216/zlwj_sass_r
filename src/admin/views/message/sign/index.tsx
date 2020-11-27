import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@admin/components/JCard";
import {getMessageSign, addMessageSign, deleteMessageSign, statusMessageSign} from "@admin/actions/messageAction"
import { Button, Card, Input, Popconfirm, Select, Table } from "antd";
import {messageSignColumns} from "../columns"
import Search from "@admin/components/Submit/Search";
import AddPage from "@admin/components/Page/AddPage";

const {TextArea} = Input
const {Option} = Select

interface Props extends IProps {
  signs:any;
}

let params = {
  current: 1,
  signName: "",
  status: "",
  
}

let resetParams = {
  current: 1,
  signName: "",
  status: ""
}

class MessageSign extends React.Component<Props> {
  state = {
    addVisible: false
  }

  componentDidMount(){
    this.props.actions.getMessageSign({params})
  }

  getCol(){
    return [...messageSignColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=>{
        return (
          <Select size="small" value={item} onChange={this.statusSubmit.bind(this, rows)} >
            <Option value={1}>启用</Option>
            <Option value={0}>禁用</Option>
          </Select>
        );
      }
    }, {
      title: "操作",
      width: 120,
      render:(item:any)=>{
        return (
          <Popconfirm title="是否删除" onConfirm={this.deleteSubmit.bind(this, item)}>
            <Button type="link">删除</Button>
          </Popconfirm>
        );
      }
    }]
  }
  

  submitSearch(values:any){
    if(!values){
      params = resetParams;
    }else{
      params={...params, ...values}
    }
    this.props.actions.getMessageSign({params, refresh: true})
  }

  statusSubmit(item:any){
    this.props.actions.statusMessageSign({id: item.id}, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getMessageSign({params, refresh: true})
    })
  }

  deleteSubmit(item:any){
    this.props.actions.deleteMessageSign({id: item.id}, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getMessageSign({params, refresh: true})
    })
  }

  addSubmit(values:any){
    this.props.actions.addMessageSign(values, ()=>{
      this.props.utils.OpenNotification("success")
      this.setState({addVisible: false})
      this.props.actions.getMessageSign({params, refresh: true})
    })
  }

  render() {
    const {spinning, utils, signs} = this.props
    const {addVisible} = this.state
    
    return (
      <JCard spinning={spinning}>
        <div key="a">
          <Search
            
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增</Button>}
            initialValues={params}
            resetValues={resetParams}
            handleSearch={this.submitSearch.bind(this)}
            data={[
              {label: "签名名称", name: "signName", type: Input},
              {label: "状态", name: "status", type: Select, selectList: [
                {label: "全部", id: ""},
                {label: "启用", id: 1},
                {label: "禁用", id: 0},
              ]},
            ]}
          />
        </div>
        <div key="b">
          <Card size="small" key="b">
            <Table size="small" columns={this.getCol()} dataSource={signs?utils.addIndex(signs.list):[]} />
          </Card>
        </div>
        
        <AddPage
          title="新增签名"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={this.addSubmit.bind(this)}
          data={[
            {label: "签名名称", name: "signName", type: Input},
            {label: "平台签名Id", name: "signId", type: Input},
            {label: "是否默认", name: "isDefault", type: Select, selectList: [
              {name: "是", id: 1},
              {name: "否", id: 0},
            ]},
            {label: "短信种类", name: "signType", type: Select, selectList: [
              {name: "阿里云", id: "ALY"},
              {name: "飞鸽", id: "FG"},
            ]},
            {label: "备注", name: "remark", type: TextArea},
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getMessageSign, addMessageSign, deleteMessageSign, statusMessageSign}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    signs: state.message.signs,
    utils: state.app.utils,
    spinning: state.message.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(MessageSign)