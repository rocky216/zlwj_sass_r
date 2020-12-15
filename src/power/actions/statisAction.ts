import {storetApi, stateApi} from "@public/utils/action"
const ACTION = "STATIS"
import {OptProps} from "@public/utils/action"
import _ from "lodash"
import {gRtime, gCompanyHe} from "@public/utils"
import moment from "moment"



export const getOrderChartShedTotal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/orderChartShedTotal",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "shedtotal", dispatch, ACTION, opt)
  }
}

export const getOrderTotal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/orderTotal",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "ordertotal", dispatch, ACTION, opt)
  }
}

export const getOrderChartCompanyTotal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/orderChartCompanyTotal",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "companyorder", dispatch, ACTION, opt)
  }
}


export const getOrderChartTotal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/orderChartTotal",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "itemorder", dispatch, ACTION, opt)
  }
}

export const getOrderChannelTotal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/orderChannelTotal",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "orderchannel", dispatch, ACTION, opt)
  }
}

export const getTypeTotal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/typeTotal",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "typetotal", dispatch, ACTION, opt)
  }
}


export const getMoneyTotal = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/moneyTotal",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "momeydata", dispatch, ACTION, opt)
  }
}


export const getAnalysisData = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-order-data/analysisData",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "analdata", dispatch, ACTION, opt)
  }
}

export const getPayAndIncomeByTime = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-date/selectPayAndIncomeByTime",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "incomebytime", dispatch, ACTION, opt)
  }
}

export const getChangeCountStatis = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-date/selectPayAndIncome",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "changecount", dispatch, ACTION, opt)
  }
}


export const getIncomeCountStatis = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-date/incomeCount",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "incomeData", dispatch, ACTION, opt)
  }
}

export const getExpendCountStatis = (params:any, opt?:OptProps)=>{
  return async (dispatch:Function, getState:any)=>{
    const options:any = {
      url: "/zlwj/api/powerDevice/sys/power-date/payCount",
      method: "get",
      data: {
        ...(_.omit(params, ["companyHe", "rtime"])),
        ...gCompanyHe( params.companyHe),
        ...gRtime(params.rtime, "startTime", "endTime"),
        selectDate: moment(params.selectDate).format(params.type=="year" ? "YYYY" : "YYYY-MM"),
        type: params.type=="year"?"Y":params.type=="month"?"M":"D"
      }
    }
    storetApi(options, "expendData", dispatch, ACTION, opt)
  }
}