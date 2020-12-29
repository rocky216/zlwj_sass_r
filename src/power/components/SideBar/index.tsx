import React from "react"
import {Link} from "react-router-dom"
import {Layout, Button, Menu} from "antd"
import {PieChartOutlined,TeamOutlined} from "@ant-design/icons"
import menu from "./menu"
import { connect } from "react-redux"
import _ from "lodash"

const {SubMenu} = Menu

interface Props {
  base:any;
}

const SideBar:React.FC<Props> = ({
  base
})=>{
  
  return (
    base?<Menu theme="dark"  mode="inline">
      {menu.map((item:any, index)=>{
        
        if(!item.children){
          return (
            _.findIndex(base.userMenu, (o:any)=>o.menuKey==item.key)>-1?
            <Menu.Item key={index} icon={<PieChartOutlined />}>
              <Link to={item.path||"/"}>{item.name}</Link>
            </Menu.Item>:null
          )
        }
        else{
          return (
            _.findIndex(base.userMenu, (o:any)=>o.menuKey.indexOf(item.key)===0 )>-1?
            <SubMenu key={index} icon={<TeamOutlined />} title={item.name}>
              {item.children.map((elem:any, i:number)=>{
                return  _.findIndex(base.userMenu, (o:any)=>o.menuKey==elem.key)>-1? 
                      <Menu.Item key={(index.toString()+i)} >
                        <Link to={elem.path||""}>{elem.name}</Link>
                      </Menu.Item>:null
              })}
            </SubMenu>:null
          )
        }
      })}
    </Menu>:null
  )
}

const mapStateToProps = (state:any)=>{
  return {
    base: state.app.base
  }
}

export default connect(mapStateToProps)(SideBar);