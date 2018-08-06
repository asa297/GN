import React, { Component } from "react";
import numeral from "numeral";

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
    if (grandtotal >= 0) {
      this.setState({ grandtotal });
    }
    if (showitem) {
      this.setState({ showitem });
    }
    if (showprice) {
      this.setState({ showprice });
    }
    if (status) {
      this.setState({ status });
    }
  }

  render() {
    return (
      <div style={{ height: "100%", padding: "20px" }}>
        <div
          style={{
            height: "40%",
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
          style={{ height: "60%", display: "flex", justifyContent: "flex-end" }}
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
