import React, { Component } from "react";
import { Link } from "react-router-dom";
import InboundOrgList from "./InboundOrgList";
import InboundOrgEdit from "./InboundOrgEdit";

class InboundOrg extends Component {
  state = { showEdit: false, index: 0 };

  renderInBoundList() {
    return (
      <div className="container">
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
          onclick={index => {
            this.setState({ showEdit: true, index });
          }}
        />
      </div>
    );
  }

  renderInBoundEdit() {
    return (
      <div className="container">
        <InboundOrgEdit
          onCancal={() => this.setState({ showEdit: false, index: 0 })}
          index={this.state.index}
        />
      </div>
    );
  }

  renderContent() {
    if (this.state.showEdit) {
      return this.renderInBoundEdit();
    }

    return this.renderInBoundList();
  }

  render() {
    return this.renderContent();
  }
}

export default InboundOrg;
