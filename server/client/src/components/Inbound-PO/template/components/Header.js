import React, { Component } from "react";
import logo from "./logo.jpg";
import OrderId from "./header/OrderId";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { orderId } = this.props.print_value;
    const { copy } = this.props;

    this.setState({ orderId, copy });
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "25%" }}>
          <img
            src={logo}
            alt={"logo"}
            style={{ width: "150px", height: "75px" }}
          />
        </div>
        <div style={{ width: "65%" }}>
          <div>
            <OrderId
              label="Order ID"
              text={this.state.orderId}
              copy={this.state.copy}
            />
            bra bra bra
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
