import {OTHER_LOADING_START, OTHER_LOADING_END, OTHER_LOADING_NOT} from "@plate/constant/otherTypes"
import { gCompanyHe, gRtime } from "@public/utils"
import {storetApi, stateApi, OptProps} from "@public/utils/action"
import _ from "lodash"
import moment from "moment"
const ACTION = "HOME"


export const changeHomeData = (params:any)=>{
  return async (dispatch:any, getState:any)=>{
    
  }
}

export const getWeekPass = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-kanban/selectWeekPassCount",
      method: "get",
      data: params
    }
    storetApi(options, "weekpass", dispatch, ACTION, opt)
  }
}

export const getWeekSumMoney = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-kanban/selectWeekSumMoney",
      method: "get",
      data: params
    }
    storetApi(options, "weeksum", dispatch, ACTION, opt)
  }
}

export const getOrderInfoMoney = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-kanban/orderInfoMoney",
      method: "get",
      data: params
    }
    storetApi(options, "todaypay", dispatch, ACTION, opt)
  }
}

export const getPassTwentyFour = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-kanban/passTwentyFour",
      method: "get",
      data: params
    }
    storetApi(options, "twentyFour", dispatch, ACTION, opt)
  }
}

export const getPassLog = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-kanban/selectMidKanban",
      method: "get",
      data: params
    }
    storetApi(options, "passlog", dispatch, ACTION, opt)
  }
}

export const getDeiveList = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-kanban/selectDeviceList",
      method: "get",
      data: params
    }
    storetApi(options, "devicelist", dispatch, ACTION, opt)
  }
}

export const getPassPlate = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-kanban/systemInfo",
      method: "get",
      data: params
    }
    storetApi(options, "passplate", dispatch, ACTION, opt)
  }
}

export const getDeviceOnline = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-kanban/deviceOnlineInfo",
      method: "get",
      data: params
    }
    storetApi(options, "online", dispatch, ACTION, opt)
  }
}

export const getPlateNum = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-kanban/orderInfo",
      method: "get",
      data: params
    }
    storetApi(options, "plateNum", dispatch, ACTION, opt)
  }
}


