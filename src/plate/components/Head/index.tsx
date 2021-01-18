import React, { useEffect, useState } from "react"
import "./index.less"
import { Cascader  } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import {changeCompanyItem} from "@plate/actions/appAction"
import { bindActionCreators } from "redux";
import {useHistory, useLocation, withRouter, useParams} from "react-router-dom"



interface Props {
  base:any;
  actions:any;
  level:any;
}

const Head:React.FC<Props> = ({
  base,
  actions,
  level
})=>{
  const [cName, setCName] = useState()
  const [iName, setIName] = useState()

  useEffect(()=>{
    
    if(!cName){
      getLabel()
    }

  },[cName])

  const getLabel = ()=>{
    let company = _.filter(base.userCompany, (o:any)=>o.id === base.nowCompanyId)
    let item = _.filter(company[0]["itemList"], (o:any)=>o.id === base.nowItemId)
    setCName(company[0]["name"])
    setIName(item[0]["name"])
  }
  
  return (
    <div className="app_head">
      <div></div>
      <div>
        {level==2?
        <Cascader 
          value={[base.nowCompanyId, base.nowItemId]} 
          options={base.userCompany} fieldNames={{label: "name", value: "id", children: "itemList"}}
          onChange={(v:any[])=>{
            actions.changeCompanyItem({
              systemId: 26,
              companyId: v[0],
              itemId: v[1], 
            }, ()=>{
              window.location.reload()
            })
          }}
          >
            <a href="#">{cName}/{iName}</a>
        </Cascader>:null}
      </div>
    </div>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({changeCompanyItem}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    base: state.app.base,
    level: state.app.level
  }
}

export default withRouter( connect(mapStateProps, mapDispatchProps)(Head) );