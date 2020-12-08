import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "CARD"
import {OptProps} from "@public/utils/action"
import _ from "lodash"
import moment, { Moment } from "moment"


export const RechargeCardUser = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-card/carPay",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const deleCardUser = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-card/removeById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const endLinkCardLog = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-card-balance-flow/page",
      method: "get",
      data: params
    }
    storetApi(options, "linkcardlog", dispatch, ACTION, opt)
  }
}

export const endLinkCardUser = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-user-card/updateStatus",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getLinkCardUser = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-user-card/selectUserCard",
      method: "get",
      data: params
    }
    storetApi(options, "linkcard", dispatch, ACTION, opt)
  }
}

export const editPowerCard = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-card/updateById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const addPowerCard = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-card/saveBatchPowerCard",
      method: "post",
      data: {...params, cardList: JSON.stringify(params.cardList) }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getCreateCardUserName = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-card/getUserInfo",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getCardList = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-card/page",
      method: "get",
      data: params
    }
    storetApi(options, "cards", dispatch, ACTION, opt)
  }
}