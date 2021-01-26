import {storetApi, stateApi, OptProps} from "@public/utils/action"
const ACTION = "KEYCHAIN"

export const getAppkey = (params:any, opt:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/control/sys/app-key-apply/page",
      method: "get",
      data: params
    }
    storetApi(options, "appkey", dispatch, ACTION, opt)
  }
}