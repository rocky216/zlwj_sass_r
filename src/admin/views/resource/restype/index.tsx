import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@admin/components/JCard"
import {getResTypeList, addResType, statusResType, editResType, deleteResType } from "@admin/actions/otherAction"
import { Button, Popconfirm, Select, Table } from "antd";
import {restypeColumns} from "../columns"
import AddModular from "@public/components/Modular/AddModular";
import SearchModular from "@public/components/Modular/SearchModular";
import StatusElement from "@public/components/Element/StatusElement";

const {Option} = Select

interface Props extends IProps {
  restype:any;
}


let params = {
  current: 1,
  linkName: "",
  linkCode: ""
}
let resetParams = {
  current: 1,
  linkName: "",
  linkCode: ""
}

class ResType extends React.Component<Props> {


  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", fileSuffixCollect:""}
  }

  componentDidMount(){
    this.props.actions.getResTypeList(params)
  }

  getCol(){
    return [...restypeColumns, {
      title: "状态",
      dataIndex: 'status',
      render:(item:any, rows:any)=><StatusElement size="small" notAll value={item} onChange={(v:any)=>{
        this.props.actions.statusResType({id: rows.id}, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getResTypeList(params, {obj:res, type: "edit"})
        })
      }} />
    },{
      title: "操作",
      render:(item:any)=>{
        return (
          <>
            <Button size="small" type="link" onClick={()=>this.setState({editVisible: true, detail: item})}>编辑</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.deleteResType({id: item.id}, ()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getResTypeList(params, {refresh: true})
              })
            }}>
              <Button size="small" type="link">删除</Button>
            </Popconfirm>
          </>
        )
      }
    }]
  }

  render() {
    const {spinning, utils, restype} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增</Button>}
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{
              if(!values){
                params = resetParams
              }else {
                params = {...params, ...values}
              }
              this.props.actions.getResTypeList(params)
            }}
            data={[
              {label: "资源类型名称", name: "linkName", type: "input"},
              {label: "资源类型key", name: "linkCode", type: "input"},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={restype?utils.addIndex(restype.list):[]} 
          pagination={utils.Pagination(restype, page=>{
            params.current = page
            this.props.actions.getResTypeList(params)
          })}/>
        </div>

        <AddModular
          title="新增资源类型"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.addResType({
              ...values,
              fileSuffixCollect: values.fileSuffixCollect.join()
            }, ()=>{
              utils.OpenNotification("success")
              this.props.actions.getResTypeList(params, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "资源类型", name: "resourceType", type: "select", selectList: [
              {label: "系统资源", id: "system"},
              {label: "公司资源", id: "company"},
              {label: "项目资源", id: "item"},
              {label: "用户资源", id: "user"},
              {label: "公共资源", id: "common"},
            ], rules: true},
            {label: "资源类型名称", name: "linkName", type: "input" , rules: true},
            {label: "资源类型编号", name: "linkCode", type: "input", rules: true},
            {label: "文件大小限制", name: "fileSize", type: "input", rules: true},
            {label: "文件类型", name: "fileType", type: "select", selectList: [
              {label: "图片", id: "P"},
              {label: "文档", id: "W"},
              {label: "文件", id: "Y"},
            ]},
            {label: "资源后缀", name: "fileSuffixCollect", type: (
              <Select mode="multiple">
                <Option value="jpg">jpg</Option>
                <Option value="png">png</Option>
                <Option value="xlsx">xlsx</Option>
                <Option value="xls">xls</Option>
                <Option value="doc">doc</Option>
                <Option value="docx">docx</Option>
              </Select>
            )},
            // {label: "是否压缩", name: "linkName", type: "input"},
          ]}
        />

        <AddModular
          title="编辑资源类型"
          spinning={spinning}
          visible={editVisible}
          initialValues={{...detail, fileSuffixCollect: detail.fileSuffixCollect.split(",")}}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values:any)=>{
            this.props.actions.editResType({
              ...values,
              id: detail.id,
              fileSuffixCollect: values.fileSuffixCollect.join()
            }, ()=>{
              utils.OpenNotification("success")
              this.props.actions.getResTypeList(params, {refresh: true})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "资源类型", name: "resourceType", type: "select", selectList: [
              {label: "系统资源", id: "system"},
              {label: "公司资源", id: "company"},
              {label: "项目资源", id: "item"},
              {label: "用户资源", id: "user"},
              {label: "公共资源", id: "common"},
            ], rules: true},
            {label: "资源类型名称", name: "linkName", type: "input" , rules: true},
            {label: "资源类型编号", name: "linkCode", type: "input", rules: true},
            {label: "文件大小限制", name: "fileSize", type: "input", rules: true},
            {label: "文件类型", name: "fileType", type: "select", selectList: [
              {label: "图片", id: "P"},
              {label: "文档", id: "W"},
              {label: "文件", id: "Y"},
            ]},
            {label: "资源后缀", name: "fileSuffixCollect", type: (
              <Select mode="multiple">
                <Option value="jpg">jpg</Option>
                <Option value="png">png</Option>
                <Option value="xlsx">xlsx</Option>
                <Option value="xls">xls</Option>
                <Option value="doc">doc</Option>
                <Option value="docx">docx</Option>
              </Select>
            )},
            // {label: "是否压缩", name: "linkName", type: "input"},
          ]}
        />
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getResTypeList, addResType, statusResType, editResType, deleteResType}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    restype: state.other.restype,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ResType)