import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import { getMessagePackage, getMessagePackageSum, addMessageNum, deleteMessagePackage, addMessagePackage, 
  editMessagePackage, statusMessagePackage} from "@admin/actions/messageAction"
import {messageConfColumns} from "../columns"
import { Button, Card, Input, InputNumber, Popconfirm, Select, Space, Table, Typography } from "antd";
import JCard from "@admin/components/JCard";
import AddPage from "@admin/components/Page/AddPage";

const {TextArea} = Input
const {Option} = Select

interface Props extends IProps {
  packages:any;
  packagesum:any;
}

let params = {
  current: 1,
}

class MessageConf extends React.Component<Props> {

  state = {
    addSumVisible: false,
    addVisible:false,
    editVisible: false,
    detail: {id: ""}
  }

  componentDidMount(){
    this.props.actions.getMessagePackage({params})
    this.props.actions.getMessagePackageSum({})
  }

  getCol(){
    let _this = this
    return [...messageConfColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=>{
        return (
          <Select size="small" value={item} onChange={this.statusSunmit.bind(this, rows)} >
            <Option value={1}>启用</Option>
            <Option value={0}>禁用</Option>
          </Select>
        );
      }
    },{
      title: "操作",
      width: 180,
      render:(item:any)=>{
        return (
          <>
            <Button type="link" onClick={()=>this.setState({editVisible: true, detail: item})} >短信包详情</Button>
            <Popconfirm title="是否删除？" onConfirm={this.deleteSubmit.bind(this, item)}>
              <Button type="link">删除</Button>
            </Popconfirm>
          </>
        );
      }
    }]
  }
  statusSunmit(item:any){
    this.props.actions.statusMessagePackage({
      id: item.id
    }, (res:any)=>{
      this.setState({editVisible: false})
      this.props.utils.OpenNotification("success")
      this.props.actions.getMessagePackage({params,type: "edit", obj: res})
    })
  }

  deleteSubmit(item:any){
    this.props.actions.deleteMessagePackage({id: item.id}, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getMessagePackage({params, refresh: true})
    })
  }

  addSumSubmit(values:any){
    this.props.actions.addMessageNum({
      ...values,
      id: this.props.packagesum.id
    }, ()=>{
      this.setState({addSumVisible: false})
      this.props.utils.OpenNotification("success")
      this.props.actions.getMessagePackageSum({params: {}, refresh: true})
      
    })
  }

  addSubmit(values:any){
    this.props.actions.addMessagePackage(values, ()=>{
      this.setState({addVisible: false})
      this.props.utils.OpenNotification("success")
      this.props.actions.getMessagePackage({params, refresh:true})
    })
  }
  editSubmit(values:any){
    this.props.actions.editMessagePackage({
      ...values, 
      id: this.state.detail.id
    }, (res:any)=>{
      this.setState({editVisible: false})
      this.props.utils.OpenNotification("success")
      this.props.actions.getMessagePackage({params,type: "edit", obj: res})
    })
  }

  render() {
    const {spinning,utils, packages, packagesum} = this.props
    const {addSumVisible, addVisible, editVisible, detail} = this.state
    

    return (
      <JCard spinning={spinning}>
        <div  key="a">
          <Card size="small" >
            <div className="flexbetween">
              <Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增短信包</Button>
              <Space size={20}>
                <span>可用的短信条数 <Typography.Text type="danger" strong>{packagesum?packagesum.num:0}</Typography.Text></span>
                <Button ghost type="primary" onClick={()=>this.setState({addSumVisible: true})} >增加短信条数</Button>
              </Space>
            </div>
          </Card>
        </div>
        <div key="b">
          <Card size="small" key="b">
            <Table size="small" columns={this.getCol()} dataSource={packages?utils.addIndex(packages.list):[]} 
            pagination={utils.Pagination(packages, page=>{
              params.current = page;
              this.props.actions.getMessagePackage({params})
            })}/>
          </Card>
        </div>

        <AddPage
          title="添加短信条数"
          spinning={spinning}
          visible={addSumVisible}
          onCancel={()=>this.setState({addSumVisible: false})}
          onOk={this.addSumSubmit.bind(this)}
          data={[
            {label: "增加条数", name: "num", type: InputNumber, rules: true}
          ]}
        />

        <AddPage
          title="新增短信包"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={this.addSubmit.bind(this)}
          data={[
            {label: "名称", name: "packageName", type: Input, rules: true},
            {label: "详情", name: "packageDesc", type: TextArea, rules: true},
            {label: "短信条数", name: "num", type: Input, rules: true},
            {label: "价格", name: "money", type: Input, rules: true},
            {label: "备注", name: "remark", type: TextArea, },
          ]}
        />
        <AddPage
          title="编辑短信包"
          spinning={spinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={this.editSubmit.bind(this)}
          initialValues={detail}
          data={[
            {label: "名称", name: "packageName", type: Input, rules: true},
            {label: "详情", name: "packageDesc", type: TextArea, rules: true},
            {label: "短信条数", name: "num", type: Input, rules: true},
            {label: "价格", name: "money", type: Input, rules: true},
            {label: "备注", name: "remark", type: TextArea, },
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getMessagePackage, getMessagePackageSum, addMessageNum, deleteMessagePackage,
      addMessagePackage, editMessagePackage, statusMessagePackage}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    packagesum: state.message.packagesum,
    packages: state.message.packages,
    utils: state.app.utils,
    spinning: state.message.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(MessageConf)