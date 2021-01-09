import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@admin/components/JCard"
import {getLogoLink, addLogoLink, editLogoLink, statusLogoLink, deleteLogoLink} from "@admin/actions/otherAction"
import { Button, Popconfirm, Table } from "antd";
import {logoLinkColumns} from "../columns"
import SearchModular from "@public/components/Modular/SearchModular";
import AddModular from "@public/components/Modular/AddModular";
import UploadElement from "@public/components/Element/UploadElement";
import StatusElement from "@public/components/Element/StatusElement";

interface Props extends IProps {
  logolink:any;
}

let params = {
  current: 1,
  logoName: ""
}
let resetParams = {
  current: 1,
  logoName: ""
}


class Watermark extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", logoRealPath: ""}
  }

  componentDidMount(){
    this.props.actions.getLogoLink(params)
  }

  getCol(){
    return [...logoLinkColumns, {
      title: "操作",
      render:(item:any)=>{
        return (
          <>
            <Button size="small" type="link" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.deleteLogoLink({id: item.id}, ()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getLogoLink(params, {refresh: true})
              })
            }}>
              <Button size="small" type="link" >删除</Button>
            </Popconfirm>
          </>
        )
      }
    }]
  }

  render() {
    const {spinning, utils, logolink} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增</Button>}
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{
              params = !values?resetParams:{...params, ...values}
              this.props.actions.getLogoLink(params)
            }}
            data={[
              {label: "LOGO名称", name: "logoName", type: "input"}
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={logolink?utils.addIndex(logolink.list):[]} 
          pagination={utils.Pagination(logolink, page=>{
            params.current = page
            this.props.actions.getLogoLink(params)
          })} />
        </div>

        <AddModular
          title="新增水印LOGO"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.addLogoLink({
              ...values, 
              logoRealPath: utils.submitFiles(values.logoRealPath)
            }, ()=>{
              this.props.actions.getLogoLink(params, {refresh: true})
              this.setState({addVisible: false})
              utils.OpenNotification("success")
            })
          }}
          data={[
            {label: "LOGO名称", name: "logoName", type: "input", rules: true},
            {label: "上传文件", name: "logoRealPath", type: <UploadElement data={{fileType: "logo"}} />, rules: true},
            {label: "LOGO UR", name: "logoUrl", type: "input", rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑水印LOGO"
          spinning={spinning}
          visible={editVisible}
          initialValues={{...detail, logoRealPath: utils.echoFiles(detail.logoRealPath)}}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.editLogoLink({
              ...values, 
              logoRealPath: utils.submitFiles(values.logoRealPath),
              id: detail.id
            }, (res:any)=>{
              this.props.actions.getLogoLink(params, {obj: res, type: "edit"})
              this.setState({editVisible: false})
              utils.OpenNotification("success")
            })
          }}
          data={[
            {label: "LOGO名称", name: "logoName", type: "input", rules: true},
            {label: "上传文件", name: "logoRealPath", type: <UploadElement data={{fileType: "logo"}} />, rules: true},
            {label: "LOGO UR", name: "logoUrl", type: "input", rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getLogoLink, addLogoLink, editLogoLink, statusLogoLink, deleteLogoLink}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    logolink: state.other.logolink,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Watermark)