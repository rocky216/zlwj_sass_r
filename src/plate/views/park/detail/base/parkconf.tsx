import React, { useEffect, useState } from "react"
import {getParkAvailNumber, addOrUpParkConfig, getByParkConf} from "@plate/actions/parkAction"
import {Button, Card, Checkbox, Col, Form, InputNumber, Radio, Row, Select, Image} from "antd"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { UtilsProps } from "@public/common/interface"
import OpenCloseElement from "@plate/components/Element/OpenCloseElement"
import "./index.less"
import BeInputNumber from "@public/components/Element/BeInputNumber"
import { RedoOutlined } from "@ant-design/icons"
import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom"

const {Option} = Select

interface Props {
  parkconf:any;
  utils:UtilsProps;
  actions:any;
}

const tMinute = [5,10,15,20,25,30,35,40,45,50,55,60]

const Parkconf:React.FC<Props> = ({
  parkconf,
  utils,
  actions,
})=>{
  const [form] = Form.useForm();
  const useparams:any = useParams();
  const [isAdvancePay, setIsAdvancePay] = useState(0)
  const params:any  = useRouteMatch().params;
  

  const getParkAvailNum = ()=>{
    actions.getParkAvailNumber({parkId: useparams.id}, (res:any)=>{
      form.setFieldsValue({availpark: res})
    })
  }
  
  useEffect(()=>{
    getParkAvailNum()
    if(parkconf){
      form.setFieldsValue(parkconf)
    }
  }, [parkconf])

  


  const onFinish = (values:any)=>{
    actions.addOrUpParkConfig({
      ...values,
      parkId: params.id,
      id: parkconf.id
    }, (res:any)=>{
      utils.OpenNotification("success")
      actions.getByParkConf({parkId: params.id}, {obj:res, type: "obj"})
    })
  }
  
  return (
    <div className="parkconf">
      <Card size="small" title="主停车场配置信息" extra={<Button type="primary" onClick={()=>form.submit()} >保存</Button>} >
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Row gutter={20} className="greybg">
            <Col span={6}>
              <Form.Item label="停车场模式" name="runModel">
                <Select>
                  <Option value={0}>开放模式</Option>
                  <Option value={1}>封闭模式</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} >
              <Form.Item name="isa" valuePropName="checked" >
                <Checkbox>警用车牌放行</Checkbox>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="isb"  valuePropName="checked" >
                <Checkbox>军用车牌放行</Checkbox>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="入口是否自动开闸" name="isFull">
                <OpenCloseElement/>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={20} className="greybg mgt10">
            <Col span={6}>
              <Form.Item label="车位数量" name="parkNumber">
                <InputNumber style={{width: "100%"}}/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="可用车位数量" name="availpark">
                <BeInputNumber readOnly suffix={<RedoOutlined style={{cursor:"pointer", color: "#13c2c2", fontSize:18}}
                onClick={getParkAvailNum} />} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="车位已满时是否可通行" name="isOpen">
              <Radio.Group  >
                <Radio value={1}>通行</Radio>
                <Radio value={0}>不通行</Radio>
              </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20} className="mgt10">
          {parkconf && parkconf.isSon==0?<Col span={12} className="greybg">
              <>
                <Form.Item label="访客车辆功能" name="isVisitor" labelCol={{span: 12}} >
                  <OpenCloseElement/>
                </Form.Item>
                <Form.Item label="电子围栏功能" name="isFence" labelCol={{span: 12}}>
                  <OpenCloseElement/>
                </Form.Item>
                <Form.Item label="是否开启循环计费" name="isLoopCost" labelCol={{span: 12}}>
                  <OpenCloseElement/>
                </Form.Item>
                <Form.Item label="是否开启提前缴费功能" name="isAdvancePay" labelCol={{span: 12}} 
                getValueFromEvent={(v)=>{
                  setIsAdvancePay(v)
                }} >
                  <OpenCloseElement/>
                </Form.Item>
                { form.getFieldValue("isAdvancePay") == 1 || isAdvancePay==1?
                <Form.Item label="提前缴费后可通行时间" name="advanceTime" labelCol={{span: 12}}>
                  <Select>
                    {tMinute.map(item=>(
                      <Option key={item} value={item}>{item+"分钟"}</Option>
                    ))}
                  </Select>
                </Form.Item>:null}
                <Form.Item label="车辆必须绑定业主信息" name="isBindOwner" labelCol={{span: 12}}>
                  <OpenCloseElement/>
                </Form.Item>
                <Form.Item label="车辆必须完善驾驶证信息" name="isDriverPerfect" labelCol={{span: 12}}>
                  <OpenCloseElement/>
                </Form.Item>
                <Form.Item label="车辆必须完善行驶证信息" name="isTravelPerfect" labelCol={{span: 12}}>
                  <OpenCloseElement/>
                </Form.Item>
                <Form.Item label="车辆必须完善身份证信息" name="isCardPerfect" labelCol={{span: 12}}>
                  <OpenCloseElement/>
                </Form.Item>
              </>
            </Col>:<Col span={12}></Col>}
            <Col span={12}>
              <Image/>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  )
}


const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getParkAvailNumber, addOrUpParkConfig, getByParkConf},dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    parkconf: state.park.parkconf,
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(Parkconf)