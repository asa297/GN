import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { fetchInbound_Item } from "../../actions";
import Modal from "react-modal";
import ModalStyle from "../../Style/JS/modalStyle";

class InboundItemList extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      item_id: 0
    };
  }

  componentDidMount() {
    this.props.fetchInbound_Item();
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
              this.props.onDelete(this.state.item_id);
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

  renderInboundItem() {
    return this.props.inbound_items.map(
      (
        {
          _id,
          item_name,
          item_code,
          item_price,
          item_qty,
          itemTypeId,
          itemTypeName,
          RecordDate,
          RecordNameBy,
          orgChinaList
        },
        index
      ) => {
        return (
          <div
            className={
              itemTypeId === 2 ? "card purple lighten-5" : "card blue lighten-5"
            }
            key={_id}
          >
            <div className="card-content">
              <span className="card-title">
                <b>Item: </b>

                <i>
                  {item_name} - {item_code}
                </i>
                <p className="right">
                  Last Record On :
                  {new Date(RecordDate).toLocaleDateString()}
                </p>
              </span>
            </div>
            <div className="card-action">
              <a>Item Price : {item_price}</a>
              <a>Item QTY : {item_qty}</a>
              <a>Item Grade : {itemTypeName}</a>
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
    return <div>{this.renderInboundItem()}</div>;
  }
}

function mapStateToProps({ inbound_items }) {
  return { inbound_items: _.orderBy(inbound_items, ["item_code"], ["asc"]) };
}

export default connect(mapStateToProps, { fetchInbound_Item })(InboundItemList);
