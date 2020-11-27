import React from "react"
import {connect} from "react-redux"
import {getCompanyRole} from "@admin/actions/companyAction"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import { Card, Col, Row, Space, Tree, Skeleton} from "antd";
import _ from "lodash";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";


interface Props extends IProps{
  companyrole:any;
}

class CompanyRole extends React.Component<Props> {

  componentDidMount(){
    let params = {companyId: this.props.match.params.id}
    this.props.actions.getCompanyRole({params})
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

  titleRender({title, type}:any){
    return (
      <div className="flexbetween">
        <span>{title}</span>
        <Space size={20}>
          {type=="system"?<PlusOutlined  />:null}
          <DeleteOutlined />
        </Space>
      </div>
    )
    
  }

  handleSelect(){
    
  }

  render() {
    const {companyrole} = this.props

    return (
      <Row>
        <Col span={8}>
          <Card size="small">
          {companyrole?<Tree 
            blockNode
            defaultExpandAll
            titleRender={this.titleRender }
            treeData={this.handleData(companyrole)} 
            onSelect={this.handleSelect.bind(this)}
            />: <Skeleton active />}
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCompanyRole}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    appSpinning: state.app.spinning,
    companyrole: state.company.companyrole,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyRole)