import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import { Button, Card, Input, Space, Tree, Popconfirm, Skeleton} from "antd";
import AddPage from "@admin/components/Page/AddPage";
import {getSelectChildTree, addSelectChildTree, editSelectChildTree, deleteSelectChildTree} from "@admin/actions/systemAction"
import _ from "lodash";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

interface Props extends IProps {

}

class MenuPermisser extends React.Component<Props> {

  state:any={
    addVisible: false,
    menus: "",
    addDetial: "",
    editVisible: false,
    editDetial: ""
  }

  componentDidMount(){
    this.initial()
  }

  handleData(arr:any[]){

    function recursion(arr:any[]){
      _.each(arr, (item,index)=>{
        item.title = item.menuName
        item.key = item.id
        item.children = item.childMenu
        if(item.childMenu && item.childMenu.length){
          recursion(item.childMenu)
        }
      })
    }
    recursion(arr)
    return arr;
  }

  initial(){
    this.props.actions.getSelectChildTree({params: {
      systemId: this.props.match.params.id
    }, next: (res:any)=>{
      this.setState({menus: res})
    }, refresh: true})
  }

  addSubmit(values: any){
    this.props.actions.addSelectChildTree({
      ...values,
      parentId: this.state.addDetial?this.state.addDetial.id:"",
      systemId: this.props.match.params.id
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.setState({addVisible: false})
      this.initial()
    })
  }
  editSubmit(values: any){
    this.props.actions.editSelectChildTree({
      ...values,
      id: this.state.editDetial.id,
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.setState({editVisible: false})
      this.initial()
    })
  }

  deleteSubmit(item:any){
    this.props.actions.deleteSelectChildTree({id: item.id}, ()=>{
      this.props.utils.OpenNotification("success")
      this.initial()
    })
  }

  render() {
    const {spinning, utils} = this.props
    const {addVisible, menus, addDetial, editVisible, editDetial} = this.state;
    
    return (
      <>
        <Card size="small" title="权限菜单" extra={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增</Button>} >
          {menus?<Tree
            defaultExpandAll
            blockNode
            treeData={this.handleData(menus)}
            titleRender={(item:any)=>{
              
              return (
                <div className="flexbetween">
                  <span>{item.title}({item.menuKey})</span>
                  <Space size={20}>
                    <PlusOutlined onClick={()=>this.setState({addVisible: true, addDetial: item})} />
                    <EditOutlined onClick={()=>this.setState({editVisible: true, editDetial: item})} />
                    <Popconfirm title="是否删除？" onConfirm={this.deleteSubmit.bind(this, item)}>
                      <DeleteOutlined />
                    </Popconfirm>
                    
                  </Space>
                </div>
              )
            }}
          />: <Skeleton active />}
        </Card>
        <AddPage
          title="新增菜单"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false, addDetial:""})}
          onOk={this.addSubmit.bind(this)}
          data={[
            {label: "权限名称", name: "menuName", type: Input, rules: true},
            {label: "权限key", name: "menuKey", type: Input, rules: true},
            {label: "权限URL", name: "menuUrl", type: Input},
            {label: "备注", name: "remark", type: Input},
          ]}
        />

        <AddPage
          title="编辑菜单"
          spinning={spinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false, editDetial:""})}
          onOk={this.editSubmit.bind(this)}
          initialValues={editDetial}
          data={[
            {label: "权限名称", name: "menuName", type: Input, rules: true},
            {label: "权限key", name: "menuKey", type: Input, rules: true},
            {label: "权限URL", name: "menuUrl", type: Input},
            {label: "备注", name: "remark", type: Input},
          ]}
        />
      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getSelectChildTree, addSelectChildTree, editSelectChildTree, deleteSelectChildTree}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    spinning: state.user.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(MenuPermisser)