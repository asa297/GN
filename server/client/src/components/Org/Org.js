import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrgType, delete_Org } from "../../actions";
import OrgList from "./OrgList";
import OrgEdit from "./OrgEdit";
import OrgReview from "./OrgReview";
import Preloader from "../utils/Preloader";

class Org extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      showReview: false,
      index: 0,
      _id: 0,
      ready: false
    };
  }

  componentDidMount() {
    this.props.fetchOrgType();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.typeorgs) {
      this.setState({ ready: true });
    }
  }

  renderList() {
    return (
      <div>
        <div>
          <h3>
            Organization
            <Link
              to="/Org/new"
              className="btn-small blue"
              style={{ marginLeft: "20px" }}
            >
              <i className="material-icons">add</i>
            </Link>
          </h3>
        </div>
        <OrgList
          onSelect={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={org_id => this.props.delete_Org(org_id)}
        />
      </div>
    );
  }

  renderEdit() {
    return (
      <div>
        <OrgEdit
          onCancal={() => this.setState({ showEdit: false, index: 0 })}
          index={this.state.index}
          onSubmit={() => this.setState({ showEdit: false, showReview: true })}
        />
      </div>
    );
  }

  renderContent() {
    if (this.state.showEdit) {
      return this.renderEdit();
    } else if (this.state.showReview) {
      return (
        <OrgReview
          onCancel={() => this.setState({ showEdit: true, showReview: false })}
          onUpdateOrg={() =>
            this.setState({ showEdit: false, showReview: false })
          }
          org_id={this.state._id}
        />
      );
    }

    return this.renderList();
  }

  render() {
    return (
      <div className="container">
        {this.state.ready ? this.renderContent() : <Preloader />}
      </div>
    );
  }
}

function mapStateToProps({ orgs, typeorgs }) {
  return { orgs, typeorgs };
}

export default connect(
  mapStateToProps,
  { fetchOrgType, delete_Org }
)(Org);
