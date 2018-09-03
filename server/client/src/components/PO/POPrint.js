import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./template/TemplatePrint";

class POPrint extends Component {
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <ComponentToPrint
          ref={el => (this.componentRef = el)}
          print_value={this.props.print_value}
        />
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => this.componentRef}
        />
      </div>
    );
  }
}

export default POPrint;
