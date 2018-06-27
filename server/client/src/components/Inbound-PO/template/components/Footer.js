import React, { Component } from "react";

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
    return <div>renderContentHalfLeft</div>;
  }

  renderContentHalfRight() {
    return (
      <div>
        <div>
          <label>Total</label>: {this.state.total}
        </div>
        <div>
          <label>Discount</label>:{this.state.discount}
        </div>
        <div>
          <label>Credit</label>:{this.state.credit}
        </div>
        <div>
          <label>Credit Charge</label>:{this.state.creditcharge}
        </div>
        <div>
          <label>changecash</label>:{this.state.changecash}
        </div>
        <div>
          <label>Total</label>:{this.state.grandtotal}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "45%" }}>{this.renderContentHalfLeft()}</div>
        <div style={{ width: "45%" }}>{this.renderContentHalfRight()}</div>
      </div>
    );
  }
}

export default Footer;
