import {OTHER_LOADING_START, OTHER_LOADING_END, OTHER_LOADING_NOT} from "@plate/constant/otherTypes"
import { gCompanyHe, gRtime } from "@public/utils"
import {storetApi, stateApi, OptProps} from "@public/utils/action"
import _ from "lodash"
import moment from "moment"
const ACTION = "OTHER"


export const getPlateMoneyByTime = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-data/selectPlateMoneyByTime",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "platebytime", dispatch, ACTION, opt)
  }
}

export const getPlateIncome = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-data/selectPlateIncome",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "changecount", dispatch, ACTION, opt)
  }
}

export const getPlatePassRecord = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-data/platePassRecord",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "platerecord", dispatch, ACTION, opt)
  }
}


export const getIncomeCount = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-data/incomeCount",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "incomecount", dispatch, ACTION, opt)
  }
}

export const getSelectThirty = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-online/selectThirty",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getDeviceonLineLog = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-online/onlineInfo",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getDeviceInfo = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-device/getById",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const addOrUpTypeCallback = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-device-type/addOrUpTypeCallback",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const changeDeviceTypeConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-device-type/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getDeviceTypeConf = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-device-type/page",
      method: "get",
      data: params
    }
    storetApi(options, "devicetype", dispatch, ACTION, opt)
  }
}

export const changeDeviceConf = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-device/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}


export const getDeviceConf = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-device/page",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        ...gCompanyHe(params.companyHe),
        isHave: params.isHave?1:0,
      }
    }
    storetApi(options, "deviceconf", dispatch, ACTION, opt)
  }
}

export const changeSysBwlist = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-system-black-white-list/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getSysBwlist = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-system-black-white-list/page",
      method: "get",
      data: params
    }
    storetApi(options, "sysbwlist", dispatch, ACTION, opt)
  }
}

export const changeBwlist = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-item-black-white-list/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getBwlist = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-item-black-white-list/page",
      method: "get",
      data: params
    }
    storetApi(options, "bwlist", dispatch, ACTION, opt)
  }
}

export const changeRegstrict = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-item-license-region-forbid/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getRegstrict = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-item-license-region-forbid/page",
      method: "get",
      data: {
        ...params,
        openState: params.openState?1:0
      }
    }
    storetApi(options, "regstrict", dispatch, ACTION, opt)
  }
}

export const relieveElecfence = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-license-fence/relieveEnclosure",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const changeElecfence = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-license-fence/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getElecfence = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-license-fence/page",
      method: "get",
      data: {
        ...params,
        openState: params.openState?1:0
      }
    }
    storetApi(options, "elecfence", dispatch, ACTION, opt)
  }
}

export const getPlatePassRecordPages = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-pass-record/selectPlatePassRecordPages",
      method: "get",
      data: {
        ...(_.omit(params, ["rtime"])),
        ...gRtime(params.rtime, "startTime", "endTime"),
        isMoney: params.isMoney?1:0,
        parkId: params.parkId.length?params.parkId[params.parkId.length-1]:""
      } 
    }
    storetApi(options, "accesslog", dispatch, ACTION, opt)
  }
}

export const createCodeState = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-active-code/createState",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const changeAccessCode = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-active-code/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getAccessCode = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-active-code/page",
      method: "get",
      data: {
        ...(_.omit(params, ["rtime"])),
        ...gRtime(params.rtime, "startTime", "endTime")
      } 
    }
    storetApi(options, "accesscode", dispatch, ACTION, opt)
  }
}