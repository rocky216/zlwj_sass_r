import React from "react"
import {connect} from "react-redux"
import JCard from "@admin/components/JCard"
import {IProps} from "@public/common/interface"
import {getSystems, addSystem, editSystem} from "@admin/actions/systemAction"
import { bindActionCreators } from "redux"
import { Button, Card, Input, Select, Table } from "antd"
import {systemColumns} from "./columns"
import AddPage from "@admin/components/Page/AddPage"
import UploadElement from "@admin/components/Element/UploadElement"
import _ from "lodash"
import { Link } from "react-router-dom"

const {TextArea} = Input
const {Option} = Select

interface Props extends IProps{
  systems: any;
}

let params={
  current:1
}

class SystemPage extends React.Component<Props> {
  state = {
    addVisible: false,
    editVisible: false,
    detail: {
      temIcon: "",
      id: ""
    }
  }

  componentDidMount(){
    this.props.actions.getSystems({params})
  }

  getCol(){
    let _this = this
    return [...systemColumns, {
      title: "操作",
      width: 150,
      render(item:any) {
        return (
          <>
            <Button type="link" onClick={()=>_this.setState({detail: item, editVisible: true})}>编辑</Button>
            <Link to={`/company/${item.id}/permisser`} >
              <Button type="link">权限包</Button>
            </Link>
          </>
        );
      }
    }]
  }

  addSubmit(values:any){
    this.props.actions.addSystem({
      ...values,
      temIcon: this.props.utils.submitFiles(values.temIcon)
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getSystems({params, refresh: true})
      this.setState({addVisible: false})
    })
  }
  editSubmit(values:any){
    this.props.actions.editSystem({
      ...values,
      id: this.state.detail.id,
      temIcon: this.props.utils.submitFiles(values.temIcon)
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getSystems({params, refresh: true})
      this.setState({editVisible: false})
    })
  }

  render() {
    const {spinning, utils, systems} = this.props
    const {addVisible, editVisible, detail} = this.state;
    

    return (
      <JCard spinning={spinning}>
        <div key="a">
          <Card size="small" title={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增</Button>}>
            <Table size="small" columns={this.getCol()} dataSource={systems?utils.addIndex(systems.list):[]} 
            pagination={utils.Pagination(systems, page=>{
              params.current = page
              this.props.actions.getSystems({params, refresh: true})
            })}/>
          </Card>
        </div>


        <AddPage
          title="新增系统"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={this.addSubmit.bind(this)}
          data={[
            {label: "系统代号", name: "temCode", type: Input, rules: true},
            {label: "系统名称", name: "temName", type: Input, rules: true},
            {label: "访问URL", name: "temUrl", type: Input, rules: true},
            {label: "系统级别", name: "temType", type: (
              <Select>
                <Option value="GS">公司级别</Option>
                <Option value="XM">项目级别</Option>
              </Select>
            ), rules: true},
            {label: "图标", name: "temIcon", type: <UploadElement/>, initialValue: []},
            {label: "备注", name: "remark", type: TextArea},
          ]}
        />
        
        <AddPage
          title="编辑系统"
          spinning={spinning}
          visible={editVisible && _.size(detail)>1}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={this.editSubmit.bind(this)}
          initialValues={{...detail, temIcon: utils.echoFiles(detail.temIcon)}}
          data={[
            {label: "系统代号", name: "temCode", type: Input, rules: true},
            {label: "系统名称", name: "temName", type: Input, rules: true},
            {label: "访问URL", name: "temUrl", type: Input, rules: true},
            {label: "系统级别", name: "temType", type: (
              <Select>
                <Option value="GS">公司级别</Option>
                <Option value="XM">项目级别</Option>
              </Select>
            ), rules: true},
            {label: "图标", name: "temIcon", type: <UploadElement/>, },
            {label: "备注", name: "remark", type: TextArea},
          ]}
        />
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getSystems, addSystem, editSystem}, dispatch)
  }
} 

const mapStateProps = (state:any)=>{
  return {
    systems: state.system.systems,
    spinning: state.system.spinning,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(SystemPage)