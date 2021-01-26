import {APP_LOADING_START, APP_LOADING_END, APP_LOADING_NOT} from "@door/constant/appTypes"
import {getToken, OpenNotification, addIndex, Pagination, submitFiles, echoFiles, objectArray, tData} from "@public/utils"

let initialState = {
  spinning: false,
  token: getToken(),
  utils: {
    OpenNotification,
    addIndex,
    Pagination,
    getToken,
    submitFiles,
    echoFiles,
    objectArray,
    tData
  }
}

const appReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case APP_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case APP_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case APP_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default appReducer;