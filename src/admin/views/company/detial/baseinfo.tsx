import React from "react"
import {connect} from "react-redux"
import { bindActionCreators } from "redux";
import {getCompanyDetail} from "@admin/actions/companyAction"
import { IProps } from "@public/common/interface";
import { Col, Form, Input, Row, Skeleton } from "antd"
import SelectCompany from "@admin/components/Element/SelectCompany"
import UploadElement from "@admin/components/Element/UploadElement";

interface Props extends IProps {
  companyDetail: any;
}

class CompanyBaseInfo extends React.Component<Props> {
  state = {
    formList: [
      {label: "公司logo", name: "logo", type: <UploadElement />},
      {label: "公司名称",name: "name", type: <Input/>},
      {label: "公司简称",name: "nickname", type: <Input/>},
      {label: "上级公司",name: "parentId", type: <SelectCompany/>},
    ]
  }

  componentDidMount(){
    this.props.actions.getCompanyDetail({id: this.props.match.params.id})
  }

  render() {
    const {companyDetail} = this.props;

    return (
      <>
        <Row>
          <Col span={8}>
            {companyDetail?
            <Form initialValues={{...companyDetail, logo: [{url: companyDetail.logo, uid: -1, name: "a"}]}}>
              {this.state.formList.map((item, index)=>(
                <Form.Item key={index} label={item.label} name={item.name} >
                  {item.type}
                </Form.Item>
              ))}
            </Form>:<Skeleton active />}
          </Col>
          <Col span={8}></Col>
          <Col span={8}></Col>
        </Row>
      </>
    );
  }
}

const mapDispatchProps = (dispatch:any)=>{
  return {
    actions: bindActionCreators({getCompanyDetail}, dispatch)
  }
}

const mapStateProps = (state:any)=>{
  return {
    companyDetail: state.company.companyDetail
  }
}

export default connect(mapStateProps, mapDispatchProps)(CompanyBaseInfo)