import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {getAnalysisData, getMoneyTotal, getTypeTotal, getOrderChannelTotal, getOrderChartTotal, 
  getOrderChartCompanyTotal, getOrderTotal, getOrderChartShedTotal} from "@power/actions/statisAction"
import { Card, Col, Descriptions, Radio, Row, Skeleton } from "antd"
import PieChart from "@power/components/Charts/PieChart"
import { Column } from "@ant-design/charts"
import StackColumnChart from "@power/components/Charts/StackColumnChart"


interface Props {
  params:any;
  isChange:number;
  actions:any;
  analdata:any;
  momeydata:any;
  typetotal:any;
  orderchannel:any;
  itemorder:any;
  companyorder:any;
  ordertotal:any;
  shedtotal:any;
}

const OrderStatis:React.FC<Props> = ({
  params,
  isChange,
  actions,
  analdata,
  momeydata,
  typetotal,
  orderchannel,
  itemorder,
  companyorder,
  ordertotal,
  shedtotal,
})=>{
  const [companyHeChange, setCompanyHeChange] = useState([
    { label: '项目收支', value: 'I' },
    { label: '公司收支', value: 'C' },
  ])
  const [selectType, setTypeSelect] = useState("I")

  useEffect(()=>{
    if(isChange){
      initial()
    }
  },[isChange])

  const initial = ()=>{
    actions.getAnalysisData(params)
    actions.getMoneyTotal(params)
    actions.getTypeTotal(params)
    actions.getOrderChannelTotal(params)

    actions.getOrderChartTotal(params) //项目
    actions.getOrderTotal(params) //订单

    actions.getOrderChartShedTotal(params) //充电棚子
  }

  return (
    <div>
      <Row>
        <Col span={6}>
          <Card size="small" title="数据分析" >
            {analdata?<Descriptions column={1}>
              <Descriptions.Item label="平均每单金额">{analdata.orderAvg}</Descriptions.Item>
              <Descriptions.Item label="平均每端口收入">{analdata.portAvg}</Descriptions.Item>
              <Descriptions.Item label="平均每端口订单数量">{analdata.portOrderAvg}</Descriptions.Item>
              <Descriptions.Item label="平均每日充电订单收入">{analdata.dayMoney}</Descriptions.Item>
              <Descriptions.Item label="平均每日充电订单数量">{analdata.dayOrderNum}</Descriptions.Item>
            </Descriptions>:<Skeleton active />}
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" title="充电订单-金额统计" >
            {momeydata?
            <PieChart angleField="countMoney" colorField="type" data={momeydata} />
            :<Skeleton active />}
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" title="充电订单-类型分析" >
            {typetotal?
            <PieChart angleField="countMoney" colorField="type" data={typetotal} />
            :<Skeleton active />}
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small" title="充电订单-类型分析" >
            {orderchannel?
            <PieChart angleField="countMoney" colorField="type" data={orderchannel} />
            :<Skeleton active />}
          </Card>
        </Col>
      </Row>
      {params.companyHe.length==0?
      <Card size="small" title={ (
        <Radio.Group 
          defaultValue={params.selectType}
          options={companyHeChange} 
          optionType="button"
          buttonStyle="solid"
          onChange={({target})=>{
            setTypeSelect(target.value)
            actions.getOrderChartCompanyTotal(params) //公司
          }}  />
      )}>
        {itemorder && selectType=="I"?
        <StackColumnChart 
          data={itemorder} 
          xField='month' 
          yField= 'value' 
          seriesField='type'
          groupField='name'/>
        :null}
        {companyorder && selectType=="C" ?
          <StackColumnChart 
            data={companyorder} 
            xField='month' 
            yField= 'value' 
            seriesField='type'
            groupField='name'/>
        :null}
      </Card>:null}
      {typeof params.companyHe==="number"?
        <Card size="small">
          {itemorder?
            <StackColumnChart 
              data={itemorder} 
              xField='month' 
              yField= 'value' 
              seriesField='type'
              groupField='name'/>
          :null}
        </Card>:null}
      {params.companyHe.length==2?
      <Card size="small" title="充电棚充电订单统计">
        {shedtotal?
          <StackColumnChart 
            data={shedtotal} 
            xField='month' 
            yField= 'value' 
            seriesField='type'
            groupField='name'/>
          :null}
      </Card>:null}
      <Card size="small" title="项目充电订单统计">
        {ordertotal?
          <StackColumnChart 
            data={ordertotal} 
            xField='month' 
            yField= 'value' 
            seriesField='type'
            groupField='name'/>
          :null}
      </Card>
    </div>
  )
}


const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getAnalysisData, getMoneyTotal, getTypeTotal, getOrderChannelTotal, 
      getOrderChartTotal, getOrderChartCompanyTotal, getOrderTotal, getOrderChartShedTotal}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    shedtotal: state.statis.shedtotal,
    ordertotal: state.statis.ordertotal,
    companyorder: state.statis.companyorder,
    itemorder: state.statis.itemorder,
    orderchannel: state.statis.orderchannel,
    typetotal: state.statis.typetotal,
    analdata: state.statis.analdata,
    momeydata: state.statis.momeydata,
  }
}

export default connect(mapStateProps, mapDispatchProps)(OrderStatis)