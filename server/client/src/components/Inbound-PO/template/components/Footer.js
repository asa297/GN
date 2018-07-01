import React, { Component } from "react";
import Remark from "./payment/Remark";
import Payment from "./payment/Payment";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const {
      discount,
      total,
      credit,
      cash,
      creditcharge,
      receivecash,
      changecash,
      grandtotal
    } = this.props.print_value;

    this.setState({
      discount,
      total,
      credit,
      cash,
      creditcharge,
      receivecash,
      changecash,
      grandtotal
    });
  }

  renderContentHalfLeft() {
    return <Remark />;
  }

  renderContentHalfRight() {
    return (
      <div>
        <Payment label="Total" text={this.state.total} />
        <Payment label="Discount" text={this.state.discount} />
        <Payment label="Credit" text={this.state.credit} />
        <Payment label="Credit Charge" text={this.state.creditcharge} />
        <Payment label="Change Cash" text={this.state.changecash} />
        <Payment label="Grand Total" text={this.state.grandtotal} />
      </div>
    );
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "50%", height: "140px" }}>
          {this.renderContentHalfLeft()}
        </div>
        <div style={{ width: "40%", height: "140px" }}>
          {this.renderContentHalfRight()}
        </div>
      </div>
    );
  }
}

export default Footer;
