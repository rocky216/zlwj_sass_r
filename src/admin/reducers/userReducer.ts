import {USER_LOADING_START, USER_LOADING_END, USER_LOADING_NOT} from "@admin/constant/user"

let initialState = {
  spinning: false,
  
}

const companyReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case USER_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case USER_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case USER_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default companyReducer;