import {combineReducers} from "redux"
import appReducer from "./appReducer"
import parkReducer from "./parkReducer"
import otherReducer from "./otherReducer"
import homeReducer from "./homeReducer"



export default combineReducers({
  app: appReducer,
  home: homeReducer,
  park: parkReducer,
  other: otherReducer,
})