import {SYSTEM_LOADING_START, SYSTEM_LOADING_END, SYSTEM_LOADING_NOT} from "@admin/constant/system"
import {fetch} from "@public/utils"
import MC from "memory-cache"
import _ from "lodash"
import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "SYSTEM"
import {OptProps} from "@public/utils/action"



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
        type: SYSTEM_LOADING_START
      })
      let data:any = await fetch(options)
      if(next)next(data)
      MC.put(key, data)
      dispatch({
        type: SYSTEM_LOADING_END,
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
          type: SYSTEM_LOADING_NOT,
          [keyName]: isCache
        })
      }else{
        dispatch({
          type: SYSTEM_LOADING_END,
          [keyName]: isCache
        })
      }
      
    }
    
  }catch(e){
    console.log(e)
    dispatch({type: SYSTEM_LOADING_END})
  }
  
}


export const addBatchMenus = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/system/sys/sys-menu/addBatchMenus",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getTreeDateByType = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/system/sys/sys-menus-tree/getTreeDateByType",
      method: "get",
      data: params
    }
    storetApi(options, "databytype", dispatch, ACTION, {})
  }
}



export const savePackageMenu = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-package-menu/savePackageMenu",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const findPackageMenu = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-package-menu/selectPackageMenu",
        method: "get",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const deleteSelectChildTree = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-menu/removeById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const editSelectChildTree = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-menu/updateById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const addSelectChildTree = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-menu/save",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const getSelectChildTree = (opt:any)=>{
  
  return async (dispatch:Function, getState:any)=>{

    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/system/sys/sys-menu/selectChildTree",
      method: "get",
      data: params
    }
    optionList({
      options,
      dispatch,
      keyName: "menutree", obj, next, refresh, type})
  }
}




export const deleteSystemPackage = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-proper-auth-package/removeById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const editSystemPackage = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-proper-auth-package/updateById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const addSystemPackage = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-proper-auth-package/save",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const getSystemPackage = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-proper-auth-package/list",
        method: "get",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const editSystem = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-proper-system/updateById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const addSystem = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: SYSTEM_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-proper-system/save",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: SYSTEM_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: SYSTEM_LOADING_END})
    }
  }
}

export const getCompanyRole = (opt:any)=>{
  return async (dispatch:Function, getState:any)=>{

    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/system/sys/sys-company/selectSystem",
      method: "get",
      data: params
    }
    optionList({
      options,
      dispatch,
      keyName: "companyrole", obj, next, refresh, type})
  }
}

export const getSystems = (opt:any)=>{
  return async (dispatch:Function, getState:any)=>{

    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/system/sys/sys-proper-system/page",
      method: "get",
      data: params
    }
    optionList({
      options,
      dispatch,
      keyName: "systems", obj, next, refresh, type})
  }
}
