import React from "react"
import loadable from "@loadable/component";

const lazy = (props: {loader: any})=>{
  const {loader} = props
  return loadable( function(){
    return loader
  } , {
    cacheKey: function(){
      return "key"
    },
    fallback: <div>正在加载。。。</div>
  })
}

export default lazy
