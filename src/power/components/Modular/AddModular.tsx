import React, { useEffect, useState } from "react"
import { Form, Modal } from "antd"
import {ItemType, getNode} from "./getnode"


interface ItemTypeProps extends ItemType {
  rules?: boolean | any[];
  wrapperCol?:any;
  labelCol?:any;
}

interface Props {
  visible: boolean;
  width?:number;
  onOk: (...arg0:any)=>void;
  onCancel:()=>void;
  title?:any;
  data:ItemTypeProps[];
  initialValues?:any;
  spinning?:boolean;
}

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const AddModular:React.FC<Props> = ({
  visible,
  width,
  onOk,
  onCancel,
  title,
  data,
  initialValues,
  spinning,
})=>{
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(()=>{
    if(visible){
      setModalVisible(true)
      form.setFieldsValue(initialValues)
    }

  }, [visible])

  const handleRules = (item:ItemTypeProps)=>{
    if(typeof item.rules === 'boolean'){
      return [{required: true, message: `${item.label}不能为空！`}]
    }else if(typeof item.rules === 'object'){
      return item.rules;
    }
    return [];
  }

  return (
    !visible && !modalVisible?null:
    <Modal
      title={title || null}
      visible={visible}
      width={width || 560}
      onCancel={onCancel}
      onOk={()=>form.submit()}
      confirmLoading={spinning}
      afterClose={()=>{
        setModalVisible(false)
      }}
    >
      <Form 
        name="addModular" 
        {...layout}
        form={form} onFinish={(values)=>onOk(values)} initialValues={initialValues} >
        {data.map((item, index)=>(
          <Form.Item 
            key={index} 
            label={item.label} 
            name={item.name} 
            initialValue={item.initialValue}
            rules={handleRules(item)}
            wrapperCol={item.wrapperCol}
            labelCol={item.labelCol}
            >
            {getNode(item)}
          </Form.Item>
        ))}
      </Form>

    </Modal>
  )
}


export default AddModular;