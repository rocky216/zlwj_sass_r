import {STATIS_LOADING_START, STATIS_LOADING_END, STATIS_LOADING_NOT} from "@power/constant/statisTypes"


let initialState = {
  spinning: false,
}

const statisReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case STATIS_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case STATIS_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case STATIS_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default statisReducer;