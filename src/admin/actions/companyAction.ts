import {COMPANY_LOADING_START, COMPANY_LOADING_END, COMPANY_LOADING_NOT} from "@admin/constant/company"
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
        type: COMPANY_LOADING_START
      })
      let data:any = await fetch(options)
      if(next)next(data)
      MC.put(key, data)
      dispatch({
        type: COMPANY_LOADING_END,
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
          type: COMPANY_LOADING_NOT,
          [keyName]: isCache
        })
      }else{
        dispatch({
          type: COMPANY_LOADING_END,
          [keyName]: isCache
        })
      }
      
    }
    
  }catch(e){
    console.log(e)
    dispatch({type: COMPANY_LOADING_END})
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


export const getSystemRoleMenu = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-system-role/roleMenuId",
        method: "get",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const addOrUpdaMenu = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company-system-role-menu/addOrUpdaMenu",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const addCompanySysRole = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company-system-role/save",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const getCompanyAuthPackageMenu = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-proper-auth-package/packageMenu",
        method: "get",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const deleteCompanyAuthPackage = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company-package/del",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const addCompanyAuthPackage = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company-package/add",
        method: "post",
        data: {...params, expireTime: params.expireTime?moment(params.expireTime).format("YYYY-MM-YY"):""}
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const editCompanyProject = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-item/updateById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const addCompanyProject = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-item/save",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const getCompanyProject = (opt:any)=>{
  return async (dispatch:Function, getState:any)=>{

    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/system/sys/sys-item/page",
      method: "get",
      data: params
    }
    optionList({
      options,
      dispatch,
      keyName: "companyproject", obj, next, refresh, type})
  }
}


export const editCompanyBase = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company/updateById",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const getCompanyDetail = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company/getById",
        method: "get",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const updateCompanyStatus = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company/updateStatus",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const addCompany = (params:any, next:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    dispatch({
      type: COMPANY_LOADING_START,
    })
    try{
      const options:any = {
        url: "/zlwj/api/system/sys/sys-company/save",
        method: "post",
        data: params
      }
      let data:any = await fetch(options)
      if(next)next(data)
      dispatch({
        type: COMPANY_LOADING_END,
      })
      
    }catch(e){
      console.log(e)
      dispatch({type: COMPANY_LOADING_END})
    }
  }
}

export const getCompanys = (opt:ParamsListProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const {params, obj, next, type, refresh=false} = opt
    
    const options:any = {
      url: "/zlwj/api/system/sys/sys-company/page",
      method: "get",
      data: {...params, companyAddress: params.companyAddress.join()}
    }
    optionList({options: options,dispatch,keyName: "companys", obj: obj, next:next, refresh:refresh, type:type})
    
    // try{
    //   const options:any = {
    //     url: "/zlwj/api/system/sys/sys-company/page",
    //     method: "get",
    //     data: params
    //   }
    //   let key = options.url+JSON.stringify(options.data)
    //   let isCache = MC.get(key)
      
    //   if(!isCache){
    //     dispatch({
    //       type: COMPANY_LOADING_START
    //     })
    //     let data:any = await fetch(options)
    //     MC.put(key, data)
    //     dispatch({
    //       type: COMPANY_LOADING_END,
    //       companys: data
    //     })
    //   }else{
    //     if(obj){
    //       let index = _.findIndex(isCache.list, (o:any)=>o.id==obj.id)
    //       isCache.list[index] = _.assign(isCache.list[index], obj);
    //       MC.put(key, isCache)
    //       dispatch({
    //         type: COMPANY_LOADING_NOT,
    //         companys: isCache
    //       })
    //     }else{
    //       dispatch({
    //         type: COMPANY_LOADING_END,
    //         companys: isCache
    //       })
    //     }
        
    //   }
      
    // }catch(e){
    //   console.log(e)
    //   dispatch({type: COMPANY_LOADING_END})
    // }
  }
}
