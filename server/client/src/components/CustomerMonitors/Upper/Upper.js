import React, { Component } from "react";
import numeral from "numeral";
import logo from "./logo.png";

class Upper extends Component {
  constructor() {
    super();
    this.state = {
      showitem: "",
      showprice: "",
      status: -1,
      grandtotal: 0
    };
  }

  componentWillReceiveProps({ grandtotal, showitem, showprice, status }) {
    this.setState({ grandtotal, showitem, showprice, status });
  }

  render() {
    return (
      <div style={{ height: "100%", padding: "20px" }}>
        <div
          style={{
            height: "35%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <img
            src={logo}
            alt={"logo"}
            style={{ width: "200px", height: "100%" }}
          />
        </div>
        <div
          style={{
            height: "20%",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <h4>{this.state.showitem}</h4>
          <h4 style={{ color: this.state.status === 2 ? "red" : "black" }}>
            {numeral(this.state.showprice).format("0,0.00")} THB
          </h4>
        </div>
        <div
          style={{ height: "25%", display: "flex", justifyContent: "flex-end" }}
        >
          <h1 style={{ fontWeight: "bold" }}>
            {numeral(this.state.grandtotal).format("0,0.00")} THB
          </h1>
        </div>
      </div>
    );
  }
}

export default Upper;
