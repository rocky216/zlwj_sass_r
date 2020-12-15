import React, { useEffect } from "react"
import {Cascader, TreeSelect, Select} from "antd"
import {getCompanyHe} from "@power/actions/appAction"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import _ from "lodash"

const {TreeNode} = TreeSelect
const {Option} = Select

type TypeProps = undefined | "treeselect"

interface Props {
  companyhe: any[];
  actions: any;
  onChange?:(value:any)=>void;
  value?:string[];
  type?:TypeProps;
  notHe?:boolean;
}

const CompanyHeElement:React.FC<Props> = ({
  onChange,
  value,
  actions,
  companyhe,
  type,
  notHe
})=>{

  useEffect(()=>{
    actions.getCompanyHe({notHe})
  }, [companyhe])

  const rCTreeNode = (arr:any[])=>{
    return arr?arr.map(item=>(
      <TreeNode key={item.companyItemId} value={item.companyItemId} title={item.companyItemName} selectable={item.items?false:true}>
        {item.items && item.items.length? rCTreeNode(item.items):null}
      </TreeNode>
    )):null
  }


  const triggerChange = (changedValue:any) => {
    if (onChange) {
      onChange(changedValue );
    }
  };

  return type=="treeselect"?
          <TreeSelect
            multiple
            allowClear
            value={value}
            onChange={(v)=>{
              if(onChange){
                onChange(v)
              }
            }}
          >
            {rCTreeNode(companyhe)}
          </TreeSelect>
        :notHe?(
          <Select value={value} onChange={(v)=>{
            if(onChange){
              onChange(v)
            }
          }} placeholder="请选择公司">
            {companyhe?companyhe.map(item=>(
              <Option key={item.id} value={item.id}>{item.name}</Option>
            )):null}
            
          </Select>
        )
        :<Cascader 
          showSearch
          value={value} 
          options={companyhe || []} 
          onChange={triggerChange}
          fieldNames={{ label: 'name', value: 'id', children: 'items' }} 
          placeholder="请选择公司/小区"
        />
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCompanyHe}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    companyhe: state.app.companyhe
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyHeElement)