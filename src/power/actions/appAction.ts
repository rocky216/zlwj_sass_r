import {APP_LOADING_START, APP_LOADING_END, APP_LOADING_NOT} from "@power/constant/appTypes"
import {storetApi, stateApi, OptProps} from "@public/utils/action"
const ACTION = "APP"
let timer:any;



export const getDeviceTypeList = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device-type/deviceTypeList",
      method: "get",
      data: params
    }
    storetApi(options, "devicetype", dispatch, ACTION, opt)
  }
}

export const setRouteProps = (params:any)=>{
  return (dispatch:Function, getState:any)=>{
    clearTimeout(timer)
    timer = setTimeout(()=>{
      dispatch({
        type: APP_LOADING_NOT,
        level:params
      })
    }, 0)
  }
}

export const changeCompanyItem = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/system-module/cutCompanyItem",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getBaseInfo = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/system-module/selectTemAndSystemItem",
      method: "get",
      data: params
    }
    storetApi(options, "base", dispatch, ACTION, opt)
  }
}

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

