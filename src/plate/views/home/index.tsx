import OpenCloseElement from "@plate/components/Element/OpenCloseElement";
import BeInputNumber from "@public/components/Element/BeInputNumber";
import { Button, InputNumber } from "antd";
import React from "react"


class HomePage extends React.Component {
  componentDidMount(){
    
  }
  render() {
    return (
      <div style={{width: 200}}>
        <BeInputNumber  suffix="as" />
        <OpenCloseElement />
      </div>
    );
  }
}

export default HomePage