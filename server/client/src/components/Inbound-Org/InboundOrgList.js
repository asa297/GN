import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchInbound_Org } from "../../actions";
import Modal from "react-modal";
import ModalStyle from "../../Style/JS/modalStyle";

class InboundOrgList extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      org_id: 0
    };
  }

  openModal(org_id) {
    this.setState({ modalIsOpen: true, org_id });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false, org_id: 0 });
  }

  componentDidMount() {
    this.props.fetchInbound_Org();
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
              this.props.onDelete(this.state.org_id);
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

  renderInboundOrg() {
    return this.props.inbound_orgs.map(
      (
        {
          _id,
          orgName,
          RecordDate,
          orgTypeName,
          orgCom,
          orgCode,
          RecordNameBy
        },
        index
      ) => {
        return (
          <div className="card darken-1" key={_id}>
            <div className="card-content">
              <span className="card-title">
                <b>Org Name : </b>
                <i> {orgName}</i>
                <p className="right">
                  Last Record On :
                  {new Date(RecordDate).toLocaleDateString()}
                </p>
              </span>
            </div>
            <div className="card-action">
              <a>Type : {orgTypeName}</a>
              <a>Commission : {orgCom} %</a>
              <a>Org Code : {orgCode} </a>
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
    return <div>{this.renderInboundOrg()}</div>;
  }
}

function mapStateToProps({ inbound_orgs, typeorgs }) {
  return { inbound_orgs, typeorgs };
}

export default connect(mapStateToProps, { fetchInbound_Org })(InboundOrgList);
