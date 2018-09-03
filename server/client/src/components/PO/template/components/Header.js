import React, { Component } from "react";
import logo from "./logo.jpg";
import OrderId from "./header/OrderId";
import CSS_class from "../../../../Style/CSS/PO_PRINT_CSS.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { orderId, RecordDate, RecordNameBy } = this.props.print_value;
    const { copy } = this.props;

    this.setState({ orderId, copy, RecordDate, RecordNameBy });
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "65%", height: "100px", background: "red" }}>
          a
        </div>
        <div style={{ width: "35%", height: "100px", background: "green" }}>
          b
        </div>
      </div>
    );
  }
}

export default Header;
