import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ViewComponent from "./ViewComponent";

class viewOrg extends Component {
  constructor(props) {
    super(props);

    const org_id = props.location.state._id;
    this.state = { org_id };
  }

  componentDidMount() {
    const org_select = _.find(this.props.orgs, ({ _id }) => {
      return _id === this.state.org_id;
    });

    this.setState({ org_select });
  }

  renderContent() {
    return (
      <div>
        <ViewComponent
          icon="business"
          value={this.state.org_select.orgName}
          title="Organization Name (ชื่อบริษัท)"
        />
        <ViewComponent
          icon="code"
          value={this.state.org_select.orgCode}
          title="Organization Code (รหัสบริษัท)"
        />
        <ViewComponent
          icon="flag"
          value={this.state.org_select.orgTypeName}
          title="Organization Type (ประเภทบริษัท)"
        />
        <ViewComponent
          icon="attach_money"
          value={this.state.org_select.orgCom + "%"}
          title="Organization Commission (ค่าคอมมิชชั่น)"
        />
        <ViewComponent
          icon="history"
          value={
            new Date(this.state.org_select.RecordDate).toLocaleDateString() +
            " " +
            new Date(this.state.org_select.RecordDate).toLocaleTimeString() +
            " " +
            "(" +
            this.state.org_select.RecordNameBy +
            ")"
          }
          title="Record (วันเวลาและบุคคลที่เพิ่มข้อมูลครั้งแรก)"
        />
        <ViewComponent
          icon="update"
          value={
            new Date(
              this.state.org_select.LastModifyDate
            ).toLocaleDateString() +
            " " +
            new Date(
              this.state.org_select.LastModifyDate
            ).toLocaleTimeString() +
            " " +
            "(" +
            this.state.org_select.LastModifyByName +
            ")"
          }
          title="LastModify (วันเวลาและบุคคลที่ทำการแก้ไขข้อมูลล่าสุด)"
        />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h3 className="center">Organization Views</h3>
        {this.state.org_select ? this.renderContent() : null}
        <Link to="/Org">
          <button className="red btn-flat white-text">
            <i className="material-icons left">chevron_left</i>
            Back
          </button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ orgs }) {
  return { orgs };
}

export default connect(mapStateToProps)(viewOrg);
