import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Col, Popconfirm, Row, Table } from "antd";
import {getCardList, getCreateCardUserName, addPowerCard, editPowerCard, deleCardUser, RechargeCardUser} from "@power/actions/cardAction"
import SearchModular from "@power/components/Modular/SearchModular";
import StatusElement from "@power/components/Element/StatusElement";
import {cardsColumns } from "./columns"
import AddModular from "@power/components/Modular/AddModular";
import CardList from "./cardlist";
import { Link } from "react-router-dom";
import { Status } from "@public/common/powerMapper";



interface Props extends IProps {
  cards:any;
}

let params = {
  current: 1,
  cardNo: "",
  icNumber: "",
  idNumber: "",
  state: "",
  status: "",
  remark: "",
}

let resetParams = {
  current: 1,
  cardNo: "",
  icNumber: "",
  idNumber: "",
  state: "",
  status: "",
  remark: "",
}

class PowerCard extends React.Component<Props> {

  state = {
    addVisible: false,
    editVisible: false,
    detail: {id: "", cardNo:"", status: 0},
    rechVisible: false,
  }

  componentDidMount(){
    this.props.actions.getCardList(params)
  }

  getCol(){
    return [...cardsColumns(this), {
      title: "操作",
      width: 180,
      render:(item:any)=>{
        return (
          <>
            <Button size="small" type="link" 
            onClick={()=>this.setState({editVisible: true, detail: item})} >编辑</Button>

            <Button size="small" type="link" 
            onClick={()=>this.setState({rechVisible: true, detail: item})} >充值</Button>

            <Link to={`/card/${item.cardNo}/detail`}>
              <Button size="small" type="link" >卡详情</Button>
            </Link>
            
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.deleCardUser({id: item.id}, ()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getCardList(params, {refresh: true})
              })
            }}>
              <Button size="small" type="link" >删除</Button>
            </Popconfirm>
          </>
        )
      }
    }]
  }

  getBuildUserName(item:any){
    this.props.actions.getCreateCardUserName({id: item.id}, (res:any)=>{
      this.props.actions.getCardList(params, {obj:res, type: "edit"})
    })
  }

  render() {
    const {spinning, utils, cards} = this.props
    const {addVisible, editVisible, detail, rechVisible} = this.state

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <Row>
            <Col span={20}>
              <Table size="small" columns={this.getCol()} dataSource={cards?utils.addIndex(cards.list):[]} 
              pagination={utils.Pagination(cards, page=>{
                params.current = page
                this.props.actions.getCardList(params)
              })} />
            </Col>
            <Col span={4}>
              <SearchModular
                before={<Button type="primary" onClick={()=>this.setState({addVisible: true})} >新增充电卡</Button>}
                layout="vertical"
                initialValues={params}
                resetValues={resetParams}
                submitSearch={(values:any)=>{
                  if(!values){
                    params = resetParams
                  }else{
                    params = {...params, ...values}
                  }
                  this.props.actions.getCardList(params)
                }}
                data={[
                  {label: "系统卡号", name: "cardNo", type: "input"},
                  {label: "IC卡号", name: "icNumber", type: "input"},
                  {label: "ID卡号", name: "idNumber", type: "input"},
                  {label: "激活状态", name: "state", type: "select", selectList: [
                    {label: "全部", id: ""},
                    {label: "已激活", id: 1},
                    {label: "未激活", id: 0},
                  ]},
                  {label: "状态", name: "status", type: <StatusElement/>},
                  {label: "备注", name: "remark", type: "textarea"}
                ]}
              />
            </Col>
          </Row>
        </div>

        <AddModular
          title="新增充电卡"
          spinning={spinning}
          visible={addVisible}
          onCancel={()=>this.setState({addVisible: false})}
          onOk={(values:any)=>{
            console.log(values)
            this.props.actions.addPowerCard(values, ()=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getCardList(params, {refresh: true})
              this.setState({addVisible: false})
            })
          }}
          data={[
            {name: "cardList", type: <CardList/>, wrapperCol: {span: 20, offset: 2} },
            {label: "激活状态", name: "key", type: <span>待激活</span>},
            {label: "充电卡余额", name: "key", type: <span>0.00</span>},
            {label: "状态", name: "status", type: <StatusElement notAll/>, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="编辑充电卡"
          spinning={spinning}
          visible={editVisible}
          onCancel={()=>this.setState({editVisible: false})}
          initialValues={detail}
          onOk={(values:any)=>{
            
            this.props.actions.editPowerCard({
              ...values,
              id: detail.id
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getCardList(params, {obj: res, type: "edit"})
              this.setState({editVisible: false})
            })
          }}
          data={[
            {label: "卡名称", name: "cardName", type: "input"},
            {label: "卡编号", name: "cardNo", type: "input"},
            {label: "ic卡号", name: "icNumber", type: "input"},
            {label: "id卡号", name: "idNumber", type: "input"},
            {label: "状态", name: "status", type: <StatusElement notAll/>, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="充值卡"
          spinning={spinning}
          visible={rechVisible}
          onCancel={()=>this.setState({rechVisible: false})}
          initialValues={detail}
          onOk={(values:any)=>{
            
            this.props.actions.RechargeCardUser({
              ...values,
              id: detail.id
            }, (res:any)=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getCardList(params, {obj: res, type: "edit"})
              this.setState({rechVisible: false})
            })
          }}
          data={[
            {label: "卡编号", name: "cardNo", type: <span>{detail.cardNo}</span>},
            {label: "状态", name: "status", type: <span>{Status[detail.status]}</span>},
            {label: "充值金额", name: "money", type: "inputNumber"},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCardList, getCreateCardUserName, addPowerCard, editPowerCard, deleCardUser, RechargeCardUser}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    cards: state.card.cards,
    utils: state.app.utils,
    spinning: state.card.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(PowerCard)