import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "PROJECT"
import {OptProps} from "@public/utils/action"
import _ from "lodash"
import moment from "moment"


export const addTypeCallback = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device-type/addTypeCallback",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const deletePowerDevicetype = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device-type/deleteType",
      method: "post",
      data: params,
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const changePowerDevicetype = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device-type/composite",
      method: "post",
      data: params,
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getPowerDevicetype = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device-type/page",
      method: "get",
      data: params
    }
    storetApi(options, "devicetype", dispatch, ACTION, opt)
  }
}

export const getSeparaccountLog = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-partner-account-order-desc/page",
      method: "get",
      data: {
        ...(_.omit(params,"companyHe")),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "separaccountlog", dispatch, ACTION, opt)
  }
}

export const deleteSeparaccount = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-partner/delPartnerId",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const editSeparaccountList = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-partner/updatePartner",
      method: "post",
      data: {...params, partnerJson: params.partnerJson.join()}
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const addSeparaccountList = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-partner/addPartner",
      method: "post",
      data: {...params, partnerJson: params.partnerJson.join()}
    }
    stateApi(options, dispatch, ACTION, next)
  }
}


export const getSeparaccountList = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-partner/page",
      method: "get",
      data: {
        ...(_.omit(params,"companyHe")),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "separaccount", dispatch, ACTION, opt)
  }
}

export const getTreeDayStatic = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/selectThirtyData",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}


export const getDateSignal = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-signal/dateSignal",
      method: "get",
      data: {
          ...(_.omit(params, "rtime")), 
          startTime: params.rtime && params.rtime[0]?moment(params.rtime[0]).format("YYYY-MM-DD hh:mm:ss"):"",
          endTime: params.rtime && params.rtime[1]? moment(params.rtime[1]).format("YYYY-MM-DD hh:mm:ss") : "",
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

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