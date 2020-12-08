import {CARD_LOADING_START, CARD_LOADING_END, CARD_LOADING_NOT} from "@power/constant/cardTypes"


let initialState = {
  spinning: false,
}

const cardReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case CARD_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case CARD_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case CARD_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default cardReducer;