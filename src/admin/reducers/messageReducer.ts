import {MESSAGE_LOADING_START, MESSAGE_LOADING_END, MESSAGE_LOADING_NOT} from "@admin/constant/message"

let initialState = {
  spinning: false,
  
}

const messageReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case MESSAGE_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case MESSAGE_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case MESSAGE_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default messageReducer;