import MC from "memory-cache"
import {fetch} from "@public/utils"
import { Method } from "axios";
import _ from "lodash";


interface OptionsProps {
  url: string;
  method: Method;
  data?:any;
}

interface OptProps {
  refresh?:boolean;
  next?: (...arg:any)=>void;
  type?: string; //edit | add | delete
  obj?: any;
}

export const storetApi = async (options:OptionsProps, keyName:string, dispatch:any, ACTION:string, opt:OptProps)=>{
  const {refresh=false, next, type, obj} = opt;
  try{
    let key = options.url+JSON.stringify(options.data)
    let isCache = MC.get(key)
    if(!isCache || refresh ){
      dispatch({
        type: `${ACTION}_LOADING_START`
      })
      let data = await fetch(options)
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
      }
    }
  }catch(e){
    console.log(e)
  }

}

export const stateApi = async (options: OptionsProps, dispatch:any, ACTION:string, next?:(...arg:any)=>void)=>{
  
  try{
    dispatch({
      type: `${ACTION}_LOADING_START`,
    })

    let data:any = await fetch(options)
    if(next)next(data)
    dispatch({
      type: `${ACTION}_LOADING_END`,
    })
    
  }catch(e){
    console.log(e)
    dispatch({type: `${ACTION}_LOADING_END`})
  }
}