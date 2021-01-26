import {KEYCHAIN_LOADING_START, KEYCHAIN_LOADING_END, KEYCHAIN_LOADING_NOT} from "@door/constant/keychainTypes"

let initialState = {
  spinning: false,
}

const keychainReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case KEYCHAIN_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case KEYCHAIN_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case KEYCHAIN_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default keychainReducer;