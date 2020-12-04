import React, { useEffect } from "react"
import {Cascader, TreeSelect} from "antd"
import {getCompanyHe} from "@power/actions/appAction"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import _ from "lodash"

const {TreeNode} = TreeSelect


interface Props {
  companyhe: any[];
  actions: any;
  onChange?:(value:any)=>void;
  value?:string[];
  type?:string;
}

const CompanyHeElement:React.FC<Props> = ({
  onChange,
  value=[],
  actions,
  companyhe,
  type
})=>{

  useEffect(()=>{
    actions.getCompanyHe({})
  }, [])

  const rCTreeNode = (arr:any[])=>{
    return arr?arr.map(item=>(
      <TreeNode key={item.uuid} value={item.uuid} title={item.name}>
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
            style={{width: 200}}
          >
            {rCTreeNode(companyhe)}
          </TreeSelect>
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