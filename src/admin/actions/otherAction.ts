import {OTHER_LOADING_START, OTHER_LOADING_END, OTHER_LOADING_NOT} from "@admin/constant/other"
import {fetch} from "@public/utils"
import MC from "memory-cache"
import _ from "lodash"
import moment from "moment"
import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "OTHER"
import {OptProps} from "@public/utils/action"


export const deleteLogoLink = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/link-logo/deleteById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const statusLogoLink = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/link-logo/enable",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const editLogoLink = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/link-logo/updateById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const addLogoLink = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/link-logo/save",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getLogoLink = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/link-logo/page",
      method: "get",
      data: params
    }

    storetApi(options, "logolink", dispatch, ACTION, opt)
  }
}

export const statusResType = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/link-type/enable",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}


export const deleteResType = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/link-type/deleteById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const editResType = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/link-type/updateById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const addResType = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/link-type/save",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getResTypeList = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/link-type/page",
      method: "get",
      data: params
    }

    storetApi(options, "restype", dispatch, ACTION, opt)
  }
}



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
        type: OTHER_LOADING_START
      })
      let data:any = await fetch(options)
      if(next)next(data)
      MC.put(key, data)
      dispatch({
        type: OTHER_LOADING_END,
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
          type: OTHER_LOADING_NOT,
          [keyName]: isCache
        })
      }else{
        dispatch({
          type: OTHER_LOADING_NOT,
          [keyName]: isCache
        })
      }
      
    }
    
  }catch(e){
    console.log(e)
    dispatch({type: OTHER_LOADING_END})
  }
  
}


export const deleteSysResource = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: OTHER_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-resource/removeById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: OTHER_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: OTHER_LOADING_END})
    }
  }
}

export const editSysResource = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: OTHER_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-resource/updateById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: OTHER_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: OTHER_LOADING_END})
    }
  }
}



export const addSysResource = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: OTHER_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-resource/save",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: OTHER_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: OTHER_LOADING_END})
    }
  }
}

export const getSystemLink = (opt:any)=>{
  return async (dispatch:Function, getState:any)=>{

    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/resource/link-type/selectSystemLink",
      method: "get",
      data: params
    }
    optionList({
      options,
      dispatch,
      keyName: "systemlink", obj, next, refresh, type})
  }
}

export const getSysResource = (opt:any)=>{
  return async (dispatch:Function, getState:any)=>{

    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/system/sys/sys-resource/page",
      method: "get",
      data: params
    }
    optionList({
      options,
      dispatch,
      keyName: "resource", obj, next, refresh, type})
  }
}