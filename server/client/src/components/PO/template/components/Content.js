import React, { Component } from "react";
import Item from "./Item/Item";
class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const {
      itemList,
      grandtotal,
      credit,
      discount,
      discountPercent,
      creditcharge,
      creditchargePercent
    } = this.props.print_value;
    const { copy } = this.props;
    this.setState({
      itemList,
      copy,
      grandtotal,
      credit,
      discount,
      discountPercent,
      creditcharge,
      creditchargePercent
    });
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "90%" }}>
          <Item
            itemList={this.state.itemList}
            copy={this.state.copy}
            grandtotal={this.state.grandtotal}
            credit={this.state.credit}
            discount={this.state.discount}
            discountPercent={this.state.discountPercent}
            creditcharge={this.state.creditcharge}
            creditchargePercent={this.state.creditchargePercent}
          />
        </div>
      </div>
    );
  }
}

export default Content;
