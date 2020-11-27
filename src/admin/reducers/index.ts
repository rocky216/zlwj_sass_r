import {combineReducers} from "redux"
import appReducer from "./appReducer"
import companyReducer from "./companyReducer"
import userReducer from "./userReducer"
import systemReducer from "./systemReducer"
import messageReducer from "./messageReducer"
import otherReducer from "./otherReducer"




export default combineReducers({
  app: appReducer,
  company: companyReducer,
  user: userReducer,
  system:systemReducer,
  message: messageReducer,
  other: otherReducer
})