import {APP_LOADING_START, APP_LOADING_END, APP_LOADING_NOT} from "@admin/constant/app"
import {fetch} from "@public/utils"
import MC from "memory-cache"
import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "APP"
import {OptProps} from "@public/utils/action"


export const selectUser = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/system/sys/sys-user/selectUserByInfo",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}


export const getCompanyProject = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-item/page",
        method: "get",
        data: params
      }
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      console.log(isCache)
      if(!isCache){
        
        dispatch({
          type: APP_LOADING_START
        })
        let data:any = await fetch(options)
        
        MC.put(key, data) 
        dispatch({
          type: APP_LOADING_END,
          companyproject: data
        })
      }else{
        dispatch({
          type: APP_LOADING_NOT,
          companyproject: isCache
        })
      }
      
    }catch(e){
      console.log(e)
      dispatch({type: APP_LOADING_END})
    }
  }
}

export const getCompanyRole = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company-system-role/selectCompanyRole",
        method: "get",
        data: params
      }
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      console.log(isCache)
      if(!isCache){
        
        dispatch({
          type: APP_LOADING_START
        })
        let data:any = await fetch(options)
        
        MC.put(key, data) 
        dispatch({
          type: APP_LOADING_END,
          companyRole: data
        })
      }else{
        dispatch({
          type: APP_LOADING_NOT,
          companyRole: isCache
        })
      }
      
    }catch(e){
      console.log(e)
      dispatch({type: APP_LOADING_END})
    }
  }
}

export const getSystems = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company/systemList",
        method: "get",
        data: params
      }
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      
      if(!isCache){
        
        dispatch({
          type: APP_LOADING_START
        })
        let data:any = await fetch(options)
        
        MC.put(key, data) 
        dispatch({
          type: APP_LOADING_END,
          systems: data
        })
      }else{
        dispatch({
          type: APP_LOADING_NOT,
          systems: isCache
        })
      }
      
    }catch(e){
      console.log(e)
      dispatch({type: APP_LOADING_END})
    }
  }
}

export const getSystemPackage = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-proper-auth-package/list",
        method: "get",
        data: params
      }
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      
      if(!isCache){
        
        dispatch({
          type: APP_LOADING_START
        })
        let data:any = await fetch(options)
        console.log(data)
        MC.put(key, data) 
        dispatch({
          type: APP_LOADING_END,
          systemPackage: data
        })
      }else{
        dispatch({
          type: APP_LOADING_NOT,
          systemPackage: isCache
        })
      }
      
    }catch(e){
      console.log(e)
      dispatch({type: APP_LOADING_END})
    }
  }
}

export const getCompanys = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company/page",
        method: "get",
        data: params
      }
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      
      if(!isCache){
        dispatch({
          type: APP_LOADING_START
        })
        let data:any = await fetch(options)
        MC.put(key, data) 
        dispatch({
          type: APP_LOADING_END,
          companys: data
        })
      }else{
        dispatch({
          type: APP_LOADING_NOT,
          companys: isCache
        })
      }
      
    }catch(e){
      console.log(e)
      dispatch({type: APP_LOADING_END})
    }
  }
}

export const getCompanyHe = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company/companyItemList",
        method: "get",
        data: params
      }
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      
      if(!isCache){ 
        dispatch({
          type: APP_LOADING_START
        })
        let data:any = await fetch(options)
        MC.put(key, data)
        dispatch({
          type: APP_LOADING_END,
          companyhe: data
        })
      }else{
        dispatch({
          type: APP_LOADING_NOT,
          companyhe: isCache
        })
      }
      
    }catch(e){
      console.log(e)
      dispatch({type: APP_LOADING_END})
    }
  }
}

export const getRegions = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    try{
      const options:any = {
        url: "/zlwj/api/system/area/cityArea",
        method: "get",
        data: params
      }
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      
      if(!isCache){
        dispatch({
          type: APP_LOADING_START
        })
        let data:any = await fetch(options)
        MC.put(key, data)
        dispatch({
          type: APP_LOADING_END,
          region: data
        })
      }else{
        dispatch({
          type: APP_LOADING_NOT,
          region: isCache
        })
      }
      
    }catch(e){
      console.log(e)
      dispatch({type: APP_LOADING_END})
    }
  }
}
