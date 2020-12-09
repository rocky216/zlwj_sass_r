import {CHANGE_LOADING_START, CHANGE_LOADING_END, CHANGE_LOADING_NOT} from "@power/constant/changeTypes"


let initialState = {
  spinning: false,
}

const changeReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case CHANGE_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case CHANGE_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case CHANGE_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default changeReducer;