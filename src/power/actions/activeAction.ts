import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "ACTIVE"
import {OptProps} from "@public/utils/action"
import _ from "lodash"
import moment, { Moment } from "moment"


const gRtime = (arr: Moment[], sTime:string, eTime:string, format="YYYY-MM-DD")=>{
  if(!arr || !_.isArray(arr) || arr.length<2){
    return {
      [sTime]: "",
      [eTime]: "",
    }
  }
  return {
    [sTime]: moment(arr[0]).format(format),
    [eTime]: moment(arr[1]).format(format),
  }
}


export const getVipCouponConfig = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-coupon-config/vipCouponConfig",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getTocouponList = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-coupon-activity/page",
      method: "get",
      data: {
        activityType: "2",
        ...(_.omit(params,["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "tocoupon", dispatch, ACTION, opt)
  }
}

export const addMemcerActive = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-coupon-activity/save",
      method: "post",
      data: {
        ...(_.omit(params,["companyHe","rtime"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
        ...gRtime(params.rtime, "activityStartTime", "activityEndTime")
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const deleteActive = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-coupon-activity/deleteById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const statusActive = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-user-coupon/enable",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}


export const getMemcerList = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-coupon-activity/page",
      method: "get",
      data: {
        activityType: 1,
        ...(_.omit(params,["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    storetApi(options, "memcer", dispatch, ACTION, opt)
  }
}

export const getConponList = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-user-coupon/page",
      method: "get",
      data: {
        ...(_.omit(params,["companyHe", "rtime"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
        ...gRtime(params.rtime, "couponStartTiem", "couponEndTiem")
      }
    }
    storetApi(options, "conpon", dispatch, ACTION, opt)
  }
}
