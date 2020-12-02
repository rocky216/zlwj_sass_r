import {combineReducers} from "redux"
import appReducer from "./appReducer"
import projectReducer from "./projectReducer"

export default combineReducers({
  app: appReducer,
  project: projectReducer,
})