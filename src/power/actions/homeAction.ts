import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "HOME"
import {OptProps} from "@public/utils/action"
import _ from "lodash"
import moment, { Moment } from "moment"


export const getPowerOrderUnusualSum = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/index/powerOrderUnusualSum",
      method: "get",
      data: params
    }
    storetApi(options, "unusualsum", dispatch, ACTION, opt)
  }
}

export const getOrderWeekPay = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/orderWeek",
      method: "get",
      data: params
    }
    storetApi(options, "orderWeekPay", dispatch, ACTION, opt)
  }
}

export const getPowerToDayIncome = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/index/powerToDayIncome",
      method: "get",
      data: params
    }
    storetApi(options, "toDayIncome", dispatch, ACTION, opt)
  }
}

export const getOrderTopTen = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/orderTopTen",
      method: "get",
      data: params
    }
    storetApi(options, "orderTopTen", dispatch, ACTION, opt)
  }
}

export const getPowerOnline = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/index/powerOnline",
      method: "get",
      data: params
    }
    storetApi(options, "powerOnline", dispatch, ACTION, opt)
  }
}

export const getDeviceOnline = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/orderOnline",
      method: "get",
      data: params
    }
    storetApi(options, "deviceonline", dispatch, ACTION, opt)
  }
}

export const getOrderWeekSum = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/index/orderWeekSum",
      method: "get",
      data: params
    }
    storetApi(options, "orderWeekSum", dispatch, ACTION, opt)
  }
}

export const getDeviceSignal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/deviceSignal",
      method: "get",
      data: params
    }
    storetApi(options, "devicesignal", dispatch, ACTION, opt)
  }
}