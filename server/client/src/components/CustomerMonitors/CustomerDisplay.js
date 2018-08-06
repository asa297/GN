import React, { Component } from "react";

import io from "socket.io-client";
import Upper from "./Upper/Upper";
class CustomerDisplay extends Component {
  constructor() {
    super();
    this.state = {
      showitem: "",
      showprice: "",
      status: -1,
      grandtotal: 0,
      // endpoint: "http://127.0.0.1:5000"
      endpoint: "https://gionie.herokuapp.com"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = io(endpoint);

    socket.on("showitem", data => {
      const {
        item_code,
        item_name,
        item_color,
        item_skin,
        item_price,
        status
      } = data;
      this.setState({
        showitem: `${item_code} - ${item_name} (${item_color})(${item_skin})`,
        showprice: `${status === 2 ? "-" : ""}${item_price}`,
        status
      });
    });
    socket.on("grandtotal", data => {
      this.setState({ grandtotal: data });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div style={{ height: "100vh" }}>
        <div className="customer_upper">
          <div style={{ height: "100%" }}>
            <Upper
              grandtotal={this.state.grandtotal}
              showitem={this.state.showitem}
              showprice={this.state.showprice}
              status={this.state.status}
            />
          </div>
        </div>
        <div className="customer_lower">aaa</div>
      </div>
    );
  }
}

export default CustomerDisplay;
