import {PARK_LOADING_START, PARK_LOADING_END, PARK_LOADING_NOT} from "@plate/constant/parkTypes"

let initialState = {
  spinning: false,
}

const parkReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case PARK_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case PARK_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case PARK_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default parkReducer;