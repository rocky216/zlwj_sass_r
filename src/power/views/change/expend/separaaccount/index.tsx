import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {getSeparaAccountLog, addSeparaAccountLog, cancelSeparaAccoun} from "@power/actions/changeAction"
import { Button, Col, Popconfirm, Row, Table, Tag } from "antd";
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import StatusElement from "@power/components/Element/StatusElement";
import { separaaccountColumns } from "../columns";
import AddModular from "@power/components/Modular/AddModular";
import Sparacou from "./sparacou"
import { Link } from "react-router-dom";
import { StatusColor } from "@public/common/powerMapper";


interface Props extends IProps {
  separac:any;
}

let params = {
  current: 1,
  companyHe: [],
  orderNo: "",
  orderName:"",
  rtime:[]
}

let resetParams = {
  current: 1,
  companyHe: [],
  orderNo: "",
  orderName:"",
  rtime:[]
}

class ExpendSeparaaccount extends React.Component<Props> {

  state = {
    addVisible: false,
    companyHe:[]
  }

  componentDidMount(){
    this.props.actions.getSeparaAccountLog(params)
  }

  getCol(){
    return [...separaaccountColumns,{
      title: "状态",
      dataIndex: "status",
      render:(item:any)=><Tag color={StatusColor[item]}>{item?"有效":"作废"}</Tag>
    }, {
      title: "操作",
      width: 120,
      render: (item:any)=>{
        return (
          <>
            <Link to={`/expend/separaaccount/${item.id}/detail`}>
              <Button size="small" type="link">详情</Button>
            </Link>
            {item.status?
            <Popconfirm title="是否作废？" onConfirm={()=>{
              this.props.actions.cancelSeparaAccoun({id: item.id},(res:any)=>{
                this.props.actions.getSeparaAccountLog(params,{refresh: true})
                this.props.utils.OpenNotification("success")
              })
            }}>
              <Button size="small" type="link">作废</Button>
            </Popconfirm>:null}
            
          </>
        )
      }
    }]
  }


  render() {
    const {spinning, utils, separac} = this.props
    const {addVisible, companyHe} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Row>
            <Col span={20}>
              <Table size="small" columns={this.getCol()} dataSource={separac?utils.addIndex(separac.list):[]}
              pagination={utils.Pagination(separac, page=>{
                params.current = page
                this.props.actions.getSeparaAccountLog(params)
              })} />
            </Col>
            <Col span={4}>
              <SearchModular
                before={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增</Button>}
                layout="vertical"
                initialValues={params}
                resetValues={resetParams}
                submitSearch={(values:any)=>{
                  if(!values){
                    params = resetParams
                  }else{
                    params = {...params, ...values}
                  }
                  this.props.actions.getSeparaAccountLog(params)
                }}
                data={[
                  {label:"单号", name:"orderNo", type: "input"},
                  {label:"标题", name:"orderName", type: "input"},
                  {label:"创建时间", name:"rtime", type: "rangepicker"},
                  {label:"公司项目", name:"companyHe", type: <CompanyHeElement/>},
                  {label:"状态", name:"status", type: <StatusElement/>},
                ]}
              />
            </Col>
          </Row>
        </div>

        <AddModular
          title="新增分账支出"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false, companyHe:[]})}
          onOk={(values:any)=>{
            console.log(values)
            this.props.actions.addSeparaAccountLog(values, ()=>{
              this.props.actions.getSeparaAccountLog(params, {refresh: true})
              this.props.utils.OpenNotification("success")
              this.setState({addVisible: false, companyHe:[]})
            })
          }}
          data={[
            {label:"分账标题", name: "orderName", type:"input", rules: true},
            {label:"公司项目", name: "companyHe", type:<CompanyHeElement onChange={(v)=>this.setState({companyHe:v})} />, rules: true},
            {label:"分账列表", name: "orderDescJson", type:<Sparacou companyHe={companyHe} />, rules: true},
            {label:"备注", name: "remark", type:"textarea"},
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getSeparaAccountLog, addSeparaAccountLog, cancelSeparaAccoun}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    separac: state.change.separac,
    utils: state.app.utils,
    spinning: state.change.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ExpendSeparaaccount)