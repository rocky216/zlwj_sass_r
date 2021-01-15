import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Link, useLocation} from "react-router-dom";
import { Button, Col, Descriptions, Row, Table, Typography } from "antd";
import { accecodeColumns } from "./columns";
import SearchModular from "@public/components/Modular/SearchModular";
import StatusElement from "@public/components/Element/StatusElement";
import AuthUserElement from "@plate/components/Element/AuthUserElement";
import {getAccessCode, changeAccessCode } from "@plate/actions/otherAction"
import CreateCode from "./createcode";


const {Text, Title } = Typography

interface Props extends IProps {
  accesscode:any;
}

let params = {
  current: 1,
  rtime:[],
  passLicense: "",
  activeCode: "",
  state: "",
  authId:"",
  status:""
}

let resetParams = {
  current: 1,
  rtime:[],
  passLicense: "",
  activeCode: "",
  state: "",
  authId:"",
  status:""
}

class Accecode extends React.Component<Props> {

  state = {
    addVisible: false,
    
  }

  componentDidMount(){
    this.props.actions.getAccessCode(params)
  }

  render() {
    const {spinning, utils, history, accesscode} = this.props
    const {addVisible} = this.state
    
    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Row>
            <Col span={20}>
              {accesscode?<div style={{display: "flex", justifyContent: "space-between", background: "#fff", padding: "10px 0 0 10px"}}>
                <Descriptions column={6} >
                  <Descriptions.Item label="当前有效通行码"><Text strong type="success">{accesscode.map.effectiveCount}</Text></Descriptions.Item>
                  <Descriptions.Item label="合计抵扣金额"><Text strong type="danger">{accesscode.map.money}</Text>元</Descriptions.Item>
                </Descriptions>
              </div>:null}
              <Table size="small" columns={accecodeColumns} dataSource={accesscode?utils.addIndex(accesscode.list):[]} 
              pagination={utils.Pagination(accesscode, page=>{
                params.current = page
                this.props.actions.getAccessCode(params)
              })} />
            </Col>
            <Col span={4}>
              <SearchModular
                before={accesscode && accesscode.map.isSave==1?<Button type="primary" 
                  onClick={()=>this.setState({addVisible: true})} >生成通行码</Button>:null}
                layout="vertical"
                initialValues={params}
                resetValues={resetParams}
                submitSearch={(values:any)=>{
                  params = values?{...params,...values}:resetParams;
                  this.props.actions.getAccessCode(params)
                }}
                data={[
                  {label: "通行码日期", name: "rtime", type: "rangepicker"},
                  {label: "车牌号码", name: "passLicense", type: "input"},
                  {label: "通行码", name: "activeCode", type: "input"},
                  {label: "通行码状态", name: "state", type: "select", selectList: [
                    {label: "全部", id: ""},
                    {label: "未生效", id: 1},
                    {label: "已生效", id: 2},
                  ]},
                  {label: "创建人", name: "authId", type: <AuthUserElement/>},
                  {label: "状态", name: "status", type: <StatusElement/>},
                  {label: "停车场", name: "rtime", type: "rangepicker"},
                ]}
              />
            </Col>
          </Row>
        </div>

        <CreateCode
          title="生成通行码"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={()=>{
            utils.OpenNotification("success")
            this.props.actions.getAccessCode(params, {refresh: true})
            this.setState({addVisible: false})
          }}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getAccessCode, changeAccessCode }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    accesscode: state.other.accesscode,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Accecode)