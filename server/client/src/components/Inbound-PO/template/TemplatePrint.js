import React, { Component } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

class ComponentToPrint extends Component {
  render() {
    return (
      <div style={{ padding: "20px" }}>
        <Header print_value={this.props.print_value} copy="ORIGINAL" />
        <hr style={{ width: "95%" }} />
        <Content print_value={this.props.print_value} />
        <hr style={{ width: "95%" }} />
        <Footer print_value={this.props.print_value} />
        <hr style={{ borderTop: "dotted 1px" }} />
        <Header print_value={this.props.print_value} copy="COPY" />
        <hr style={{ width: "95%" }} />
        <Content print_value={this.props.print_value} />
        <hr style={{ width: "95%" }} />
        <Footer print_value={this.props.print_value} />
      </div>
    );
  }
}

export default ComponentToPrint;
