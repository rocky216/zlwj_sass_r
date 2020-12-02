import React, { ReactNode } from "react"
import { Button, Form, Input, InputNumber} from "antd"
import {ItemType, getNode} from "./getnode"
import { RetweetOutlined, SearchOutlined } from "@ant-design/icons";


interface Props {
  before?: ReactNode;
  data: ItemType[];
  submitSearch: Function;
  initialValues: any;
  resetValues:any;
}

const SearchModular:React.FC<Props> = ({
  before,
  data,
  submitSearch,
  initialValues,
  resetValues
})=>{
  const [form] = Form.useForm();

  const submitReset = ()=>{
    form.setFieldsValue(resetValues)
    submitSearch()
  }

  return (
    <div className="flexbetween">
      <div style={{marginRight: 30}}>
        {before}
      </div>
      <div>
        <Form form={form} 
          onFinish={(values)=>submitSearch(values)}
          initialValues={initialValues}
        > 
          {data.map((item, index)=>(
            <Form.Item
              key={index}
              label={item.label||""}
              name={item.name}
              initialValue={item.initialValue}
            >
              {getNode(item)}
            </Form.Item>
          ))}
          <Form.Item >
            <Button type="primary" ghost htmlType="submit" icon={<SearchOutlined />}>搜索</Button>
            <Button className="mgl10" onClick={submitReset} icon={<RetweetOutlined />}>重置</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    
  )
}

export default SearchModular;