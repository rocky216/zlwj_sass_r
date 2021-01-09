import React, { useEffect, useState } from "react"
import { Button, Card, Form, Input, InputNumber, Skeleton } from "antd"
import UploadElement from "@public/components/Element/UploadElement";
import RegionElement from "@plate/components/Element/RegionElement";
import StatusElement from "@public/components/Element/StatusElement";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {changePark} from "@plate/actions/parkAction"
import { UtilsProps } from "@public/common/interface";

const {TextArea} = Input

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

interface Props {
  parkbase:any;
  actions:any;
  utils:UtilsProps
}

const ParkBaseInfo: React.FC<Props> = ({
  parkbase,
  actions,
  utils
})=>{
  const [form] = Form.useForm();

  useEffect(()=>{
    if(parkbase){
      form.setFieldsValue({...parkbase, 
        parkAddressStr: parkbase.parkAddressStr?parkbase.parkAddressStr.split(","):[],
        parkIcon: utils.echoFiles(parkbase.parkIcon)
      })
    }
  }, [parkbase])

  const onFinish = (values:any)=>{
    actions.changePark({
      ...values,
      objective: "update",
      id: parkbase.id,
      parentId: parkbase.parentId,
      parkAddressStr: values.parkAddressStr?values.parkAddressStr.join():"",
      parkIcon: utils.submitFiles(values.parkIcon)
    }, ()=>{
      utils.OpenNotification("success")
    })
  }

  return (
    <Card size="small" title="停车场基础信息" extra={<Button type="primary" onClick={()=>form.submit()} >保存</Button>} >
      {parkbase?<Form
        form={form}
        {...layout}
        onFinish={onFinish}
      >
        <Form.Item label="停车场名称" name="parkName"  >
          <Input/>
        </Form.Item>
        <Form.Item label="停车场编号" name="parkCode">
          <Input/>
        </Form.Item>
        <Form.Item label="停车场图片" name="parkIcon">
          <UploadElement data={{fileType: "plate"}} />
        </Form.Item>
        <Form.Item label="省/市/区" name="parkAddressStr">
          <RegionElement/>
        </Form.Item>
        <Form.Item label="地址详情" name="parkAddressDetail">
          <TextArea/>
        </Form.Item>
        <Form.Item label="经度" name="parkLongitude">
          <InputNumber style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item label="纬度" name="parkLatitude">
          <InputNumber style={{width: "100%"}} />
        </Form.Item>
        <Form.Item label="状态" name="status">
          <StatusElement notAll />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <TextArea/>
        </Form.Item>
      </Form>:<Skeleton active />}
    </Card>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({changePark},dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    parkbase: state.park.parkbase,
    utils: state.app.utils
  }
}


export default connect(mapStateProps, mapDispatchProps)(ParkBaseInfo)