import React, { Component } from "react";
import _ from "lodash";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ViewComponent from "./ViewComponent";

class viewGroup extends Component {
  constructor(props) {
    super(props);

    const group_id = props.location.state._id;
    this.state = { group_id };
  }

  componentDidMount() {
    const group_select = _.find(this.props.groups, ({ _id }) => {
      return _id === this.state.group_id;
    });

    this.setState({ group_select });
  }

  renderContent() {
    return (
      <div>
        <ViewComponent
          icon="business"
          value={this.state.group_select.orgName}
          title="Organization Name (ชื่อบริษัท)"
        />
        <ViewComponent
          icon="code"
          value={this.state.group_select.orgCode}
          title="Organization Code (รหัสบริษัท)"
        />
        <ViewComponent
          icon="flag"
          value={this.state.group_select.orgTypeName}
          title="Organization Type (ประเภทบริษัท)"
        />
        <ViewComponent
          icon="attach_money"
          value={this.state.group_select.orgCom + "%"}
          title="Organization Commission (ค่าคอมมิชชั่น)"
        />
        <ViewComponent
          icon="face"
          value={this.state.group_select.groupStickerNumber}
          title="Sticker Number (หมายเลขสติกเกอร์)"
        />
        <ViewComponent
          icon="group"
          value={this.state.group_select.groupCode}
          title="Group Code (รหัสกรุ๊ป)"
        />
        <ViewComponent
          icon="person_outline"
          value={this.state.group_select.guideName}
          title="Guide Name (ชื่อไกด์)"
        />
        <ViewComponent
          icon="note"
          value={this.state.group_select.groupRemarks}
          title="Group Remarks (หมายเหตุ)"
        />
        <ViewComponent
          icon="history"
          value={
            new Date(this.state.group_select.RecordDate).toLocaleDateString() +
            " " +
            new Date(this.state.group_select.RecordDate).toLocaleTimeString() +
            " " +
            "(" +
            this.state.group_select.RecordNameBy +
            ")"
          }
          title="Record (วันเวลาและบุคคลที่เพิ่มข้อมูลครั้งแรก)"
        />
        <ViewComponent
          icon="update"
          value={
            new Date(
              this.state.group_select.LastModifyDate
            ).toLocaleDateString() +
            " " +
            new Date(
              this.state.group_select.LastModifyDate
            ).toLocaleTimeString() +
            " " +
            "(" +
            this.state.group_select.LastModifyByName +
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
        <h3 className="center">Group Views</h3>
        {this.state.group_select ? this.renderContent() : null}
        <Link to="/Group">
          <button className="red btn-flat white-text">
            <i className="material-icons left">chevron_left</i>
            Back
          </button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ groups }) {
  return { groups };
}

export default connect(mapStateToProps)(withRouter(viewGroup));
