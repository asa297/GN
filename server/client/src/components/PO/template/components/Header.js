import React, { Component } from "react";
import test from "./test.png";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { orderId, RecordDate, RecordNameBy } = this.props.print_value;

    this.setState({ orderId, RecordDate, RecordNameBy });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <img
          style={{
            width: "65%",
            height: "85px",
            borderRadius: "0px 20px 20px 0px"
          }}
          src={test}
          alt="des"
        />
        <div
          style={{
            marginLeft: "5px",
            width: "35%",
            height: "85px",
            background: "#cccccc",
            borderRadius: "20px 0px 0px 20px",
            padding: "10px"
          }}
        >
          <div>Order ID : {this.state.orderId}</div>
          <div style={{ marginTop: "-3px" }}>
            Date : {new Date(this.state.RecordDate).toLocaleDateString()}{" "}
            {new Date(this.state.RecordDate).toLocaleTimeString()}
          </div>
          <div style={{ marginTop: "-3px" }}>
            Cashier : {this.state.RecordNameBy}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
