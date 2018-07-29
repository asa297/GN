import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetch_Org, fetchOrgType, delete_Org } from "../../actions";
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
      ready: false,
      searchTerm: ""
    };
  }

  componentDidMount() {
    this.props.fetch_Org();
    this.props.fetchOrgType();
  }

  componentWillReceiveProps({ typeorgs }) {
    if (typeorgs) {
      this.setState({ ready: true });
    }
  }

  componentWillUnmount() {
    this.setState({ ready: false });
  }

  async onUpdateOrg() {
    this.setState({ ready: false, showEdit: false, showReview: false });
    await this.props.fetch_Org();
    this.setState({ ready: true });
  }

  async onDeleteOrg(org_id) {
    this.setState({ ready: false });
    await this.props.delete_Org(org_id);
    await this.props.fetch_Org();
    this.setState({ ready: true });
  }

  renderList() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >
          <div style={{ width: "60%" }}>
            <h5 style={{ margin: "0px" }}>
              Org List (รายชื่อบริษัท)
              <Link
                to="/Org/new"
                className="btn-small blue"
                style={{ marginLeft: "20px" }}
              >
                <i className="material-icons">add</i>
              </Link>
            </h5>
          </div>
          <div style={{ width: "40%", display: "flex", alignItems: "center" }}>
            <div
              className="input-field"
              style={{ width: "100%", margin: "0px" }}
            >
              <i className="material-icons prefix">search</i>
              <input
                id="icon_prefix"
                type="text"
                className="validate"
                style={{ marginBottom: "0px" }}
                onChange={event => {
                  this.setState({ searchTerm: event.target.value });
                }}
              />
              <label htmlFor="icon_prefix">Org Search</label>
            </div>
          </div>
        </div>
        <OrgList
          onEdit={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={org_id => this.onDeleteOrg(org_id)}
          searchTerm={this.state.searchTerm}
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
          onUpdateOrg={() => this.onUpdateOrg()}
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
  { fetch_Org, fetchOrgType, delete_Org }
)(Org);
