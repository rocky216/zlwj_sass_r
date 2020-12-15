import instance, {AxiosRequest} from "./http"
import {notification } from "antd"
import qs from "qs"
import {save, remove, load} from "react-cookies"
import _ from "lodash"
import moment, { Moment } from "moment"

//对象转数组
export const objectArray = (obj:any,label="label", id="id")=>{
  let arr:any[] = []
  _.each(obj, (item, attr)=>{
    arr.push({
      [id]: attr,
      [label]: item
    })
  })
  return arr
}


//处理公司/项目
export const gCompanyHe = (cHe:any, companyId="companyId", itemId="itemId")=>{
  console.log(typeof cHe)
  if(!cHe || cHe==""){
    return {
      [companyId]:"",
      [itemId]:"",
    }
  }
  
  if(typeof cHe === "string" || typeof cHe === "number"){
    return {
      [companyId]:cHe,
      [itemId]:"",
    }
  }
  if(_.isArray(cHe) && cHe.length==2){
    return {
      [companyId]:cHe[0],
      [itemId]:cHe[1],
    }
  }
  return {
    [companyId]:"",
    [itemId]:"",
  }
}

//处理时间范围
export const gRtime = (arr: Moment[], sTime:string, eTime:string, format="YYYY-MM-DD")=>{
  if(!arr || !_.isArray(arr) || arr.length<2){
    return {
      [sTime]: "",
      [eTime]: "",
    }
  }
  return {
    [sTime]: moment(arr[0]).format(format),
    [eTime]: moment(arr[1]).format(format),
  }
}

export const echoFiles = (obj: string | any[])=>{
  var newArr:any[] = []
  
  if(obj=="" || obj == null || obj == undefined){
    return newArr
  }
  if(typeof obj === "string"){
    var arr = obj.split(",");
    _.each(arr, (item, index)=>{
      newArr.push({
        url: item,
        uid: index+item,
        name: index+item,
      })
    })
  }
  return newArr;
}

/* 处理图片上传服务器参数 */
export function submitFiles(arr:any[]){
  if(!_.isArray(arr)) return "";
  
  let newArr:string[] = []
  _.each(arr, (item:any)=>{
    newArr.push(item.url)
  })
  return newArr.join();
}

/* 分页 */
export const Pagination = (pageInfo:any, next:(...arg0:any)=>void)=>{
  if(!pageInfo) return {}
  if(!_.hasIn(pageInfo, "current") || !_.hasIn(pageInfo, "pageSize") || !_.hasIn(pageInfo, "total")){
    OpenNotification("error", "分页少了应有字段！")
    return {}
  }
  const {current, pageSize, total} = pageInfo
  return {
    current,
    pageSize,
    total,
    onChange: function(page: number, pageSize: number){
      if(next)next(page, pageSize);
    }
  }
} 

/* 添加key */
export const addIndex = (arr:Array<any>, type:boolean=false)=>{
  const handleArr = (obj:any[])=>{
    _.each(obj, (item,index)=>{
      item.key = !type?(index+1):item.id
      if(item.children && item.children.length){
        handleArr(item.children)
      }
    })
  }
  handleArr(arr)
  return arr;
}

/* 移出token */
export const removeToken = ()=>{
  remove("token", {path: "/"})
}
/* 存储token */
export const saveToken = (token:string)=>{
  save("token", token, {path: "/"})
}

/* 获取token */
export const getToken = ()=>{
  return load("token")
}


/* 提示 */
export function OpenNotification(type:string="success", msg:string="操作成功"){
  (notification as any)[type]({
    message: msg
  })
}

/**
 *  url： requuire
 *  method: get post put delete 默认 get
 *  data: not require {}
 */

export const fetch = (options: AxiosRequest)=>{
  options.data = {...options.data, token: getToken()}
  const createInstance = function(){
    switch( options.method.toUpperCase() ){
      case "GET":
        return instance.get( options.url, {params: options.data?options.data:{} })
      case "POST":
        return instance.post( options.url, options.data? qs.stringify(options.data) :{} )
      case "PUT":
        return instance.post( options.url, options.data?qs.stringify(options.data):{} )
      case "DELETE":
        return instance.get( options.url, {params: options.data?options.data:{} })
    }
  }

  

  return new Promise((resolve, reject)=>{
    
    createInstance()?.then( response=>{
      const {data, msg, code } = response.data;
      
      if(code==1){
        resolve( data );
      }else if(code==0){
        OpenNotification("error", msg)
        reject();
      }else if(code==-1){
        reject();
        OpenNotification("error", msg )
      }else if(code==-2){
        (window as any)._navigation.push("/login")
        reject();
      }
    }).catch(err=>{
      console.log(err, 'color: red')
      reject(err);
    })
  });

}