import React, { useEffect } from "react"
import {Button, Image, Result} from "antd"
import { useHistory } from "react-router-dom"

const ErrorPage:React.FC = ()=>{
  let history = useHistory();

  useEffect(()=>{
    
  },[])
  
  return (
    <Result
      status="403"
      title="访问错误"
      subTitle="对不起, 您没有权限访问该页面."
      extra={<Button type="primary" onClick={()=>history.goBack()} >点击返回</Button>}
    />
  )
}



export default ErrorPage;