import {OTHER_LOADING_START, OTHER_LOADING_END, OTHER_LOADING_NOT} from "@admin/constant/other"

let initialState = {
  spinning: false,
  
}

const otherReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case OTHER_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case OTHER_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case OTHER_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default otherReducer;