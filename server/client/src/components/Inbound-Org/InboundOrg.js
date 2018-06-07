import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrgType, deleteInbound_Org } from "../../actions";
import InboundOrgList from "./InboundOrgList";
import InboundOrgEdit from "./InboundOrgEdit";
import InboundOrgReview from "./InboundOrgReview";
import Preloader from "../utils/Preloader";

class InboundOrg extends Component {
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

  renderInBoundList() {
    return (
      <div>
        <div>
          <h3>
            InBound-Org
            <Link
              to="/inboundorg/new"
              className="btn-small blue"
              style={{ marginLeft: "20px" }}
            >
              <i className="material-icons">add</i>
            </Link>
          </h3>
        </div>
        <InboundOrgList
          onSelect={(index, _id) => {
            this.setState({ showEdit: true, index, _id });
          }}
          onDelete={org_id => this.props.deleteInbound_Org(org_id)}
        />
      </div>
    );
  }

  renderInBoundEdit() {
    return (
      <div>
        <InboundOrgEdit
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
        <InboundOrgReview
          onCancel={() => this.setState({ showEdit: true, showReview: false })}
          onUpdateOrg={() =>
            this.setState({ showEdit: false, showReview: false })
          }
          org_id={this.state._id}
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

function mapStateToProps({ inbound_orgs, typeorgs }) {
  return { inbound_orgs, typeorgs };
}

export default connect(
  mapStateToProps,
  { fetchOrgType, deleteInbound_Org }
)(InboundOrg);
