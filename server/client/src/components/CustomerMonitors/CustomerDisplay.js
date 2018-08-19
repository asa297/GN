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
      subtotal: 0,
      discount: 0,
      credit: 0,
      creditcharge: 0,
      // endpoint: ":5000"
      endpoint: "https://gionie.herokuapp.com"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = io(endpoint, {
      transports: ["websocket"]
    });

    socket.on("showitem", data => {
      const {
        item_code,
        item_name,
        item_color,
        item_skin,
        item_price,
        countQty,
        status
      } = data;
      this.setState({
        showitem: `${item_code} - ${item_name} (${item_color})(${item_skin})`,
        showprice: `${status === 2 ? "-" : ""}${item_price}`,
        subtotal: countQty * item_price,
        status
      });

      this.recalculate();
    });

    socket.on("dc", data => {
      const showitem = `Your Discount`;
      const showprice = `-${this.state.subtotal * (data / 100)}`;
      const status = 2;

      this.setState({ showitem, showprice, discount: data, status });
      this.recalculate();
    });

    socket.on("credit", data => {
      const showitem = `Your Credit`;
      const showprice = `-${data}`;
      const status = 2;

      this.setState({ showitem, showprice, credit: data, status });
      this.recalculate();
    });

    socket.on("creditcharge", data => {
      const showitem = `Your Credit Charge`;
      const showprice = `${this.state.credit * (data / 100)}`;
      const status = 1;

      this.setState({ showitem, showprice, creditcharge: data, status });

      this.recalculate();
    });

    socket.on("closepo", data => {
      this.setState({
        showitem: "",
        showprice: "",
        status: -1,
        grandtotal: 0,
        subtotal: 0,
        discount: 0,
        credit: 0,
        creditcharge: 0
      });
    });

    socket.on("openpo", data => {
      this.setState({
        showitem: "",
        showprice: "",
        status: -1,
        grandtotal: 0,
        subtotal: 0,
        discount: 0,
        credit: 0,
        creditcharge: 0
      });
    });

    socket.on("submitpo", data => {
      const showitem = `Change`;
      const showprice = `${data - this.state.grandtotal}`;
      const grandtotal = data - this.state.grandtotal;
      const status = 1;

      this.setState({
        showitem,
        showprice,
        status,
        grandtotal,
        subtotal: 0,
        discount: 0,
        credit: 0,
        creditcharge: 0
      });
    });
  }

  recalculate() {
    const { subtotal, discount, credit, creditcharge } = this.state;

    const resultDiscount = subtotal * (discount / 100);
    const resultCreditCharge = credit * (creditcharge / 100);
    const resultGrandTotal =
      subtotal - resultDiscount - credit + resultCreditCharge;

    this.setState({ grandtotal: resultGrandTotal });
  }

  render() {
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
