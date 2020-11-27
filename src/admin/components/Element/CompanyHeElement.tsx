import React, { useEffect } from "react"
import {Cascader} from "antd"
import {getCompanyHe} from "@admin/actions/appAction"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"


interface Props {
  companyhe: any[];
  actions: any;
  onChange?:(value:any)=>void;
  value?:string[];
}

const CompanyHeElement:React.FC<Props> = ({
  onChange,
  value=[],
  actions,
  companyhe
})=>{

  useEffect(()=>{
    actions.getCompanyHe({})
  }, [])

  const triggerChange = (changedValue:any) => {
    if (onChange) {
      onChange(changedValue );
    }
  };

  return <Cascader 
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