import {APP_LOADING_START, APP_LOADING_END, APP_LOADING_NOT} from "@plate/constant/appTypes"
import {storetApi, stateApi, OptProps} from "@public/utils/action"
const ACTION = "APP"


export const getAllDevice = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-device-type/selectDeviceTypeList",
      method: "get",
      data: params 
    }
    storetApi(options, "alldevice", dispatch, ACTION, opt)
  }
}

export const downloadFile = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/resource/file/downloadFile",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}


export const getOnlyPark = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking/selectByCompany",
      method: "post",
      data: params 
    }
    storetApi(options, "onlypark", dispatch, ACTION, opt)
  }
}

export const getParkAll = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking/selectParkByItem",
      method: "get",
      data: params 
    }
    storetApi(options, "allpark", dispatch, ACTION, opt)
  }
}

export const getAuthUser = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-active-auth-tem/selectAuthList",
      method: "get",
      data: params 
    }
    storetApi(options, "authuser", dispatch, ACTION, opt)
  }
}


export const excelImportFile = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-license/excelImportPlate",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getFeeGroup = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-fee-group/selectFeeGroup",
      method: "get",
      data: params 
    }
    storetApi(options, "feegroup", dispatch, ACTION, opt)
  }
}

export const getBaseInfo = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/system-module/selectTemAndSystemItem",
      method: "get",
      data: params
    }
    storetApi(options, "base", dispatch, ACTION, opt)
  }
}

export const getRegions = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/system/area/cityArea",
      method: "get",
      data: params
    }
    storetApi(options, "region", dispatch, ACTION, opt)
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

export const companyItemInitial = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/system-module/initCompanyItem",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}
