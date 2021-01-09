import { Button, Card, Form, Input } from "antd"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import {getMerchant, addOrUpMch} from "@plate/actions/parkAction"
import { bindActionCreators } from "redux"
import { UtilsProps } from "@public/common/interface"
import { useRouteMatch } from "react-router-dom"



interface Props {
  merchant:any;
  utils: UtilsProps;
  actions:any;
}

const Merchant:React.FC<Props> = ({
  merchant,
  utils,
  actions
})=>{
  const [form] = Form.useForm();
  const params:any  = useRouteMatch().params;


  useEffect(()=>{
    if(merchant){
      form.setFieldsValue(merchant)
    }else{
      form.resetFields()
    }
  }, [merchant])

  const onFinish = (values:any)=>{
    
    actions.addOrUpMch({
      ...values,
      id: merchant?merchant.id:"",
      parkId: params.id
    }, (res:any)=>{
      utils.OpenNotification("success")
      actions.getMerchant({parkId: params.id}, {obj: res, type: "obj"})
    })
  }

  return (
    <Card size="small" title="微信商户号配置" extra={<Button type="primary" onClick={()=>form.submit()} >保存</Button>} >
      <Form layout="inline" form={form} 
        onFinish={onFinish}
      >
        <Form.Item label="商户号ID" name="mchId" >
          <Input/>
        </Form.Item>
        <Form.Item label="商户号Key" name="mchKey">
          <Input/>
        </Form.Item>
        <Form.Item label="商户号Secret" name="mchSecret">
          <Input/>
        </Form.Item>
      </Form>
    </Card>
  )
}


const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getMerchant, addOrUpMch}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    merchant: state.park.merchant,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Merchant)