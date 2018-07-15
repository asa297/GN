import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetch_Org, fetch_Group, delete_Group } from "../../actions";
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
      ready: false
    };
  }

  componentDidMount() {
    this.props.fetch_Org();
    this.props.fetch_Group();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.groups) {
      this.setState({ ready: true });
    }
  }

  renderList() {
    return (
      <div>
        <h3>
          InBound-Group
          <Link
            to="/Group/new"
            className="btn-small blue"
            style={{ marginLeft: "20px" }}
          >
            <i className="material-icons">add</i>
          </Link>
        </h3>
        <GroupList
          onSelect={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={group_id => this.props.delete_Group(group_id)}
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
          onUpdateGroup={() =>
            this.setState({ showEdit: false, showReview: false })
          }
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

function mapStateToProps({ groups }) {
  return { groups };
}

export default connect(
  mapStateToProps,
  {
    fetch_Org,
    fetch_Group,
    delete_Group
  }
)(Group);
