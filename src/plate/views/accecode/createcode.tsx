import React, { ReactNode, useEffect, useState } from "react"
import { Modal, Form, DatePicker, Select, Button, Space, Typography} from "antd"
import {createCodeState, changeAccessCode } from "@plate/actions/otherAction"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"


const {Option} = Select
const {Text, Title} = Typography

interface Props {
  visible:boolean;
  onCancel:any;
  title?:ReactNode;
  spinning:boolean;
  onOk:any;
  actions:any;
}

const CreateCode:React.FC<Props> = ({
  visible,
  onCancel,
  title,
  spinning,
  onOk,
  actions
})=>{
  const [form] = Form.useForm()
  const [gAsscess, setGAsscess]:any = useState(null)

  useEffect(()=>{
    
  }, [])

  const onFinish = (values:any)=>{
    actions.createCodeState(values, (res:any)=>{
      setGAsscess(res)
    })
  }

  const addAccessCode = ()=>{
    actions.changeAccessCode({
      objective: "add",
      activeCode: gAsscess.code,
      expireTime: gAsscess.time,
    }, ()=>{
      onOk()
    })
  }

  return (
    <Modal
      afterClose={()=>{
        setGAsscess(null)
      }}
      title={title}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={spinning}
      footer={null}
    >
      {gAsscess?(
        <Space direction="vertical" >
          <Space style={{width: "100%"}}>
            <span>通行码：</span>
            <Title level={2} >{gAsscess.code}</Title>
          </Space>
          <Space>
            <span>{gAsscess.time}</span>
            <span>前有效</span>
          </Space>
          <Space>
            <Button type="primary" onClick={addAccessCode} >确认生成通行码</Button>
          </Space>
        </Space>
      ):<Form 
        layout="inline"
        form={form}
        onFinish={onFinish}
        >
        <Form.Item label="通行码有效期" name="time" rules={[{required: true, message: '通行码有效期不能为空！' }]} >
          <Select style={{minWidth: 100}}>
            <Option value={6}>6小时</Option>
            <Option value={12}>12小时</Option>
            <Option value={24}>24小时</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >生成通行码</Button>
        </Form.Item>
      </Form>}

    </Modal>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({createCodeState, changeAccessCode}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
  }
}

export default connect(mapStateProps, mapDispatchProps)(CreateCode)