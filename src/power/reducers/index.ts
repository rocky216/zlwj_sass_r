import {combineReducers} from "redux"
import appReducer from "./appReducer"
import projectReducer from "./projectReducer"
import activeReducer from "./activeReducer"
import cardReducer from "./cardReducer"
import changeReducer from "./changeReducer"

export default combineReducers({
  app: appReducer,
  project: projectReducer,
  active: activeReducer,
  card: cardReducer,
  change: changeReducer,
})