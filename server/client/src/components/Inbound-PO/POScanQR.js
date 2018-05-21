import React, { Component } from "react";
import QrReader from "react-qr-reader";

class POScanQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 2000,
      scanStatus: false,
      result: "No result"
    };
  }
  handleScan(data) {
    if (data) {
      this.setState({
        result: data
      });
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
          //
          style={{ width: "20%" }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.state.scanStatus ? (
          this.renderScan()
        ) : (
          <div>{this.state.result}</div>
        )}
        <button
          className="green btn-flat white-text"
          onClick={() => this.setState({ scanStatus: true })}
        >
          click
        </button>
        <button
          className="red btn-flat white-text"
          onClick={() => this.setState({ scanStatus: false })}
        >
          cancal
        </button>
      </div>
    );
  }
}

export default POScanQR;
