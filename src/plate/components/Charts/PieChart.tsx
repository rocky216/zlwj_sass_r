import React from "react"
import { Pie } from '@ant-design/charts';

interface Props {
  data:any[];
  angleField:string;
  colorField:string;
  height?: number;
  label?:any;
  appendPadding?:number[];
  legend?:any;
  radius?:number;
}

const PieChart:React.FC<Props> = ({
  data,
  angleField,
  colorField,
  height=200,
  appendPadding=[8,0,8,0],
  label={
    type: "outer",
    content: '{percentage}',
  },
  legend,
  radius,
})=>{

  const config = {
    angleField,
    colorField,
    data,
    height,
    appendPadding,
    interactions: [{ type: 'element-active' }],
    label,
    legend,
    radius,
  }

  return (
    <Pie {...config} />
  )
}

export default PieChart;
