import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {IProps} from "@public/common/interface"
import JCard from "@public/components/JCard"
import { Link, useLocation} from "react-router-dom";
import { Button } from "antd";




interface Props extends IProps {

}

class Accecode extends React.Component<Props> {

  constructor(props:Props){
    super(props)


  }

  componentDidMount(){
  }

  render() {
    const {spinning, utils, history, location} = this.props
    
    return (
      <JCard spinning={spinning}> 
          <Button onClick={()=>{
            history.push({
              pathname: "/park",
              state: {
                aaa: 11
              }
            })
          }}>跳转</Button>
      </JCard>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    utils: state.app.utils,
    spinning: state.app.spinning
  }
}

export default connect(mapStateProps, mapDispatchProps)(Accecode)