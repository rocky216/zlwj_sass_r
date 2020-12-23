import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Button, Card, Tree } from "antd";
import {routes} from "@power/routers/routeData"
import { DownOutlined } from "@ant-design/icons";
import _ from "lodash";
import {saveSysMenusTree} from "@power/actions/appAction"

const {TreeNode} = Tree

let rRoutes = _.cloneDeep(routes)

interface Props extends IProps {

}

class Permismenu extends React.Component<Props> {

  tData(arr:any[]){
    _.each(arr, item=>{
      item = _.omit(item, ["component", "exact", "path"])
      if(item.children && item.children.length>0){
        this.tData(item.children)
      }
    })
    return arr;
  }

  render() {
    const {spinning, utils} = this.props
    
    return (
      <JCard spinning={spinning}> 
        <Card size="small" extra={<Button ghost type="primary" onClick={()=>{
          this.props.actions.saveSysMenusTree({
            type: "systema",
            treeDate: JSON.stringify(rRoutes)
          }, ()=>{
            utils.OpenNotification("success")
          })
        }} >保存</Button>} >
          <Tree
            showLine
            defaultExpandAll
            switcherIcon={<DownOutlined />}
            treeData={utils.tData(routes,"name", "id", "children")}
          />
        </Card>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({saveSysMenusTree}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Permismenu)