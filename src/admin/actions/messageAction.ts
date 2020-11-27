import {MESSAGE_LOADING_START, MESSAGE_LOADING_END, MESSAGE_LOADING_NOT} from "@admin/constant/message"
import {fetch} from "@public/utils"
import MC from "memory-cache"
import _ from "lodash"
import moment from "moment"

/**
 * list API公共方法
 * 
 */
interface OptionListProps{
  options: any;
  dispatch:any;
  keyName: string;
  obj?:any;
  next?:(...arg0:any)=>void;
  type?:string;  //"add" | "edit"
  refresh?: boolean
}

interface ParamsListProps{
  params: any;
  obj?:any;
  next?:(...arg0:any)=>void;
  type?:string;  //"add" | "edit"
  refresh?: boolean
}
// options:any,keyName:string, obj?:any, next?:(...arg0:any)=>void
const optionList = async (opt: OptionListProps)=>{
    const {options,dispatch, keyName, obj, next, type, refresh} = opt;
    try{
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      
    if(!isCache || refresh){
      dispatch({
        type: MESSAGE_LOADING_START
      })
      let data:any = await fetch(options)
      if(next)next(data)
      MC.put(key, data)
      dispatch({
        type: MESSAGE_LOADING_END,
        [keyName]: data
      })
    }else{
      if(obj && _.size(obj)){
        let index = _.findIndex(isCache.list, (o:any)=>o.id==obj.id)
        if(type=="edit"){
          isCache.list[index] = _.assign(isCache.list[index], obj);
        }else if(type=="add"){
          isCache.list[index] = _.assign(isCache.list[index], obj);
        }

        MC.put(key, isCache)
        dispatch({
          type: MESSAGE_LOADING_NOT,
          [keyName]: isCache
        })
      }else{
        dispatch({
          type: MESSAGE_LOADING_NOT,
          [keyName]: isCache
        })
      }
      
    }
    
  }catch(e){
    console.log(e)
    dispatch({type: MESSAGE_LOADING_END})
  }
  
}

export const statusMessageSign = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: MESSAGE_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-sms-sign/updateStatus",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: MESSAGE_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: MESSAGE_LOADING_END})
    }
  }
}


export const deleteMessageSign = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: MESSAGE_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-sms-sign/delById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: MESSAGE_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: MESSAGE_LOADING_END})
    }
  }
}

export const addMessageSign = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: MESSAGE_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-sms-sign/save",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: MESSAGE_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: MESSAGE_LOADING_END})
    }
  }
}

export const getMessageSign = (opt:any)=>{
  return async (dispatch:Function, getState:any)=>{
    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/system/sys/sys-sms-sign/page",
      method: "get",
      data: params
    }

    optionList({
      options,
      dispatch,
      keyName: "signs", obj, next, refresh, type})
  }
}

export const getMessagePackageSum = (opt:any)=>{
  return async (dispatch:Function, getState:any)=>{
    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/system/sys/sys-company-sms/systemSmsNum",
      method: "get",
      data: params
    }

    optionList({
      options,
      dispatch,
      keyName: "packagesum", obj, next, refresh, type})
  }
}



export const statusMessagePackage = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: MESSAGE_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-sms-package/updateStatus",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: MESSAGE_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: MESSAGE_LOADING_END})
    }
  }
}


export const editMessagePackage = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: MESSAGE_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-sms-package/updateById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: MESSAGE_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: MESSAGE_LOADING_END})
    }
  }
}

export const addMessagePackage = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: MESSAGE_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-sms-package/save",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: MESSAGE_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: MESSAGE_LOADING_END})
    }
  }
}

export const deleteMessagePackage = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: MESSAGE_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-sms-package/delById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: MESSAGE_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: MESSAGE_LOADING_END})
    }
  }
}

export const addMessageNum = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: MESSAGE_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company-sms/addSystemSmsNum",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: MESSAGE_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: MESSAGE_LOADING_END})
    }
  }
}

export const getMessagePackage = (opt:any)=>{
  return async (dispatch:Function, getState:any)=>{
    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/system/sys/sys-sms-package/page",
      method: "get",
      data: params
    }

    optionList({
      options,
      dispatch,
      keyName: "packages", obj, next, refresh, type})
  }
}

export const getMessageOrder = (opt:any)=>{
  return async (dispatch:Function, getState:any)=>{

    const {params, obj, next, type, refresh=false} = opt
    
    let newParams = _.omit(params, "time")
    
    const options:any = {
      url: "/zlwj/api/system/sys/sys-sms-order/page",
      method: "get",
      data: {...newParams, 
        startTime: params.time?moment(params.time[0]).format("YYYY-MM-DD"):"",
        endTime: params.time?moment(params.time[1]).format("YYYY-MM-DD"):"",
      }
    }
    optionList({
      options,
      dispatch,
      keyName: "orders", obj, next, refresh, type})
  }
}