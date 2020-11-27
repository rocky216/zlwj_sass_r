import React from "react"
import { connect } from "react-redux";
import { Alert, Button, Card, Skeleton, Space } from "antd"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import {getPushConfig, getSelectWxAccount} from "@admin/actions/userAction"
import _ from "lodash";
import {ClientType} from "@public/common/mapper"


class UserPush extends React.Component<IProps> {
  state = {
    detail: [],
    wxDetail: []
  }

  componentDidMount(){
    this.props.actions.getPushConfig({temId: this.props.match.params.temId}, (res:any)=>{
      this.setState({detail: res})
    })
    this.props.actions.getSelectWxAccount({temId: this.props.match.params.temId}, (res:any)=>{
      this.setState({wxDetail: res})
    })
  }

  render() {
    const {detail, wxDetail} = this.state

    console.log(_.size(wxDetail)>0?true:false)
    return (
      <>
        <Card size="small" title="推送配置" >
          <Space direction="vertical" 
                style={{width: "100%"}}>
            {_.size(detail)? detail.map((item:any, index)=>(
              <Alert
                key={index}
                message={(
                  <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                    <span>{item.pushType}</span>
                    <span>{item.pushLink}</span>
                  </div>
                )}
                banner
                showIcon={false}
              />
            )): <Skeleton active />}
          </Space>
        </Card>
        <Card className="mgt10" size="small" title="关联微信账户" >
          <Space direction="vertical" 
                style={{width: "100%"}}>
            {wxDetail.map((item:any)=>(
              <Alert
              key={item.id}
              message={(
                <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                  <span>{ClientType[item.type]}</span>
                  <span>{item.openId}</span>
                </div>
              )}
              banner
              showIcon={false}
            />
            ))}
          </Space>
        </Card>
      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getPushConfig, getSelectWxAccount}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {

  }
}

export default connect(mapStateProps, mapDispatchProps)(UserPush)