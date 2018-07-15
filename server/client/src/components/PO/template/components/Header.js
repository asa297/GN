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
    const { orderId, RecordDate } = this.props.print_value;
    const { copy } = this.props;

    this.setState({ orderId, copy, RecordDate });
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
          <div className={CSS_class.font}>
            <OrderId
              label="Order ID"
              text={this.state.orderId}
              copy={this.state.copy}
            />
            <div
              style={{
                display: "flex ",
                justifyContent: "space-between",
                margin: "0px"
              }}
            >
              Giornie Leather Shop
              <div>
                <label>Date</label> :&nbsp;
                {new Date(this.state.RecordDate).toLocaleDateString()}
              </div>
            </div>
            <div>Pattaya, Thailand</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
