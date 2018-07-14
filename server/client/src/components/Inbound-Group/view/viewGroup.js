import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
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
          title="Organization Name"
        />
        <ViewComponent
          icon="code"
          value={this.state.group_select.orgCode}
          title="Organization Code"
        />
        <ViewComponent
          icon="flag"
          value={this.state.group_select.orgTypeName}
          title="Organization Type"
        />
        <ViewComponent
          icon="attach_money"
          value={this.state.group_select.orgCom + "%"}
          title="Organization Commission"
        />
        <ViewComponent
          icon="group"
          value={this.state.group_select.groupCode}
          title="Group Code"
        />
        <ViewComponent
          icon="person_outline"
          value={this.state.group_select.guideName}
          title="Guide Name"
        />
        <ViewComponent
          icon="note"
          value={this.state.group_select.groupRemarks}
          title="Group Remarks"
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
          title="Record"
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
          title="LastModify"
        />
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h3 className="center">Group Views</h3>
        {this.state.group_select ? this.renderContent() : null}
        <Link to="/inboundgroup">
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

export default connect(mapStateToProps)(viewGroup);
