import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@admin/components/JCard"
import {getUserSystemAuth, addUserSystemAuth, deleteUserSystemPro, addUserCompanyRole, addCompanyUserProject, 
  deleteUserSystemRole, deleteUserSystem} from "@admin/actions/companyAction"
import _ from "lodash";
import { Button, Card, Col, Popconfirm, Row, Space, Tag, Tree } from "antd";
import AddPage from "@admin/components/Page/AddPage";
import SystemElement from "@admin/components/Element/SystemElement";
import { DeleteOutlined, DragOutlined, PlusOutlined } from "@ant-design/icons";
import RoleElement from "@admin/components/Element/RoleElement";
import ProjectElement from "@admin/components/Element/ProjectElement";

interface Props extends IProps {

}

class AssignAuth extends React.Component<Props> {

  state = {
    companysys: [],
    addSysVisible: false,
    addRoleVisible: false,
    addRoleDetail: {id: ""},
    addProVisible: false,
    addProDetail: {id: ""}
  }

  componentDidMount(){
    this.initialCompanySys()
  }

  initialCompanySys(){
    this.props.actions.getUserSystemAuth({
      temId: this.props.match.params.temId,
      companyId: this.props.match.params.id,
    }, (res:any)=>{
      this.setState({companysys: res})
    })
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
        <span>{item.title}{item.type=="item"?<span style={{color: "red"}}>(项目)</span>:null}</span>
        <Space size={20}>
          {item.type=="system"?<PlusOutlined 
            onClick={()=>this.setState({addRoleVisible: true, addRoleDetail: item})} />:null}
          {item.type=="system" && item.systemLevel=="XM"?
            <DragOutlined  onClick={()=>this.setState({addProVisible: true, addProDetail: item})} />:null}
          <Popconfirm title="是否删除？" onConfirm={this.deleteRole.bind(this, item)}>
            <DeleteOutlined onClick={(e:any)=>e.stopPropagation()} />
          </Popconfirm>
          
        </Space>
      </div>
    )
    
  }

  deleteRole(item:any){
    
    if(item.type=="system"){
      this.props.actions.deleteUserSystem({
        temId: this.props.match.params.temId,
        companyId: this.props.match.params.id,
        systemId: item.id
      }, ()=>{
        this.props.utils.OpenNotification("success")
        this.initialCompanySys()
      })
    }else if(item.type=="role"){
      this.props.actions.deleteUserSystemRole({
        id: item.id
      }, ()=>{
        this.props.utils.OpenNotification("success")
        this.initialCompanySys()
      })
    }else if(item.type=="item"){
      this.props.actions.deleteUserSystemPro({
        temId: this.props.match.params.temId,
        companyId: this.props.match.params.id,
        systemId: item.singleStr.split("-")[0],
        itemId: item.id
      }, ()=>{
        this.props.utils.OpenNotification("success")
        this.initialCompanySys()
      })
    }
  }

  

  render() {
    const {spinning, utils, match} = this.props
    const {companysys, addSysVisible, addRoleVisible, addRoleDetail, addProVisible, addProDetail} = this.state


    return (
      <JCard spinning={spinning}> 
        <Row>
          <Col span={8}>
            <Card size="small" extra={<Button type="primary" onClick={()=>this.setState({addSysVisible: true})}>添加系统</Button>}>
              <Tree 
                defaultExpandAll
                blockNode
                titleRender={this.titleRender.bind(this)}
                treeData={this.handleData(companysys)}
              />
            </Card>
          </Col>
        </Row>

        <AddPage
          title="新增系统"
          spinning={false}
          visible={addSysVisible}
          onCancel={()=>this.setState({addSysVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.addUserSystemAuth({
              temId: this.props.match.params.temId,
              companyId: this.props.match.params.id,
              systemId: values.systemId
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.initialCompanySys()
              this.setState({addSysVisible: false})
            })
          }}
          data={[
            {label: "选择系统", name: "systemId", type: <SystemElement companyId={match.params.id} noAll />, rules: true}
          ]}
        />

        <AddPage
          title="添加角色"
          spinning={false}
          visible={addRoleVisible}
          onCancel={()=>this.setState({addRoleVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.addUserCompanyRole({
              temId: this.props.match.params.temId,
              companyId: this.props.match.params.id,
              systemId: addRoleDetail.id,
              roleId: values.roleId
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.setState({addRoleVisible: false})
              this.initialCompanySys()
            })
          }}
          data={[
            {label: "选择角色", name: "roleId", type: <RoleElement noAll companyId={match.params.id} systemId={addRoleDetail.id} />}
          ]}
        />

        <AddPage
          title="添加项目"
          spinning={false}
          visible={addProVisible}
          onCancel={()=>this.setState({addProVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.addCompanyUserProject({
              temId: this.props.match.params.temId,
              companyId: this.props.match.params.id,
              systemId: addProDetail.id,
              itemId: values.itemId
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.setState({addProVisible: false})
              this.initialCompanySys()
            })
          }}
          data={[
            {label: "选择项目", name: "itemId", type: <ProjectElement noAll companyId={match.params.id} />, rules: true}
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getUserSystemAuth, addUserSystemAuth, deleteUserSystemPro, addUserCompanyRole, 
      addCompanyUserProject, deleteUserSystemRole, deleteUserSystem}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(AssignAuth)