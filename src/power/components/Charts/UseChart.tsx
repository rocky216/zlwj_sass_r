import React, { useEffect, useState } from "react"
import { Line, Column, DualAxes} from '@ant-design/charts';
import _ from "lodash";

type ChartTypes = "line" | "column" | "dualAxes" 

interface Props {
  data:any[];
  xField:any;
  yField:any;
  type: ChartTypes; 
  yFieldName?:any;
  geometryOptions?:any;
}
const UseChart:React.FC<Props> = ({
  type,
  data,
  xField,
  yField,
  yFieldName=yField,
  geometryOptions
})=>{

  let ref:any;

  const hMate = (arr:any[])=>{
    let obj:any={}
    _.each(arr, (item, index)=>{
      obj[item] = {
        alias: yFieldName[index]
      }
    })
    console.log(obj)
    return obj
  }

  var config:any = {
    data: data,
    xField,    
    yField,
    yAxis:{},
    meta: hMate(yField),
    geometryOptions
  };

  useEffect(() => {
  }, [data]);

  const ChartType = ()=>{
    switch(type){
      case "line":
        return <Line {...config} />
      case "column":
        return <Column {...config} />
      case "dualAxes":
        return <DualAxes {...config} />
    }
  }


  
  
  return ChartType();
}

export default UseChart;