import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetch_Group_Filter, fetch_Org, delete_Group } from "../../actions";
import GroupList from "./GroupList";
import GroupEdit from "./GroupEdit";
import GroupReview from "./GroupReview";
import Preloader from "../utils/Preloader";

class Group extends Component {
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
    this.props.fetch_Group_Filter();
    this.props.fetch_Org();
  }

  componentWillReceiveProps({ orgs }) {
    if (orgs) {
      this.setState({ ready: true });
    }
  }

  componentWillUnmount() {
    this.setState({ ready: false });
  }

  async onUpdateGroup() {
    this.setState({ ready: false, showEdit: false, showReview: false });
    await this.props.fetch_Group_Filter();
    this.setState({ ready: true });
  }

  async onDeleteGroup(group_id) {
    this.setState({ ready: false });
    await this.props.delete_Group(group_id);
    await this.props.fetch_Group_Filter();
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
              Group List (รายการกรุ๊ปทัวร์)
              {this.props.auth.priority !== 3 ? (
                <Link
                  to="/Group/new"
                  className="btn-small blue"
                  style={{ marginLeft: "20px" }}
                >
                  <i className="material-icons">add</i>
                </Link>
              ) : null}
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
              <label htmlFor="icon_prefix">Group Search</label>
            </div>
          </div>
        </div>
        <GroupList
          onEdit={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={group_id => this.onDeleteGroup(group_id)}
          searchTerm={this.state.searchTerm}
        />
      </div>
    );
  }

  renderEdit() {
    return (
      <div>
        <GroupEdit
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
        <GroupReview
          onCancel={() => this.setState({ showEdit: true, showReview: false })}
          onUpdateGroup={() => this.onUpdateGroup()}
          group_id={this.state._id}
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

function mapStateToProps({ orgs, auth }) {
  return { orgs, auth };
}

export default connect(
  mapStateToProps,
  {
    fetch_Group_Filter,
    fetch_Org,
    delete_Group
  }
)(Group);
