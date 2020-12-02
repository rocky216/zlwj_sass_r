import {APP_LOADING_START, APP_LOADING_END, APP_LOADING_NOT} from "@power/constant/appTypes"
import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "APP"


export const getCompanyProject = (params:any, next?:Function)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/system/sys/sys-item/page",
      method: "get",
      data: params
    }
    storetApi(options, "companyproject", dispatch, ACTION, {})
  }
}

