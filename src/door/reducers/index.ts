import {combineReducers} from "redux"
import appReducer from "./appReducer"
import keychainReducer from "./keychainReducer"



export default combineReducers({
  app: appReducer,
  keychain: keychainReducer,
})