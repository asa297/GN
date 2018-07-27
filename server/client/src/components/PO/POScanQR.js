import React, { Component } from "react";
import QrReader from "react-qr-reader";

class POScanQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 1000,
      scanStatus: false
    };
  }
  handleScan(data) {
    if (data) {
      this.props.onData(data);
    }
  }
  handleError(err) {
    console.error(err);
  }

  renderScan() {
    return (
      <div>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={data => this.handleScan(data)}
          style={{ width: "100%" }}
        />
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.state.scanStatus ? this.renderScan() : null}
        {this.state.scanStatus ? (
          <button
            className="red btn-flat white-text"
            type="button"
            onClick={() => this.setState({ scanStatus: false })}
          >
            Stop Scan
          </button>
        ) : (
          <button
            className="green btn-flat white-text"
            type="button"
            onClick={() => this.setState({ scanStatus: true })}
          >
            Start Scan
          </button>
        )}
      </div>
    );
  }
}

export default POScanQR;
