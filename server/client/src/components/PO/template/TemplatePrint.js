import React, { Component } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

class ComponentToPrint extends Component {
  render() {
    return (
      <div>
        <div>
          <Header print_value={this.props.print_value} copy="ORIGINAL" />

          <Content print_value={this.props.print_value} />
          <Footer print_value={this.props.print_value} />
        </div>

        <hr style={{ borderTop: "dashed 1px" }} />
      </div>
    );
  }
}

export default ComponentToPrint;
