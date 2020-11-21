import {USER_LOADING_START, USER_LOADING_END, USER_LOADING_NOT} from "@admin/constant/user"
import {fetch} from "@public/utils"
import MC from "memory-cache"
import _ from "lodash"


/**
 * list API公共方法
 * 
 */
interface OptionListProps{
  options: any;
  dispatch:any;
  keyName: string;
  obj?:any;
  next?:(...arg0:any)=>void;
  type?:string;  //"add" | "edit"
  refresh?: boolean
}

interface ParamsListProps{
  params: any;
  obj?:any;
  next?:(...arg0:any)=>void;
  type?:string;  //"add" | "edit"
  refresh?: boolean
}
// options:any,keyName:string, obj?:any, next?:(...arg0:any)=>void
const optionList = async (opt: OptionListProps)=>{
    const {options,dispatch, keyName, obj, next, type, refresh} = opt;
    try{
      let key = options.url+JSON.stringify(options.data)
      let isCache = MC.get(key)
      
    if(!isCache || refresh){
      dispatch({
        type: USER_LOADING_START
      })
      let data:any = await fetch(options)
      if(next)next(data)
      MC.put(key, data)
      dispatch({
        type: USER_LOADING_END,
        [keyName]: data
      })
    }else{
      if(obj && _.size(obj)){
        let index = _.findIndex(isCache.list, (o:any)=>o.id==obj.id)
        if(type=="edit"){
          isCache.list[index] = _.assign(isCache.list[index], obj);
        }else if(type=="add"){
          isCache.list[index] = _.assign(isCache.list[index], obj);
        }

        MC.put(key, isCache)
        dispatch({
          type: USER_LOADING_NOT,
          [keyName]: isCache
        })
      }else{
        dispatch({
          type: USER_LOADING_END,
          [keyName]: isCache
        })
      }
      
    }
    
  }catch(e){
    console.log(e)
    dispatch({type: USER_LOADING_END})
  }
  
}


export const getUsers = (opt:any)=>{
  return async (dispatch:Function, getState:any)=>{

    const {params, obj, next, type, refresh=false} = opt
    const options:any = {
      url: "/zlwj/api/system/sys/sys-user/page",
      method: "get",
      data: params
    }
    optionList({
      options,
      dispatch,
      keyName: "users", obj, next, refresh, type})
  }
}
