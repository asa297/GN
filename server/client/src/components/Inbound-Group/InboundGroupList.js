import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchInbound_Group } from "../../actions";
import Modal from "react-modal";
import ModalStyle from "../../Style/JS/modalStyle";

class InboundGroupList extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      group_id: 0
    };
  }

  openModal(group_id) {
    this.setState({ modalIsOpen: true, group_id });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, group_id: 0 });
  }

  componentDidMount() {
    this.props.fetchInbound_Group();
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
              this.props.onDelete(this.state.group_id);
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
    return this.props.inbound_groups.map(
      (
        {
          _id,
          groupCode,
          groupRemarks,
          RecordDate,
          orgCode,
          orgCom,
          orgName,
          guideName,
          RecordNameBy
        },
        index
      ) => {
        return (
          <div className="card darken-1" key={_id}>
            <div className="card-content">
              <span className="card-title">
                <b>Group Code : </b>

                <i>
                  {groupCode} ({groupRemarks})
                </i>
                <p className="right">
                  Last Record On :
                  {new Date(RecordDate).toLocaleDateString()}{" "}
                  {new Date(RecordDate).toLocaleTimeString()}
                </p>
              </span>
            </div>
            <div className="card-action">
              <a>Org Name : {orgName}</a>
              <a>Org Code : {orgCode}</a>
              <a>Org Commission : {orgCom} %</a>
              <a>Guide Name : {guideName} </a>
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

function mapStateToProps({ inbound_orgs, inbound_groups }) {
  return { inbound_orgs, inbound_groups };
}

export default connect(mapStateToProps, { fetchInbound_Group })(
  InboundGroupList
);
