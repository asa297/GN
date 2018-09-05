import React, { Component } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Thanks from "./components/Thanks";

class ComponentToPrint extends Component {
  render() {
    return (
      <div style={{ fontFamily: "Kanit " }}>
        <div>
          <Header print_value={this.props.print_value} />
          <Content print_value={this.props.print_value} copy="##ORIGINAL##" />
          <Footer print_value={this.props.print_value} />
          <Thanks />
        </div>

        <hr style={{ borderTop: "dashed 1px" }} />

        <div>
          <Header print_value={this.props.print_value} />
          <Content print_value={this.props.print_value} copy="##COPY##" />
          <Footer print_value={this.props.print_value} />
          <Thanks />
        </div>
      </div>
    );
  }
}

export default ComponentToPrint;
