import React from "react"
import {Link} from "react-router-dom"
import {Layout, Button, Menu} from "antd"
import {PieChartOutlined,TeamOutlined} from "@ant-design/icons"
import menu from "./menu"

const {SubMenu} = Menu

const SideBar:React.FC = ()=>{

  return (
    <Menu theme="dark"  mode="inline">
      {menu.map((item:any, index)=>{
        if(!item.children){
          return (
            <Menu.Item key={index} icon={<PieChartOutlined />}>
              <Link to={item.path||"/"}>{item.name}</Link>
            </Menu.Item>
          )
        }
        else{
          return (
            <SubMenu key={index} icon={<TeamOutlined />} title={item.name}>
              {item.children.map((elem:any, i:number)=>{
                return <Menu.Item key={(index.toString()+i)} >
                        <Link to={elem.path||""}>{elem.name}</Link>
                      </Menu.Item>
              })}
            </SubMenu> 
          )
        }
      })}
    </Menu>
  )
}

export default SideBar;