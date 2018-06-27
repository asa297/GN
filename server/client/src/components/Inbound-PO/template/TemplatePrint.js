import React, { Component } from "react";
import Header from "./components/Header";
import Item from "./components/Item";
import Footer from "./components/Footer";

class ComponentToPrint extends Component {
  render() {
    return (
      <div>
        <Header print_value={this.props.print_value} />
        <Item print_value={this.props.print_value} />
        <Footer print_value={this.props.print_value} />aaa
      </div>
    );
  }
}

export default ComponentToPrint;
