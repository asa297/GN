import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchInbound_Seller } from "../../actions";
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

  componentDidMount() {
    this.props.fetchInbound_Seller();
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
          sellerRemarks,
          RecordDate,
          sellerCode,
          sellerCom,
          RecordNameBy
        },
        index
      ) => {
        return (
          <div className="card darken-1" key={_id}>
            <div className="card-content">
              <span className="card-title">
                <b>Seller Name : </b>

                <i>
                  {sellerName} ({sellerRemarks})
                </i>
                <p className="right">
                  Last Record On :
                  {new Date(RecordDate).toLocaleDateString()}
                </p>
              </span>
            </div>
            <div className="card-action">
              <a>Seller Code : {sellerCode}</a>
              <a>Seller Comission : {sellerCom} %</a>
              <a>RecordBy : {RecordNameBy} </a>
              <button
                className="red btn-flat right white-text"
                onClick={() => this.openModal(_id)}
              >
                delete
                <i className="material-icons right">delete</i>
              </button>
              <button
                className="blue btn-flat right white-text"
                onClick={() => this.props.onSelect(index, _id)}
              >
                Edit
                <i className="material-icons right">edit</i>
              </button>
            </div>
            {this.renderModal()}
          </div>
        );
      }
    );
  }

  render() {
    return <div>{this.renderInboundGroup()}</div>;
  }
}

function mapStateToProps({ inbound_sellers }) {
  return { inbound_sellers };
}

export default connect(mapStateToProps, { fetchInbound_Seller })(
  InboundSellerList
);
