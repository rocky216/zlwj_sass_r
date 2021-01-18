import { Card, Col, Radio, Row, Skeleton, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getIncomeCount, getPlatePassRecord, getPlateIncome, getPlateMoneyByTime } from "@plate/actions/otherAction"
import { Pie } from "@ant-design/charts"
import PieChart from "@plate/components/Charts/PieChart"
import _ from "lodash"
import StackColumnChart from "@plate/components/Charts/StackColumnChart"
import moment from "moment"


interface Props {
  actions:any;
  params:any;
  isChange:number;
  incomecount:any;
  platerecord:any;
  changecount:any;
  platebytime:any;
}

const PayExpendStatis:React.FC<Props> = ({
  actions,
  params,
  isChange,
  incomecount,
  platerecord,
  changecount,
  platebytime
})=>{
  const [companyHeChange, setCompanyHeChange] = useState([
    { label: '项目收支', value: 'I' },
    { label: '公司收支', value: 'C' },
  ])

  useEffect(()=>{
    actions.getIncomeCount(params)
    actions.getPlatePassRecord(params)
    actions.getPlateIncome(params)
    actions.getPlateMoneyByTime(params)
  },[isChange])

  const getAllIncom = (arr:any[], key:string)=>{
    let s = 0;
    if(!arr) return s;
    _.each(arr, item=>{
      s+=item[key]
    })
    return s
  }

  return (
    <>
      <Row>
        <Col span={6}>
          <Card size="small" title="收入统计" extra={<span>总收入<Typography.Text type="danger" >{getAllIncom(incomecount, "countMoney")}</Typography.Text></span>} >
            {incomecount?<PieChart 
              data={incomecount}
              angleField="countMoney"
              colorField="type"
            />:<Skeleton active />}
          </Card>
          <Card size="small" title="通行记录" extra={<span>合计<Typography.Text type="danger" >{getAllIncom(platerecord, "sum")}</Typography.Text></span>} >
            {platerecord?<PieChart 
              data={platerecord}
              angleField="sum"
              colorField="type"
            />:<Skeleton active />}
          </Card>
        </Col>
        <Col span={18}>
        <Card style={{height: 530}} size="small" title={(
          <Radio.Group 
          defaultValue={params.selectType}
          options={companyHeChange}
          optionType="button"
          buttonStyle="solid"
          onChange={({target})=>{
            params.selectType = target.value
            actions.getPlateIncome(params)
          }}  />
        )} >
          <div>
            {changecount?
            <StackColumnChart 
            data={changecount}
            height={450}
            xField='key'
            yField='countMoney'
            isGroup={false}
            isStack={true}
            columnWidthRatio={0.5}
            seriesField='type' />:null}
          </div>
        </Card>
      </Col>
      </Row>
      <Card size="small" title={`${moment(params.type=="date"?params.rtime[0]:params.selectDate).format("YYYY")}年收支分析查询`} >
        <div >
        {platebytime?
          <StackColumnChart 
            data={platebytime}
            xField='key'
            yField='countMoney'
            isGroup={false}
            isStack={true}
            seriesField='type'
            columnWidthRatio={0.8}/>:null}
        </div>
      </Card>
    </>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getIncomeCount, getPlatePassRecord, getPlateIncome, getPlateMoneyByTime}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    platebytime: state.other.platebytime,
    changecount: state.other.changecount,
    platerecord: state.other.platerecord,
    incomecount: state.other.incomecount,
    utils: state.app.utils,
    spinning: state.other.spinning
  }
}


export default connect(mapStateProps, mapDispatchProps )(PayExpendStatis)