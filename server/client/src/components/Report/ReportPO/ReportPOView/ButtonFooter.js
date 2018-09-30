import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import ReactToPrint from "react-to-print";
import ModalStyle from "../../../../Style/JS/modalStyle";
import { delete_ReportPO } from "../../../../actions";
import { withRouter } from "react-router-dom";
import CircularLoaderBlue from "../../../utils/CircularLoaderBlue";
import ComponentToPrint from "../../ReportPrintService/PurchaseOrderPrint/TemplatePrint";

class ButtonFooter extends Component {
  constructor(props) {
    super(props);

    const { orderId, report_PO } = props;

    this.state = {
      modalIsOpen: false,
      orderId,
      clickSubmit: false,
      report_PO
    };
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  componentWillReceiveProps({ clickSubmit }) {
    this.setState({ clickSubmit });
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
            className="amber btn-flat right white-text"
            onClick={() => this.closeModal()}
          >
            close
          </button>
          <button
            className="red btn-flat right white-text"
            onClick={() => {
              this.props.delete_ReportPO(
                this.state.orderId,
                this.props.history
              );
            }}
          >
            delete
          </button>
        </Modal>
      </div>
    );
  }

  renderButton() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.state.clickSubmit ? <CircularLoaderBlue /> : null}
          {this.props.auth.priority === 1 ? (
            <button
              className="green btn-flat white-text right"
              style={{ marginLeft: "10px", marginTop: "30px" }}
              type="submit"
            >
              Save
            </button>
          ) : null}

          {this.props.auth.priority === 1 ? (
            <button
              className="red btn-flat white-text left"
              style={{ marginLeft: "10px", marginTop: "30px" }}
              type="button"
              onClick={() => this.openModal()}
            >
              Delete
            </button>
          ) : null}

          <ReactToPrint
            trigger={() => (
              <button
                className="blue darken-4 btn-flat white-text waves-effect waves-light"
                style={{ marginLeft: "10px", marginTop: "30px" }}
                type="button"
              >
                <i className="material-icons left">local_printshop</i>
                Print
              </button>
            )}
            content={() => this.componentRef}
          />
        </div>

        <div style={{ display: "none" }}>
          <ComponentToPrint
            ref={el => (this.componentRef = el)}
            print_value={this.state.report_PO}
          />
        </div>

        {this.renderModal()}
      </div>
    );
  }

  render() {
    return <div>{this.renderButton()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { delete_ReportPO }
)(withRouter(ButtonFooter));
