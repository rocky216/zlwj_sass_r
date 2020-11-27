import { Popconfirm } from "antd"
import { PopconfirmProps } from "antd/lib/popconfirm"
import React from "react"


interface DeleteElementProps {
  children: any;
  onConfirm:(...arg0:any)=>void;
  onCancel?:(...arg0:any)=>void;
}

export const DeleteElement:React.FC<DeleteElementProps> = ({
  children,
  onConfirm,
  onCancel
})=>{
  return (
    <Popconfirm
      title="是否删除？"
      onConfirm={onConfirm}
      onCancel={onCancel?onCancel:()=>{}}
    >
      {children}
    </Popconfirm>
  )
}