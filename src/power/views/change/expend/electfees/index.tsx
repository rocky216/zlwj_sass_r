import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Col, Popconfirm, Row, Table, Tag } from "antd";
import { electfeesColumns } from "../columns";
import {getElectfees, addElectfees, cancelElectfees } from "@power/actions/changeAction"
import SearchModular from "@power/components/Modular/SearchModular";
import CompanyHeElement from "@power/components/Element/CompanyHeElement";
import StatusElement from "@power/components/Element/StatusElement";
import AddModular from "@power/components/Modular/AddModular";
import CWatt from "./cwatt";
import { Link } from "react-router-dom";
import { StatusColor } from "@public/common/powerMapper";



interface Props extends IProps {
  electfee:any;
}

let params = {
  current: 1,
  companyHe: [],
  rtime: [],
  orderNo: "",
  orderName: "",
  status:""
}
let resetParams = {
  current: 1,
  companyHe: [],
  rtime: [],
  orderNo: "",
  orderName: "",
  status:""
}

class ExpendElectfees extends React.Component<Props> {

  state = {
    addVisible: false,
    companyHe: []
  }

  componentDidMount(){
    this.props.actions.getElectfees(params)
  }

  getCol(){
    return [...electfeesColumns,{
      title: "状态",
      dataIndex: "status",
      render:(item:any)=><Tag color={StatusColor[item]}>{item?"有效":"作废"}</Tag>
    }, {
      title: "操作",
      width: 120,
      render: (item:any)=>{
        return (
          <>
            <Link to={`/expend/electfees/${item.orderNo}/detail`}>
              <Button size="small" type="link">详情</Button>
            </Link>
            {item.status?
            <Popconfirm title="是否作废？" onConfirm={()=>{
              this.props.actions.cancelElectfees({order: item.orderNo})
            }}>
              <Button size="small" type="link">作废</Button>
            </Popconfirm>:null}
            
          </>
        )
      }
    }]
  }

  render() {
    const {spinning, utils, electfee} = this.props
    const {addVisible, companyHe} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Row>
            <Col span={20}>
              <Table size="small" columns={this.getCol()} dataSource={electfee?utils.addIndex(electfee.list):[]}
                pagination={utils.Pagination(electfee, page=>{
                  params.current = page;
                  this.props.actions.getElectfees(params)
                })} />
            </Col>
            <Col span={4}>
              <SearchModular
                layout="vertical"
                before={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增</Button>}
                initialValues={params}
                resetValues={resetParams}
                submitSearch={(values:any)=>{
                  if(!values){
                    params = resetParams
                  }else{
                    params = {...params, ...values}
                  }
                  this.props.actions.getElectfees(params)
                }}
                data={[
                  {label: "订单号", name: "orderNo", type: "input"},
                  {label: "标题", name: "orderName", type: "input"},
                  {label: "时间", name: "rtime", type: "rangepicker"},
                  {label: "公司/项目", name: "companyHe", type: <CompanyHeElement  />},
                  {label: "状态", name: "status", type: <StatusElement/>},
                ]}
              />
            </Col>
          </Row>
        </div>

        <AddModular
          title="新增电费支出"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false, companyHe:[]})}
          onOk={(values:any)=>{
            console.log(values)
            this.props.actions.addElectfees(values, ()=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getElectfees(params,{refresh: true})
              this.setState({addVisible: false, companyHe:[]})
            })
          }}
          data={[
            {label: "支出标题", name: "orderName", type: "input", rules: true},
            {label: "公司/项目", name: "companyHe", type: <CompanyHeElement onChange={(v)=>{
              this.setState({companyHe:v})
            }} />, rules: true},
            {label: "电表", name: "meterDtoList", type: <CWatt companyHe={companyHe} />, rules: true},
            {label: "电费总支出", name: "electricSum", type: "inputNumber", rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
          
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getElectfees, addElectfees, cancelElectfees}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    electfee: state.change.electfee,
    utils: state.app.utils,
    spinning: state.change.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ExpendElectfees)