import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "PROJECT"
import {OptProps} from "@public/utils/action"
import _ from "lodash"


export const getDeviceOnlineLog = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-online/deviceOnlineLog",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getDeviceBaseDetail = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/getById",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const createDevicePort = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/adddDevicePort",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const editDevice = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/updateById",
      method: "post",
      data: {
        ...(_.omit(params,"companyHe")),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const addDevice = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/save",
      method: "post",
      data: {
        ...(_.omit(params,"companyHe")),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const deleteDevice = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/deleteById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const statusDevice = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/enable",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getDeviceList = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/page",
      method: "get",
      data: {
        ...(_.omit(params,"companyHe")),
        isDistribution: params.isDistribution?1:0,
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "devices", dispatch, ACTION, opt)
  }
}

export const deleteWattConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-meter/delById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const editWattConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-meter/updateById",
      method: "post",
      data: {
        ...(_.omit(params, "companyHe")), 
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const addWattConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-meter/save",
      method: "post",
      data: {
        ...(_.omit(params, "companyHe")), 
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const statusWattConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-meter/updateStatus",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getWattConfList = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-meter/page",
      method: "get",
      data: {
        ...(_.omit(params, "companyHe")), 
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "wattconf", dispatch, ACTION, opt)
  }
}

export const deleteSheConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-shed/removeById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const editSheConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-shed/updateById",
      method: "post",
      data: {
        ...(_.omit(params, "companyHe")), 
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const addSheConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-shed/save",
      method: "post",
      data: {
        ...(_.omit(params, "companyHe")), 
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const statusSheConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-shed/enable",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getShedConfList = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-shed/page",
      method: "get",
      data: params
    }
    storetApi(options, "sheconf", dispatch, ACTION, opt)
  }
}

export const getProConfList = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-config/page",
      method: "get",
      data: {...(_.omit(params, "companyHe")), companyId: params.companyHe[0]||"", itemId: params.companyHe[1]||""}
    }
    storetApi(options, "proconf", dispatch, ACTION, opt)
  }
}


export const statusProConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-config/enable",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const changeProConf = (params:any, next?:(...arg:any)=>void)=>{
  console.log(params)
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-config/saveOrUpdatePowerConfig",
      method: "post",
      data: {
        ...(_.omit(params, "companyHe")), 
        powerRuleList: JSON.stringify(params.powerRuleList), 
        powerFuseList: JSON.stringify(params.powerFuseList),
        companyId: params.companyHe[0]||"", 
        itemId: params.companyHe[1]||""
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}