import MC from "memory-cache"
import {fetch} from "@public/utils"
import { Method } from "axios";
import _ from "lodash";


interface OptionsProps {
  url: string;
  method: Method;
  data?:any;
  del?:string;
}

export interface OptProps {
  refresh?:boolean;
  next?: (...arg:any)=>void;
  type?: string; //edit | add | delete
  obj?: any;
  hData?:<T>(arg:T)=>T;
}
//缓存调试
// MC.debug(true)

export const storetApi = async (options:OptionsProps, keyName:string, dispatch:any, ACTION:string, opt?:OptProps)=>{
  const {refresh=false, next, type, obj, hData} = opt || {};
  try{
    let key = options.url+JSON.stringify(options.data)
    let isCache = MC.get(key)
    
    if(!isCache || refresh ){
      
      dispatch({
        type: `${ACTION}_LOADING_START`
      })
      let data = await fetch(options)
      
      if(hData){
        data = hData(data)
      }
      
      if(next)next(data)
      MC.put(key, data)
      dispatch({
        type: `${ACTION}_LOADING_END`,
        [keyName]: data
      })
    }else{
      
      if(obj && _.size(obj)){
        let index = _.findIndex(isCache.list, (o:any)=>o.id==obj.id)
        if(type=="edit"){
          isCache.list[index] = _.assign(isCache.list[index], obj);
        }else if(type=="add"){
          isCache.list[index] = _.assign(isCache.list[index], obj);
        }else if(type=="obj"){
          isCache = _.assign(isCache, obj);
        }else if(type=="list"){
          let i = _.findIndex(isCache, (o:any)=>o.id==obj.id)
          isCache[i] = _.assign(isCache[i], obj);
        }
        MC.put(key, isCache)
        dispatch({
          type: `${ACTION}_LOADING_NOT`,
          [keyName]: isCache
        })
      }else{
        dispatch({
          type: `${ACTION}_LOADING_END`,
          [keyName]: isCache
        })
        if(next)next(isCache)
      }
    }
  }catch(e){
    console.log(e)
    dispatch({
      type: `${ACTION}_LOADING_END`,
    })
  }

}

export const stateApi = async (options: OptionsProps, dispatch:any, ACTION:string, next?:(...arg:any)=>void)=>{
  
  try{
    dispatch({
      type: `${ACTION}_LOADING_START`,
    })

    let data:any = await fetch(options)
    if(next)next(data)
    // if(options.del){
    //   MC.del(options.del)
    // }
    dispatch({
      type: `${ACTION}_LOADING_END`,
    })
    
  }catch(e){
    console.log(e)
    dispatch({type: `${ACTION}_LOADING_END`})
  }
}