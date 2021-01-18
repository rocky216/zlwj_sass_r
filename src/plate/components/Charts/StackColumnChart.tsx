import React from "react"
import { Column } from "@ant-design/charts"
import { ColumnConfig } from "@ant-design/charts/es/column"


interface Props extends ColumnConfig {
  
}

const StackColumnChart:React.FC<Props> = ({
  data,
  xField,
  yField,
  seriesField,
  groupField,
  isStack=true,
  height=500,
  columnWidthRatio=0.2,
  isGroup=false,
  legend,
})=>{

  const config = {
    data:data,
    xField,
    yField,
    seriesField,
    groupField,
    isStack,
    isGroup,
    height,
    columnWidthRatio,
    legend,

  }

  return <Column {...config} columnWidthRatio={0.35} />
}

export default StackColumnChart;