import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getDeviceInit, setDeviceInit } from "@plate/actions/otherAction"
import SearchModular from "@public/components/Modular/SearchModular"
import { Button, Card, Popconfirm, Table } from "antd"
import { deviceCatchColums } from "../columns"
import { UtilsProps } from "@public/common/interface"
import StatusElement from "@public/components/Element/StatusElement"
import AddModular from "@public/components/Modular/AddModular"
import CompanyHeElement from "@plate/components/Element/CompanyHeElement"


interface Props {
  actions:any;
  deviceinit:any;
  utils:UtilsProps;
  spinning:boolean;
}

let params = {
  current: 1,
  iotId: ""
}
let resetParams = {
  current: 1,
  iotId: ""
}

const DeviceCatch:React.FC<Props> = ({
  actions,
  deviceinit,
  utils,
  spinning,
})=>{
    const [addVisible, setAddVisible] = useState(false)


  useEffect(()=>{
    actions.getDeviceInit(params)
  },[])

  const getCol = ()=>{
    return [...deviceCatchColums, {
      title: "操作",
      render:(item:any)=> {
        return (
          <Popconfirm title="是否更新设备" onConfirm={()=>{
            actions.setDeviceInit({iotId: item.iotId}, ()=>{
              utils.OpenNotification("success")
              actions.getDeviceInit(params, {refresh: true})
            })
          }}>
            <Button type="link">更新设备</Button>
          </Popconfirm>
        )
      }
    }]
  }

  return (
    <>
      <SearchModular
        before={(
          <>
            <Button type="primary" ghost onClick={()=>setAddVisible(true)} >更新小区设备缓存</Button>
            <Popconfirm className="mgl10" title="全局更新设备缓存" onConfirm={()=>{
              actions.setDeviceInit({}, ()=>{
                utils.OpenNotification("success")
                actions.getDeviceInit(params, {refresh: true})
              })
            }}>
              <Button type="primary" danger ghost  >全局更新设备缓存</Button>
            </Popconfirm>
            
          </>
        )}
        initialValues={params}
        resetValues={resetParams}
        submitSearch={(values:any)=>{
          params = values?{...params,...values}:resetParams;
          actions.getDeviceInit(params)
        }}
        data={[
          {label: "iotid", name: "iotId", type: "input"}
        ]}
      />
      <Table size="small" columns={getCol()} dataSource={deviceinit?utils.addIndex(deviceinit.list):[]} 
      pagination={utils.Pagination(deviceinit, page=>{
        params.current = page;
        actions.getDeviceInit(params)
      })} />

      <AddModular
        title="更新小区设备缓存"
        spinning={spinning}
        visible={addVisible}
        onCancel={()=>setAddVisible(false)}
        onOk={(values)=>{
          actions.setDeviceInit(values, ()=>{
            utils.OpenNotification("success")
            actions.getDeviceInit(params, {refresh: true})
            setAddVisible(false)
          })
        }}
        data={[
          {label: "公司项目", name: "companyHe", type: <CompanyHeElement/>}
        ]}
      />

    </>
  )
}


const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getDeviceInit, setDeviceInit }, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    deviceinit: state.other.deviceinit,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(DeviceCatch)