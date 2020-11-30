import React, { useEffect } from "react"
import { Skeleton, Tree } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {getSelectChildTree} from "@admin/actions/systemAction"
import _ from "lodash";

interface Props {
  actions:any;
  systemId: any;
  menutree:any;
  checkable?:boolean;
  disabled?:boolean;
  defaultExpandAll?:boolean;
  checkedKeys?:any[];
  onCheck?:(...arg0:any)=>void;
  checkStrictly?:boolean;
}

const MenuTree:React.FC<Props> = ({
  actions,
  systemId,
  menutree,
  checkable,
  disabled,
  defaultExpandAll,
  checkedKeys=[],
  onCheck,
  checkStrictly,
})=>{

  const handleData = (arr:any[])=>{

    function recursion(arr:any[]){
      _.each(arr, (item,index)=>{
        item.title = item.menuName
        item.key = item.id
        item.children = item.childMenu
        if(item.childMenu && item.childMenu.length){
          recursion(item.childMenu)
        }
      })
    }
    recursion(arr)
    return arr;
  }
  
  useEffect(()=>{
    
    if(systemId){
      
      actions.getSelectChildTree({params:{systemId}})
    }
  }, [systemId])

  return (
    menutree?
    <Tree
      checkStrictly={checkStrictly}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      disabled={disabled}
      checkable={checkable}
      defaultExpandAll
      blockNode
      treeData={handleData(menutree)}
    />: <Skeleton active />
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getSelectChildTree}, dispatch)
  }
}

const mapStateProps = (state: any)=>{
  return {
    menutree: state.system.menutree
  }
}

export default connect(mapStateProps, mapDispatchProps)(MenuTree);