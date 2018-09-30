import React, { Component } from "react";
import Header from "./Component/Header";
import Content from "./Component/Content";
import Footer from "./Component/Footer";
import Thanks from "./Component/Thanks";

class ComponentToPrint extends Component {
  render() {
    return (
      <div style={{ fontFamily: "Kanit " }}>
        <div>
          <Header print_value={this.props.print_value} />
          <Content
            print_value={this.props.print_value}
            copy="##ORIGINAL (RE-PRINT)##"
          />
          <Footer print_value={this.props.print_value} />
          <Thanks />
        </div>

        <hr style={{ borderTop: "dashed 1px" }} />

        <div>
          <Header print_value={this.props.print_value} />
          <Content
            print_value={this.props.print_value}
            copy="##COPY (RE-PRINT)##"
          />
          <Footer print_value={this.props.print_value} />
          <Thanks />
        </div>
      </div>
    );
  }
}

export default ComponentToPrint;
