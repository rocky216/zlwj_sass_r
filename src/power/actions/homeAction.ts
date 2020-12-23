import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "HOME"
import {OptProps} from "@public/utils/action"
import _ from "lodash"
import moment, { Moment } from "moment"


export const changeHomeData = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
     let values = JSON.parse(params)
     const {cmd, data} = values
     const {deviceonline, powerOnline, orderTopTen, ordernowday, orderWeekSum, toDayIncome, orderWeekPay, unusualsum} = getState().home
     if(cmd==="online_update" && deviceonline && powerOnline ){
      data.online==1?deviceonline.deviceOnline++:deviceonline.deviceOff++;
      powerOnline.unshift(data)
      dispatch({
        type: `${ACTION}_LOADING_NOT`,
        deviceonline: _.cloneDeep(deviceonline),
        powerOnline: _.slice(powerOnline,0,10),
      })
     }else if(cmd==="order_update" && orderTopTen && orderWeekSum && toDayIncome && orderWeekPay && unusualsum){
      orderTopTen.unshift(data)
      console.log(data.orderStatus)
      if(data.orderStatus>3){
        ordernowday.orderSum = ordernowday.orderSum+1
        let i = _.findIndex(orderWeekSum, (o:any)=>data.buildTime.indexOf(o.type)>-1)
        orderWeekSum[i]["value"] = orderWeekSum[i]["value"]+1
        //今日收入， 余额订单， 充电卡订单
        toDayIncome.sum = toDayIncome.sum+data.realFee
        switch(data.orderType){
          case 1:
            toDayIncome.balance = toDayIncome.balance+1
            break;
          case 2:
            toDayIncome.card = toDayIncome.card+1
            break;
          case 3:
            toDayIncome.vip = toDayIncome.vip+1
            break;
        }
        if(data.orderStatus==4){
          ordernowday.inTheCharging = ordernowday.inTheCharging+1
        }
        //七日收入走势
        let iOrderWeekPay = _.findIndex(orderWeekPay, (o:any)=>data.buildTime.indexOf(o.month)>-1 && data.orderType==o.orderType)
        if(iOrderWeekPay>-1){
          orderWeekPay[iOrderWeekPay]["value"] = orderWeekPay[iOrderWeekPay]["value"]+data.realFee
        }

        //七日异常订单走势
        // let iUnusualsum = _.findIndex(unusualsum, (o:any)=>data.buildTime.indexOf(o.type)>-1 && data.orderStatus==o.orderStatus)
        // if(iOrderWeekPay>-1){
        //   unusualsum[iUnusualsum]["value"] = unusualsum[iUnusualsum]["value"]+data.realFee
        // }
      }

      dispatch({ //orderStatus
        type: `${ACTION}_LOADING_NOT`,
        orderTopTen: _.slice(orderTopTen,0,10),
        ordernowday: _.cloneDeep(ordernowday),
        orderWeekSum: _.cloneDeep(orderWeekSum),
        toDayIncome: _.cloneDeep(toDayIncome),
        orderWeekPay: _.cloneDeep(orderWeekPay),
        // unusualsum: _.cloneDeep(unusualsum),
      })
     }
  }
}

export const getToDayOrderSum = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/index/toDayOrderSum",
      method: "get",
      data: params
    }
    storetApi(options, "ordernowday", dispatch, ACTION, opt)
  }
}

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