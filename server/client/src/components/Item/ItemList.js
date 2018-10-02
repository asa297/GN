import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import ModalStyle from "../../Style/JS/modalStyle";
import ReactModalCSS from "../../Style/CSS/ReactModal.css";

class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      item_id: 0,
      currentlyDisplayed: props.items
    };
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  openModal(item_id) {
    this.setState({ modalIsOpen: true, item_id });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, item_id: 0 });
  }

  onView(_id) {
    this.props.history.push({
      pathname: "/Item/view",
      state: { _id }
    });
  }

  componentWillReceiveProps({ searchTerm, items }) {
    if (searchTerm) {
      let currentlyDisplayed = _.filter(
        items,
        ({ item_code, item_name }) =>
          item_code.includes(searchTerm) || item_name.includes(searchTerm)
      );
      this.setState({ currentlyDisplayed });
    } else {
      this.setState({ currentlyDisplayed: items });
    }
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
              this.props.onDelete(this.state.item_id);
              this.closeModal();
            }}
          >
            delete
          </button>
        </Modal>
      </div>
    );
  }

  renderInboundItem() {
    return this.state.currentlyDisplayed.map(
      (
        {
          _id,
          item_name,
          item_code,
          item_color,
          itemTypeId,
          LastModifyByName,
          LastModifyDate
        },
        index
      ) => {
        return (
          <div className="col s12 m4" key={_id}>
            <div className="card">
              <div className="card-image">
                <div
                  style={{
                    height: "100px",
                    background: itemTypeId === 2 ? "#311b92" : "#0d47a1"
                  }}
                />
                <span className="card-title">
                  {item_code} ({item_name}
                  {item_color ? " " + item_color : null})
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
              {this.props.auth.priority === 1 ? (
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
    return <div className="row">{this.renderInboundItem()}</div>;
  }
}

function mapStateToProps({ items, auth }) {
  return { items, auth };
}

export default connect(mapStateToProps)(withRouter(ItemList));
