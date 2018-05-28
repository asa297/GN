import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./template/TemplatePrint";

class POPrint extends Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default POPrint;
