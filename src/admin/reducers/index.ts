import {combineReducers} from "redux"
import appReducer from "./appReducer"
import companyReducer from "./companyReducer"
import userReducer from "./userReducer"



export default combineReducers({
  app: appReducer,
  company: companyReducer,
  user: userReducer
})