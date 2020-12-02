import React from "react"
import { connect } from "react-redux";
import { Button, Card, Col, List, Row, Space, Tree, Typography } from "antd"
import { bindActionCreators } from "redux";
import {getSelectUserCompany, getSelectRoleMenus} from "@admin/actions/userAction"
import {IProps} from "@public/common/interface"
import _ from "lodash";
import "./index.less"
import MenuTree from "@admin/components/Page/MenuTree";


interface Props extends IProps {
  usercompany: any;
}


class UserAuth extends React.Component<Props> {
  state={
    currentCompany: {
      id: "",
      addAuthVisible: false,
      meuns:[]
    },
    meuns: [],
    systemId: ""
  }

  componentDidMount(){
    this.props.actions.getSelectUserCompany({params: {temId: this.props.match.params.temId}})
  }
  handleData(arr:any[]){
    let newArr:any[]=[]
    if(!arr){
      return newArr
    }

    function recursion(arr:any[]){
      _.each(arr, (item,index)=>{
        item.key = item.singleStr
        item.title = item.name
        item.children = item.userAuthVoList
        if(item.type==="item"){
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

  handleSelect([key]:any){
    if(!key)return;
    var arr = key.split("-")

    this.setState({systemId: arr[1]})

    this.props.actions.getSelectRoleMenus({
      companyId: arr[0],
      systemId: arr[1],
      roleId: arr[2],
    }, (res:any)=>{
      this.setState({meuns: res})
    })
  }

  titleRender({title, type}:any){
    switch(type){
      case "system":
        return <div className="flexbetween">{title}  <Typography.Text mark>项目</Typography.Text></div>
      case "item":
        return <div className="flexbetween">{title}  <Typography.Text  type="danger">项目权限</Typography.Text></div>
        case "role":
        return <div className="flexbetween">{title}  <Typography.Text type="success">角色权限</Typography.Text></div>
      default:
        return <div>{title}</div>
    }
    
  }


  render() {
    const {usercompany} = this.props
    const {currentCompany, meuns, systemId} = this.state
    
    return (
      <>
        <Row gutter={1}>
          <Col span={8}>
            <Card title="公司" size="small">
              <Tree 
                blockNode
                
                titleRender={this.titleRender }
                treeData={this.handleData(usercompany)} 
                onSelect={this.handleSelect.bind(this)}/>
            </Card>
          </Col>
          <Col span={8}>
            
            <Card title="角色" size="small"  >
              <MenuTree 
                systemId={systemId}
                disabled
                checkable
                checkedKeys={meuns}
              />
            </Card>
          </Col>
        </Row>

      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getSelectUserCompany, getSelectRoleMenus}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    usercompany: state.user.usercompany,
  }
}

export default connect(mapStateProps, mapDispatchProps)(UserAuth)