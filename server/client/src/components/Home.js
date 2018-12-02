import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchNotes, deleteNotes } from "../actions";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import ModalStyle from "../Style/JS/modalStyle";
import ReactModalCSS from "../Style/CSS/ReactModal.css";
import Preloader from "./utils/Preloader";
import _ from "lodash";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      data: [],
      modalIsOpen: false,
      noteId: undefined
    };
  }
  componentWillMount() {
    this.props.FetchNotes();
  }

  componentWillReceiveProps({ notes }) {
    const { loaded, data } = notes;
    if (loaded) {
      this.setState({ data, ready: true });
    }
  }

  openModal(noteId) {
    this.setState({ modalIsOpen: true, noteId });
  }

  closeModal() {
    this.setState({ modalIsOpen: false, noteId: undefined });
  }

  async onDelete() {
    await this.props.deleteNotes(this.state.noteId);
    this.props.FetchNotes();
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
              this.onDelete(this.state.noteId);
              this.closeModal();
            }}
          >
            delete
          </button>
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        {this.state.ready ? (
          <div>
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                marginBottom: "20px"
              }}
            >
              <div>
                <h5 style={{ margin: "0px" }}>
                  Note List (รายการโน๊ต)
                  {this.props.auth.priority !== 3 ? (
                    <Link
                      to="/note/new"
                      className="btn-small blue"
                      style={{ marginLeft: "20px" }}
                    >
                      <i className="material-icons">add</i>
                    </Link>
                  ) : null}
                </h5>
              </div>
            </div>
            <div className="row">
              {_.map(
                this.state.data,
                ({
                  _id,
                  noteTitle,
                  noteMessage,
                  RecordNameBy,
                  LastModifyDate
                }) => {
                  return (
                    <div key={_id} className="col s12 m6">
                      <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                          <span className="card-title">
                            {noteTitle || "No Title"}
                          </span>
                          <p>{noteMessage}</p>
                        </div>
                        <div className="card-action">
                          <a href="#">By : {RecordNameBy}</a>
                          <a href="#">
                            On : {new Date(LastModifyDate).toLocaleDateString()}{" "}
                            &nbsp;
                            {new Date(LastModifyDate).toLocaleTimeString()}
                          </a>
                        </div>
                        {this.props.auth.priority !== 3 ? (
                          <button
                            className="red btn-flat  white-text"
                            style={{ width: "100%" }}
                            onClick={() => this.openModal(_id)}
                          >
                            <i className="material-icons center">delete</i>
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ) : (
          <Preloader />
        )}

        {this.renderModal()}
      </div>
    );
  }
}

export default connect(
  ({ auth, notes }) => ({ auth, notes }),
  { FetchNotes, deleteNotes }
)(Home);
