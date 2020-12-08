import React from "react"
import { InputNumber, Select, Space } from "antd"

const {Option} = Select

interface Props {
  value?:any;
  onChange?:any;
}

const Memcerconf:React.FC<Props> = ({
  value,
  onChange
})=>{
  return (
    <Space>
      <Select></Select>
      <div>
        价格<InputNumber/>元
      </div>
      <div>
        每日<InputNumber/>分钟
      </div>
    </Space>
  )
}

export default Memcerconf;