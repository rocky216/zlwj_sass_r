import React, { ReactNode } from "react"
import { Button, Card, Form, Input, InputNumber} from "antd"
import {ItemType, getNode} from "./getnode"
import { RetweetOutlined, SearchOutlined } from "@ant-design/icons";
import { FormLayout } from "antd/lib/form/Form";



interface Props {
  before?: ReactNode;
  data: ItemType[];
  submitSearch: Function;
  initialValues: any;
  resetValues?:any;
  layout?:FormLayout; //inline | vertical | horizontal
}

const SearchModular:React.FC<Props> = ({
  before,
  data,
  submitSearch,
  initialValues,
  resetValues,
  layout="inline"
})=>{
  const [form] = Form.useForm();

  const submitReset = ()=>{
    form.setFieldsValue(resetValues)
    submitSearch()
  }

  return (
    <Card size="small">
      <div className={layout=="inline"?"flexbetween":""} >
        <div style={layout=="inline"?{marginRight:30}:{marginBottom: 20}}  >
          {before}
        </div>
        <div>
          <Form form={form} 
            layout={layout}
            onFinish={(values)=>submitSearch(values)}
            initialValues={initialValues}
          > 
            {data.map((item, index)=>(
              <Form.Item
                key={index}
                label={item.label||null}
                name={item.name}
                initialValue={item.initialValue}
                valuePropName={item.valuePropName || "value"}
              >
                {getNode(item)}
              </Form.Item>
            ))}
            <Form.Item >
              <Button type="primary" ghost htmlType="submit" icon={<SearchOutlined />}>搜索</Button>
              {resetValues?
              <Button className="mgl10" onClick={submitReset} icon={<RetweetOutlined />}>重置</Button>:null}
            </Form.Item>
          </Form>
        </div>
      </div>
    </Card>
    
  )
}

export default SearchModular;