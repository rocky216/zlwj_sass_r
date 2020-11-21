import { ColumnsType } from 'antd/es/table';
import {Status} from "@public/common/mapper"

interface ColumsProps {
  title:string;
  dataIndex: string;
  render?:Function
}

export const usersColumns:ColumnsType<ColumsProps> = [
  {
    title: "姓名",
    dataIndex: "sysUserInfo",
    render(item) {
      return item.realName;
    }
  },
  {
    title: "手机号",
    dataIndex: "phoneAccount"
  },
  {
    title: "邮箱",
    dataIndex: "emailAccount"
  },
  {
    title: "积分",
    dataIndex: "sysUserIntegral"
  },
  {
    title: "状态",
    dataIndex: "status",
    render: (item:number)=> Status[item]
  },
]