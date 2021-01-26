import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Radio, Table, Typography } from "antd";
import { appkeychianColumns } from "../columns";
import {getAppkey } from "@door/actions/keychainAction"
import SearchModular from "@public/components/Modular/SearchModular";

const {Text} = Typography


interface Props extends IProps {
  appkey:any;
}

let params = {
  current: 1,
  applyName: "",
  applyPhone:"",
  passStatus: 0
}

let resetParams = {
  current: 1,
  applyName: "",
  applyPhone:"",
  passStatus: 0
}

class Appkey extends React.Component<Props> {

  componentDidMount(){
    this.props.actions.getAppkey(params)
  }

  render() {
    const {spinning, utils, appkey} = this.props

    return (
      <JCard spinning={spinning}> 
        <div key="a">
          <SearchModular
            before={(
              <Radio.Group buttonStyle="solid" defaultValue={params.passStatus} onChange={(v:any)=>{
                params.passStatus=v
              }} >
                <Radio.Button value={0}>待处理({appkey?appkey.map.waitApplySum:0})</Radio.Button>
                <Radio.Button value={1}>已处理({appkey?appkey.map.processedSum:0})</Radio.Button>
              </Radio.Group>
            )}
            initialValues={params}
            resetValues={resetParams}
            submitSearch={(values:any)=>{

            }}
            data={[
              {label: "申请人姓名", name: "applyName", type: "input"},
              {label: "申请人电话", name: "applyPhone", type: "inputNumber"},
            ]}
          />
        </div>
        <div key="b">
          <Table size="small" columns={appkeychianColumns} dataSource={appkey?utils.addIndex(appkey.list):[]}
          pagination={utils.Pagination(appkey, page=>{
            params.current = page
            this.props.actions.getAppkey(params)
          })} />
        </div>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getAppkey}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    appkey: state.keychain.appkey,
    utils: state.app.utils,
    spinning: state.keychain.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Appkey)