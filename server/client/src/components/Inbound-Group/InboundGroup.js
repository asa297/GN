import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchInbound_Org,
  fetchInbound_Group,
  deleteInbound_Group
} from "../../actions";
import InboundGroupList from "./InboundGroupList";
import InboundGroupEdit from "./InboundGroupEdit";
import InboundGroupReview from "./InboundGroupReview";
import Preloader from "../utils/Preloader";

class InboundGroup extends Component {
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
    this.props.fetchInbound_Org();
    this.props.fetchInbound_Group();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.groups) {
      this.setState({ ready: true });
    }
  }

  renderInBoundList() {
    return (
      <div>
        <h3>
          InBound-Group
          <Link
            to="/inboundgroup/new"
            className="btn-small blue"
            style={{ marginLeft: "20px" }}
          >
            <i className="material-icons">add</i>
          </Link>
        </h3>
        <InboundGroupList
          onSelect={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={group_id => this.props.deleteInbound_Group(group_id)}
        />
      </div>
    );
  }

  renderInBoundEdit() {
    return (
      <div>
        <InboundGroupEdit
          onCancal={() => this.setState({ showEdit: false, index: 0 })}
          index={this.state.index}
          onSubmit={() => this.setState({ showEdit: false, showReview: true })}
        />
      </div>
    );
  }

  renderContent() {
    if (this.state.showEdit) {
      return this.renderInBoundEdit();
    } else if (this.state.showReview) {
      return (
        <InboundGroupReview
          onCancel={() => this.setState({ showEdit: true, showReview: false })}
          onUpdateGroup={() =>
            this.setState({ showEdit: false, showReview: false })
          }
          group_id={this.state._id}
        />
      );
    }

    return this.renderInBoundList();
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
    fetchInbound_Org,
    fetchInbound_Group,
    deleteInbound_Group
  }
)(InboundGroup);
