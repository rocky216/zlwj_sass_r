import {APP_LOADING_START, APP_LOADING_END, APP_LOADING_NOT} from "@power/constant/appTypes"
import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "APP"


export const saveSysMenusTree = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/system/sys/sys-menus-tree/save",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getCompanyHeShe = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-shed/powerShedList",
      method: "get",
      data: params
    }
    storetApi(options, "companyheshe", dispatch, ACTION, {})
  }
}

export const getCompanyHeMeter = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-meter/powerMeterList",
      method: "get",
      data: params
    }
    storetApi(options, "companyhemeter", dispatch, ACTION, {})
  }
}

export const getCompanyHe = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/system/sys/sys-company/companyItemList",
      method: "get",
      data: params
    }
    storetApi(options, "companyhe", dispatch, ACTION, {})
  }
}

export const getBase = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/system-module/initCompanyItem",
      method: "post",
      data: params
    }
    storetApi(options, "base", dispatch, ACTION, {})
  }
}

