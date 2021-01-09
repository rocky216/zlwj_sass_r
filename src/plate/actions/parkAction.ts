import {APP_LOADING_START, APP_LOADING_END, APP_LOADING_NOT} from "@plate/constant/appTypes"
import { gRtime } from "@public/utils"
import {storetApi, stateApi, OptProps} from "@public/utils/action"
import _ from "lodash"
const ACTION = "PARK"





export const changegetParkCar = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    if(params.objective=="add" || params.objective=="add"){
      params = {
        ...(_.omit(params, ["rtime"])),
        ...gRtime(params.rtime, "startTime", "expireTime"),
      }
    }
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-license/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getParkCar = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-license/page",
      method: "get",
      data: params 
    }
    storetApi(options, "parkcar", dispatch, ACTION, opt)
  }
}

export const changeLeaseActive = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    if(params.objective=="add" || params.objective=="update"){
      params = {
        ...params,
        activityNum: params.activityNum.activityNum,
        activityType: params.activityNum.activityType,
      }
    }
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-park-seat-activity/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getLeaseActive = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-park-seat-activity/list",
      method: "get",
      data: params 
    }
    storetApi(options, "leaseactive", dispatch, ACTION, opt)
  }
}

export const changeLotParkLease = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-park-car-seat/insertBachCarSeat",
      method: "post",
      data: {
        ...params,
        prefix: params.prefix.prefix,
        startIndex: params.prefix.startIndex,
        endIndex: params.prefix.endIndex,
      }
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const changeParkLease = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-park-car-seat/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getParkLease = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-park-car-seat/page",
      method: "get",
      data: params 
    }
    storetApi(options, "parklease", dispatch, ACTION, opt)
  }
}

export const getParkDevice = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-device/list",
      method: "get",
      data: params 
    }
    storetApi(options, "parkdevice", dispatch, ACTION, opt)
  }
}

export const changeAccessCode = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-active-auth-tem/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getAccessCode = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-active-auth-tem/list",
      method: "get",
      data: params 
    }
    storetApi(options, "accesscode", dispatch, ACTION, opt)
  }
}

export const deleteCustomCarFee = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-fee-group/delById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const statusCustomCarFee = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-fee-group/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const changeCustomCarFee = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-fee-group/addOrUpParkGroup",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getCustomCarFee = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-fee-group/list",
      method: "get",
      data: params 
    }
    storetApi(options, "cuscarfree", dispatch, ACTION, opt)
  }
}

export const addVisitorCarFee = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-visitor-fee-rule/addOrUpVisitor",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getVisitorCarFee = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-visitor-fee-rule/selectByParkId",
      method: "get",
      data: params 
    }
    storetApi(options, "viscarfree", dispatch, ACTION, opt)
  }
}

export const addOrUpForeignFee = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-foreign-fee-rule/addOrUpForeignFee",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getForeignCarFee = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-foreign-fee-rule/selectByParkId",
      method: "get",
      data: params 
    }
    storetApi(options, "forecarfree", dispatch, ACTION, opt)
  }
}

export const deleteFeeList = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-fee-site/delById",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const changeFeeList = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-fee-site/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getFeeList = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-fee-site/selectFeeList",
      method: "get",
      data: params 
    }
    storetApi(options, "feelist", dispatch, ACTION, opt)
  }
}

export const addOrUpMch = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-mch/addOrUpMch",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getMerchant = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-mch/selectByParkId",
      method: "get",
      data: params 
    }
    storetApi(options, "merchant", dispatch, ACTION, opt)
  }
}

export const addOrUpParkConfig = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-config/addOrUpParkConfig",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getParkAvailNumber = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-config/updateParkNumber",
      method: "get",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}


export const getByParkConf = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking-config/getByPark",
      method: "get",
      data: params 
    }
    storetApi(options, "parkconf", dispatch, ACTION, opt)
  }
}

export const getParkBase = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking/getById",
      method: "get",
      data: params 
    }
    storetApi(options, "parkbase", dispatch, ACTION, opt)
  }
}

export const changePark = (params:any, next?:(...arg:any)=>void)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking/composite",
      method: "post",
      data: params
    }
    stateApi(options, dispatch, ACTION, next)
  }
}

export const getParkList = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/plate/sys/plate-parking/selectParkByItem",
      method: "get",
      data: params 
    }

    const hData = (data:any)=>{
      _.each(data, item=>{
        item.children = item.children.length?item.children:null
      })
      return data;
    }

    storetApi(options, "parktree", dispatch, ACTION, {...opt, hData})
  }
}

