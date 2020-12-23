import React, { useEffect } from "react"
import {getTreeDateByType, addBatchMenus} from "@admin/actions/systemAction"
import { connect } from "react-redux"
import {useHistory, withRouter} from "react-router-dom"
import { bindActionCreators } from "redux"
import { UtilsProps } from "@public/common/interface"
import { Button, Card, Space, Tree, Typography } from "antd"
import _ from "lodash"

interface Props {
  actions:any;
  databytype:any;
  utils:UtilsProps
}

const SeeMenu:React.FC<Props> = ({
  actions,
  databytype,
  utils
})=>{
  const {} = useHistory()


  useEffect(()=>{
    actions.getTreeDateByType({
      type: "systema"
    })
  },[])

  const gData = (arr:any[])=>{
      _.each(arr, item=>{
        item.key = item.id
        item.children = item.children || null
        if(item.children && item.children.length){
          
          gData(item.children)
        }
      })
      return arr
  }

  const AddBatchMenus = ()=>{
    let arrJson = JSON.parse(databytype)
    console.log(gData(arrJson))
    actions.addBatchMenus({
      menusJson: JSON.stringify( gData(arrJson) ),
      systemId: 26
    }, ()=>{
      utils.OpenNotification("success")
    })

  }

  console.log(utils.tData(databytype?JSON.parse(databytype):null, "name", "id", "children"))
  return (
    <Card size="small" title="系统菜单" extra={<Button type="primary" onClick={AddBatchMenus}>初始化</Button>} >
      {databytype?
        <Tree 
          defaultExpandAll
          treeData={utils.tData(databytype?JSON.parse(databytype):null, "name", "id", "children")}
          titleRender={(nodeData:any)=>{
            return (
              <Space>
                <span>{nodeData.name}</span>
                <Typography.Text type="danger" >({nodeData.id})</Typography.Text>
              </Space>
            )
          }}
        />:null}
    </Card>
    
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getTreeDateByType, addBatchMenus}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    databytype: state.system.databytype,
    utils: state.app.utils,
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(SeeMenu) ) 