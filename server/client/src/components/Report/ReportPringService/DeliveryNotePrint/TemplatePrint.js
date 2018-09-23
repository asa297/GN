import React, { Component } from "react";
import Header from "./Component/Header";
import HeaderDocument from "./Component/HeaderDocument";
import Detail from "./Component/Detail";
import HeaderTable from "./Component/HeaderTable";
import List from "./Component/List";

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);

    const { print_value } = props;

    this.state = {
      print_value
    };
  }
  render() {
    return (
      <div style={{ fontFamily: "Kanit " }}>
        <Header print_value={this.state.print_value} />
        <HeaderDocument Document="Delivery Note" />
        <Detail print_value={this.state.print_value} />
        <HeaderTable />
        <List print_value={this.state.print_value} />
      </div>
    );
  }
}

export default ComponentToPrint;
