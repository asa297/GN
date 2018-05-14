import React, { Component } from "react";
import Modal from "react-modal";
import styles from "../../Style/CSS/modalCSS.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

class App extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div>
        {/* <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
          <button onClick={() => console.log("delete sure")}>delete</button>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
        </Modal> */}
        <div className={styles.container}>
          <p className={styles.content}>Get started with CSS Modules style</p>
        </div>
      </div>
    );
  }
}

export default App;
