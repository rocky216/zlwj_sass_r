
import React from "react"
import {connect} from "react-redux"
import { Button, Card, Input, InputNumber, Table } from "antd";
import {companyProjectColumns} from "../columns"
import {getCompanyProject, addCompanyProject, editCompanyProject} from "@admin/actions/companyAction"
import { bindActionCreators } from "redux";
import { IProps } from "@public/common/interface";
import AddPage from "@admin/components/Page/AddPage"
import Region from "@admin/components/Element/Region"
import _ from "lodash";

const {TextArea} = Input

interface Props extends IProps {
  companyproject: any;
  appSpinning: boolean;
}


class CompanyProject extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {
      id: "",
      itemAddress: ""
    }
  }

  componentDidMount(){
    this.props.actions.getCompanyProject({params: {companyId: this.props.match.params.id}})
  }

  addOk(values:any){
    this.props.actions.addCompanyProject({
      ...values,
      companyId: this.props.match.params.id,
      itemAddress: values.itemAddress.join()
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getCompanyProject({
        params: {companyId: this.props.match.params.id},
        refresh: true
      })
      this.setState({addVisible: false})
    })
  }

  editOk(values:any){
    console.log(values)
    this.props.actions.editCompanyProject({
      ...values,
      id: this.state.detail.id,
      companyId: this.props.match.params.id,
      itemAddress: values.itemAddress.join()
    }, ()=>{
      this.props.utils.OpenNotification("success")
      this.props.actions.getCompanyProject({
        params: {companyId: this.props.match.params.id},
        refresh: true
      })
      this.setState({editVisible: false})
    })
  }

  getCol(){
    let _this = this;
    return [...companyProjectColumns, {
      title: "操作",
      render(item:any) {
        return <Button type="link" size="small" onClick={()=>_this.setState({editVisible: true, detail: item})}>编辑</Button>
      }
    }]
  }

  render() {
    const {spinning, utils, companyproject, appSpinning, match} = this.props
    const {addVisible, detail, editVisible} = this.state;
    console.log(detail)
    return (
      <>
        <AddPage
          title="新增公司项目"
          spinning={appSpinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={this.addOk.bind(this)}
          data={[
            {label: "项目名称", name: "name", type: Input},
            {label: "项目简称	", name: "nickname", type: Input},
            {label: "项目编号	", name: "code", type: Input},
            {label: "省/市/区", name: "itemAddress", type: <Region/>, initialValue: []},
            {label: "具体地址", name: "addressDetail", type: TextArea},
            {label: "经度", name: "longitude", type: InputNumber},
            {label: "纬度", name: "latitude", type: InputNumber},
          ]}
        />
        <AddPage
          title="编辑公司项目"
          spinning={appSpinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={this.editOk.bind(this)}
          initialValues={_.size(detail)>1?
            {...detail, itemAddress: detail.itemAddress?detail.itemAddress.split(","):[]}:null}
          data={[
            {label: "项目名称", name: "name", type: Input},
            {label: "项目简称	", name: "nickname", type: Input},
            {label: "项目编号	", name: "code", type: Input},
            {label: "省/市/区", name: "itemAddress", type: <Region/>},
            {label: "具体地址", name: "addressDetail", type: TextArea},
            {label: "经度", name: "longitude", type: InputNumber},
            {label: "纬度", name: "latitude", type: InputNumber},
          ]}
        />
        <Card size="small" title={<Button ghost type="primary" onClick={()=>this.setState({addVisible: true})} >新增项目</Button>} >
          <Table size="small" columns={this.getCol()} 
            dataSource={companyproject?utils.addIndex(companyproject.list):[]} 
            pagination={utils.Pagination(companyproject, (page)=>{
              this.props.actions.getCompanyProject({params: {
                companyId: match.params.id,
                current: page,
              }, refresh: true})
            })} />
        </Card>
      </>
    );
  }
}


const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCompanyProject, addCompanyProject, editCompanyProject}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    appSpinning: state.app.spinning,
    companyproject: state.company.companyproject,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyProject)