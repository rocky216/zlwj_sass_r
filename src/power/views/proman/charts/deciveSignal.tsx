import React, { useEffect, useState } from "react"
import { Line } from '@ant-design/charts';

interface Props {
  data:any[];
}
const DeciveSignal:React.FC<Props> = ({
  data
})=>{

  let ref:any;
  useEffect(() => {
    console.log(data)
  }, [data]);


  var config:any = {
    data: data,
    xField: 'addTime',    //'addTime',
    yField: 'signalSize',//'signalSize',
    yAxis:[],
  };
  
  return (
    <Line key="1" {...config} padding="auto"  chartRef={(chartRef) => (ref = chartRef)} />
  )
}

export default DeciveSignal;