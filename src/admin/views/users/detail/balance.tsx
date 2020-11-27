import React from "react"
import { connect } from "react-redux";
import { Card, Col, Row, Table } from "antd"
import { bindActionCreators } from "redux";
import {getUserIntegral, getUserBalance} from "@admin/actions/userAction"
import {IProps} from "@public/common/interface" 
import {usersIntegralColumns, usersBalanceColumns} from "../columns"


interface Props extends IProps {
  integral: any;
  balance: any;
}



class UserBalance extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getUserIntegral({
      params: {
        current: 1,
        temId: this.props.match.params.temId
      },
      refresh: true
    })
    this.props.actions.getUserBalance({
      params: {
        current: 1,
        temId: this.props.match.params.temId
      },
      refresh: true
    })
  }

  

  render() {
    const {integral, utils, balance} = this.props
    console.log(integral)
    return (
      <Row gutter={10}>
        <Col span={12}> 
          <Card size="small" title="用户余额" extra={'当前余额:'+(balance?balance.map.balance:null)+'元'} >
            <Table size="small"  columns={usersBalanceColumns} dataSource={balance?utils.addIndex(balance.list):[]} 
            pagination={utils.Pagination(balance, page=>{
              this.props.actions.getUserBalance({
                params: {
                  current: page,
                  temId: this.props.match.params.temId
                },
                refresh: true
              })
            })}/>
          </Card>
        </Col>
        <Col span={12}> 
          <Card size="small" title="用户积分" extra={'当前积分:'+(integral?integral.map.integral:null)+'积分'} >
            <Table size="small"  columns={usersIntegralColumns} dataSource={integral?utils.addIndex(integral.list):[]} 
            pagination={utils.Pagination(balance, page=>{
              this.props.actions.getUserIntegral({
                params: {
                  current: page,
                  temId: this.props.match.params.temId
                },
                refresh: true
              })
            })}/>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getUserIntegral, getUserBalance}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    integral: state.user.integral,
    balance: state.user.balance
  }
}

export default connect(mapStateProps, mapDispatchProps)(UserBalance)