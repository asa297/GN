import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import Modal from "react-modal";
import ModalStyle from "../../Style/JS/modalStyle";
import ReactModalCSS from "../../Style/CSS/ReactModal.css";

class SellerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      seller_id: 0,
      currentlyDisplayed: props.sellers
    };
  }

  openModal(seller_id) {
    this.setState({ modalIsOpen: true, seller_id });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, seller_id: 0 });
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  componentWillReceiveProps({ searchTerm, sellers }) {
    if (searchTerm) {
      let currentlyDisplayed = _.filter(
        sellers,
        ({ sellerName, sellerCode }) =>
          sellerName.includes(searchTerm) || sellerCode.includes(searchTerm)
      );
      this.setState({ currentlyDisplayed });
    } else {
      this.setState({ currentlyDisplayed: sellers });
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
            className="red btn-flat right white-text"
            onClick={() => {
              this.props.onDelete(this.state.seller_id);
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

  renderSellerList() {
    return this.state.currentlyDisplayed.map(
      (
        {
          _id,
          sellerName,
          sellerCode,
          sellerRemarks,
          LastModifyByName,
          LastModifyDate
        },
        index
      ) => {
        return (
          <div className="col s12 m4" key={_id}>
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <div
                  style={{
                    height: "100px",
                    background: "#90caf9"
                  }}
                />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {sellerCode} ({sellerName})<i className="material-icons right">
                    more_vert
                  </i>
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Description<i className="material-icons right">close</i>
                </span>
                <div>
                  <b>Last Mofidy By :</b>&nbsp;<i>{LastModifyByName}</i>
                </div>
                <div>
                  <b>Last Modify At :</b>&nbsp;<i>
                    {new Date(LastModifyDate).toLocaleDateString()} &nbsp;
                    {new Date(LastModifyDate).toLocaleTimeString()}
                  </i>
                </div>
                <div>
                  <b>Remarks :</b>&nbsp;<i>{sellerRemarks}</i>
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
    return <div className="row">{this.renderSellerList()}</div>;
  }
}

function mapStateToProps({ sellers, auth }) {
  return { sellers, auth };
}

export default connect(mapStateToProps)(SellerList);
