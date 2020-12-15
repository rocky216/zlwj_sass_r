import PieChart from "@power/components/Charts/PieChart"
import { Card, Col, Radio, Row, Skeleton, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getIncomeCountStatis, getExpendCountStatis, getChangeCountStatis, getPayAndIncomeByTime } from "@power/actions/statisAction"
import { Column } from "@ant-design/charts"
import _ from "lodash"
import moment from "moment"
import StackColumnChart from "@power/components/Charts/StackColumnChart"

interface Props {
  incomeData:any;
  incomebytime:any;
  expendData:any;
  changecount:any;
  params:any;
  actions:any;
  isChange:number;
}

const PayStatis:React.FC<Props> = ({
  incomeData,
  changecount,
  incomebytime,
  expendData,
  params,
  actions,
  isChange,
})=>{
  const [companyHeChange, setCompanyHeChange] = useState([
    { label: '项目收支', value: 'I' },
    { label: '公司收支', value: 'C' },
  ])

  const companyHeConfig = {
    data: changecount,
    xField: 'type',
    yField: 'value',
    isGroup: true,
    isStack: true,
    seriesField: 'month',
    groupField: 'name',
    height: 500
  };
  const incomebytimeConfig = {
    data: incomebytime,
    xField: 'type',
    yField: 'value',
    isGroup: true,
    isStack: true,
    seriesField: 'month',
    groupField: 'name',
    height: 500,
    slider: {
      start: 0,
      end: 0.8,
    },
  };

  useEffect(()=>{
    if(isChange){
      initial()
    }
  },[isChange])

  const initial = ()=>{
    actions.getChangeCountStatis(params)
    actions.getIncomeCountStatis(params)
    actions.getExpendCountStatis(params)
    actions.getPayAndIncomeByTime(params)
  }

  const getAllIncom = (arr:any[], key:string)=>{
    let s = 0;
    if(!arr) return s;
    _.each(arr, item=>{
      s+=item[key]
    })
    return s
  }

  return (
    <div>
    <Row>
      <Col span={6}>
          <Card size="small" title="收入统计" 
          style={{height: 313}}
          extra={<span>总收入<Typography.Text type="danger" >{getAllIncom(incomeData, "countMoney")}</Typography.Text></span>} >
              {incomeData?<PieChart angleField="countMoney" colorField="type" data={incomeData} />: 
              <Skeleton active /> }
        </Card>
        <Card size="small" title="支出统计" style={{height: 315}}
          extra={<span>总支出<Typography.Text type="danger" >{getAllIncom(expendData, "countMoney")}</Typography.Text></span>} >
              {expendData?<PieChart angleField="countMoney" colorField="type" data={expendData} />
              :<Skeleton active /> }
        </Card>
      </Col>
      <Col span={18}>
        <Card style={{height: 629}} size="small" title={(
          <Radio.Group 
          defaultValue={params.selectType}
          options={companyHeChange} 
          optionType="button"
          buttonStyle="solid"
          onChange={({target})=>{
            params.selectType = target.value
            actions.getChangeCountStatis(params)
          }}  />
        )} >
          <div>
            {changecount?
            <StackColumnChart 
            data={changecount}
            xField='type'
            yField='value'
            isGroup={true}
            isStack={true}
            columnWidthRatio={0.5}
            seriesField='month'
            groupField='name' />:null}
          </div>
        </Card>
      </Col>
    </Row>
    <Card size="small" title={`${moment(params.type=="date"?params.rtime[0]:params.selectDate).format("YYYY")}年收支分析查询`} >
      <div >
      {incomebytime?
        <StackColumnChart 
          data={incomebytime}
          xField='type'
          yField='value'
          isGroup={true}
          isStack={true}
          seriesField='month'
          columnWidthRatio={0.8}
          groupField='name' />:null}
      </div>
    </Card>
  </div>
  )
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getIncomeCountStatis, getExpendCountStatis, getChangeCountStatis, getPayAndIncomeByTime}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    incomebytime: state.statis.incomebytime,
    incomeData: state.statis.incomeData,
    expendData: state.statis.expendData,
    changecount: state.statis.changecount,
  }
}

export default connect(mapStateProps, mapDispatchProps)(PayStatis)