import {createStore, applyMiddleware, compose} from "redux"
import reduxThunk from "redux-thunk"
import  createRootReducer  from "@power/reducers"
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export default function(){
  const store = createStore(
    createRootReducer(history),
    // applyMiddleware(reduxThunk),
    compose(
      applyMiddleware(
        reduxThunk,
        routerMiddleware(history), // for dispatching history actions
      ),
    ),
  )

  return store
}