import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import ModalStyle from "../../Style/JS/modalStyle";

class InboundSellerList extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      seller_id: 0
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

  renderInboundGroup() {
    return this.props.inbound_sellers.map(
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
                <p>
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
                </p>
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

function mapStateToProps({ inbound_sellers, auth }) {
  return { inbound_sellers, auth };
}

export default connect(mapStateToProps)(InboundSellerList);
