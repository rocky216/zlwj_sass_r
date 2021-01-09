import React from "react"
import { Typography } from "antd"

const { Paragraph } = Typography;


export const logoLinkColumns = [
  {
    title: "LOGO名称",
    dataIndex: "logoName"
  },
  {
    title: "LOGO URL",
    dataIndex: "logoUrl"
  },
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "修改信息",
    dataIndex: "updateTime"
  },
]

export const restypeColumns = [
  {
    title: "资源类型编号",
    dataIndex: "linkCode"
  },
  {
    title: "资源类型名称",
    dataIndex: "linkName"
  },
  {
    title: "资源服务器类型",
    dataIndex: "resourceType"
  },
  {
    title: "文件类型",
    dataIndex: "fileType"
  },
  {
    title: "文件大小限制",
    dataIndex: "fileSize"
  },
  {
    title: "可上传资源后缀",
    dataIndex: "fileSuffixCollect"
  },
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "修改信息",
    dataIndex: "updateTime"
  },
]

export const resourceColumns = [
  {
    title: "资源key",
    dataIndex: "resourceKey"
  },
  {
    title: "附件名称",
    dataIndex: "annexName"
  },
  {
    title: "文件下载路径",
    dataIndex: "resourceDownload",
    render:(item:string)=>(
      <div style={{width: 180}} title={item}>
        <Paragraph copyable ellipsis >{item}</Paragraph>
      </div>
    )
  },
  {
    title: "文件存储路径",
    dataIndex: "resourceStorage",
    render:(item:string)=>(
      <div style={{width: 180}} title={item}>
        <Paragraph copyable ellipsis >{item}</Paragraph>
      </div>
    )
  },
  {
    title: "文件后缀",
    dataIndex: "suffix"
  },
  {
    title: "文件大小",
    dataIndex: "size"
  },
  {
    title: "创建信息",
    dataIndex: "buildTime"
  },
  {
    title: "更新信息",
    dataIndex: "updateTime"
  },
]