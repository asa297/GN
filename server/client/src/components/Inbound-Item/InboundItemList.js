import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
// import ModalStyle from "../../Style/JS/modalStyle";

class InboundItemList extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      item_id: 0
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
      pathname: "/inbounditem/view",
      state: { _id }
    });
  }

  // renderModal() {
  //   return (
  //     <div>
  //       <Modal
  //         isOpen={this.state.modalIsOpen}
  //         onRequestClose={() => this.closeModal()}
  //         style={ModalStyle}
  //         contentLabel="Example Modal"
  //       >
  //         <h6
  //           ref={subtitle => (this.subtitle = subtitle)}
  //           style={{ color: "#f00" }}
  //         >
  //           Are you sure to delete this?
  //         </h6>
  //         <button
  //           className="red btn-flat right white-text"
  //           onClick={() => {
  //             this.props.onDelete(this.state.item_id);
  //             this.closeModal();
  //           }}
  //         >
  //           delete
  //         </button>
  //         <button
  //           className="amber btn-flat right white-text"
  //           onClick={() => this.closeModal()}
  //         >
  //           close
  //         </button>
  //       </Modal>
  //     </div>
  //   );
  // }

  renderInboundItem() {
    return this.props.inbound_items.map(
      (
        {
          _id,
          item_name,
          item_code,
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
                  {item_code} ({item_name})
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
            </div>
            {/* {this.renderModal()} */}
          </div>
        );
      }
    );
  }

  render() {
    return <div className="row">{this.renderInboundItem()}</div>;
  }
}

function mapStateToProps({ inbound_items, auth }) {
  return {
    inbound_items: _.orderBy(inbound_items, ["item_code"], ["asc"]),
    auth
  };
}

export default connect(mapStateToProps)(withRouter(InboundItemList));
