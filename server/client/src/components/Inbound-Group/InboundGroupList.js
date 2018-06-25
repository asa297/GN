import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Modal from "react-modal";
import ModalStyle from "../../Style/JS/modalStyle";

class InboundGroupList extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      group_id: 0
    };
  }

  openModal(group_id) {
    this.setState({ modalIsOpen: true, group_id });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, group_id: 0 });
  }

  onView(_id) {
    this.props.history.push({
      pathname: "/inboundgroup/view",
      state: { _id }
    });
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  renderModal() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          style={ModalStyle}
          contentLabel="Example Modal"
        >
          <h6
            ref={subtitle => (this.subtitle = subtitle)}
            style={{ color: "#f00" }}
          >
            Are you sure to delete this?
          </h6>
          <button
            className="red btn-flat right white-text"
            onClick={() => {
              this.props.onDelete(this.state.group_id);
              this.closeModal();
            }}
          >
            delete
          </button>
          <button
            className="amber btn-flat right white-text"
            onClick={() => this.closeModal()}
          >
            close
          </button>
        </Modal>
      </div>
    );
  }

  renderInboundGroup() {
    return this.props.inbound_groups.map(
      (
        { _id, groupCode, guideName, LastModifyByName, LastModifyDate },
        index
      ) => {
        return (
          <div className="col s12 m4" key={_id}>
            <div className="card">
              <div className="card-image">
                <div
                  style={{
                    height: "100px",
                    background: "#90a4ae"
                  }}
                />
                <span className="card-title">
                  {groupCode} ({guideName})
                </span>
                <button
                  className="btn-floating halfway-fab blue lighten-3"
                  onClick={() => this.onView(_id)}
                >
                  <i className="material-icons">info</i>
                </button>
              </div>
              <div className="card-content">
                <div>
                  <b>Last Mofidy By :</b>&nbsp;<i>{LastModifyByName}</i>
                </div>
                <div>
                  <b>Last Modify At :</b>&nbsp;<i>
                    {new Date(LastModifyDate).toLocaleDateString()} &nbsp;
                    {new Date(LastModifyDate).toLocaleTimeString()}
                  </i>
                </div>
              </div>
              {this.props.auth.priority === 1 ? (
                <div className="card-action" style={{ padding: "0px" }}>
                  <button
                    className="teal btn-flat  white-text"
                    style={{ width: "50%" }}
                    onClick={() => this.props.onSelect(index, _id)}
                  >
                    <i className="material-icons center">edit</i>
                  </button>
                  <button
                    className="red btn-flat white-text"
                    style={{ width: "50%" }}
                    onClick={() => this.openModal(_id)}
                  >
                    <i className="material-icons center">delete</i>
                  </button>
                </div>
              ) : null}
            </div>
            {this.renderModal()}
          </div>
        );
      }
    );
  }

  render() {
    return <div className="row">{this.renderInboundGroup()}</div>;
  }
}

function mapStateToProps({ inbound_orgs, inbound_groups, auth }) {
  return { inbound_orgs, inbound_groups, auth };
}

export default connect(mapStateToProps)(withRouter(InboundGroupList));
