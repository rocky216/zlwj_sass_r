import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import {getForeignCarFee, addOrUpForeignFee, getVisitorCarFee, addVisitorCarFee, getCustomCarFee,
  changeCustomCarFee, deleteCustomCarFee, statusCustomCarFee } from "@plate/actions/parkAction"
import { Button, Card, Col, Descriptions, Popconfirm, Row, Table } from "antd";
import AddModular from "@public/components/Modular/AddModular";
import Chargeconf from "./confinput";
import { parkChargeColumns } from "../../columns";
import StatusElement from "@public/components/Element/StatusElement";



interface Props extends IProps {
  forecarfree:any;
  viscarfree:any;
  cuscarfree:any;
}

class ParkChargeconf extends React.Component<Props> {

  state = {
    addForeVisible: false,
    addVisVisible: false,
    addcusVisible: false,
    editcusVisible: false,
    detail: {id: ""}
  }

  componentDidMount(){
    this.props.actions.getForeignCarFee({parkId: this.props.match.params.id})
    this.props.actions.getVisitorCarFee({parkId: this.props.match.params.id})
    this.props.actions.getCustomCarFee({parkId: this.props.match.params.id})
  }

  getCol(){
    return [...parkChargeColumns, {
      title: "状态",
      dataIndex: "status",
      render:(item:any, rows:any)=><StatusElement notAll size="small" value={item} onChange={()=>{
        this.props.actions.statusCustomCarFee({objective:"enable", id: rows.id}, (res:any)=>{
          this.props.utils.OpenNotification("success")
          this.props.actions.getCustomCarFee({parkId: this.props.match.params.id}, {obj: res, type: "list"})
        })
      }} />
    },{
      title: "操作",
      render:(item:any)=>{
        return (
          <>
            <Button size="small" type="link" onClick={()=>this.setState({editcusVisible: true, detail: item})}>编辑</Button>
            <Popconfirm title="是否删除？" onConfirm={()=>{
              this.props.actions.deleteCustomCarFee({id: item.id}, ()=>{
                this.props.utils.OpenNotification("success")
                this.props.actions.getCustomCarFee({parkId: this.props.match.params.id}, {refresh: true})
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
    const {spinning, utils, forecarfree, viscarfree, cuscarfree} = this.props
    const {addForeVisible, addVisVisible, addcusVisible, editcusVisible, detail} = this.state

    return (
      <>
        <Row gutter={10}> 
          <Col span={12}>
            <Card size="small" title="外来车辆收费规则" 
              extra={<Button type="primary" onClick={()=>this.setState({addForeVisible: true})} >编辑</Button>}>
              <Descriptions column={4} >
                {forecarfree?forecarfree.map((item:any)=>(
                  <Descriptions.Item key={item.id} label={`${item.startHour}至${item.endHour}小时`}  >{item.amount}元</Descriptions.Item>
                )):null}
              </Descriptions>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="访客车辆收费规则" 
              extra={<Button type="primary" onClick={()=>this.setState({addVisVisible: true})} >编辑</Button>}>
                <Descriptions column={4} >
                    {viscarfree?viscarfree.map((item:any)=>(
                      <Descriptions.Item key={item.id} label={`${item.startHour}至${item.endHour}小时`}  >{item.amount}元</Descriptions.Item>
                    )):null}
                  </Descriptions>
            </Card>
          </Col>
        </Row>
        <Card className="mgt10" size="small" title="自定义分组" extra={<Button type="primary"
        onClick={()=>this.setState({addcusVisible: true})}>新增分组</Button>}>
          <Table size="small" bordered columns={this.getCol()} dataSource={cuscarfree?utils.addIndex(cuscarfree):[]} 
            pagination={false} />
        </Card>

        <AddModular
          title="外来车辆收费规则"
          spinning={spinning}
          visible={addForeVisible}
          initialValues={{parkGroupJson: forecarfree}}
          onCancel={()=>this.setState({addForeVisible: false})}
          onOk={(values)=>{
            this.props.actions.addOrUpForeignFee({
              parkGroupJson: JSON.stringify(values.parkGroupJson),
              parkId: this.props.match.params.id
            }, ()=>{
              utils.OpenNotification("success")
              this.props.actions.getForeignCarFee({parkId: this.props.match.params.id}, {refresh: true})
              this.setState({addForeVisible: false})
            })
          }}
          data={[
            {name: "parkGroupJson", type: <Chargeconf/>, wrapperCol: {span: 24}, rules: true}
          ]}
        />

        <AddModular
          title="访客车辆收费规则"
          spinning={spinning}
          visible={addVisVisible}
          initialValues={{parkGroupJson: viscarfree}}
          onCancel={()=>this.setState({addVisVisible: false})}
          onOk={(values)=>{
            this.props.actions.addVisitorCarFee({
              parkGroupJson: JSON.stringify(values.parkGroupJson),
              parkId: this.props.match.params.id
            }, ()=>{
              utils.OpenNotification("success")
              this.props.actions.getVisitorCarFee({parkId: this.props.match.params.id}, {refresh: true})
              this.setState({addVisVisible: false})
            })
          }}
          data={[
            {name: "parkGroupJson", type: <Chargeconf/>, wrapperCol: {span: 24}, rules: true}
          ]}
        />

      <AddModular
          title="自定义新增车辆收费规则"
          spinning={spinning}
          width={800}
          visible={addcusVisible}
          onCancel={()=>this.setState({addcusVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeCustomCarFee({
              ...values,
              parkGroupJson: JSON.stringify(values.parkGroupJson),
              parkId: this.props.match.params.id
            }, ()=>{
              utils.OpenNotification("success")
              this.props.actions.getCustomCarFee({parkId: this.props.match.params.id}, {refresh: true})
              this.setState({addcusVisible: false})
            })
          }}
          data={[
            {label: "分组名称", name: "groupName", type: "input", rules: true},
            {label: "收费配置", name: "parkGroupJson", type: <Chargeconf/>, rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />

        <AddModular
          title="自定义编辑车辆收费规则"
          spinning={spinning}
          width={800}
          visible={editcusVisible}
          initialValues={detail}
          onCancel={()=>this.setState({editcusVisible: false})}
          onOk={(values)=>{
            this.props.actions.changeCustomCarFee({
              ...values,
              id: detail.id,
              parkGroupJson: JSON.stringify(values.parkGroupJson),
              parkId: this.props.match.params.id
            }, (res:any)=>{
              utils.OpenNotification("success")
              this.props.actions.getCustomCarFee({parkId: this.props.match.params.id}, {obj: res, type: "list"})
              this.setState({editcusVisible: false})
            })
          }}
          data={[
            {label: "分组名称", name: "groupName", type: "input", rules: true},
            {label: "收费配置", name: "parkGroupJson", type: <Chargeconf/>, rules: true},
            {label: "状态", name: "status", type: <StatusElement notAll />, rules: true},
            {label: "备注", name: "remark", type: "textarea"},
          ]}
        />
      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getForeignCarFee, addOrUpForeignFee, getVisitorCarFee, addVisitorCarFee, 
      getCustomCarFee, changeCustomCarFee, deleteCustomCarFee, statusCustomCarFee}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    cuscarfree: state.park.cuscarfree,
    viscarfree: state.park.viscarfree,
    forecarfree: state.park.forecarfree,
    utils: state.app.utils,
    spinning: state.park.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(ParkChargeconf)