import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import {linkCardUserColumns, linkCardLogColumns } from "../columns"
import { Button, Popconfirm, Table, Tabs, Descriptions, Card, Skeleton, Typography} from "antd";
import {getLinkCardUser, endLinkCardUser, endLinkCardLog } from "@power/actions/cardAction"
import { Link } from "react-router-dom";


interface Props extends IProps {
  linkcard:any;
  linkcardlog:any;
}

let params = {
  current: 1,
}

class CardDetail extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getLinkCardUser({cardNo: this.props.match.params.cardNo})
    this.initialCardLog(params)
  }
  initialCardLog(params:any){
    this.props.actions.endLinkCardLog({cardNo: this.props.match.params.cardNo, ...params})
  }

  getCol(){
    return [...linkCardUserColumns, {
      title: "操作",
      width: 100,
      render:(item:any)=>{
        return (
          <Popconfirm title="是否结束关联？" onConfirm={()=>{
            this.props.actions.endLinkCardUser({
              temId: item.temId,
              cardNo: this.props.match.params.cardNo
            }, ()=>{
              this.props.utils.OpenNotification("success")
              this.props.actions.getLinkCardUser({cardNo: this.props.match.params.cardNo}, {refresh: true})
            })
          }}>
            <Button type="link" size="small" >结束关联</Button>
          </Popconfirm>
        )
        
      }
    }]
  }

  render() {
    const {spinning, utils, linkcard, linkcardlog, history} = this.props
    
    return (
      <JCard spinning={spinning}> 
        <Tabs type="card"  tabBarExtraContent={(
          <Button onClick={()=>history.goBack()}>返回</Button>
        )}>
          <Tabs.TabPane key="1" tab="关联用户">
            <Table size="small" columns={this.getCol()} dataSource={linkcard?utils.addIndex(linkcard):[]}  
              pagination={false}/>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="余额日志" >
            <Card size="small">
              {linkcardlog?
              <Descriptions column={8}>
                <Descriptions.Item label="当前余额">
                  <Typography.Text >{linkcardlog.map.money}</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="合计支出">
                  <Typography.Text type="danger">{linkcardlog.map.payMoney}</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="合计收入">
                  <Typography.Text type="success">{linkcardlog.map.expendMoney}</Typography.Text>
                </Descriptions.Item>
              </Descriptions>
              :<Skeleton active />}
            </Card>

            <Table size="small" columns={linkCardLogColumns} dataSource={linkcardlog?utils.addIndex(linkcardlog.list):[]}
            pagination={utils.Pagination(linkcardlog, page=>{
              params.current = page;
              this.initialCardLog(params)
            })} />
          </Tabs.TabPane>
        </Tabs>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getLinkCardUser, endLinkCardUser, endLinkCardLog}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    linkcardlog: state.card.linkcardlog,
    linkcard: state.card.linkcard,
    utils: state.app.utils,
    spinning: state.card.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(CardDetail)