export default [
  {
    name: "工作台", 
    key: "1",
    path: "/"
  },
  {
    name: "用户管理",
    key: "2",
    path: "/users"
  },
  {
    name: "系统管理",
    key: "7",
    path: "/system"
  },
  {
    name: "公司项目管理",
    key: "3",
    path: "/company"
  },
  {
    name: "资源管理",
    key: "4",
    children: [
      {
        name: "系统资源管理",
        key: "4-01",
        path: "/resource"
      },
      {
        name: "资源类型管理",
        key: "4-02",
        path: "/restype"
      },
      {
        name: "水印管理",
        key: "4-03",
        path: "/watermark"
      },
    ]
  },
  {
    name: "定时任务",
    key: "5",
    children: [
      {
        name: "任务配置",
        key: "5-01",
        path: "/timetask/conf"
      },
      {
        name: "执行日志",
        key: "5-02",
        path: "/company"
      },
    ]
  },
  {
    name: "短信管理",
    key: "6",
    path: "/company",
    children: [
      {
        name: "短信包订单",
        key: "6-01",
        path: "/message/order"
      },
      {
        name: "短信包配置",
        key: "6-02",
        path: "/message/conf"
      },
      {
        name: "短信包签名",
        key: "6-03",
        path: "/message/sign"
      },
      {
        name: "短信模板",
        key: "6-04",
        path: "/message/template"
      },
    ]
  },
]