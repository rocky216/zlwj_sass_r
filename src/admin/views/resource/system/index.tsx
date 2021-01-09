import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@admin/components/JCard"
import {getSysResource, addSysResource, editSysResource, deleteSysResource} from "@admin/actions/otherAction"
import {resourceColumns} from "../columns"
import { Button, Card, Input, Popconfirm, Table, Upload} from "antd";
import Search from "@admin/components/Submit/Search";
import AddResource from "./add"
import EditResource from "./edit"

interface Props extends IProps {
  resource:any;

}

let params = {
  current: 1,
  annexName: "",
  resourceKey: "",
}
let resetParams = {
  current: 1,
  annexName: "",
  resourceKey: "",
}


class ResourcePage extends React.Component<Props> {
  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: ""}
  }

  componentDidMount(){
    this.props.actions.getSysResource({params})
  }

  getCol(){
    return [...resourceColumns, {
      title: "操作",
      render: (item:any)=>{
        return (
          <>
            <Button type="link" onClick={()=>this.setState({editVisible: true, detail: item})}>资源详情</Button>
            <Popconfirm title="是否删除？" onConfirm={this.deleteSubmit.bind(this, item)}>
              <Button type="link">删除</Button>
            </Popconfirm>
            
          </>
        );
      }
    }]
  }

  submitSearch(values:any){
    if(!values){
      // params = resetParams;
    }else{
      params = {...params, ...values}
    }
    this.props.actions.getSysResource({params, refresh: true})
  }

  deleteSubmit(item:any){
    
    this.props.actions.deleteSysResource({
      id: item.id
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getSysResource({params, refresh: true})
    })
  }

  addSubmit(values:any){
    
    this.props.actions.addSysResource(values, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getSysResource({params, refresh: true})
      this.setState({addVisible: false})
    })
  }

  editSubmit(values:any){
    
    this.props.actions.editSysResource({
      ...values,
      id: this.state.detail.id
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getSysResource({params, refresh: true})
      this.setState({editVisible: false})
    })
  }

  render() {
    const {spinning, utils, resource} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Search
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增</Button>}
            initialValues={params}
            resetValues={resetParams}
            handleSearch={this.submitSearch.bind(this)}
            data={[
              {label: "资源名称", name: "annexName", type: Input},
              {label: "资源key", name: "resourceKey", type: Input},
            ]}
          />
        </div>
        <div key="b">
          <Card size="small" >
            <Table size="small" columns={this.getCol()} dataSource={resource?utils.addIndex(resource.list):[]} 
            pagination={utils.Pagination(resource, (page)=>{
              params.current = page;
              this.props.actions.getSysResource({params})
            })}/>
          </Card>
        </div>
        <AddResource 
          title="新增资源"
          visible={addVisible} 
          onCancel={()=>this.setState({addVisible: false})}
          onOk={this.addSubmit.bind(this)}
        />
        <EditResource 
          title="编辑资源"
          visible={editVisible} 
          detail={detail}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={this.editSubmit.bind(this)}
        />
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getSysResource, addSysResource, editSysResource, deleteSysResource}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    resource: state.other.resource,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ResourcePage)