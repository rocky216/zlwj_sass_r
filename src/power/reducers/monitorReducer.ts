import {MONITOR_LOADING_START, MONITOR_LOADING_END, MONITOR_LOADING_NOT} from "@power/constant/monitorTypes"


let initialState = {
  spinning: false,
}

const monitorReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case MONITOR_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case MONITOR_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case MONITOR_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default monitorReducer;