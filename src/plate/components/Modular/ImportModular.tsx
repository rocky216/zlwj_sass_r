import React, {ReactNode, useState} from "react"
import { Button, Modal, Space, Typography, Upload } from "antd"
import UploadElement from "@public/components/Element/UploadElement"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import {excelImportFile} from "@plate/actions/appAction"
import { CloudUploadOutlined } from "@ant-design/icons"
import { UtilsProps } from "@public/common/interface"
import _ from "lodash"


const {Text} = Typography

interface Props {
  actions:any;
  title?: ReactNode;
  visible: boolean;
  onCancel:(...arg:any)=>void;
  disabled?:boolean;
  condNode?:ReactNode;
  utils:UtilsProps;
  data:any;
}

const ImportModular: React.FC<Props> = ({
  actions,
  title,
  visible,
  onCancel,
  disabled,
  condNode,
  utils,
  data
})=>{

  const [hCode, setHCode] = useState(null)
  const [errorVoList, setErrorVoList] = useState([])

  const hChange = ({file, fileList}:any)=>{
    if (file.status === 'done') {
      const {code, msg, data} = file.response
      if(code==1){
        setHCode(data.code)
        if(!data.code){
          setErrorVoList(data.errorVoList)
        }
      }else{
        utils.OpenNotification("error", msg)
      }
    }
  }

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      okText="校验导入数据"
      cancelText="关闭"
    >
      <Space>
        {condNode}
          <Upload
            disabled={disabled}
            action="/zlwj/api/plate/sys/plate-license/plateDataVerify"
            name="file"
            data={{
              token: utils.getToken(),
              ...data
            }}
            onChange={hChange}
          >
            <Button disabled={disabled} icon={<CloudUploadOutlined />} type="primary">上传附件</Button>
          </Upload>
        <a>下载模板</a>
      </Space>
      {errorVoList.length?
      <div className="mgt10">
        <Space direction="vertical">
          {(_.slice(errorVoList, 0, 20)).map((item:any, index)=>(
            <Space key={index}>
              <Text mark>{item.row}</Text>
              <Text type="danger">异常</Text>
              <Text>{item.remake}</Text>
            </Space>
          ))}
        </Space>
      </div>:null}
    </Modal>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({excelImportFile}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils
  }
}

export default connect(mapStateProps, mapDispatchProps)(ImportModular)