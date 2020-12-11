import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "MONITOR"
import {OptProps} from "@public/utils/action"
import _ from "lodash"
import {gRtime} from "@public/utils"


export const getPowerMonitorOrder = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order/selectPowerMonitorOrder",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
        ...gRtime(params.rtime, "startDate", "endDate")
      }
    }
    storetApi(options, "monitororder", dispatch, ACTION, opt)
  }
}


export const getPowerAvgorder = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/selectDeviceOrderPage",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "poweravgorder", dispatch, ACTION, opt)
  }
}

export const getPowerAvgport = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/selectDevicePortAvgPage",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "poweravgport", dispatch, ACTION, opt)
  }
}

export const getPowerOffline = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/deviceOfflinePage",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "poweroffline", dispatch, ACTION, opt)
  }
}

export const getPowerSignal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/signalPage",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "powersignal", dispatch, ACTION, opt)
  }
}

export const getPowerDevice = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/page",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "onlinePdevice", dispatch, ACTION, opt)
  }
}

export const getFusePortTotal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/fusePortTotal",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "devicefuse", dispatch, ACTION, opt)
  }
}

export const getDeviceSignalTotal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/signalTotal",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "devicesignal", dispatch, ACTION, opt)
  }
}

export const getDevicesDays = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-device/orderTotal",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "devicesday", dispatch, ACTION, opt)
  }
}