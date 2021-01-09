import React, { useState } from "react"
import { Button, Form, Input, Modal, Upload } from "antd"
import { connect } from "react-redux";
import _ from "lodash";
import UploadElement from "@public/components/Element/UploadElement";


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
}

const AddResource: React.FC<Props> = ({
  onCancel,
  visible,
  title,
  utils,
  onOk,
})=>{
  const [form] = Form.useForm();
  const [files, setFiles] = useState()

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
        resourceDownload: data.downloadUrl,
        resourceStorage: data.filePath,
        fileSuffix: data.fileSuffix,
        fileSize: data.fileSize,
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
      <Form form={form} {...layout} onFinish={onFinish}>
        <Form.Item label="资源名称" name="annexName" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        <Form.Item label="资源KEY" name="resourceKey" rules={[{required: true}]}>
          <Input/>
        </Form.Item>
        {/* <Form.Item label="上传附件" name="filearr" rules={[{required: true}]} >
          <UploadElement type="file" data={{fileType: "carInfoMode"}}  />
        </Form.Item> */}
        <Form.Item label="上传附件" name="filearr" rules={[{required: true}]} 
          valuePropName="fileList"
          getValueFromEvent={normFile}>
          <Upload
            action="/zlwj/api/resource/file/uploadFile"
            name="file"
            data={{
              token: utils.getToken(),
              resourceType: "0",
              linkType: "sysResources",
              fileType: "carInfoMode",
              fileSize: 10240,
              isFlag: 0
            }}
            beforeUpload={beforeUpload}
          >
            <Button>点击上传</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="附件id" name="resourceId" rules={[{required: true}]}>
          <Input disabled/>
        </Form.Item>
        <Form.Item label="下载URL" name="resourceDownload" >
          <Input disabled/>
        </Form.Item>
        <Form.Item label="存储路径" name="resourceStorage" >
          <Input disabled/>
        </Form.Item>
        <Form.Item label="文件后缀" name="fileSuffix" rules={[{required: true}]}>
          <Input disabled/>
        </Form.Item>
        <Form.Item label="文件大小" name="fileSize" rules={[{required: true}]}>
          <Input disabled/>
        </Form.Item>
      </Form>

    </Modal>
  )
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps)(AddResource)