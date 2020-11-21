import React from "react"
import {connect} from "react-redux"


class CompanyProject extends React.Component {
  render() {
    return (
      <>
        CompanyProject
      </>
    );
  }
}

const mapStateProps = (state:any)=>{
  return {

  }
}

export default connect(mapStateProps)(CompanyProject)