import {HOME_LOADING_START, HOME_LOADING_END, HOME_LOADING_NOT} from "@plate/constant/homeTypes"

let initialState = {
  spinning: false,
}

const homeReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case HOME_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case HOME_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case HOME_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default homeReducer;