import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "CHANGE"
import {OptProps} from "@public/utils/action"
import _ from "lodash"
import {gRtime} from "@public/utils"


export const getseparaaccountDetail = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-partner-account-order/getById",
      method: "get",
      data: params
    }
    storetApi(options, "acountdetail", dispatch, ACTION, opt)
  }
}

export const cancelSeparaAccoun = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-partner-account-order/delPartnerAccountOrder",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const addSeparaAccountLog = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-partner-account-order/addOrderDesc",
      method: "post",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
        orderDescJson: JSON.stringify(params.orderDescJson.list),
        orderFee: params.orderDescJson.orderFee
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getPartnerList = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-partner-com-item/partnerList",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getSeparaAccountLog = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-partner-account-order/page",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
        ...gRtime(params.rtime, "startTime", "endTime"),
      }
    }
    storetApi(options, "separac", dispatch, ACTION, opt)
  }
}

export const cancelElectfees = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-metert-order/cancellationMeterOrder",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getElectfeesDetail = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-meter-order-desc/selectMeterOrderDesc",
      method: "get",
      data: params
    }
    storetApi(options, "electdetail", dispatch, ACTION, opt)
  }
}

export const addElectfees = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-metert-order/insertPowerMeterOrder",
      method: "post",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
        meterDtoList: JSON.stringify(params.meterDtoList.electricSum),
        beforeNumber: params.meterDtoList.beforeNumber,
        addNumber: params.meterDtoList.addNumber,
        totalDegrees: params.meterDtoList.beforeNumber+params.meterDtoList.addNumber
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getWatts = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-meter/powerMeterList",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getElectfees = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-metert-order/page",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
        ...gRtime(params.rtime, "startDate", "endDate"),
      }
    }
    storetApi(options, "electfee", dispatch, ACTION, opt)
  }
}


export const getcardOrder = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-card-recharge-order/page",
      method: "get",
      data: {
        ...(_.omit(params, ["rtime"])),
        ...gRtime(params.rtime, "startTime", "endTime"),
      }
    }
    storetApi(options, "cardorder", dispatch, ACTION, opt)
  }
}

export const getCouponOrder = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order/page",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
        ...gRtime(params.rtime, "startDate", "endDate"),
        orderType: "3",
        couponType: "VIP"
      }
    }
    storetApi(options, "couponorder", dispatch, ACTION, opt)
  }
}

export const getPowerOrder = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order/page",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        companyId: params.companyHe[0]||"",
        itemId: params.companyHe[1]||"",
        ...gRtime(params.rtime, "startDate", "endDate"),
        haveRefund: params.haveRefund?1:0,
        haveReset: params.haveReset?1:0,
      }
    }
    storetApi(options, "powerorder", dispatch, ACTION, opt)
  }
}