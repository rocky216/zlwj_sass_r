import React, { useState } from "react"
import { Button, Upload } from "antd"
import { connect } from "react-redux"
import { UtilsProps } from "@public/common/interface"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import _ from "lodash"

interface DataProps {
  companyCode?:any;
  fileType?:any;
  fileSize?:any;
  heCode?:any;
  resourceType:any;
  linkType?:any;
  userId?:any;
  isFlag?:any;
}


interface Props {
  data?:DataProps;
  utils: UtilsProps;
  type?:string;
  onChange?:any;
  value?:any;
  more?:boolean;
}

const UploadElement:React.FC<Props> = ({
  data={
    resourceType: "0",
    fileType: "photo",
    linkType: "logo",
    fileSize: 10240,
    isFlag: 0
  }, 
  utils, 
  type="image",
  onChange,
  value,
  more=false
})=>{
  const [loading, setLoading] = useState(false)

  const handleData = (arr:any[])=>{
    var newArr:any[] = [];
    _.each(arr, (item,index)=>{
      if(item.response && item.response.code == 1){
        const {dowloadHttpUrl, fileName, id} = item.response.data
        newArr.push({url: dowloadHttpUrl, name: fileName, uid: id })
      }else{
        newArr.push(item)
      }
    })
    
    return newArr;
  }

  const handleChange = (e:any)=>{
    setLoading(true)
    if (Array.isArray(e)) {
      return e;
    }
    if(e.file.status == "done"){
      const {code, msg} = e.file.response
      if(code!=1){
        utils.OpenNotification("error", msg)
        return;
      }
    }
    if( onChange && e.file.status == "done"){
      if(!more && e.fileList && e.fileList.length>1){
        e.fileList = [e.fileList[e.fileList.length-1]]
      }
      let imgArr = handleData(e.fileList);
      onChange(imgArr)
      setLoading(false)
      return imgArr
    }
  }

  const handleRemove = (file:any)=>{
    let v = _.filter(value, o=>o.url!=file.url)
    onChange(v)
  }

  const beforeUpload = (file:any)=>{
    if(file && file.size>(1024*1024*10)){ 
      utils.OpenNotification("error", "附件不能大于10M")
      return false;
    }
    return file;
  }

  const uploadButton = (
    <div>
      {loading?<LoadingOutlined/>:<PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );

  return (
    <Upload
    action="/zlwj/api/resource/file/uploadFile"
    listType={type=="image"?"picture-card":"text"}
    name="file"
    fileList={ value || [] }
    onChange={handleChange}
    showUploadList={true}
    onRemove={handleRemove}
    beforeUpload={beforeUpload}
    data={{
      token: utils.getToken(),
      ...data,
    }}
    >

      {loading}
      {type=="image"?uploadButton:
      <Button size="small" icon={loading?<LoadingOutlined/>:<LoadingOutlined />}>上传附件</Button>}
    </Upload>
  )
}

const mapStateProps = (state:any)=>{
  return {
    utils:state.app.utils
  }
}

export default connect(mapStateProps)(UploadElement)