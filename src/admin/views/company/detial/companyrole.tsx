import React from "react"
import {connect} from "react-redux"
import {getCompanyRole, addCompanySysRole, getSystemRoleMenu, addOrUpdaMenu} from "@admin/actions/companyAction"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import { Card, Col, Row, Space, Tree, Skeleton, Input, Select, Button} from "antd";
import _ from "lodash";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AddPage from "@admin/components/Page/AddPage";
import MenuTree from "@admin/components/Page/MenuTree";

const {TextArea} = Input

interface Props extends IProps{
  companyrole:any;
}

class CompanyRole extends React.Component<Props> {
  
  state = {
    addRoleVisible: false,
    addDetail: {id: ""},
    currentSysRole: {systemId: "", id:""},
    currentChecks: []
  }

  componentDidMount(){
    this.props.actions.getCompanyRole({params: {companyId: this.props.match.params.id}})
  }

  handleData(arr:any[]){
    let newArr:any[]=[]
    if(!arr){
      return newArr
    }

    function recursion(arr:any[]){
      _.each(arr, (item,index)=>{
        item.key = item.id
        item.title = item.name
        item.children = item.userAuthVoList
        if(item.type==="system"){
          item.selectable=false
        }
        if(item.userAuthVoList && item.userAuthVoList.length){
          item.selectable=false
          recursion(item.userAuthVoList)
        }
      })
    }
    recursion(arr)
    return arr;
  }

  titleRender(item:any){
    return (
      <div className="flexbetween">
        <span>{item.title}</span>
        <Space size={20}>
          {item.type=="system"?<PlusOutlined 
            onClick={()=>this.setState({addRoleVisible: true, addDetail: item})} />:null}
          {item.type=="system"?null:<DeleteOutlined />}
          
        </Space>
      </div>
    )
    
  }

  handleSelect(item:any, {node}:any){
    this.setState({currentSysRole: {...node, systemId: node.singleStr.split("-")[0]}})
    this.props.actions.getSystemRoleMenu({
      companyId: this.props.match.params.id,
      systemId: node.singleStr.split("-")[0],
      roleId: node.singleStr.split("-")[1]
    }, (res:any)=>{
      this.setState({currentChecks: res})
    })
  }

  addRoleSubmit(values:any){
    this.props.actions.addCompanySysRole({
      companyId: this.props.match.params.id,
      systemId: this.state.addDetail.id,
      roleName: values.roleName
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.setState({addRoleVisible: false})
      this.props.actions.getCompanyRole({params: {companyId: this.props.match.params.id}, refresh:true})
    })
  }

  submitRoleMenu(){
    const {currentSysRole, currentChecks} = this.state
    
    this.props.actions.addOrUpdaMenu({
      companyId: this.props.match.params.id,
      systemId: currentSysRole.systemId,
      roleId: currentSysRole.id,
      menuIds: currentChecks.join()
    }, ()=>{
      this.props.utils.OpenNotification("success")
    })
  }

  render() {
    const {companyrole} = this.props
    const {addRoleVisible, addDetail, currentSysRole, currentChecks} = this.state
    

    return (
      <>
        <Row>
          <Col span={8}>
            <Card size="small" title="系统">
            {companyrole?<Tree 
              blockNode
              defaultExpandAll
              titleRender={this.titleRender.bind(this)}
              treeData={this.handleData(companyrole)} 
              onSelect={this.handleSelect.bind(this)}
              />: <Skeleton active />}
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" extra={<Button type="primary" onClick={this.submitRoleMenu.bind(this)}>保存</Button>}>
              <MenuTree
                checkStrictly
                checkedKeys={currentChecks}
                systemId={currentSysRole.systemId}
                checkable
                onCheck={({checked})=>{
                  
                  this.setState({currentChecks: checked})
                }}
              />
            </Card>
          </Col>
        </Row>
        <AddPage
          title="新增角色"
          spinning={false}
          visible={addRoleVisible}
          onCancel={()=>this.setState({addRoleVisible: false})}
          onOk={this.addRoleSubmit.bind(this)}
          data={[
            {label: "角色名称", name: "roleName", type: Input, rules: true},
            {label: "状态", name: "status", type: Select, selectList: [
              {name: "启用", id: 0},
              {name: "禁用", id: 1},
            ], rules: true},
            {label: "备注", name: "remark", type: TextArea},
          ]}
        />
      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCompanyRole, addCompanySysRole, getSystemRoleMenu, addOrUpdaMenu}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    appSpinning: state.app.spinning,
    companyrole: state.company.companyrole,
    utils: state.app.utils,
    
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyRole)