import React from "react"
import {connect} from "react-redux"


class CompanyMessage extends React.Component {
  render() {
    return (
      <>
        CompanyMessage
      </>
    );
  }
}

const mapStateProps = (state:any)=>{
  return {

  }
}

export default connect(mapStateProps)(CompanyMessage)