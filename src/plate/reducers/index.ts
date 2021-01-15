import {combineReducers} from "redux"
import appReducer from "./appReducer"
import parkReducer from "./parkReducer"
import otherReducer from "./otherReducer"



export default combineReducers({
  app: appReducer,
  park: parkReducer,
  other: otherReducer,
})