import {HOME_LOADING_START, HOME_LOADING_END, HOME_LOADING_NOT} from "@plate/constant/homeTypes"
import { gCompanyHe, gRtime } from "@public/utils"
import {storetApi, stateApi, OptProps} from "@public/utils/action"
import _ from "lodash"
import moment from "moment"
const ACTION = "HOME"


export const changeHomeData = (params:any)=>{
  return async (dispatch:any, getState:any)=>{
    const {devicelist, online, passlog, plateNum, todaypay} = getState().home;
    const {cmd, data} = params
    
    if(cmd==="online_update"){
      if(data.online==1){
        online.onCount+=1
        online.offCount-=1
      }
      if(data.online==0){
        online.offCount+=1
        online.onCount-=1
      }
      let i = _.findIndex(devicelist, (o:any)=>o.iotId == data.iotId)
      devicelist[i] = data
      dispatch({
        type:`${ACTION}_LOADING_NOT`,
        online: _.cloneDeep(online),
        devicelist: _.cloneDeep(devicelist),
      })
    }

    if(cmd==="order"){

      if(data.orderState==0 || data.orderState==2){
        plateNum.stop+=1
        plateNum.noStop-=1
      }else if (data.orderState==1){
        plateNum.noStop+=1
        plateNum.stop-=1
      }

      if(data.orderState == 1 && (data.passState == 1 ||data.passState == 2 ||data.passState == 3 ||data.passState == 4 )){
        todaypay.sum = todaypay.sum+data.money
        todaypay.passSum = todaypay.passSum+data.money
      }

      passlog.unshift(data)
      dispatch({
        type:`${ACTION}_LOADING_NOT`,
        passlog: _.cloneDeep(passlog),
        plateNum: _.cloneDeep(plateNum),
        todaypay: _.cloneDeep(todaypay),
      })
    }

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


