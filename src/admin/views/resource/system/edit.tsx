import React, { useState } from "react"
import { Button, Form, Input, Modal, Select, Upload } from "antd"
import { connect } from "react-redux";
import _ from "lodash";

const {Option} = Select

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 },
};

interface Props {
  visible: boolean;
  title?:string;
  utils:any;
  onCancel:()=>void;
  onOk:(...arg0:any)=>void;
  detail: any;
  systemlink:any;
}

const EditResource: React.FC<Props> = ({
  onCancel,
  visible,
  title,
  utils,
  onOk,
  detail,
  systemlink
})=>{
  const [form] = Form.useForm();
  const [files, setFiles] = useState()
  const [linkCode, setLinkCode] = useState("")

  const normFile = (e:any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    if(e.file.status == "done"){
      const {code, data, msg} = e.file.response
      
      if(code != 1){
        utils.OpenNotification("error", msg)
        return null;
      }
      setFiles(data)
      form.setFieldsValue({
        resourceId: data.id,
        resourceDownload: data.dowloadHttpUrl,
        dowloadHttpUrl: data.dowloadHttpPdfUrl,
        resourceStorage: data.flieUrl,
        suffix: data.suffixName,
        size: data.fileSize,
      })
      e.fileList = [e.file]
    }
    return e.file && e.fileList;
    
    
  };

  const beforeUpload = (file:any)=>{
    if(file && file.size>(1024*1024*10)){ 
      utils.OpenNotification("error", "附件不能大于10M")
      return false;
    }
    return file;
  }

  const onFinish = (values:any)=>{
    console.log(values)
    let newValues = _.omit(values, "filearr")
    onOk(newValues)
  }
  
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={()=>form.submit()}
    >
      <Form form={form} {...layout} onFinish={onFinish}
        initialValues={{...detail}}
      >
        <Form.Item label="资源名称" name="annexName" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item label="资源KEY" name="resourceKey" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        
        <Form.Item label="附件id" name="resourceId" rules={[{required: true}]}>
          <Input disabled/>
        </Form.Item>
        <Form.Item label="下载URL" name="downloadUrl" >
          <Input disabled/>
        </Form.Item>
        <Form.Item label="文件后缀" name="resourceSuffix" rules={[{required: true}]}>
          <Input disabled/>
        </Form.Item>
        <Form.Item label="文件大小" name="resourceSize" rules={[{required: true}]}>
          <Input disabled/>
        </Form.Item>
      </Form>

    </Modal>
  )
}

const mapStateProps = (state:any)=>{
  return {
    systemlink: state.other.systemlink,
    utils: state.app.utils
  }
}

export default connect(mapStateProps)(EditResource)