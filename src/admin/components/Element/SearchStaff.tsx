import { Button, Select, Spin } from "antd"
import React, { useState } from "react"
import {selectUser } from "@admin/actions/appAction"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import {debounce } from "lodash"

const {Option} = Select

interface Props {
   actions:any;
   value?:any;
   onChange?:any;
}


const SearchStaff:React.FC<Props> = ({
  actions,
  value,
  onChange
})=>{

  const [data, setData]:any[] = useState([])
  const [fetching, setFetching] = useState(false)

  const hSearch = (v:any) => {
    if(v){
      setFetching(true)
      actions.selectUser({
        phoneAccount: v
      }, (res:any)=>{
        console.log(res)
        setData(res)
        setFetching(false)
      })
    }
    
  };

  const handleSearch = debounce(hSearch, 800)



  return (
    <Select 
      showSearch
      value={value}
      onSearch={handleSearch}
      placeholder="输入搜索内容"
      filterOption={false}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      onChange={(v)=>{
        if(onChange){
          onChange(v)
        }
      }}
    >
      {data?data.map((item:any)=>(
        <Option key={item.temId} value={item.temId} >{item.userName}</Option>
      )):null}
    </Select>
  )

}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({selectUser}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
  }
}

export default connect(mapStateProps, mapDispatchProps)(SearchStaff)