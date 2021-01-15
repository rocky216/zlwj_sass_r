import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Checkbox, Table } from "antd";
import { elecfenceColumns } from "../columns";
import {getElecfence, changeElecfence, relieveElecfence } from "@plate/actions/otherAction"
import SearchModular from "@public/components/Modular/SearchModular";
import StatusElement from "@public/components/Element/StatusElement";
import AddModular from "@public/components/Modular/AddModular";



interface Props extends IProps {
  elecfence:any;
}

let params = {
  current: 1,
  openState:true,
  status:"",
  license:""
}
let resetParams = {
  current: 1,
  openState:true,
  status:"",
  license:""
}

class Elecfence extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", license: ""}
  }

  componentDidMount(){
    this.props.actions.getElecfence(params)
  }

  getCol(){
    return [...elecfenceColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement size="small" notAll value={item} onChange={()=>{
        this.props.actions.changeElecfence({
          objective: "enable",
          id: rows.id
        }, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getElecfence(params, {obj: res, type: "edit"})
        })
      }} />
    },{
      title: "操作",
      render: (item:any)=>{
        return (
          <Button type="link" size="small" onClick={()=>this.setState({editVisible: true, detail: item})} >解除限制</Button>
        )
      }
    }]
  }

  render() {
    const {spinning, utils, elecfence} = this.props
    const {addVisible, editVisible, detail} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            before={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增</Button>}
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{
              params = values?{...params, ...values}:resetParams
              this.props.actions.getElecfence(params)
            }}
            data={[
              {name: "openState", type: <Checkbox>只看限制中的</Checkbox>, valuePropName:"checked"},
              {label: "车牌号码", name: "license", type: "input"},
              {label: "状态", name: "status", type: <StatusElement/>},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={this.getCol()} dataSource={elecfence?utils.addIndex(elecfence.list):[]} 
          pagination={utils.Pagination(elecfence, page=>{
            params.current = page;
            this.props.actions.getElecfence(params)
          })} />
        </div>

        <AddModular
          title="创建电子围栏"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeElecfence({
              ...values,
              objective: "add"
            }, ()=>{
              utils.OpenNotification("success")
              this.props.actions.getElecfence(params, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {label: "车牌号码", name: "license", type: "input", rules: true},
            {label: "开启说明", name: "openRemark", type: "textarea", rules: true},
          ]}
        />

        <AddModular
          title="解除电子围栏"
          spinning={spinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          onOk={(values)=>{
            this.props.actions.relieveElecfence({
              ...values,
              id: detail.id
            }, ()=>{
              utils.OpenNotification("success")
              this.props.actions.getElecfence(params, {refresh: true})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "车牌号码", name: "license", type: "input", rules: true, initialValue: detail.license, disabled: true},
            {label: "解除说明", name: "closeRemark", type: "textarea", rules: true},
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getElecfence, changeElecfence, relieveElecfence }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    elecfence: state.other.elecfence,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Elecfence)