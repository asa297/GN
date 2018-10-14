import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Modal from "react-modal";
import ModalStyle from "../../Style/JS/modalStyle";
import ReactModalCSS from "../../Style/CSS/ReactModal.css";

class OrgList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      org_id: 0,
      currentlyDisplayed: props.orgs
    };
  }

  openModal(org_id) {
    this.setState({ modalIsOpen: true, org_id });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, org_id: 0 });
  }

  onView(_id) {
    this.props.history.push({
      pathname: "/Org/view",
      state: { _id }
    });
  }

  componentWillReceiveProps({ searchTerm, orgs }) {
    if (searchTerm) {
      let currentlyDisplayed = _.filter(orgs, ({ orgName }) =>
        orgName.includes(searchTerm)
      );
      this.setState({ currentlyDisplayed });
    } else {
      this.setState({ currentlyDisplayed: orgs });
    }
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
          className={ReactModalCSS.ReactModal__Overlay}
          contentLabel="Example Modal"
        >
          <h6
            ref={subtitle => (this.subtitle = subtitle)}
            style={{ color: "#f00" }}
          >
            Are you sure to delete this?
          </h6>
          <button
            className="amber btn-flat right white-text"
            onClick={() => this.closeModal()}
          >
            close
          </button>
          <button
            className="red btn-flat right white-text"
            onClick={() => {
              this.props.onDelete(this.state.org_id);
              this.closeModal();
            }}
          >
            delete
          </button>
        </Modal>
      </div>
    );
  }

  renderOrgList() {
    return this.state.currentlyDisplayed.map(
      (
        { _id, orgName, orgTypeId, LastModifyByName, LastModifyDate },
        index
      ) => {
        return (
          <div className="col s12 m4" key={_id}>
            <div className="card">
              <div className="card-image">
                <div
                  style={{
                    height: "100px",
                    background: orgTypeId === 2 ? "#ef5350 " : "#0097a7"
                  }}
                />
                <span className="card-title">{orgName} </span>
                <button
                  className="btn-floating halfway-fab blue lighten-3"
                  onClick={() => this.onView(_id)}
                >
                  <i className="material-icons">info</i>
                </button>
              </div>
              <div className="card-content">
                <div>
                  <b>Last Mofidy By :</b>
                  &nbsp;
                  <i>{LastModifyByName}</i>
                </div>
                <div>
                  <b>Last Modify At :</b>
                  &nbsp;
                  <i>
                    {new Date(LastModifyDate).toLocaleDateString()} &nbsp;
                    {new Date(LastModifyDate).toLocaleTimeString()}
                  </i>
                </div>
              </div>
              {this.props.auth.priority !== 3 ? (
                <div className="card-action" style={{ padding: "0px" }}>
                  <button
                    className="teal btn-flat  white-text"
                    style={{ width: "50%" }}
                    onClick={() => this.props.onEdit(index, _id)}
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
    return <div className="row">{this.renderOrgList()}</div>;
  }
}

function mapStateToProps({ orgs, auth }) {
  return { orgs, auth };
}

export default connect(mapStateToProps)(withRouter(OrgList));
