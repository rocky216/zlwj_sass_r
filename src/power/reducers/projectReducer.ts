import {PROJECT_LOADING_START, PROJECT_LOADING_END, PROJECT_LOADING_NOT} from "@power/constant/projectTypes"


let initialState = {
  spinning: false,
}

const projectReducer = (state=initialState, action: any)=>{
  switch(action.type){
    case PROJECT_LOADING_START:
      return Object.assign({}, state, action, {spinning: true})
    case PROJECT_LOADING_END:
      return Object.assign({}, state, action, {spinning: false})
    case PROJECT_LOADING_NOT:
      return Object.assign({}, state, action)
    default:
      return state;
  }
}

export default projectReducer;