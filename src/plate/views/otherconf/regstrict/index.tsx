import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Input, Popconfirm, Table } from "antd";
import { regstrictColumns } from "../columns";
import SearchModular from "@public/components/Modular/SearchModular";
import StatusElement from "@public/components/Element/StatusElement";
import { getRegstrict, changeRegstrict } from "@plate/actions/otherAction";
import AddModular from "@public/components/Modular/AddModular";



interface Props extends IProps {
  regstrict:any;
}

let params = {
  current: 1,
  licensePrefix: "",
  status: ""
}
let resetParams = {
  current: 1,
  licensePrefix: "",
  status: ""
}

class Regstrict extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: ""}
  }

  componentDidMount(){
    this.props.actions.getRegstrict(params)
  }

  getCol(){
    return [...regstrictColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement size="small" notAll value={item} onChange={()=>{
        this.props.actions.changeRegstrict({
          objective: "enable",
          id: rows.id
        }, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getRegstrict(params, {obj: res, type: "edit"})
        })
      }} />
    },{
      title: "操作",
      render: (item:any)=>{
        return (
          <>
            <Button type="link" size="small" onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.changeRegstrict({
                objective: "delete",
                id: item.id
              }, (res:any)=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getRegstrict(params, {refresh: true})
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
    const {spinning, utils, regstrict} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})}>新增</Button>}
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{
              params = values?{...params, ...values}: resetParams
              this.props.actions.getRegstrict(params)
            }}
            data={[
              {label: "车牌前缀", name: "licensePrefix", type: "input"},
              {label: "状态", name: "status", type: <StatusElement/>},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={regstrict?utils.addIndex(regstrict.list):[]}
          pagination={utils.Pagination(regstrict, page=>{
            params.current = page;
            this.props.actions.getRegstrict(params)
          })} />
        </div>

        <AddModular
          title="新增区域限制通行"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeRegstrict({
              ...values,
              objective: "add",
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getRegstrict(params, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "车牌前缀", name: "licensePrefix", type: <Input placeholder="例如：赣D" />, rules: true},
            {label: "限制说明", name: "forbidReason", type: "textarea", rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑区域限制通行"
          spinning={spinning}
          visible={editVisible}
          initialValues={detail}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeRegstrict({
              ...values,
              objective: "update",
              id: detail.id
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getRegstrict(params, {obj: res, type: "edit"})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "车牌前缀", name: "licensePrefix", type: <Input placeholder="例如：赣D" />, rules: true},
            {label: "限制说明", name: "forbidReason", type: "textarea", rules: true},
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
    actions: bindActionCreators({getRegstrict, changeRegstrict}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    regstrict: state.other.regstrict,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Regstrict)
