import {ACTIVE_LOADING_START, ACTIVE_LOADING_END, ACTIVE_LOADING_NOT} from "@power/constant/activeTypes"


let initialState = {
  spinning: false,
}

const activeReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case ACTIVE_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case ACTIVE_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case ACTIVE_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default activeReducer;