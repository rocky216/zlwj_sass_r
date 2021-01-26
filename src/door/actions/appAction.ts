import {storetApi, stateApi, OptProps} from "@public/utils/action"
const ACTION = "APP"


export const getBaseInfo = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/control/system-module/selectTemAndSystemItem",
      method: "get",
      data: params
    }
    storetApi(options, "base", dispatch, ACTION, opt)
  }
}