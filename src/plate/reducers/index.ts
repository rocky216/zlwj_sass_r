import {combineReducers} from "redux"
import appReducer from "./appReducer"
import parkReducer from "./parkReducer"



export default combineReducers({
  app: appReducer,
  park: parkReducer
})