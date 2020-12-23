import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@admin/components/JCard"
import { Button, Card, Col, Input, List, Row, Select, Skeleton, Tree } from "antd";
import {getSystemPackage, addSystemPackage, editSystemPackage, deleteSystemPackage, findPackageMenu,
  savePackageMenu } from "@admin/actions/systemAction"
import AddPage from "@admin/components/Page/AddPage";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DeleteElement } from "@admin/components/Element/Widget";
import MenuPermisser from "./menupermisser"
import _ from "lodash";
import SeeMenu from "./seemenu"

const {Option} = Select
const {TextArea} = Input

interface Props extends IProps {
  menutree:any;
}

class SystemPermisser extends React.Component<Props> {

  state:any = {
    packages: [],
    addPackageVisible: false,
    editPackageVisible: false,
    packageDetail: {},
    currentPackage: {},
    currentChecked: []
  }

  componentDidMount(){
    this.props.actions.getSystemPackage({systemId: this.props.match.params.id}, (res:any)=>{
      this.setState({packages: res})
    })
  }

  addPackageVisible(value:any){
    this.props.actions.addSystemPackage({...value, systemId: this.props.match.params.id}, ()=>{
      this.props.utils.OpenNotification("success")
      this.setState({addPackageVisible: false})
      this.props.actions.getSystemPackage({systemId: this.props.match.params.id}, (res:any)=>{
        this.setState({packages: res})
      })
    })
  }

  editPackageVisible(values:any){
    this.props.actions.editSystemPackage({
      ...values, 
      id: this.state.packageDetail.id
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.setState({editPackageVisible: false})
      this.props.actions.getSystemPackage({systemId: this.props.match.params.id}, (res:any)=>{
        this.setState({packages: res})
      })
    })
    
  }

  deleteSubmit(item:any, e:any){
    e.stopPropagation();
    this.props.actions.deleteSystemPackage({id: item.id}, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getSystemPackage({systemId: this.props.match.params.id}, (res:any)=>{
        this.setState({packages: res})
      })
    })
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

  render() {
    const {spinning, menutree, match} = this.props
    const {packages, addPackageVisible, editPackageVisible, packageDetail, currentPackage, currentChecked} = this.state
    
    return (
      <JCard spinning={spinning}>
        <Row gutter={10}  key="a">
          <Col span={6}>
            <SeeMenu/>
          </Col>
          <Col span={6}>
            <MenuPermisser {...this.props}/>
          </Col>
          <Col span={6} >
            <Card size="small" title="新增权限包" extra={<Button type="primary" 
              onClick={()=>this.setState({addPackageVisible: true})} >新增权限包</Button>} >
              <List 
                dataSource={packages}
                bordered
                renderItem={(item:any)=>(
                  <List.Item 
                  style={{cursor: "pointer", padding: 8}}
                  onClick={()=>{
                    this.setState({currentPackage: item})
                    this.props.actions.findPackageMenu({packageId: item.id}, (res:any)=>{
                      this.setState({currentChecked:res})
                    })
                  }}
                  actions={[<EditOutlined 
                      onClick={(e)=>{
                        e.stopPropagation();
                        this.setState({editPackageVisible: true, packageDetail: item})
                      }} />, 
                      <DeleteElement
                        onConfirm={this.deleteSubmit.bind(this, item)}
                        onCancel={(e)=>e.stopPropagation()}
                      >
                        <DeleteOutlined onClick={e=>e.stopPropagation()} />
                      </DeleteElement>
                    ]}
                  >{item.packageName}</List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={6} >
            <Card size="small" title={currentPackage.packageName} 
            extra={<Button disabled={currentPackage.packageName?false:true} type="primary" onClick={()=>{
              this.props.actions.savePackageMenu({
                packageId: currentPackage.id,
                menus: currentChecked.join(),
                systemId: match.params.id
              })
            }}>保存</Button>} >
            {menutree?
            <Tree
              defaultExpandAll
              checkStrictly
              checkedKeys={currentChecked}
              checkable
              blockNode
              treeData={this.handleData(menutree)}
              onCheck={({checked}:any)=>{
                this.setState({currentChecked:checked})
              }}
            />: <Skeleton active />}
            </Card>
          </Col>
        </Row>
        <AddPage 
          title="新增权限包"
          spinning={spinning}
          visible={addPackageVisible}
          onCancel={()=>this.setState({addPackageVisible: false})}
          onOk={this.addPackageVisible.bind(this)}
          data={[
            {label: "权限包名称", name: "packageName", type: Input},
            {label: "默认", name: "isDefault", type: (
              <Select>
                <Option value="Y">是</Option>
                <Option value="N">否</Option>
              </Select>
            )},
            {label: "备注", name: "remark", type: TextArea},
          ]}
        />
        <AddPage 
          title="编辑权限包"
          spinning={spinning}
          visible={editPackageVisible}
          onCancel={()=>this.setState({editPackageVisible: false})}
          onOk={this.editPackageVisible.bind(this)}
          initialValues={packageDetail}
          data={[
            {label: "权限包名称", name: "packageName", type: Input},
            {label: "默认", name: "isDefault", type: (
              <Select>
                <Option value="Y">是</Option>
                <Option value="N">否</Option>
              </Select>
            )},
            {label: "备注", name: "remark", type: TextArea},
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getSystemPackage, addSystemPackage, editSystemPackage, deleteSystemPackage, findPackageMenu,
      savePackageMenu}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    menutree: state.system.menutree,
    utils: state.app.utils,
    spinning: state.system.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(SystemPermisser)