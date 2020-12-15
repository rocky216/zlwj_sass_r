import React from "react"
import { Pie } from '@ant-design/charts';

interface Props {
  data:any[];
  angleField:string;
  colorField:string;
  height?: number;
  label?:any;
  appendPadding?:number[];
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
  }
})=>{

  const config = {
    angleField,
    colorField,
    data,
    height,
    appendPadding,
    interactions: [{ type: 'element-active' }],
    label
  }

  return (
    <Pie {...config} />
  )
}

export default PieChart;
