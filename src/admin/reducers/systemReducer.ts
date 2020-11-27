import {SYSTEM_LOADING_START, SYSTEM_LOADING_END, SYSTEM_LOADING_NOT} from "@admin/constant/system"

let initialState = {
  spinning: false,
  
}

const systemReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case SYSTEM_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case SYSTEM_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case SYSTEM_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default systemReducer;