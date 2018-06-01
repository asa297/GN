import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import ModalStyle from "../../../../Style/JS/modalStyle";
import { deleteInbound_Order } from "../../../../actions";
import { withRouter } from "react-router-dom";

class ButtonFooter extends Component {
  constructor(props) {
    super(props);

    const { orderId } = props;

    this.state = {
      modalIsOpen: false,
      orderId
    };
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
              this.props.deleteInbound_Order(
                this.state.orderId,
                this.props.history
              );
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

  renderButton() {
    if (this.props.auth.priority === 1) {
      return (
        <div>
          <button
            className="red btn-flat white-text left"
            style={{ marginTop: "30px" }}
            type="button"
            onClick={() => this.openModal()}
          >
            Delete
          </button>
          <button
            className="green btn-flat white-text right"
            style={{ marginTop: "30px" }}
            type="submit"
          >
            Save
          </button>
          {this.renderModal()}
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderButton()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { deleteInbound_Order })(
  withRouter(ButtonFooter)
);
